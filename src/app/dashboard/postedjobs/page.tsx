"use client";
import { RootState } from '@/store/store';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useRouter } from 'next/navigation';
import { Pencil, Trash } from 'lucide-react';
import { useFetchCompanies } from '@/contexts/FetchCompaniesContext';
import CreateJobForm from '@/components/jobs/createJobForm';
import { useToast } from '@/hooks/use-toast';


const Page = () => {
  const myCompanies = useSelector((state: RootState) => state.myCompanies);
  const [selectedCompany, setSelectedCompany] = useState(myCompanies[0]?.companyName);
  const [showJobEditForm, setShowJobEditForm] = useState(false);
  const userData = useSelector((state: RootState) => state.user.data);
  const [editJob, setEditJob] = useState([]);
  const { fetchCompanies } = useFetchCompanies();
  const { toast } = useToast();
  const router = useRouter();

  function closeForm() {
    setShowJobEditForm(false);
  }

  const handleDeleteJob = async (jobId: string) => {
    try {
      const res = await fetch(`${process.env.SERVER_URL}/api/v1/job/job-delete/${jobId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include"
      });
      const response = await res.json();
      if (response.success) {
        toast({ title: "Job Deleted Successfully" });
        fetchCompanies();
      }
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
      <div className='flex gap-3'>

        <Select
          defaultValue={selectedCompany}
          onValueChange={(value) => setSelectedCompany(value)}
        >
          <SelectTrigger className="w-full disabled:cursor-default">
            <SelectValue placeholder="Select Company" />
          </SelectTrigger>
          <SelectContent>
            {myCompanies.map((company, index) => (
              <SelectItem key={index} value={company.companyName}>{company.companyName}</SelectItem>
            ))
            }
          </SelectContent>
        </Select>
      </div>

      <h1 className="text-3xl font-semibold mt-12 mb-4">All Jobs posted under {selectedCompany}</h1>

      {(myCompanies.find(company => company.companyName === selectedCompany) || { jobs: [] }).jobs.length > 0 ? <Table className='mt-4'>
        {/* <TableCaption>My Companies</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead>Sr. No.</TableHead>
            <TableHead>Job Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className='text-center'>Edit</TableHead>
            <TableHead className='text-center'>Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(myCompanies.find(company => company.companyName === selectedCompany) || { jobs: [] }).jobs.map((job: any, index: number) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell className='cursor-pointer' onClick={() => router.push(`/jobs/${job._id} `)}>{job.title}</TableCell>
              <TableCell>{job.isActive ? <p className='text-green-400'>Active</p> : <p className='text-red-500'>Not Active</p>}</TableCell>
              {job.postedBy == userData._id ? <> <TableCell>
                <Pencil className='cursor-pointer w-5 mx-auto' onClick={() => { setEditJob(job); setShowJobEditForm(true); }} />
              </TableCell>
                <TableCell>
                  <Trash className='text-red-500 cursor-pointer w-5 mx-auto' onClick={() => handleDeleteJob(job._id)} />
                </TableCell></> :
                <TableCell className='text-center' colSpan={2}>This job is posted by some other employer</TableCell>
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
        :
        <p className='font-medium text-lg'>No Jobs Posted yet!</p>
      }
      {showJobEditForm && <CreateJobForm companyName={selectedCompany} actionType="update" job={editJob} close={closeForm} />}

    </div>
  )
}

export default Page