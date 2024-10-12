"use client";
import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useEffect } from "react";
import { login, toggleLoading } from "@/slices/userSlice";
import { getCookie } from 'cookies-next';
import { setQualifications } from '@/slices/qualificationSlice';

const LoadUserData = () => {
  const userLog = useSelector((state: RootState) => state.user.isLoggedIn)
  const dispatch = useDispatch();
  const token = getCookie("accessToken")
  const [loaded, setLoaded] = useState(false)
  async function loadUser() {
    try {
      dispatch(toggleLoading(true));
      const res = await fetch(`${process.env.SERVER_URL}/api/v1/user/me`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const dataRes = await res.json();
      if (dataRes.success) {
        console.log(dataRes.data);
        dispatch(login(dataRes.data));
        dispatch(setQualifications(dataRes.data.education))
        console.log({ title: "Logged in successfully!" })
      } else {
        console.error({ variant: "destructive", title: dataRes.message })
      }
    } catch (error: any) {
      console.error({ variant: "destructive", title: error.message, description: "Internal Server Error" });
    } finally {
      dispatch(toggleLoading(false));
    }
  }
  useEffect(() => {
    if (!loaded && token) {
      loadUser();
      setLoaded(true);
    }
  }, [userLog, token])
  return (
    <div></div>
  )
}
export default LoadUserData;