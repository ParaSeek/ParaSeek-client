import { createSlice } from "@reduxjs/toolkit";

const initialState = [{
  _id: "",
  title: "",
  description: "",
  companyName: "",
  location: {
    city: "",
    state: "",
    country: ""
  },
  employmentType: "",
  remote: false,
  salaryRange: {
    minSalary: 0,
    maxSalary: 0,
    currency: ""
  },
  experienceLevel: "",
  jobType: "",
  skills: [],
  postedBy: "",
  postedDate: "",
  applicationDeadline: "",
  isActive: false,
  requiredEducation: "",
  requiredLanguages: [],
  numberOfOpenings: 0,
  applicationLink: "",
  contactEmail: "",
  applicationInstructions: "",
  benefits: [],
  workHours: "",
  googleDriveFolderId: ""
}]

const myJobsSlice = createSlice({
  name: 'myJobs',
  initialState,
  reducers: {
    setMyJobs(state, action) {
      return action.payload
    }
  }
})

export const { setMyJobs } = myJobsSlice.actions
export default myJobsSlice.reducer