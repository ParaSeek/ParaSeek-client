"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react"
import CreateCompanyForm from "@/components/dashboard/createCompanyForm";
import { Plus } from "lucide-react";
const Page = () => {

    const [showCompanyUploadForm, setShowCompanyUploadForm] = useState(false);

    function closeForm (){
        setShowCompanyUploadForm(false);
    }
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await fetch(`${process.env.SERVER_URL}/api/v1/company/get-company`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
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

        fetchCompanies();
    })
    return (
        <div id="dashBoardHome" className='py-12 w-11/12'>
            <h1 className='text-2xl font-semibold text-center'>Welcome to Employer Dashboard!</h1>
            <p className='mt-8'>Get Started by Creating your company's Profile.</p>

            <Button variant="outline" size="icon" className="w-28 h-28 mt-8" onClick={() => setShowCompanyUploadForm(true)}><Plus width="24" height="24"/></Button>

            {showCompanyUploadForm && <CreateCompanyForm close={closeForm}/>}

        </div>


    )
}

export default Page