"use client";
import React from 'react'
import Link from 'next/link';
import ProfileCard from '@/components/account/ProfileCard';

const Page = () => {
  return (
    <div>
      <ProfileCard />
      <Link href="/account/profile">
        <div
          className="w-4/5 p-6 my-4 mx-auto bg-card font-bold cursor-pointer hover:bg-accent shadow-lg rounded-lg overflow-hidden"
        >
          Profile
        </div>
      </Link>
      <Link href="/account/qualifications">
        <div
          className="w-4/5 p-6 my-4 mx-auto bg-card font-bold cursor-pointer hover:bg-accent shadow-lg rounded-lg overflow-hidden"
        >
          Qualifications
        </div>
      </Link>
    </div>
  )
}

export default Page
