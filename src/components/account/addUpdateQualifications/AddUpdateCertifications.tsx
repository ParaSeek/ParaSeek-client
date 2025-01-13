"use client";
import { Button } from '@/components/ui/button';
import { RootState } from '@/store/store';
import { Pencil, Plus, Trash } from 'lucide-react';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { addCertification, deleteCertification, editCertification } from '@/slices/qualificationSlice';
import { PopoverClose } from '@radix-ui/react-popover';
import { useToast } from '@/hooks/use-toast';
import { Certifications } from '@/store/interfaces';

const AddUpdateCertifications = () => {
    const dispatch = useDispatch();
    const { toast } = useToast();

    //Redux states for qualifications
    const certifications = useSelector((state: RootState) => state.qualification.certifications)



    //Add, update certifications data
    const [certiName, setCertiName] = useState("")
    const [certiLink, setCertiLink] = useState("")




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

    return (
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
    )
}

export default AddUpdateCertifications