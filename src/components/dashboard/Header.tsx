import React, { useEffect, useState } from 'react'
import { ToggleTheme } from '../ToggleTheme'
import { useTheme } from 'next-themes'
import { useDashboardContext } from '@/contexts/DashboardContext'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { Bell } from 'lucide-react'
import { doc, onSnapshot } from 'firebase/firestore'
import { firestore } from '@/app/firebase.config'

type Props = {}

const Header = (props: Props) => {
    const { theme } = useTheme();

    const user = useSelector((state: RootState) => state.user.data);

    const [notifications, setNotifications] = useState<any>()
    const getNotifications = async (recipientId: string) => {
        try {
            onSnapshot(doc(firestore, "notifications", `${recipientId}`), (doc) => {
                setNotifications(doc.data())
            })
        } catch (error) {
            console.log(error, "in fetching notifications");
        }
    }
    useEffect(() => {
        getNotifications(user._id)
        console.log(notifications)
    }, [])
    console.log(notifications)
    const { collapsed, setNavOpen, headerTitle } = useDashboardContext();
    return (
        <div style={{ width: collapsed ? "calc(100vw - 72px)" : "" }} className={`fixed backdrop-blur-sm right-0 top-0 z-[25] flex px-[25px] py-[15px] items-center justify-between transition-all duration-300 w-full md:w-[80%]`}>
            <div className='flex items-center gap-2'>
                <HamburgerMenuIcon onClick={() => setNavOpen(true)} className='md:hidden' />
                <div>
                    <h1 className='font-bold'>{headerTitle}</h1>
                </div>
            </div>
            <div className='flex items-center gap-[15px]'>
                <ToggleTheme />

                <div className='relative'>
                    <Bell className='h-5 w-5' />
                    {notifications?.newNotifCount > 0 && <span className='absolute rounded-full text-sm flex items-center justify-center -top-1 -right-1 dark:bg-white bg-black text-white dark:text-black w-4 h-4'>{notifications?.newNotifCount}</span>
                    }
                </div>

            </div>
        </div>
    )
}

export default Header