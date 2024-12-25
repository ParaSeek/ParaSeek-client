"use client";
import { Button } from '@/components/ui/button';
import { RootState } from '@/store/store';
import { ArrowLeft, Pencil, Plus, Trash } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { addCertification, addEducation, addExperience, addLanguage, addSkill, deleteCertification, deleteEducation, deleteExperience, deleteLanguage, deleteSkill, editCertification, editEducation, editExperience, editLanguage, editSkill } from '@/slices/qualificationSlice';
import { PopoverClose } from '@radix-ui/react-popover';
import { useToast } from '@/hooks/use-toast';

interface Education {
  levelOfEducation: string;
  fieldOfStudy: string;
}

interface Experience {
  jobTitle: string,
  companyName: string,
  certificate: string,
}
interface Certifications {
  certificationName: string,
  link: string,
}

interface Qualifications {
  education: Education[],
  skills: string[],
  experience: Experience[],
  certifications: Certifications[],
  languages: string[]
}

const Page = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();

  //Redux states for qualifications
  const education = useSelector((state: RootState) => state.qualification.education)
  const skills = useSelector((state: RootState) => state.qualification.skills)
  const experience = useSelector((state: RootState) => state.qualification.experience)
  const certifications = useSelector((state: RootState) => state.qualification.certifications)
  const languages = useSelector((state: RootState) => state.qualification.languages)

  //Add, update education data
  const [edLevel, setEdlevel] = useState("")
  const [field, setField] = useState("")

  //Add, update experience data
  const [jTitle, setJTitle] = useState("")
  const [compName, setCompName] = useState("")
  const [certi, setCerti] = useState("")

  //Add, update certifications data
  const [certiName, setCertiName] = useState("")
  const [certiLink, setCertiLink] = useState("")

  //Add, update skills data
  const [sk, setSk] = useState("")

  //Add, update langauges data
  const [lang, setLang] = useState("")


  //Add, update and delete Education details
  const handleAddEducation = () => {
    if (edLevel.trim() != "" && field.trim() != "") {
      dispatch(addEducation({ levelOfEducation: edLevel, fieldOfStudy: field }))
      setEdlevel("")
      setField("")
    } else {
      toast({ title: "Fields should not be empty", variant: "destructive" })
    }
  }
  const handleUpdateEducation = (index: number) => {
    if (edLevel.trim() != "" && field.trim() != "") {
      dispatch(editEducation({ index: index, education: { levelOfEducation: edLevel, fieldOfStudy: field } }))
      setEdlevel("")
      setField("")
    } else {
      toast({ title: "Fields should not be empty", variant: "destructive" })
    }
  }
  const handleDeleteEducation = (index: number) => {
    dispatch(deleteEducation({ index }))
  }

  //Add, update, delete experience data
  const handleAddExperience = () => {
    if (jTitle.trim() != "" && compName.trim() != "" && certi.trim() != "") {
      dispatch(addExperience({ jobTitle: jTitle, companyName: compName, certificate: certi }))
      setJTitle("")
      setCompName("")
      setCerti("")
    } else {
      toast({ title: "Fields should not be empty", variant: "destructive" })
    }
  }
  const handleUpdateExperience = (index: number) => {
    if (jTitle.trim() != "" && compName.trim() != "" && certi.trim() != "") {
      dispatch(editExperience({ index, experience: { jobTitle: jTitle, companyName: compName, certificate: certi } }))
      setJTitle("")
      setCompName("")
      setCerti("")
    } else {
      toast({ title: "Fields should not be empty", variant: "destructive" })
    }
  }
  const handleDeleteExperience = (index: number) => {
    dispatch(deleteExperience({ index }))
  }

  //Add, update, delete cerifications data
  const handleAddCertification = () => {
    if (certiName.trim() != "" && certiLink.trim() != "") {
      dispatch(addCertification({ certificationName: certiName, link: certiLink }))
      setCertiName("")
      setCertiLink("")
    } else {
      toast({ title: "Fields should not be empty", variant: "destructive" })
    }
  }
  const handleUpdateCertification = (index: number) => {
    if (certiName.trim() != "" && certiLink.trim() != "") {
      dispatch(editCertification({ index, certification: { certificationName: certiName, link: certiLink } }))
      setCertiName("")
      setCertiLink("")
    } else {
      toast({ title: "Fields should not be empty", variant: "destructive" })
    }
  }
  const handleDeleteCertification = (index: number) => {
    dispatch(deleteCertification({ index }))
  }

  //Add, update, delete skills data
  const handleAddSkill = () => {
    if (sk.trim() != "") {
      dispatch(addSkill(sk))
      setSk("")
    } else {
      toast({ title: "Field should not be empty", variant: "destructive" })
    }
  }
  const handleUpdateSkill = (index: number) => {
    if (sk.trim() != "") {
      dispatch(editSkill({ index, skill: sk }))
      setSk("")
    } else {
      toast({ title: "Fields should not be empty", variant: "destructive" })
    }
  }
  const handleDeleteSkill = (index: number) => {
    dispatch(deleteSkill({ index }))
  }

  //Add, update, delete languages data
  const handleAddLanguage = () => {
    if (lang.trim() != "") {
      dispatch(addLanguage(lang))
      setLang("")
    } else {
      toast({ title: "Field should not be empty", variant: "destructive" })
    }
  }
  const handleUpdateLanguage = (index: number) => {
    if (lang.trim() != "") {
      dispatch(editLanguage({ index, language: lang }))
      setLang("")
    } else {
      toast({ title: "Fields should not be empty", variant: "destructive" })
    }
  }
  const handleDeleteLanguage = (index: number) => {
    dispatch(deleteLanguage({ index }))
  }




  return (
    <motion.div
      className="w-4/5 mx-auto bg-card shadow-lg rounded-lg p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >

      <div className='flex flex-col md:flex-row gap-1 justify-between mb-4'>
        <div className='flex items-center gap-2'>
          <Link href="/account" replace><Button variant="outline" size="icon">
            <ArrowLeft className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
          </Button></Link>
          <h2 className="sm:text-lg md:text-2xl text-center font-semibold ">Qualifications</h2>
        </div>
      </div>

      {/* Education */}
      <div
        className="w-full py-2 px-6 my-4 mx-auto border dark:border-gray-800 cursor-pointer hover:bg-accent rounded-lg overflow-hidden"
      >
        <div className="flex items-center justify-between font-semibold">
          <Popover>
            <span>{education.length > 0 ? "Education" : "Add Education"}</span>
            <span><PopoverTrigger><Plus className='hover:scale-125 transition-all duration-200' /></PopoverTrigger></span>
            <PopoverContent className='w-full'>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Education</h4>
                  <p className="text-sm text-muted-foreground">
                    Add Education Details
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="edLevel">Level Of Education</Label>
                    <Input
                      id="edLevel"
                      value={edLevel}
                      onChange={(e: any) => setEdlevel(e.target.value)}
                      className="col-span-2 h-8"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="field">Field Of Study</Label>
                    <Input
                      id="field"
                      value={field}
                      onChange={(e: any) => setField(e.target.value)}
                      className="col-span-2 h-8"
                    />
                  </div>
                </div>
                <PopoverClose>
                  <Button onClick={handleAddEducation}>
                    Add
                  </Button>
                </PopoverClose>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        {
          education.map((item: Education, index: number) => {
            return (
              <div className='flex items-center justify-between' key={index}>
                <Popover>
                  {item.levelOfEducation}, {item.fieldOfStudy}
                  <span className='flex items-center gap-3'>
                    <PopoverTrigger>
                      <Pencil className='w-4 hover:scale-125 transition-all duration-200' />
                    </PopoverTrigger>
                    <Trash onClick={() => handleDeleteEducation(index)} className='w-4 text-red-500 hover:scale-125 transition-all duration-200' />
                  </span>
                  <PopoverContent className='w-full'>
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">Education</h4>
                        <p className="text-sm text-muted-foreground">
                          Update Education Details
                        </p>
                      </div>
                      <div className="grid gap-2">
                        <div className="grid grid-cols-3 items-center gap-4">
                          <Label htmlFor="edLevel">Level Of Education</Label>
                          <Input
                            id="edLevel"
                            value={edLevel}
                            onChange={(e: any) => setEdlevel(e.target.value)}
                            className="col-span-2 h-8"
                          />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                          <Label htmlFor="field">Field Of Study</Label>
                          <Input
                            id="field"
                            value={field}
                            onChange={(e: any) => setField(e.target.value)}
                            className="col-span-2 h-8"
                          />
                        </div>
                      </div>
                      <PopoverClose>
                        <Button onClick={() => { handleUpdateEducation(index) }}>
                          Update
                        </Button>
                      </PopoverClose>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            )
          })
        }
      </div>

      {/* Experience */}
      <div
        className="w-full py-2 px-6 my-4 mx-auto border dark:border-gray-800 cursor-pointer hover:bg-accent rounded-lg overflow-hidden"
      >
        <div className="flex justify-between font-semibold">
          <Popover>
            <span>{experience.length > 0 ? "Experience" : "Add Experience"}</span>
            <span><PopoverTrigger><Plus className='hover:scale-125 transition-all duration-200' /></PopoverTrigger></span>
            <PopoverContent className='w-full'>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Experience</h4>
                  <p className="text-sm text-muted-foreground">
                    Add your most recent experiences
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="jTitle">Job Title</Label>
                    <Input
                      id="jTitle"
                      value={jTitle}
                      onChange={(e: any) => setJTitle(e.target.value)}
                      className="col-span-2 h-8"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="compName">Company Name</Label>
                    <Input
                      id="compName"
                      value={compName}
                      onChange={(e: any) => setCompName(e.target.value)}
                      className="col-span-2 h-8"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="certi">Certification</Label>
                    <Input
                      id="certi"
                      value={certi}
                      onChange={(e: any) => setCerti(e.target.value)}
                      className="col-span-2 h-8"
                    />
                  </div>
                </div>
                <PopoverClose>
                  <Button onClick={handleAddExperience}>
                    Add
                  </Button>
                </PopoverClose>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        {
          experience.map((item: Experience, index: number) => {
            return (
              <div className='flex items-center justify-between' key={index}>
                <Popover>
                  <span>{item.jobTitle}, {item.companyName} {item.certificate?.includes("https://") ? <a className='underline text-sm' href={item.certificate} target="_blank" rel="noopener noreferrer">View Certificate</a> : <span className='text-sm'>({item.certificate})</span>}</span>
                  <span className='flex items-center gap-3'>
                    <PopoverTrigger>
                      <Pencil className='w-4 hover:scale-125 transition-all duration-200' />
                    </PopoverTrigger>
                    <Trash onClick={() => handleDeleteExperience(index)} className='w-4 text-red-500 hover:scale-125 transition-all duration-200' />
                  </span>
                  <PopoverContent className='w-full'>
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">Education</h4>
                        <p className="text-sm text-muted-foreground">
                          Update Experience Details
                        </p>
                      </div>
                      <div className="grid gap-2">
                        <div className="grid grid-cols-3 items-center gap-4">
                          <Label htmlFor="jTitle">Job Title</Label>
                          <Input
                            id="jTitle"
                            value={jTitle}
                            onChange={(e: any) => setJTitle(e.target.value)}
                            className="col-span-2 h-8"
                          />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                          <Label htmlFor="compName">Company Name</Label>
                          <Input
                            id="compName"
                            value={compName}
                            onChange={(e: any) => setCompName(e.target.value)}
                            className="col-span-2 h-8"
                          />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                          <Label htmlFor="certi">Certification</Label>
                          <Input
                            id="certi"
                            value={certi}
                            onChange={(e: any) => setCerti(e.target.value)}
                            className="col-span-2 h-8"
                          />
                        </div>
                      </div>
                      <PopoverClose>
                        <Button onClick={() => { handleUpdateExperience(index) }}>
                          Update
                        </Button>
                      </PopoverClose>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            )
          })
        }
      </div>

      {/* Skills */}
      <div
        className="w-full py-2 px-6 my-4 mx-auto border dark:border-gray-800 cursor-pointer hover:bg-accent rounded-lg overflow-hidden"
      >
        <div className="flex justify-between font-semibold">
          <Popover>
            <span>{skills.length > 0 ? "Skills" : "Add Skills"}</span>
            <span><PopoverTrigger><Plus className='hover:scale-125 transition-all duration-200' /></PopoverTrigger></span>
            <PopoverContent className='w-full'>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Skills</h4>
                  <p className="text-sm text-muted-foreground">
                    Add your skill (one at a time)
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="sk">Skill</Label>
                    <Input
                      id="sk"
                      value={sk}
                      onChange={(e: any) => setSk(e.target.value)}
                      className="col-span-2 h-8"
                    />
                  </div>
                </div>
                <PopoverClose>
                  <Button onClick={handleAddSkill}>
                    Add
                  </Button>
                </PopoverClose>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className='flex gap-1 flex-col md:flex-row'>
          {
            skills.map((item: string, index: number) => {
              return (
                <div className='flex items-center justify-between' key={index}>
                  <Popover>
                    <span className='rounded-full flex items-center gap-1 text-xs text-white bg-primary/70 p-0.5 px-2'>
                      {item}
                      <PopoverTrigger>
                        <Pencil className='w-3 hover:scale-110 transition-all duration-200' />
                      </PopoverTrigger>
                      <Trash onClick={() => handleDeleteSkill(index)} className='w-3 text-red-500 hover:scale-110 transition-all duration-200' />
                    </span>
                    <PopoverContent className='w-full'>
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">Skills</h4>
                          <p className="text-sm text-muted-foreground">
                            Update skill (one at a time)
                          </p>
                        </div>
                        <div className="grid gap-2">
                          <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="sk">Skill</Label>
                            <Input
                              id="sk"
                              value={sk}
                              onChange={(e: any) => setSk(e.target.value)}
                              className="col-span-2 h-8"
                            />
                          </div>
                        </div>
                        <PopoverClose>
                          <Button onClick={() => handleUpdateSkill(index)}>
                            Update
                          </Button>
                        </PopoverClose>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

              )
            })
          }
        </div>
      </div>

      {/* Certifications */}
      <div
        className="w-full py-2 px-6 my-4 mx-auto border dark:border-gray-800 cursor-pointer hover:bg-accent rounded-lg overflow-hidden"
      >
        <div className="flex justify-between font-semibold">
          <Popover>
            <span>{certifications.length > 0 ? "Certifications" : "Add Certifications"}</span>
            <span><PopoverTrigger><Plus className='hover:scale-125 transition-all duration-200' /></PopoverTrigger></span>
            <PopoverContent className='w-full'>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Certification</h4>
                  <p className="text-sm text-muted-foreground">
                    Add your Certificate and a valid link to it
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="certiName">Certification Name</Label>
                    <Input
                      id="certiName"
                      value={certiName}
                      onChange={(e: any) => setCertiName(e.target.value)}
                      className="col-span-2 h-8"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="certiLink">Link</Label>
                    <Input
                      id="certiLink"
                      value={certiLink}
                      onChange={(e: any) => setCertiLink(e.target.value)}
                      className="col-span-2 h-8"
                    />
                  </div>
                </div>
                <PopoverClose>
                  <Button onClick={handleAddCertification}>
                    Add
                  </Button>
                </PopoverClose>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        {
          certifications.map((item: Certifications, index: number) => {
            return (
              <div key={index} className='flex items-center justify-between'>
                <Popover>
                  <span >{item.certificationName} <a className='underline  text-sm' href={item.link} target="_blank" rel="noopener noreferrer">View Certificate</a></span>
                  <span className='flex items-center gap-3'>
                    <PopoverTrigger>
                      <Pencil className='w-4 hover:scale-125 transition-all duration-200' />
                    </PopoverTrigger>
                    <Trash onClick={() => handleDeleteCertification(index)} className='w-4 text-red-500 hover:scale-125 transition-all duration-200' />
                  </span>
                  <PopoverContent className='w-full'>
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">Certification</h4>
                        <p className="text-sm text-muted-foreground">
                          Update Certificate
                        </p>
                      </div>
                      <div className="grid gap-2">
                        <div className="grid grid-cols-3 items-center gap-4">
                          <Label htmlFor="certiName">Certification Name</Label>
                          <Input
                            id="certiName"
                            value={certiName}
                            onChange={(e: any) => setCertiName(e.target.value)}
                            className="col-span-2 h-8"
                          />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                          <Label htmlFor="certiLink">Link</Label>
                          <Input
                            id="certiLink"
                            value={certiLink}
                            onChange={(e: any) => setCertiLink(e.target.value)}
                            className="col-span-2 h-8"
                          />
                        </div>
                      </div>
                      <PopoverClose>
                        <Button onClick={() => handleUpdateCertification(index)}>
                          Update
                        </Button>
                      </PopoverClose>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            )
          })
        }
      </div>

      {/* Languages */}
      <div
        className="w-full py-2 px-6 my-4 mx-auto border dark:border-gray-800 cursor-pointer hover:bg-accent rounded-lg overflow-hidden"
      >
        <div className="flex justify-between font-semibold">
          <Popover>
            <span>{languages.length > 0 ? "Languages" : "Add Languages"}</span>
            <span><PopoverTrigger><Plus className='hover:scale-125 transition-all duration-200' /></PopoverTrigger></span>
            <PopoverContent className='w-full'>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Languages</h4>
                  <p className="text-sm text-muted-foreground">
                    Add your known languages
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="lang">Language</Label>
                    <Input
                      id="lang"
                      value={lang}
                      onChange={(e: any) => setLang(e.target.value)}
                      className="col-span-2 h-8"
                    />
                  </div>
                </div>
                <PopoverClose>
                  <Button onClick={handleAddLanguage}>
                    Add
                  </Button>
                </PopoverClose>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className='flex gap-1 flex-col md:flex-row'>
          {
            languages.map((item: string, index: number) => {
              return (
                <div className='flex items-center justify-between' key={index}>
                  <Popover>
                    <span key={index} className='flex items-center gap-1 rounded-full text-xs text-white bg-primary/70 p-0.5 px-2'>
                      {item}
                      <PopoverTrigger>
                        <Pencil className='w-3 hover:scale-110 transition-all duration-200' />
                      </PopoverTrigger>
                      <Trash onClick={() => handleDeleteLanguage(index)} className='w-3 text-red-500 hover:scale-110 transition-all duration-200' />
                    </span>
                    <PopoverContent className='w-full'>
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">Languages</h4>
                          <p className="text-sm text-muted-foreground">
                            Update Language (one at a time)
                          </p>
                        </div>
                        <div className="grid gap-2">
                          <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="lang">Language</Label>
                            <Input
                              id="lang"
                              value={lang}
                              onChange={(e: any) => setLang(e.target.value)}
                              className="col-span-2 h-8"
                            />
                          </div>
                        </div>
                        <PopoverClose>
                          <Button onClick={() => handleUpdateLanguage(index)}>
                            Update
                          </Button>
                        </PopoverClose>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              )
            })
          }
        </div>
      </div>

    </motion.div>
  )
}

export default Page