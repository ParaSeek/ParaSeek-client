import { Button } from '@/components/ui/button'
import React from 'react'

const Page = () => {
  return (
    <section className='bg-background/70 p-6'>
      <div className='bg-primary w-full p-6 h-[140px] rounded-lg grid place-items-center'>
        <div className='flex flex-col items-center justify-center'>
          <h1 className='font-semibold text-3xl text-white text-center'>Impactful Resume Maker</h1>
          <div className='w-full h-[2px] rounded bg-white/70 my-1'></div>
          <p className='text-white text-center'>Speed up your job seeking with our resume builder</p>
        </div>
      </div>
      <div className='flex w-full flex-col md:flex-row'>
        <div className='w-full flex flex-col items-center gap-3 p-6'>
          <h2 className="text-xl font-semibold">Our top Resume Templates</h2>
          <div className='flex items-center justify-center gap-4 w-full flex-wrap'>
            <div style={{ background: "url(https://s3-alpha-sig.figma.com/img/61ae/8682/e4a9e3b0861c2aa9791e6d17d1f95a1c?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FtiX2N4ZZW8JLUKzzvPqu4VRqu7Z~l0SlB4m9kvEAGmYp4sHArZlyvBPPyjuiv0QukOsDOo4IXbKtGx2ujFKvf-b8WUBtJlWq4FNoTQRhxCvsx9ocQLqExecOZuqDHxaWQfp0CBgy1aCsOv6u3oPwHP-6IgEePki6cOn-~5UQ6OAwdGT3kATxnYjNaxQ89uNDK~V0reRNckT44RtoWPDfhrDa54kkwCRh14noIZq1yoX~up5vl4iNDx-jMJ8M4UVqRHM60wwFm6UI6OkMKNDbdw741CaWC4h8ymhVvpbzzO-pVCD3erZ0sytuWIZtJO-IzYeGZFh8LrAJ2AMRZjd-A__)", backgroundPosition: "center", backgroundSize: "contain" }} className='h-[400px] w-[300px] relative border dark:border-white border-black rounded-lg'>
              <Button className='absolute top-[50%] left[50%] translate-y-[-50%] translate-x-[50%] z-10'>Use this template</Button>
            </div>
            <div style={{ background: "url(https://s3-alpha-sig.figma.com/img/5d65/e7bd/31060d0a63be0c7284d7028902f8e586?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WI1m17ciDGEQ~TBKSv6jIe19ommnuMW0wSniqY6zvQFyrJgGuhLA47ukbHfiF1ifliyBQ-SzOwjeFros7ju4DCv917f~5u4o~n5PJumsfb~R~CV1zIDhUZgO4G~LHM9XtZAMZrLa7GyReK0t5NsDpUpf7p5Gow5BsIFsN9X3XhV6JkzqkJKSkD7emDs9eqATdz-klK5WK05DiwmE5nwdgKVXt7jiwsv0BdQVKcEcMYgfQZuG~AZO24dyjE3iUF0PmNGFQ5q9w5sxcp6Wet-SIjhN85bK-But~nAaWdiaMRVP4pY5Dwp-YlmWzuIFBF0KBXiCZTipzFqmmzilnEm3NA__)", backgroundPosition: "center", backgroundSize: "contain" }} className='h-[400px] w-[300px] relative border border-black dark:border-white rounded-lg'>
              <Button className='absolute top-[50%] left[50%] translate-y-[-50%] translate-x-[50%] z-10'>Use this template</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Page