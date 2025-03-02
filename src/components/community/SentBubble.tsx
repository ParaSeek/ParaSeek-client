import React from 'react'

const SentBubble = ({ message, time }: { message: string, time: string }) => {
    return (
        <div className='md:max-w-[70%] max-w-[85%] bg-background dark:bg-card w-fit rounded-xl ml-auto flex'>
            <div className='px-3 py-1 bg-background dark:bg-card rounded-lg break-all w-fit'>
                {message}
            </div>
            <p className='text-xs mt-auto mr-3 mb-[2px] text-nowrap text-gray-700 dark:text-gray-300'>{time}</p>
            <div className='h-full w-[16px]'>
                <div className='h-8 w-full rounded-tl-[80%] bg-card dark:bg-background' />
                <div className='h-[calc(100%-32px)] rounded-br-lg bg-card dark:bg-background' />
            </div>
        </div>
    )
}

export default SentBubble