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
                <p className='flex items-center gap-2'><FaLocationDot />{resumeDraft.address}</p>
                <p className='flex items-center gap-2'><FaEnvelope />{resumeDraft.email}</p>
                <p className='flex items-center gap-2'><FaPhone />{resumeDraft.phone}</p>
                {
                    resumeDraft.links?.map((link, index) => {
                        return (
                            <p key={index} className='flex items-center gap-2'><LinkIcon title={link.title} />{link.url}</p>
                        )
                    })
                }
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-semibold border-b-2 border-gray-700 pb-2 mb-4">Professional Overview</h2>
                <p className="mb-2">{resumeDraft.professionalOverview}</p>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-semibold border-b-2 border-gray-700 pb-2 mb-4">Education</h2>
                {qualifications.education.map((edu, index) => (
                    <div className="mb-2"
                        key={index}
                    >
                        <h3 className='text-lg font-medium'>{edu.levelOfEducation}</h3>
                        <p>{edu.boardOrUniversity}</p>
                    </div>
                ))}
            </div>

            <div>
                <h2 className="text-xl font-semibold border-b-2 border-gray-700 pb-2 mb-4">Experience</h2>
                {qualifications.experience.map((exp, index) => (
                    <p key={index} className="mb-2">{exp.jobTitle}</p>
                ))}
            </div>

            <div>
                <h2 className="text-xl font-semibold border-b-2 border-gray-700 pb-2 mb-4">Skills</h2>
                {/* {qualifications.skills.map((skill, index) => (
                    <p key={index} className="mb-2">{skill}</p>
                ))} */}
                <p className='mb-2'>{qualifications.skills.join(" • ")}</p>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-semibold border-b-2 border-gray-700 pb-2 mb-4">Personal Info</h2>
                <p className="mb-2">Gender: {resumeDraft.gender.substring(0, 1).toUpperCase() + resumeDraft.gender.substring(1)}</p>
                <p className="mb-2">Date Of Birth: {new Date(resumeDraft.dob).toLocaleDateString()}</p>
                <p className="mb-2">Languages known: {qualifications.languages.join(", ")}</p>
                <p className="mb-2">Nationality: {resumeDraft.nationality}</p>
            </div>
            <div className="mb-6">
                <h2 className="text-xl font-semibold border-b-2 border-gray-700 pb-2 mb-4">Declaration</h2>
                <p className="mb-2">{resumeDraft.declaration}</p>
            </div>
            <div className='absolute left-0 bottom-3'>
                <p className="font-medium">Signature:</p>
                <p className="font-semibold">{resumeDraft.name}</p>
                <p className="">{resumeDraft.displayDate}</p>
            </div>
        </div>
    )
}

export default Template_blank