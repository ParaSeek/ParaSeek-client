"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  if (pathname.includes("/dashboard") || pathname.includes("/community")) {
    return null;
  } else {
    return (
      <footer className="bg-black z-[9999999999999999] relative dark:bg-gray-950 text-white py-6 px-2">
        <div className="container mx-auto flex justify-between flex-col md:flex-row">
          <div className="flex flex-col items-center text-center md:items-start">
            <h3 className="font-bold">ParaSeek.</h3>
            <p className="md:text-left">© 2024 ParaSeek. All rights reserved.</p>
          </div>
          <div className="flex text-center md:self-end flex-col md:flex-row items-center mt-2 md:mt-0">
            <Link href="#" className="md:mr-3 hover:underline md:border-r md:border-r-border md:pr-3 border-b border-b-border pb-1 mb-2 w-fit md:border-b-0 md:pb-0 md:mb-0">Privacy Policy</Link>
            <Link href="#" className="md:mr-3 hover:underline md:border-r md:border-r-border md:pr-3 border-b border-b-border pb-1 mb-2 w-fit md:border-b-0 md:pb-0 md:mb-0">Terms of Service</Link>
            <Link href="/about" className="md:mr-3 hover:underline md:border-r md:border-r-border md:pr-3 border-b border-b-border pb-1 mb-2 w-fit md:border-b-0 md:pb-0 md:mb-0">About us</Link>
            <Link href="/contact" className="md:mr-3 hover:underline">Contact Us</Link>
          </div>
        </div>
      </footer>
    );
  }
}
