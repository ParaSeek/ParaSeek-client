"use client";
import CreateJobForm from '@/components/dashboard/jobs/createJobForm';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useDashboardContext } from '@/contexts/DashboardContext';
import { RootState } from '@/store/store'
import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { FaArrowRightLong, FaGoogleDrive } from 'react-icons/fa6';
import { useSelector } from 'react-redux'

const Page = () => {

  const myCompanies = useSelector((state: RootState) => state.myCompanies);
  const userData = useSelector((state: RootState) => state.user.data);
  const [selectedCompany, setSelectedCompany] = useState(myCompanies[0]?.companyName)
  const [createJobFormOpen, setCreateJobFormOpen] = useState(false)
  const [link, setLink] = useState("");
  const { setHeaderTitle } = useDashboardContext();
  useEffect(() => {
    setHeaderTitle("Post a Job");
  }, [])
  const close = () => {
    setCreateJobFormOpen(false)
  }
  const handleDriveLink = async () => {
    try {
      const res = await fetch(`${process.env.SERVER_URL}/api/v1/job/drive-verification`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include"
      });
      const response = await res.json();
      setLink(response.data);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  if (myCompanies.length < 1 || myCompanies[0]._id == "") {
    return <div className='text-center'>
      <h1 className='text-3xl font-semibold mt-5'>
        You are not the part of any company
      </h1>
      <p>
        Create a company profile or join an existing company as an employer
      </p>
    </div>
  }
  return (
    <div className='w-full'>
      <Select
        defaultValue={selectedCompany}
        onValueChange={(value) => setSelectedCompany(value)}
      >
        <SelectTrigger className="w-fit flex gap-2 disabled:cursor-default">
          <SelectValue placeholder="Select Company" />
        </SelectTrigger>
        <SelectContent>
          {myCompanies.map((company, index) => (
            <SelectItem key={index} value={company.companyName}>{company.companyName}</SelectItem>
          ))
          }
        </SelectContent>
      </Select>

      <div className='mt-8'>
        <div className='flex items-center gap-1'>
          {!userData.tokens && <span className='text-red-500 text-lg'>*</span>}<h1 className='font-semibold'>{userData.tokens ? "Your Google Drive was Successfully Linked" : "Link your Google Drive Account"}</h1>
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger> <QuestionMarkCircledIcon className='cursor-pointer' /></TooltipTrigger>
              <TooltipContent className='w-64 bg-secondary' side="bottom">
                <p className='text-[14px]'>A folder will be created in your Google Drive account which will be used to store the resumes of the applicants applying to your posted jobs.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        {!userData.tokens && <Button onClick={handleDriveLink} variant="outline" size="icon" className="w-28 h-28 mt-2" ><FaGoogleDrive className='h-8 w-8' /></Button>}
        {userData.tokens && <Button onClick={handleDriveLink} className="mt-2" >Change Linked account</Button>}
        {link !== "" && <Link className='underline flex items-center gap-2 hover:text-primary mt-2 dark:hover:text-purple-400' href={link}>Click Here to authenticate with Google Drive {<FaArrowRightLong />}</Link>}
      </div>

      {userData.tokens &&
        <div>
          <div className="w-full md:max-w-[66%] mt-8 bg-muted p-[25px] cursor-pointer hover:bg-[#ecdcff0a] flex items-center gap-[24px] rounded-xl" onClick={() => setCreateJobFormOpen(true)}>
            <span className="rounded-full bg-background border p-[12px] dark:border-white border-black">
              <Plus width="24" height="24" />
            </span>
            <div className="flex flex-col justify-center gap-2">
              <h3 className="font-medium text-xl">Create a Job Post</h3>
            </div>
          </div>
          {createJobFormOpen && <CreateJobForm companyName={selectedCompany} actionType="create" close={close} />}
        </div>
      }

    </div >
  )
}

export default Page