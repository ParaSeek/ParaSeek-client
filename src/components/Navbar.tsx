"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Image from "../../public/account_icon.png"
import { ToggleTheme } from "./ToggleTheme";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import SearchBar from "./SearchBar";
import { PinIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const navItems = [
  { path: "/jobs", name: "Jobs" },
  { path: "/companies", name: "Companies" },
  { path: "/about", name: "About" },
  { path: "/contact", name: "Contact" },
  { path: "/community", name: "Community" }
];

export const Navbar = () => {
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState(pathname);
  const [isMenuOpen, setisMenuOpen] = useState(false);
  const userLog = useSelector((state: RootState) => state.user.isLoggedIn)
  const user = useSelector((state: RootState) => state.user.data)
  const [navTop, setNavTop] = useState(0)
  const [navPinned, setNavPinned] = useState(false)
  const toggleMenu = () => {
    setisMenuOpen(!isMenuOpen);
  };
  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname]);
  return (
    <header className="bg-background flex flex-col items-center sticky z-50 h-16 px-2 top-0 left-0 backdrop-blur-sm">
      <div className="container relative z-10 bg-background h-16 flex justify-between mx-auto items-center" onMouseOver={() => setNavTop(16)}>
        <div className="md:hidden flex items-center justify-start w-[25vw]">
          <div
            onClick={toggleMenu}
            className="flex duration-300 flex-col justify-around relative z-10 w-8 h-8 cursor-pointer"
          >
            <motion.div
              animate={isMenuOpen ? { rotate: 45, y: 10 } : { rotate: 0, y: 0 }}
              className="w-full h-[3px] bg-black dark:bg-white rounded"
            />
            <motion.div
              animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-3/5 h-[3px] bg-black dark:bg-white rounded"
            />
            <motion.div
              animate={
                isMenuOpen ? { rotate: -45, y: -11 } : { rotate: 0, y: 0 }
              }
              className="w-full h-[3px] bg-black dark:bg-white rounded"
            />
          </div>
          <div className="md:hidden ml-3">
            <SearchBar />
          </div>
        </div>
        <div className="text-lg flex w-[25vw] items-center justify-center md:justify-start font-bold">
          <Link href="/" className="flex items-baseline">
            <span className="text-2xl">Para</span>
            <span className="font-medium text-primary text-2xl">Seek.</span>
          </Link>
        </div>
        <div className="w-full md:flex items-center justify-center md:static md:h-full hidden">
          <SearchBar />
        </div>
        <div className="w-[25vw] flex gap-2 items-center justify-end">
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
      <div className={`absolute top-${navTop} bg-background/50 w-full flex items-center justify-center z-0 transition-all duration-300`} onMouseLeave={() => { if (!navPinned) setNavTop(0) }}>

        <div
          className={`flex md:px-12 md:h-16 flex-col transition-all duration-300 fixed left-0 top-16 md:top-0 h-screen bg-secondary items-center justify-center overflow-hidden md:relative md:bg-transparent md:flex-row ${isMenuOpen ? "w-[70vw] md:w-auto" : "w-[0vw] md:w-auto"
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

        <Button variant="outline" size="icon" className={`absolute right-6 ${navPinned ? "bg-muted" : ""} ${navTop === 0 ? "hidden" : "md:flex hidden"}`} onClick={() => setNavPinned(!navPinned)}>
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild><PinIcon className="cursor-pointer rotate-45" /></TooltipTrigger>
              <TooltipContent side="bottom">
                <p>{navPinned ? "Unpin Navbar" : "Pin Navbar"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

        </Button>
      </div>
    </header>
  );
};
