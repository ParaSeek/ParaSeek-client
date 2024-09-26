"use client";
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

const Page = () => {
  const userData = useSelector((state: RootState) => state.user.data)
  if (!userData) {
    return <section className='justify-center'>
      <h1>You are not logged in</h1>
    </section>
  }
  console.log(userData);

  return (
    <section>
      Welcome, {userData.username}!
    </section>
  )
}

export default Page
