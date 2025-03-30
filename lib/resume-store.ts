import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface WorkExperience {
  id: string
  title: string
  company: string
  startDate: string
  endDate: string
  description: string
  bullets: string[]
}

export interface Education {
  id: string
  degree: string
  institution: string
  startDate: string
  endDate: string
  description?: string
}

export interface ResumeData {
  personalInfo: {
    firstName: string
    lastName: string
    title: string
    email: string
    phone: string
    location: string
    linkedin: string
    website?: string
    profilePicture?: string
    twitter?: string
    github?: string
  }
  summary: string
  workExperience: WorkExperience[]
  education: Education[]
  skills: string[]
  projects?: {
    id: string
    title: string
    description: string
  }[]
  languages?: {
    language: string
    proficiency: string
  }[]
  certifications?: {
    id: string
    name: string
    issuer: string
    date: string
  }[]
  references?: {
    id: string
    name: string
    position: string
    company: string
    contact: string
    phone?: string
  }[]
}

interface ResumeState {
  data: ResumeData
  template: string
  savedVersions: {
    id: string
    name: string
    date: string
    data: ResumeData
    template: string
  }[]
  updatePersonalInfo: (info: Partial<ResumeData["personalInfo"]>) => void
  updateSummary: (summary: string) => void
  addWorkExperience: (experience: Omit<WorkExperience, "id">) => void
  updateWorkExperience: (id: string, experience: Partial<WorkExperience>) => void
  removeWorkExperience: (id: string) => void
  addEducation: (education: Omit<Education, "id">) => void
  updateEducation: (id: string, education: Partial<Education>) => void
  removeEducation: (id: string) => void
  addSkill: (skill: string) => void
  removeSkill: (skill: string) => void
  setTemplate: (template: string) => void
  saveVersion: (name: string) => void
  loadVersion: (id: string) => void
  deleteVersion: (id: string) => void
  moveWorkExperienceUp: (id: string) => void
  moveWorkExperienceDown: (id: string) => void
  addLanguage: (language: string, proficiency: string) => void
  removeLanguage: (language: string) => void
  addCertification: (certification: { name: string; issuer: string; date: string }) => void
  removeCertification: (id: string) => void
  addReference: (reference: { name: string; position: string; company: string; contact: string }) => void
  removeReference: (id: string) => void
  setProfilePicture: (url: string) => void
}

const defaultResumeData: ResumeData = {
  personalInfo: {
    firstName: "John",
    lastName: "Doe",
    title: "Senior Product Manager",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    location: "Accra, Ghana",
    linkedin: "linkedin.com/in/johndoe",
    website: "johndoe.com",
    profilePicture: "/placeholder.svg?height=200&width=200",
    twitter: "@johndoe",
    github: "github.com/johndoe",
  },
  summary:
    "Results-driven product manager with 7+ years of experience leading cross-functional teams to deliver innovative solutions. Proven track record of increasing user engagement and driving revenue growth through data-informed product decisions.",
  workExperience: [
    {
      id: "1",
      title: "Senior Product Manager",
      company: "Example Tech Inc.",
      startDate: "Jan 2020",
      endDate: "Present",
      description: "",
      bullets: [
        "Led product strategy for flagship SaaS platform, resulting in 45% YoY revenue growth",
        "Managed a team of 5 product owners across 3 product lines",
        "Implemented user research program that increased customer satisfaction by 32%",
      ],
    },
    {
      id: "2",
      title: "Product Manager",
      company: "Tech Solutions Co.",
      startDate: "Mar 2017",
      endDate: "Dec 2019",
      description: "",
      bullets: [
        "Developed product roadmap and executed release strategy for mobile application",
        "Collaborated with engineering to deliver features on time and within budget",
        "Conducted competitive analysis to identify market opportunities",
      ],
    },
  ],
  education: [
    {
      id: "1",
      degree: "MBA, Business Administration",
      institution: "University of Ghana",
      startDate: "Sep 2015",
      endDate: "Jun 2017",
    },
    {
      id: "2",
      degree: "BS, Computer Science",
      institution: "Kwame Nkrumah University of Science and Technology",
      startDate: "Sep 2011",
      endDate: "May 2015",
    },
  ],
  skills: [
    "Product Management",
    "Team Leadership",
    "Strategic Planning",
    "User Research",
    "Agile Methodologies",
    "Data Analysis",
  ],
  languages: [
    {
      language: "English",
      proficiency: "Native",
    },
    {
      language: "French",
      proficiency: "Intermediate",
    },
    {
      language: "Twi",
      proficiency: "Fluent",
    },
  ],
  certifications: [
    {
      id: "1",
      name: "Certified Scrum Product Owner (CSPO)",
      issuer: "Scrum Alliance",
      date: "Jan 2019",
    },
    {
      id: "2",
      name: "Professional Product Manager (PPM)",
      issuer: "Product Management Institute",
      date: "Mar 2020",
    },
  ],
  references: [
    {
      id: "1",
      name: "Dr. Kofi Mensah",
      position: "Director of Technology",
      company: "Tech Solutions Ghana",
      contact: "kofi.mensah@example.com",
    },
  ],
}

