"use client";
import Jobcard from '@/components/jobs/Jobcard'
import Loader from '@/components/Loader';
import { RootState } from '@/store/store'
import React from 'react'
import { useSelector } from 'react-redux'

const Page = () => {
  const jobs = useSelector((state: RootState) => state.jobs)
  if (jobs.length == 0) {
    return (
      <section className='bg-background/70 px-[5%] py-16 grid grid-cols-1 place-items-start'>
        <h1 className='text-2xl font-semibold'>Uh oh! No Jobs found!</h1>
      </section>
    )
  }
  return (
    <section className='bg-background/70 px-[5%] py-4 sm:py-16 grid grid-cols-1 place-items-center sm:place-items-start xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-6'>
      {jobs[0].title == "" && <Loader />}
      {jobs[0].title != "" && jobs.map((job, index) => {
        return <Jobcard id={job._id} title={job.title} companyName={job.companyName} workHours={job.workHours} salaryRange={job.salaryRange} employmentType={job.employmentType} location={job.location} key={index} />
      })}

    </section>
  )
}

export default Page
