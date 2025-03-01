"use client";

import ChatInputBox from '@/components/community/ChatInputBox';
import RecievedBubble from '@/components/community/RecievedBubble';
import SentBubble from '@/components/community/SentBubble';
import { useToast } from '@/hooks/use-toast';
import { RootState } from '@/store/store';
import io, { Socket } from 'socket.io-client'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Page = ({ params }: { params: { slug: string } }) => {
    var username: string = "";
    const { slug } = params;
    username = slug.replace("%20", " ").toLowerCase();

    const { toast } = useToast();
    const [chatId, setChatId] = useState<string | null>(null);
    const [messages, setMessages] = useState<any>([])
    const [receiver, setReceiver] = useState<any>(null)
    const userData = useSelector((state: RootState) => state.user.data);
    const [socket, setSocket] = useState<Socket | null>(null)

    useEffect(() => {
        const s = io(process.env.SERVER_URL2);
        setSocket(s);

        return () => {
            s.disconnect();
            setSocket(null);
        };
    }, [])

    useEffect(() => {
        if (socket && chatId && userData) {
            socket.emit('join', { chatId, username: userData.username });
            socket.on('receiveMessage', () => {
                console.log("here");
                getMessages();
            });

        }

    }, [socket, chatId, userData]);


    const getMessages = async () => {
        try {
            const response = await fetch(`${process.env.SERVER_URL2}/api/v1/dm/getallmessages/${username}`, {
                method: 'GET',
                credentials: "include" as const,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const res = await response.json();
            if (res.success) {
                res.data.participantOne.username == username ? setReceiver(res.data.participantOne) : setReceiver(res.data.participantTwo);
                setChatId(res.data._id);
                setMessages(res.data.messages)
            } else {
                toast({ title: res.message, variant: "destructive" })
            }
        } catch {
            toast({ title: "Failed to get your communities. Please refresh!", variant: "destructive" })
        }
    }

    useEffect(() => {
        getMessages();
    }, [])

    return (
        <div className='relative  h-screen pt-16'>
            <div className='h-full w-full pt-4 pb-20 flex flex-col-reverse gap-3 overflow-y-auto'>

                {
                    messages.map((message: any, index: number) => {
                        return (
                            message.sender == userData._id ?
                                // sent 
                                <SentBubble key={index} message={message.message} time={new Date(message.updatedAt).toLocaleTimeString("en", { hour: "numeric", minute: "numeric", hour12: true })} />
                                :
                                // recieved
                                <RecievedBubble key={index} message={message.message} time={new Date(message.updatedAt).toLocaleTimeString("en", { hour: "numeric", minute: "numeric", hour12: true })} />
                        )
                    }
                    )
                }



                <div className='w-full flex flex-col gap-3 items-center mb-8'>
                    <h3 className='text-xl text-center font-semibold'>This is the beginning of your chat with <br /><span className='custom-gradient text-transparent text-2xl'>{username}</span></h3>
                    <Avatar className="w-20 h-20 mx-auto">
                        <AvatarImage className="object-cover" src={receiver?.profilePic} />
                        <AvatarFallback className="text-3xl bg-primary font-semibold">{receiver?.username.substring(0, 1).toUpperCase()}</AvatarFallback>
                    </Avatar>
                </div>
            </div>
            <div className='absolute bottom-0 right-0 bg-card z-10 dark:bg-background pb-4 w-full'>
                {chatId && <ChatInputBox socket={socket} chatId={chatId} friendUsername={username} />}
            </div>
        </div>
    )
}

export default Page