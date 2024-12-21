"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader_dots from '@/components/Loader_dots';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const Page = ({ params }: { params: { slug: string } }) => {
  const [loading, setLoading] = useState(false);
  const companyId = params.slug;
  const companies = useSelector((state: RootState)=>state.companies)
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
      console.log(dataRes);
      if (dataRes.success) {        
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
      router.push("/dashboard");
    }
  };

  return (
    <div
      style={{ minHeight: "calc(100vh - 64px)" }}
      className="flex flex-col items-center justify-center py-2 bg-secondary"
    >
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          layout="position"
          transition={{ duration: 0.5 }}
          className="w-full max-w-md p-8 bg-white  dark:bg-gray-950 rounded-lg shadow-md"
        >
          <h2 className="mb-6 text-2xl font-bold text-center">You got a offer</h2>
            <Button onClick={()=>handleOfferAccepted(true)}>Accept</Button>
            <Button onClick={()=>handleOfferAccepted(false)}>Reject</Button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Page;
