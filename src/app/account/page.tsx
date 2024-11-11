"use client";
import React from 'react'
import Link from 'next/link';
import ProfileCard from '@/components/account/ProfileCard';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const Page = () => {
  const userData = useSelector((state: RootState) => state.user.data)
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
      {userData.role === process.env.JOBSEEKER_ID && <Link href="/account/qualifications">
        <div
          className="w-4/5 p-6 my-4 mx-auto bg-card font-bold cursor-pointer hover:bg-accent shadow-lg rounded-lg overflow-hidden"
        >
          Qualifications
        </div>
      </Link>}
      {userData.role === process.env.EMPLOYER_ID && <Link href="/dashboard">
        <div
          className="w-4/5 p-6 my-4 mx-auto bg-card font-bold cursor-pointer hover:bg-accent shadow-lg rounded-lg overflow-hidden"
        >
          Employer Dashboard
        </div>
      </Link>}
    </div>
  )
}

export default Page
