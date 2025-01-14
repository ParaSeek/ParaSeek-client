import { ResumeDraft } from '@/store/interfaces'
import { RootState } from '@/store/store'
import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import LinkIcon from './LinkIcon'
import { FaEnvelope, FaLocationDot, FaPhone } from 'react-icons/fa6'

const Template_blank = ({ resumeDraft }: { resumeDraft: ResumeDraft }) => {

    const qualifications = useSelector((state: RootState) => state.qualification)

    return (
        <div className='relative h-full'>
            <h1 className="text-3xl font-bold mb-4">{resumeDraft.name || 'Your Name'}</h1>
            <div className="text-gray-600 mb-6">
                <div className='flex items-center gap-2'><p>{resumeDraft.address}</p></div>
                <div className='flex items-center gap-2'><p>{resumeDraft.email}</p></div>
                <div className='flex items-center gap-2'><p>{resumeDraft.phone}</p></div>
                {
                    resumeDraft.links?.map((link, index) => {
                        return (
                            <div key={index} className='flex items-center gap-2'><p>{link.url}</p></div>
                        )
                    })
                }
            </div>

            <div className="mb-4">
                <h2 className="text-xl font-semibold border-b-2 border-gray-700 pb-2 mb-4">Professional Overview</h2>
                <p className="mb-2 text-black">{resumeDraft.professionalOverview}</p>
            </div>

            <div className="mb-4">
                <h2 className="text-xl font-semibold border-b-2 border-gray-700 pb-2 mb-4">Education</h2>
                {qualifications.education.map((edu, index) => (
                    <div className="mb-2 text-black"
                        key={index}
                    >
                        <span className='flex justify-between'><h3 className='text-lg font-medium'>{edu.levelOfEducation} - <span className='font-normal text-base'>{edu.boardOrUniversity}</span></h3><p>({edu.from} - {edu.to})</p></span>
                    </div>
                ))}
            </div>

            {qualifications.experience.length > 0 && <div className='mb-4'>
                <h2 className="text-xl font-semibold border-b-2 border-gray-700 pb-2 mb-4">Experience</h2>
                {qualifications.experience.map((exp, index) => (
                    <div className='flex flex-col mt-2 text-black' key={index}>
                        <span className='flex items-center justify-between'><p>{exp.jobTitle} - {exp.companyName}</p><p>{exp.from} - {exp.to}</p></span>
                        <p>{exp.description}</p>
                        {exp.certificate.includes("https://") && <p>Certificate: {exp.certificate}</p>}
                    </div>
                ))}
            </div>}

            {qualifications.projects.length > 0 && <div className='mb-4'>
                <h2 className="text-xl font-semibold border-b-2 border-gray-700 pb-2 mb-4">Projects</h2>
                {qualifications.projects.map((project, index) => (
                    <div className='flex flex-col mt-2 text-black' key={index}>
                        <h4 className='w-full text-lg font-medium'>{project.title}</h4>
                        <p>{project.link}</p>
                        <p>Overview: {project.overview}</p>
                        <p>Role: {project.role}</p>
                    </div>
                ))}
            </div>}

            <div className='mb-4'>
                <h2 className="text-xl font-semibold border-b-2 border-gray-700 pb-2 mb-4">Skills</h2>
                {/* {qualifications.skills.map((skill, index) => (
                    <p key={index} className="mb-2">{skill}</p>
                ))} */}
                <p className='mb-2 text-black'>{qualifications.skills.join(" • ")}</p>
            </div>

            <div className="mb-4">
                <h2 className="text-xl font-semibold border-b-2 border-gray-700 pb-2 mb-4">Personal Info</h2>
                <p className="mb-2 text-black">Gender: {resumeDraft.gender.substring(0, 1).toUpperCase() + resumeDraft.gender.substring(1)}</p>
                <p className="mb-2 text-black">Date Of Birth: {new Date(resumeDraft.dob).toLocaleDateString()}</p>
                <p className="mb-2 text-black">Languages known: {qualifications.languages.join(", ")}</p>
                <p className="mb-2 text-black">Nationality: {resumeDraft.nationality}</p>
            </div>
            <div className="mb-4">
                <h2 className="text-xl font-semibold border-b-2 border-gray-700 pb-2 mb-4">Declaration</h2>
                <p className="mb-2 text-black">{resumeDraft.declaration}</p>
            </div>
            <div className='absolute left-0 bottom-3'>
                <p className="font-medium text-black">Signature:</p>
                <p className="font-semibold">{resumeDraft.name}</p>
                <p className="text-gray-600">{resumeDraft.displayDate}</p>
            </div>
        </div>
    )
}

export default Template_blank