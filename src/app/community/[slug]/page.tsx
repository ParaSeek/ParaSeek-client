"use client";

import ChatInputBox from '@/components/community/ChatInputBox';
import NotFound from '@/components/NotFound';
import { useCommunityContext } from '@/contexts/CommunityContext';

import React from 'react'

const Page = ({ params }: { params: { slug: string } }) => {
    const { slug } = params;
    const { myCommunities } = useCommunityContext();
    const name = slug.replaceAll("%20", " ").toLowerCase();
    console.log(name);

    const community = myCommunities.find((c) => {
        console.log(c.name.toLowerCase())
        return (
            c.name.toLowerCase().trim() === name
        )
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