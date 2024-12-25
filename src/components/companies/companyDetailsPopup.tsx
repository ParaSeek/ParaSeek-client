import React from 'react'
import { Button } from '../ui/button'

const CompanyDetailsPopup = (props: any) => {

    if (props.company) {
        return (
            //   company details popup 
            <div className={`${props.companyDetailsOpen ? "w-[100vw] h-[95vh] fixed top-16 left-0 backdrop-blur-sm overflow-scroll " : "w-0 h-0 overflow-hidden"} transition-all duration-300 flex items-center justify-center`}>
                <div className='h-[80vh] w-[80vw] bg-card rounded-lg shadow-[0px_0px_10px] dark:border dark:border-muted shadow-black/20 p-6'>
                    <div className='flex justify-between'>
                        <div className='flex items-center gap-3'>
                            {
                                props.company.companyLogo && props.company.companyLogo.includes("https://") ?
                                    <img width="100px" height="100px" className='rounded-sm' src={props.company.companyLogo} alt={props.company.companyName.charAt(0)} />
                                    :
                                    <p className='w-[100px] h-[100px] text-white bg-primary rounded-sm grid place-items-center text-3xl font-semibold'>
                                        {props.company.companyName.charAt(0)}
                                    </p>
                            }
                            <span className='h-[64px] w-[2px] rounded-full bg-muted '></span>
                            <div>
                                <h1 className='text-lg font-semibold'>{props.company.companyName}</h1>
                                <p>{props.company.headquarters}</p>
                            </div>
                        </div>
                        <Button onClick={() => props.setCompanyDetailsOpen(false)} className='text-xl font-semibold' variant="outline" size="icon">x</Button>

                    </div>
                </div>
            </div>
        )
    }
}

export default CompanyDetailsPopup