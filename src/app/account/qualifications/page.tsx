"use client";
import { RootState } from '@/store/store';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

interface Qualifications {
  education: [
    {
      levelOfEducation: string,
      fieldOfStudy: string,
    },
  ],
  skills: [string],
  certifications: [
    {
      certificationName: string,
      link: string,
    },
  ],
  languages: [string],
  experience: [
    {
      jobTitle: string,
      companyName: string,
      certificate: string,
    },
  ],
}
const page = () => {
  const userData = useSelector((state: RootState) => state.user.data)
  const [qualifications, setQualifications] = useState<Qualifications>();
  const data = "";
    const updateQualificationsData = async ()=>{
      try{
        const res = await fetch(`${process.env.SERVER_URL}/api/v1/qualification/create-qualification`, {
          method: 'POST',
          credentials:"include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),  
        })
        const dataRes = await res.json();
        if(dataRes.success){
          console.log(dataRes.message);
        } else {
          console.log(dataRes.message)
        }
      } catch(error){
        console.log(error);
      }
    }

  return (
    <div>page</div>
  )
}

export default page