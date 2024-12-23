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
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useFetchCompanies } from "@/contexts/FetchCompaniesContext";

const Page = () => {
    const { fetchCompanies } = useFetchCompanies();
    const [showCompanyUploadForm, setShowCompanyUploadForm] = useState(false);
    const [showCompanyEditForm, setShowCompanyEditForm] = useState(false);
    const [editCompany, setEditCompany] = useState([]);
    const [uploading, setUploading] = useState<string | null>(null);
    const [revalidateData, setRevalidateData] = useState(false);
    const [companyOpen, setCompanyOpen] = useState(false);
    const [company, setCompany] = useState<any>({});
    const [openHiringInput, setOpenHiringInput] = useState(false);
    const [hiringUserName, setHiringUserName] = useState("");
    const [hiring, setHiring] = useState(false);

    const user = useSelector((state: RootState) => state.user.data);
    const myCompanies = useSelector((state: RootState) => state.myCompanies);

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


  
    useEffect(() => {
        if (revalidateData) {
            fetchCompanies();
        }
    }, [revalidateData])
   

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

    const handleHire = async (id: string) => {
        const data = {
            username: hiringUserName
        }
        try {
            setHiring(true);
            const res = await fetch(`${process.env.SERVER_URL}/api/v1/company/hire-employers/${id}`, {
                method: 'PATCH',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            const result = await res.json();
            if (result.success) {
                toast({ title: result.message });
                setOpenHiringInput(false);
                setHiringUserName("");
            } else {
                toast({ title: result.message, variant: "destructive" });
            }
        } catch (error: any) {
            toast({ title: error.message, variant: "destructive" })
        } finally {
            setHiring(false);
        }
    }

    const handleFireEmployer = async (id: string) => {
        const data = {
            userId: id
        }
        try {
            setHiring(true);
            const res = await fetch(`${process.env.SERVER_URL}/api/v1/company/fire-employers/${company._id}`, {
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            const result = await res.json();
            if (result.success) {
                toast({ title: result.message });
            } else {
                toast({ title: result.message, variant: "destructive" });
            }
        } catch (error: any) {
            toast({ title: error.message, variant: "destructive" })
        } finally {
            RevalidateData();
            setHiring(false);
        }
    }

    return (
        <div id="dashBoardHome" className='py-12 w-11/12'>
            <h1 className='text-2xl font-semibold text-center'>Welcome to Employer Dashboard!</h1>
            {
                myCompanies.length > 0 &&
                <div>

                    <h1 className="text-3xl font-semibold mt-12 mb-4">My Companies</h1>
                    <Table>
                        {/* <TableCaption>My Companies</TableCaption> */}
                        <TableHeader>
                            <TableRow>
                                <TableHead>Sr. No.</TableHead>
                                <TableHead className="text-center">Logo</TableHead>
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
                                        <TableRow onClick={() => {
                                            setCompanyOpen(true); setCompany(company); window.scrollTo({
                                                top: 200, behavior: 'smooth'
                                            })
                                        }} key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{company.companyLogo ? <img className="rounded-sm mx-auto" height={64} width={64} src={company.companyLogo}></img> : <p className='w-12 text-white h-12 bg-primary rounded-sm grid place-items-center text-3xl font-semibold mx-auto'>
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
                </div>
            }

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

            <div className={`overflow-hidden transition-all duration-300 ${companyOpen ? "w-full" : "w-0"}`}>
                <div className="bg-card shadow-[0px_0px_10px] p-6 shadow-black/20 dark:border dark:border-muted w-full mt-8 rounded-lg ">
                    <div className="flex justify-between">
                        <h1 className="text-xl font-medium mb-4">{company.companyName}</h1>
                        <Button onClick={() => { setCompanyOpen(false); setCompany({}) }} className="font-semibold text-lg" variant="outline" size="icon">x</Button>
                    </div>

                    {company.companyOwner && company.companyOwner._id === user._id && <Button onClick={() => setOpenHiringInput(true)} className="mb-4">Hire Employers</Button>}
                    <div className={`${openHiringInput ? "w-screen h-screen backdrop-blur-sm " : "w-0 h-0"} overflow-hidden transition-all duration-300 fixed top-0 left-0 z-10 grid place-items-center`}>
                        <div className="max-w-[480px] bg-card shadow-[0px_0px_10px] p-6 rounded-lg dark:border dark:border-muted shadow-black/20">
                            <h1 className="mb-4">Enter the Username of the Employer you want to hire</h1>

                            <Input
                                value={hiringUserName}
                                required
                                onChange={(e) => setHiringUserName(e.target.value)}
                                placeholder="Username"
                            />
                            <Button onClick={() => handleHire(company._id)} className="mt-4">Hire</Button>
                            <Button onClick={() => { setHiringUserName(""), setOpenHiringInput(false) }} className="ml-4">Cancel</Button>
                        </div>
                    </div>

                    <Table>
                        {/* <TableCaption>My Companies</TableCaption> */}
                        <TableHeader>
                            <TableRow>
                                <TableHead>Sr. No.</TableHead>
                                <TableHead>Employer</TableHead>
                                <TableHead>Status</TableHead>
                                {company.companyOwner && company.companyOwner._id === user._id && <TableHead>Action</TableHead>}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {company.companyOwner && company.companyOwner._id === user._id &&
                                <TableRow>
                                    <TableCell>1</TableCell>
                                    <TableCell >You</TableCell>
                                    <TableCell >Owner</TableCell>
                                    {company.companyOwner && company.companyOwner._id === user._id && <TableCell>
                                    </TableCell>}
                                </TableRow>
                            }
                            {company.employers && company.employers.map((employer: any, index: number) => {
                                var sn;
                                if (company.companyOwner && company.companyOwner._id === user._id) {
                                    sn = index + 2;
                                } else {
                                    sn = index + 1;
                                }
                                return (
                                    <TableRow key={index}>
                                        <TableCell>{sn}</TableCell>
                                        <TableCell >{employer.user.firstName + " " + employer.user.lastName}</TableCell>
                                        <TableCell ><p className={` ${employer.hireProcess == "hired" ? "text-green-500" : "text-orange-500"}`}>{employer.hireProcess == "hired" ? "Hired" : "Pending"}</p></TableCell>
                                        {company.companyOwner && company.companyOwner._id === user._id && <TableCell><Button onClick={() => { if (confirm("Are you sure you want to fire this employer? This action can't be undone.")) handleFireEmployer(employer.user._id) }} className="bg-red-500 hover:bg-red-600">
                                            Fire
                                        </Button>
                                        </TableCell>}
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </div>
            </div>
            {hiring && <div className="fixed top-0 z-20 left-0 h-screen w-screen backdrop-blur-sm grid place-items-center">
                <Loader style={{ animationDuration: "3000ms" }} className='text-primary w-16 h-16 dark:text-white animate-spin' />
            </div>}
        </div>


    )
}

export default Page