"use client";
import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useState, useEffect } from "react";
import { login, toggleLoading } from "@/slices/userSlice";

const LoadUserData = () => {
    const userLog = useSelector((state: RootState) => state.user.isLoggedIn)
    const dispatch = useDispatch();
    async function loadUser() {
      try {
        dispatch(toggleLoading(true));
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
        dispatch(toggleLoading(false));
      }
    }
    useEffect(() => {
        loadUser();
    }, [userLog])
  return (
    <div></div>
  )
}
export default LoadUserData;