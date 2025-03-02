import React, { useState } from 'react'
import { ToggleTheme } from '../ToggleTheme'
import NotificationButton from '../notifications/notificationButton'
import { useCommunityContext } from '@/contexts/CommunityContext'
import { ArrowLeft, Phone, Video } from 'lucide-react'
import { usePathname } from 'next/navigation'



type Props = {}

const Header = (props: Props) => {
    const pathname = usePathname();
    const { headerTitle, setAudioCall, setVideoCall } = useCommunityContext();

    return (
        <div className={`fixed h-16 flex bg-card dark:bg-background right-0 top-0 z-[25] md:px-[25px] px-[15px] py-[15px] items-center gap-3 transition-all duration-300 w-[calc(100vw-64px)] md:w-[calc(100vw-314px)]`}>
            <div className='flex items-center gap-2'>
                <div className='flex items-center gap-3'>
                    <h1 className='font-medium'>{headerTitle}</h1>
                </div>
            </div>
            <div className='ml-auto' />
            {pathname.includes("/community/dm") && <div className='flex items-center border px-2 bg-background dark:bg-card rounded-full gap-2 py-1 w-fit backdrop-blur-sm'>
                <Phone onClick={() => setAudioCall(true)} role='button' strokeWidth={"1.25px"} className='h-5 w-5 hover:text-primary transition-all duration-300' />
                <div className='h-4 w-[1px] bg-gray-500' />
                <Video onClick={() => setVideoCall(true)} role='button' strokeWidth={"1px"} className='h-6 w-6 hover:text-primary transition-all duration-300' />
            </div>}
            <div className='flex items-center'>
                <ToggleTheme />
                <NotificationButton />
            </div>
        </div>
    )
}

export default Header