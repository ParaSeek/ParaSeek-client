"use client";

import ChatInputBox from '@/components/community/ChatInputBox';
import NotFound from '@/components/NotFound';
import { myCommunites } from '@/store/suggestions';
import React from 'react'

const Page = ({ params }: { params: { slug: string } }) => {
    const { slug } = params;
    const name = slug.replace("%20", " ").toLowerCase();
    console.log(name)
    const community = myCommunites.find((c) => {
        return c.name.toLowerCase() === name
    })

    if (!community) {
        return <NotFound />
    }

    return (
        <div className='relative flex items-center justify-center h-screen'>
            {community?.name}

            <div className='absolute bottom-0 right-0 bg-card dark:bg-background pb-4 w-full'>
                <ChatInputBox />
            </div>
        </div>
    )
}

export default Page