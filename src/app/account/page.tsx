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
      <h1>You are not logged in</h1>
    </section>
  }
  console.log(userData);

  return (
    <section>
      Welcome, {userData.username}!
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
