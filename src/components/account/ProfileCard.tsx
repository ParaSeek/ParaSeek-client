import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { logout } from '@/slices/userSlice';
import { Button } from "@/components/ui/button";
import Loader_dots from "@/components/Loader_dots";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


const ProfileCard =() => {
    const userData = useSelector((state: RootState) => state.user.data)
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const dispatch = useDispatch();
    const handleLogout = async () => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:8000/api/v1/auth/logout", {
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
                <Avatar className="w-16 h-16">
                    <AvatarImage src={userData.profilePic} />
                    <AvatarFallback className="bg-primary text-4xl font-extrabold text-white">{userData.username.substring(0, 1).toUpperCase()}</AvatarFallback>
                </Avatar>
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
        </motion.div>
    );
};

export default ProfileCard;
