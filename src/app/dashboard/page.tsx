"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react"
import CreateCompanyForm from "@/components/companies/createCompanyForm";
import { Edit, Loader, Pencil, Plus, Trash } from "lucide-react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";


const Page = () => {

    const [showCompanyUploadForm, setShowCompanyUploadForm] = useState(false);
    const [showCompanyEditForm, setShowCompanyEditForm] = useState(false);
    const [myCompanies, setMyCompanies] = useState([]);
    const [editCompany, setEditCompany] = useState([])
    const [uploading, setUploading] = useState<string | null>(null);
    const [revalidateData, setRevalidateData] = useState(false);
    const { toast } = useToast();
    function closeForm() {
        setShowCompanyUploadForm(false);
        setShowCompanyEditForm(false);
    }
    function RevalidateData() {
        setRevalidateData(true);
    }


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
                setRevalidateData(true)
                toast({ title: result.message });
            } else {
                toast({ title: result.message, variant: "destructive" });
            }
        } catch (error: any) {
            toast({ title: error.message, variant: "destructive" })
        } finally {
            setUploading(null)
            setTimeout(() => {
                setRevalidateData(false)
            }, 1000)
        }
    }

    const fetchCompanies = async () => {
        try {
            const res = await fetch(`${process.env.SERVER_URL}/api/v1/company/get-company-created-by-user`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const dataRes = await res.json();
            if (dataRes.success) {
                setMyCompanies(dataRes.data);
                console.log(dataRes);
            } else {
                console.log(dataRes.message)
            }
        } catch (error: any) {
            console.error(error)
        } finally {
            setRevalidateData(false)
        }
    }
    useEffect(() => {
        if (revalidateData) {
            fetchCompanies();
        }
    }, [revalidateData])
    useEffect(() => {
        if (myCompanies.length < 1) {
            fetchCompanies();
        }
    })

    const handleDeleteCompany = async (id: string) => {
        try {
            const res = await fetch(`${process.env.SERVER_URL}/api/v1/company/delete/${id}`, {
                method: "DELETE",
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const dataRes = await res.json();
            if (dataRes.success) {                
                toast({ title: dataRes.message })
                setTimeout(() => {
                    RevalidateData();
                }, 200)
            } else {
                toast({ title: dataRes.message, variant: "destructive" });
            }
        } catch (error: any) {
            console.log(error)
        } finally {
            setRevalidateData(false)
        }
    }

    return (
        <div id="dashBoardHome" className='py-12 w-11/12'>
            <h1 className='text-2xl font-semibold text-center'>Welcome to Employer Dashboard!</h1>

            <h1 className="text-3xl font-semibold mt-12 mb-4">My Companies</h1>
            <Table>
                {/* <TableCaption>My Companies</TableCaption> */}
                <TableHeader>
                    <TableRow>
                        <TableHead>Sr. No.</TableHead>
                        <TableHead>Logo</TableHead>
                        <TableHead className="text-center"> Add / Edit Logo</TableHead>
                        <TableHead className="text-center">Company</TableHead>
                        <TableHead className="text-center">Jobs</TableHead>
                        <TableHead className="text-center">Edit</TableHead>
                        <TableHead className="text-center">Delete</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>

                    {
                        myCompanies.map((company: any, index: number) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{company.companyLogo ? <img className="rounded-sm" height={64} width={64} src={company.companyLogo}></img> : <p className='w-12 h-12 bg-primary rounded-sm grid place-items-center text-3xl font-semibold'>
                                        {company.companyName.charAt(0)}
                                    </p>}</TableCell>
                                    <TableCell>
                                        {
                                            <div>
                                                {
                                                    company.companyLogo ?
                                                        <div className="w-2 mx-auto">
                                                            <label htmlFor={`companyLogo${index}`}>
                                                                {
                                                                    uploading && uploading == company._id ? <Loader style={{ animationDuration: "3000ms" }} className='text-primary dark:text-white animate-spin' /> :
                                                                        <Edit className="cursor-pointer" />
                                                                }
                                                            </label>
                                                        </div>
                                                        :
                                                        <div className="w-2 mx-auto">
                                                            <label htmlFor={`companyLogo${index}`}>
                                                                {
                                                                    uploading && uploading == company._id ? <Loader style={{ animationDuration: "3000ms" }} className=' text-primary dark:text-white animate-spin' /> :
                                                                        <Plus className="cursor-pointer" />
                                                                }
                                                            </label>
                                                        </div>
                                                }
                                                <Input
                                                    type="file"
                                                    name={`companyLogo${index}`}
                                                    id={`companyLogo${index}`}
                                                    onChange={(e: any) => handleLogoUpdate(e, company._id)}
                                                    className="hidden"
                                                />
                                            </div>

                                        }</TableCell>
                                    <TableCell className="text-center">{company.companyName}</TableCell>
                                    <TableCell className="text-center">{`${company.jobs.length} Jobs`}</TableCell>
                                    <TableCell><Pencil onClick={() => { setEditCompany(company); setShowCompanyEditForm(true); }} className="mx-auto cursor-pointer" /></TableCell>
                                    <TableCell><Trash onClick={() => { if (confirm(`Are you sure you want to delete ${company.companyName}? This action can't be undone.`)) handleDeleteCompany(company._id) }} className="text-red-500 mx-auto cursor-pointer" /></TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>


            {myCompanies.length < 1 ?
                <div>
                    <p className='mt-8'>Get Started by Creating your company's Profile. You can add upto 3 companies.</p>
                    <Button variant="outline" size="icon" className="w-28 h-28 mt-8" onClick={() => setShowCompanyUploadForm(true)}><Plus width="24" height="24" /></Button>
                </div>
                :
                myCompanies.length < 3 &&
                <div>
                    <Button className="mt-8" onClick={() => setShowCompanyUploadForm(true)}>Add Company</Button>
                </div>
            }
            {showCompanyUploadForm && <CreateCompanyForm actionType="create" close={closeForm} revalidate={RevalidateData} />}
            {showCompanyEditForm && <CreateCompanyForm actionType="update" company={editCompany} close={closeForm} revalidate={RevalidateData} />}
        </div>


    )
}

export default Page