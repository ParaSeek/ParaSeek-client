"use client";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { motion } from "motion/react";
import Loader_dots from "@/components/Loader_dots";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { CheckCircle, CircleAlertIcon } from "lucide-react";
import Jobcard from "@/components/jobs/Jobcard";
import { skills } from "@/store/suggestions";
import { useRouter } from "next/navigation";
import GradientBg from "@/components/GradientBg";
import { FaArrowRightLong } from "react-icons/fa6";
import { BackgroundBeamsWithCollision } from "@/components/ui/backgroundBeams";
import SearchBar from "@/components/SearchBar";

const images = [
  "https://static.vecteezy.com/system/resources/previews/015/841/629/non_2x/online-jobs-employee-work-banner-design-vector.jpg",
  "https://static.vecteezy.com/system/resources/previews/006/150/633/original/search-for-new-job-employment-career-or-job-search-find-opportunity-seek-for-vacancy-or-work-position-concept-businessman-using-magnifying-glass-searching-for-new-hiring-career-design-vector.jpg",
  "https://static.vecteezy.com/system/resources/thumbnails/014/484/817/small_2x/poster-of-job-vacancy-hire-staff-free-vector.jpg"
];
const landingParagraph = [
  "Find your dream job with us. Explore thousands of job listings from top companies.",
  " Find the best talent for your company. Explore thousands of job seekers from around the world.",
];

