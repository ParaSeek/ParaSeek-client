"use client";
import Jobcard from '@/components/jobs/Jobcard'
import { RootState } from '@/store/store'
import React from 'react'
import { useSelector } from 'react-redux'

const Page = ({ params }: { params: { slug: string } }) => {
    const param = params.slug
    const rectifiedParam = param.replaceAll(`%22`, `"`).replaceAll(`%3A`, `:`).replaceAll(`%2C`, `,`).replaceAll(`%7B`, `{`).replaceAll(`%7D`, `}`).replaceAll(`%20`, ` `)
    const searchQuery = JSON.parse(rectifiedParam)
    const recommendedJobs = useSelector((state: RootState) => state.recommendedJobs)
    const jobs = useSelector((state: RootState) => state.jobs);

    const searchResult = jobs.filter((job) => {
        return (job.title.toLowerCase().includes(searchQuery.title.toLowerCase()) || job.description.toLowerCase().includes(searchQuery.title.toLowerCase()) || job.companyName.toLowerCase().includes(searchQuery.title.toLowerCase()) || job.skills.join().toLowerCase().includes(searchQuery.title.toLowerCase())) && (job.location.city.toLowerCase().includes(searchQuery.location.toLowerCase()) || job.location.state.toLowerCase().includes(searchQuery.location.toLowerCase()) || job.location.country.toLowerCase().includes(searchQuery.location.toLowerCase())) && (job.skills.join().toLowerCase().includes(searchQuery.skill.toLowerCase()))
    })

    return (
        <section className='bg-background/70 px-[5%] pb-8 pt-20 flex flex-col items-start'>
            {
                searchResult.length > 0 ?
                    <>
                        <h1 className='text-2xl font-medium mb-4'>Search Results for {searchQuery.title != "" && `"${searchQuery.title}"`} {searchQuery.location != "" && `in "${searchQuery.location}"`} {searchQuery.skill != "" && `"${searchQuery.skill}"`} ({searchResult.length} Found)</h1>

                        <div className='grid grid-cols-1 items-start sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                            {searchResult.map((job, index) => {
                                return <Jobcard id={job._id} title={job.title} companyName={job.companyName} workHours={job.workHours} salaryRange={job.salaryRange} employmentType={job.employmentType} location={job.location} key={index} />
                            })}
                        </div>
                    </>
                    :
                    <>
                        <h1 className='text-2xl font-medium mb-4'>Uh oh! No Jobs found with the searched Query!</h1>
                    </>
            }
            <h1 className='text-2xl font-medium mt-12 mb-4'>{searchResult.length > 0 && "More"} Recommended Jobs for You</h1>

            <div className='grid grid-cols-1 items-start sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {recommendedJobs.length > 0 ? recommendedJobs.map((job, index) => {
                    return <Jobcard id={job.job._id} title={job.job.title} companyName={job.job.companyName} workHours={job.job.workHours} salaryRange={job.job.salaryRange} employmentType={job.job.employmentType} location={job.job.location} key={index} score={job.score} />
                }) : "No jobs found at the moment, Check back later!"}
            </div>

        </section>
    )
}

export default Page