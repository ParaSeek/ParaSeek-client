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
import { addJobTitle, editJobTitle, deleteJobTitle, addJobType, editJobType, deleteJobType, setWorkSchedule, deleteWorkSchedule, setMinimumBasePay, deleteMinimumBasePay, deleteRemote, setRemote } from '@/slices/preferencesSlice';
import { PopoverClose } from '@radix-ui/react-popover';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface WorkSchedule {
    days: string,
    shifts: string
}
interface MinimumBasePay {
    amount: number,
    payPeriod: string
}
interface Preferences {
    jobTitles: string[],
    jobTypes: string[],
    workSchedule: WorkSchedule,
    minimumBasePay: MinimumBasePay,
    remote: string
}

const Page = () => {
    const dispatch = useDispatch();
    const { toast } = useToast();

    //Redux states for PreferenceS
    const jobTitles = useSelector((state: RootState) => state.preference.jobTitles)
    const jobTypes = useSelector((state: RootState) => state.preference.jobTypes)
    const workSchedule = useSelector((state: RootState) => state.preference.workSchedule)
    const minimumBasePay = useSelector((state: RootState) => state.preference.minimumBasePay)
    const remote = useSelector((state: RootState) => state.preference.remote)
    console.log(jobTitles, jobTypes, workSchedule, minimumBasePay, remote);

    //Add, update Job Titles
    const [jtitle, setJtitle] = useState("")

    //Add, update Job Types
    const [jtype, setJtype] = useState("")

    //set days and shifts of work schedule
    const [d, setD] = useState("")
    const [s, setS] = useState("")

    //set amount and payperiod of minimum base pay
    const [amt, setAmt] = useState(0)
    const [pp, setPp] = useState("")

    //Add, update remote data
    const [rm, setRm] = useState("")

    //Add, update, delete Job titles
    const handleAddJobTitle = () => {
        if (jtitle.trim() != "") {
            dispatch(addJobTitle(jtitle))
            setJtitle("")
        } else {
            toast({ title: "Field should not be empty", variant: "destructive" })
        }
    }
    const handleUpdateJobTitle = (index: number) => {
        if (jtitle.trim() != "") {
            dispatch(editJobTitle({ index, jobTitle: jtitle }))
            setJtitle("")
        } else {
            toast({ title: "Fields should not be empty", variant: "destructive" })
        }
    }
    const handleDeleteJobTitle = (index: number) => {
        dispatch(deleteJobTitle({ index }))
    }

    //Add, update, delete Job types
    const handleAddJobType = () => {
        if (jtype.trim() != "") {
            dispatch(addJobType(jtype))
            setJtype("")
        } else {
            toast({ title: "Field should not be empty", variant: "destructive" })
        }
    }
    const handleUpdateJobType = (index: number) => {
        if (jtype.trim() != "") {
            dispatch(editJobType({ index, jobType: jtype }))
            setJtype("")
        } else {
            toast({ title: "Fields should not be empty", variant: "destructive" })
        }
    }
    const handleDeleteJobType = (index: number) => {
        dispatch(deleteJobType({ index }))
    }

    //Set, delete work schedule
    const handleSetWorkSchedule = () => {
        if (d.trim() != "" && s.trim() != "") {
            dispatch(setWorkSchedule({ days: d, shifts: s }))
            setD("")
            setS("")
        } else {
            toast({ title: "Fields should not be empty", variant: "destructive" })
        }
    }
    const handleDeleteWorkSchedule = () => {
        dispatch(deleteWorkSchedule())
    }

    //set, delete minimum base pay
    const handleSetMinimumBasePay = () => {
        if (amt != 0 && pp.trim() != "") {
            dispatch(setMinimumBasePay({ amount: amt, payPeriod: pp }))
            setAmt(0)
            setPp("")
        } else {
            toast({ title: "Fields should not be empty", variant: "destructive" })
        }
    }
    const handleDeleteMinimumBasePay = () => {
        dispatch(deleteWorkSchedule())
    }
    //Add, update, delete remote
    const handleSetRemote = () => {
        if (rm.trim() != "") {
            dispatch(setRemote(rm))
            setRm("")
        } else {
            toast({ title: "Field should not be empty", variant: "destructive" })
        }
    }
    const handleDeleteRemote = (index: number) => {
        dispatch(deleteRemote())
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
                    <h2 className="sm:text-lg md:text-2xl text-center font-semibold ">Job Preferences</h2>
                </div>
            </div>

            {/* Job Titles */}
            <div
                className="w-full py-2 px-6 my-4 mx-auto border dark:border-gray-800 cursor-pointer hover:bg-accent rounded-lg overflow-hidden"
            >
                <div className="flex justify-between font-semibold">
                    <Popover>
                        <span>{jobTitles.length > 0 ? "Job Titles" : "Add Job Titles"}</span>
                        <span><PopoverTrigger><Plus className='hover:scale-125 transition-all duration-200' /></PopoverTrigger></span>
                        <PopoverContent className='w-full'>
                            <div className="grid gap-4">
                                <div className="space-y-2">
                                    <h4 className="font-medium leading-none">Job Titles</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Add your preferred Job Title (one at a time)
                                    </p>
                                </div>
                                <div className="grid gap-2">
                                    <div className="grid grid-cols-3 items-center gap-4">
                                        <Label htmlFor="jtitle">Title</Label>
                                        <Input
                                            id="jtitle"
                                            value={jtitle}
                                            onChange={(e: any) => setJtitle(e.target.value)}
                                            className="col-span-2 h-8"
                                        />
                                    </div>
                                </div>
                                <PopoverClose>
                                    <Button onClick={handleAddJobTitle}>
                                        Add
                                    </Button>
                                </PopoverClose>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
                <div className='flex gap-1 flex-col md:flex-row'>
                    {
                        jobTitles.map((item: string, index: number) => {
                            return (
                                <div className='flex items-center justify-between' key={index}>
                                    <Popover>
                                        <span className='rounded-full flex items-center gap-1 text-xs text-white bg-primary/70 p-0.5 px-2'>
                                            {item}
                                            <PopoverTrigger>
                                                <Pencil className='w-3 hover:scale-110 transition-all duration-200' />
                                            </PopoverTrigger>
                                            <Trash onClick={() => handleDeleteJobTitle(index)} className='w-3 text-red-500 hover:scale-110 transition-all duration-200' />
                                        </span>
                                        <PopoverContent className='w-full'>
                                            <div className="grid gap-4">
                                                <div className="space-y-2">
                                                    <h4 className="font-medium leading-none">Job Titles</h4>
                                                    <p className="text-sm text-muted-foreground">
                                                        Update Job Title
                                                    </p>
                                                </div>
                                                <div className="grid gap-2">
                                                    <div className="grid grid-cols-3 items-center gap-4">
                                                        <Label htmlFor="jtitle">Title</Label>
                                                        <Input
                                                            id="jtitle"
                                                            value={jtitle}
                                                            onChange={(e: any) => setJtitle(e.target.value)}
                                                            className="col-span-2 h-8"
                                                        />
                                                    </div>
                                                </div>
                                                <PopoverClose>
                                                    <Button onClick={() => handleUpdateJobTitle(index)}>
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
            {/* Job Types */}
            <div
                className="w-full py-2 px-6 my-4 mx-auto border dark:border-gray-800 cursor-pointer hover:bg-accent rounded-lg overflow-hidden"
            >
                <div className="flex justify-between font-semibold">
                    <Popover>
                        <span>{jobTitles.length > 0 ? "Preferred Job Types" : "Add Preferred Job Types"}</span>
                        <span><PopoverTrigger><Plus className='hover:scale-125 transition-all duration-200' /></PopoverTrigger></span>
                        <PopoverContent className='w-full'>
                            <div className="grid gap-4">
                                <div className="space-y-2">
                                    <h4 className="font-medium leading-none">Job Types</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Add your preferred Job Type(one at a time)
                                    </p>
                                </div>
                                <div className="grid gap-2">
                                    <div className="grid grid-cols-3 items-center gap-4">
                                        <Label htmlFor="jtype">Job Type</Label>
                                        <Input
                                            id="jtype"
                                            value={jtype}
                                            onChange={(e: any) => setJtype(e.target.value)}
                                            className="col-span-2 h-8"
                                        />
                                    </div>
                                </div>
                                <PopoverClose>
                                    <Button onClick={handleAddJobType}>
                                        Add
                                    </Button>
                                </PopoverClose>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
                <div className='flex gap-1 flex-col md:flex-row'>
                    {
                        jobTypes.map((item: string, index: number) => {
                            return (
                                <div className='flex items-center justify-between' key={index}>
                                    <Popover>
                                        <span className='rounded-full flex items-center gap-1 text-xs text-white bg-primary/70 p-0.5 px-2'>
                                            {item}
                                            <PopoverTrigger>
                                                <Pencil className='w-3 hover:scale-110 transition-all duration-200' />
                                            </PopoverTrigger>
                                            <Trash onClick={() => handleDeleteJobType(index)} className='w-3 text-red-500 hover:scale-110 transition-all duration-200' />
                                        </span>
                                        <PopoverContent className='w-full'>
                                            <div className="grid gap-4">
                                                <div className="space-y-2">
                                                    <h4 className="font-medium leading-none">Job Types</h4>
                                                    <p className="text-sm text-muted-foreground">
                                                        Update Job Type
                                                    </p>
                                                </div>
                                                <div className="grid gap-2">
                                                    <div className="grid grid-cols-3 items-center gap-4">
                                                        <Label htmlFor="jtype">Job Type</Label>
                                                        <Input
                                                            id="jtype"
                                                            value={jtype}
                                                            onChange={(e: any) => setJtitle(e.target.value)}
                                                            className="col-span-2 h-8"
                                                        />
                                                    </div>
                                                </div>
                                                <PopoverClose>
                                                    <Button onClick={() => handleUpdateJobType(index)}>
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

            {/* Work Schedule */}
            <div
                className="w-full py-2 px-6 my-4 mx-auto border dark:border-gray-800 cursor-pointer hover:bg-accent rounded-lg overflow-hidden"
            >
                <div className="flex justify-between font-semibold">
                    <Popover>
                        <span>{(workSchedule.days && workSchedule.days != "") || (workSchedule.shifts && workSchedule.shifts != "") ? "Preferred Work Schedule" : "Add Preferred Work Schedule"}</span>
                        <span className='flex gap-1'><PopoverTrigger>{(workSchedule.days && workSchedule.days != "") || (workSchedule.shifts && workSchedule.shifts != "") ? <Pencil className='w-5 hover:scale-125 transition-all duration-200'></Pencil> : <Plus className='hover:scale-125 transition-all duration-200' />}</PopoverTrigger>{((workSchedule.days && workSchedule.days != "") || (workSchedule.shifts && workSchedule.shifts != "")) && <Trash onClick={() => handleDeleteWorkSchedule()} className='w-5 text-red-500 hover:scale-110 transition-all duration-200' />}</span>
                        <PopoverContent className='w-full'>
                            <div className="grid gap-4">
                                <div className="space-y-2">
                                    <h4 className="font-medium leading-none">Add work schedule</h4>
                                    <p className="text-sm text-muted-foreground">
                                        What are your desired schedules?
                                    </p>
                                </div>
                                <div className="grid gap-2">
                                    <div className="grid grid-cols-3 items-center gap-4">
                                        <Select value={d} onValueChange={(value) => setD(value)}>
                                            <SelectTrigger className="col-span-2 h-8">
                                                <SelectValue placeholder="Days" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="All Days">All Days</SelectItem>
                                                <SelectItem value="Monday to Friday">Monday to Friday</SelectItem>
                                                <SelectItem value="Weekend Only">Weekend Only</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid grid-cols-3 items-center gap-4">
                                        <Select value={s} onValueChange={(value) => setS(value)}>
                                            <SelectTrigger className="col-span-2 h-8">
                                                <SelectValue placeholder="Shifts" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Day Shift">Day Shift</SelectItem>
                                                <SelectItem value="Morning Shift">Morning Shift</SelectItem>
                                                <SelectItem value="Night Shift">Night Shift</SelectItem>
                                                <SelectItem value="Rotational Shift">Rotational Shift</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <PopoverClose>
                                    <Button onClick={handleSetWorkSchedule}>
                                        Add
                                    </Button>
                                </PopoverClose>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
                <div className='flex gap-1 flex-col'>
                    {workSchedule.days && <p>
                        Days: {workSchedule.days}
                    </p>}
                    {workSchedule.shifts && <p>
                        Shift: {workSchedule.shifts}
                    </p>}
                </div>
            </div>
            {/* Minimum Base Pay */}
            <div
                className="w-full py-2 px-6 my-4 mx-auto border dark:border-gray-800 cursor-pointer hover:bg-accent rounded-lg overflow-hidden"
            >
                <div className="flex justify-between font-semibold">
                    <Popover>
                        <span>{(minimumBasePay.amount && minimumBasePay.amount != 0) || (minimumBasePay.payPeriod && minimumBasePay.payPeriod != "") ? "Preferred Pay" : "Add Preferred Pay"}</span>
                        <span className='flex gap-1'><PopoverTrigger>{(minimumBasePay.amount && minimumBasePay.amount != 0) || (minimumBasePay.payPeriod && minimumBasePay.payPeriod != "") ? <Pencil className='w-5 hover:scale-125 transition-all duration-200'></Pencil> : <Plus className='hover:scale-125 transition-all duration-200' />}</PopoverTrigger>{((minimumBasePay.amount && minimumBasePay.amount != 0) || (minimumBasePay.payPeriod && minimumBasePay.payPeriod != "")) && <Trash onClick={() => handleDeleteMinimumBasePay()} className='w-5 text-red-500 hover:scale-110 transition-all duration-200' />}</span>
                        <PopoverContent className='w-full'>
                            <div className="grid gap-4">
                                <div className="space-y-2">
                                    <h4 className="font-medium leading-none">Add Pay</h4>
                                    <p className="text-sm text-muted-foreground">
                                    What is the minimum pay you'll consider in your search?
                                    </p>
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex flex-col items-center gap-4">
                                    <Label htmlFor="mbp">Minimum Base Pay (in rupees)</Label>
                                        <Input
                                            id="mbp"
                                            value={amt}
                                            onChange={(e: any) => setAmt(e.target.value)}
                                            className="col-span-2 h-8"
                                        />
                                    </div>
                                    <div className="grid grid-cols-3 items-center gap-4">
                                        <Select value={pp} onValueChange={(value) => setPp(value)}>
                                            <SelectTrigger className="col-span-2 h-8">
                                                <SelectValue placeholder="Pay Period" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="per hour">per hour</SelectItem>
                                                <SelectItem value="per week">per week</SelectItem>
                                                <SelectItem value="per day">per day</SelectItem>
                                                <SelectItem value="per month">per month</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <PopoverClose>
                                    <Button onClick={handleSetMinimumBasePay}>
                                        Add
                                    </Button>
                                </PopoverClose>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
                <div className='flex gap-1 flex-col'>
                    {minimumBasePay.amount !=0 && <p>
                        Minimum Base Pay: ₹{minimumBasePay.amount}
                    </p>}
                    {minimumBasePay.payPeriod&& <p>
                       Pay Period: {minimumBasePay.payPeriod}
                    </p>}
                </div>
            </div>

            {/* Remote Setting*/}
            <div
                className="w-full py-2 px-6 my-4 mx-auto border dark:border-gray-800 cursor-pointer hover:bg-accent rounded-lg overflow-hidden"
            >
                <div className="flex justify-between font-semibold">
                    <Popover>
                        <span>{remote != "" ? "Preferred Remote Setting" : "Add Preferred Remote Setting"}</span>
                        <span className='flex gap-1'><PopoverTrigger>{remote !=""? <Pencil className='w-5 hover:scale-125 transition-all duration-200'></Pencil> : <Plus className='hover:scale-125 transition-all duration-200' />}</PopoverTrigger>{remote !="" && <Trash onClick={() => handleDeleteMinimumBasePay()} className='w-5 text-red-500 hover:scale-110 transition-all duration-200' />}</span>
                        <PopoverContent className='w-full'>
                            <div className="grid gap-4">
                                <div className="space-y-2">
                                    <h4 className="font-medium leading-none">  Desired Remote Setting</h4>
                                </div>
                                <div className="grid gap-2">
                                    <div className="grid grid-cols-3 items-center gap-4">
                                        <Select value={rm} onValueChange={(value) => setRm(value)}>
                                            <SelectTrigger className="col-span-2 h-8">
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Remote">Remote</SelectItem>
                                                <SelectItem value="on-site">on-site</SelectItem>
                                                <SelectItem value="Hybrid">Hybrid</SelectItem>
                                                <SelectItem value="Temporary Remote">Temporary Remote</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <PopoverClose>
                                    <Button onClick={handleSetRemote}>
                                        Set
                                    </Button>
                                </PopoverClose>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
                <div className='flex gap-1 flex-col'>
                    {remote}
                </div>
            </div>

        </motion.div>
    )
}

export default Page