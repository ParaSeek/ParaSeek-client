import React, { useEffect, useRef, useState } from 'react'
import { ResumeDraft } from '@/store/interfaces'
const Template_blank = ({ resumeDraft }: { resumeDraft: ResumeDraft }) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [isDown, setIsDown] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const [cursorState, setCursorState] = useState('grab');

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    if (!scrollContainer) return;

    const handleMouseDown = (e: MouseEvent) => {
      setIsDown(true);
      setCursorState("grabbing")
      setStartX(e.pageX - scrollContainer.offsetLeft);
      setScrollLeft(scrollContainer.scrollLeft);
    };

    const handleMouseLeave = () => {
      setIsDown(false);
      setCursorState("grab")
    };

    const handleMouseUp = () => {
      setIsDown(false);
      setCursorState("grab")
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - scrollContainer.offsetLeft;
      const walk = (x - startX) * 3; // Adjust the scroll speed as needed
      scrollContainer.scrollLeft = scrollLeft - walk;
    };

    scrollContainer.addEventListener('mousedown', handleMouseDown);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);
    scrollContainer.addEventListener('mouseup', handleMouseUp);
    scrollContainer.addEventListener('mousemove', handleMouseMove);

    return () => {
      scrollContainer.removeEventListener('mousedown', handleMouseDown);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
      scrollContainer.removeEventListener('mouseup', handleMouseUp);
      scrollContainer.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDown, startX, scrollLeft]);


  return (
    <div ref={scrollContainerRef} className="md:w-1/2 w-full p-8 select-none bg-background overflow-scroll">
      <div className={`bg-white cursor-${cursorState} p-8 rounded-xl text-black aspect-[3/4] w-[930px] h-[1315px]`} id='resume-preview'>
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
          <h2 className="text-xl font-semibold border-b-2 border-gray-700 pb-2 mb-4">Personal Info</h2>
          <p className="mb-2">Gender: {resumeDraft.profile.gender.substring(0, 1).toUpperCase() + resumeDraft.profile.gender.substring(1)}</p>
          <p className="mb-2">Date Of Birth: {resumeDraft.profile.dob}</p>
          <p className="mb-2">Languages known: {resumeDraft.qualifications.languages.join(", ")}</p>
          <p className="mb-2">Nationality: {resumeDraft.profile.nationality}</p>
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

