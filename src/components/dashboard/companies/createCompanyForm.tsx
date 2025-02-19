"use client";
import Loader_dots from '@/components/Loader_dots';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useDashboardContext } from '@/contexts/DashboardContext';
import { useToast } from '@/hooks/use-toast';
import { industries } from '@/store/suggestions';
import { Edit, Loader, Plus, Upload, X, XCircle } from 'lucide-react';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'


interface Company {
    _id: string,
    companyName: string,
    gstNumber: string,
    gstVerified: boolean,
    description: string,
    Headquarters: string,
    companySize: string,
    industry: string,
    specialties?: string,
    companyLogo: string,
    websiteLink: string
}
const CreateCompanyForm = (props: any) => {
    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm<Company>();
    const [verifyingGST, setVerifyingGST] = useState(false);
    const { toast } = useToast();
    const { fetchCompanies } = useDashboardContext();
    const [uploading, setUploading] = useState<string | null>(null);

    const handleLogoUpdate = async (e: any, id: string) => {
        const formData = new FormData();
        formData.append('companyLogo', e.target.files[0]);
        try {
            setUploading(id);
            const res = await fetch(`${process.env.SERVER_URL}/api/v1/company/upload-logo/${id}`, {
                method: 'POST',
                credentials: "include",
                body: formData,
            });
            const result = await res.json();
            if (result.success) {
                fetchCompanies();
                toast({ title: result.message });
            } else {
                toast({ title: result.message, variant: "destructive" });
            }
        } catch (error: any) {
            toast({ title: error.message, variant: "destructive" })
        } finally {
            setUploading(null);
        }
    }


    const handleVerifyGST = async () => {
        setVerifyingGST(true);
        try {
            setTimeout(() => {
                setValue("gstVerified", true);
                setVerifyingGST(false);
            }, 3000)
        }
        catch {
            setVerifyingGST(false);
        }
    }


    const onSubmit = async (data: Company) => {
        try {
            const res = await fetch(`${process.env.SERVER_URL}/api/v1/company/${props.actionType == "create" ? "create-company" : `update-company-info/${props.company._id}`}`, {
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
                fetchCompanies();
                setTimeout(() => {
                    props.close();
                }, 200)
            } else {
                toast({ title: dataRes.message, variant: "destructive" });
            }
        } catch (error: any) {
            console.error(error)
        }
    }
    return (
        <div className='fixed top-0 left-0 h-screen w-screen flex items-center justify-center backdrop-blur-sm z-10'>
            <form className='w-4/5 max-w-xl mt-12 bg-card p-5 rounded-xl shadow-[0px_0px_25px] shadow-black/10 dark:border dark:border-muted' onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4 flex justify-between items-center">
                    <h2 className='text-xl font-medium ml-2'>{props.actionType == "create" ? "Fill your company details" : "Fill the details you want to edit"}</h2>
                        <XCircle onClick={() => props.close()} role='button' strokeWidth={"1.5px"} className='cursor-pointer ml-auto text-bold font-bold text-lg' />
                </div>
                <div className="mb-4">
                    <Input
                        type="text"
                        placeholder="Company Name"
                        defaultValue={props.company && props.company.companyName}
                        className="w-full"
                        {...register("companyName", {
                            required: true,
                        })}
                    />
                    {errors.companyName && (
                        <span className="text-red-500 text-xs">
                            Company Name is required
                        </span>
                    )}
                </div>
                {props.actionType == "create" && <div className="mb-4">
                    <div className='relative flex items-center'>
                        <Input
                            type="text"
                            placeholder="GST Number"
                            className="w-full"
                            {...register("gstNumber", {
                                required: true,
                            })}
                        />
                        <p onClick={handleVerifyGST} className='absolute text-primary text-center cursor-pointer right-2'>{verifyingGST ? <Loader_dots text='Verifying' /> : getValues("gstVerified") ? "Verified" : "Verify"}</p>
                    </div>
                    {errors.gstNumber && (
                        <span className="text-red-500 text-xs">
                            GST number is required
                        </span>
                    )}
                </div>}
                {props.actionType === "update" && <div className='mb-4'>
                    <label htmlFor={`companyLogo`}>
                        <div className="px-4 gap-3 mx-auto mb-4 flex w-full border border-secondary py-2 rounded-lg">
                            {
                                uploading ? <Loader style={{ animationDuration: "3000ms" }} className='text-primary dark:text-white animate-spin' /> :
                                    props.company.companyLogo ? <Edit /> : <Upload />
                            }
                            <p>{props.company.companyLogo ? "Edit Logo" : "Upload Logo"}</p>
                        </div>
                    </label>
                    <Input
                        type="file"
                        name={`companyLogo`}
                        id={`companyLogo`}
                        onChange={(e: any) => handleLogoUpdate(e, props.company._id)}
                        className="hidden"
                    />
                </div>}

                <div className="mb-4">
                    <Textarea
                        placeholder="Description"
                        className="w-full"
                        defaultValue={props.company && props.company.description}
                        {...register("description", {
                            required: true,
                        })}
                    />
                    {errors.description && (
                        <span className="text-red-500 text-xs">Provide a Description</span>
                    )}
                </div>
                <div className="mb-4">
                    <Input
                        type="text"
                        placeholder="Headquarters address"
                        className="w-full"
                        defaultValue={props.company && props.company.Headquarters}
                        {...register("Headquarters", {
                            required: true,
                        })}
                    />
                    {errors.Headquarters && (
                        <span className="text-red-500 text-xs">
                            Address is required
                        </span>
                    )}
                </div>
                <div className="mb-4">
                    <Select
                        defaultValue={props.company && props.company.companySize}
                        value={getValues('companySize')}
                        onValueChange={(value) => setValue('companySize', value)}
                    >
                        <SelectTrigger className="w-full disabled:cursor-default">
                            <SelectValue placeholder="Company Size" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value='micro'>Micro (1-10 Employees)</SelectItem>
                            <SelectItem value='small'>Small (11-50 Employees)</SelectItem>
                            <SelectItem value='medium'>Medium (51-250 Employees)</SelectItem>
                            <SelectItem value='large'>Large (251-1000 Employees)</SelectItem>
                            <SelectItem value="enterprise">Enterprise (1001+ Employees)</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.companySize && (
                        <span className="text-red-500 text-xs">
                            Company Size is required
                        </span>
                    )}
                </div>
                <div className="mb-4">
                    <Select
                        defaultValue={props.company && props.company.industry}
                        value={getValues('industry')}
                        onValueChange={(value) => setValue('industry', value)}
                    >
                        <SelectTrigger className="w-full disabled:cursor-default">
                            <SelectValue placeholder="Industry" />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                industries.map((industry, index) => {
                                    return <SelectItem key={index} value={industry}>{industry}</SelectItem>
                                })
                            }
                            <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.industry && (
                        <span className="text-red-500 text-xs">
                            Industry is required
                        </span>
                    )}
                </div>
                <div className="mb-4">
                    <Input
                        type="text"
                        placeholder="Speciality (Optional)"
                        className="w-full"
                        defaultValue={props.company && props.company.specialties}
                        {...register("specialties")}
                    />
                </div>
                <div className="mb-4">
                    <Input
                        type="text"
                        placeholder="Website Link"
                        className="w-full"
                        defaultValue={props.company && props.company.websiteLink}
                        {...register("websiteLink", {
                            required: true
                        })}
                    />
                    {errors.websiteLink && (
                        <span className="text-red-500 text-xs">
                            Website Link is required
                        </span>
                    )}
                </div>
                <Button type='submit'>{props.actionType == "create" ? "Create" : "Update"} Company</Button>
            </form>
        </div>
    )
}

export default CreateCompanyForm