"use client";
import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Globe, Home, Plus } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CommunityContext } from '@/contexts/CommunityContext';
import { ToggleTheme } from '@/components/ToggleTheme';
import NotificationButton from '@/components/notifications/notificationButton';
import Header from '@/components/community/Header';
import { myCommunites } from '@/store/suggestions';
import { Community } from '@/store/interfaces';

interface LayoutProps {
    children: ReactNode;
}




const Layout = ({ children }: LayoutProps) => {
    const userData = useSelector((state: RootState) => state.user.data);
    const [selectedCommunity, setSelectedCommunity] = useState<null | Community>(null);
    const [selectedFriend, setSelectedFriend] = useState("");

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

        <CommunityContext.Provider value={{}}>
            <section className='w-full bg-card dark:bg-background flex-row items-start justify-start'>

                {/* community nav */}
                <aside className='h-screen w-16 z-[25] gap-2 fixed left-0 top-0 flex flex-col items-center pt-4 bg-[#EAE5F2] dark:bg-[#1E152B]'>

                    <Link href={"/community"} onClick={() => { setSelectedCommunity(null); setSelectedFriend(""); }} className='w-12 cursor-pointer h-12 bg-primary rounded-full flex items-center justify-center'>
                        <Globe strokeWidth="1.5px" className='text-white h-8 w-8' />
                    </Link>

                    <div className='w-5 m-1 h-[1px] bg-[#A9AAAC]' />

                    {
                        myCommunites.map((community, index) => {
                            return (
                                <div onClick={() => { setSelectedCommunity(community); }} key={index} className='w-12 cursor-pointer h-12 rounded-full flex items-center justify-center'>
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

                    <div className='w-12 cursor-pointer h-12 bg-background rounded-full flex items-center justify-center'>
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
                                    </div>
                                    :
                                    <div className='flex items-center justify-between px-[10px] py-[4px] gap-2'>
                                        <p>DIRECT MESSAGES</p>
                                        <Plus className='h-5 w-5 cursor-pointer' strokeWidth="1px" />
                                    </div>
                            }

                        </div>
                        {myCommunites.map((item, index) => (
                            <Link className={` ${selectedFriend == item.name ? "bg-activeLink border-[#e2dcff] text-black" : "hover:bg-muted border-transparent md:active:bg-none"} text-center transition-all border duration-300 w-full rounded-md`} onClick={() => setSelectedFriend(item.name)} href={`/community/dm/${item.name}`} key={index}>
                                <li className={`flex items-center px-[10px] py-[6px] gap-2`}>
                                    <Avatar className="w-8 h-8">
                                        <AvatarImage className="object-cover" src={item.avatar} />
                                        <AvatarFallback className="bg-primary text-white">{item.name.substring(0, 1).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <span className='text-nowrap'>{item.name}</span>
                                </li>
                            </Link>
                        ))}
                    </ul>
                    <ul className='w-full flex flex-col gap-1 mt-[25px] pt-[25px] border-t border-border'>

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
                <main className={`md:w-[calc(100vw-314px)] w-[calc(100vw-64px)] px-[25px] h-screen fixed top-0 right-0`}>
                    {children}
                </main>
            </section>
        </CommunityContext.Provider>
    );
};

export default Layout;