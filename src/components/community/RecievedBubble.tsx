import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

const RecievedBubble = ({ message, time, sender }: { message: string, time: string, sender?: any }) => {
    return (
        <div className='flex flex-col w-full gap-2'>
            {sender && <div className='flex items-center text-xs ml-1 gap-1 w-fit'>
                <Avatar className="w-4 h-4 mx-auto">
                    <AvatarImage className="object-cover" src={sender.profilePic} />
                    <AvatarFallback className="bg-primary">{sender.username.substring(0, 1).toUpperCase()}</AvatarFallback>
                </Avatar>
                {sender.username}
            </div>}
            <div className='max-w-[70%] text-white bg-primary w-fit rounded-lg flex'>
                <div className='h-full w-[24px]'>
                    <div className='h-8 w-full rounded-tr-[80%] bg-card dark:bg-background' />
                    <div className='h-[calc(100%-32px)] rounded-bl-lg bg-card dark:bg-background' />
                </div>
                <div className='p-4 bg-primary rounded-xl w-fit break-all'>
                    {message}
                </div>
                <p className='text-xs mt-auto mr-3 mb-2 text-nowrap text-gray-300'>{time}</p>
            </div>
        </div>
    )
}

export default RecievedBubble