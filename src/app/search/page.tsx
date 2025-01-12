import SearchBar from '@/components/SearchBar'
import React from 'react'

type Props = {}

const Search = (props: Props) => {
    return (
        <section className='bg-background relative z-0'>
            <div className="w-full pt-4 max-w-3xl mx-auto">
                <SearchBar />
            </div>
        </section>
    )
}

export default Search