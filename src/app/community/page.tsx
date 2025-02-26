"use client";
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import React from 'react'
import MyLottieAnimation from '@/components/lottieAnimation'
import { myCommunites } from '@/store/suggestions';


const Page = () => {

    return (
        <div className='flex items-center flex-col h-screen gap-8'>
            <div className='w-full h-[350px] relative pt-40 flex flex-col items-center gap-3'>
                <h1 className='z-10 relative text-center md:text-3xl text-xl font-medium'>Find Communities that match your <span className='custom-gradient text-transparent'>interests</span></h1>
                <div className='z-10 relative max-w-[400px] md:w-full rounded-full flex items-center px-5 text-[#444444] dark:text-[#ABABAB] gap-2 min-w-[250px] h-12 bg-[#F8F4FF] dark:bg-[#222222]'>
                    <Search />
                    <input type='text' placeholder='React, AI, Machine Learning, etc.' className='w-full h-full bg-transparent rounded-full p-2 text-[#444444] dark:text-[#ABABAB] placeholder:text-[#444444] dark:placeholder:text-[#ABABAB] focus:outline-none focus:ring-none' />
                </div>
                <div className='absolute top-12 opacity-25 dark:opacity-45 z-0'>
                    <MyLottieAnimation />
                </div>
            </div>
            <div className='h-[calc(100vh-350px)] w-full pb-4 flex flex-col gap-3'>
                <h1 className='md:text-xl md:text-left text-center text-base'>Explore Popular Communities</h1>
                <div className='w-full gap-3 grid grid-cols-1 md:grid-cols-2 pr-2 lg:grid-cols-3 overflow-y-auto'>
                    {
                        myCommunites.map((c, i) => {
                            return (

                                <div key={i} className='group relative cursor-pointer rounded-xl bg-[#F8F4FF] dark:bg-[#222222]'>
                                    <img src={c.avatar} className='group-hover:scale-95 transition-all duration-500 w-full rounded-xl h-[150px] bg-card object-cover' alt="" />
                                    <p className='absolute top-0 left-0 pt-auto rounded-xl bg-black/20 text-white backdrop-blur group-hover:flex group-hover:scale-95 transition-all duration-500 scale-0 px-2'>
                                        {c.description}
                                    </p>
                                    <div className='p-2 flex justify-between items-center'>
                                        <h5 className='group-hover:underline text-lg font-medium'>{c.name}</h5>
                                        <Button>Join</Button>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        </div>


    )
}

export default Page