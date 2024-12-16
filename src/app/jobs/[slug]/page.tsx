"use client";
import Jobcard from '@/components/jobs/Jobcard'
import { Button } from '@/components/ui/button'
import { RootState } from '@/store/store'
import { Link as LinkIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'

const Page = ({ params }: { params: { slug: string } }) => {
    const param = params.slug
    const jobTitle = param.replace('%20', ' ')
    
    const jobs = useSelector((state: RootState)=>state.jobs)
    const job1 = jobs.filter((job)=>{
        return job.title === jobTitle
    })
    const job = job1[0];
    if(job){
    return (
        <section className='bg-background/60 px-[5%] py-8 gap-8'>
            <div className="bg-card px-6 py-6 w-full rounded-xl flex flex-col gap-3">
                <div>
                    <h2 className='hover:underline inline cursor-pointer font-semibold'>{job.companyName}</h2>
                </div>
                <div>
                    <h2 className='inline text-2xl font-bold'>{job.title}</h2>
                </div>
                <div className='flex gap-1 md:gap-3 flex-col md:flex-row'>
                    <p>{job.location.city}, {job.location.state}, {job.location.country}</p>
                    <p className='hidden md:flex'>•</p>
                    <p>Posted on {new Date(job.postedDate).toDateString()} at {new Date(job.postedDate).toLocaleTimeString()}</p>
                    <p className='hidden md:flex'>•</p>
                    <p>{job.numberOfOpenings} openings</p>
                </div>
                <div className='flex gap-3 flex-wrap'>
                    {job.remote && <p className='bg-muted px-2 py-1 rounded'>Remote</p>}
                    <p className='bg-muted px-2 py-1 rounded'>{job.employmentType}</p>
                    <p className='bg-muted px-2 py-1 rounded'>{job.salaryRange.minSalary} - {job.salaryRange.maxSalary} {job.salaryRange.currency}/month</p>
                </div>
                <hr className='my-4' />
                <div className='flex flex-col gap-2 relative'>
                    <h3 className='text-lg font-medium'>About the Job</h3>
                    <p className='text-justify'>{job.description}</p>
                    <p>Job Type : {job.jobType}</p>
                    <p>Eligibility : {job.requiredEducation}</p>
                    <p>Required Experience : {job.experienceLevel}</p>
                    <p>Required Skills : {job.skills.join(', ')}</p>
                    <p>Required Languages : {job.requiredLanguages.join(', ')}</p>
                    <p>Work Hours : {job.workHours}</p>
                    <p>Remote : {job.remote ? 'Yes' : 'No'}</p>
                    <p>Benefits : {job.benefits.join(', ')}</p>
                </div>
                <hr className='my-4' />
                <div className='flex flex-col gap-2'>
                    <Link href={job.applicationLink}><Button className='font-semibold text-lg'>Apply Now<LinkIcon className='ml-1 h-4' /></Button></Link>
                    <p className='mt-1'>Instructions : {job.applicationInstructions}</p>
                    <p >Deadline : {new Date(job.applicationDeadline).toLocaleDateString()}</p>
                </div>
            </div>
            <h1 className='text-2xl self-start font-semibold'>Recommended Jobs for you :</h1>
            <div className='w-full rounded-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {Recommendedjobs.map((job, index) => {
                    return <Jobcard id={job.title} title={job.title} companyName={job.companyName} workHours={job.workHours} salaryRange={job.salaryRange} employmentType={job.employmentType} location={job.location} key={index} />
                })}
            </div>
        </section>
    )
} else {
    return (<p>Invalid Link</p>)
}
}

export default Page

