# Comprehensive Employment Portal Project Documentation

## Overview

This project aims to develop a **Comprehensive Employment Portal** that serves as a one-stop solution for job seekers and employers. The platform will integrate advanced features such as **Job Recommendations**, **Skill Gap Analysis**, **Automatic Resume Generation**, **Company Creation**, **Job Posting**, **Job and Company Listings**, and **Course Recommendations**. The application will be built using modern web technologies, ensuring a seamless and user-friendly experience for both job seekers and employers.

---

## Notable Features

### For Job Seekers

#### **Job Recommendations**

- Personalized job recommendations based on user profiles, skills, and preferences.
- AI-driven matching to suggest relevant job opportunities.

#### **Skill Gap Analysis**

- Analyze user skills and identify gaps compared to job requirements.
- Provide actionable insights to improve employability.

#### **Automatic Resume Generation**

- Generate professional resumes tailored to specific job applications.
- Customizable templates and easy editing options.

#### **Course Recommendations**

- Suggest online courses and certifications to bridge skill gaps.
- Integration with popular e-learning platforms.

#### **Job and Company Listings**

- Browse and search for jobs and companies with advanced filters.
- Detailed company profiles and job descriptions.

---

### For Employers

#### **Company Creation**

- Employers can create and manage their company profiles.
- Showcase company culture, values, and job opportunities.

#### **Job Posting**

- Post job openings with detailed descriptions and requirements.
- Manage applications and track candidate progress.

#### **Job and Company Listings**

- Promote job listings to a wide audience of job seekers.
- Highlight company benefits and career growth opportunities.

---

## Key Benefits

### For Job Seekers

- Streamlined job search process with personalized recommendations.
- Tools to improve skills and create professional resumes.
- Access to a wide range of job opportunities and learning resources.

### For Employers

- Efficient recruitment process with targeted job postings.
- Access to a pool of qualified candidates.
- Enhanced employer branding through detailed company profiles.

---

## Technology Stack

- **Frontend**: NextJs, React.js, TypeScript, Tailwind CSS, ShadCn/Ui, Motion(former Framer-motion), Redux Toolkit, Redux-saga
- **Backend**: Node.js, Express.js, mongoose
- **Database**: MongoDB
- **Gen AI (frontend)**: Gemini
- **AI/ML**: Python (for job recommendations and skill gap analysis)
- **Resume Generation**: PDF generation libraries (e.g., react-pdf, jspdf)
- **Authentication**: OAuth, JWT
- **Deployment**: AWS, Docker, Kubernetes

---

This **Comprehensive Employment Portal** will revolutionize the job search and recruitment process by leveraging advanced technologies and user-centric design, making it easier for job seekers to find opportunities and for employers to connect with the right talent.

### Current requirements from Backend Dev:

dated: 12-01-25

Need Api endpoint for resume draft saving and updating other related data models-

```javascript
interface Education {
  levelOfEducation: string;
  fieldOfStudy: string;
  fromYear: string; //newly added
  toYear: string; //newly added
}

interface Experience {
  jobTitle: string;
  companyName: string;
  certificate: string;
  description?: string; //newly added
}

interface Education {
  levelOfEducation: string;
  fieldOfStudy: string;
  boardOrUniversity?: string; //newly added
  institute?: string; //newly added
  fromYear?: string; //newly added
  toYear?: string; //newly added
}

export interface resumeProfile {
  //resume-header
  name: string;
  email: string;
  phone: string;
  address: string;
  linkedin: string;
  github: string;

  //personal-info section-2
  gender: string;
  dob: string;
  nationality: string;
}

export interface ResumeDraft {
  profile: resumeProfile;
  professionalOverview: string;
  qualifications: Qualifications;
  declaration: string;
  hobbies: string[];
  displayDate: string;
}
```
