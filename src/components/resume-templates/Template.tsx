import React, { useEffect, useRef, useState } from 'react'
import { ResumeDraft, ResumeTemplate } from '@/store/interfaces'
import Template_blank from './Template_blank';

const Template = ({ resumeDraft, selectedTemplate }: { resumeDraft: ResumeDraft, selectedTemplate: ResumeTemplate | null }) => {
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
    <div ref={scrollContainerRef} className="md:w-1/2 w-full bg-primary/10 rounded-t-lg rounded-b-2xl select-none overflow-x-scroll">
      <div className={`bg-white border border-border2 cursor-${cursorState} p-8 text-black aspect-[3/4] w-[930px] h-[1315px]`} id='resume-preview'>
        {selectedTemplate?.id === "blank" && <Template_blank resumeDraft={resumeDraft} />}
      </div>
    </div>
  )
}

export default Template

