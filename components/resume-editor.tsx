"use client";
import { useResumeStore } from "@/lib/resume-store";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Globe,
  Twitter,
  Github,
} from "lucide-react";
import type { ResumeSettings } from "./resume-settings-dialog";

interface ResumeEditorProps {
  template: string;
  settings?: ResumeSettings;
}

export default function ResumeEditor({
  template,
  settings,
}: ResumeEditorProps) {
  const { data } = useResumeStore();
  const {
    personalInfo,
    summary,
    workExperience,
    education,
    skills,
    languages,
    certifications,
    references,
  } = data;

  // Apply settings if provided
  const defaultSettings: ResumeSettings = {
    fontSize: 1,
    lineSpacing: 1,
    showProfilePicture: true,
    showReferences: true,
    showCertifications: true,
    showLanguages: true,
    fontFamily: "default",
  };

  const appliedSettings = settings || defaultSettings;

  // Choose template rendering based on template ID
  switch (template) {
    case "ghana-formal":
      return <GhanaFormalTemplate data={data} settings={appliedSettings} />;
    case "ghana-modern":
      return <GhanaModernTemplate data={data} settings={appliedSettings} />;
    case "ghana-professional":
      return (
        <GhanaProfessionalTemplate data={data} settings={appliedSettings} />
      );
    default:
      return (
        <DefaultTemplate
          data={data}
          template={template}
          settings={appliedSettings}
        />
      );
  }
}

// Define interfaces for the template components
interface TemplateProps {
  data: {
    personalInfo: {
      firstName: string;
      lastName: string;
      title: string;
      email: string;
      phone: string;
      location: string;
      linkedin?: string;
      website?: string;
      twitter?: string;
      github?: string;
      profilePicture?: string;
    };
    summary: string;
    workExperience: Array<{
      id: string;
      title: string;
      company: string;
      startDate: string;
      endDate: string;
      bullets: string[];
    }>;
    education: Array<{
      id: string;
      degree: string;
      institution: string;
      startDate: string;
      endDate: string;
    }>;
    skills: string[];
    languages?: Array<{
      language: string;
      proficiency: string;
    }>;
    certifications?: Array<{
      id: string;
      name: string;
      issuer: string;
      date: string;
    }>;
    references?: Array<{
      id: string;
      name: string;
      position: string;
      company: string;
      contact: string;
      phone?: string;
    }>;
  };
  settings: ResumeSettings;
}

interface DefaultTemplateProps extends TemplateProps {
  template: string;
}

