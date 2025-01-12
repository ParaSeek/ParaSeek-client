"use client";
import { ReactNode } from 'react';
import Link from 'next/link';
import { Edit, HomeIcon } from 'lucide-react';
import { FaPeopleGroup } from 'react-icons/fa6';
interface LayoutProps {
    children: ReactNode;
}

const navItems = [
    { path: "/community", name: "Home", icon: <HomeIcon className='md:w-6 w-10 h-10 md:h-5' /> },
    { path: "/community/posts", name: "Posts", icon: <Edit className='md:w-6 w-10 h-10 md:h-5' /> },
    { path: "/community/groups", name: "Groups", icon: <FaPeopleGroup className='md:w-6 w-10 h-10 md:h-5' /> },
];
const Layout = ({ children }: LayoutProps) => {
    return (
        <section className='w-full bg-background/70 flex-row items-start justify-start'>
            <aside className='md:w-[25%] md:min-h-screen md:static fixed bottom-0 flex md:flex-col w-full items-center md:px-6 md:py-16 bg-background/30'>
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
    );
}

export default Layout;
