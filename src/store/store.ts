import { configureStore } from "@reduxjs/toolkit"
import userReducer from "../slices/userSlice"
import qualificationReducer from "../slices/qualificationSlice"
import jobsReducer from "../slices/jobSlice"
import createSagaMiddleware from "redux-saga";
import watchQualificationActions from "../slices/sagas";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        user: userReducer,
        qualification: qualificationReducer,
        jobs: jobsReducer,
    },
    middleware:(getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware),
})

sagaMiddleware.run(watchQualificationActions);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch