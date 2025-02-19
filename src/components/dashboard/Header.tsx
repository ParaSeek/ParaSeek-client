import React, { useState } from 'react'
import { ToggleTheme } from '../ToggleTheme'
import { useDashboardContext } from '@/contexts/DashboardContext'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { ChevronDown } from 'lucide-react'
import NotificationButton from '../notifications/notificationButton'



type Props = {}

const Header = (props: Props) => {

    const myCompanies = useSelector((state: RootState) => state.myCompanies);
    const [customSelectOpen, setCustomSelectOpen] = useState(false);
    const { collapsed, setNavOpen, headerTitle, selectedCompany, setSelectedCompany } = useDashboardContext();

    return (
        <div style={{ width: collapsed ? "calc(100vw - 72px)" : "" }} className={`fixed  backdrop-blur-sm right-0 top-0 z-[25] flex px-[25px] py-[15px] items-center justify-between transition-all duration-300 w-full md:w-[80%]`}>
            <div className='flex items-center gap-2'>
                <HamburgerMenuIcon onClick={() => setNavOpen(true)} className='md:hidden' />
                <div className='flex items-center gap-3'>
                    {/* <h1 className='font-bold'>{headerTitle}</h1> */}

                    {/* custom select */}
                    <div className='text-sm' onMouseEnter={() => setCustomSelectOpen(true)} onClick={() => setCustomSelectOpen(!customSelectOpen)} onMouseLeave={() => setCustomSelectOpen(false)}>
                        <span
                            className='cursor-pointer flex items-center gap-1'
                        >
                            {selectedCompany || "No company added yet"}
                            {selectedCompany && <ChevronDown className='w-4 h-4' strokeWidth="1.5px" />}
                        </span>
                        <div className={`flex absolute rounded-md flex-col bg-card shadow-[0px_0px_25px] shadow-black/5  overflow-hidden transition-all duration-300 ${customSelectOpen ? "h-fit" : "h-0"}`}>
                            {myCompanies.map((company, index) => (
                                <span onClick={() => { setSelectedCompany(company.companyName); setTimeout(() => setCustomSelectOpen(false), 200) }} className='cursor-pointer hover:bg-primary/10 px-3 py-2' key={index}>{company.companyName}</span>
                            ))
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex items-center'>
                <ToggleTheme />
                <NotificationButton />
            </div>
        </div>
    )
}

export default Header