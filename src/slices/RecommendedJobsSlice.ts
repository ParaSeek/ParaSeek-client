import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    job: {
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
    },
    score: 0,
  }
]

const RecommendedJobsSlice = createSlice({
  name: 'recommendedJobs',
  initialState,
  reducers: {
    setRecommendedJobs(state, action) {
      return action.payload
    }
  }
})

export const { setRecommendedJobs } = RecommendedJobsSlice.actions
export default RecommendedJobsSlice.reducer