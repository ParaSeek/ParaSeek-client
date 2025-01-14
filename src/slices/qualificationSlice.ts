
import { createSlice } from "@reduxjs/toolkit";
import { Qualifications } from "@/store/interfaces";

const initialState: Qualifications = {
    education: [],
    skills: [],
    experience: [],
    certifications: [],
    languages: [],
    projects: []
};

const qualificationSlice = createSlice({
    name: "qualification",
    initialState,
    reducers: {
        // Education
        setQualifications(state, action) {
            return action.payload;
        },
        addEducation(state, action) {
            state.education.push(action.payload);
        },
        editEducation(state, action) {
            const { index, education } = action.payload;
            state.education[index] = education;
        },
        deleteEducation(state, action) {
            const { index } = action.payload;
            state.education.splice(index, 1);
        },

        // Skills
        addSkill(state, action) {
            state.skills.push(action.payload);
        },
        editSkill(state, action) {
            const { index, skill } = action.payload;
            state.skills[index] = skill;
        },
        deleteSkill(state, action) {
            const { index } = action.payload;
            state.skills.splice(index, 1);
        },

        // Experience
        addExperience(state, action) {
            state.experience.push(action.payload);
        },
        editExperience(state, action) {
            const { index, experience } = action.payload;
            state.experience[index] = experience;
        },
        deleteExperience(state, action) {
            const { index } = action.payload;
            state.experience.splice(index, 1);
        },

        // Certifications
        addCertification(state, action) {
            state.certifications.push(action.payload);
        },
        editCertification(state, action) {
            const { index, certification } = action.payload;
            state.certifications[index] = certification;
        },
        deleteCertification(state, action) {
            const { index } = action.payload;
            state.certifications.splice(index, 1);
        },

        // Languages
        addLanguage(state, action) {
            state.languages.push(action.payload);
        },
        editLanguage(state, action) {
            const { index, language } = action.payload;
            state.languages[index] = language;
        },
        deleteLanguage(state, action) {
            const { index } = action.payload;
            state.languages.splice(index, 1);
        },

        //projects
        addProject(state, action) {
            state.projects.push(action.payload);
        },
        editProject(state, action) {
            const { index, project } = action.payload;
            state.projects[index] = project;
        },
        deleteProject(state, action) {
            const { index } = action.payload;
            state.projects.splice(index, 1);
        },
    }
});

export const {
    setQualifications,
    addEducation,
    editEducation,
    deleteEducation,
    addSkill,
    editSkill,
    deleteSkill,
    addExperience,
    editExperience,
    deleteExperience,
    addCertification,
    editCertification,
    deleteCertification,
    addLanguage,
    editLanguage,
    deleteLanguage,
    addProject,
    editProject,
    deleteProject,
} = qualificationSlice.actions;
export default qualificationSlice.reducer;