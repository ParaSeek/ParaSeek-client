"use client";
import CompanyCard from '@/components/companies/CompanyCard';
import Loader_dots from '@/components/Loader_dots';
import { RootState } from '@/store/store';
import React from 'react'
import { useSelector } from 'react-redux';

const page = () => {
  const companies = useSelector((state: RootState) => state.companies)

  return (
    <section className='bg-background/70 px-[5%] py-16 '>
      {companies[0].companyName == "" && <Loader_dots text='Loading Companies' />}
      <div className='grid w-full grid-cols-1 place-items-center xl:grid-cols-2 gap-3'>
      {companies[0].companyName != "" && companies.map((company, index) => {
        return <CompanyCard key={index} id={company._id} companyLogo={company.companyLogo} companyName={company.companyName} headquarters={company.Headquarters} followers={company.followers} jobs={company.jobs} description={company.description} website = {company.websiteLink} />
      })}
      </div>
    </section>
  )
}

export default page