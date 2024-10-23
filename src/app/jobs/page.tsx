
import Jobcard from '@/components/jobs/Jobcard'
import React from 'react'

const page = () => {
  return (
    <section className='bg-background/70 px-[5%] py-16 grid :grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
      {jobs.map((job,index)=>{
        return <Jobcard title={job.title} companyName={job.companyName} workHours={job.workHours} salaryRange={job.salaryRange} employmentType={job.employmentType}  location={job.location} key={index} />
      })}      

    </section>
  )
}

export default page

const jobs = [
  {
    "title": "Software Engineer",
    "description": "Develop and maintain software applications.",
    "companyName": "Tech Innovations",
    "location": {
      "city": "San Francisco",
      "state": "CA",
      "country": "USA"
    },
    "employmentType": "Full-time",
    "remote": true,
    "salaryRange": {
      "minSalary": 80000,
      "maxSalary": 120000,
      "currency": "USD"
    },
    "experienceLevel": "Mid Level",
    "jobType": "Technical",
    "skills": ["JavaScript", "React", "Node.js"],
    "postedBy": "60d5f491e82e3b001f68ddef",
    "postedDate": "2024-10-01T00:00:00Z",
    "applicationDeadline": "2024-11-01T00:00:00Z",
    "isActive": true,
    "requiredEducation": "Bachelor's Degree",
    "requiredLanguages": ["English"],
    "numberOfOpenings": 3,
    "applicationLink": "http://techinnovations.com/apply",
    "contactEmail": "eric.smith@techinnovations.com",
    "applicationInstructions": "Please submit your resume and cover letter.",
    "benefits": ["Health Insurance", "Paid Time Off"],
    "workHours": "9 AM - 5 PM",
    "googleDriveFolderId": "1A2B3C4D5E"
  },
  {
    "title": "Marketing Manager",
    "description": "Lead marketing strategies and campaigns.",
    "companyName": "Creative Agency",
    "location": {
      "city": "New York",
      "state": "NY",
      "country": "USA"
    },
    "employmentType": "Full-time",
    "remote": false,
    "salaryRange": {
      "minSalary": 70000,
      "maxSalary": 100000,
      "currency": "USD"
    },
    "experienceLevel": "Senior Level",
    "jobType": "Marketing",
    "skills": ["SEO", "Content Marketing", "Social Media"],
    "postedBy": "60d5f491e82e3b001f68ddee",
    "postedDate": "2024-10-02T00:00:00Z",
    "applicationDeadline": "2024-11-02T00:00:00Z",
    "isActive": true,
    "requiredEducation": "Bachelor's Degree",
    "requiredLanguages": ["English"],
    "numberOfOpenings": 2,
    "applicationLink": "http://creativeagency.com/apply",
    "contactEmail": "jane.doe@creativeagency.com",
    "applicationInstructions": "Submit a portfolio along with your resume.",
    "benefits": ["401(k)", "Flexible Hours"],
    "workHours": "10 AM - 6 PM",
    "googleDriveFolderId": "1F2G3H4I5J"
  },
  {
    "title": "Data Analyst",
    "description": "Analyze and interpret complex data sets.",
    "companyName": "Data Solutions",
    "location": {
      "city": "Austin",
      "state": "TX",
      "country": "USA"
    },
    "employmentType": "Part-time",
    "remote": true,
    "salaryRange": {
      "minSalary": 50000,
      "maxSalary": 75000,
      "currency": "USD"
    },
    "experienceLevel": "Entry Level",
    "jobType": "Technical",
    "skills": ["Excel", "SQL", "Python"],
    "postedBy": "60d5f491e82e3b001f68ddf0",
    "postedDate": "2024-10-03T00:00:00Z",
    "applicationDeadline": "2024-11-03T00:00:00Z",
    "isActive": true,
    "requiredEducation": "Bachelor's Degree",
    "requiredLanguages": ["English"],
    "numberOfOpenings": 1,
    "applicationLink": "http://datasolutions.com/apply",
    "contactEmail": "john.brown@datasolutions.com",
    "applicationInstructions": "Attach a cover letter and resume.",
    "benefits": ["Remote Work", "Paid Training"],
    "workHours": "Flexible",
    "googleDriveFolderId": "1K2L3M4N5O"
  },
  {
    "title": "Graphic Designer",
    "description": "Create visual concepts to communicate ideas.",
    "companyName": "Design Hub",
    "location": {
      "city": "Los Angeles",
      "state": "CA",
      "country": "USA"
    },
    "employmentType": "Full-time",
    "remote": false,
    "salaryRange": {
      "minSalary": 60000,
      "maxSalary": 90000,
      "currency": "USD"
    },
    "experienceLevel": "Mid Level",
    "jobType": "Creative",
    "skills": ["Adobe Creative Suite", "Illustration"],
    "postedBy": "60d5f491e82e3b001f68ddf1",
    "postedDate": "2024-10-04T00:00:00Z",
    "applicationDeadline": "2024-11-04T00:00:00Z",
    "isActive": true,
    "requiredEducation": "Bachelor's Degree",
    "requiredLanguages": ["English"],
    "numberOfOpenings": 2,
    "applicationLink": "http://designhub.com/apply",
    "contactEmail": "alice.johnson@designhub.com",
    "applicationInstructions": "Portfolio required.",
    "benefits": ["Health Insurance", "Gym Membership"],
    "workHours": "9 AM - 5 PM",
    "googleDriveFolderId": "1P2Q3R4S5T"
  },
  {
    "title": "Project Manager",
    "description": "Oversee projects from initiation to completion.",
    "companyName": "Project Masters",
    "location": {
      "city": "Seattle",
      "state": "WA",
      "country": "USA"
    },
    "employmentType": "Full-time",
    "remote": true,
    "salaryRange": {
      "minSalary": 90000,
      "maxSalary": 130000,
      "currency": "USD"
    },
    "experienceLevel": "Senior Level",
    "jobType": "Management",
    "skills": ["Agile", "Scrum", "Leadership"],
    "postedBy": "60d5f491e82e3b001f68ddf2",
    "postedDate": "2024-10-05T00:00:00Z",
    "applicationDeadline": "2024-11-05T00:00:00Z",
    "isActive": true,
    "requiredEducation": "Bachelor's Degree",
    "requiredLanguages": ["English"],
    "numberOfOpenings": 1,
    "applicationLink": "http://projectmasters.com/apply",
    "contactEmail": "mike.wilson@projectmasters.com",
    "applicationInstructions": "CV and references required.",
    "benefits": ["Health Insurance", "Remote Work"],
    "workHours": "9 AM - 5 PM",
    "googleDriveFolderId": "1U2V3W4X5Y"
  },
  {
    "title": "Sales Representative",
    "description": "Generate leads and close sales.",
    "companyName": "Sales Corp",
    "location": {
      "city": "Miami",
      "state": "FL",
      "country": "USA"
    },
    "employmentType": "Full-time",
    "currency": "USD",
    "salaryRange": {
      "remote": false,
      "minSalary": 40000,
      "maxSalary": 60000,
    },
    "experienceLevel": "Entry Level",
    "jobType": "Sales",
    "skills": ["Communication", "Negotiation"],
    "postedBy": "60d5f491e82e3b001f68ddf3",
    "postedDate": "2024-10-06T00:00:00Z",
    "applicationDeadline": "2024-11-06T00:00:00Z",
    "isActive": true,
    "requiredEducation": "High School Diploma",
    "requiredLanguages": ["English"],
    "numberOfOpenings": 5,
    "applicationLink": "http://salescorp.com/apply",
    "contactEmail": "sara.james@salescorp.com",
    "applicationInstructions": "Apply with resume.",
    "benefits": ["Commission", "Paid Training"],
    "workHours": "9 AM - 5 PM",
    "googleDriveFolderId": "1Z2A3B4C5D"
    },
    
      {
        "title": "Software Engineer",
        "description": "Develop and maintain software applications.",
        "companyName": "Tech Innovators",
        "location": {
          "city": "New York",
          "state": "NY",
          "country": "USA"
        },
        "employmentType": "Full-time",
        "remote": true,
        "salaryRange": {
          "minSalary": 70000,
          "maxSalary": 100000,
          "currency": "USD"
        },
        "experienceLevel": "Mid Level",
        "jobType": "Technical",
        "skills": ["JavaScript", "React", "Node.js"],
        "postedBy": "ObjectId('5f50c31b5c9f4e5d3b5c4f6a')",
        "postedDate": "2024-10-22T18:27:00.000Z",
        "applicationDeadline": "2024-12-31T23:59:59.000Z",
        "isActive": true,
        "requiredEducation": "Bachelor's Degree",
        "requiredLanguages": ["English"],
        "numberOfOpenings": 2,
        "applicationLink": "https://example.com/apply",
        "contactEmail": "software+engineer@tech_123.com",
        "applicationInstructions": "Submit your resume and cover letter online.",
        "benefits": ["Health Insurance", "Paid Time Off"],
        "workHours": "9 AM - 5 PM",
        "googleDriveFolderId": "folder123"
      },
      {
        "title": "Data Analyst",
        "description": "Analyze and interpret complex data sets.",
        "companyName": "Data Solutions",
        "location": {
          "city": "San Francisco",
          "state": "CA",
          "country": "USA"
        },
        "employmentType": "Full-time",
        "remote": false,
        "salaryRange": {
          "minSalary": 60000,
          "maxSalary": 90000,
          "currency": "USD"
        },
        "experienceLevel": "Entry Level",
        "jobType": "Technical",
        "skills": ["SQL", "Python", "Data Visualization"],
        "postedBy": "ObjectId('5f50c31b5c9f4e5d3b5c4f6b')",
        "postedDate": "2024-10-22T18:27:00.000Z",
        "applicationDeadline": "2024-11-30T23:59:59.000Z",
        "isActive": true,
        "requiredEducation": "Bachelor's Degree",
        "requiredLanguages": ["English"],
        "numberOfOpenings": 1,
        "applicationLink": "https://example.com/apply",
        "contactEmail": "data#analyst@solutions_456.com",
        "applicationInstructions": "Include a portfolio of your work.",
        "benefits": ["Retirement Plan", "Gym Membership"],
        "workHours": "9 AM - 5 PM",
        "googleDriveFolderId": "folder456"
      },
      {
        "title": "Marketing Manager",
        "description": "Lead marketing campaigns and strategies.",
        "companyName": "Creative Corp",
        "location": {
          "city": "Los Angeles",
          "state": "CA",
          "country": "USA"
        },
        "employmentType": "Full-time",
        "remote": true,
        "salaryRange": {
          "minSalary": 80000,
          "maxSalary": 110000,
          "currency": "USD"
        },
        "experienceLevel": "Senior Level",
        "jobType": "Marketing",
        "skills": ["SEO", "Content Marketing", "Social Media"],
        "postedBy": "ObjectId('5f50c31b5c9f4e5d3b5c4f6c')",
        "postedDate": "2024-10-22T18:27:00.000Z",
        "applicationDeadline": "2024-12-15T23:59:59.000Z",
        "isActive": true,
        "requiredEducation": "Master's Degree",
        "requiredLanguages": ["English"],
        "numberOfOpenings": 1,
        "applicationLink": "https://example.com/apply",
        "contactEmail": "marketing.manager@creative_789.com",
        "applicationInstructions": "Submit your marketing portfolio.",
        "benefits": ["Health Insurance", "Paid Time Off", "Stock Options"],
        "workHours": "9 AM - 5 PM",
        "googleDriveFolderId": "folder789"
      },
      {
        "title": "UX Designer",
        "description": "Design intuitive user experiences.",
        "companyName": "Design Studios",
        "location": {
          "city": "Austin",
          "state": "TX",
          "country": "USA"
        },
        "employmentType": "Part-time",
        "remote": false,
        "salaryRange": {
          "minSalary": 40000,
          "maxSalary": 60000,
          "currency": "USD"
        },
        "experienceLevel": "Mid Level",
        "jobType": "Technical",
        "skills": ["Wireframing", "Prototyping", "User Research"],
        "postedBy": "ObjectId('5f50c31b5c9f4e5d3b5c4f6d')",
        "postedDate": "2024-10-22T18:27:00.000Z",
        "applicationDeadline": "2024-12-01T23:59:59.000Z",
        "isActive": true,
        "requiredEducation": "Bachelor's Degree",
        "requiredLanguages": ["English"],
        "numberOfOpenings": 1,
        "applicationLink": "https://example.com/apply",
        "contactEmail": "ux.designer@studios_321.com",
        "applicationInstructions": "Provide links to your design portfolio.",
        "benefits": ["Health Insurance"],
        "workHours": "9 AM - 2 PM",
        "googleDriveFolderId": "folder321"
      },
      {
        "title": "Product Manager",
        "description": "Oversee product development and launch.",
        "companyName": "Innovatech",
        "location": {
          "city": "Seattle",
          "state": "WA",
          "country": "USA"
        },
        "employmentType": "Full-time",
        "remote": true,
        "salaryRange": {
          "minSalary": 90000,
          "maxSalary": 120000,
          "currency": "USD"
        },
        "experienceLevel": "Senior Level",
        "jobType": "Technical",
        "skills": ["Product Roadmapping", "Agile Methodology", "Stakeholder Management"],
        "postedBy": "ObjectId('5f50c31b5c9f4e5d3b5c4f6e')",
        "postedDate": "2024-10-22T18:27:00.000Z",
        "applicationDeadline": "2024-12-31T23:59:59.000Z",
        "isActive": true,
        "requiredEducation": "Master's Degree",
        "requiredLanguages": ["English"],
        "numberOfOpenings": 1,
        "applicationLink": "https://example.com/apply",
        "contactEmail": "product.manager@innovatech_987.com",
        "applicationInstructions": "Provide a cover letter and resume.",
        "benefits": ["Health Insurance", "Paid Time Off", "Work From Home Allowance"],
        "workHours": "9 AM - 5 PM",
        "googleDriveFolderId": "folder987"
      },
      {
        "title": "HR Specialist",
        "description": "Manage recruitment and employee relations.",
        "companyName": "People First",
        "location": {
          "city": "Chicago",
          "state": "IL",
          "country": "USA"
        },
        "employmentType": "Full-time",
        "remote": false,
        "salaryRange": {
          "minSalary": 50000,
          "maxSalary": 70000,
          "currency": "USD"
        },
        "experienceLevel": "Mid Level",
        "jobType": "Administrative",
        "skills": ["HRIS", "Recruitment", "Employee Relations"],
        "postedBy": "ObjectId('5f50c31b5c9f4e5d3b5c4f6f')",
        "postedDate": "2024-10-22T18:27:00.000Z",
        "applicationDeadline": "2024-11-30T23:59:59.000Z",
        "isActive": true,
        "requiredEducation": "Bachelor's Degree",
        "requiredLanguages": ["English"],
        "numberOfOpenings": 1,
        "applicationLink": "https://example.com/apply",
        "contactEmail": "hr.specialist@peoplefirst_654.com",
        "applicationInstructions": "Submit your resume and cover letter.",
        "benefits": ["Health Insurance", "Retirement Plan"],
        "workHours": "9 AM - 5 PM",
        "googleDriveFolderId": "folder654"
      } 
     ]
  