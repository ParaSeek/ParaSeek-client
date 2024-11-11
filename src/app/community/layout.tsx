"use client";
import { ReactNode } from 'react';
import Link from 'next/link';
interface LayoutProps {
    children: ReactNode;
}

const navItems = [
    { path: "/community", name: "Home"},
    { path: "/community/posts", name: "Posts" },
    { path: "/community/groups", name: "Groups" },
];
const Layout = ({ children }: LayoutProps) => {
    return (
        <section className='w-full bg-background/70 flex-row items-start justify-start'>
            <aside style={{ minHeight: "calc(100vh - 64px)" }} className='w-[25%] flex flex-col items-center px-6 py-20 bg-background/30'>
                <ul className='w-full flex flex-col gap-3'>
                    {navItems.map((item, index) => {
                        return (
                            <Link className='bg-secondary/50 hover:bg-muted text-center py-3 font-medium w-full rounded-md' href={item.path} key={index}><li>{item.name}</li></Link>
                        )
                    })}
                </ul>
            </aside>
            <main className='w-[75%] flex justify-center p-6'>
            {children}
            </main>
        </section>
    );
}

export default Layout;
