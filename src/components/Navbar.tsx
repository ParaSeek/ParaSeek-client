import React from 'react';
import Link from 'next/link';

export const Navbar = () => {
    return (
        <header className="bg-background/50 flex items-center sticky h-16 px-2 top-0 backdrop-blur-sm">
            <nav className="container mx-auto flex justify-between items-center">
                <div className="text-lg font-bold">
                    <Link href="/" className='flex items-baseline'>
                        <span>Para</span><span className='font-medium text-primary text-xl'>Seek.</span>
                    </Link>
                </div>
                <div className="flex items-center space-x-4">
                    <Link href="/jobs">
                        <p className="hover:text-primary font-medium">Jobs</p>
                    </Link>
                    <Link href="/companies">
                        <p className= "hover:text-primary font-medium">Companies</p>
                    </Link>
                    <Link href="/about">
                        <p className="hover:text-primary font-medium">About</p>
                    </Link>
                    <Link href="/contact">
                        <p className="hover:text-primary font-medium">Contact</p>
                    </Link>
                    <Link href="/login">
                        <p className="bg-primary font-medium text-primary-foreground px-3 py-2 rounded-md hover:bg-primary/90">Login</p>
                    </Link>
                </div>
            </nav>
        </header>
    );
};