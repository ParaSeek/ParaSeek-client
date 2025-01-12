import { X } from 'lucide-react';
import React, { useEffect } from 'react'
import { Button } from '../../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Props {
    id: string;
    close: () => void;
}


const GetApplicants = (props: Props) => {
    const [applicantsData, setApplicantsData] = React.useState<any>([]);
    console.log(applicantsData);
    const getApplicants = async () => {
        try {
            const res = await fetch(`${process.env.SERVER_URL}/api/v1/application/getApplicants/${props.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include"
            });
            const response = await res.json();
            if (response.success) {
                setApplicantsData(response.data);

            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        getApplicants();
    }, [])
    return (
        <div className='h-screen w-screen backdrop-blur-sm fixed top-0 left-0 grid place-items-center'>
            <div className='bg-card relative min-h-[50vh] shadow-black/20 shadow-[0px_0px_10px] rounded-lg dark:border dark:border-muted w-11/12 p-6 gap-2 overflow-x-auto'>
                <Button onClick={() => props.close()} className='absolute right-4 top-4' variant="outline" size="icon"><X /></Button>
                {applicantsData.length > 0 &&
                    <Table className='mt-8'>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Sr. No.</TableHead>
                                <TableHead>Username</TableHead>
                                <TableHead>Full Name</TableHead>
                                {/* <TableHead>Email</TableHead> */}
                                <TableHead>Mobile</TableHead>
                                <TableHead>Applied At</TableHead>
                                <TableHead>Status</TableHead>
                                {/* <TableHead className='text-center'>Action</TableHead> */}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {applicantsData.map((applicantData: any, index: number) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell >{applicantData.applicant.username}</TableCell>
                                        <TableCell >{applicantData.applicant.firstName + ' ' + applicantData.applicant.lastName}</TableCell>
                                        {/* <TableCell className='text-clip'>{applicantData.applicant.email}</TableCell> */}
                                        <TableCell>{applicantData.applicant.phoneNumber}</TableCell>
                                        <TableCell>{new Date(applicantData.appliedAt).toLocaleDateString()}, {new Date(applicantData.appliedAt).toLocaleTimeString()}</TableCell>
                                        <TableCell>{applicantData.status}</TableCell>
                                        {/* <TableCell className='text-center'>Reject or hire</TableCell> */}
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                }
            </div>
        </div >
    )
}

export default GetApplicants