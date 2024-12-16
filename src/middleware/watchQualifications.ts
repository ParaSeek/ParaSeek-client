import { call, put, takeEvery, select } from "redux-saga/effects";
import { addEducation, editEducation, deleteEducation, addSkill, editSkill, deleteSkill, addExperience, editExperience, deleteExperience, addCertification, editCertification, deleteCertification, addLanguage, editLanguage, deleteLanguage } from "../slices/qualificationSlice";

const selectQualifications = (state: any) => state.qualification;

function* sendQualificationsToServer(): Generator<any, void, any> {
    try {
        const qualifications = yield select(selectQualifications);
        const response = yield call(fetch, `${process.env.SERVER_URL}/api/v1/qualification/create-qualification`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(qualifications),
        });
        if (!response.ok) {
            throw new Error("Failed to send data");
        }
        yield put({ type: "SEND_QUALIFICATIONS_SUCCESS", payload: yield response.json() });
    } catch (error: any) {
        yield put({ type: "SEND_QUALIFICATIONS_FAILURE", payload: error.message });
    }
}

function* watchQualificationActions() {
    yield takeEvery([
        addEducation.type,
        editEducation.type,
        deleteEducation.type,
        addSkill.type,
        editSkill.type,
        deleteSkill.type,
        addExperience.type,
        editExperience.type,
        deleteExperience.type,
        addCertification.type,
        editCertification.type,
        deleteCertification.type,
        addLanguage.type,
        editLanguage.type,
        deleteLanguage.type,
    ], sendQualificationsToServer);
}

export default watchQualificationActions;