export default function Home() {
  const userLog = useSelector((state: RootState) => state.user.isLoggedIn)
  const userDataLoading = useSelector((state: RootState) => state.user.loading)
  const userData = useSelector((state: RootState) => state.user.data)
  const recommendedJobs = useSelector((state: RootState) => state.recommendedJobs)
  const [progress_bar, setProgress_bar] = useState(0);
  const [profileProgress, setProfileProgress] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1); // Start with the next image
  const [currentPIndex, setCurrentPIndex] = useState(0);
  const [nextPIndex, setNextPIndex] = useState(1);
  const [diverting, setDiverting] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % images.length;
        if (newIndex + 1 == images.length) {
          setNextIndex(0); // Update the next index
        } else {
          setNextIndex(newIndex + 1); // Update the next index
        }
        return newIndex;
      });
    }, 4500); // Change image every 4.5 seconds
    const intervalP = setInterval(() => {
      setCurrentPIndex((prevIndex) => {
        const newPIndex = (prevIndex + 1) % landingParagraph.length;
        if (newPIndex + 1 == landingParagraph.length) {
          setNextPIndex(0); // Update the next index
        } else {
          setNextPIndex(newPIndex + 1); // Update the next index
        }
        return newPIndex;
      });
    }, 4500); // Change image every 4.5 seconds

    return () => {
      clearInterval(interval); // Cleanup on unmount
      clearInterval(intervalP); // Cleanup on unmount
    }
  }, []);
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

  useEffect(() => {
    const divertToDashboard = async () => {
      if (userLog && userData.role == process.env.EMPLOYER_ID) {
        setDiverting(true);
        await new Promise(resolve => setTimeout(resolve, 1200));
        router.push('/dashboard');
      }
    };
    divertToDashboard();
    return () => setDiverting(false);
  }, [userLog, router]);

  if (userLog && userData.role == process.env.JOBSEEKER_ID) {
    return (
      <div
        className="main-bg bg-background min-h-screen pt-16"
      >
        <div className="backdrop-blur-2xl relative z-[10] bg-transparent">

          <div
            className="flex p-6 gap-3 flex-col lg:flex-row"
          >
            <motion.aside
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              // whileDrag={{ scale: 0.9, rotate: 10 }}
              // dragConstraints={{ left: -30, right: 10, top: -40, bottom: 40 }}
              // dragElastic={0.2}
              // drag
              className="relative z-[15] bg-card lg:w-1/4 w-full rounded-xl p-4 overflow-hidden flex lg:flex-col xs:flex-row flex-col items-center justify-center md:gap-20 lg:gap-0 gap-6"
            >
              <GradientBg width={300} height={200} />
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
                  <span className="font-medium relative z-[15]">Welcome back <span className="font-semibold text-center">{userData.firstName == "" ? userData.username : userData.firstName}!</span></span>
                </motion.h2>
              </div>
              <div className="lg:w-11/12 rounded-lg lg:mt-4 bg-secondary/60 p-2 flex flex-col gap-2 relative z-[12]">
                <h1 className="font-semibold text-center">What are you missing?</h1>
                <p className="flex items-center gap-2">{userData.firstName != "" && userData.lastName != "" ? <CheckCircle className="w-5 text-green-500" /> : <CircleAlertIcon className="w-5 text-red-500" />}Full Name</p>
                <p className="flex items-center gap-2">{userData.profilePic != "" ? <CheckCircle className="w-5 text-green-500" /> : <CircleAlertIcon className="w-5 text-red-500" />}Profile Pic</p>
                <p className="flex items-center gap-2">{userData.location ? <CheckCircle className="w-5 text-green-500" /> : <CircleAlertIcon className="w-5 text-red-500" />}Address</p>
                <p className="flex items-center gap-2">{userData.qualification?.education.length > 0 ? <CheckCircle className="w-5 text-green-500" /> : <CircleAlertIcon className="w-5 text-red-500" />}Education Details</p>
                <p className="flex items-center gap-2">{userData.jobPreferences ? <CheckCircle className="w-5 text-green-500" /> : <CircleAlertIcon className="w-5 text-red-500" />}Job Preferences</p>
                <Link className="mx-auto relative z-[15]" href="/account"><Button className="rounded-full">Complete Profile</Button></Link>
              </div>
            </motion.aside>
            <div
              className="lg:w-3/4 w-full flex flex-col gap-3"
            >
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 lg:h-[58%] md:h-[300px] sm:h-[250px] xs:h-[200px] h-[120px] backdrop-blur-2xl bg-transparent w-full rounded-xl overflow-hidden">
                {/* Current Image */}
                <motion.div
                  key={`current-${currentIndex}`} // Unique key for current image
                  initial={{ x: 0 }} // Start in the center
                  animate={{ x: '-100%' }} // Move to left when exiting
                  exit={{ x: '-100%' }} // Exit to left
                  transition={{ duration: 0.5 }} // Transition duration
                  style={{
                    backgroundImage: `url(${images[currentIndex]})`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    height: '100%',
                    width: '100%',
                    position: 'absolute', // Position absolute to overlap
                  }}
                />

                {/* Next Image */}
                <motion.div
                  key={`next-${nextIndex}`} // Unique key for next image
                  initial={{ x: '100%' }} // Start from right
                  animate={{ x: 0 }} // Move to center
                  exit={{ x: '100%' }} // Exit to right
                  transition={{ duration: 0.5 }} // Transition duration
                  style={{
                    backgroundImage: `url(${images[nextIndex]})`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    height: '100%',
                    width: '100%',
                    position: 'absolute', // Position absolute to overlap
                  }}
                />

              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 h-[42%] backdrop-blur-2xl bg-card w-full rounded-xl overflow-hidden flex gap-8">
                <GradientBg width={300} height={200} />
                <div className="p-4 relative z-[12]">
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
          <div className="w-full px-6 flex flex-col relative z-[15]">
            {/* <div className="w-full md:block hidden pt-4 max-w-3xl mx-auto">
              <SearchBar />
            </div> */}
            {/* Job Recommendations */}
            <div className="flex flex-col justify-center p-6 rounded-lg">
              <h1 className="text-xl font-semibold">Top Job Recommendations</h1>
              <div className="flex gap-3 overflow-x-auto py-3">
                {recommendedJobs.length > 0 ? recommendedJobs.map((job, index) => {
                  return <Jobcard id={job.job._id} title={job.job.title} companyName={job.job.companyName} workHours={job.job.workHours} salaryRange={job.job.salaryRange} employmentType={job.job.employmentType} location={job.job.location} key={index} score={job.score} />
                }) : <Link className="flex items-center gap-2" href="/jobs">No Job Recommendations for you at the moment, explore all jobs <FaArrowRightLong /></Link>}
              </div>
            </div>

            {/* Skills based search */}
            <div className="flex flex-col justify-center p-6 rounded-lg">
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
            <div className="flex flex-col justify-center p-6 rounded-lg">
              <h1 className="text-xl font-semibold">Placement guaranteed courses</h1>
              <div className="flex gap-2 flex-wrap overflow-x-auto py-3">
                No courses found at the moment, Check back later!
              </div>
            </div>


          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div
        className="main-bg flex flex-col min-h-screen items-center justify-center py-8 bg-card"
      >
        <BackgroundBeamsWithCollision>

          {userDataLoading || diverting ? <motion.aside
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
              <h1 className="md:text-6xl text-5xl font-bold">
                Welcome to{" "}
                <span className="text-primary">
                  ParaSeek.
                </span>
              </h1>
              <div className="w-full mt-2 md:text-2xl text-lg overflow-hidden">
                <motion.p key={`next-${nextPIndex}`}
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '200%' }}
                  transition={{ duration: 0.5 }}
                >
                  {landingParagraph[nextPIndex]}
                </motion.p>
              </div>
              <div className="w-full md:block hidden mt-8 mb-4 max-w-3xl">
                <SearchBar />
              </div>

              <div className="mt-6">
                <Link href="/login">
                  <button className="px-8 py-3 text-lg font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90">
                    Get Started
                  </button>
                </Link>
              </div>
            </motion.div>}
        </BackgroundBeamsWithCollision>
      </div>
    );
  }
}
