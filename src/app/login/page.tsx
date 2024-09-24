"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useForm, Controller } from 'react-hook-form';

interface FormData {
  name?: string;
  email: string;
  role?: string;
  password: string;
}

const Page = () => {
    const [isLogin, setIsLogin] = useState(true);
    const { register, handleSubmit, control, formState: { errors } } = useForm<FormData>();

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    const onSubmit = (data: FormData) => {
        console.log(data);
    };

    return (
        <div style={{ minHeight: "calc(100vh - 64px)" }} className="flex flex-col items-center justify-center py-2 bg-secondary">
            <AnimatePresence>
                <motion.div
                    key={isLogin ? 'login' : 'signup'}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    layout="position"
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md p-8 bg-white rounded-lg shadow-md"
                >
                    <h2 className="mb-6 text-2xl font-bold text-center">
                        {isLogin ? 'Login' : 'Sign Up'}
                    </h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {!isLogin && (
                            <div className="mb-4">
                                <Input type="text" placeholder="Name" className="w-full" {...register('name', { required: true })} />
                                {errors.name && <span className="text-red-500">This field is required</span>}
                            </div>
                        )}
                        <div className="mb-4">
                            <Input type="email" placeholder="Email" className="w-full" {...register('email', { required: true, pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/ })} />
                            {errors.email && <span className="text-red-500">Invalid email address</span>}
                        </div>
                        {!isLogin && (
                            <div className="mb-4">
                                <Controller
                                    name="role"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Role" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="candidate">Candidate</SelectItem>
                                                <SelectItem value="recruiter">Recruiter</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.role && <span className="text-red-500">This field is required</span>}
                            </div>
                        )}
                        <div className="mb-4">
                            <Input type="password" placeholder="Password" className="w-full" {...register('password', { required: true })} />
                            {errors.password && <span className="text-red-500">This field is required</span>}
                        </div>
                        <Button type="submit" className="w-full py-2 mt-4 text-lg font-medium text-white bg-primary rounded-md hover:bg-primary/90">
                            {isLogin ? 'Login' : 'Sign Up'}
                        </Button>
                    </form>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-4 text-center"
                    >
                        <a
                            href="#"
                            onClick={toggleForm}
                            className="text-primary hover:underline"
                        >
                            {isLogin ? 'Create an account' : 'Already have an account? Login'}
                        </a>
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default Page;
