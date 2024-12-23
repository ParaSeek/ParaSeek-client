"use client";
import CreateJobForm from '@/components/jobs/createJobForm';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { FetchCompaniesContext, useFetchCompanies } from '@/contexts/FetchCompaniesContext';
import { RootState } from '@/store/store'
import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FaGoogleDrive } from 'react-icons/fa6';
import { useSelector } from 'react-redux'

const Page = () => {

  const myCompanies = useSelector((state: RootState) => state.myCompanies);
  const userData = useSelector((state: RootState) => state.user.data);
  const [selectedCompany, setSelectedCompany] = useState(myCompanies[0])
  const [showJobUploadForm, setShowJobUploadForm] = useState(false);
  const [showJobEditForm, setShowJobEditForm] = useState(false);
  const [revalidateData, setRevalidateData] = useState(false);
  const [editJob, setEditJob] = useState([]);
  const [link, setLink] = useState("")
  const { fetchCompanies } = useFetchCompanies();
  function closeForm() {
    setShowJobUploadForm(false);
    setShowJobEditForm(false);
  }
  function RevalidateData() {
    setRevalidateData(true);
  }


  useEffect(() => {
    if (revalidateData) {
      fetchCompanies();
      setRevalidateData(false);
    }
  }
    , [revalidateData])


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

  if (myCompanies.length == 1 && myCompanies[0]._id == "") {
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
        defaultValue={myCompanies[0]?.companyName}
      >
        <SelectTrigger className="w-full disabled:cursor-default">
          <SelectValue placeholder="Select Company" />
        </SelectTrigger>
        <SelectContent>
          {myCompanies.map((company, index) => (
            <SelectItem onClick={() => setSelectedCompany(company)} key={index} value={company.companyName}>{company.companyName}</SelectItem>
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
        {link !== "" && <Link className='underline hover:text-primary dark:hover:text-purple-400' href={link}>Click Here to authenticate with Google Drive</Link>}
      </div>

      {userData.tokens &&
        <div>
          <h1 className="text-3xl font-semibold mt-12 mb-4">Create a Job Post</h1>
          <CreateJobForm companyName={selectedCompany.companyName} actionType="create" revalidate={RevalidateData} />
        </div>
      }
      {showJobEditForm && <CreateJobForm companyName={selectedCompany.companyName} actionType="update" job={editJob} close={closeForm} revalidate={RevalidateData} />}

      {selectedCompany.jobs?.length > 0 && <Table className='mt-4'>
        {/* <TableCaption>My Companies</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead>Sr. No.</TableHead>
            <TableHead className="text-center">Jobs</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectedCompany.jobs.map((job: string, index: number) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>}
    </div>
  )
}

export default Page