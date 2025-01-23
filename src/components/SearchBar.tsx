"use client";
import { SearchIcon } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { useRouter } from 'next/navigation';
import { jobTitles, locations } from '@/store/suggestions';

const SearchBar = () => {
    const [searchTitle, setSearchTitle] = useState("");
    const [searchLocation, setSearchLocation] = useState("");
    const [titleSuggestionVisible, setTitleSuggestionVisible] = useState(false)
    const [locationSuggestionVisible, setLocationSuggestionVisible] = useState(false)
    const [titleSuggestions, setTitleSuggestions] = useState<string[]>([])
    const [locationSuggestions, setLocationSuggestions] = useState<string[]>([])
    const [searchUrl, setSearchUrl] = useState("");
    const router = useRouter();

    useEffect(() => {
        const url = {
            title: searchTitle,
            location: searchLocation,
            skill: ""
        }
        setSearchUrl(`/search/${JSON.stringify(url)}`)
    }, [searchTitle, searchLocation])

    const handleSearch = () => {
        if (searchTitle.trim() !== "" || searchLocation.trim() !== "") {
            router.push(searchUrl);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
        const value = e.target.value;
        if (type === 'title') {
            setSearchTitle(value);
            setTitleSuggestions(jobTitles.filter(title => title.toLowerCase().includes(value.toLowerCase())));
        } else {
            setSearchLocation(value);
            setLocationSuggestions(locations.filter(location => location.toLowerCase().includes(value.toLowerCase())));
        }
    };

    const handleSuggestionClick = (suggestion: string, type: string) => {
        if (type === 'title') {
            setSearchTitle(suggestion);
        } else {
            setSearchLocation(suggestion);
        }
    };

    return (
        <div className="w-full p-1 relative z-[25] rounded-full">
            <form onSubmit={(e) => e.preventDefault()} className={`transition-all duration-300 flex items-center justify-center w-full gap-2 p-2 rounded-full bg-card`}>
                <div className="relative w-full">
                    <input
                        type="text"
                        placeholder="Job Title"
                        value={searchTitle}
                        onFocus={() => setTitleSuggestionVisible(true)}
                        onBlur={() => setTimeout(() => setTitleSuggestionVisible(false), 200)}
                        onChange={(e) => handleInputChange(e, 'title')}
                        className="w-full px-4 border-r-2 border-border focus:outline-none bg-transparent"
                    />
                    {titleSuggestionVisible && (
                        <ul className="absolute top-[64px] w-full bg-background max-h-[500px] overflow-y-scroll rounded-md z-10">
                            {titleSuggestions.map((suggestion, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleSuggestionClick(suggestion, 'title')}
                                    className="p-2 cursor-pointer hover:bg-muted"
                                >
                                    {suggestion}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="relative w-full">
                    <input
                        type="text"
                        placeholder="Location"
                        value={searchLocation}
                        onFocus={() => setLocationSuggestionVisible(true)}
                        onBlur={() => setTimeout(() => setLocationSuggestionVisible(false), 200)}
                        onChange={(e) => handleInputChange(e, 'location')}
                        className="w-full px-4 focus:outline-none bg-transparent"
                    />
                    {locationSuggestionVisible && (
                        <ul className="absolute top-[64px] backdrop-blur-sm w-full bg-background max-h-[500px] overflow-y-scroll rounded-md z-10">
                            {locationSuggestions.map((suggestion, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleSuggestionClick(suggestion, 'location')}
                                    className="p-2 cursor-pointer hover:bg-muted"
                                >
                                    {suggestion}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <button
                    onClick={handleSearch}
                    type="submit"
                    className="outline-none border-none bg-none"
                >
                    <p className='bg-primary text-white px-5 py-2 rounded-full hover:bg-primary'>Search</p>
                </button>
            </form>
        </div>
    );
};

export default SearchBar;
