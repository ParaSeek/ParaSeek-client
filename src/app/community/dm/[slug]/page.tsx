"use client";

import ChatInputBox from '@/components/community/ChatInputBox';
import NotFound from '@/components/NotFound';

import React from 'react'

const Page = ({ params }: { params: { slug: string } }) => {
    const { slug } = params;
    const name = slug.replace("%20", " ").toLowerCase();
    console.log(name)
    

    return (
        <div className='relative flex items-center justify-center h-screen'>
            {name}

            <div className='absolute bottom-0 right-0 bg-card dark:bg-background pb-4 w-full'>
                <ChatInputBox />
            </div>
        </div>
    )
}

export default Page