"use client";
import { FormEvent, ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Compass, Globe, Home, MessageCircle, Plus, Search, X, XCircle } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CommunityContext } from '@/contexts/CommunityContext';
import Header from '@/components/community/Header';
import { Community, Member } from '@/store/interfaces';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { sendNotification } from '../firebase.config';

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const userData = useSelector((state: RootState) => state.user.data);
    const [allCommunities, setAllCommunities] = useState<Community[]>([])
    const [myCommunities, setMyCommunities] = useState<Community[]>([])
    const [myFriends, setMyFriends] = useState([])
    const [selectedCommunity, setSelectedCommunity] = useState<null | Community>(null);
    const [selectedFriend, setSelectedFriend] = useState("");

    const { toast } = useToast();

    const [createCommunityFormOpen, setCreateCommunityFormOpen] = useState(false);
    const [communityName, setCommunityName] = useState("");
    const [communityDesc, setCommunityDesc] = useState("");

    const [addMemberOrCreateDM, setAddMemberOrCreateDM] = useState("");
    const [addMemberUserId, setAddMemberUserId] = useState("");


    // fetch requests
    const getAllCommunities = async () => {
        try {
            const response = await fetch(`${process.env.SERVER_URL2}/api/v1/community/get-all-communities`, {
                method: 'GET',
                credentials: "include" as const,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const res = await response.json();
            if (res.success) {
                setAllCommunities(res.data);
            } else {
                toast({ title: res.message, variant: "destructive" })
            }
        } catch {
            toast({ title: "Failed to get your communities. Please refresh!", variant: "destructive" })
        }
    }

    const handleCreateCommunity = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (communityName.trim() && communityDesc.trim()) {
            try {
                const response = await fetch(`${process.env.SERVER_URL2}/api/v1/community/create-community`, {
                    method: 'POST',
                    credentials: "include" as const,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name: communityName.trim(), description: communityDesc.trim() }),
                });

                const res = await response.json();
                if (res.success) {
                    toast({ title: "Community Created Successfully!" })
                    setCreateCommunityFormOpen(false);
                    getAllCommunities();
                } else {
                    toast({ title: res.message, variant: "destructive" })
                }
            } catch {
                toast({ title: "Failed to create community", variant: "destructive" })
            }
        } else {
            toast({ title: "Please fill in all fields", variant: "destructive" })
        }
    }

    const handleJoinCommunity = async (communityId: string, username: string) => {
        try {
            const response = await fetch(`${process.env.SERVER_URL2}/api/v1/community/join-community/${communityId}`, {
                method: 'POST',
                credentials: "include" as const,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username }),
            });

            const res = await response.json();
            if (res.success) {
                toast({ title: "Community Joined Successfully!" })
                setAddMemberOrCreateDM("");
                getAllCommunities();
            } else {
                toast({ title: res.message, variant: "destructive" })
            }
        } catch {
            toast({ title: "Failed to create community", variant: "destructive" })
        }
    }

    const handleSendFriendReq = async (username: string) => {
        try {
            const response = await fetch(`${process.env.SERVER_URL2}/api/v1/dm/sendfriendReq`, {
                method: 'POST',
                credentials: "include" as const,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username })
            });

            const res = await response.json();
            if (res.success) {
                toast({ title: res.message })
                sendNotification(res.data.userId, "New Friend Request", `${userData.username} sent you a friend request.`, "/community/dm?tab=acceptReq");
            } else {
                toast({ title: res.message, variant: "destructive" })
            }
        } catch {
            toast({ title: "Failed to Send Friend Req. Please refresh!", variant: "destructive" })
        }
    }

    const getMyFriends = async () => {
        try {
            const response = await fetch(`${process.env.SERVER_URL2}/api/v1/dm/getallfriend`, {
                method: 'GET',
                credentials: "include" as const,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const res = await response.json();
            if (res.success) {
                setMyFriends(res.data);
            } else {
                console.log(res.message);
            }
        } catch {
            toast({ title: "Failed to get your Friends. Please refresh!", variant: "destructive" })
        }
    }

    useEffect(() => {
        if (userData)
            getMyFriends();
    }, [userData])

    useEffect(() => {
        if (allCommunities.length > 0 && userData)
            setMyCommunities(allCommunities.filter((c: Community) => c.members.some((member: Member) => member._id === userData._id)))
    }, [allCommunities])


    useEffect(() => {
        getAllCommunities();
    }, [])

    if (!userData) {
        return (
            <section className='w-full bg-background flex justify-center'>
                <h1 className='text-3xl font-semibold'>You are not logged in</h1>
                <span className='w-24 my-2 bg-muted h-[1px]'></span>
                <p className='text-xl font-medium'>Please log in first</p>
            </section>
        );
    }

    return (

        <CommunityContext.Provider value={{ myCommunities, allCommunities, setAllCommunities, setMyCommunities, handleJoinCommunity }}>
            <section className='w-full bg-card dark:bg-background flex-row items-start justify-start'>

                {/* community nav */}
                <aside className='h-screen w-16 z-[25] gap-2 rounded-r-2xl fixed left-0 top-0 flex flex-col items-center pt-4 bg-[#EAE5F2] dark:bg-[#1E152B]'>
                    <Link href={"/community"} onClick={() => { setSelectedCommunity(null); setSelectedFriend(" "); }} className='w-12 cursor-pointer h-12 bg-background rounded-full flex items-center justify-center'>
                        <Compass strokeWidth="1.5px" className='h-7 w-7' />
                    </Link>

                    <Link href={"/community"} onClick={() => { setSelectedCommunity(null); setSelectedFriend(""); }} className='md:hidden w-12 cursor-pointer h-12 bg-background rounded-full flex items-center justify-center'>
                        <MessageCircle strokeWidth="1.5px" className='h-7 w-7' />
                    </Link>

                    <div className='w-5 m-1 h-[1px] bg-[#A9AAAC]' />

                    {
                        myCommunities?.map((community, index) => {
                            return (
                                <div onClick={() => { setSelectedCommunity(community); setSelectedFriend(""); }} key={index} className='w-12 cursor-pointer h-12 rounded-full flex items-center justify-center'>
                                    <Link className='flex items-center' href={`/community/${community.name}`}>
                                        <Avatar className="w-12 h-12 mx-auto">
                                            <AvatarImage className="object-cover" src={community.avatar} />
                                            <AvatarFallback className="text-lg">{community.name.substring(0, 1).toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                    </Link>
                                </div>
                            )
                        })
                    }

                    <div onClick={() => setCreateCommunityFormOpen(true)} className='w-12 cursor-pointer h-12 bg-background rounded-full flex items-center justify-center'>
                        <Plus strokeWidth="1.5px" className='h-8 w-8' />
                    </div>


                    <div className='mt-auto mb-4 flex flex-col gap-3'>
                        <Link href={userData.role == process.env.EMPLOYER_ID ? "/dashboard" : "/"} className='w-10 h-10 justify-center bg-background rounded-full flex items-center'>
                            <Home strokeWidth={"1px"} />
                        </Link>
                        <Link className='flex items-center' href={"/account"}>
                            <Avatar className="w-8 h-8 mx-auto">
                                <AvatarImage className="object-contain" src={userData.profilePic} />
                                <AvatarFallback className="bg-primary text-white">{userData.username.substring(0, 1).toUpperCase()}</AvatarFallback>
                            </Avatar>
                        </Link>
                    </div>
                </aside>

                {/* Friends/Community Members */}
                <aside className={` px-[10px] md:h-screen h-[calc(100vh-48px)] left-16 md:w-[250px] rounded-t-2xl md:rounded-t-none w-[calc(100vw-64px)] py-[20px] md:top-0 top-12 fixed bg-card dark:bg-background flex flex-col border-r border-r-border z-[25] overflow-hidden md:translate-x-0 transition-all duration-500 ${selectedFriend || selectedCommunity ? "-translate-x-[120%]" : "translate-x-0"}`}>


                    <div className='flex justify-between items-center w-full'>
                        <div className={`flex ml-2 items-baseline text-lg font-medium`}>
                            <p>{selectedCommunity ? selectedCommunity?.name : "Friends"}</p>
                        </div>
                    </div>
                    <ul className='w-full flex flex-col gap-1 mt-4'>
                        <div className={`hover:bg-muted md:active:bg-none active:bg-muted transition-all text-sm duration-300 text-center w-full rounded-full mb-2`}>

                            {
                                selectedCommunity ?
                                    <div className='flex items-center justify-between px-[10px] py-[4px] gap-2'>
                                        <p>MEMBERS</p>
                                        {selectedCommunity.owner == userData._id && <Plus onClick={() => setAddMemberOrCreateDM("Add Member")} className='h-5 w-5 cursor-pointer' strokeWidth="1px" />}
                                    </div>
                                    :
                                    <div className='flex items-center justify-between px-[10px] py-[4px] gap-2'>
                                        <p>DIRECT MESSAGES</p>
                                        <Plus onClick={() => setAddMemberOrCreateDM("Add Friend")} className='h-5 w-5 cursor-pointer' strokeWidth="1px" />
                                    </div>
                            }

                        </div>
                        {
                            selectedCommunity ?
                                selectedCommunity.members?.map((item: Member, index) => (
                                    <Link className={` ${selectedFriend == item.username ? "bg-activeLink border-[#e2dcff] text-black" : "hover:bg-muted border-transparent md:active:bg-none"} text-center transition-all border duration-300 w-full rounded-md`} onClick={() => { setSelectedFriend(item.username); setSelectedCommunity(null) }} href={`/community/dm/${item.username}`} key={index}>
                                        <li className={`flex items-center px-[10px] py-[6px] gap-2`}>
                                            <Avatar className="w-8 h-8">
                                                <AvatarImage className="object-cover" src={item.profilePic} />
                                                <AvatarFallback className="bg-primary text-white">{item.username.substring(0, 1).toUpperCase()}</AvatarFallback>
                                            </Avatar>
                                            <span className='text-nowrap'>{item.firstName}</span>
                                        </li>
                                    </Link>
                                ))
                                :
                                myFriends.map((item: Member, index) => (
                                    <Link className={` ${selectedFriend == item.username ? "bg-activeLink border-[#e2dcff] text-black" : "hover:bg-muted border-transparent md:active:bg-none"} text-center transition-all border duration-300 w-full rounded-md`} onClick={() => setSelectedFriend(item.username)} href={`/community/dm/${item.username}`} key={index}>
                                        <li className={`flex items-center px-[10px] py-[6px] gap-2`}>
                                            <Avatar className="w-8 h-8">
                                                <AvatarImage className="object-cover" src={item.profilePic} />
                                                <AvatarFallback className="bg-primary text-white">{item.username.substring(0, 1).toUpperCase()}</AvatarFallback>
                                            </Avatar>
                                            <span className='text-nowrap'>{item.firstName}</span>
                                        </li>
                                    </Link>
                                ))}

                    </ul>

                    <div className='absolute opacity-80 w-full left-0 bottom-2 px-[20px] py-[6px]'>
                        <Link href="/about" className='flex items-center py-[6px] gap-1'>
                            <span>About</span>
                            <span><ArrowUpRight strokeWidth="1.25px" className='h-5 w-5' /></span>
                        </Link>
                        <Link href="/contact" className='flex items-center py-[6px] gap-1'>
                            <span>Contact</span>
                            <span><ArrowUpRight strokeWidth="1.25px" className='h-5 w-5' /></span>
                        </Link>
                    </div>
                </aside>
                <Header />
                <main className={`md:w-[calc(100vw-314px)] w-[calc(100vw-64px)] md:px-[25px] px-2 h-screen fixed top-0 right-0`}>
                    {children}
                </main>

            </section>


            {/* createServerForm */}
            <div className={`${createCommunityFormOpen ? "fixed z-[200] h-screen w-screen top-0 left-0" : ""}`}>
                <div className={`w-[300px] md:w-[400px] bg-card rounded-xl shadow-black/20 shadow-[0px_0px_50px] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all flex flex-col p-8 duration-500 ${createCommunityFormOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}>
                    <XCircle role='button' onClick={() => setCreateCommunityFormOpen(false)} className='absolute top-4 right-4' />
                    <h3 className='text-center mb-3 font-medium text-2xl'>Create a Community</h3>
                    <form className='flex flex-col gap-3' onSubmit={(e) => handleCreateCommunity(e)}>
                        <Input value={communityName} onChange={(e) => setCommunityName(e.target.value)} type="text" placeholder='Enter Community Name' />
                        <Textarea value={communityDesc} onChange={(e) => setCommunityDesc(e.target.value)} placeholder='Enter Description' />
                        <Button type='submit'>Create</Button>
                    </form>
                </div>
            </div>
            {/* Add Member to Community Form and create a new DM Form */}
            <div className={`${addMemberOrCreateDM ? "fixed z-[200] h-screen w-screen top-0 left-0" : ""}`}>
                <div className={`w-[300px] md:w-[400px] bg-card rounded-xl shadow-black/20 shadow-[0px_0px_50px] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all flex flex-col p-8 duration-500 ${addMemberOrCreateDM ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}>
                    <XCircle role='button' onClick={() => setAddMemberOrCreateDM("")} className='absolute top-4 right-4' />
                    <h3 className='text-center mb-3 font-medium text-2xl'>{addMemberOrCreateDM}</h3>
                    <form className='flex flex-col gap-3' onSubmit={(e) => { e.preventDefault(); addMemberOrCreateDM == "Add Member" ? handleJoinCommunity(selectedCommunity?._id || "", addMemberUserId) : handleSendFriendReq(addMemberUserId) }}>
                        <Input value={addMemberUserId} onChange={(e) => setAddMemberUserId(e.target.value)} type="text" placeholder='Enter Username' />
                        <Button type='submit'>Add</Button>
                    </form>
                </div>
            </div>
        </CommunityContext.Provider>
    );
};

export default Layout;