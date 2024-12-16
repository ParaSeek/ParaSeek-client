import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { logout } from '@/slices/userSlice';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loader_dots from "@/components/Loader_dots";
import { EditIcon } from "lucide-react"
import { Loader } from "lucide-react"
import LoadUserData from '../LoadUserData';
import { useTheme } from 'next-themes';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {FaCalendarDays, FaEnvelope, FaLocationDot, FaPhone, FaUser } from 'react-icons/fa6';


const ProfileCard = () => {
    const userData = useSelector((state: RootState) => state.user.data)
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const { toast } = useToast();
    const dispatch = useDispatch();
    const [revalidateData, setRevalidateData] = useState(false);
    const { theme } = useTheme();

    const handleProfilePicUpdate = async (e: any) => {
        const formData = new FormData();
        formData.append('profilePic', e.target.files[0]);
        try {
            setUploading(true);
            const res = await fetch(`${process.env.SERVER_URL}/api/v1/user/update-avatar`, {
                method: 'POST',
                credentials: "include",
                body: formData,
            });
            const result = await res.json();
            if (result.success) {
                setRevalidateData(true)
                toast({ title: result.message });
            } else {
                toast({ title: result.message, variant: "destructive" });
            }
        } catch (error: any) {
            toast({ title: error.message, variant: "destructive" })
        } finally {
            setUploading(false)
            setTimeout(() => {
                setRevalidateData(false)
            }, 10000)
        }
    }
    const handleLogout = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${process.env.SERVER_URL}/api/v1/auth/logout`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const dataRes = await res.json();
            if (dataRes.success) {
                console.log(dataRes);
                dispatch(logout());
                localStorage.removeItem("accessToken")
                toast({ title: dataRes.message })
            } else {
                toast({ variant: "destructive", title: dataRes.message })
            }
        } catch (error: any) {
            toast({ variant: "destructive", title: error.message });
        } finally {
            setLoading(false);
        }
    }

    return (
        <motion.div
            style={{ backgroundImage: `linear-gradient(to right,  hsla(${theme == "dark" ? "224, 71.4% ,4.1%, 100%" : "0, 0%, 100% ,100%"}) 0%, hsla(${theme == "dark" ? "224, 71.4% ,4.1%, 10%" : "0, 0%, 100%, 10%"}) 60%), url("${userData.profilePic}")`, backgroundRepeat: "no-repeat", backgroundSize: "300px 100%", objectFit: "contain", backgroundPosition: "right" }}
            className="w-4/5 h-[300px] p-6 mx-auto bg-card shadow-lg rounded-lg overflow-hidden"
        >
            <div className="relative flex items-center py-4">
                <div className="absolute right-0 top-0 ">
                    <div className={`${uploading ? "flex" : "hidden"} absolute transition-all items-center justify-center right-0 backdrop-blur-sm bg-gray-100/60 dark:bg-gray-900/40 rounded-full bottom-0 w-full h-full`}>
                        <Loader style={{ animationDuration: "3000ms" }} className='w-7 h-7 text-primary dark:text-white animate-spin' />
                    </div>
                    <div>
                        <TooltipProvider>
                            <Tooltip delayDuration={0}>
                                <TooltipTrigger asChild><label htmlFor='profilePic'>
                                    <EditIcon className="w-8 h-8 p-2 bg-card cursor-pointer transition-all duration-300 rounded-full hover:bg-gray-100/80 dark:hover:bg-gray-100/20" />
                                </label></TooltipTrigger>
                                <TooltipContent side="bottom">
                                    <p>Edit ProfilePic</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <Input
                            type="file"
                            name="profilePic"
                            id="profilePic"
                            onChange={(e: any) => handleProfilePicUpdate(e)}
                            className="hidden"
                        />
                    </div>
                </div>
                <div className="md:ml-4">
                    <h2 className="text-3xl font-semibold">{userData.firstName} {userData.lastName}</h2>
                    <span className='flex items-center gap-2'><FaUser/><p>@{userData.username}</p></span>
                    <span className='flex items-center gap-2'><FaEnvelope/><p>{userData.email}</p></span>
                    <span className='flex items-center gap-2'><FaPhone/> <p>{userData.phoneNumber || "Phone Number not added"}</p></span>
                    <span className='flex items-center gap-2'><FaCalendarDays/> <p>{userData.dob? new Date(userData.dob).toLocaleDateString() : "Dob not added"}</p></span>
                    <span className='flex items-center gap-2'><FaLocationDot/>{userData.location? <p>{userData.location.street}, {userData.location.city}, {userData.location.state}, {userData.location.country} ({userData.location.postalCode})</p> : "Address not added"}</span>
                </div>
            </div>
            <Button onClick={handleLogout}
                disabled={loading}
                type="submit"
                className="w-[130px] py-2 mt-4 md:ml-4 text-lg font-medium bg-primary rounded-md hover:bg-primary/90"
            >
                {loading ? <Loader_dots text="Logging Out" /> :
                    "Log out"}
            </Button>
            {revalidateData && <LoadUserData />}
        </motion.div>
    );
};

export default ProfileCard;
