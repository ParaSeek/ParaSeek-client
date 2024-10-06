"use client";
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import Loader_dots from "@/components/Loader_dots";
import { Button } from "@/components/ui/button";
import { logout } from '@/slices/userSlice';
import { useRouter } from 'next/navigation';
const Page = () => {
  const userData = useSelector((state: RootState) => state.user.data)
  const userLog = useSelector((state: RootState) => state.user.isLoggedIn)
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const dispatch = useDispatch();
  const router = useRouter();
  
  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/v1/auth/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const dataRes = await res.json();
      if (dataRes.success) {
        console.log(dataRes);
        dispatch(logout());
        toast({ title: dataRes.message })
      } else {
        toast({ variant: "destructive", title: dataRes.message })
      }
    } catch (error: any) {
      toast({ variant: "destructive", title: error.message });
    } finally {
      setLoading(false);
    }
  }

  if (!userLog) {
    router.push('/login');
  }


  if (!userData) {
    return <section className='justify-center'>
      <Loader_dots text='Loading'/>
    </section>
  }
  console.log(userData);

  return (
    <section>
      Welcome, {userData.username}!
      {
        userData.role === process.env.JOBSEEKER_ID ? (
          <div className='flex flex-col items-cente'>
            <h2>Job Seeker Dashboard</h2>
            <ul>
              <li>
                <a href="/job-search">Search for jobs</a>
              </li>
              <li>
                <a href="/job-applications">View job applications</a>
              </li>
              <li>
                <a href="/profile">Edit profile</a>
              </li>
            </ul>
          </div>
        ) : userData.role === process.env.EMPLOYER_ID ? (
          <div className='flex flex-col justify-center'>
            <h2>Employer Dashboard</h2>
            <ul>
              <li>
                <a href="/post-job">Post a new job</a>
              </li>
              <li>
                <a href="/job-listings">View job listings</a>
              </li>
              <li>
                <a href="/candidate-management">Manage candidates</a>
              </li>
            </ul>
          </div>
        ) : (
          <p>Invalid role</p>
        )
      }
      <Button onClick={handleLogout}
        disabled={loading}
        type="submit"
        className="w-[100px] py-2 mt-4 text-lg font-medium text-white bg-primary rounded-md hover:bg-primary/90"
      >
        {loading ? <Loader_dots text="Logging Out" /> :
          "Log out"}
      </Button>
    </section>
  )
}

export default Page
