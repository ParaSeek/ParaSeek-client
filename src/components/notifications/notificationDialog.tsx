import React, { useEffect, useState } from 'react'
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc, where } from 'firebase/firestore'
import { firestore } from '@/app/firebase.config'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { Bell, Check, CheckCheck, X, XCircle } from 'lucide-react'
import { IconClearAll } from '@tabler/icons-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Button } from '../ui/button'

const NotificationDialog = ({ showNotifications, setNotifCount, notifClose }: { notifClose: () => void, showNotifications: boolean, setNotifCount: (count: number) => void }) => {
    const pathname = usePathname();
    const user = useSelector((state: RootState) => state.user.data);
    const [notifications, setNotifications] = useState<any>()
    const [newNotifCount, setNewNotifCount] = useState(0)

    const getNotifications = async (recipientId: string) => {
        try {
            const q = query(collection(firestore, "notifications"), where("recipient", "==", recipientId), orderBy('time', 'desc'));
            onSnapshot(q, (QuerySnapshot) => {
                let notifs: any = [];
                let newNotifs = 0;
                QuerySnapshot.forEach((doc) => {
                    notifs.push({ ...doc.data(), _id: doc.id });
                    if (doc.data().read === false) newNotifs++;
                });
                setNewNotifCount(newNotifs)
                setNotifications(notifs);
            });
        } catch (error) {
            console.log(error);
        }
    }


    const handleClear = async (id: string) => {
        await deleteDoc(doc(firestore, "notifications", id))
    }
    const handleClearAll = () => {
        if (notifications) {
            notifications.forEach((notif: any) => {
                handleClear(notif._id)
            });
        }
    }
    const handleMarkRead = async (id: string) => {
        await updateDoc(doc(firestore, "notifications", id), { read: true })
        // .then(() => {
        //     console.log("Notification mark read!")
        // })
        // .catch((error) => {
        //     console.error("Error marking Notification read!", error)
        // })
    }
    const handleMarkAllRead = async () => {
        if (notifications) {
            notifications.forEach((notif: any) => {
                handleMarkRead(notif._id)
            });
        }
    }


    //state updates
    useEffect(() => {
        if (user)
            getNotifications(user._id)
    }, [user])

    useEffect(() => {
        setNotifCount(newNotifCount)

    }, [newNotifCount])





    if (showNotifications)
        return (
            <div className={`fixed top-16 md:right-7 bg-card md:max-w-[500px] w-[95vw] ${pathname.includes('/community') ? "right-[calc(50%+32px)]" : "right-1/2"} md:translate-x-0 translate-x-1/2 min-h-[100px] dark:bg-[#212121] dark:border dark:border-gray-700 shadow-[0px_0px_25px] shadow-black/10 py-3 rounded-lg`}>

                <div className='flex items-center mb-4 justify-between px-3'>
                    <h3 className='text-lg font-medium flex items-center gap-1'><Bell strokeWidth="1.5px" className='h-5 w-5' /> Notifications</h3>
                    <div className='flex items-center gap-2'>
                        {notifications?.length > 0 && <IconClearAll onClick={handleClearAll} className='w-5 h-5 cursor-pointer hover:text-primary' />}
                        {newNotifCount > 0 && <CheckCheck onClick={handleMarkAllRead} className='w-5 h-5 cursor-pointer hover:text-primary' />}
                        <XCircle onClick={notifClose} className='h-5 w-5 cursor-pointer hover:text-primary' />
                    </div>
                </div>
                <div className='max-h-[40vh] px-1 overflow-y-auto'>

                    {
                        !notifications || notifications.length == 0 ?
                            <p className='text-sm px-3'>Nothing here!</p>
                            :
                            notifications.map((notification: any, index: number) => {
                                return (
                                    <div className='cursor-pointer hover:bg-primary/5 rounded-md px-2 py-2 ' key={index}>
                                        <div className='flex items-center justify-between'>
                                            <Link onClick={() => { if (notification.link) notifClose(); }} href={notification.link || ""} className={`${notification.read ? "" : "font-medium"} flex gap-1 items-center`}><p>{notification.title}</p>{!notification.read && <div className='bg-red-500 text-white rounded-full h-2 w-2 px-1'></div>}</Link>
                                            <div className='flex items-center gap-1'>
                                                {!notification.read && <Check onClick={() => handleMarkRead(notification._id)} className='w-5 h-5 cursor-pointer hover:text-primary' />}
                                                <X onClick={() => handleClear(notification._id)} className='h-5 w-5 cursor-pointer hover:text-primary' />
                                            </div>
                                        </div>
                                        <p className='text-sm'>{notification.message}</p>
                                        <p className='text-xs'>{new Date(notification.time).toLocaleString("en-US", { dateStyle: "short", timeStyle: "short" })}</p>

                                    </div>
                                )
                            })
                    }
                </div>

            </div>
        )
    else return null
}

export default NotificationDialog