"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Download, Plus, Trash } from 'lucide-react';
import { FaBriefcase, FaEnvelope, FaGraduationCap, FaPhone, FaUser } from 'react-icons/fa6';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas'
import { ResumeTemplate, ResumeDraft, resumeProfile } from '@/store/interfaces';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Template_blank from '@/components/resume-templates/Template_blank';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ResumeWizard() {

  const [showTemplates, setShowTemplates] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<null | ResumeTemplate>(null);
  const [showTemplateEditor, setShowTemplateEditor] = useState(false);

  const userData = useSelector((state: RootState) => state.user.data);

  //resume-generation
  const [profile, setProfile] = useState<resumeProfile>({
    name: "Your Name",
    email: "example@email.com",
    phone: "xxxxxx7890",
    linkedin: "",
    github: "",
    address: "Your Address",
    gender: "Male/Female",
    dob: "xx-xx-xxxx",
    nationality: "Indian",
  })
  const qualifications = useSelector((state: RootState) => state.qualification);
  const [resumeDraft, setResumeDraft] = useState<ResumeDraft>({
    profile: profile,
    professionalOverview: "",
    qualifications,
    declaration: "I hereby declare that the above information is true and best of my knowledge and belief.",
    hobbies: [],
    displayDate: String(new Date().toLocaleDateString),
  });

  useEffect(() => {
    setProfile({
      name: userData?.firstName + userData?.lastName,
      email: userData?.email as string,
      phone: userData?.phoneNumber as string,
      linkedin: "https://linkedin.com/xxxxxx",
      github: "https://github.com/xxxxxx",
      address: userData?.location?.city + ", " + userData?.location?.state + "(" + userData?.location?.postalCode + ")",
      gender: userData?.gender,
      dob: new Date(userData?.dob).toLocaleDateString(),
      nationality: "Indian",
    })
  }, [userData])
  useEffect(() => {
    setResumeDraft({ ...resumeDraft, qualifications, profile })
  }, [profile, qualifications])

  console.log(profile);

  const generateResume = () => {
    const div = document.getElementById('resume-preview') as HTMLElement;
    html2canvas(div, { scale: 3 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const width = imgWidth * ratio;
      const height = imgHeight * ratio;

      pdf.addImage(imgData, 'PNG', 0, 0, width, height);
      pdf.save('resume.pdf');
    });
  };


  if (!showTemplateEditor) {
    return (
      <div className={`flex bg-background/70 min-h-screen overflow-x-hidden ${showTemplates ? "pt-16 mb-8" : "py-16"}`}>
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex w-full relative"
        >
          <motion.div
            className={` w-11/12 max-w-2xl p-8 absolute left-1/2 top-1/2 mx-auto bg-card rounded-md shadow-[0px_0px_10px] dark:border dark:border-muted shadow-black/20`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: '-50%', x: showTemplates ? "-200%" : '-50%' }}
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
            <div className="mt-6 flex justify-end">
              <motion.button
                onClick={() => setShowTemplates(true)}
                className=" max-w-xs py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium bg-primary hover:bg-primary/70 focus:outline-none"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight />
              </motion.button>
            </div>
            {/* <div className="mt-6 text-center">
              <Link href="/account/profile">
                <p className="text-primary hover:underline">Edit Profile Information</p>
              </Link>
              <Link href="/account/qualifications">
                <p className="text-primary hover:underline">Edit Qualifications</p>
              </Link>
            </div> */}
          </motion.div>
          <motion.div
            className={` w-11/12 max-w-4xl p-8 mx-auto bg-card absolute left-1/2 top-1/2 rounded-md shadow-[0px_0px_10px] dark:border dark:border-muted shadow-black/20`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: "-50%", x: showTemplates ? "-50%" : "200%" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-semibold text-center mt-4 mb-8">Select a Resume Template</h2>
            <div className='flex gap-4 items-center overflow-x-auto p-3 w-full'>
              {templates?.map((template, index) => (
                <div key={index} onClick={() => setSelectedTemplate(template.id == selectedTemplate?.id ? null : template)} style={{ background: `url(${template.image})`, backgroundPosition: "center", backgroundSize: "contain" }} className={`${template.id == selectedTemplate?.id ? "ring ring-primary border-0" : "border-2 dark:border-white border-black"} min-w-[300px] h-[400px] w-[300px] relative  rounded-lg`}>
                </div>
              ))
              }
            </div>
            <div className="mt-6 flex justify-between">
              <motion.button
                onClick={() => setShowTemplates(false)}
                className=" max-w-xs py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium bg-primary hover:bg-primary/70 focus:outline-none"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft />
              </motion.button>
              <motion.button
                onClick={() => setShowTemplateEditor(true)}
                className=" max-w-xs py-2 px-4 border disabled:bg-primary/50 disabled:hover:bg-primary/50 border-transparent rounded-md shadow-sm text-lg font-medium bg-primary hover:bg-primary/70 focus:outline-none"
                whileHover={{ scale: selectedTemplate ? 1.05 : 1 }}
                whileTap={{ scale: selectedTemplate ? 0.95 : 1 }}
                disabled={!selectedTemplate}
              >
                <ChevronRight />
              </motion.button>
            </div>
          </motion.div>
        </motion.main>
      </div >
    );
  } else {
    return (
      <div className="flex flex-col md:flex-row min-h-screen pt-20 pb-12 px-4 gap-2">
        {/* Input Panel */}
        <div className="md:w-1/2 w-full p-8 bg-card space-y-6 rounded-lg">
          <h1 className="text-3xl font-bold mb-6 text-center">Resume Wizard</h1>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <FaUser />
              <Input
                type="text"
                placeholder="Full Name"
                value={resumeDraft.profile.name}
                className="w-full"
              />
            </div>

            <div className="flex items-center space-x-3">
              <FaEnvelope />
              <Input
                type="email"
                placeholder="Email"
                value={resumeDraft.profile.email}
                className="w-full"
              />
            </div>

            <div className="flex items-center space-x-3">
              <FaPhone />
              <Input
                type="tel"
                placeholder="Phone Number"
                value={resumeDraft.profile.phone}
                className="w-full"
              />
            </div>
          </div>

          {/* Education Section */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl flex items-center">
                <FaGraduationCap className="mr-2" /> Education
              </h2>
              <Plus role='button' />
            </div>
            {resumeDraft.qualifications.education.map((edu, index) => (
              <div
                className='flex flex-col border-b border-b-border2 py-2'
                key={index}
              >
                <div className='flex justify-between mb-2 items-center'>
                  <h3 className='text-lg font-medium'>{edu.levelOfEducation}</h3>
                  <Trash role='button' className='w-5 h-5' />

                </div>
                <div className='grid grid-cols-2 gap-3'>
                  <Label className='flex flex-col gap-1'>
                    Field of Study
                    <Input
                      type="text"
                      value={edu.fieldOfStudy}
                      className="w-full bg-card  p-2 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                    />
                  </Label>
                  <Label className='flex flex-col gap-1'>
                    Level of Education
                    <Input
                      type="text"
                      value={edu.levelOfEducation}
                      className="w-full bg-card  p-2 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                    />
                  </Label>
                  <Label className='flex flex-col gap-1'>
                    From
                    <Input
                      type="text"
                      value={edu.fromYear}
                      className="w-full bg-card  p-2 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                    />
                  </Label>
                  <Label className='flex flex-col gap-1'>
                    To
                    <Input
                      type="text"
                      value={edu.toYear}
                      className="w-full bg-card  p-2 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                    />
                  </Label>
                </div>
              </div>
            ))}
          </div>

          {/* Experience Section */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl flex items-center">
                <FaBriefcase className="mr-2" /> Experience
              </h2>
              <button
                className="bg-blue-600  px-3 py-1 rounded-lg hover:bg-blue-700"
              >
                Add
              </button>
            </div>
            {resumeDraft.qualifications.experience.map((exp, index) => (
              <Input
                key={index}
                type="text"
                placeholder="Job Title, Company, Duration"
                value={exp.jobTitle}
                className="w-full bg-card  p-2 rounded-lg mb-2 focus:ring-2 focus:ring-primary outline-none"
              />
            ))}
          </div>

          {/* Generate PDF Button */}
          <div className="text-center mt-8">
            <button
              onClick={generateResume}
              className="bg-green-600  px-6 py-3 rounded-lg hover:bg-green-700 flex items-center justify-center mx-auto"
            >
              <Download className="mr-2" /> Download
            </button>
          </div>
        </div>

        {/* Preview Panel */}
        {selectedTemplate?.id === "blank" && <Template_blank resumeDraft={resumeDraft} />}
      </div>
    )
  }
}

const templates = [
  { id: "blank", name: "Blank Template", image: "/resume-templates/" },
  { id: "001", name: "Template 2", image: "/resume-templates/" },
]