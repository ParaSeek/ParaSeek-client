"use client";
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { Input } from '@/components/ui/input';
import Loader_dots from '@/components/Loader_dots';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from "lucide-react"
import Link from 'next/link';
import { states } from '@/store/suggestions';
interface User {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    username: string;
    dob: string;
    gender: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}


const ProfilePage = () => {
    const userData = useSelector((state: RootState) => state.user.data)

    const [user, setUser] = useState<User>({ email: userData.email, firstName: userData.firstName, lastName: userData.lastName, phoneNumber: userData.phoneNumber, username: userData.username, dob: new Date(userData.dob).toLocaleDateString(), gender: userData.gender, street: userData.location?.street, city: userData.location?.city, state: userData.location?.state, postalCode: userData.location?.postalCode, country: userData.location?.country });
    const [isEditing, setIsEditing] = useState(false);
    const { toast } = useToast();
    const [loading, setLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (user) {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };
    const handleSelectChange = (name: string, value: string) => {
        if (user) {
            setUser({ ...user, [name]: value });
        }
    };

    const handleSave = async () => {
        setLoading(true)
        try {
            const res = await fetch(`${process.env.SERVER_URL}/api/v1/user/update-profile`, {
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
            const dataRes = await res.json();
            if (dataRes.success) {
                toast({ title: "Profile Updated" })
            } else {
                toast({ title: "Profile not updated", description: dataRes.message, variant: "destructive" })
            }
            setIsEditing(false);
        } catch (e: any) {
            toast({ title: "Error Updating Data", description: e, variant: "destructive" })
        } finally {
            setLoading(false)
        }

    };


    return (
        <motion.div
            className="w-4/5 mx-auto bg-card shadow-lg rounded-lg p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className='flex flex-col md:flex-row gap-1 justify-between mb-4'>
                <div className='flex items-center gap-2'>
                    <Link href="/account" replace><Button variant="outline" size="icon">
                        <ArrowLeft className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
                    </Button></Link>
                    <h2 className="sm:text-lg md:text-2xl text-center font-semibold ">Profile Information</h2>
                </div>
                {isEditing ? (
                    <Button
                        onClick={handleSave}
                        className="bg-primary text-white py-2 px-4 rounded-lg"
                        disabled={loading}
                    >
                        {loading ? <Loader_dots text='Updating' /> : "Save"}
                    </Button>
                ) : (
                    <Button
                        onClick={() => setIsEditing(true)}
                        className="bg-primary text-white py-2 px-4 rounded-lg"
                    >
                        Edit Profile
                    </Button>
                )}
            </div>
            <div className="mb-4">
                <label className="block mb-1">First Name</label>
                <Input
                    type="text"
                    name="firstName"
                    value={user.firstName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border rounded-lg disabled:cursor-default"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1">Last Name</label>
                <Input
                    type="text"
                    name="lastName"
                    value={user.lastName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border rounded-lg disabled:cursor-default"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1">Email</label>
                <Input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    disabled
                    className="w-full px-3 py-2 border rounded-lg disabled:cursor-default"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1">Phone Number</label>
                <Input
                    type="tel"
                    name="phoneNumber"
                    value={user.phoneNumber}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border rounded-lg disabled:cursor-default"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1">Username</label>
                <Input
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border rounded-lg disabled:cursor-default"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1">Date of Birth</label>
                {isEditing &&
                    <Input
                        type="date"
                        name="dob"
                        value={user.dob}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                }
                <Input
                    type="text"
                    name="dob"
                    value={user.dob}
                    disabled
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg disabled:cursor-default"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1">Gender</label>
                <Select
                    value={user.gender}
                    disabled={!isEditing}
                    onValueChange={(value) => handleSelectChange('gender', value)}
                >
                    <SelectTrigger className="w-full disabled:cursor-default">
                        <SelectValue placeholder="Gender" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="mb-4">
                <label className="block mb-1">Street Address</label>
                <Input
                    type="text"
                    name="street"
                    value={user.street}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border rounded-lg disabled:cursor-default"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1">City</label>
                <Input
                    type="text"
                    name="city"
                    value={user.city}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border rounded-lg disabled:cursor-default"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1">State</label>
                <Select
                    value={user.state}
                    disabled={!isEditing}
                    onValueChange={(value) => handleSelectChange('state', value)}
                >
                    <SelectTrigger className="w-full disabled:cursor-default">
                        <SelectValue placeholder="State" />
                    </SelectTrigger>
                    <SelectContent>
                        {states.map((state, index) => {
                            return <SelectItem key={index} value={state}>{state}</SelectItem>
                        })}
                    </SelectContent>
                </Select>
            </div>
            <div className="mb-4">
                <label className="block mb-1">Postal Code</label>
                <Input
                    type="text"
                    name="postalCode"
                    value={user.postalCode}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border rounded-lg disabled:cursor-default"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1">Country</label>
                <Select
                    value={user.country}
                    disabled={!isEditing}
                    onValueChange={(value) => handleSelectChange('country', value)}
                >
                    <SelectTrigger className="w-full disabled:cursor-default">
                        <SelectValue placeholder="Country" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="India">India</SelectItem>
                    </SelectContent>
                </Select>
            </div>

        </motion.div>
    );
};

export default ProfilePage;
