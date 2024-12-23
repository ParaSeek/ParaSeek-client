import { configureStore } from "@reduxjs/toolkit"
import userReducer from "../slices/userSlice"
import qualificationReducer from "../slices/qualificationSlice"
import jobsReducer from "../slices/jobSlice"
import myJobsReducer from "../slices/myJobsSlice"
import preferencesReducer from "../slices/preferencesSlice"
import createSagaMiddleware from "redux-saga";
import watchQualificationActions from "../middleware/watchQualifications";
import watchPreferenceActions from "../middleware/watchPreferences";
import companiesReducer from "../slices/companySlice"
import myCompaniesReducer from "../slices/myCompaniesSlice"

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        user: userReducer,
        qualification: qualificationReducer,
        jobs: jobsReducer,
        myJobs: myJobsReducer,
        preference: preferencesReducer,
        companies: companiesReducer,
        myCompanies: myCompaniesReducer
    },
    middleware:(getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware),
})

sagaMiddleware.run(watchQualificationActions);
sagaMiddleware.run(watchPreferenceActions);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch