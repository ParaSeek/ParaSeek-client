"use client";

import ChatInputBox from '@/components/community/ChatInputBox';
import RecievedBubble from '@/components/community/RecievedBubble';
import SentBubble from '@/components/community/SentBubble';
import NotFound from '@/components/NotFound';
import { useCommunityContext } from '@/contexts/CommunityContext';
import { useToast } from '@/hooks/use-toast';
import { CommunityMessage } from '@/store/interfaces';
import { RootState } from '@/store/store';

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { io, Socket } from 'socket.io-client';

const Page = ({ params }: { params: { slug: string } }) => {
    const { slug } = params;
    const { setHeaderTitle, myCommunities } = useCommunityContext();
    const userData = useSelector((state: RootState) => state.user.data);
    const [messages, setMessages] = useState<CommunityMessage[]>([])
    const [socket, setSocket] = useState<Socket | null>(null)
    const { toast } = useToast();
    useEffect(() => {
        const s = io(process.env.SERVER_URL2);
        setSocket(s);

        return () => {
            s.disconnect();
            setSocket(null);
        };
    }, [])

    useEffect(() => {
        if (socket && userData) {
            socket.emit('join', { chatId: slug, username: userData.username });
            socket.on('receiveMessage', () => {
                console.log("here");
                getMessages();
            });
        }

    }, [socket, userData]);

    const getMessages = async () => {
        try {
            const response = await fetch(`${process.env.SERVER_URL2}/api/v1/community/load-all-community-messages/${slug}`, {
                method: 'GET',
                credentials: "include" as const,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const res = await response.json();
            if (res.success) {
                setMessages(res.data.reverse());
            } else {
                toast({ title: res.message, variant: "destructive" })
            }
        } catch {
            toast({ title: "Failed to get community messages. Please refresh!", variant: "destructive" })
        }
    }

    useEffect(() => {
        getMessages();
    }, [])



    const community = myCommunities.find((c) => {
        return (
            c._id === slug
        )
    })
    useEffect(() => {
        if (community) {
            setHeaderTitle(community.name);
        }
    }, [community])

    if (!community) {
        return <NotFound />
    }

    return (
        <div className='relative flex pt-16 items-center justify-center h-screen'>

            <div className='h-full w-full pt-4 pb-20 flex flex-col-reverse gap-3 overflow-y-auto'>
                {
                    messages.map((message, index) => {
                        return (
                            <div key={index} className='flex flex-col'>
                                {index < messages.length - 1 ? new Date(message.createdAt).getDate() - new Date(messages[index + 1].createdAt).getDate() >0 && <p className='mx-auto mb-3 bg-[#EAE5F2] dark:bg-[#1E152B] px-3 py-1 rounded-md w-fit'>{new Date(message.createdAt).toLocaleDateString()}</p> : <p className='mx-auto mb-3 bg-[#EAE5F2] dark:bg-[#1E152B] px-3 py-1 rounded-md w-fit'>{new Date(message.createdAt).toLocaleDateString()}</p>}
                                {message.sender._id == userData._id ?
                                    <SentBubble message={message.message} time={new Date(message.updatedAt).toLocaleTimeString("en", { hour: "numeric", minute: "numeric", hour12: true })} />
                                    :
                                    <RecievedBubble  message={message.message} sender={message.sender} time={new Date(message.updatedAt).toLocaleTimeString("en", { hour: "numeric", minute: "numeric", hour12: true })} />
                                }
                            </div>
                        )
                    }
                    )
                }
            </div>
            <div className='absolute bottom-0 right-0 bg-card dark:bg-background pb-4 w-full'>
                <ChatInputBox chatId={slug} socket={socket} community={true} />
            </div>
        </div>
    )
}

export default Page