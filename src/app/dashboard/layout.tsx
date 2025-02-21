"use client";
import { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, BookPlus, BookUp, ChevronRight, Compass, Globe, HomeIcon, PanelLeftClose, PanelLeftOpen, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import AccessDenied from '@/components/AccessDenied';
import { setMyCompanies } from '@/slices/myCompaniesSlice';
import { DashboardContext } from '@/contexts/DashboardContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Header from '@/components/dashboard/Header';
import Footer from '@/components/dashboard/Footer';
import { useTheme } from 'next-themes';

interface LayoutProps {
    children: ReactNode;
}

const navItems = [
    { path: "/dashboard", name: "Dashboard", icon: <HomeIcon strokeWidth="1.25px" className='w-6 h-5' /> },
    { path: "/dashboard/postjob", name: "Post a Job", icon: <BookPlus strokeWidth="1.25px" className='w-6 h-5' /> },
    { path: "/dashboard/postedjobs", name: "Posted Jobs", icon: <BookUp strokeWidth="1.25px" className='w-6 h-5' /> },

];
const navItems2 = [
    { path: "/companies", name: "Companies", icon: <Compass strokeWidth="1.25px" className='w-6 h-5' /> },
    { path: "/community", name: "Community", icon: <Globe strokeWidth="1px" className='w-6 h-5' /> },
];

const Layout = ({ children }: LayoutProps) => {
    const userData = useSelector((state: RootState) => state.user.data);
    const dispatch = useDispatch();
    const [collapsed, setCollapsed] = useState(false);
    const [navOpen, setNavOpen] = useState(false);
    const [headerTitle, setHeaderTitle] = useState("Dashboard");
    const [selectedCompany, setSelectedCompany] = useState("");
    const { theme } = useTheme();
    // get my companies
    const fetchCompanies = async () => {
        try {
            const res = await fetch(`${process.env.SERVER_URL}/api/v1/company/get-my-companies`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const dataRes = await res.json();
            if (dataRes.success) {
                dispatch(setMyCompanies(dataRes.data));
                setSelectedCompany(dataRes.data[0]?.companyName)
            } else {
                console.error(dataRes.message);
            }
        } catch (error: any) {
            console.error(error);
        }
    };

    // const fetchJobs = async () => {
    //     if (userData && userData._id) {
    //         try {
    //             const res = await fetch(`${process.env.SERVER_URL}/api/v1/job/get-employer-jobs/${userData._id}`, {
    //                 method: 'GET',
    //                 credentials: 'include',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //             });
    //             const dataRes = await res.json();
    //             if (dataRes.success) {
    //                 dispatch(setMyJobs(dataRes.data));
    //                 console.log(dataRes);
    //             } else {
    //                 console.log(dataRes.message);
    //             }
    //         } catch (error: any) {
    //             console.error(error);
    //         }
    //     }
    // };

    useEffect(() => {
        // fetchJobs();
    }, [userData]);
    useEffect(() => {
        fetchCompanies();
        // fetchJobs();
    }, []);

    if (!userData) {
        return (
            <section className='w-full bg-background flex justify-center'>
                <h1 className='text-3xl font-semibold'>You are not logged in</h1>
                <span className='w-24 my-2 bg-muted h-[1px]'></span>
                <p className='text-xl font-medium'>Please log in first</p>
            </section>
        );
    }

    if (userData.role === process.env.EMPLOYER_ID) {
        return (
            <DashboardContext.Provider value={{ fetchCompanies, selectedCompany, setSelectedCompany, navOpen, setNavOpen, collapsed, headerTitle, setHeaderTitle }}>
                <section className='w-full bg-card dark:bg-background flex-row items-start justify-start'>
                    <aside onClick={() => setTimeout(() => setNavOpen(false), 100)} className={`${collapsed ? "w-[72px] px-[5px] py-[20px]" : "px-[10px] py-[20px] md:w-[20%]"} ${!navOpen ? "translate-x-[-30px] md:translate-x-0 w-0" : "w-[250px] z-[26]"}  min-h-screen left-0 top-0 fixed bg-card dark:bg-background flex flex-col border-r border-r-border z-[25] overflow-hidden transition-all duration-300`}>
                        <div className={`flex ${collapsed ? "flex-col gap-8" : ""} justify-between items-center w-full`}>
                            {collapsed && (theme=="light" ? <img src="/logo-light.svg" className='h-5 ' alt="logo" /> : <img src="/logo-dark.svg" className='h-5 ' alt="logo" />)}
                            {!collapsed && <Link href="/dashboard" className={`flex ml-2 items-baseline`}>
                                <span className="text-xl font-bold">Para</span>
                                <span className="font-medium text-primary dark:text-[#9757ff] text-xl">Seek.</span>
                            </Link>}
                            {
                                collapsed ?
                                    <PanelLeftOpen strokeWidth="1.25px" className={`cursor-pointer h-5 w-5 md:block hidden mx-auto`} onClick={() => setCollapsed(false)} />
                                    :
                                    <PanelLeftClose strokeWidth="1.25px" className={`cursor-pointer h-5 w-5 md:block hidden mr-2`} onClick={() => setCollapsed(true)} />
                            }
                            <X onClick={() => setNavOpen(false)} className='cursor-pointer md:hidden' />
                        </div>
                        <ul className='w-full flex flex-col gap-1 mt-[45px]'>
                            <Link className={`hover:bg-muted md:active:bg-none active:bg-muted transition-all duration-300 text-center font-medium w-full rounded-full mb-[25px] ${collapsed ? "border-none" : "border border-gray-300 dark:border-gray-700"}`} href="/account">
                                <li className={`flex items-center justify-between ${collapsed ? "px-[15px]" : "px-[10px]"} py-[4px] gap-2`}>
                                    <div className='flex items-center gap-[13px]'>
                                        <Avatar className="w-8 h-8">
                                            <AvatarImage className="object-contain" src={userData.profilePic} />
                                            <AvatarFallback className="bg-primary text-white">{userData.username.substring(0, 1).toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                        {!collapsed && <div className='text-left'>
                                            <h3 className='text-lg h-6 font-normal'>{userData.firstName}</h3>
                                            <p className='text-xs text-nowrap font-light'>View Profile</p>
                                        </div>}
                                    </div>
                                    <ChevronRight strokeWidth="1.25px" />
                                </li>
                            </Link>
                            {navItems.map((item, index) => (
                                <Link className={` ${headerTitle == item.name ? (collapsed ? "text-primary border-transparent" : "bg-activeLink border-[#e2dcff] text-black") : "hover:bg-muted border-transparent md:active:bg-none"} text-center transition-all border duration-300 w-full rounded-md`} onClick={() => setHeaderTitle(item.name)} href={item.path} key={index}>
                                    <li className={`flex items-center ${collapsed ? "px-[15px]" : "px-[10px]"} py-[6px] gap-2`}>
                                        <span>{item.icon}</span>
                                        {!collapsed && <span className='text-nowrap'>{item.name == "Dashboard" ? "Home" : item.name}</span>}
                                    </li>
                                </Link>
                            ))}
                        </ul>
                        <ul className='w-full flex flex-col gap-1 mt-[25px] pt-[25px] border-t border-border'>
                            {navItems2.map((item, index) => (
                                <Link className={` ${headerTitle == item.name ? (collapsed ? "text-primary border-transparent" : "bg-activeLink border-[#e2dcff] text-black") : "hover:bg-muted border-transparent md:active:bg-none"} text-center transition-all border duration-300 w-full rounded-md`} onClick={() => setHeaderTitle("Dashboard")} href={item.path} key={index}>
                                    <li className={`flex items-center ${collapsed ? "px-[15px]" : "px-[10px]"} py-[6px] gap-2 `}>
                                        <span>{item.icon}</span>
                                        {!collapsed && <span className='text-nowrap'>{item.name}</span>}
                                    </li>
                                </Link>
                            ))}
                        </ul>
                        {!collapsed && <div className='absolute opacity-80 w-full left-0 bottom-2 px-[20px] py-[6px]'>
                            <Link href="/about" className='flex items-center py-[6px] gap-1'>
                                <span>About</span>
                                <span><ArrowUpRight strokeWidth="1.25px" className='h-5 w-5' /></span>
                            </Link>
                            <Link href="/contact" className='flex items-center py-[6px] gap-1'>
                                <span>Contact</span>
                                <span><ArrowUpRight strokeWidth="1.25px" className='h-5 w-5' /></span>
                            </Link>
                        </div>}
                    </aside>
                    <Header />
                    <main onClick={() => setTimeout(() => setNavOpen(false), 100)} style={{ width: `${collapsed ? "calc(100vw - 80px)" : ""}` }} className={`relative ${collapsed ? "left-[72px]" : "md:left-[20%]"} md:w-[80%] w-full min-h-screen pt-20 px-[25px] flex justify-center transition-all duration-300`}>
                        {children}
                    </main>
                </section>
                <Footer />
            </DashboardContext.Provider>
        );
    } else {
        return <AccessDenied />;
    }
};

export default Layout;