"use client";
import { Button } from '@/components/ui/button';
import { RootState } from '@/store/store';
import { Pencil, Plus, Trash } from 'lucide-react';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogContent, DialogTrigger, DialogClose, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { addEducation, deleteEducation, editEducation } from '@/slices/qualificationSlice';
import { useToast } from '@/hooks/use-toast';
import { Education } from '@/store/interfaces';
import { FaGraduationCap } from 'react-icons/fa6';

const AddUpdateEducation = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();

  const education = useSelector((state: RootState) => state.qualification.education)

  //Add, update education data
  const [levelOfEducation, setLevelOfEducation] = useState("")
  const [field, setField] = useState("")
  const [boardOrUniversity, setBoardOrUniversity] = useState("");
  const [institute, setInstitute] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  //Add, update and delete Education details
  const handleAddEducation = () => {
    if (levelOfEducation.trim() != "" && field.trim() != "") {
      dispatch(addEducation({ levelOfEducation, fieldOfStudy: field, boardOrUniversity, institute, from, to }))
      setLevelOfEducation("")
      setField("")
      setBoardOrUniversity("");
      setInstitute("");
      setFrom("");
      setTo("");
    } else {
      toast({ title: "Fields should not be empty", variant: "destructive" })
    }
  }
  const handleUpdateEducation = (index: number) => {
    if (levelOfEducation.trim() != "" && field.trim() != "") {
      dispatch(editEducation({ index: index, education: { levelOfEducation, fieldOfStudy: field, boardOrUniversity, institute, from, to } }))
      setLevelOfEducation("")
      setField("")
      setBoardOrUniversity("");
      setInstitute("");
      setFrom("");
      setTo("");
    } else {
      toast({ title: "Fields should not be empty", variant: "destructive" })
    }
  }
  const handleDeleteEducation = (index: number) => {
    dispatch(deleteEducation({ index }))
  }

  return (
    <div className="w-full py-2 px-6 my-4 mx-auto border dark:border-gray-800 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between font-semibold">
        <Dialog>
          <span><h2 className="text-xl flex items-center"><FaGraduationCap className="mr-2" />{education.length > 0 ? "Education" : "Add Education"}</h2></span>
          <span><DialogTrigger><Plus className='hover:scale-125 transition-all duration-200' /></DialogTrigger></span>
          <DialogContent className='w-full'>
            <div className="grid gap-4">
              <div className="space-y-2">
                <DialogTitle>
                  Education
                </DialogTitle>
                <p className="text-sm text-muted-foreground">
                  Add Education Details
                </p>
              </div>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="levelOfEducation">Level Of Education</Label>
                  <Input
                    id="levelOfEducation"
                    value={levelOfEducation}
                    onChange={(e: any) => setLevelOfEducation(e.target.value)}
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
                  <Label htmlFor="boardOrUniversity">Board/University</Label>
                  <Input
                    id="boardOrUniversity"
                    value={boardOrUniversity}
                    onChange={(e: any) => setBoardOrUniversity(e.target.value)}
                    className="col-span-2 h-8"
                  />
                  <Label htmlFor="institute">Institute</Label>
                  <Input
                    id="institute"
                    value={institute}
                    onChange={(e: any) => setInstitute(e.target.value)}
                    className="col-span-2 h-8"
                  />
                  <Label htmlFor="from">Start Date</Label>
                  <Input
                    id="from"
                    value={from}
                    onChange={(e: any) => setFrom(e.target.value)}
                    className="col-span-2 h-8"
                  />
                  <Label htmlFor="to">End Date</Label>
                  <Input
                    id="to"
                    value={to}
                    onChange={(e: any) => setTo(e.target.value)}
                    className="col-span-2 h-8"
                  />
                </div>
              </div>
              <DialogFooter className='grid grid-cols-2 gap-3'>
                <Button onClick={handleAddEducation}>
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
        education.map((item: Education, index: number) => {
          return (
            <div className='flex flex-col justify-between mt-2' key={index}>
              <Dialog>
                <div className='flex justify-between'><p>{item.levelOfEducation} ({item.from} - {item.to}) </p><span className='flex items-center gap-3'>
                  <DialogTrigger onClick={() => { setLevelOfEducation(item.levelOfEducation); setField(item.fieldOfStudy); setBoardOrUniversity(item.boardOrUniversity); setInstitute(item.institute); setFrom(item.from); setTo(item.to); }}>
                    <Pencil className='w-4 hover:scale-125 transition-all duration-200' />
                  </DialogTrigger>
                  <Trash onClick={() => handleDeleteEducation(index)} className='w-4 text-red-500 hover:scale-125 transition-all duration-200' />
                </span></div>
                <p>{item.fieldOfStudy}</p>
                <p>{item.institute}, {item.boardOrUniversity}</p>

                <DialogContent className='w-full'>
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <DialogTitle>
                        Education
                      </DialogTitle>
                      <p className="text-sm text-muted-foreground">
                        Update Education Details
                      </p>
                    </div>
                    <div className="grid gap-2">
                      <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="levelOfEducation">Level Of Education</Label>
                        <Input
                          id="levelOfEducation"
                          value={levelOfEducation}
                          onChange={(e: any) => setLevelOfEducation(e.target.value)}
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
                        <Label htmlFor="boardOrUniversity">Board/University</Label>
                        <Input
                          id="boardOrUniversity"
                          value={boardOrUniversity}
                          onChange={(e: any) => setBoardOrUniversity(e.target.value)}
                          className="col-span-2 h-8"
                        />
                        <Label htmlFor="institute">Institute</Label>
                        <Input
                          id="institute"
                          value={institute}
                          onChange={(e: any) => setInstitute(e.target.value)}
                          className="col-span-2 h-8"
                        />
                        <Label htmlFor="from">Start Date</Label>
                        <Input
                          id="from"
                          value={from}
                          onChange={(e: any) => setFrom(e.target.value)}
                          className="col-span-2 h-8"
                        />
                        <Label htmlFor="to">End Date</Label>
                        <Input
                          id="to"
                          value={to}
                          onChange={(e: any) => setTo(e.target.value)}
                          className="col-span-2 h-8"
                        />
                      </div>
                    </div>
                    <DialogClose className='bg-primary rounded-md hover:bg-primary/90 py-2 text-white' onClick={() => { handleUpdateEducation(index) }}>
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

export default AddUpdateEducation