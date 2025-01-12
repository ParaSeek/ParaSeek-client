"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from "motion/react"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader_dots from '@/components/Loader_dots';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

const Page = ({ params }: { params: { slug: string } }) => {
  const [loading, setLoading] = useState(false);
  const token = params.slug;
  const { toast } = useToast();
  const router = useRouter();
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    try {
      const res = await fetch(
        `${process.env.SERVER_URL}/api/v1/auth/resetPassword/${token}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password: newPassword }),
        }
      );
      const dataRes = await res.json();
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
      router.push("/login");
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
          <h2 className="mb-6 text-2xl font-bold text-center">Update Password</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                className="w-full"
                onChange={(e: any) => setNewPassword(e.target.value)}
              />
            </div>
            <Button
              disabled={loading}
              type="submit"
              className="w-full py-2 mt-4 text-lg font-medium text-white bg-primary rounded-md hover:bg-primary/90"
            >{loading ? <Loader_dots text='Resetting' /> : "Reset"}</Button>
          </form>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Page;
