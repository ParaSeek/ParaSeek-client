"use client";
import React, { useEffect } from 'react'

const page = () => {

    const url = window.location.href;
    const code = url.substring(36);
    console.log(url, code);
    useEffect(()=>{
        const handleDriveLink = async () => {
            try {
              const res = await fetch(`${process.env.SERVER_URL}/api/v1/job/drive-code${code}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
                credentials: "include"
                });
                const response = await res.json();
                console.log(response);
                
                
              } catch (error) {
                console.error('Error fetching data:', error);
              }
          }
          handleDriveLink();
    }, [code])
    
  return (
    <div>page</div>
  )
}

export default page