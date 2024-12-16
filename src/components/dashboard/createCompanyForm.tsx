"use client";
import Loader_dots from '@/components/Loader_dots';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { industries } from '@/store/suggestions';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'


interface Company {
    companyName: string,
    gstNumber: string,
    gstVerified: boolean,
    description: string,
    Headquarters: string,
    companySize: string,
    industry: string,
    specialities?: string,
    companyLogo: string,
    overview?: string,
}
const CreateCompanyForm = (props :any) => {
    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm<Company>();
    const [verifyingGST, setVerifyingGST] = useState(false);

    console.log(props);
    
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
        console.log(data);
        setValue("companyLogo", "");
        try {
            const res = await fetch(`${process.env.SERVER_URL}/api/v1/company/create-company`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const dataRes = await res.json();
            if (dataRes.success) {
                console.log(dataRes);
            } else {
                console.log(dataRes.message)
            }
        } catch (error: any) {
            console.log(error)
        }
    }
    return (
        <div className='fixed top-0 left-0 h-screen w-screen bg-black/60 flex items-center justify-center backdrop-blur-sm'>
            <form className='w-4/5 max-w-xl mt-12 bg-card p-5 rounded-xl drop-shadow-md shadow-sm shadow-primary-foreground' onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4 flex justify-between items-center">
                    <h2 className='text-xl font-semibold ml-2'>Fill your company details</h2>
                    <Button onClick={()=>props.close()} type='button' size="icon" variant="outline" className='mb-4 ml-auto text-bold font-bold text-lg'>
                        x
                    </Button>
                </div>
                <div className="mb-4">
                    <Input
                        type="text"
                        placeholder="Company Name"
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
                <div className="mb-4">
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
                </div>
                <div className="mb-4">
                    <Textarea
                        placeholder="Description"
                        className="w-full"
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
                        {...register("Headquarters", {
                            required: true,
                        })}
                    />
                    {errors.companyName && (
                        <span className="text-red-500 text-xs">
                            Address is required
                        </span>
                    )}
                </div>
                <div className="mb-4">
                    <Select
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
                        {...register("specialities")}
                    />
                </div>
                <div className="mb-4">
                    <Input
                        type="text"
                        placeholder="Overview (Optional)"
                        className="w-full"
                        {...register("overview")}
                    />
                </div>
                <Button type='submit'>Create Company</Button>
            </form>
        </div>
    )
}

export default CreateCompanyForm