import Link from 'next/link'
import React from 'react'
import {FaBusinessTime, FaDollarSign, FaLocationDot} from 'react-icons/fa6'

interface location {
  city: string,
  state: string,
  country: string
}
interface salary {
  minSalary: number,
  maxSalary: number,
  currency?: string
}
interface job {
  id: string,
  title: string,
  companyName: string,
  location: location,
  employmentType: string,
  salaryRange: salary,
  workHours: string
}
const Jobcard = (props: job) => {
  return (
    <div className=' p-4 bg-primary rounded-2xl relative overflow-hidden'>
      <div className='w-40 h-40 bg-blue-600 shadow-[8px_8px_8px] shadow-blue-600 rounded-full absolute top-[-60px] left-[-60px]'></div>
      <div className='w-40 h-40 bg-blue-600 shadow-[-8px_8px_8px] shadow-blue-600 rounded-full absolute top-[-60px] right-[-60px]'></div>
      <div className='p-4 bg-card w-full flex flex-col relative rounded-lg h-full'>
      <svg className='w-[250%] absolute left-[-16px] bottom-[-20px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <defs>
          <linearGradient id="myGradient" gradientTransform="rotate(0)">
            <stop offset="0%" stop-color="#7c3aed" />
            <stop offset="40%" stop-color="#2563eb" />
          </linearGradient>
        </defs>
        <path fill="url(#myGradient)" fill-opacity="1" d="M0,256L30,245.3C60,235,120,213,180,213.3C240,213,300,235,360,218.7C420,203,480,149,540,138.7C600,128,660,160,720,170.7C780,181,840,171,900,144C960,117,1020,75,1080,64C1140,53,1200,75,1260,117.3C1320,160,1380,224,1410,256L1440,288L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"></path></svg>
        <p className='text-xl font-semibold'>{props.title}</p>
        <p className='text-foreground/70'>{props.companyName}</p>
        <div className='mt-auto z-10 mb-6'>
          <hr className='my-4' />
          <p className='text-foreground/70 flex items-center gap-1'><FaLocationDot/>{props.location.city}</p>
          <p className='text-foreground/70 flex items-center gap-1'><FaDollarSign/>{props.salaryRange.minSalary}-{props.salaryRange.maxSalary} {props.salaryRange.currency}/month</p>
          <p className='text-foreground/70 flex items-center gap-1'><FaBusinessTime/>{props.workHours}</p>
          <p className='border p-1 rounded w-fit mt-2'>{props.employmentType}</p>
          <Link href={`/jobs/${props.id}`} className='text-[#2563eb] cursor-pointer hover:underline block my-2 font-semibold'>View Details</Link>
        </div>
      </div>
    </div>
  )
}

export default Jobcard