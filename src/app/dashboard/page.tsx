"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react"
import CreateCompanyForm from "@/components/companies/createCompanyForm";
import { Edit, Loader, Pencil, Plus, Trash, X } from "lucide-react";
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
import { useDashboardContext } from "@/contexts/DashboardContext";
import Link from "next/link";

const Page = () => {
    const { fetchCompanies } = useDashboardContext();
    const [showCompanyUploadForm, setShowCompanyUploadForm] = useState(false);
    const [showCompanyEditForm, setShowCompanyEditForm] = useState(false);
    const [editCompany, setEditCompany] = useState([]);
    const [companyOpen, setCompanyOpen] = useState(true);
    const [openHiringInput, setOpenHiringInput] = useState(false);
    const [hiringUserName, setHiringUserName] = useState("");
    const [hiring, setHiring] = useState(false);

    const user = useSelector((state: RootState) => state.user.data);
    const myCompanies = useSelector((state: RootState) => state.myCompanies);
    const [company, setCompany] = useState<any>(myCompanies[0] || {});
    const { setHeaderTitle } = useDashboardContext();
    const { toast } = useToast();
    function closeForm() {
        setShowCompanyUploadForm(false);
        setShowCompanyEditForm(false);
    }


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
            } else {
                toast({ title: dataRes.message, variant: "destructive" });
            }
        } catch (error: any) {
            console.error(error)
        } finally {
            fetchCompanies();
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
                fetchCompanies();
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
    useEffect(() => {
        if (myCompanies[0])
            setCompany(myCompanies[0])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [myCompanies])

    useEffect(() => {
        setHeaderTitle("Dashboard");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
                fetchCompanies();
                toast({ title: result.message });
            } else {
                toast({ title: result.message, variant: "destructive" });
            }
        } catch (error: any) {
            toast({ title: error.message, variant: "destructive" })
        } finally {
            setHiring(false);
        }
    }

    return (
        <div id="dashBoardHome" className='w-full flex md:flex-row flex-col'>
            <div className="md:w-[66%] w-full">
                <h1 className="text-3xl font-bold mt-2 mb-4 custom-gradient text-transparent">My Companies</h1>
                {myCompanies.length < 3 &&
                    <div className="w-full mt-8 bg-muted p-[25px] cursor-pointer hover:bg-[#ecdcff0a] flex flex-col xs:flex-row text-center xs:text-left items-center gap-[24px] rounded-xl" onClick={() => setShowCompanyUploadForm(true)}>
                        <span className="rounded-full bg-background border p-[12px] dark:border-white border-black">
                            <Plus width="24" height="24" />
                        </span>
                        <div className="flex flex-col justify-center gap-2">
                            <h3 className="font-medium text-xl">Add a Company</h3>
                            {myCompanies.length < 1 ? <p className="text-primary-foreground text-sm">Get Started by Creating your company's Profile</p> :
                                <p className="text-sm">You can add upto 3 companies</p>}
                        </div>
                    </div>
                }

                {
                    myCompanies.length > 0 &&
                    <div className="mt-[40px]">

                        <Table>
                            {/* <TableCaption>My Companies</TableCaption> */}
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Sr. No.</TableHead>
                                    <TableHead className="text-center">Logo</TableHead>
                                    <TableHead className="text-center">Company</TableHead>
                                    <TableHead className="text-center">Jobs</TableHead>
                                    <TableHead className="text-center"></TableHead>
                                    <TableHead className="text-center"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>

                                {
                                    myCompanies.map((company: any, index: number) => {
                                        return (
                                            <TableRow className="border-none" key={index}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{company.companyLogo ? <img className="rounded-full mx-auto" height={48} width={48} src={company.companyLogo}></img> : <p className='w-12 text-white h-12 bg-primary rounded-sm grid place-items-center text-3xl font-semibold mx-auto'>
                                                    {company.companyName.charAt(0)}
                                                </p>}</TableCell>
                                                <TableCell onClick={() => {
                                                    setCompanyOpen(false); setTimeout(() => setCompanyOpen(true), 300); setCompany(company);
                                                }} className="text-center cursor-pointer">{company.companyName}</TableCell>
                                                <TableCell className="text-center"><Link href="/dashboard/postedjobs">{`${company.jobs.length} Jobs`}</Link></TableCell>
                                                <TableCell><Pencil width={22} onClick={() => { setEditCompany(company); setShowCompanyEditForm(true); }} className="mx-auto cursor-pointer" /></TableCell>
                                                <TableCell><Trash width={22} onClick={() => { if (confirm(`Are you sure you want to delete ${company.companyName}? This action can't be undone.`)) handleDeleteCompany(company._id) }} className="text-red-500 mx-auto cursor-pointer" /></TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </div>
                }


                {showCompanyUploadForm && <CreateCompanyForm actionType="create" close={closeForm} />}
                {showCompanyEditForm && <CreateCompanyForm actionType="update" company={editCompany} close={closeForm} />}


                {hiring && <div className="fixed top-0 z-20 left-0 h-screen w-screen backdrop-blur-sm grid place-items-center">
                    <Loader style={{ animationDuration: "3000ms" }} className='text-primary w-16 h-16 dark:text-white animate-spin' />
                </div>}
            </div>
            <div className="md:w-[34%] w-full relative">
                <div className={`overflow-hidden transition-all absolute right-0 duration-300 ${companyOpen ? "w-full" : "w-0"}`}>
                    <div className="md:p-6 md:pr-0 w-full mt-8 rounded-lg ">
                        <div className="flex justify-between">
                            <h1 className="text-xl font-medium mb-4">{company.companyName}</h1>
                            <Button onClick={() => { setCompanyOpen(false); setCompany({}) }} className="font-semibold text-lg" variant="ghost" size="icon"><X /></Button>
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
                                            <TableCell >{employer.user?.firstName + " " + employer.user?.lastName}</TableCell>
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
            </div>
        </div>


    )
}

export default Page