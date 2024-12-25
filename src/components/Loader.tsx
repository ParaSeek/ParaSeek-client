import React from 'react'

const Loader = () => {
    return (
        <div className='fixed h-screen w-screen backdrop-blur-sm top-0 left-0 flex justify-center items-center'>
            <div className='animate-spin rounded-full h-28 w-28 border-t-4 border-b-4 border-primary'>
            </div>
        </div>
    )
}

export default Loader