"use client";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const Page = () => {

  const url = window.location.href;
  const code = url.substring(36);
  const [error, setError] = useState(true);

  useEffect(()=>{
    if (code.substring(1, 5) == "code") {
      setError(false)
    }
  }, [code])

  const handleDriveLink = async () => {
    try {
      const res = await fetch(`${process.env.SERVER_URL}/api/v1/job/drive-code${code}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include"
      });
      const response = await res.json();
      console.log(response);


    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (
    <section className='bg-background/70 justify-center'>
      <div className='bg-card shadow-black/20 shadow-[0px_0px_10px] dark:border dark:border-muted grid place-items-center p-8 gap-6'>
        <h1 className='text-xl font-semibold'>{error ? "Error while linking drive" : "Drive Linked Successfully"}</h1>
        <div className='flex gap-3'>
          {!error && <Button onClick={handleDriveLink}>Get Access</Button>}
          <Link href="/dashboard/postjob"><Button >{error ? "Return Back" : "Cancel"}</Button></Link>
        </div>
      </div>
    </section>
  )
}

export default Page