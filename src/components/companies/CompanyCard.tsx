"use client";
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { FaSuitcase } from 'react-icons/fa6'
import { Plus } from 'lucide-react'
import { useToast } from '@/hooks/use-toast';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import CompanyDetailsPopup from './companyDetailsPopup';
import { motion } from "motion/react";
import { sendNotification } from '@/app/firebase.config';
const CompanyCard = (props: any) => {

  const [companyDetailsOpen, setCompanyDetailsOpen] = useState(false);
  const { toast } = useToast();
  const user = useSelector((state: RootState) => state.user.data);
  const [userId, setUserId] = useState("");
  const [following, setFollowing] = useState(false);
  const [numberOfFollowers, setNumberOFFollowers] = useState(props.followers.length);

  useEffect(() => {
    if (user) {
      setUserId(user._id)
    }
  }, [user])

  useEffect(() => {
    if (userId) {
      setFollowing(props.followers.filter((follower: string) => {
        return follower === userId
      }).length == 1 ? true : false);
    }
  }, [userId])


  const handleFollow = async () => {
    try {
      const res = await fetch(`${process.env.SERVER_URL}/api/v1/company/follow`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ companyId: props.id })
      });
      const dataRes = await res.json();
      if (dataRes.success) {
        toast({ title: `${following ? "Unfollowed" : "Following"} ${props.companyName}!` })
        if (following) {
          setNumberOFFollowers((prev: number) => prev - 1)
        } else {
          setNumberOFFollowers((prev: number) => prev + 1)
          sendNotification(props.companyOwner, "New Follower", `${user.firstName} ${user.lastName} followed ${props.companyName}`)
        }
        setFollowing(!following);
      } else {
        toast({ title: dataRes.message, description: "Please log in first" });
      }
    } catch (error: any) {
      toast({ variant: "destructive", title: error.message, description: "Internal Server Error" });
    }
  }

  return (
    <motion.div className='bg-card w-full h-full p-4 rounded-lg gap-3 flex flex-col shadow-[0px_0px_10px] shadow-black/20 dark:border dark:border-muted'>
      <div className='flex md:items-center justify-between gap-2 md:gap-0 flex-col md:flex-row'>
        <div className='flex items-center md:justify-center gap-3'>
          <div className='w-12 h-12 flex items-center justify-center'>
            {
              props.companyLogo && props.companyLogo.includes("https://") ?
                <img width="48px" height="48px" className='rounded-sm' src={props.companyLogo} alt={props.companyName.charAt(0)} />
                :
                <p className='w-12 h-12 bg-primary text-white rounded-sm grid place-items-center text-3xl font-semibold'>
                  {props.companyName.charAt(0)}
                </p>
            }
          </div>
          <span className='h-[48px] w-[2px] rounded-full bg-muted '></span>
          <div>
            <h1 className='text-lg font-semibold'>{props.companyName}</h1>
            <p>{props.headquarters}</p>
          </div>
        </div>
        <div className='flex items-center gap-3'>
          <Link target='blank' className='border-2 border-primary rounded-full py-1 px-3 hover:bg-muted' href={props.website}>Visit Website</Link>
          <Button onClick={handleFollow} className='rounded-full'>{following ? "Unfollow" : <span className='flex items-center'><Plus />Follow</span>}</Button>
        </div>
      </div>

      <div className='flex gap-3'>
        <span className='border-2 border-muted rounded-full py-1 px-3'>{numberOfFollowers} followers</span>
        <span className='flex items-center justify-center gap-1'><FaSuitcase />{props.jobs.length} Jobs</span>
      </div>

      <div>
        <p>{props.description.length < 200 ? props.description : props.description.substring(0, 200) + '...'}</p>
      </div>
      <div>
        <button onClick={() => setCompanyDetailsOpen(true)} className='text-primary font-semibold hover:underline'>See more...</button>
      </div>

      <CompanyDetailsPopup
        company={props}
        companyDetailsOpen={companyDetailsOpen}
        setCompanyDetailsOpen={setCompanyDetailsOpen}
      />
    </motion.div>
  )
}

export default CompanyCard