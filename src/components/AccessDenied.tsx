import React from 'react'

const AccessDenied = () => {
    return (
        <section className='w-full bg-background/70 flex justify-center'>
            <h1 className='text-3xl font-semibold'>
                Access Denied
            </h1>
            <span className='w-24 my-2 bg-muted h-[1px]'></span>
            <p className='text-xl font-medium'>
                You don't have access to this page
            </p>
        </section>
    )
}

export default AccessDenied