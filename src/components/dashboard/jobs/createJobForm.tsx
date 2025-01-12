"use client";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { employmentTypes, jobTitles, jobTypes, levelOfEducation, states } from '@/store/suggestions';
import { Plus, X } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import { PopoverClose } from '@radix-ui/react-popover';
import { useDashboardContext } from '@/contexts/DashboardContext';

interface Location {
    city: string,
    state: string,
    country: string
}

interface SalaryRange {
    minSalary: number,
    maxSalary: number,
    currency: string
}

interface Job {
    title: string,
    description: string,
    companyName: string,
    location: Location,
    employmentType: string,
    remote?: boolean,
    salaryRange: SalaryRange,
    experienceLevel: string,
    jobType: string,
    skills: string[],
    applicationDeadline: string,
    contactEmail: string,
    benefits: string[],
    workHours: string,

    requiredEducation?: string,
    requiredLanguages?: string[],
    numberOfOpenings?: number,
    applicationLink?: string,
    applicationInstructions?: string,
}
const CreateJobForm = (props: any) => {
    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm<Job>();
    const { toast } = useToast();
    const [showTitleSuggestions, setShowTitleSuggestions] = useState(false);
    const [jobTitleValue, setJobTitleValue] = useState(props.job && props.job.title || "");
    const { fetchCompanies } = useDashboardContext();
    //location Group
    const [city, setCity] = useState((props.job && props.job.location && props.job.location.city) || "");
    const [state, setState] = useState((props.job && props.job.location && props.job.location.state) || "");
    const [country, setCountry] = useState("India");
    useEffect(() => {
        setValue("location", { city, state, country });
    }, [city, state, country])

    //Salary Group
    const [minSalary, setMinSalary] = useState(props.job && props.job.salaryRange && props.job.salaryRange.minSalary || 0);
    const [maxSalary, setMaxSalary] = useState(props.job && props.job.salaryRange && props.job.salaryRange.maxSalary || 0);
    const [currency, setCurrency] = useState("INR");
    useEffect(() => {
        setValue("salaryRange", { minSalary, maxSalary, currency });
    }, [minSalary, maxSalary, currency])

    //skills array
    const [skills, setSkills] = useState<string[]>(props.job && props.job.skills || []);
    const [skillPopover, setSkillPopover] = useState("");
    const handleSkillRemove = (index: number) => {
        let newSkills = [...skills];
        newSkills.splice(index, 1);
        setSkills(newSkills);
    }
    useEffect(() => {
        setValue("skills", skills);
    }, [skills])

    //benefits array
    const [benefits, setBenefits] = useState<string[]>(props.job && props.job.benefits || []);
    const [benefitPopover, setBenefitPopover] = useState("");
    const handleBenefitRemove = (index: number) => {
        let newBenefits = [...benefits];
        newBenefits.splice(index, 1);
        setBenefits(newBenefits);
    }
    useEffect(() => {
        setValue("benefits", benefits);
    }, [benefits])

    //benefits array
    const [languages, setLanguages] = useState<string[]>(props.job && props.job.requiredLanguages || []);
    const [languagePopover, setLanguagePopover] = useState("");
    const handleLanguageRemove = (index: number) => {
        let newLanguages = [...languages];
        newLanguages.splice(index, 1);
        setLanguages(newLanguages);
    }
    useEffect(() => {
        setValue("requiredLanguages", languages);
    }, [languages])


    useEffect(() => {
        setValue("title", jobTitleValue);
    }, [jobTitleValue])
    useEffect(() => {
        setValue('companyName', props.companyName);
    }, [props.companyName])
    const onSubmit = async (data: Job) => {
        if (jobTitleValue.trim() === "") {
            toast({ title: "Please enter a job title", variant: "destructive" });
        } else if (city.trim() === "" || state.trim() === "" || country.trim() === "") {
            toast({ title: "Please fill all the location fields", variant: "destructive" });
        } else if (minSalary === 0 || maxSalary === 0 || currency.trim() === "") {
            toast({ title: "Please fill all the salary fields", variant: "destructive" });
        } else if (minSalary < 1000) {
            toast({ title: "Minimum salary should be greater than 1000", variant: "destructive" })
        } else if (maxSalary < minSalary) {
            toast({ title: "Maximum salary should be greater than minimum salary", variant: "destructive" })
        } else if (skills.length < 2) {
            toast({ title: "Please add at least two skills", variant: "destructive" });
        } else if (benefits.length === 0) {
            toast({ title: "Please add at least one benefit", variant: "destructive" });
        } else {
            try {
                const res = await fetch(`${process.env.SERVER_URL}/api/v1/job/${props.actionType == "create" ? "job-created" : `job-updated/${props.job._id}`}`, {
                    method: `${props.actionType == "create" ? "POST" : "PATCH"}`,
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
                const dataRes = await res.json();
                if (dataRes.success) {
                    toast({ title: dataRes.message })
                    setTimeout(() => {
                        if (props.actionType == "update") {
                            fetchCompanies();
                            props.close();
                        }
                    }, 200)
                } else {
                    toast({ title: dataRes.message, variant: "destructive" });
                }
            } catch (error: any) {
                console.error(error)
            }
        }
    }
    return (
        <div className="fixed top-0 left-0 h-screen w-screen backdrop-blur-sm z-10 flex items-center justify-center">
            <form className="w-4/5 max-w-xl max-h-[88vh] overflow-y-scroll mt-12 bg-card p-5 pt-0 rounded-xl shadow-[0px_0px_10px] shadow-black/20 dark:border dark:border-muted" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4 flex justify-between items-center sticky top-0 backdrop-blur-sm z-[15] pt-5">
                    <h2 className='text-xl font-semibold ml-1'>{props.actionType == "create" ? "Fill the Job details" : "Fill the details you want to edit"}</h2>
                    <Button onClick={() => props.close()} type='button' size="icon" variant="outline" className='mb-4 ml-auto'>
                        <X />
                    </Button>
                </div>
                <p className='mb-4 ml-1'>Company: <span className='font-semibold'>{props.companyName}</span></p>
                <div className="mb-4 relative">
                    <Input
                        type="text"
                        placeholder="Job Title"
                        className="w-full"
                        id='jobTitle'
                        onFocus={() => setShowTitleSuggestions(true)}
                        onBlur={() => setTimeout(() => { setShowTitleSuggestions(false) }, 200)}
                        value={jobTitleValue == "" ? props.job && props.job.title : jobTitleValue}
                        onChange={(e) => { setJobTitleValue(e.target.value); }}
                    />
                    {showTitleSuggestions &&
                        <div className="absolute top-12 z-[15] max-h-[360px] overflow-y-scroll left-0 w-full backdrop-blur-lg border-muted border rounded-lg">
                            {jobTitles.filter((title) => title.toLowerCase().includes(jobTitleValue.toLowerCase())).map((title: string, index: number) => {
                                return (
                                    <p className='cursor-pointer hover:bg-card/70 p-2' onClick={() => { setJobTitleValue(title); setShowTitleSuggestions(false) }} key={index}>{title}</p>
                                )
                            })}
                        </div>
                    }
                </div>

                <div className="mb-4">
                    <Textarea
                        placeholder="Description"
                        className="w-full"
                        defaultValue={props.job && props.job.description}
                        {...register("description", {
                            required: true,
                        })}
                    />
                    {errors.description && (
                        <span className="text-red-500 text-xs">Provide a Description</span>
                    )}
                </div>

                <div className="mb-4">
                    <Select
                        defaultValue={props.job && props.job.employmentType}
                        value={getValues('employmentType')}
                        onValueChange={(value) => setValue('employmentType', value)}
                        required
                    >
                        <SelectTrigger className="w-full disabled:cursor-default">
                            <SelectValue placeholder="Employment Type" />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                employmentTypes.map((industry, index) => {
                                    return <SelectItem key={index} value={industry}>{industry}</SelectItem>
                                })
                            }
                        </SelectContent>
                    </Select>
                    {errors.employmentType && (
                        <span className="text-red-500 text-xs">
                            Employment Type is required
                        </span>
                    )}
                </div>

                <div className='mb-4 flex items-center justify-between border border-muted p-2 rounded-md'>
                    <label className='w-full' htmlFor='remote'>Remote?</label>
                    <Input
                        type='checkbox'
                        id='remote'
                        name="remote"
                        defaultChecked={props.job && props.job.remote}
                        onChange={(e) => setValue('remote', e.target.checked)}
                        className='border h-4 w-4 rounded-lg disabled:cursor-default'
                    />
                </div>

                {/* location group */}
                <div className='rounded-md border-muted border mb-4 p-2'>
                    <p className='mb-1'>Job Location</p>
                    <div className='location-group flex gap-2'>
                        <Input
                            type="text"
                            name="city"
                            placeholder='city'
                            value={city == "" ? props.job && props.job.location && props.job.location.city : city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg disabled:cursor-default"
                        />

                        <Select
                            value={state == "" ? props.job && props.job.location && props.job.location.state : state}
                            onValueChange={(value) => setState(value)}
                        >
                            <SelectTrigger className="w-full disabled:cursor-default">
                                <SelectValue placeholder="State" />
                            </SelectTrigger>
                            <SelectContent>
                                {states.map((state, index) => {
                                    return <SelectItem key={index} value={state}>{state}</SelectItem>
                                })}
                            </SelectContent>
                        </Select>
                        <Select
                            value={country == " " ? props.job && props.job.location && props.job.location.country : country}
                            onValueChange={(value) => setCountry(value)}
                        >
                            <SelectTrigger className="w-full disabled:cursor-default">
                                <SelectValue placeholder="Country" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="India">India</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* salary group */}
                <div className='rounded-md border-muted border mb-4 p-2'>
                    <p className='mb-1'>Salary Range</p>
                    <div className='salary-group flex gap-2'>
                        <Input
                            type="number"
                            name="min-salary"
                            placeholder='Minimum Salary'
                            value={minSalary == 0 ? props.job && props.job.salaryRange && props.job.salaryRange.minSalary : minSalary}
                            onChange={(e) => setMinSalary(Number(e.target.value))}
                            className="w-full px-3 py-2 border rounded-lg disabled:cursor-default"
                        />

                        <Input
                            type="number"
                            name="max-salary"
                            placeholder='Maximum Salary'
                            value={maxSalary == 0 ? props.job && props.job.salaryRange && props.job.salaryRange.maxSalary : maxSalary}
                            onChange={(e) => setMaxSalary(Number(e.target.value))}
                            className="w-full px-3 py-2 border rounded-lg disabled:cursor-default"
                        />

                        <Select
                            value={currency == "" ? props.job && props.job.salaryRange && props.job.salaryRange.currency : currency}
                            onValueChange={(value) => setCurrency(value)}
                        >
                            <SelectTrigger className="w-full disabled:cursor-default">
                                <SelectValue placeholder="Currency" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="INR">INR</SelectItem>
                                <SelectItem value="USD">USD</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="mb-4">
                    <Select
                        defaultValue={props.job && props.job.experienceLevel}
                        value={getValues('experienceLevel')}
                        onValueChange={(value) => setValue('experienceLevel', value)}
                    >
                        <SelectTrigger className="w-full disabled:cursor-default">
                            <SelectValue placeholder="Experience Level" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value='fresher'>Fresher (0-1 Years)</SelectItem>
                            <SelectItem value='beginner'>Beginner (1-3 Years)</SelectItem>
                            <SelectItem value='intermediate'>Intermediate (3-6 Years)</SelectItem>
                            <SelectItem value='senior'>Senior (6-10 Years)</SelectItem>
                            <SelectItem value='expert'>Expert (10+ Years)</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.experienceLevel && (
                        <span className="text-red-500 text-xs">
                            Experience Level is required
                        </span>
                    )}
                </div>
                <div className="mb-4">
                    <Select
                        defaultValue={props.job && props.job.jobType}
                        value={getValues('jobType')}
                        onValueChange={(value) => setValue('jobType', value)}
                        required
                    >
                        <SelectTrigger className="w-full disabled:cursor-default">
                            <SelectValue placeholder="Job Type" />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                jobTypes.map((industry, index) => {
                                    return <SelectItem key={index} value={industry}>{industry}</SelectItem>
                                })
                            }
                            <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="mb-4">
                    <Select
                        defaultValue={props.job && props.job.requiredEducation}
                        value={getValues('requiredEducation')}
                        onValueChange={(value) => setValue('requiredEducation', value)}
                        required
                    >
                        <SelectTrigger className="w-full disabled:cursor-default">
                            <SelectValue placeholder="Required Education" />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                levelOfEducation.map((level, index) => {
                                    return <SelectItem key={index} value={level}>{level}</SelectItem>
                                })
                            }
                        </SelectContent>
                    </Select>
                </div>

                <div className='mb-4 p-2 rounded-md border border-muted'>
                    <div className='flex items-center'>
                        <label className='w-full' htmlFor="">Skills</label>
                        <Popover>
                            <PopoverTrigger><Plus className='hover:scale-125 transition-all duration-200' /></PopoverTrigger>
                            <PopoverContent className='w-full'>
                                <div>
                                    <Input
                                        type='text'
                                        placeholder='Enter a skill'
                                        value={skillPopover}
                                        className='mb-4'
                                        onChange={(e) => setSkillPopover(e.target.value)}
                                    />

                                    <PopoverClose>
                                        <Button onClick={() => { if (skillPopover.trim() != "") setSkills((prev) => [...prev, skillPopover]); setSkillPopover("") }}>
                                            Add
                                        </Button>
                                    </PopoverClose>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                    {skills.length > 0 && <div className='flex gap-2 mt-2'>
                        {skills.map((skill, index) => {
                            return <div key={index} className="flex gap-1 text-sm items-center bg-primary rounded-full px-2 py-1"><span>{skill}</span><span><X onClick={() => handleSkillRemove(index)} className='h-4 cursor-pointer' /></span></div>
                        })}
                    </div>
                    }
                </div>

                <div className='mb-4 p-2 rounded-md border border-muted'>
                    <div className='flex items-center'>
                        <label className='w-full' htmlFor="">Required Languages</label>
                        <Popover>
                            <PopoverTrigger><Plus className='hover:scale-125 transition-all duration-200' /></PopoverTrigger>
                            <PopoverContent className='w-full'>
                                <div>
                                    <Input
                                        type='text'
                                        placeholder='Enter a Language'
                                        value={languagePopover}
                                        className='mb-4'
                                        onChange={(e) => setLanguagePopover(e.target.value)}
                                    />

                                    <PopoverClose>
                                        <Button onClick={() => { if (languagePopover.trim() != "") setLanguages((prev) => [...prev, languagePopover]); setLanguagePopover("") }}>
                                            Add
                                        </Button>
                                    </PopoverClose>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                    {languages.length > 0 && <div className='flex gap-2 mt-2'>
                        {languages.map((language, index) => {
                            return <div key={index} className="flex gap-1 text-sm items-center bg-primary rounded-full px-2 py-1"><span>{language}</span><span><X onClick={() => handleLanguageRemove(index)} className='h-4 cursor-pointer' /></span></div>
                        })}
                    </div>
                    }
                </div>

                <div className="mb-4 relative flex flex-col gap-1 justify-center">
                    <label className="block absolute right-1 py-1 px-3 bg-card z-[12] shadow-card shadow-[0px_0px_5px]">Application Deadline</label>
                    <Input
                        type="date"
                        {...register("applicationDeadline", {
                            required: true,
                        })}
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                    {props.actionType == "update" &&
                        <Input
                            type="text"
                            value={props.job && (new Date(props.job.applicationDeadline)).toLocaleDateString()}
                            disabled
                            className="w-full px-3 py-2 border rounded-lg disabled:cursor-default"
                        />
                    }
                    {errors.applicationDeadline && (
                        <span className="text-red-500 text-xs">
                            Application Deadline is required
                        </span>
                    )}
                </div>

                <div className="mb-4">
                    <Input
                        type="text"
                        placeholder="Contact Email"
                        className="w-full"
                        defaultValue={props.job && props.job.contactEmail}
                        {...register("contactEmail", {
                            required: true
                        })}
                    />
                    {errors.contactEmail && (
                        <span className="text-red-500 text-xs">
                            Contact Email is required
                        </span>
                    )}
                </div>

                <div className='mb-4 p-2 rounded-md border border-muted'>
                    <div className='flex items-center'>
                        <label className='w-full' htmlFor="">Benefits</label>
                        <Popover>
                            <PopoverTrigger><Plus className='hover:scale-125 transition-all duration-200' /></PopoverTrigger>
                            <PopoverContent className='w-full'>
                                <div>
                                    <Input
                                        type='text'
                                        placeholder='Enter a Benefit'
                                        value={benefitPopover}
                                        className='mb-4'
                                        onChange={(e) => setBenefitPopover(e.target.value)}
                                    />

                                    <PopoverClose>
                                        <Button onClick={() => { if (benefitPopover.trim() != "") setBenefits((prev) => [...prev, benefitPopover]); setBenefitPopover("") }}>
                                            Add
                                        </Button>
                                    </PopoverClose>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                    {benefits.length > 0 && <div className='flex gap-2 mt-2'>
                        {benefits.map((benefit, index) => {
                            return <div key={index} className="flex gap-1 text-sm items-center bg-primary rounded-full px-2 py-1"><span>{benefit}</span><span><X onClick={() => handleBenefitRemove(index)} className='h-4 cursor-pointer' /></span></div>
                        })}
                    </div>
                    }
                </div>

                <div className="mb-4">
                    <Input
                        type="text"
                        placeholder="Work hours"
                        className="w-full"
                        defaultValue={props.job && props.job.workHours}
                        {...register("workHours", {
                            required: true
                        })}
                    />
                    {errors.workHours && (
                        <span className="text-red-500 text-xs">
                            Work Hours field is required
                        </span>
                    )}
                </div>

                <div className="mb-4">
                    <Input
                        type="number"
                        placeholder="Number of openings"
                        className="w-full"
                        defaultValue={props.job && props.job.numberOfOpenings}
                        {...register("numberOfOpenings", { required: true })}
                    />
                    {errors.numberOfOpenings && (
                        <span className="text-red-500 text-xs">
                            Number of openings is required
                        </span>
                    )}
                </div>
                <div className="mb-4">
                    <Input
                        type="text"
                        placeholder="Application Link (if any)"
                        className="w-full"
                        defaultValue={props.job && props.job.applicationLink}
                        {...register("applicationLink")}
                    />
                </div>
                <div className="mb-4">
                    <Input
                        type="text"
                        placeholder="Applicaton Instructions"
                        className="w-full"
                        defaultValue={props.job && props.job.applicationInstructions}
                        {...register("applicationInstructions")}
                    />
                </div>
                <Button type='submit'>{props.actionType == "create" ? "Create" : "Update"} Job</Button>
            </form>
        </div>
    )
}

export default CreateJobForm