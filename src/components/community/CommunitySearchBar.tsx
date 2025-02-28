import { useCommunityContext } from '@/contexts/CommunityContext'
import { Community } from '@/store/interfaces';
import { Search } from 'lucide-react'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const CommunitySearchBar = () => {
    const [searchValue, setSearchValue] = useState("");
    const { myCommunities } = useCommunityContext();
    const [searchResults, setSearchResults] = useState<Community[]>([]);
    useEffect(() => {
        if (searchValue.trim()) {
            const results = myCommunities.filter((community) => community.name.toLowerCase().includes(searchValue.toLowerCase()) || community.description.toLowerCase().includes(searchValue.toLowerCase()));
            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
    }, [searchValue])

    return (
        <div className='z-10 relative max-w-[400px] md:w-full rounded-full flex items-center px-5 text-[#444444] dark:text-[#ABABAB] gap-2 min-w-[250px] h-12 bg-[#F8F4FF] dark:bg-[#222222]'>
            <Search />
            <input type='text' placeholder='React, AI, Machine Learning, etc.' className='w-full h-full bg-transparent rounded-full p-2 text-[#444444] dark:text-[#ABABAB] placeholder:text-[#444444] dark:placeholder:text-[#ABABAB] focus:outline-none focus:ring-none' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
            <div className='w-full absolute top-14 left-0 max-h-[500px] overflow-y-auto rounded-xl bg-[#F8F4FF] dark:bg-[#222222]'>
                {searchResults.map((community, index) => {
                    return (
                        <Link href={`/community/${community.name}`} key={index} className='flex items-center cursor-pointer gap-2 p-4 group transition-all duration-300 dark:hover:bg-[#755aa3] hover:bg-[#e0cfff]'>
                            <div className='flex items-center gap-2'>
                                <img src={community.avatar} alt={community.name} className='w-8 h-8 rounded-full' />
                                <div className='text-[#444444]  group-hover:dark:text-white dark:text-[#ABABAB]'>{community.name}</div>
                            </div>
                        </Link>
                    )
                }
                )}
            </div>
        </div>
    )
}

export default CommunitySearchBar