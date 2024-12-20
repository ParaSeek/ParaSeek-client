"use client";
import Jobcard from '@/components/jobs/Jobcard'
import Loader_dots from '@/components/Loader_dots';
import { Button } from '@/components/ui/button'
import { RootState } from '@/store/store'
import { Link as LinkIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'

const Page = ({ params }: { params: { slug: string } }) => {
    const param = params.slug
    const rectifiedParam = param.replaceAll(`%22`, `"`).replaceAll(`%3A`, `:`).replaceAll(`%2C`, `,`).replaceAll(`%7B`, `{`).replaceAll(`%7D`, `}`).replaceAll(`%20`, ` `)
    const searchQuery = JSON.parse(rectifiedParam)

    console.log(searchQuery);

    const jobs = useSelector((state: RootState) => state.jobs);

    const searchResult = jobs.filter((job) => {
        return (job.title.toLowerCase().includes(searchQuery.title.toLowerCase()) || job.description.toLowerCase().includes(searchQuery.title.toLowerCase()) || job.companyName.toLowerCase().includes(searchQuery.title.toLowerCase()) || job.skills.join().toLowerCase().includes(searchQuery.title.toLowerCase())) && (job.location.city.toLowerCase().includes(searchQuery.location.toLowerCase()) || job.location.state.toLowerCase().includes(searchQuery.location.toLowerCase()) || job.location.country.toLowerCase().includes(searchQuery.location.toLowerCase()))
    })

    console.log(searchResult);


    if (searchResult.length > 0) {
        return (
            <section className='bg-background/70 px-[5%] py-16 flex flex-col items-start'>

                <h1 className='text-2xl font-semibold mb-4'>Search Results for "{searchQuery.title}" in "{searchQuery.location}" ({searchResult.length} Found)</h1>

                <div className='grid grid-cols-1 items-start sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                    {searchResult.map((job, index) => {
                        return <Jobcard id={job.title} title={job.title} companyName={job.companyName} workHours={job.workHours} salaryRange={job.salaryRange} employmentType={job.employmentType} location={job.location} key={index} />
                    })}
                </div>
                <h1 className='text-2xl font-semibold my-12'>More Recommended Jobs for You</h1>

                <div className='grid grid-cols-1 items-start sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                    {Recommendedjobs.map((job, index) => {
                        return <Jobcard id={job.title} title={job.title} companyName={job.companyName} workHours={job.workHours} salaryRange={job.salaryRange} employmentType={job.employmentType} location={job.location} key={index} />
                    })}
                </div>

            </section>
        )
    } else {
        return (
            <section className='bg-background/70 px-[5%] py-16 flex flex-col items-start'>
                <h1 className='text-2xl font-semibold mb-4'>Uh oh! No Jobs found with the searched Query!</h1>
                <h1 className='text-2xl font-semibold my-12'>Recommended Jobs for You</h1>

                <div className='grid grid-cols-1 items-start sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                    {Recommendedjobs.map((job, index) => {
                        return <Jobcard id={job.title} title={job.title} companyName={job.companyName} workHours={job.workHours} salaryRange={job.salaryRange} employmentType={job.employmentType} location={job.location} key={index} />
                    })}
                </div>
            </section >
        )
    }
}

export default Page

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