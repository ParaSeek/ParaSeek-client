import { createSlice } from "@reduxjs/toolkit";
interface WorkSchedule {
    days: string,
    shifts: string
}
interface MinimumBasePay{
    amount: number,
    payPeriod: string
}
interface Preferences {
    jobTitles: string[],
    jobTypes: string[],
    workSchedule: WorkSchedule,
    minimumBasePay: MinimumBasePay,
    remote: boolean
}
const initialState:Preferences = {
    jobTitles: [],
    jobTypes: [],
    workSchedule: {
        days:'',
        shifts:''
    },
    minimumBasePay: {
        amount: 0,
        payPeriod: '',
    },
    remote: false,
}
const preferencesSlice = createSlice({
    name: "preference",
    initialState,
    reducers: {
        setPreferences(state, action){
            return action.payload;
        },

        //Job Titles
        addJobTitle(state, action) {
            state.jobTitles.push(action.payload);
        },
        editJobTitle(state, action) {
            const { index, jobTitle } = action.payload;
            state.jobTitles[index] = jobTitle;
        },
        deleteJobTitle(state, action) {
            const { index } = action.payload;
            state.jobTitles.splice(index, 1);
        },

        // Job Types
        addJobType(state, action) {
            state.jobTypes.push(action.payload);
        },
        editJobType(state, action) {
            const { index, jobType } = action.payload;
            state.jobTypes[index] = jobType;
        },
        deleteJobType(state, action) {
            const { index } = action.payload;
            state.jobTypes.splice(index, 1);
        },

        // Work Schedule
        setWorkSchedule(state, action){
            state.workSchedule = action.payload
        },
        deleteWorkSchedule(state){
            state.workSchedule = {
                days:'',
                shifts:''
            }
        },
        // Minimum Base Pay
        setMinimumBasePay(state, action){
            state.minimumBasePay = action.payload
        },
        deleteMinimumBasePay(state){
            state.minimumBasePay= {
                amount:0,
                payPeriod:''
            }
        },

        // remote
        setRemote(state, action){
            state.remote = action.payload
        },
    }
});

export const {
    setPreferences,
    addJobTitle,
    editJobTitle,
    deleteJobTitle,
    addJobType,
    editJobType,
    deleteJobType,
    setWorkSchedule,
    deleteWorkSchedule,
    setMinimumBasePay,
    deleteMinimumBasePay,
    setRemote,
} = preferencesSlice.actions;
export default preferencesSlice.reducer;