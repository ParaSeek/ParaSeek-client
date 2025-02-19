"use client";
import { sendNotification } from '@/app/firebase.config';
import AccessDenied from '@/components/AccessDenied';
import CompanyDetailsPopup from '@/components/companies/companyDetailsPopup';
import Jobcard from '@/components/jobs/Jobcard'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast';
import { RootState } from '@/store/store'
import { Link as LinkIcon, Upload, X } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'

const Page = ({ params }: { params: { slug: string } }) => {
    const param = params.slug
    const companies = useSelector((state: RootState) => state.companies)
    const jobs = useSelector((state: RootState) => state.jobs)
    const recommendedJobs = useSelector((state: RootState) => state.recommendedJobs)
    const job = jobs.find((job) => {
        return job._id === param
    })
    const { toast } = useToast()
    const [companyDetailsOpen, setCompanyDetailsOpen] = React.useState(false);
    const [openJobApplicationPopup, setOpenJobApplicationPopup] = React.useState(false);
    const [resume, setResume] = React.useState<File | null>(null);
    const user = useSelector((state: RootState) => state.user.data)
    const handleJobApply = async () => {
        try {
            const formData = new FormData();
            if (resume && job) {
                formData.append('resume', resume);
                const response = await fetch(`${process.env.SERVER_URL}/api/v1/application/apply/${job._id}`, {
                    method: 'POST',
                    credentials: 'include',
                    body: formData
                })
                const res = await response.json()
                if (res.success) {
                    toast({ title: 'Applied successfully', description: res.message })
                    sendNotification(job.postedBy, "New Job Applicant", `${user?.firstName} applied for  ${job.title}`)
                } else {
                    toast({ title: 'Failed to apply', description: res.message, variant: "destructive" })
                }
            }

        } catch (error: any) {
            toast({ title: 'Failed to apply', description: error.message, variant: "destructive" })
        }
        setOpenJobApplicationPopup(false)
    }
    if (job) {
        return (
            <section className='bg-background/60 px-[5%] py-8 pt-20 gap-8'>
                <div className="bg-card px-6 py-6 w-full rounded-xl flex flex-col gap-3">
                    <div>
                        <h2 onClick={() => setCompanyDetailsOpen(true)} className='hover:underline inline cursor-pointer font-semibold'>{job.companyName}</h2>
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
                        {job.applicationLink && job.applicationLink != "" ? <Link href={job.applicationLink}><Button className='font-semibold text-lg'>Apply Now<LinkIcon className='ml-1 h-4' /></Button></Link> : <Button onClick={() => setOpenJobApplicationPopup(true)} className='font-semibold text-lg w-max'>Apply Now<LinkIcon className='ml-1 h-4' /></Button>}
                        <p className='mt-1'>Instructions : {job.applicationInstructions}</p>
                        <p >Deadline : {new Date(job.applicationDeadline).toLocaleDateString()}</p>
                        <div className={`${openJobApplicationPopup ? "w-screen h-screen fixed top-0 left-0 backdrop-blur-sm grid place-items-center " : "w-0 h-0"} overflow-hidden`}>
                            <div className='relative max-w-md bg-card shadow-black/20 shadow-[0px_0px_10px] dark:border dark:border-muted p-12 rounded-xl flex flex-col items-center gap-4'>
                                <Button variant="outline" size="icon" className='absolute top-2 right-2'>
                                    <X onClick={() => setOpenJobApplicationPopup(false)} className=' h-6 cursor-pointer' />
                                </Button>
                                <input type="file" id="resume-upload"
                                    onChange={(e) => {
                                        const files = e.target.files;
                                        if (files && files.length > 0) {
                                            setResume(files[0]);
                                        }
                                    }}
                                    className="hidden" />
                                <label htmlFor="resume-upload" className="flex items-center gap-2 font-semibold text-lg w-max cursor-pointer bg-card border border-muted py-2 px-4 rounded-md hover:scale-105 transition-all duration-300">
                                    <Upload /> Upload Resume
                                </label>
                                {resume && <p className='text-left w-full flex items-center justify-between gap-2'>{resume?.name} <X onClick={() => setResume(null)} className='w-4 cursor-pointer' /></p>}
                                {resume && <Button onClick={handleJobApply} className='font-semibold text-lg w-max bg-primary'>
                                    Apply Now<LinkIcon className='ml-1 h-4' />
                                </Button>}
                            </div>
                        </div>
                    </div>
                </div>
                <h1 className='text-2xl self-start font-semibold'>Recommended Jobs for you :</h1>
                <div className='w-full rounded-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                    {recommendedJobs.length > 0 ? recommendedJobs.map((job, index) => {
                        return <Jobcard id={job.job._id} title={job.job.title} companyName={job.job.companyName} workHours={job.job.workHours} salaryRange={job.job.salaryRange} employmentType={job.job.employmentType} location={job.job.location} key={index} score={job.score} />
                    }) : "No jobs found at the moment, Check back later!"}
                </div>
                <CompanyDetailsPopup
                    company={companies.find((company) => company.companyName === job.companyName)}
                    companyDetailsOpen={companyDetailsOpen}
                    setCompanyDetailsOpen={setCompanyDetailsOpen}
                />
            </section>
        )
    } else {
        return <section className='w-full bg-background/70 flex justify-center'>
            <h1 className='text-3xl font-semibold'>
                Uh oh! No job found.
            </h1>
            <span className='w-24 my-2 bg-muted h-[1px]'></span>
            <p className='text-xl font-medium'>
                The job you are looking for does not exist or have been removed.
            </p>
        </section>
    }
}

export default Page