export const useResumeStore = create<ResumeState>()(
  persist(
    (set, get) => ({
      data: defaultResumeData,
      template: "modern",
      savedVersions: [],

      updatePersonalInfo: (info) =>
        set((state) => ({
          data: {
            ...state.data,
            personalInfo: {
              ...state.data.personalInfo,
              ...info,
            },
          },
        })),

      updateSummary: (summary) =>
        set((state) => ({
          data: {
            ...state.data,
            summary,
          },
        })),

      addWorkExperience: (experience) =>
        set((state) => ({
          data: {
            ...state.data,
            workExperience: [
              ...state.data.workExperience,
              {
                ...experience,
                id: Date.now().toString(),
                bullets: experience.bullets || [],
              },
            ],
          },
        })),

      updateWorkExperience: (id, experience) =>
        set((state) => ({
          data: {
            ...state.data,
            workExperience: state.data.workExperience.map((exp) => (exp.id === id ? { ...exp, ...experience } : exp)),
          },
        })),

      removeWorkExperience: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            workExperience: state.data.workExperience.filter((exp) => exp.id !== id),
          },
        })),

      addEducation: (education) =>
        set((state) => ({
          data: {
            ...state.data,
            education: [
              ...state.data.education,
              {
                ...education,
                id: Date.now().toString(),
              },
            ],
          },
        })),

      updateEducation: (id, education) =>
        set((state) => ({
          data: {
            ...state.data,
            education: state.data.education.map((edu) => (edu.id === id ? { ...edu, ...education } : edu)),
          },
        })),

      removeEducation: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            education: state.data.education.filter((edu) => edu.id !== id),
          },
        })),

      addSkill: (skill) =>
        set((state) => ({
          data: {
            ...state.data,
            skills: [...state.data.skills, skill],
          },
        })),

      removeSkill: (skill) =>
        set((state) => ({
          data: {
            ...state.data,
            skills: state.data.skills.filter((s) => s !== skill),
          },
        })),

      setTemplate: (template) => set({ template }),

      saveVersion: (name) =>
        set((state) => ({
          savedVersions: [
            ...state.savedVersions,
            {
              id: Date.now().toString(),
              name,
              date: new Date().toISOString(),
              data: JSON.parse(JSON.stringify(state.data)),
              template: state.template,
            },
          ],
        })),

      loadVersion: (id) => {
        const version = get().savedVersions.find((v) => v.id === id)
        if (version) {
          set({
            data: JSON.parse(JSON.stringify(version.data)),
            template: version.template,
          })
        }
      },

      deleteVersion: (id) =>
        set((state) => ({
          savedVersions: state.savedVersions.filter((v) => v.id !== id),
        })),

      moveWorkExperienceUp: (id) =>
        set((state) => {
          const experiences = [...state.data.workExperience]
          const index = experiences.findIndex((exp) => exp.id === id)
          if (index <= 0) return state

          const temp = experiences[index]
          experiences[index] = experiences[index - 1]
          experiences[index - 1] = temp

          return {
            data: {
              ...state.data,
              workExperience: experiences,
            },
          }
        }),

      moveWorkExperienceDown: (id) =>
        set((state) => {
          const experiences = [...state.data.workExperience]
          const index = experiences.findIndex((exp) => exp.id === id)
          if (index === -1 || index >= experiences.length - 1) return state

          const temp = experiences[index]
          experiences[index] = experiences[index + 1]
          experiences[index + 1] = temp

          return {
            data: {
              ...state.data,
              workExperience: experiences,
            },
          }
        }),

      addLanguage: (language, proficiency) =>
        set((state) => {
          const languages = state.data.languages || []
          return {
            data: {
              ...state.data,
              languages: [...languages, { language, proficiency }],
            },
          }
        }),

      removeLanguage: (language) =>
        set((state) => {
          const languages = state.data.languages || []
          return {
            data: {
              ...state.data,
              languages: languages.filter((l) => l.language !== language),
            },
          }
        }),

      addCertification: (certification) =>
        set((state) => {
          const certifications = state.data.certifications || []
          return {
            data: {
              ...state.data,
              certifications: [...certifications, { ...certification, id: Date.now().toString() }],
            },
          }
        }),

      removeCertification: (id) =>
        set((state) => {
          const certifications = state.data.certifications || []
          return {
            data: {
              ...state.data,
              certifications: certifications.filter((c) => c.id !== id),
            },
          }
        }),

      addReference: (reference) =>
        set((state) => {
          const references = state.data.references || []
          return {
            data: {
              ...state.data,
              references: [...references, { ...reference, id: Date.now().toString() }],
            },
          }
        }),

      removeReference: (id) =>
        set((state) => {
          const references = state.data.references || []
          return {
            data: {
              ...state.data,
              references: references.filter((r) => r.id !== id),
            },
          }
        }),

      setProfilePicture: (url) =>
        set((state) => ({
          data: {
            ...state.data,
            personalInfo: {
              ...state.data.personalInfo,
              profilePicture: url,
            },
          },
        })),
    }),
    {
      name: "resume-storage",
    },
  ),
)

