"use client";
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ResumeWizard() {
 
  const generateResume = () => {
    
  };

  return (
      <motion.div 
        className="w-11/12 max-w-2xl p-8 mx-auto bg-card rounded-md shadow-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-center mb-6">Welcome to Resume Wizard</h1>
          <b className='text-center'>Craft Your Professional Story</b>
        <p className="text-justify text-secondary-foreground/80 mb-4">
          Welcome to <b>Resume Wizard</b>, where your career journey is meticulously transformed into a striking resume. Our seamless platform inputs your details and effortlessly crafts a resume that stands out. Whether you're a seasoned professional or a fresh graduate, our service tailors to your unique experiences and qualifications. Experience the ease of a user-friendly interface, powered by cutting-edge technology, to create resumes that captivate and impress. Elevate your job search with resumes designed to highlight your skills and achievements, crafted to perfection with Resume Wizard.
        </p>
        <p className="text-justify text-secondary-foreground/80 mb-4">
          <b>Note: </b>Make sure to add complete profile information and all your qualifications, certifications, experiences, etc. to generate a better resume that stands out.
        </p>
        <div className="mt-6 flex justify-center">
          <motion.button 
            onClick={generateResume}
            className="w-full text-white max-w-xs py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium bg-primary hover:bg-primary/70 focus:outline-none"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Generate My Resume
          </motion.button>
        </div>
        <div className="mt-6 text-center">
          <Link href="/account/profile">
            <p className="text-primary hover:underline">Edit Profile Information</p>
          </Link>
          <Link href="/account/qualifications">
            <p className="text-primary hover:underline">Edit Qualifications</p>
          </Link>
        </div>
      </motion.div>
  );
}
