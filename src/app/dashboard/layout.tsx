"use client";
import { ReactNode, useEffect, createContext } from 'react';
import Link from 'next/link';
import { HomeIcon, LucideEdit, MessageSquare } from 'lucide-react';
import { FaSuitcase } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import AccessDenied from '@/components/AccessDenied';
import { setMyCompanies } from '@/slices/myCompaniesSlice';
import { FetchCompaniesContext } from '@/contexts/FetchCompaniesContext';
import { setMyJobs } from '@/slices/myJobsSlice';

interface LayoutProps {
    children: ReactNode;
}

const navItems = [
    { path: "/dashboard", name: "Home", icon: <HomeIcon className='md:w-6 w-10 h-10 md:h-5' /> },
    { path: "/dashboard/postjob", name: "Post a Job", icon: <LucideEdit className='md:w-6 w-10 h-10 md:h-5' /> },
    { path: "/dashboard/postedjobs", name: "Posted Jobs", icon: <FaSuitcase className='md:w-6 w-10 md:h-5 h-10' /> },
    { path: "/dashboard/messages", name: "Messages", icon: <MessageSquare className='md:w-6 w-10 h-10 md:h-5' /> }
];

const Layout = ({ children }: LayoutProps) => {
    const userData = useSelector((state: RootState) => state.user.data);
    const dispatch = useDispatch();
    
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
            <section className='w-full bg-background/70 flex justify-center'>
                <h1 className='text-3xl font-semibold'>You are not logged in</h1>
                <span className='w-24 my-2 bg-muted h-[1px]'></span>
                <p className='text-xl font-medium'>Please log in first</p>
            </section>
        );
    }

    if (userData.role === process.env.EMPLOYER_ID) {
        return (
            <FetchCompaniesContext.Provider value={{ fetchCompanies }}>
                <section className='w-full bg-background/70 flex-row items-start justify-start'>
                    <aside className='md:w-[25%] md:min-h-screen md:static fixed bottom-0 flex md:flex-col w-full items-center md:px-6 md:py-6 bg-background/30'>
                        <ul className='w-full flex md:flex-col md:gap-3 gap-1'>
                            {navItems.map((item, index) => (
                                <Link className='bg-secondary/50 md:hover:bg-muted md:active:bg-none active:bg-muted text-center py-3 font-medium w-full rounded-md' href={item.path} key={index}>
                                    <li className='flex items-center md:justify-start justify-center md:px-6 px-3 gap-2'>
                                        <span>{item.icon}</span>
                                        <span className='hidden md:block'>{item.name}</span>
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    </aside>
                    <main className='md:w-[75%] w-full flex justify-center p-6'>
                        {children}
                    </main>
                </section>
            </FetchCompaniesContext.Provider>
        );
    } else {
        return <AccessDenied />;
    }
};

export default Layout;