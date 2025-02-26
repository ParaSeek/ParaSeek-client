import React, { useState } from 'react'
import { ToggleTheme } from '../ToggleTheme'
import NotificationButton from '../notifications/notificationButton'



type Props = {}

const Header = (props: Props) => {

    return (
        <div className={`fixed h-16 flex backdrop-blur-sm right-0 top-0 z-[25] px-[25px] py-[15px] items-center justify-between transition-all duration-300 w-[calc(100vw-64px)] md:w-[calc(100vw-314px)]`}>
            <div className='flex items-center gap-2'>
                <div className='flex items-center gap-3'>
                    <h1 className=''>Paraseek Communities</h1>
                </div>
            </div>
            <div className='flex items-center'>
                <ToggleTheme />
                <NotificationButton />
            </div>
        </div>
    )
}

export default Header