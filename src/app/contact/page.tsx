"use client";
import React from "react";
import { useForm} from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface contactFormData {
  name: string;
  email: string;
  mobile: number;
  message: string;
}

const page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<contactFormData>();
  const onSubmit = (data: contactFormData) => {
    console.log(data);
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
          className="w-full max-w-md p-8 bg-white rounded-lg shadow-md"
        >
          <h2 className="mb-6 text-2xl font-bold text-center">
            Contact Us
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <Input
                  type="name"
                  placeholder="Name"
                  className="w-full"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <span className="text-red-500 text-xs">
                    This field is required
                  </span>
                )}
              </div>
  
            <div className="mb-4">
              <Input
                type="email"
                placeholder="Email"
                className="w-full"
                {...register("email", {
                  required: true,
                  pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                })}
              />
              {errors.email && (
                <span className="text-red-500 text-xs">
                  Invalid email address
                </span>
              )}
            </div>
            
            <div className="mb-4">
              <Input
                type="number"
                placeholder="Mobile Number"
                className="w-full"
                {...register("mobile", {
                  required: true,
                  pattern: /^[0-9]{10}$/,
                })}
              />
              {errors.mobile && (
                <span className="text-red-500 text-xs">
                  Invalid Mobile Number
                </span>
              )}
            </div>
            
            <div className="mb-4">
              <Input
                type="message"
                placeholder="Message"
                className="w-full"
                {...register("message", {
                  required: true,
                })}
              />
              {errors.message && (
                <span className="text-red-500 text-xs">
                  This field is required
                </span>
              )}
            </div>
            
            <Button
              type="submit"
              className="w-full py-2 mt-4 text-lg font-medium text-white bg-primary rounded-md hover:bg-primary/90"
            >
              Send Message
            </Button>
          </form>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default page;
