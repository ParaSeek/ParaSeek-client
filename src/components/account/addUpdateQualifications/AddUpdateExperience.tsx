"use client";
import { Button } from '@/components/ui/button';
import { RootState } from '@/store/store';
import { Pencil, Plus, Trash } from 'lucide-react';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { addExperience, deleteExperience, editExperience } from '@/slices/qualificationSlice';
import { PopoverClose } from '@radix-ui/react-popover';
import { useToast } from '@/hooks/use-toast';
import { Experience } from '@/store/interfaces';
import { FaSketch } from 'react-icons/fa6';

const AddUpdateExperience = () => {

    const experience = useSelector((state: RootState) => state.qualification.experience)
    const dispatch = useDispatch();
    const { toast } = useToast();

    //Add, update experience data
    const [jTitle, setJTitle] = useState("")
    const [compName, setCompName] = useState("")
    const [certi, setCerti] = useState("")

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

    return (
        <div
            className="w-full py-2 px-6 my-4 mx-auto border dark:border-gray-800 cursor-pointer hover:bg-accent rounded-lg overflow-hidden"
        >
            <div className="flex justify-between font-semibold">
                <Popover>
                      <span><h2 className="text-xl flex items-center"><FaSketch className="mr-2" /> {experience.length > 0 ? "Experience" : "Add Experience"}</h2></span>
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
                        <div className='flex items-center justify-between mt-2' key={index}>
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
    )
}

export default AddUpdateExperience