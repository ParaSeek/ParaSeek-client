"use client";
import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useState, useEffect } from "react";
import { login } from "@/slices/userSlice";
import { useToast } from "@/hooks/use-toast";
import Loader_dots from './Loader_dots';
const LoadUserData = () => {
    const userLog = useSelector((state: RootState) => state.user.isLoggedIn)
    const dispatch = useDispatch();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    async function loadUser() {
      try {
        setLoading(true)
        const res = await fetch("http://localhost:8000/api/v1/user/me", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const dataRes = await res.json();
        if (dataRes.success) {
          dispatch(login(dataRes.data));
          console.log({ title: "Logged in successfully!" })
        } else {
          console.error({ variant: "destructive", title: dataRes.message })
        }
      } catch (error: any) {
        console.error({ variant: "destructive", title: error.message, description:"Internal Server Error" }); 
      } finally {
        setLoading(false);
      }
    }
    useEffect(() => {
      if (!userLog) {
        loadUser();
      }
    }, [])
  return (
    <div className='flex justify-center'>{loading && <Loader_dots text='Loading'/>}</div>
  )
}

export default LoadUserData