"use client"

import { useResumeStore } from "@/lib/resume-store"

export default function ATSView() {
  const { data } = useResumeStore()
  const { personalInfo, summary, workExperience, education, skills, languages, certifications, references } = data

  return (
    <div className="bg-white dark:bg-slate-900 text-black dark:text-white rounded-lg p-8 font-mono text-sm whitespace-pre-wrap">
      {/* Personal Information */}
      <div className="mb-6">
        <p className="font-bold">
          {personalInfo.firstName} {personalInfo.lastName}
        </p>
        <p>{personalInfo.title}</p>
        <p>
          {personalInfo.email} | {personalInfo.phone}
        </p>
        <p>{personalInfo.location}</p>
        {personalInfo.linkedin && <p>{personalInfo.linkedin}</p>}
        {personalInfo.website && <p>{personalInfo.website}</p>}
      </div>

      {/* Summary */}
      <div className="mb-6">
        <p className="font-bold uppercase">PROFESSIONAL SUMMARY</p>
        <p>{summary}</p>
      </div>

      {/* Work Experience */}
      <div className="mb-6">
        <p className="font-bold uppercase">WORK EXPERIENCE</p>
        {workExperience.map((exp) => (
          <div key={exp.id} className="mb-4">
            <p>{exp.title}</p>
            <p>
              {exp.company} | {exp.startDate} - {exp.endDate}
            </p>
            {exp.bullets.map((bullet, index) => (
              <p key={index}>• {bullet}</p>
            ))}
          </div>
        ))}
      </div>

      {/* Education */}
      <div className="mb-6">
        <p className="font-bold uppercase">EDUCATION</p>
        {education.map((edu) => (
          <div key={edu.id} className="mb-2">
            <p>{edu.degree}</p>
            <p>
              {edu.institution} | {edu.startDate} - {edu.endDate}
            </p>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className="mb-6">
        <p className="font-bold uppercase">SKILLS</p>
        <p>{skills.join(", ")}</p>
      </div>

      {/* Languages */}
      {languages && languages.length > 0 && (
        <div className="mb-6">
          <p className="font-bold uppercase">LANGUAGES</p>
          {languages.map((lang, index) => (
            <p key={index}>
              {lang.language}: {lang.proficiency}
            </p>
          ))}
        </div>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <div className="mb-6">
          <p className="font-bold uppercase">CERTIFICATIONS</p>
          {certifications.map((cert) => (
            <div key={cert.id} className="mb-2">
              <p>{cert.name}</p>
              <p>
                {cert.issuer} | {cert.date}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* References */}
      {references && references.length > 0 && (
        <div className="mb-6">
          <p className="font-bold uppercase">REFERENCES</p>
          {references.map((ref) => (
            <div key={ref.id} className="mb-2">
              <p>{ref.name}</p>
              <p>
                {ref.position}, {ref.company}
              </p>
              <p>{ref.contact}</p>
              {ref.phone && <p>{ref.phone}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

