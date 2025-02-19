import React, { useState } from 'react'
import NotificationDialog from '../notifications/notificationDialog'
import { Bell } from 'lucide-react';

const NotificationButton = () => {
    const [notifCount, setNotifCount] = useState(0);
    const [showNotifications, setShowNotifications] = useState(false);
    const setNotificationsCount = (count: number) => {
        setNotifCount(count);
    }
    const notifClose = () => {
        setShowNotifications(false)
    }
    return (
        <div>
            <div onClick={() => setShowNotifications(!showNotifications)} className='relative cursor-pointer hover:bg-muted rounded-full p-1'>
                <Bell strokeWidth="1.25px" className='h-5 w-5' />
                {notifCount > 0 && <span className='absolute rounded-full text-[10px] flex items-center justify-center top-0 right-0 dark:bg-white bg-black text-white dark:text-black w-4 h-4'>{notifCount}</span>
                }
            </div>
            <NotificationDialog notifClose={notifClose} showNotifications={showNotifications} setNotifCount={setNotificationsCount} />
        </div>
    )
}

export default NotificationButton