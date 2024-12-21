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

const myCompaniesSlice = createSlice({
    name: 'myCompanies',
    initialState,
    reducers: {
        setMyCompanies(state, action) {
            return action.payload
        }
    }
})

export const { setMyCompanies } = myCompaniesSlice.actions
export default myCompaniesSlice.reducer