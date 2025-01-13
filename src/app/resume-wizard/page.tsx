"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Download, Plus, Save, TrashIcon } from 'lucide-react';
import { FaCalendar, FaCalendarDays, FaEnvelope, FaGithub, FaGraduationCap, FaLinkedin, FaLocationDot, FaPerson, FaPhone, FaUser } from 'react-icons/fa6';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas'
import { ResumeTemplate, ResumeDraft } from '@/store/interfaces';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AddUpdateEducation from '@/components/account/addUpdateQualifications/AddUpdateEducation';
import AddUpdateExperience from '@/components/account/addUpdateQualifications/AddUpdateExperience';
import AddUpdateSkills from '@/components/account/addUpdateQualifications/AddUpdateSkills';
import AddUpdateLanguages from '@/components/account/addUpdateQualifications/AddUpdateLanguages';
import Template from '@/components/resume-templates/Template';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import LinkIcon from '@/components/resume-templates/LinkIcon';

export default function ResumeWizard() {
  const { toast } = useToast();
  const [showTemplates, setShowTemplates] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<null | ResumeTemplate>(null);
  const [showTemplateEditor, setShowTemplateEditor] = useState(false);

  const userData = useSelector((state: RootState) => state.user.data);
  const [resumeDraft, setResumeDraft] = useState<ResumeDraft>({
    name: "Your Name",
    email: "example@paraseek.com",
    phone: "xxxxxx7890",
    address: "Your Adddress",
    links: [],
    gender: "Male",
    dob: "1/1/1990",
    nationality: "Indian",
    professionalOverview: "",
    declaration: "I hereby declare that the information provided is true.",
    hobbies: [],
    displayDate: String(new Date().toLocaleDateString),
  });

  const handleSocialLinkUpdate = (index: number, field: string, value: string) => {
    const temp = { ...resumeDraft };
    if (temp.links)
      temp.links[index] = { ...temp.links[index], [field]: value };
    setResumeDraft(temp);
  }

  const handleSocialLinkDelete = (index: number) => {
    const temp = { ...resumeDraft };
    if (temp.links)
      temp.links = temp.links.filter((_, i) => i !== index);
    setResumeDraft(temp);
  };

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

  const saveResumeDraft = async () => {
    try {
      const response = await fetch(`${process.env.SERVER_URL}/api/v1/draft/save-resume-draft`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resumeDraft),
      });
      const res = await response.json();
      if (res.success) {
        toast({ title: res.message });
      } else {
        toast({ title: res.message, variant: "destructive" });
      }
    } catch (error) {
      console.error(error);
    }
  }

  const fetchResumeDraft = async () => {
    try {

      const response = await fetch(`${process.env.SERVER_URL}/api/v1/draft/get-resume-draft?email=${userData.email}`, {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      if (data.success) {
        setResumeDraft(data.data);
      } else {
        setResumeDraft({
          ...resumeDraft,
          name: userData.firstName + userData.lastName,
          email: userData.email,
          phone: userData.phoneNumber,
          address: userData.location?.city + ", " + userData.location?.state + "(" + userData.location?.postalCode + ")",
          gender: userData.gender,
          dob: userData.dob,
        })
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (userData) {
      fetchResumeDraft();
    }
  }, [userData])

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
                value={resumeDraft.name}
                onChange={(e) => setResumeDraft({ ...resumeDraft, name: e.target.value })}
                placeholder="Full Name"
                className="w-full"
              />
            </div>

            <div className="flex items-center space-x-3">
              <FaEnvelope />
              <Input
                type="email"
                value={resumeDraft.email}
                onChange={(e) => setResumeDraft({ ...resumeDraft, email: e.target.value })}
                placeholder="Email"
                className="w-full"
              />
            </div>

            <div className="flex items-center space-x-3">
              <FaPhone />
              <Input
                type="tel"
                value={resumeDraft.phone}
                onChange={(e) => setResumeDraft({ ...resumeDraft, phone: e.target.value })}
                placeholder="Phone Number"
                className="w-full"
              />
            </div>
            <div className="flex items-center space-x-3">
              <FaLocationDot />
              <Input
                type="text"
                value={resumeDraft.address}
                onChange={(e) => setResumeDraft({ ...resumeDraft, address: e.target.value })}
                placeholder="Address"
                className="w-full"
              />
            </div>
            <div className="flex items-center space-x-3">
              <FaCalendarDays />
              <Input
                type="text"
                value={resumeDraft.displayDate}
                onChange={(e) => setResumeDraft({ ...resumeDraft, displayDate: e.target.value })}
                placeholder="Display Date (to be shown with signature)"
                className="w-full"
              />
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-6 border rounded-lg py-4 px-6 border-border">
            <div className='flex items-center justify-between'>
              <h2 className="text-xl font-semibold">Social Links</h2>
              <Plus role='button' onClick={() => setResumeDraft({ ...resumeDraft, links: [...(resumeDraft.links || []), { title: '', url: '' }] })} />
            </div>
            {
              resumeDraft.links?.map((link, index) => {
                return (
                  <div key={index} className='flex items-center gap-2 mt-2 mb-4'>
                    <LinkIcon title={link.title} />
                    <Input
                      type="text"
                      placeholder="Link title eg. github"
                      value={link.title}
                      onChange={(e) => handleSocialLinkUpdate(index, 'title', e.target.value)}
                      className='w-5/12'
                    />
                    <Input
                      type="text"
                      placeholder="link"
                      value={link.url}
                      onChange={(e) => handleSocialLinkUpdate(index, 'url', e.target.value)}
                      className='w-6/12'
                    />
                    <TrashIcon className='w-5 h-5 text-red-500 cursor-pointer' onClick={() => handleSocialLinkDelete(index)} />
                  </div>
                )
              })
            }
          </div>

          {/* Professional Overview */}
          <div className="mt-6 border rounded-lg py-4 px-6 border-border">
            <h2 className="text-xl font-semibold mb-2">Professional Overview</h2>
            <div className="flex justify-between items-center mb-4">
              <textarea
                value={resumeDraft.professionalOverview}
                onChange={(e) => setResumeDraft({ ...resumeDraft, professionalOverview: e.target.value })}
                placeholder='Write something about yourself'
                className=' w-full bg-transparent outline-none'
              />
            </div>
          </div>

          <AddUpdateEducation />
          <AddUpdateExperience />
          <AddUpdateSkills />
          <AddUpdateLanguages />

          {/* Personal Info */}
          <div className="mt-6 border rounded-lg py-4 px-6 border-border">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl flex items-center font-semibold">
                <FaPerson className="mr-2" /> Personal Info
              </h2>
            </div>
            <div
              className='flex flex-col '
            >
              <div className='grid grid-cols-2 gap-3'>
                <Label className='flex flex-col gap-1'>
                  Gender
                  <Select
                    value={resumeDraft.gender}
                    onValueChange={(value) => setResumeDraft({ ...resumeDraft, gender: value })}
                  >
                    <SelectTrigger className="w-full disabled:cursor-default">
                      <SelectValue placeholder="Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </Label>
                <Label className='flex flex-col gap-1'>
                  Date Of Birth
                  <Input
                    type="date"
                    value={resumeDraft.dob}
                    onChange={(e) => setResumeDraft({ ...resumeDraft, dob: e.target.value })}
                    className="w-full bg-card p-2 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                  />
                </Label>
                <Label className='flex flex-col gap-1'>
                  Nationality
                  <Input
                    type="text"
                    value={resumeDraft.nationality}
                    onChange={(e) => setResumeDraft({ ...resumeDraft, nationality: e.target.value })}
                    className="w-full bg-card  p-2 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                  />
                </Label>
              </div>
            </div>
          </div>
          {/* Declaration */}
          <div className="mt-6 border rounded-lg py-4 px-6 border-border">
            <h2 className="text-xl mb-2 font-semibold">Declaration</h2>
            <div className="flex justify-between items-center mb-4">
              <textarea
                value={resumeDraft.declaration}
                onChange={(e) => setResumeDraft({ ...resumeDraft, declaration: e.target.value })}
                className='outline-none bg-transparent w-full'
              />
            </div>
          </div>



          {/* Generate PDF Button */}
          <div className=" flex items-center text-center gap-2 mt-8">
            <Button
              onClick={saveResumeDraft}
              className="flex gap-1 items-center justify-center"
            >
              <Save /> Save Draft
            </Button>
            <Button
              onClick={generateResume}
              className="flex gap-1 items-center justify-center"
            >
              <Download /> Download
            </Button>
          </div>
        </div>

        <h1 className='font-semibold md:hidden text-2xl text-center mb-4 mt-8'>Preview</h1>

        {/* Preview Panel */}
        <Template resumeDraft={resumeDraft} selectedTemplate={selectedTemplate} />
      </div>
    )
  }
}

const templates = [
  { id: "blank", name: "Blank Template", image: "/resume-templates/" },
  { id: "001", name: "Template 2", image: "/resume-templates/" },
]