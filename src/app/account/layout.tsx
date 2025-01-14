"use client";
import { ReactNode, useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { motion } from 'motion/react';
import { RootState } from '@/store/store'
import { useRouter } from 'next/navigation';
import Loader_dots from "@/components/Loader_dots";

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const userData = useSelector((state: RootState) => state.user.data)
    // const userLog = useSelector((state: RootState) => state.user.isLoggedIn)
    const router = useRouter();
    const token = localStorage.getItem('accessToken')
    useEffect(() => {
        const checkAuth = async () => {
            if (!token) {
                await new Promise(resolve => setTimeout(resolve, 2000));
                if (!token) {
                    router.push('/login');
                }
            }
        };

        checkAuth();
    }, [token, router]);


    if (!userData) {
        return <section className='bg-background justify-center'>
            <Loader_dots text='Loading' />
        </section>
    }
    return (

        <div className="flex bg-background/70 min-h-screen pt-16">
            <motion.main
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex-1 py-6 md:py-16"
            >
                {children}
            </motion.main>
        </div>
    );
}

export default Layout;
