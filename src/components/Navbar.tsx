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
const navItems = [
  { path: "/jobs", name: "Jobs" },
  { path: "/companies", name: "Companies" },
  { path: "/about", name: "About" },
  { path: "/contact", name: "Contact" },
];

export const Navbar = () => {
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState(pathname);
  const [isMenuOpen, setisMenuOpen] = useState(false);
  const userLog = useSelector((state: RootState) => state.user.isLoggedIn)
  const user= useSelector((state: RootState) => state.user.data)
  const toggleMenu = () => {
    setisMenuOpen(!isMenuOpen);
  };
  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname]);
  return (
    <header className="bg-background flex items-center sticky z-50 h-16 px-2 top-0 left-0 backdrop-blur-sm">
      <nav className="container h-16 flex justify-between mx-auto items-center">
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
        </div>
        <div className="text-lg flex w-[25vw] items-center justify-center md:justify-start font-bold">
          <Link href="/" className="flex items-baseline">
            <span className="text-2xl">Para</span>
            <span className="font-medium text-primary text-2xl">Seek.</span>
          </Link>
        </div>
        <div
          className={`flex md:px-12 md:h-16 flex-col transition-all duration-300 fixed left-0 top-0 h-screen bg-secondary items-center justify-center overflow-hidden md:relative md:bg-transparent md:flex-row ${isMenuOpen ? "w-[70vw] md:w-auto" : "w-[0vw] md:w-auto"
            }`}
        >
          {navItems.map((item) => (
            <Link onClick={toggleMenu} key={item.path} href={item.path}>
              <div
                className={`relative mx-2 px-2 py-2 ${activeLink === item.path
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
        <div className="w-[25vw] flex gap-2 items-center justify-end">
          <ToggleTheme />
          {userLog ? (
            <Link href="/account">
              <Avatar className="w-8 h-8">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary/80 text-white">{user.username.substring(0,1).toUpperCase()}</AvatarFallback>
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
      </nav>
    </header>
  );
};
