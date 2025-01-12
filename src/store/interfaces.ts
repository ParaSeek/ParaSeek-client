
//Profile
export interface User {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    username: string;
    dob: string;
    gender: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}

//Qualifications
export interface Education {
    levelOfEducation: string;
    fieldOfStudy: string;
    fromYear: string; //new
    toYear: string; //new
}

export interface Experience {
    jobTitle: string,
    companyName: string,
    certificate: string,
    description?: string //new
}
export interface Certifications {
    certificationName: string,
    link: string,
}
// new
export interface Projects {
    projectTitle: string,
    overview: string,
    role: string,
}

export interface Qualifications {
    education: Education[],
    skills: string[],
    experience: Experience[],
    certifications: Certifications[],
    languages: string[],
    projects: Projects[] //new
}


//Preferences
interface WorkSchedule {
    days: string,
    shifts: string
}
interface MinimumBasePay {
    amount: number,
    payPeriod: string
}

export interface Preferences {
    jobTitles: string[],
    jobTypes: string[],
    workSchedule: WorkSchedule,
    minimumBasePay: MinimumBasePay,
    remote: string
}


//Resume-wizard

export interface ResumeTemplate {
    id: string;
    name: string;
    image: string
}

export interface resumeProfile {
    name: string;
    email: string;
    phone: string;
    address: string;
    linkedin: string;
    github: string;
}

export interface ResumeDraft {
    profile: resumeProfile;
    professionalOverview: string;
    qualifications: Qualifications;
    declaration: string;
    hobbies: string[];
    displayDate: string;
}