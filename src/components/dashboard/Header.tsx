import React from 'react'
import { ToggleTheme } from '../ToggleTheme'
import { useTheme } from 'next-themes'
import { useDashboardContext } from '@/contexts/DashboardContext'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'

type Props = {}

const Header = (props: Props) => {
    const { theme } = useTheme();
    const { collapsed, setNavOpen, headerTitle } = useDashboardContext();
    return (
        <div style={{ width: collapsed ? "calc(100vw - 72px)" : "" }} className={`fixed backdrop-blur-sm right-0 top-0 z-[25] flex px-[25px] py-[15px] items-center justify-between transition-all duration-300 w-full md:w-[80%]`}>
            <div className='flex items-center gap-2'>
            <HamburgerMenuIcon onClick={() => setNavOpen(true)} className='md:hidden' />
            <div>
                <h1 className='font-bold'>{headerTitle}</h1>
            </div>
            </div>
            <div className='flex items-center gap-[15px]'>
                <ToggleTheme />
                <img className='cursor-pointer p-2 rounded-full hover:bg-muted' width={35} src={`${theme != "light" ? "/bell-dark.svg" : "/bell.svg"}`} alt="" />
            </div>
        </div>
    )
}

export default Header