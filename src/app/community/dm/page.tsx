"use client";
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { FriendReq } from '@/store/interfaces';
import { RootState } from '@/store/store';
import { AvatarImage } from '@radix-ui/react-avatar';
import { Check, X } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const Page = () => {
    const searchParams = useSearchParams();
    const [selectedTab, setSelectedTab] = useState("allFriends");
    const tab = searchParams.get('tab')
    const userData = useSelector((state: RootState) => state.user.data);
    const [friendRequests, setFriendRequests] = useState<FriendReq[]>([]);
    const { toast } = useToast();


    const getFriendRequests = async () => {
        try {
            const response = await fetch(`${process.env.SERVER_URL2}/api/v1/dm/pendingReq`, {
                method: 'GET',
                credentials: "include" as const,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const res = await response.json();
            if (res.success) {
                setFriendRequests(res.data);
            } else {
                toast({ title: res.message, variant: "destructive" })
            }
        } catch {
            toast({ title: "Failed to get friend Requests. Please refresh!", variant: "destructive" })
        }
    }
    const handleFriendReqAccept = async (senderId: string, answer: boolean) => {
        try {
            const response = await fetch(`${process.env.SERVER_URL2}/api/v1/dm/acceptfriendReq/${senderId}`, {
                method: 'POST',
                credentials: "include" as const,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ answer })
            });

            const res = await response.json();
            if (res.success) {
                toast({ title: res.message })
            } else {
                toast({ title: res.message, variant: "destructive" })
            }
        } catch {
            toast({ title: "Failed to get friend Requests. Please refresh!", variant: "destructive" })
        }
    }

    useEffect(() => {
        if (userData)
            getFriendRequests();
    }, [userData])

    console.log(friendRequests);



    useEffect(() => {
        if (tab) {
            setSelectedTab(tab);
        }
    }, [tab])

    const tabs = [
        { label: 'All Friends', value: 'allFriends' },
        { label: "Pending", value: "acceptReq" }
    ]

    return (
        <div className='h-screen flex flex-col gap-4 pt-20'>
            <div className='flex gap-1 items-center rounded-full bg-[#F8F4FF] dark:bg-[#1d1d1d] p-1'>
                {
                    tabs.map((tab, index) => (
                        <div className={`${tab.value == selectedTab ? "bg-[#e0cfff] font-medium text-primary" : ""}  rounded-full basis-1/2 transition-all duration-500 text-center px-2 py-1 cursor-pointer`} key={index} onClick={() => setSelectedTab(tab.value)}>{tab.label}</div>
                    ))
                }
            </div>

            {
                selectedTab == 'allFriends' &&
                <div>

                </div>
            }
            {
                selectedTab == 'acceptReq' &&
                <div className='w-full h-full'>
                    {
                        friendRequests.map((req, i) => {
                            return (
                                <div key={i} className='w-full items-center flex gap-3 p-6 rounded-xl bg-muted'>
                                    <Avatar className="w-12 h-12">
                                        <AvatarImage className="object-cover" src={req.sender.profilePic} />
                                        <AvatarFallback className="text-lg">{req.sender.username.substring(0, 1).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <div className='flex flex-col'>
                                        <p className='font-medium text-lg'>{req.sender.firstName} {req.sender.lastName}</p>
                                        <p className='text-xs'>@{req.sender.username}</p>
                                    </div>
                                    <div className='flex gap-2 ml-auto'>
                                        <Check className='bg-[#F8F4FF] cursor-pointer hover:text-primary transition-all duration-500 dark:bg-[#1d1d1d] p-2 h-10 w-10 rounded-full' onClick={() => handleFriendReqAccept(req.sender._id, true)} />
                                        <X className='bg-[#F8F4FF] cursor-pointer hover:text-primary transition-all duration-500 dark:bg-[#1d1d1d] p-2 h-10 w-10 rounded-full' />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            }
        </div>

    )
}

export default Page