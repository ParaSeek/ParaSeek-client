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
import Loader_dots from '@/components/Loader_dots';

interface UserData {
    username?: string;
    email: string;
    role?: string;
    password?: string;
}

const Page = () => {
    const [formType, setFormType] = useState<'login' | 'signup' | 'forgotPassword'>('login');
    const { register, handleSubmit, control, formState: { errors } } = useForm<UserData>();

    const toggleForm = (type: 'login' | 'signup' | 'forgotPassword') => {
        setFormType(type);
    };
    const [loading, setLoading] = useState(false)
    const onSubmit = async (data: UserData) => {
        if (formType === 'login') {
            setLoading(true)
            console.log('Login data:', data);
            setTimeout(() => {
                setLoading(false)
            }, 3000);
        } else if (formType === 'signup') {
            setLoading(true)
            console.log(data);
            try {
                const res = await fetch("http://localhost:8000/api/v1/auth/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    mode: "no-cors",
                    body: JSON.stringify(data),
                });
                const dataRes = await res.json();
                console.log(dataRes);
            } catch (error) {
                console.log(error);
            }
            finally {
                setLoading(false);
            }
        } else if (formType === 'forgotPassword') {
            setLoading(true)
            console.log('Forgot Password data:', data.email);
            setTimeout(() => {
                setLoading(false)
            }, 3000);
        }
    };

    return (
        <div style={{ minHeight: "calc(100vh - 64px)" }} className="flex flex-col items-center justify-center py-2 bg-secondary">
            <AnimatePresence>
                <motion.div
                    key={formType}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    layout="position"
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md p-8 bg-white rounded-lg shadow-md"
                >
                    <h2 className="mb-6 text-2xl font-bold text-center">
                        {formType === 'login' ? 'Login' : formType === 'signup' ? 'Register' : 'Forgot Password'}
                    </h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {formType === 'signup' && (
                            <div className="mb-4">
                                <Input type="text" placeholder="username" className="w-full" {...register('username', { required: true, pattern: /^[a-zA-Z][a-zA-Z0-9_]*$/ })} />
                                {errors.username && <span className="text-red-500 text-xs">Username should start from a letter and can include numbers and underscore</span>}
                            </div>
                        )}
                        <div className="mb-4">
                            <Input type="email" placeholder="Email" className="w-full" {...register('email', { required: true, pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/ })} />
                            {errors.email && <span className="text-red-500 text-xs">Invalid email address</span>}
                        </div>
                        {formType === 'signup' && (
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
                                                <SelectItem value="job_seeker">Job-seeker</SelectItem>
                                                <SelectItem value="employer">Employer</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.role && <span className="text-red-500 text-xs">This field is required</span>}
                            </div>
                        )}
                        {formType !== 'forgotPassword' && (
                            <div className="mb-4">
                                <Input type="password" placeholder="Password" className="w-full" {...register('password', { required: true })} />
                                {errors.password && <span className="text-red-500 text-xs">This field is required</span>}
                            </div>
                        )}
                        {formType === 'login' && <span className="text-red-500 text-xs underline cursor-pointer" onClick={() => toggleForm('forgotPassword')}>Forgot Password?</span>}
                        <Button disabled={loading} type="submit" className="w-full py-2 mt-4 text-lg font-medium text-white bg-primary rounded-md hover:bg-primary/90">
                            {formType === 'login' ? (loading ? <Loader_dots text='Logging in' /> : 'Login') : formType === 'signup' ? (loading ? <Loader_dots text="Signing Up" /> : 'Sign Up') : (loading ? <Loader_dots text='Loading' /> : 'Reset Password')}
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
                            onClick={() => toggleForm(formType === 'login' ? 'signup' : 'login')}
                            className="text-primary hover:underline"
                        >
                            {formType === 'login' ? 'Create an account' : formType === 'signup' ? 'Already have an account? Login' : 'Back to Login'}
                        </a>
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default Page;