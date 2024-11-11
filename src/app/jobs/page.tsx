"use client";
import Jobcard from '@/components/jobs/Jobcard'
import Loader_dots from '@/components/Loader_dots';
import { RootState } from '@/store/store'
import React from 'react'
import { useSelector } from 'react-redux'

const page = () => {
  const jobs = useSelector((state: RootState) => state.jobs)
  return (
    <section className='bg-background/70 px-[5%] py-16 grid grid-cols-1 items-start sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
      {jobs[0].title =="" && <Loader_dots text='Loading Jobs'/>}
      {jobs[0].title !="" && jobs.map((job,index)=>{
        return <Jobcard id={job.title} title={job.title} companyName={job.companyName} workHours={job.workHours} salaryRange={job.salaryRange} employmentType={job.employmentType}  location={job.location} key={index} />
      })}      

    </section>
  )
}

export default page
