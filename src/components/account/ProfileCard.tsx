import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { logout } from '@/slices/userSlice';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loader_dots from "@/components/Loader_dots";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { EditIcon } from "lucide-react"
import { Loader } from "lucide-react"
import LoadUserData from '../LoadUserData';


const ProfileCard = () => {
    const userData = useSelector((state: RootState) => state.user.data)
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const { toast } = useToast();
    const dispatch = useDispatch();
    const [revalidateData, setRevalidateData] = useState(false);

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
            setTimeout(()=>{
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
            className="w-4/5 p-6 mx-auto bg-card shadow-lg rounded-lg overflow-hidden"
            whileHover={{ scale: 1.01 }}
        >
            <div className="flex items-center flex-col md:flex-row py-4">
                <div className="relative p-1">
                    <Avatar className="w-16 h-16 cursor-pointer">
                        <AvatarImage className='object-contain' src={userData.profilePic} />
                        <AvatarFallback className="bg-primary text-4xl font-extrabold text-white">{userData.username.substring(0, 1).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className={`${uploading? "flex": "hidden"} absolute transition-all items-center justify-center right-0 backdrop-blur-sm bg-gray-100/60 dark:bg-gray-900/40 rounded-full bottom-0 w-full h-full`}>
                        <Loader style={{animationDuration: "3000ms"}} className='w-7 h-7 text-primary dark:text-white animate-spin'/>
                    </div>
                    <div className="absolute right-0 bottom-0 ">
                        <label htmlFor='profilePic'>
                            <EditIcon className="w-8 h-8 p-2 bg-card cursor-pointer transition-all duration-300 rounded-full hover:bg-gray-100/80 dark:hover:bg-gray-100/20" />
                        </label>
                        <Input
                            type="file"
                            name="profilePic"
                            id="profilePic"
                            onChange={(e: any) => handleProfilePicUpdate(e)}
                            className="hidden"
                        />
                    </div>
                </div>
                <div className="ml-4">
                    <h2 className="text-xl font-semibold">{userData.firstName} {userData.lastName}</h2>
                    <p>@{userData.username}</p>
                    <p>{userData.email}</p>
                </div>
            </div>
            <Button onClick={handleLogout}
                disabled={loading}
                type="submit"
                className="w-[130px] py-2 mt-4 mx-auto text-lg font-medium bg-primary rounded-md hover:bg-primary/90"
            >
                {loading ? <Loader_dots text="Logging Out" /> :
                    "Log out"}
            </Button>
            {revalidateData && <LoadUserData/>}
        </motion.div>
    );
};

export default ProfileCard;
