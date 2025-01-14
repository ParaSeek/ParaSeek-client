"use client";
import { Button } from '@/components/ui/button';
import { RootState } from '@/store/store';
import { Pencil, Plus, Trash } from 'lucide-react';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { addExperience, deleteExperience, editExperience } from '@/slices/qualificationSlice';
import { useToast } from '@/hooks/use-toast';
import { Experience } from '@/store/interfaces';
import { FaSketch } from 'react-icons/fa6';
import { Textarea } from '@/components/ui/textarea';

const AddUpdateExperience = () => {

    const experience = useSelector((state: RootState) => state.qualification.experience)
    const dispatch = useDispatch();
    const { toast } = useToast();

    //Add, update experience data
    const [jTitle, setJTitle] = useState("")
    const [compName, setCompName] = useState("")
    const [certi, setCerti] = useState("")
    const [description, setDescription] = useState("")
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("")

    //Add, update, delete experience data
    const handleAddExperience = () => {
        if (jTitle.trim() != "" && compName.trim() != "" && certi.trim() != "") {
            dispatch(addExperience({ jobTitle: jTitle, companyName: compName, certificate: certi, from, to, description }))
            setJTitle("")
            setCompName("")
            setCerti("")
            setDescription("")
            setFrom("")
            setTo("")
        } else {
            toast({ title: "Fields should not be empty", variant: "destructive" })
        }
    }
    const handleUpdateExperience = (index: number) => {
        if (jTitle.trim() != "" && compName.trim() != "" && certi.trim() != "") {
            dispatch(editExperience({ index, experience: { jobTitle: jTitle, companyName: compName, certificate: certi, from, to, description } }))
            setJTitle("")
            setCompName("")
            setCerti("")
            setDescription("")
            setFrom("")
            setTo("")
        } else {
            toast({ title: "Fields should not be empty", variant: "destructive" })
        }
    }
    const handleDeleteExperience = (index: number) => {
        dispatch(deleteExperience({ index }))
    }

    return (
        <div
            className="w-full py-2 px-6 my-4 mx-auto border dark:border-gray-800 rounded-lg overflow-hidden"
        >
            <div className="flex justify-between font-semibold">
                <Dialog>
                    <span><h2 className="text-xl flex items-center"><FaSketch className="mr-2" /> {experience.length > 0 ? "Experience" : "Add Experience"}</h2></span>
                    <span><DialogTrigger><Plus className='hover:scale-125 transition-all duration-200' /></DialogTrigger></span>
                    <DialogContent className='w-full'>
                        <DialogTitle>
                            Experience
                        </DialogTitle>
                        <div className="grid gap-4">
                            <div className="space-y-2">
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
                                    <Label htmlFor="description">Job Description</Label>
                                    <Textarea
                                        id="description"
                                        value={description}
                                        onChange={(e: any) => setDescription(e.target.value)}
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
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <Label htmlFor="from">From</Label>
                                    <Input
                                        id="from"
                                        type='date'
                                        value={from}
                                        onChange={(e: any) => setFrom(e.target.value)}
                                        className="col-span-2 h-8"
                                    />
                                </div>
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <Label htmlFor="to">To</Label>
                                    <Input
                                        id="to"
                                        type='date'
                                        value={to}
                                        onChange={(e: any) => setTo(e.target.value)}
                                        className="col-span-2 h-8"
                                    />
                                </div>
                            </div>
                            <DialogFooter className='grid grid-cols-2 gap-3'>
                                <Button onClick={handleAddExperience}>
                                    Add
                                </Button>
                                <DialogClose className='w-full bg-black dark:bg-white text-white dark:text-black border border-border font-semibold rounded-md hover:bg-black/90 dark:hover:bg-white/90 py-1' >
                                    Close
                                </DialogClose>
                            </DialogFooter>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
            {
                experience.map((item: Experience, index: number) => {
                    return (
                        <div className='flex flex-col justify-between mt-2' key={index}>
                            <Dialog>

                                <div className='flex justify-between'> <span>{item.jobTitle}, {item.companyName} </span>
                                    <span className='flex items-center justify-between gap-3'>
                                        <DialogTrigger onClick={() => { setJTitle(item.jobTitle); setCompName(item.companyName); setCerti(item.certificate); setFrom(item.from); setTo(item.to); setDescription(item.description || "") }}>
                                            <Pencil className='w-4 hover:scale-125 transition-all duration-200' />
                                        </DialogTrigger>
                                        <Trash onClick={() => handleDeleteExperience(index)} className='w-4 text-red-500 hover:scale-125 transition-all duration-200' />
                                    </span></div>
                                <span>({item.from} - {item.to})</span>
                                <p>{item.description}</p>
                                <div>{item.certificate?.includes("https://") && <a className='underline text-sm' href={item.certificate} target="_blank" rel="noopener noreferrer">View Certificate</a>}</div>
                                <DialogContent className='w-full'>
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
                                                <Label htmlFor="description">Job Description</Label>
                                                <Textarea
                                                    id="description"
                                                    value={description}
                                                    onChange={(e: any) => setDescription(e.target.value)}
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
                                            <div className="grid grid-cols-3 items-center gap-4">
                                                <Label htmlFor="from">From</Label>
                                                <Input
                                                    id="from"
                                                    type='date'
                                                    value={from}
                                                    onChange={(e: any) => setFrom(e.target.value)}
                                                    className="col-span-2 h-8"
                                                />
                                            </div>
                                            <div className="grid grid-cols-3 items-center gap-4">
                                                <Label htmlFor="to">To</Label>
                                                <Input
                                                    id="to"
                                                    type='date'
                                                    value={to}
                                                    onChange={(e: any) => setTo(e.target.value)}
                                                    className="col-span-2 h-8"
                                                />
                                            </div>
                                        </div>
                                        <DialogClose className='bg-primary rounded-md hover:bg-primary/90 py-2 text-white' onClick={() => { handleUpdateExperience(index) }}>
                                            Update
                                        </DialogClose>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default AddUpdateExperience