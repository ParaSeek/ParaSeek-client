import React from 'react'

const SentBubble = ({ message, time }: { message: string, time: string }) => {
    return (
        <div className='max-w-[70%] bg-background dark:bg-card w-fit rounded-xl break-words ml-auto flex'>
            <div className='p-4 bg-background dark:bg-card rounded-2xl w-fit'>
                {message}
            </div>
            <p className='text-xs mt-auto mr-3 mb-2 text-gray-700 dark:text-gray-300'>{time}</p>
            <div className='h-full w-[24px]'>
                <div className='h-8 w-full rounded-tl-[80%] bg-card dark:bg-background' />
                <div className='h-[calc(100%-32px)] rounded-br-xl bg-card dark:bg-background' />
            </div>
        </div>
    )
}

export default SentBubble