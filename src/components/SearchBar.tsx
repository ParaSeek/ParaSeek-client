"use client";
import { SearchIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { CaretUpIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';

const SearchBar = () => {
    const [searchOpen, setSearchOpen] = useState(false)
    const [searchTitle, setSearchTitle] = useState("");
    const [searchLocation, setSearchLocation] = useState("");
    const [searchUrl, setSearchUrl] = useState("");
    const router = useRouter();
    useEffect(() => {
        const url = {
            title: searchTitle,
            location: searchLocation
        }
        setSearchUrl(`/search/${JSON.stringify(url)}`)        
    }, [searchTitle, searchLocation])

    const handleSearch = () =>{
        if(searchTitle.trim()!="" || searchLocation.trim()!=""){
            router.push(searchUrl);
        }
    }
    return (
        <div className="w-full p-1 rounded-full">
            <form onSubmit={(e) => e.preventDefault()} className={`${searchOpen ? "top-16" : "-top-16"} bg-background/70 transition-all duration-300 flex items-center justify-center w-full md:static gap-1 fixed left-2/4 translate-x-[-50%] px-[5%] pt-1 pb-3 md:p-0 md:translate-x-0`}>
                <input
                    type="text"
                    placeholder="Job Title, Keywords, or Company"
                    onChange={(e) => setSearchTitle(e.target.value)}
                    className="w-full px-4 py-3 rounded-l-full focus:outline-none focus:ring-2 focus:ring-primary bg-secondary"
                />
                <input
                    type="text"
                    placeholder="Location"
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="w-full px-4 py-3 rounded-r-full focus:outline-none focus:ring-2 focus:ring-primary bg-secondary"
                />
                    <button
                        onClick={handleSearch}
                        type="submit"
                        className="outline-none border-none bg-none ml-1"
                    >
                        <TooltipProvider>
                            <Tooltip delayDuration={0}>
                                <TooltipTrigger asChild><SearchIcon className='h-7 w-7' /></TooltipTrigger>
                                <TooltipContent side="bottom">
                                    <p>Search</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </button>
            </form>
            {searchOpen ? <CaretUpIcon onClick={() => { setSearchOpen(!searchOpen) }} className='h-7 w-7' /> : <SearchIcon onClick={() => { setSearchOpen(!searchOpen) }} className='block md:hidden h-7 w-7' />}
        </div >
    )
}

export default SearchBar