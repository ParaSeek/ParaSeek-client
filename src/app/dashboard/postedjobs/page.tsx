"use client";
import { RootState } from '@/store/store';
import React from 'react'
import { useSelector } from 'react-redux';

const Page = () => {

  const myJobs = useSelector((state: RootState) => state.myJobs);

  console.log(myJobs);
  return (
    <div>Posted Jobs</div>
  )
}

export default Page