"use client";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { motion } from "framer-motion";
import Loader_dots from "@/components/Loader_dots";
import SearchBar from "@/components/SearchBar";
export default function Home() {
  const userLog = useSelector((state: RootState) => state.user.isLoggedIn)
  const userDataLoading = useSelector((state: RootState) => state.user.loading)
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
