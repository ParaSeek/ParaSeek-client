import React, { useEffect, useRef, useState } from 'react'
import { ResumeDraft, ResumeTemplate } from '@/store/interfaces'
import Template_blank from './Template_blank';

const Template = ({ resumeDraft, selectedTemplate, color }: { resumeDraft: ResumeDraft, selectedTemplate: ResumeTemplate | null, color: string }) => {
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
    <div className='md:w-1/2 w-full '>
      <h1 className="text-3xl font-bold mt-8 mb-6 text-center">Preview</h1>
      <div ref={scrollContainerRef} className="h-fit select-none overflow-x-scroll">
        <div className={`
           ${color == 'Black' && "text-black" || color == 'Gray' && "text-gray-500" || color == 'Red' && "text-red-500" || color == 'Pink' && "text-pink-500" || color == 'Orange' && 'text-orange-500' || color == 'Yellow' && 'text-yellow-500' || color == 'Green' && 'text-green-500' || color == 'Teal' && "text-teal-500" || color == 'Cyan' && 'text-cyan-500' || color == 'Blue' && "text-blue-500" || color == 'Indigo' && "text-indigo-500" || color == 'Violet' && "text-violet-500"}
          bg-white border border-border2 ${cursorState === "grab" ? "cursor-grab" : "cursor-grabbing"} p-8 text-black aspect-[3/4] w-[930px] h-[1315px]`} id='resume-preview'>
          {selectedTemplate?.id === "blank" && <Template_blank resumeDraft={resumeDraft} />}
        </div>
      </div>
    </div>
  )
}

export default Template

