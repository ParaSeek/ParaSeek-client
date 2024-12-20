import { createSlice } from "@reduxjs/toolkit";

const initialState = [{
    companyName: "",
    gstVerified: false,
    gstNumber: "",
    jobs: [""],
    employers: [""],
    companyLogo: "",
    description: "",
    websiteLink: "",
    Headquarters: "",
    companySize: "",
    industry: "",
    specialties: "",
    followers: [""],
    companyOwner: "",
    _id: ""
}]

const companySlice = createSlice({
    name: 'companies',
    initialState,
    reducers: {
        setCompanies(state, action) {
            return action.payload
        }
    }
})

export const { setCompanies } = companySlice.actions
export default companySlice.reducer