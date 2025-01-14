"use client";
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'motion/react'
import React from 'react'
import AddUpdateEducation from '@/components/account/addUpdateQualifications/AddUpdateEducation';
import AddUpdateExperience from '@/components/account/addUpdateQualifications/AddUpdateExperience';
import AddUpdateSkills from '@/components/account/addUpdateQualifications/AddUpdateSkills';
import AddUpdateCertifications from '@/components/account/addUpdateQualifications/AddUpdateCertifications';
import AddUpdateLanguages from '@/components/account/addUpdateQualifications/AddUpdateLanguages';
import AddUpdateProject from '@/components/account/addUpdateQualifications/addUpdateProject';


const Page = () => {
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
          <h2 className="sm:text-lg md:text-2xl text-center font-semibold ">Qualifications</h2>
        </div>
      </div>
      <AddUpdateEducation />
      <AddUpdateExperience />
      <AddUpdateSkills />
      <AddUpdateProject />
      <AddUpdateCertifications />
      <AddUpdateLanguages />
    </motion.div>
  )
}

export default Page