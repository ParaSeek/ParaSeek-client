import type { Metadata } from "next";
import { Montserrat } from "next/font/google"
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster"
import { Providers } from "./provider";
import LoadUserData from "@/components/LoadUserData";
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700']
});
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "ParaSeek",
  description: "Welcome to ParaSeek, your go-to destination for career growth and job opportunities. Our mission is to empower job seekers by providing them with the tools and resources they need to succeed in today’s competitive job market.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={montserrat.className}
      >
        <Providers>
          <LoadUserData/>
          <Navbar />
          {children}
          <Toaster />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
