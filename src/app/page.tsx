"use client";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { motion } from "framer-motion";
import Loader_dots from "@/components/Loader_dots";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { CheckCircle, CircleAlertIcon } from "lucide-react";
import Jobcard from "@/components/jobs/Jobcard";
import { skills } from "@/store/suggestions";

export default function Home() {
  const userLog = useSelector((state: RootState) => state.user.isLoggedIn)
  const userDataLoading = useSelector((state: RootState) => state.user.loading)
  const userData = useSelector((state: RootState) => state.user.data)
  const jobs = useSelector((state: RootState) => state.jobs)
  const [progress_bar, setProgress_bar] = useState(0);
  const [profileProgress, setProfileProgress] = useState(0)

  const getProgress = async () => {
    try {
      const response = await fetch(`${process.env.SERVER_URL}/api/v1/user/progress-bar`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      const res = await response.json();
      if (res.success) {
        setProgress_bar(res.data);
      } else {
        console.error(res.message);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (userLog && userData.role == process.env.JOBSEEKER_ID)
      getProgress();
  }, [userLog])

  useEffect(() => {
    const progress = progress_bar / 100 * 360;
    setProfileProgress(progress);
  }, [progress_bar])

  if (userLog && userData.role == process.env.JOBSEEKER_ID) {
    return (
      <div
        style={{ minHeight: "calc(100vh - 64px)" }}
        className="main-bg py-8 bg-secondary dark:bg-background/85"
      >
        <div
          className="flex p-6 gap-3 flex-col lg:flex-row"
        >
          <motion.aside
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 bg-card dark:border-muted dark:border shadow-black/20 shadow-[0px_0px_10px] lg:w-1/4 w-full rounded-xl p-4 overflow-hidden flex lg:flex-col xs:flex-row flex-col items-center justify-center md:gap-20 lg:gap-0 gap-6">
            <div className="flex flex-col items-center">

              <motion.div
                initial={{ opacity: 0, x: 200 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="rounded-full relative mt-2 lg:p-1 p-2 bg-muted"
              >
                <div style={{ background: `conic-gradient( from 180deg, hsl(var(--primary)) ${profileProgress}deg, hsl(var(--muted)) 0deg)` }} className={`absolute top-0 left-0 w-full h-full rounded-full z-[12]`}>
                </div>
                <p className="absolute z-[16] bg-muted text-sm px-4 py-2 lg:px-2 rounded-full lg:py-[1px] lg:bottom-[-2px] bottom-[-6px] left-1/2 translate-x-[-50%]"> {progress_bar}% </p>
                <div className="w-full h-full bg-white dark:bg-background/90 rounded-full p-1 relative z-[14]">
                  <Avatar className="lg:w-24 lg:h-24 sm:w-44 sm:h-44 xs:w-32 xs:h-32 w-40 h-40">
                    <AvatarImage className='object-contain' src={userData.profilePic} />
                    <AvatarFallback className="bg-primary text-4xl font-extrabold text-white">{userData.username.substring(0, 1).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </div>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, x: 200 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="text-xl mt-3 text-center"
              >
                <span className="font-medium">Welcome back <span className="font-semibold text-center">{userData.firstName == "" ? userData.username : userData.firstName}!</span></span>
              </motion.h2>
            </div>
            <div className="lg:w-11/12 rounded-lg lg:mt-4 bg-secondary p-2 flex flex-col gap-2">
              <h1 className="font-semibold text-center">What are you missing?</h1>
              <p className="flex items-center gap-2">{userData.firstName != "" && userData.lastName != "" ? <CheckCircle className="w-5 text-green-500" /> : <CircleAlertIcon className="w-5 text-red-500" />}Full Name</p>
              <p className="flex items-center gap-2">{userData.profilePic != "" ? <CheckCircle className="w-5 text-green-500" /> : <CircleAlertIcon className="w-5 text-red-500" />}Profile Pic</p>
              <p className="flex items-center gap-2">{userData.location ? <CheckCircle className="w-5 text-green-500" /> : <CircleAlertIcon className="w-5 text-red-500" />}Address</p>
              <p className="flex items-center gap-2">{userData.qualification?.education.length > 0 ? <CheckCircle className="w-5 text-green-500" /> : <CircleAlertIcon className="w-5 text-red-500" />}Education Details</p>
              <p className="flex items-center gap-2">{userData.jobPreferences ? <CheckCircle className="w-5 text-green-500" /> : <CircleAlertIcon className="w-5 text-red-500" />}Job Preferences</p>
              <Link className="mx-auto" href="/account"><Button className="rounded-full">Complete Profile</Button></Link>
            </div>
          </motion.aside>
          <div
            className="lg:w-3/4 w-full flex flex-col gap-3"
          >
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative z-10 h-[50%] bg-card dark:border dark:border-muted shadow-black/20 shadow-[0px_0px_10px] w-full rounded-xl p-4 overflow-hidden flex flex-col items-center">
              <motion.h2> Banner</motion.h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative z-10 h-[50%] bg-card dark:border dark:border-muted shadow-black/20 shadow-[0px_0px_10px] w-full rounded-xl overflow-hidden flex gap-8">
              <div className="p-4">
                <motion.h2 className="font-semibold text-xl">Need help with your Resume?</motion.h2>
                <motion.p>We created a service known as Resume Wizard. The goal is simple: help you land that dream job interview! Get an advantage in the modern professional environment. Create your resume in two simple steps</motion.p>
                <Link href="/services/resume-wizard"><Button className="mt-4">Create Resume</Button></Link>
              </div>
              <div className="p-4 hidden md:block">
                <img className="p-2 bg-white rounded-sm rounded-br-xl" src="https://s3-alpha-sig.figma.com/img/af3b/6828/787192a1f5bc3298a6ad9b695585a9b9?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WK5oZmtVSbNUdzplT2ObMtgZIJhMFn8PGsMFRFvEXS8vLiWttc5lbVaLmGRVLPhkA4R4QsFcR6jKMUb1T56I34IkL87vXEwIUJczAzJQFJWGfig3CWpEiZ5QH2xd6DG1OXV7iAYm15kbcQzJerPDjI30g7u5VI06AXV32bBWVsaaFA2mvRLHMxoJIJFmdD9q99NIRQKGBDRAh6mXKzcaOng7d-5Zv7Hf1fns-qLU1AI1lFCgs46Dpgv6pubI7BlC9ZRZxEXkhGGP48KHi6~QhQ5mCl-4RvKSOhXe0fLFdxyxn36ScVlBNHHkypX-ltLckYddw6c-NyWx7HPnbo6TiQ__" alt="" />
              </div>
            </motion.div>
          </div>

        </div>
        <div className="w-full px-6 flex flex-col gap-6">

          {/* Job Recommendations */}
          <div className="flex flex-col justify-center p-6 rounded-lg relative z-10 bg-card shadow-black/20 shadow-[0px_0px_10px] dark:border dark:border-muted">
            <h1 className="text-xl font-semibold">Top Job Recommendations</h1>
            <div className="flex gap-3 overflow-x-auto py-3">
              {jobs.length > 0 && jobs[0]._id != "" ? jobs.map((job, index) => {
                return <Jobcard id={job._id} title={job.title} companyName={job.companyName} workHours={job.workHours} salaryRange={job.salaryRange} employmentType={job.employmentType} location={job.location} key={index} />
              }) : "No jobs found at the moment, Check back later!"}
            </div>
          </div>

          {/* Skills based search */}
          <div className="flex flex-col justify-center p-6 rounded-lg relative z-10 bg-card shadow-black/20 shadow-[0px_0px_10px] dark:border dark:border-muted">
            <h1 className="text-xl font-semibold">Search Jobs based on skills</h1>
            <div className="flex gap-2 flex-wrap py-3">
              {skills.map((skill, index) => {
                const url = {
                  title: "",
                  location: "",
                  skill: skill,
                }
                return <Link href={`/search/${JSON.stringify(url)}`} className="bg-primary rounded-full px-3 py-1 text-white" key={index}>{skill}</Link>
              })}
            </div>
          </div>


          {/* Course Recommendations */}
          <div className="flex flex-col justify-center p-6 rounded-lg relative z-10 bg-card shadow-black/20 shadow-[0px_0px_10px] dark:border dark:border-muted">
            <h1 className="text-xl font-semibold">Placement guaranteed courses</h1>
            <div className="flex gap-2 flex-wrap overflow-x-auto py-3">
              No courses found at the moment, Check back later!
            </div>
          </div>


        </div>
      </div>
    )
  } else {
    return (
      <div
        style={{ minHeight: "calc(100vh - 64px)" }}
        className="main-bg flex flex-col items-center justify-center py-8 bg-secondary dark:bg-background/85"
      >
        {userDataLoading ? <motion.aside
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center justify-center flex-1 w-full text-center"
        >
          <Loader_dots text="Initializing, Please wait" />
        </motion.aside>
          :
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center flex-1 w-full px-20 text-center">
            <h1 className="text-6xl font-bold">
              Welcome to{" "}
              <a className="text-primary" href="#">
                ParaSeek.
              </a>
            </h1>

            {userLog ?
              <p className="mt-3 text-2xl">
                Find the best talent for your company. Explore thousands of job seekers from around the world.
              </p>
              :
              <p className="mt-3 text-2xl">
                Find your dream job with us. Explore thousands of job listings from top companies.
              </p>
            }

            <div className="mt-6">
              {userLog ? (
                <Link href="/dashboard">
                  <button className="px-8 py-3 text-lg font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90">
                    Go To Dashboard
                  </button>
                </Link>
              ) : (
                <Link href="/login">
                  <button className="px-8 py-3 text-lg font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90">
                    Get Started
                  </button>
                </Link>
              )}
            </div>
          </motion.div>}
      </div>
    );
  }
}
