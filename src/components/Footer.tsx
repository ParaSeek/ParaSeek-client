"use client";
import { RootState } from "@/store/store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

export default function Footer() {
  const user = useSelector((state: RootState) => state.user.data)
  const pathname = usePathname();
  if (user?.role === process.env.EMPLOYER_ID && pathname.includes("/dashboard")) {
    return null;
  } else {
    return (
      <footer className="bg-black rounded-t-3xl dark:bg-gray-950 text-white py-6 px-2">
        <div className="container mx-auto flex justify-between flex-col md:flex-row">
          <div className="flex flex-col items-center text-center md:items-start">
            <h3 className="font-bold">ParaSeek.</h3>
            <p>© 2024 ParaSeek. All rights reserved.</p>
          </div>
          <div className="flex text-center md:self-end flex-col md:flex-row">
            <Link href="#" className="md:mr-3 hover:underline">Privacy Policy</Link>
            <Link href="#" className="md:mr-3 hover:underline">Terms of Service</Link>
            <Link href="/about" className="md:mr-3 hover:underline">About us</Link>
            <Link href="/contact" className="md:mr-3 hover:underline">Contact Us</Link>
          </div>
        </div>
      </footer>
    );
  }
}
