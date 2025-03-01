import { toast } from '@/hooks/use-toast';
import { Send } from 'lucide-react'
import React, { useState } from 'react'
import { Socket } from 'socket.io-client';

const ChatInputBox = ({ friendUsername, chatId, socket, community = false }: { friendUsername?: string, chatId: string, socket: Socket | null, community?: boolean }) => {
    const [message, setMessage] = useState("");

    //sending direct message
    const handleMessageSend = async (e: any) => {
        e.preventDefault();
        if (message.trim()) {

            try {
                const response = await fetch(`${process.env.SERVER_URL2}/api/v1/dm/sendMessage/${friendUsername}`, {
                    method: 'POST',
                    credentials: "include" as const,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ content: message })
                });

                const res = await response.json();
                if (res.success) {
                    socket?.emit('newMessage', { chatId });
                    setMessage("");
                } else {
                    toast({ title: res.message, variant: "destructive" })
                }
            } catch {
                toast({ title: "Failed to send direct message. Please refresh!", variant: "destructive" })
            }
        }

    }

    // Sending message to community group
    const handleCommunityMessageSend = async (e: any) => {
        e.preventDefault();
        if (message.trim()) {

            try {
                const response = await fetch(`${process.env.SERVER_URL2}/api/v1/community/sendMessage`, {
                    method: 'POST',
                    credentials: "include" as const,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ message, communityId: chatId })
                });

                const res = await response.json();
                if (res.success) {
                    socket?.emit('newMessage', { chatId });
                    setMessage("");
                } else {
                    toast({ title: res.message, variant: "destructive" })
                }
            } catch {
                toast({ title: "Failed to send message to community. Please refresh!", variant: "destructive" })
            }
        }

    }
    return (
        <form onSubmit={(e) => community ? handleCommunityMessageSend(e) : handleMessageSend(e)} className='w-full h-12 rounded-full justify-between bg-background dark:bg-card/50 flex items-center px-4'>
            <input value={message} onChange={(e) => setMessage(e.target.value)} type="text" className='bg-transparent focus:outline-none w-full focus:ring-0' placeholder='Type a Message' />
            <button> <Send /></button>
        </form>
    )
}

export default ChatInputBox