// Default template with different styling options
function DefaultTemplate({ data, template, settings }: DefaultTemplateProps) {
  const {
    personalInfo,
    summary,
    workExperience,
    education,
    skills,
    languages,
    certifications,
    references,
  } = data;

  const getTemplateStyles = () => {
    switch (template) {
      case "professional":
        return {
          headerBg: "bg-blue-50 dark:bg-blue-950",
          accentColor: "border-blue-500",
          sectionTitle: "text-blue-700 dark:text-blue-300",
        };
      case "creative":
        return {
          headerBg: "bg-purple-50 dark:bg-purple-950",
          accentColor: "border-purple-500",
          sectionTitle: "text-purple-700 dark:text-purple-300",
        };
      case "minimal":
        return {
          headerBg: "bg-gray-50 dark:bg-gray-900",
          accentColor: "border-gray-400",
          sectionTitle: "text-gray-700 dark:text-gray-300",
        };
      case "executive":
        return {
          headerBg: "bg-slate-100 dark:bg-slate-900",
          accentColor: "border-slate-600",
          sectionTitle: "text-slate-800 dark:text-slate-200",
        };
      case "technical":
        return {
          headerBg: "bg-cyan-50 dark:bg-cyan-950",
          accentColor: "border-cyan-500",
          sectionTitle: "text-cyan-700 dark:text-cyan-300",
        };
      case "academic":
        return {
          headerBg: "bg-amber-50 dark:bg-amber-950",
          accentColor: "border-amber-500",
          sectionTitle: "text-amber-700 dark:text-amber-300",
        };
      case "elegant":
        return {
          headerBg: "bg-emerald-50 dark:bg-emerald-950",
          accentColor: "border-emerald-500",
          sectionTitle: "text-emerald-700 dark:text-emerald-300",
        };
      default: // modern
        return {
          headerBg: "bg-slate-50 dark:bg-slate-800",
          accentColor: "border-primary",
          sectionTitle: "text-primary",
        };
    }
  };

  const styles = getTemplateStyles();

  return (
    <div className="bg-white dark:bg-slate-900 text-black dark:text-white rounded-lg shadow-lg overflow-auto max-h-[800px]">
      <div className="p-8 aspect-[8.5/11] mx-auto max-w-[800px]">
        {/* Header */}
        <div className={`p-6 mb-6 rounded-lg ${styles.headerBg}`}>
          <h1 className="text-3xl font-bold">
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          <p className="text-xl">{personalInfo.title}</p>
          <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 text-sm">
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              <p>{personalInfo.email}</p>
            </div>
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              <p>{personalInfo.phone}</p>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <p>{personalInfo.location}</p>
            </div>
            {personalInfo.linkedin && (
              <div className="flex items-center gap-1">
                <Linkedin className="h-4 w-4" />
                <p>{personalInfo.linkedin}</p>
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-center gap-1">
                <Globe className="h-4 w-4" />
                <p>{personalInfo.website}</p>
              </div>
            )}
            {personalInfo.twitter && (
              <div className="flex items-center gap-1">
                <Twitter className="h-4 w-4" />
                <p>{personalInfo.twitter}</p>
              </div>
            )}
            {personalInfo.github && (
              <div className="flex items-center gap-1">
                <Github className="h-4 w-4" />
                <p>{personalInfo.github}</p>
              </div>
            )}
          </div>
        </div>

        {/* Two column layout */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left column */}
          <div className="w-full md:w-1/3 space-y-6">
            <div>
              <h2
                className={`text-sm font-bold mb-3 uppercase ${styles.sectionTitle}`}
              >
                Skills
              </h2>
              <div className="space-y-2">
                {skills.map((skill, index) => (
                  <p key={index}>{skill}</p>
                ))}
              </div>
            </div>

            <div>
              <h2
                className={`text-sm font-bold mb-3 uppercase ${styles.sectionTitle}`}
              >
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <p className="font-medium">{edu.degree}</p>
                    <p>{edu.institution}</p>
                    <p className="text-sm text-muted-foreground">
                      {edu.startDate} - {edu.endDate}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {languages && languages.length > 0 && settings.showLanguages && (
              <div>
                <h2
                  className={`text-sm font-bold mb-3 uppercase ${styles.sectionTitle}`}
                >
                  Languages
                </h2>
                <div className="space-y-2">
                  {languages.map((lang, index) => (
                    <div key={index} className="flex justify-between">
                      <p>{lang.language}</p>
                      <p className="text-sm text-muted-foreground">
                        {lang.proficiency}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {certifications &&
              certifications.length > 0 &&
              settings.showCertifications && (
                <div>
                  <h2
                    className={`text-sm font-bold mb-3 uppercase ${styles.sectionTitle}`}
                  >
                    Certifications
                  </h2>
                  <div className="space-y-3">
                    {certifications.map((cert) => (
                      <div key={cert.id}>
                        <p className="font-medium">{cert.name}</p>
                        <p className="text-sm">{cert.issuer}</p>
                        <p className="text-sm text-muted-foreground">
                          {cert.date}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>

          {/* Right column */}
          <div className="w-full md:w-2/3 space-y-6">
            <div>
              <h2
                className={`text-sm font-bold mb-3 uppercase ${styles.sectionTitle}`}
              >
                Professional Summary
              </h2>
              <p>{summary}</p>
            </div>

            <div>
              <h2
                className={`text-sm font-bold mb-3 uppercase ${styles.sectionTitle}`}
              >
                Work Experience
              </h2>

              {workExperience.map((exp, index) => (
                <div
                  key={exp.id}
                  className={`border-l-2 pl-4 ${
                    index < workExperience.length - 1 ? "pb-6" : ""
                  } ${styles.accentColor}`}
                >
                  <p className="font-medium">{exp.title}</p>
                  <p className="text-muted-foreground">
                    {exp.company} | {exp.startDate} - {exp.endDate}
                  </p>
                  <ul className="list-disc ml-5 mt-2 space-y-1">
                    {exp.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex}>{bullet}</li>
                    ))}
                  </ul>

                  {index < workExperience.length - 1 && (
                    <div className="h-4"></div>
                  )}
                </div>
              ))}
            </div>

            {references && references.length > 0 && settings.showReferences && (
              <div>
                <h2
                  className={`text-sm font-bold mb-3 uppercase ${styles.sectionTitle}`}
                >
                  References
                </h2>
                <div className="space-y-4">
                  {references.map((ref) => (
                    <div key={ref.id}>
                      <p className="font-medium">{ref.name}</p>
                      <p>
                        {ref.position}, {ref.company}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {ref.contact}
                      </p>
                      {ref.phone && (
                        <p className="text-sm text-muted-foreground">
                          {ref.phone}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Ghana Formal Template - Traditional formal CV style used in Ghana
function GhanaFormalTemplate({ data, settings }: TemplateProps) {
  const {
    personalInfo,
    summary,
    workExperience,
    education,
    skills,
    languages,
    certifications,
    references,
  } = data;
  const hasProfilePicture =
    personalInfo.profilePicture &&
    personalInfo.profilePicture !== "/placeholder.svg?height=200&width=200" &&
    personalInfo.profilePicture !== "" &&
    settings.showProfilePicture;

  return (
    <div className="bg-white dark:bg-slate-900 text-black dark:text-white rounded-lg shadow-lg overflow-auto max-h-[800px]">
      <div className="p-8 aspect-[8.5/11] mx-auto max-w-[800px]">
        {/* Header with profile picture */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6 pb-6 border-b-2 border-gray-200 dark:border-gray-700">
          {hasProfilePicture && (
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-300 dark:border-gray-600">
              <Image
                src={personalInfo.profilePicture || "/placeholder.svg"}
                alt="Profile"
                width={128}
                height={128}
                className="object-cover h-full w-full"
              />
            </div>
          )}

          <div
            className={`flex-1 ${
              hasProfilePicture ? "text-center md:text-left" : "text-center"
            }`}
          >
            <h1 className="text-3xl font-bold uppercase tracking-wider">
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            <p className="text-xl font-medium mt-1 mb-3">
              {personalInfo.title}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                <p>{personalInfo.email}</p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                <p>{personalInfo.phone}</p>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                <p>{personalInfo.location}</p>
              </div>
              {personalInfo.linkedin && (
                <div className="flex items-center gap-2">
                  <Linkedin className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  <p>{personalInfo.linkedin}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Personal Statement */}
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wider mb-2 border-b border-gray-300 dark:border-gray-700 pb-1">
            Personal Statement
          </h2>
          <p>{summary}</p>
        </div>

        {/* Work Experience */}
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wider mb-2 border-b border-gray-300 dark:border-gray-700 pb-1">
            Work Experience
          </h2>
          <div className="space-y-4">
            {workExperience.map((exp) => (
              <div key={exp.id}>
                <div className="flex flex-col md:flex-row md:justify-between">
                  <h3 className="font-bold">{exp.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {exp.startDate} - {exp.endDate}
                  </p>
                </div>
                <p className="font-medium">{exp.company}</p>
                <ul className="list-disc ml-5 mt-2 space-y-1">
                  {exp.bullets.map((bullet, index) => (
                    <li key={index}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wider mb-2 border-b border-gray-300 dark:border-gray-700 pb-1">
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex flex-col md:flex-row md:justify-between">
                  <h3 className="font-bold">{edu.degree}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {edu.startDate} - {edu.endDate}
                  </p>
                </div>
                <p>{edu.institution}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Two column layout for skills and other sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Skills */}
          <div>
            <h2 className="text-lg font-bold uppercase tracking-wider mb-2 border-b border-gray-300 dark:border-gray-700 pb-1">
              Skills
            </h2>
            <ul className="list-disc ml-5 space-y-1">
              {skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>

          {/* Languages */}
          {languages && languages.length > 0 && settings.showLanguages && (
            <div>
              <h2 className="text-lg font-bold uppercase tracking-wider mb-2 border-b border-gray-300 dark:border-gray-700 pb-1">
                Languages
              </h2>
              <ul className="space-y-1">
                {languages.map((lang, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{lang.language}</span>
                    <span className="text-gray-600 dark:text-gray-400">
                      {lang.proficiency}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Certifications */}
          {certifications &&
            certifications.length > 0 &&
            settings.showCertifications && (
              <div>
                <h2 className="text-lg font-bold uppercase tracking-wider mb-2 border-b border-gray-300 dark:border-gray-700 pb-1">
                  Certifications
                </h2>
                <div className="space-y-2">
                  {certifications.map((cert) => (
                    <div key={cert.id}>
                      <p className="font-medium">{cert.name}</p>
                      <p className="text-sm">
                        {cert.issuer} ({cert.date})
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* References */}
          {references && references.length > 0 && settings.showReferences && (
            <div>
              <h2 className="text-lg font-bold uppercase tracking-wider mb-2 border-b border-gray-300 dark:border-gray-700 pb-1">
                References
              </h2>
              <div className="space-y-3">
                {references.map((ref) => (
                  <div key={ref.id}>
                    <p className="font-medium">{ref.name}</p>
                    <p>
                      {ref.position}, {ref.company}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {ref.contact}
                    </p>
                    {ref.phone && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {ref.phone}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Ghana Modern Template - Contemporary style with Ghana-specific elements
function GhanaModernTemplate({ data, settings }: TemplateProps) {
  const {
    personalInfo,
    summary,
    workExperience,
    education,
    skills,
    languages,
    certifications,
    references,
  } = data;
  const hasProfilePicture =
    personalInfo.profilePicture &&
    personalInfo.profilePicture !== "/placeholder.svg?height=200&width=200" &&
    personalInfo.profilePicture !== "" &&
    settings.showProfilePicture;

  return (
    <div className="bg-white dark:bg-slate-900 text-black dark:text-white rounded-lg shadow-lg overflow-auto max-h-[800px]">
      <div className="aspect-[8.5/11] mx-auto max-w-[800px]">
        {/* Header with accent color */}
        <div className="bg-green-700 dark:bg-green-900 text-white p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Profile picture */}
            {hasProfilePicture && (
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-yellow-400 dark:border-yellow-500 bg-white">
                <Image
                  src={personalInfo.profilePicture || "/placeholder.svg"}
                  alt="Profile"
                  width={128}
                  height={128}
                  className="object-cover h-full w-full"
                />
              </div>
            )}

            {/* Name and title */}
            <div
              className={`flex-1 ${
                hasProfilePicture ? "text-center md:text-left" : "text-center"
              }`}
            >
              <h1 className="text-3xl font-bold">
                {personalInfo.firstName} {personalInfo.lastName}
              </h1>
              <p className="text-xl text-yellow-300 dark:text-yellow-400 font-medium mt-1">
                {personalInfo.title}
              </p>
            </div>
          </div>

          {/* Contact info */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-yellow-300" />
              <p>{personalInfo.email}</p>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-yellow-300" />
              <p>{personalInfo.phone}</p>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-yellow-300" />
              <p>{personalInfo.location}</p>
            </div>
            {personalInfo.linkedin && (
              <div className="flex items-center gap-2">
                <Linkedin className="h-4 w-4 text-yellow-300" />
                <p>{personalInfo.linkedin}</p>
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-yellow-300" />
                <p>{personalInfo.website}</p>
              </div>
            )}
          </div>
        </div>

        {/* Main content */}
        <div className="p-8">
          {/* Summary */}
          <div className="mb-6">
            <h2 className="text-lg font-bold text-green-700 dark:text-green-500 border-b-2 border-green-700 dark:border-green-500 pb-1 mb-3">
              PROFESSIONAL SUMMARY
            </h2>
            <p>{summary}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left column */}
            <div className="md:col-span-2 space-y-6">
              {/* Work Experience */}
              <div>
                <h2 className="text-lg font-bold text-green-700 dark:text-green-500 border-b-2 border-green-700 dark:border-green-500 pb-1 mb-3">
                  WORK EXPERIENCE
                </h2>
                <div className="space-y-5">
                  {workExperience.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex flex-col md:flex-row md:justify-between">
                        <h3 className="font-bold">{exp.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {exp.startDate} - {exp.endDate}
                        </p>
                      </div>
                      <p className="font-medium text-green-700 dark:text-green-500">
                        {exp.company}
                      </p>
                      <ul className="list-disc ml-5 mt-2 space-y-1">
                        {exp.bullets.map((bullet, index) => (
                          <li key={index}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <h2 className="text-lg font-bold text-green-700 dark:text-green-500 border-b-2 border-green-700 dark:border-green-500 pb-1 mb-3">
                  EDUCATION
                </h2>
                <div className="space-y-4">
                  {education.map((edu) => (
                    <div key={edu.id}>
                      <div className="flex flex-col md:flex-row md:justify-between">
                        <h3 className="font-bold">{edu.degree}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {edu.startDate} - {edu.endDate}
                        </p>
                      </div>
                      <p className="text-green-700 dark:text-green-500">
                        {edu.institution}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-6">
              {/* Skills */}
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                <h2 className="text-lg font-bold text-green-700 dark:text-green-500 border-b-2 border-green-700 dark:border-green-500 pb-1 mb-3">
                  SKILLS
                </h2>
                <div className="space-y-2">
                  {skills.map((skill, index) => (
                    <div
                      key={index}
                      className="bg-white dark:bg-gray-700 px-3 py-2 rounded-md shadow-sm"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>

              {/* Languages */}
              {languages && languages.length > 0 && settings.showLanguages && (
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <h2 className="text-lg font-bold text-green-700 dark:text-green-500 border-b-2 border-green-700 dark:border-green-500 pb-1 mb-3">
                    LANGUAGES
                  </h2>
                  <div className="space-y-2">
                    {languages.map((lang, index) => (
                      <div key={index} className="flex justify-between">
                        <span>{lang.language}</span>
                        <span className="text-green-700 dark:text-green-500 font-medium">
                          {lang.proficiency}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Certifications */}
              {certifications &&
                certifications.length > 0 &&
                settings.showCertifications && (
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                    <h2 className="text-lg font-bold text-green-700 dark:text-green-500 border-b-2 border-green-700 dark:border-green-500 pb-1 mb-3">
                      CERTIFICATIONS
                    </h2>
                    <div className="space-y-3">
                      {certifications.map((cert) => (
                        <div key={cert.id}>
                          <p className="font-medium">{cert.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {cert.issuer} • {cert.date}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* References */}
              {references &&
                references.length > 0 &&
                settings.showReferences && (
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                    <h2 className="text-lg font-bold text-green-700 dark:text-green-500 border-b-2 border-green-700 dark:border-green-500 pb-1 mb-3">
                      REFERENCES
                    </h2>
                    <div className="space-y-3">
                      {references.map((ref) => (
                        <div key={ref.id}>
                          <p className="font-medium">{ref.name}</p>
                          <p className="text-sm">
                            {ref.position}, {ref.company}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {ref.contact}
                          </p>
                          {ref.phone && (
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {ref.phone}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Ghana Professional Template - Business-oriented template with Ghana-specific elements
function GhanaProfessionalTemplate({ data, settings }: TemplateProps) {
  const {
    personalInfo,
    summary,
    workExperience,
    education,
    skills,
    languages,
    certifications,
    references,
  } = data;
  const hasProfilePicture =
    personalInfo.profilePicture &&
    personalInfo.profilePicture !== "/placeholder.svg?height=200&width=200" &&
    personalInfo.profilePicture !== "" &&
    settings.showProfilePicture;

  return (
    <div className="bg-white dark:bg-slate-900 text-black dark:text-white rounded-lg shadow-lg overflow-auto max-h-[800px]">
      <div className="aspect-[8.5/11] mx-auto max-w-[800px]">
        {/* Header with profile picture */}
        <div className="flex flex-col md:flex-row gap-6 p-8 border-b-4 border-red-700 dark:border-red-600">
          {hasProfilePicture && (
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-300 dark:border-gray-600 flex-shrink-0">
              <Image
                src={personalInfo.profilePicture || "/placeholder.svg"}
                alt="Profile"
                width={128}
                height={128}
                className="object-cover h-full w-full"
              />
            </div>
          )}

          <div>
            <h1 className="text-3xl font-bold text-red-700 dark:text-red-500">
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            <p className="text-xl font-medium mb-3">{personalInfo.title}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-red-700 dark:text-red-500" />
                <p>{personalInfo.email}</p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-red-700 dark:text-red-500" />
                <p>{personalInfo.phone}</p>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-red-700 dark:text-red-500" />
                <p>{personalInfo.location}</p>
              </div>
              {personalInfo.linkedin && (
                <div className="flex items-center gap-2">
                  <Linkedin className="h-4 w-4 text-red-700 dark:text-red-500" />
                  <p>{personalInfo.linkedin}</p>
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-red-700 dark:text-red-500" />
                  <p>{personalInfo.website}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left sidebar */}
          <div className="space-y-6">
            {/* Summary */}
            <div>
              <h2 className="text-lg font-bold text-red-700 dark:text-red-500 mb-2">
                PROFILE
              </h2>
              <p className="text-sm">{summary}</p>
            </div>

            {/* Skills */}
            <div>
              <h2 className="text-lg font-bold text-red-700 dark:text-red-500 mb-2">
                SKILLS
              </h2>
              <div className="space-y-1">
                {skills.map((skill, index) => (
                  <p key={index} className="text-sm">
                    {skill}
                  </p>
                ))}
              </div>
            </div>

            {/* Languages */}
            {languages && languages.length > 0 && settings.showLanguages && (
              <div>
                <h2 className="text-lg font-bold text-red-700 dark:text-red-500 mb-2">
                  LANGUAGES
                </h2>
                <div className="space-y-1">
                  {languages.map((lang, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>{lang.language}</span>
                      <span>{lang.proficiency}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {certifications &&
              certifications.length > 0 &&
              settings.showCertifications && (
                <div>
                  <h2 className="text-lg font-bold text-red-700 dark:text-red-500 mb-2">
                    CERTIFICATIONS
                  </h2>
                  <div className="space-y-2 text-sm">
                    {certifications.map((cert) => (
                      <div key={cert.id}>
                        <p className="font-medium">{cert.name}</p>
                        <p>
                          {cert.issuer}, {cert.date}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>

          {/* Main content area */}
          <div className="md:col-span-2 space-y-6">
            {/* Work Experience */}
            <div>
              <h2 className="text-lg font-bold text-red-700 dark:text-red-500 border-b border-gray-300 dark:border-gray-700 pb-1 mb-4">
                PROFESSIONAL EXPERIENCE
              </h2>
              <div className="space-y-5">
                {workExperience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex flex-col md:flex-row md:justify-between">
                      <h3 className="font-bold">{exp.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {exp.startDate} - {exp.endDate}
                      </p>
                    </div>
                    <p className="font-medium text-red-700 dark:text-red-500 mb-2">
                      {exp.company}
                    </p>
                    <ul className="list-disc ml-5 space-y-1 text-sm">
                      {exp.bullets.map((bullet, index) => (
                        <li key={index}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <h2 className="text-lg font-bold text-red-700 dark:text-red-500 border-b border-gray-300 dark:border-gray-700 pb-1 mb-4">
                EDUCATION
              </h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex flex-col md:flex-row md:justify-between">
                      <h3 className="font-bold">{edu.degree}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {edu.startDate} - {edu.endDate}
                      </p>
                    </div>
                    <p className="text-red-700 dark:text-red-500">
                      {edu.institution}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* References */}
            {references && references.length > 0 && settings.showReferences && (
              <div>
                <h2 className="text-lg font-bold text-red-700 dark:text-red-500 border-b border-gray-300 dark:border-gray-700 pb-1 mb-4">
                  REFERENCES
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {references.map((ref) => (
                    <div
                      key={ref.id}
                      className="border border-gray-200 dark:border-gray-700 p-3 rounded-md"
                    >
                      <p className="font-medium">{ref.name}</p>
                      <p className="text-sm">{ref.position}</p>
                      <p className="text-sm">{ref.company}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {ref.contact}
                      </p>
                      {ref.phone && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {ref.phone}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
