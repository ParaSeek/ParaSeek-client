"use client";
import { Button } from '@/components/ui/button';
import { RootState } from '@/store/store';
import { Pencil, Plus, Trash } from 'lucide-react';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { addEducation, deleteEducation, editEducation } from '@/slices/qualificationSlice';
import { PopoverClose } from '@radix-ui/react-popover';
import { useToast } from '@/hooks/use-toast';
import { Education } from '@/store/interfaces';
import { FaGraduationCap } from 'react-icons/fa6';

const AddUpdateEducation = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();

  const education = useSelector((state: RootState) => state.qualification.education)

  //Add, update education data
  const [edLevel, setEdlevel] = useState("")
  const [field, setField] = useState("")
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

  return (
    <div className="w-full py-2 px-6 my-4 mx-auto border dark:border-gray-800 cursor-pointer hover:bg-accent rounded-lg overflow-hidden">
      <div className="flex items-center justify-between font-semibold">
        <Popover>
            <span><h2 className="text-xl flex items-center"><FaGraduationCap className="mr-2" />{education.length > 0 ? "Education" : "Add Education"}</h2></span>
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
            <div className='flex items-center justify-between mt-2' key={index}>
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
  )
}

export default AddUpdateEducation