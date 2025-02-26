import { Send } from 'lucide-react'
import React, { useState } from 'react'

const ChatInputBox = () => {
    const [message, setMessage] = useState("");
    const handleMessageSend = (e: any) => {
        e.preventDefault();
        if (message.trim()) {
            console.log("Message sent");
        }
    }
    return (
        <form onSubmit={(e) => handleMessageSend(e)} className='w-full h-12 rounded-full justify-between bg-background dark:bg-card/50 flex items-center px-4'>
            <input value={message} onChange={(e) => setMessage(e.target.value)} type="text" className='bg-transparent focus:outline-none w-full focus:ring-0' placeholder='Type a Message' />
            <Send role='button' />
        </form>
    )
}

export default ChatInputBox