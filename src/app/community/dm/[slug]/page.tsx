"use client";

import ChatInputBox from '@/components/community/ChatInputBox';
import RecievedBubble from '@/components/community/RecievedBubble';
import SentBubble from '@/components/community/SentBubble';
import { useToast } from '@/hooks/use-toast';
import { RootState } from '@/store/store';

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const Page = ({ params }: { params: { slug: string } }) => {
    var name: string = "";
    const { slug } = params;
    name = slug.replace("%20", " ").toLowerCase();
    console.log(name);
    const { toast } = useToast();
    const [messages, setMessages] = useState<any>([])
    const userData = useSelector((state: RootState) => state.user.data);
    const getMessages = async () => {
        try {
            const response = await fetch(`${process.env.SERVER_URL2}/api/v1/dm/getallmessages/${name}`, {
                method: 'GET',
                credentials: "include" as const,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const res = await response.json();
            if (res.success) {
                setMessages(res.data.messages.reverse())
                getMessages()
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

    console.log(messages);

    return (
        <div className='relative  h-screen pt-16'>
            <div className='h-full w-full pt-4 pb-20 flex flex-col-reverse gap-3 overflow-y-auto'>

                {
                    messages.map((message: any, index: number) => {
                        return (
                            message.sender == userData._id ?
                                // sent 
                                <SentBubble message={message.message} time={new Date(message.updatedAt).toLocaleTimeString("en", { hour: "numeric", minute: "numeric", hour12: true })} />
                                :
                                // recieved
                                <RecievedBubble message={message.message} time={new Date(message.updatedAt).toLocaleTimeString("en", { hour: "numeric", minute: "numeric", hour12: true })} />
                        )
                    }
                    )
                }



                <div className='w-full flex flex-col gap-3 items-center mb-8'>
                    <h3 className='text-xl text-center font-semibold'>This is the beginning of your chat with <br /><span className='custom-gradient text-transparent text-2xl'>{name}</span></h3>
                    <img className='w-[100px] h-[100px] object-cover rounded-full bg-card' src="/logo-dark.svg" alt="" />
                </div>
            </div>
            <div className='absolute bottom-0 right-0 bg-card z-10 dark:bg-background pb-4 w-full'>
                <ChatInputBox friendUsername={name} />
            </div>
        </div>
    )
}

export default Page