// const job = {
//     "title": "Software Engineer",
//     "description": "Develop and maintain software applications. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil fugiat itaque ea, nam amet blanditiis dolorem aspernatur porro vitae explicabo dolor autem repellat nulla quae similique fugit laudantium, provident iure. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil fugiat itaque ea, nam amet blanditiis dolorem aspernatur porro vitae explicabo dolor autem repellat nulla quae similique fugit laudantium, provident iure. Lorem ipsum dolor sit. ",
//     "companyName": "Tech Innovations",
//     "location": {
//         "city": "San Francisco",
//         "state": "CA",
//         "country": "USA"
//     },
//     "employmentType": "Full-time",
//     "remote": true,
//     "salaryRange": {
//         "minSalary": 80000,
//         "maxSalary": 120000,
//         "currency": "USD"
//     },
//     "experienceLevel": "Mid Level",
//     "jobType": "Technical",
//     "skills": ["JavaScript", "React", "Node.js"],
//     "postedBy": "60d5f491e82e3b001f68ddef",
//     "postedDate": "2024-10-01T00:00:00Z",
//     "applicationDeadline": "2024-11-01T00:00:00Z",
//     "isActive": true,
//     "requiredEducation": "Bachelor's Degree",
//             "requiredLanguages": ["English", "Hindi"],
//             "numberOfOpenings": 3,
//             "applicationLink": "http://techinnovations.com/apply",
//             "contactEmail": "eric.smith@techinnovations.com",
//             "applicationInstructions": "Please submit your resume and cover letter.",
//             "benefits": ["Health Insurance", "Paid Time Off"],
//             "workHours": "9 AM - 5 PM",
//             "googleDriveFolderId": "1A2B3C4D5E"
// }


            const Recommendedjobs = [
            {
                "title": "Software Engineer",
            "description": "Develop and maintain software applications.",
            "companyName": "Tech Innovations",
            "location": {
                "city": "San Francisco",
            "state": "CA",
            "country": "USA"
        },
            "employmentType": "Full-time",
            "remote": true,
            "salaryRange": {
                "minSalary": 80000,
            "maxSalary": 120000,
            "currency": "USD"
        },
            "experienceLevel": "Mid Level",
            "jobType": "Technical",
            "skills": ["JavaScript", "React", "Node.js"],
            "postedBy": "60d5f491e82e3b001f68ddef",
            "postedDate": "2024-10-01T00:00:00Z",
            "applicationDeadline": "2024-11-01T00:00:00Z",
            "isActive": true,
            "requiredEducation": "Bachelor's Degree",
            "requiredLanguages": ["English"],
            "numberOfOpenings": 3,
            "applicationLink": "http://techinnovations.com/apply",
            "contactEmail": "eric.smith@techinnovations.com",
            "applicationInstructions": "Please submit your resume and cover letter.",
            "benefits": ["Health Insurance", "Paid Time Off"],
            "workHours": "9 AM - 5 PM",
            "googleDriveFolderId": "1A2B3C4D5E"
    },
            {
                "title": "Marketing Manager",
            "description": "Lead marketing strategies and campaigns.",
            "companyName": "Creative Agency",
            "location": {
                "city": "New York",
            "state": "NY",
            "country": "USA"
        },
            "employmentType": "Full-time",
            "remote": false,
            "salaryRange": {
                "minSalary": 70000,
            "maxSalary": 100000,
            "currency": "USD"
        },
            "experienceLevel": "Senior Level",
            "jobType": "Marketing",
            "skills": ["SEO", "Content Marketing", "Social Media"],
            "postedBy": "60d5f491e82e3b001f68ddee",
            "postedDate": "2024-10-02T00:00:00Z",
            "applicationDeadline": "2024-11-02T00:00:00Z",
            "isActive": true,
            "requiredEducation": "Bachelor's Degree",
            "requiredLanguages": ["English"],
            "numberOfOpenings": 2,
            "applicationLink": "http://creativeagency.com/apply",
            "contactEmail": "jane.doe@creativeagency.com",
            "applicationInstructions": "Submit a portfolio along with your resume.",
            "benefits": ["401(k)", "Flexible Hours"],
            "workHours": "10 AM - 6 PM",
            "googleDriveFolderId": "1F2G3H4I5J"
    },
            {
                "title": "Data Analyst",
            "description": "Analyze and interpret complex data sets.",
            "companyName": "Data Solutions",
            "location": {
                "city": "Austin",
            "state": "TX",
            "country": "USA"
        },
            "employmentType": "Part-time",
            "remote": true,
            "salaryRange": {
                "minSalary": 50000,
            "maxSalary": 75000,
            "currency": "USD"
        },
            "experienceLevel": "Entry Level",
            "jobType": "Technical",
            "skills": ["Excel", "SQL", "Python"],
            "postedBy": "60d5f491e82e3b001f68ddf0",
            "postedDate": "2024-10-03T00:00:00Z",
            "applicationDeadline": "2024-11-03T00:00:00Z",
            "isActive": true,
            "requiredEducation": "Bachelor's Degree",
            "requiredLanguages": ["English"],
            "numberOfOpenings": 1,
            "applicationLink": "http://datasolutions.com/apply",
            "contactEmail": "john.brown@datasolutions.com",
            "applicationInstructions": "Attach a cover letter and resume.",
            "benefits": ["Remote Work", "Paid Training"],
            "workHours": "Flexible",
            "googleDriveFolderId": "1K2L3M4N5O"
    },
            {
                "title": "Graphic Designer",
            "description": "Create visual concepts to communicate ideas.",
            "companyName": "Design Hub",
            "location": {
                "city": "Los Angeles",
            "state": "CA",
            "country": "USA"
        },
            "employmentType": "Full-time",
            "remote": false,
            "salaryRange": {
                "minSalary": 60000,
            "maxSalary": 90000,
            "currency": "USD"
        },
            "experienceLevel": "Mid Level",
            "jobType": "Creative",
            "skills": ["Adobe Creative Suite", "Illustration"],
            "postedBy": "60d5f491e82e3b001f68ddf1",
            "postedDate": "2024-10-04T00:00:00Z",
            "applicationDeadline": "2024-11-04T00:00:00Z",
            "isActive": true,
            "requiredEducation": "Bachelor's Degree",
            "requiredLanguages": ["English"],
            "numberOfOpenings": 2,
            "applicationLink": "http://designhub.com/apply",
            "contactEmail": "alice.johnson@designhub.com",
            "applicationInstructions": "Portfolio required.",
            "benefits": ["Health Insurance", "Gym Membership"],
            "workHours": "9 AM - 5 PM",
            "googleDriveFolderId": "1P2Q3R4S5T"
    },
            {
                "title": "Project Manager",
            "description": "Oversee projects from initiation to completion.",
            "companyName": "Project Masters",
            "location": {
                "city": "Seattle",
            "state": "WA",
            "country": "USA"
        },
            "employmentType": "Full-time",
            "remote": true,
            "salaryRange": {
                "minSalary": 90000,
            "maxSalary": 130000,
            "currency": "USD"
        },
            "experienceLevel": "Senior Level",
            "jobType": "Management",
            "skills": ["Agile", "Scrum", "Leadership"],
            "postedBy": "60d5f491e82e3b001f68ddf2",
            "postedDate": "2024-10-05T00:00:00Z",
            "applicationDeadline": "2024-11-05T00:00:00Z",
            "isActive": true,
            "requiredEducation": "Bachelor's Degree",
            "requiredLanguages": ["English"],
            "numberOfOpenings": 1,
            "applicationLink": "http://projectmasters.com/apply",
            "contactEmail": "mike.wilson@projectmasters.com",
            "applicationInstructions": "CV and references required.",
            "benefits": ["Health Insurance", "Remote Work"],
            "workHours": "9 AM - 5 PM",
            "googleDriveFolderId": "1U2V3W4X5Y"
    },
            ]