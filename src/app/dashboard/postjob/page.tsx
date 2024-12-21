"use client";
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { RootState } from '@/store/store'
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React, { useState } from 'react'
import { FaGoogleDrive } from 'react-icons/fa6';
import { useSelector } from 'react-redux'

const Page = () => {

  const myCompanies = useSelector((state: RootState) => state.myCompanies);
  const [selectedCompany, setSelectedCompany] = useState<any>([])
  const [link, setLink] = useState("")

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
  return (
      <div className='w-full'>
        <Select
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
        <Button onClick={handleDriveLink} variant="outline" size="icon" className="w-28 h-28 mt-8" ><FaGoogleDrive className='h-8 w-8' /></Button>

        <Link href={link}>{link}</Link>
        {selectedCompany.jobs && <Table className='mt-4'>
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
                <TableCell>{job}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>}
      </div>
    )
  }

  export default Page