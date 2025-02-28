import { toast } from '@/hooks/use-toast';
import { Send } from 'lucide-react'
import React, { useState } from 'react'

const ChatInputBox = ({ friendUsername }: { friendUsername?: string }) => {
    const [message, setMessage] = useState("");
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
                    setMessage("");
                } else {
                    toast({ title: res.message, variant: "destructive" })
                }
            } catch {
                toast({ title: "Failed to get your communities. Please refresh!", variant: "destructive" })
            }
        }

    }
    return (
        <form onSubmit={(e) => handleMessageSend(e)} className='w-full h-12 rounded-full justify-between bg-background dark:bg-card/50 flex items-center px-4'>
            <input value={message} onChange={(e) => setMessage(e.target.value)} type="text" className='bg-transparent focus:outline-none w-full focus:ring-0' placeholder='Type a Message' />
            <button> <Send /></button>
        </form>
    )
}

export default ChatInputBox