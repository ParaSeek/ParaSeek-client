"use client";
import { ReactNode } from 'react';
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion';
import { RootState } from '@/store/store'
import { useRouter } from 'next/navigation';
import Loader_dots from "@/components/Loader_dots";

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const userData = useSelector((state: RootState) => state.user.data)
    const userLog = useSelector((state: RootState) => state.user.isLoggedIn)
    const router = useRouter();
    if (!userLog) {
        router.push('/login');
      }
    
    
      if (!userData) {
        return <section className='bg-background justify-center'>
          <Loader_dots text='Loading'/>
        </section>
      }
    return (

        <div style={{minHeight: "calc(100vh - 64px)"}} className="flex bg-background/70">
            <motion.main
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex-1 py-6"
            >
                {children}
            </motion.main>
        </div>
    );
}

export default Layout;
