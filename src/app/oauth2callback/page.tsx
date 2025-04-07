"use client";
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react'

const Page = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get("code") || "";
  const error = searchParams.get("error") || "";
  const { toast } = useToast();
  const router = useRouter();

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
    <Suspense>
      <section className='bg-background/70 justify-center'>
        <div className='bg-card shadow-black/20 shadow-[0px_0px_10px] dark:border dark:border-muted grid place-items-center p-8 gap-6'>
          <h1 className='text-xl font-semibold'>{error ? "Error while linking drive" : "Drive Linked Successfully"}</h1>
          <div className='flex gap-3'>
            {!error && <Button onClick={handleDriveLink}>Get Access</Button>}
            <Link href="/dashboard/postjob"><Button >{error ? "Return Back" : "Cancel"}</Button></Link>
          </div>
        </div>
      </section>
    </Suspense>
  )
}

export default Page