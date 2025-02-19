import Link from 'next/link'
import React from 'react'
import { useDashboardContext } from '@/contexts/DashboardContext'

type Props = {}

const Footer = (props: Props) => {
    const { collapsed } = useDashboardContext();
    return (
        <footer style={{ width: collapsed ? "calc(100vw - 72px)" : "" }} className="ml-auto w-full md:w-[80%] dark:bg-[#101010] bg-gray-50 dark:bg-gray-750 py-6 px-2">
            <div className="container mx-auto flex justify-between flex-col md:flex-row">
                <div className="flex flex-col items-center text-center md:items-start">
                    <p className="md:mr-3">© 2024 ParaSeek. All rights reserved.</p>
                </div>
                <div className="flex text-center md:self-end flex-col md:flex-row">
                    <Link href="#" className="md:mr-3 hover:underline border-r border-r-gray-500 pr-3">Privacy Policy</Link>
                    <Link href="#" className="md:mr-3 hover:underline">Terms of Service</Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer