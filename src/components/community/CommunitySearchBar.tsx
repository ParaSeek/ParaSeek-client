import { Search } from 'lucide-react'
import React from 'react'

const CommunitySearchBar = () => {
    return (
        <div className='z-10 relative max-w-[400px] md:w-full rounded-full flex items-center px-5 text-[#444444] dark:text-[#ABABAB] gap-2 min-w-[250px] h-12 bg-[#F8F4FF] dark:bg-[#222222]'>
            <Search />
            <input type='text' placeholder='React, AI, Machine Learning, etc.' className='w-full h-full bg-transparent rounded-full p-2 text-[#444444] dark:text-[#ABABAB] placeholder:text-[#444444] dark:placeholder:text-[#ABABAB] focus:outline-none focus:ring-none' />
        </div>
    )
}

export default CommunitySearchBar