"use client";
import { Button } from '@/components/ui/button';
import { RootState } from '@/store/store';
import { Pencil, Plus, Trash } from 'lucide-react';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { addSkill, deleteSkill, editSkill } from '@/slices/qualificationSlice';
import { PopoverClose } from '@radix-ui/react-popover';
import { useToast } from '@/hooks/use-toast';
import { FaGraduationCap } from 'react-icons/fa6';


const AddUpdateSkills = () => {
    const skills = useSelector((state: RootState) => state.qualification.skills)
    const dispatch = useDispatch();
    const { toast } = useToast();
    //Add, update skills data
    const [sk, setSk] = useState("")

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
    return (
        <div
            className="w-full py-2 px-6 my-4 mx-auto border dark:border-gray-800 cursor-pointer hover:bg-accent rounded-lg overflow-hidden"
        >
            <div className="flex justify-between font-semibold">
                <Popover>
                                 
                    <span><h2 className="text-xl flex items-center"><FaGraduationCap className="mr-2" />{skills.length > 0 ? "Skills" : "Add Skills"} </h2></span>
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
                            <div className='flex items-center justify-between mt-2' key={index}>
                                <Popover>
                                    <span className='rounded-full flex items-center gap-1 text-xs text-white bg-primary p-0.5 px-2'>
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

    )
}

export default AddUpdateSkills