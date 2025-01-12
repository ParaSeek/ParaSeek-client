import React from 'react'
import { ResumeDraft } from '@/store/interfaces'
const Template_blank = ({ resumeDraft }: { resumeDraft: ResumeDraft }) => {
  return (
    <div className="md:w-1/2 w-full p-8 bg-background overflow-scroll">
      <div className="bg-white p-8 rounded-xl text-black aspect-[3/4] w-[620px] h-[877px]" id='resume-preview'>
        <h1 className="text-3xl font-bold mb-4">{resumeDraft.profile.name || 'Your Name'}</h1>
        <div className="text-gray-600 mb-6">
          <p>{resumeDraft.profile.address}</p>
          <p>{resumeDraft.profile.email}</p>
          <p>{resumeDraft.profile.phone}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold border-b-2 border-gray-700 pb-2 mb-4">Professional Overview</h2>
          <p className="mb-2">{resumeDraft.professionalOverview}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold border-b-2 border-gray-700 pb-2 mb-4">Education</h2>
          {resumeDraft.qualifications.education.map((edu, index) => (
            <p key={index} className="mb-2">{edu.fieldOfStudy}</p>
          ))}
        </div>

        <div>
          <h2 className="text-xl font-semibold border-b-2 border-gray-700 pb-2 mb-4">Experience</h2>
          {resumeDraft.qualifications.experience.map((exp, index) => (
            <p key={index} className="mb-2">{exp.jobTitle}</p>
          ))}
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold border-b-2 border-gray-700 pb-2 mb-4">Declaration</h2>
          <p className="mb-2">{resumeDraft.declaration}</p>
        </div>
      </div>
    </div>
  )
}

export default Template_blank