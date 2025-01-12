"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from "motion/react"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader_dots from '@/components/Loader_dots';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import AccessDenied from '@/components/AccessDenied';

const Page = ({ params }: { params: { slug: string } }) => {
  const [loading, setLoading] = useState(false);
  const companyId = params.slug;
  const companies = useSelector((state: RootState) => state.companies)
  const company = companies.find((company) => company._id === companyId);

  const { toast } = useToast();
  const router = useRouter();
  const handleOfferAccepted = async (accepted: boolean) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.SERVER_URL}/api/v1/company/response/${companyId}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: accepted ? "accept" : "reject" }),
        }
      );
      const dataRes = await res.json();
      if (dataRes.success) {
        router.push("/dashboard");
        toast({ title: dataRes.message });
      } else {
        toast({ variant: "destructive", title: dataRes.message });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: error.message,
        description: "Internal Server Error",
      });
    } finally {
      setLoading(false);
    }
  };

  if (company) {

    return (
      <div
        className="flex flex-col items-center justify-center min-h-screen py-2 bg-background/70"
      >
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            layout="position"
            transition={{ duration: 0.5 }}
            className="w-full max-w-md p-8 bg-card dark:border dark:border-muted rounded-lg shadow-black/20 shadow-[0px_0px_10px]"
          >
            <h2 className="mb-6 text-xl font-bold text-center">Join as an HR in the following company</h2>
            <div className='flex gap-3 justify-center'>

              <div className='w-12 h-12 flex items-center justify-center'>
                {
                  company.companyLogo?.includes("https://") ?
                    <img width="48px" height="48px" className='rounded-sm' src={company.companyLogo} alt={company.companyName.charAt(0)} />
                    :
                    <p className='w-12 h-12 bg-primary text-white rounded-sm grid place-items-center text-3xl font-semibold'>
                      {company.companyName.charAt(0)}
                    </p>
                }
              </div>
              <span className='h-[48px] w-[2px] rounded-full bg-muted '></span>
              <div>
                <h1 className='text-lg font-semibold'>{company.companyName}</h1>
                <p>{company.Headquarters}</p>
              </div>
            </div>
            <div className='flex gap-3 justify-center mt-4'>
              <Button onClick={() => handleOfferAccepted(true)}>Accept</Button>
              <Button onClick={() => handleOfferAccepted(false)}>Reject</Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  } else {
    return <AccessDenied />
  }
};

export default Page;
