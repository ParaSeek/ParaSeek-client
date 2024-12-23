"use client";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { motion } from "framer-motion";
import Loader_dots from "@/components/Loader_dots";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function Home() {
  const userLog = useSelector((state: RootState) => state.user.isLoggedIn)
  const userDataLoading = useSelector((state: RootState) => state.user.loading)
  const userData = useSelector((state: RootState) => state.user.data)
  if (userLog) {
    return (
      <div
        style={{ minHeight: "calc(100vh - 64px)" }}
        className="main-bg py-8 bg-secondary dark:bg-background/85"
      >
        <div
          className="flex p-6 gap-3"
        >
          <motion.aside
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 bg-card dark:border-muted dark:border shadow-black/20 shadow-[0px_0px_10px] w-1/4 rounded-xl p-4 overflow-hidden flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-background/90 rounded-full mt-2 p-1 w-18 h-18 border-[3px] border-muted"
            >
              <Avatar className="w-16 h-16">
                <AvatarImage className='object-contain' src={userData.profilePic} />
                <AvatarFallback className="bg-primary text-4xl font-extrabold text-white">{userData.username.substring(0, 1).toUpperCase()}</AvatarFallback>
              </Avatar>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xl"
            >
              <span className="font-medium">Welcome back, </span><span className="font-semibold">{userData.firstName}!</span>
            </motion.h2>
            <div className="w-11/12 rounded-lg mt-4 bg-secondary h-48">

            </div>
          </motion.aside>
          <div
            className="w-3/4 flex flex-col gap-3"
          >
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative z-10 bg-card dark:border dark:border-muted shadow-black/20 shadow-[0px_0px_10px] w-full rounded-xl p-4 overflow-hidden flex flex-col items-center">
              <motion.h2> first div</motion.h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative z-10 bg-card dark:border dark:border-muted shadow-black/20 shadow-[0px_0px_10px] w-full rounded-xl overflow-hidden flex gap-8">
              <div className="p-4">
                <motion.h2 className="font-semibold text-xl">Need help with your Resume?</motion.h2>
                <motion.p>We created a service known as Resume Wizard. The goal is simple: help you land that dream job interview! Get an advantage in the modern professional environment. Create your resume in two simple steps</motion.p>
                <Link href="/services/resume-wizard"><Button className="mt-4">Create Resume</Button></Link>
              </div>
              <div className="p-4">
                <img className="p-2 bg-white rounded-sm rounded-br-xl" src="https://s3-alpha-sig.figma.com/img/af3b/6828/787192a1f5bc3298a6ad9b695585a9b9?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WK5oZmtVSbNUdzplT2ObMtgZIJhMFn8PGsMFRFvEXS8vLiWttc5lbVaLmGRVLPhkA4R4QsFcR6jKMUb1T56I34IkL87vXEwIUJczAzJQFJWGfig3CWpEiZ5QH2xd6DG1OXV7iAYm15kbcQzJerPDjI30g7u5VI06AXV32bBWVsaaFA2mvRLHMxoJIJFmdD9q99NIRQKGBDRAh6mXKzcaOng7d-5Zv7Hf1fns-qLU1AI1lFCgs46Dpgv6pubI7BlC9ZRZxEXkhGGP48KHi6~QhQ5mCl-4RvKSOhXe0fLFdxyxn36ScVlBNHHkypX-ltLckYddw6c-NyWx7HPnbo6TiQ__" alt="" />
              </div>
            </motion.div>
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

            <p className="mt-3 text-2xl">
              Find your dream job with us. Explore thousands of job listings from
              top companies.
            </p>

            <div className="mt-6">
              {userLog ? (
                <Link href="/account">
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
