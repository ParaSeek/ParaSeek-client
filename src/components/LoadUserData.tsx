"use client";
import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useState, useEffect } from "react";
import { login } from "@/slices/userSlice";
import { useToast } from "@/hooks/use-toast";
const LoadUserData = () => {
    const userLog = useSelector((state: RootState) => state.user.isLoggedIn)
    const dispatch = useDispatch();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    async function loadUser() {
      try {
        setLoading(true)
        const res = await fetch("http://localhost:8000/api/v1/auth/me", {
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
        toast({ variant: "destructive", title: error.message });
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
    <div></div>
  )
}

export default LoadUserData