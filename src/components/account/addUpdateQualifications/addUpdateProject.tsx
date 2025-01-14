"use client";
import { Button } from '@/components/ui/button';
import { RootState } from '@/store/store';
import { Pencil, Plus, Trash } from 'lucide-react';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { addProject, deleteProject, editProject } from '@/slices/qualificationSlice';
import { useToast } from '@/hooks/use-toast';
import { Projects } from '@/store/interfaces';
import { FaFile } from 'react-icons/fa6';
import { Textarea } from '@/components/ui/textarea';
import { DialogTitle } from '@radix-ui/react-dialog';

const AddUpdateProject = () => {

    const projects = useSelector((state: RootState) => state.qualification.projects)
    const dispatch = useDispatch();
    const { toast } = useToast();

    //Add, update Project data states
    const [title, setTitle] = useState("")
    const [overview, setOverview] = useState("")
    const [role, setRole] = useState("")
    const [link, setLink] = useState("https://")

    //Add, update, delete Project data
    const handleAddProject = () => {
        if (title.trim() != "" && overview.trim() != "" && role.trim() != "") {
            if (link.includes("https://")) {
                dispatch(addProject({ title, overview, role, link }))
                setTitle("")
                setOverview("")
                setRole("")
                setLink("https://");
            } else {
                toast({ title: "Invalid link", variant: "destructive" });
            }
        } else {
            toast({ title: "Fields should not be empty", variant: "destructive" })
        }
    }
    const handleUpdateProject = (index: number) => {
        if (title.trim() != "" && overview.trim() != "" && role.trim() != "") {
            if (link.includes("https://")) {
                dispatch(editProject({ index, project: { title, overview, role, link } }))
                setTitle("");
                setOverview("");
                setRole("");
                setLink("https://");
            } else {
                toast({ title: "Invalid link", variant: "destructive" });
            }
        } else {
            toast({ title: "Fields should not be empty", variant: "destructive" })
        }
    }
    const handleDeleteProject = (index: number) => {
        dispatch(deleteProject({ index }))
    }

    return (
        <div
            className="w-full py-2 px-6 my-4 mx-auto border dark:border-gray-800 rounded-lg overflow-hidden"
        >
            <div className="flex justify-between font-semibold">
                <Dialog>
                    <span><h2 className="text-xl flex items-center"><FaFile className="mr-2" /> {projects.length > 0 ? "Project" : "Add Project"}</h2></span>
                    <span><DialogTrigger><Plus className='hover:scale-125 transition-all duration-200' /></DialogTrigger></span>
                    <DialogContent aria-description='Add Projects Dialog' aria-describedby='dialog content' className='w-11/12 rounded-lg'>
                        <DialogTitle>
                            Project
                        </DialogTitle>
                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <p className="text-sm text-muted-foreground">
                                    Add details of your project
                                </p>
                            </div>
                            <div className="grid gap-2">
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <Label htmlFor="title">Project Title</Label>
                                    <Input
                                        id="title"
                                        value={title}
                                        onChange={(e: any) => setTitle(e.target.value)}
                                        className="col-span-2 h-8"
                                    />
                                </div>
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <Label htmlFor="overview">Project Overview</Label>
                                    <Textarea
                                        id="overview"
                                        value={overview}
                                        onChange={(e: any) => setOverview(e.target.value)}
                                        className="col-span-2 h-8"
                                    />
                                </div>
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <Label htmlFor="role">Your role in the project</Label>
                                    <Textarea
                                        id="role"
                                        value={role}
                                        onChange={(e: any) => setRole(e.target.value)}
                                        className="col-span-2 h-8"
                                    />
                                </div>
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <Label htmlFor="link">Link of Live Project or Github Repo</Label>
                                    <Input
                                        id="link"
                                        value={link}
                                        onChange={(e: any) => setLink(e.target.value)}
                                        className="col-span-2 h-8"
                                    />
                                </div>
                            </div>
                            <DialogFooter className='grid grid-cols-2 gap-3'>
                                <Button onClick={handleAddProject}>
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
                projects.map((item: Projects, index: number) => {
                    return (
                        <div className='flex flex-col mt-2' key={index}>
                            <Dialog>
                                <span className='flex items-center gap-3'> <h4 className='w-full text-lg font-medium'>{item.title}</h4>
                                    <DialogTrigger onClick={() => { setTitle(item.title); setOverview(item.overview); setRole(item.role); setLink(item.link) }}>
                                        <Pencil className='w-4 hover:scale-125 transition-all duration-200' />
                                    </DialogTrigger>
                                    <Trash onClick={() => handleDeleteProject(index)} className='w-4 text-red-500 hover:scale-125 transition-all duration-200' />
                                </span>
                                <p className='text-sm font-mono'>Overview</p>
                                <p>{item.overview}</p>
                                <p className='text-sm font-mono'>Role</p>
                                <p>{item.role}</p>
                                <a className='underline text-sm' href={item.link} target="_blank" rel="noopener noreferrer">View Project</a>
                                <DialogContent aria-description='Add Projects Dialog' aria-describedby='dialog content' className='w-11/12 rounded-lg'>
                                    <DialogTitle>
                                        Project
                                    </DialogTitle>
                                    <div className="grid gap-4">
                                        <div className="space-y-2">
                                            <p className="text-sm text-muted-foreground">
                                                Update Project Details
                                            </p>
                                        </div>
                                        <div className="grid gap-2">
                                            <div className="grid grid-cols-3 items-center gap-4">
                                                <Label htmlFor="title">Project Title</Label>
                                                <Input
                                                    id="title"
                                                    value={title}
                                                    onChange={(e: any) => setTitle(e.target.value)}
                                                    className="col-span-2 h-8"
                                                />
                                            </div>
                                            <div className="grid grid-cols-3 items-center gap-4">
                                                <Label htmlFor="overview">Project Overview</Label>
                                                <Textarea
                                                    id="overview"
                                                    value={overview}
                                                    onChange={(e: any) => setOverview(e.target.value)}
                                                    className="col-span-2 h-8"
                                                />
                                            </div>
                                            <div className="grid grid-cols-3 items-center gap-4">
                                                <Label htmlFor="role">Your role in the project</Label>
                                                <Textarea
                                                    id="role"
                                                    value={role}
                                                    onChange={(e: any) => setRole(e.target.value)}
                                                    className="col-span-2 h-8"
                                                />
                                            </div>
                                            <div className="grid grid-cols-3 items-center gap-4">
                                                <Label htmlFor="link">Link of Live Project or Github Repo</Label>
                                                <Input
                                                    id="link"
                                                    value={link}
                                                    onChange={(e: any) => setLink(e.target.value)}
                                                    className="col-span-2 h-8"
                                                />
                                            </div>
                                        </div>
                                        <DialogClose className='bg-primary rounded-md hover:bg-primary/90 py-2 text-white' onClick={() => { handleUpdateProject(index) }}>
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

export default AddUpdateProject