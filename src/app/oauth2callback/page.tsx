"use client";
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Page = () => {
  const [url, setUrl] = useState("");
  useEffect(() => {
    if (typeof window !== undefined) {
      setUrl(window.location.href)
    }
  }, [])

  // const code = url.substring(36); //for local hosting
  const code = url.substring(43); //for netlify hosting
  // const code = url.substring(); //for .com hosting
  const [error, setError] = useState(true);
  const { toast } = useToast();
  const router = useRouter();
  useEffect(() => {
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
      if (response.success) {
        toast({ title: "Drive Linked Successfully", description: response.message })
        router.push("/dashboard/postjob");
      } else {
        toast({ title: "Error while Linking Drive", description: response.message, variant: "destructive" })
      }
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