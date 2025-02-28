import React from 'react'

const RecievedBubble = ({ message, time }: { message: string, time: string }) => {
    return (
        <div className='max-w-[70%] text-white bg-primary w-fit break-words rounded-2xl flex'>
            <div className='h-full w-[24px]'>
                <div className='h-8 w-full rounded-tr-[80%] bg-card dark:bg-background' />
                <div className='h-[calc(100%-32px)] rounded-bl-xl bg-card dark:bg-background' />
            </div>
            <div className='p-4 bg-primary rounded-xl w-fit'>
                {message}
            </div>
            <p className='text-xs mt-auto mr-3 mb-2 text-gray-300'>{time}</p>
        </div>
    )
}

export default RecievedBubble