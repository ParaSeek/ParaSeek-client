"use client";
import { Button } from '@/components/ui/button';
import { RootState } from '@/store/store';
import { Pencil, Plus, Trash } from 'lucide-react';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { addLanguage, deleteLanguage, editLanguage } from '@/slices/qualificationSlice';
import { PopoverClose } from '@radix-ui/react-popover';
import { useToast } from '@/hooks/use-toast';
import { FaLanguage } from 'react-icons/fa6';


const AddUpdateLanguages = () => {
    const dispatch = useDispatch();
    const { toast } = useToast();
    const languages = useSelector((state: RootState) => state.qualification.languages)
    //Add, update langauges data
    const [lang, setLang] = useState("")


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

        <div
            className="w-full py-2 px-6 my-4 mx-auto border dark:border-gray-800 cursor-pointer hover:bg-accent rounded-lg overflow-hidden"
        >
            <div className="flex justify-between font-semibold">
                <Popover>
                    <span><h2 className="text-xl flex items-center"><FaLanguage className="mr-2" />{languages.length > 0 ? "Languages" : "Add Languages"}</h2></span>
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
                            <div className='flex items-center mt-2 justify-between' key={index}>
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
    )
}

export default AddUpdateLanguages