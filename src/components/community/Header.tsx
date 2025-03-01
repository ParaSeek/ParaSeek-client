import React, { useState } from 'react'
import { ToggleTheme } from '../ToggleTheme'
import NotificationButton from '../notifications/notificationButton'
import { useCommunityContext } from '@/contexts/CommunityContext'
import { ArrowLeft, Phone, Video } from 'lucide-react'
import { usePathname } from 'next/navigation'



type Props = {}

const Header = (props: Props) => {
    const pathname = usePathname();
    const { headerTitle } = useCommunityContext();

    return (
        <div className={`fixed h-16 flex bg-card dark:bg-background right-0 top-0 z-[25] md:px-[25px] px-[15px] py-[15px] items-center gap-3 transition-all duration-300 w-[calc(100vw-64px)] md:w-[calc(100vw-314px)]`}>
            <div className='flex items-center gap-2'>
                <div className='flex items-center gap-3'>
                    <h1 className='font-medium'>{headerTitle}</h1>
                </div>
            </div>
            <div className='ml-auto' />
            <div className='flex items-center'>
                <ToggleTheme />
                <NotificationButton />
            </div>
        </div>
    )
}

export default Header