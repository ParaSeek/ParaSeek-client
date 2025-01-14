"use client";
import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useEffect } from "react";
import { login, toggleLoading } from "@/slices/userSlice";
import { getCookie } from 'cookies-next';
import { setQualifications } from '@/slices/qualificationSlice';
import { setJobs } from '@/slices/jobSlice';
import { setPreferences } from '@/slices/preferencesSlice';
import { setCompanies } from '@/slices/companySlice';
import { setRecommendedJobs } from '@/slices/RecommendedJobsSlice';

const LoadUserData = () => {
  const userLog = useSelector((state: RootState) => state.user.isLoggedIn)
  const dispatch = useDispatch();
  const token = localStorage.getItem("accessToken")

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
        dispatch(login(dataRes.data));
        dispatch(setQualifications(dataRes.data.qualification))
        dispatch(setPreferences(dataRes.data.jobPreferences))
      } else {
        localStorage.removeItem('accessToken');
        console.error(dataRes.message)
      }
    } catch (error: any) {
      localStorage.removeItem('accessToken');
      console.error(error.message);
    } finally {
      dispatch(toggleLoading(false));
    }
  }
  useEffect(() => {
    if (!loaded && token) {
      loadUser();
      loadRecommendedJobs();
      setLoaded(true);
    }
  }, [userLog, token])

  const loadRecommendedJobs = async () => {
    try {
      const res = await fetch(`${process.env.SERVER_URL}/api/v1/job/recommendations`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
      const dataRes = await res.json();
      if (dataRes.success) {
        dispatch(setRecommendedJobs(dataRes.data.filter((job: any) => {
          return job.score > 0
        })));
      } else {
        console.error(dataRes.message)
      }
    } catch (error: any) {
      console.error(error);
    }
  }

  const loadJobs = async () => {
    try {
      const res = await fetch(`${process.env.SERVER_URL}/api/v1/job/get-jobs`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
      const dataRes = await res.json();
      if (dataRes.success) {
        dispatch(setJobs(dataRes.data))
      } else {
        console.error(dataRes.message)
      }
    } catch (error: any) {
      console.error(error);
    }
  }

  const loadCompanies = async () => {
    try {
      const res = await fetch(`${process.env.SERVER_URL}/api/v1/company/get-all-company`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const dataRes = await res.json();
      if (dataRes.success) {
        dispatch(setCompanies(dataRes.data))
      } else {
        console.error(dataRes.message)
      }
    } catch (error: any) {
      console.error(error);
    }
  }
  useEffect(() => {
    loadJobs();
    loadCompanies();
  }, [])
  return (
    <div></div>
  )
}
export default LoadUserData;