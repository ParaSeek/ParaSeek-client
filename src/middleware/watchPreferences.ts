import { call, put, takeEvery, select } from "redux-saga/effects";
import { addJobTitle, editJobTitle, deleteJobTitle, addJobType, editJobType, deleteJobType, setWorkSchedule, deleteWorkSchedule, setMinimumBasePay, deleteMinimumBasePay, setRemote, deleteRemote } from "../slices/preferencesSlice";

const selectPreferences = (state: any) => state.preference;

function* sendPreferencesToServer(): Generator<any, void, any> {
    try {
        const preferences = yield select(selectPreferences);
        const response = yield call(fetch, `${process.env.SERVER_URL}/api/v1/jobPreferences/createAndUpdate-jobpreferences`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(preferences),
        });
        if (!response.ok) {
            throw new Error("Failed to send data");
        }
        yield put({ type: "SEND_PREFERENCES_SUCCESS", payload: yield response.json() });
    } catch (error: any) {
        yield put({ type: "SEND_PREFERENCES_FAILURE", payload: error.message });
    }
}

function* watchPreferenceActions() {
    yield takeEvery([
        addJobTitle.type,
        editJobTitle.type,
        deleteJobTitle.type,
        addJobType.type,
        editJobType.type,
        deleteJobType.type,
        setWorkSchedule.type,
        deleteWorkSchedule.type,
        setMinimumBasePay.type,
        deleteMinimumBasePay.type,
        setRemote.type,
        deleteRemote.type,
    ], sendPreferencesToServer);
}

export default watchPreferenceActions;
