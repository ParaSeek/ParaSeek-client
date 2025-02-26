import React from 'react'

const NotFound = () => {
    return (
        <section className='w-full bg-transparent flex justify-center'>
            <h1 className='md:text-3xl text-xl text-center font-semibold'>
                404 - Not Found
            </h1>
            <div className='w-24 my-2 bg-gray-400 dark:bg-gray-700 rounded-full h-[2px]'></div>
            <p className='text-xl text-center font-medium'>
                You have followed a broken link or it has been removed.
            </p>
        </section>
    )
}

export default NotFound