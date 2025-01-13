"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { ToggleTheme } from "./ToggleTheme";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import SearchBar from "./SearchBar";
import { FloatingDock } from "./ui/floating-dock";
import { IconBrandGithub, IconBrandLinkedin, IconGlobe, IconHome, IconNewSection, IconTerminal2 } from "@tabler/icons-react";
import { FaInternetExplorer, FaPeopleGroup, FaSuitcase } from "react-icons/fa6";
import { Compass, Search } from "lucide-react";

const navItems = [
  { path: "/jobs", name: "Jobs" },
  { path: "/companies", name: "Companies" },
  { path: "/community", name: "Community" }
];
const navItemsNew = [
  {
    title: "Home",
    icon: (
      <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "/",
  },
  {
    title: "Search Jobs",
    icon: (
      <Search className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "/search",
  },
  {
    title: "Jobs",
    icon: (
      <FaSuitcase className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "/jobs",
  },
  {
    title: "Companies",
    icon: (
      <Compass className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "/companies",
  },
  {
    title: "Community",
    icon: <FaPeopleGroup className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
    href: "/community",
  },

  {
    title: "Linked In",
    icon: (
      <IconBrandLinkedin className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "#",
  },
];

export const Navbar = () => {
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState(pathname);
  const [isMenuOpen, setisMenuOpen] = useState(false);
  const userLog = useSelector((state: RootState) => state.user.isLoggedIn)
  const user = useSelector((state: RootState) => state.user.data)
  const toggleMenu = () => {
    setisMenuOpen(!isMenuOpen);
  };
  useEffect(() => {
    setActiveLink(pathname);

  }, [pathname]);

  if (user?.role == process.env.EMPLOYER_ID && pathname.includes("/dashboard")) {
    return null;
  }
  else return (
    <header className={`flex flex-col items-center bg-card border-b border-border fixed w-full z-20 h-16 px-2 top-0 left-0 backdrop-blur-sm`}>
      <div className="container relative z-10 h-16 flex justify-between mx-auto items-center">
        {/* <div className="flex items-center justify-between w-[25vw] md:w-[8vw]">
          <div className="flex items-center">
            <div
              onClick={toggleMenu}
              className="flex duration-300 flex-col justify-around relative z-10 w-6 h-6 cursor-pointer"
            >
              <motion.div
                animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="w-full h-[3px] bg-black dark:bg-white rounded"
              />
              <motion.div
                animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-3/5 h-[3px] bg-black dark:bg-white rounded"
              />
              <motion.div
                animate={
                  isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }
                }
                className="w-full h-[3px] bg-black dark:bg-white rounded"
              />
            </div>
            <div className="md:hidden ml-3">
              <SearchBar />
            </div>
          </div>
        </div> */}
        <div className="text-lg flex items-center  md:mr-8  w-full font-bold">
          <Link href={`${user?.role == process.env.EMPLOYER_ID ? "/dashboard" : "/"}`} className="flex items-baseline">
            <span className="text-2xl">Para</span>
            <span className="font-medium text-primary text-2xl">Seek.</span>
          </Link>
        </div>
        {/* <div className="w-full md:flex items-center justify-center md:static md:h-full hidden">
          <SearchBar />
        </div> */}
        <div className="w-[25vw] md:w-[12vw] flex gap-2 items-center justify-end">
          <div className="md:hidden ml-3">
            <SearchBar />
          </div>
          <ToggleTheme />
          {userLog ? (
            <Link href="/account">
              <Avatar className="w-8 h-8">
                <AvatarImage className="object-contain" src={user.profilePic} />
                <AvatarFallback className="bg-primary text-white">{user.username.substring(0, 1).toUpperCase()}</AvatarFallback>
              </Avatar>
            </Link>
          ) : (
            <Link href="/login">
              <p className="bg-primary font-medium text-primary-foreground px-3 py-2 rounded-md hover:bg-primary/90">
                Login
              </p>
            </Link>
          )}
        </div>
      </div>
      <div className={`absolute bg-background/50 w-full flex items-center justify-center z-0 transition-all duration-300`}>

        {user?.role != process.env.EMPLOYER_ID && <div className="flex items-center top-[90vh] fixed md:left-1/2 md:translate-x-[-50%] right-4 h-[64px]">
          <FloatingDock
            items={navItemsNew}
          />
        </div>}
        <div
          className={`flex flex-col transition-all duration-300 fixed left-0 top-16 h-screen bg-card items-center justify-center overflow-hidden ${isMenuOpen ? "w-[150px] md:w-[200px]" : "w-[0px]"
            }`}
        >
          {navItems.map((item) => (
            <Link onClick={toggleMenu} key={item.path} href={item.path}>
              <div
                className={`relative mx-2 md:mx-8 px-2 py-2 ${activeLink === item.path
                  ? "text-primary"
                  : "hover:text-primary"
                  } font-medium`}
                onClick={() => setActiveLink(item.path)}
              >
                {item.name}
                {activeLink === item.path && (
                  <motion.div
                    layoutId="underline"
                    className={`absolute bottom-1 right-0 h-[2px] bg-primary rounded-lg w-full`}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};
