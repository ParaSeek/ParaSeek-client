import SearchBar from '@/components/SearchBar'
import React from 'react'

type Props = {}

const Search = (props: Props) => {
    return (
        <section className='bg-background pt-16 relative z-0'>
            <div className="w-full pt-4 max-w-3xl mx-auto">
                <SearchBar />
            </div>
            <img src="/search.svg" className='lg:w-[50vw] md:w-[70vw] w-[90vw]' alt='placeholder image'/>
        </section>
    )
}

export default Search