"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Download,
  Settings,
  Plus,
  Trash2,
  MoveUp,
  MoveDown,
  Wand2,
  FileText,
  Save,
  Eye,
  Award,
  UserCheck,
  Globe,
} from "lucide-react"
import ResumeEditor from "@/components/resume-editor"
import TemplateSelector from "@/components/template-selector"
import AiSuggestions from "@/components/ai-suggestions"
import ExportDialog from "@/components/export-dialog"
import SaveDialog from "@/components/save-dialog"
import ProfilePictureUpload from "@/components/profile-picture-upload"
import { ThemeToggle } from "@/components/theme-toggle"
import { useResumeStore } from "@/lib/resume-store"
import { useToast } from "@/hooks/use-toast"
import { generateSummary, generateBulletPoints } from "@/lib/ai-service"
import ATSView from "@/components/ats-view"
import ResumeSettingsDialog, { type ResumeSettings } from "@/components/resume-settings-dialog"

export default function BuilderPage() {
  const [activeTab, setActiveTab] = useState("editor")
  const [exportDialogOpen, setExportDialogOpen] = useState(false)
  const [saveDialogOpen, setSaveDialogOpen] = useState(false)
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false)
  const [isATSView, setIsATSView] = useState(false)
  const [newSkill, setNewSkill] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  // Resume display settings
  const [resumeSettings, setResumeSettings] = useState<ResumeSettings>({
    fontSize: 1,
    lineSpacing: 1,
    showProfilePicture: true,
    showReferences: true,
    showCertifications: true,
    showLanguages: true,
    fontFamily: "default",
  })

  // New state for certifications and references
  const [newCertName, setNewCertName] = useState("")
  const [newCertIssuer, setNewCertIssuer] = useState("")
  const [newCertDate, setNewCertDate] = useState("")

  const [newRefName, setNewRefName] = useState("")
  const [newRefPosition, setNewRefPosition] = useState("")
  const [newRefCompany, setNewRefCompany] = useState("")
  const [newRefContact, setNewRefContact] = useState("")
  const [newRefPhone, setNewRefPhone] = useState("")

  // New state for languages
  const [newLanguage, setNewLanguage] = useState("")
  const [newProficiency, setNewProficiency] = useState("")

  const resumeRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  const {
    data,
    template,
    setTemplate,
    updatePersonalInfo,
    updateSummary,
    addWorkExperience,
    updateWorkExperience,
    removeWorkExperience,
    moveWorkExperienceUp,
    moveWorkExperienceDown,
    addEducation,
    updateEducation,
    removeEducation,
    addSkill,
    removeSkill,
    addCertification,
    removeCertification,
    addReference,
    removeReference,
    addLanguage,
    removeLanguage,
  } = useResumeStore()

  const handleGenerateSummary = () => {
    setIsGenerating(true)

    setTimeout(() => {
      try {
        const summary = generateSummary(
          data.personalInfo.title,
          "technology", // Default industry
          7, // Default years of experience
        )

        updateSummary(summary)

        toast({
          title: "Summary generated",
          description: "Your professional summary has been generated successfully",
        })
      } catch (error) {
        toast({
          title: "Generation failed",
          description: "There was an error generating your summary",
          variant: "destructive",
        })
      } finally {
        setIsGenerating(false)
      }
    }, 1500)
  }

  const handleGenerateBullets = (experienceId: string) => {
    setIsGenerating(true)

    const experience = data.workExperience.find((exp) => exp.id === experienceId)
    if (!experience) return

    setTimeout(() => {
      try {
        const bullets = generateBulletPoints(experience.title)

        updateWorkExperience(experienceId, {
          bullets,
        })

        toast({
          title: "Bullet points generated",
          description: "Your work experience bullet points have been generated successfully",
        })
      } catch (error) {
        toast({
          title: "Generation failed",
          description: "There was an error generating your bullet points",
          variant: "destructive",
        })
      } finally {
        setIsGenerating(false)
      }
    }, 1500)
  }

  const handleAddWorkExperience = () => {
    addWorkExperience({
      title: "New Position",
      company: "Company Name",
      startDate: "Month Year",
      endDate: "Present",
      description: "",
      bullets: [""],
    })
  }

  const handleAddEducation = () => {
    addEducation({
      degree: "Degree Name",
      institution: "Institution Name",
      startDate: "Month Year",
      endDate: "Month Year",
    })
  }

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      addSkill(newSkill.trim())
      setNewSkill("")
    }
  }

  const handleAddCertification = () => {
    if (newCertName.trim() && newCertIssuer.trim()) {
      addCertification({
        name: newCertName.trim(),
        issuer: newCertIssuer.trim(),
        date: newCertDate.trim() || "Present",
      })

      // Reset form
      setNewCertName("")
      setNewCertIssuer("")
      setNewCertDate("")

      toast({
        title: "Certification added",
        description: "Your certification has been added to your resume",
      })
    } else {
      toast({
        title: "Missing information",
        description: "Please provide at least a name and issuer for your certification",
        variant: "destructive",
      })
    }
  }

  const handleAddReference = () => {
    if (newRefName.trim() && newRefPosition.trim() && newRefCompany.trim()) {
      addReference({
        name: newRefName.trim(),
        position: newRefPosition.trim(),
        company: newRefCompany.trim(),
        contact: newRefContact.trim() || "Available upon request",
        phone: newRefPhone.trim() || "",
      })

      // Reset form
      setNewRefName("")
      setNewRefPosition("")
      setNewRefCompany("")
      setNewRefContact("")
      setNewRefPhone("")

      toast({
        title: "Reference added",
        description: "Your reference has been added to your resume",
      })
    } else {
      toast({
        title: "Missing information",
        description: "Please provide at least a name, position, and company for your reference",
        variant: "destructive",
      })
    }
  }

  const handleAddLanguage = () => {
    if (newLanguage.trim() && newProficiency.trim()) {
      addLanguage(newLanguage.trim(), newProficiency.trim())

      // Reset form
      setNewLanguage("")
      setNewProficiency("")

      toast({
        title: "Language added",
        description: "Your language has been added to your resume",
      })
    } else {
      toast({
        title: "Missing information",
        description: "Please provide both language and proficiency",
        variant: "destructive",
      })
    }
  }

  const toggleATSView = () => {
    setIsATSView(!isATSView)
  }

  const openSettingsDialog = () => {
    setSettingsDialogOpen(true)
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-background border-b border-border">
        <div className="container mx-auto py-4 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">R</span>
            </div>
            <span className="font-bold text-xl">ResumePro</span>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button size="sm" variant="outline" onClick={() => setSaveDialogOpen(true)}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button size="sm" variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button size="sm" onClick={() => setExportDialogOpen(true)}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="editor">Editor</TabsTrigger>
                <TabsTrigger value="templates">Templates</TabsTrigger>
                <TabsTrigger value="ai">AI Assistant</TabsTrigger>
              </TabsList>

              <TabsContent value="editor" className="space-y-4">
                {/* Profile Picture Upload */}
                <ProfilePictureUpload />

                <Card>
                  <CardContent className="p-4">
                    <h2 className="text-lg font-medium mb-4">Personal Information</h2>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            value={data.personalInfo.firstName}
                            onChange={(e) => updatePersonalInfo({ firstName: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            value={data.personalInfo.lastName}
                            onChange={(e) => updatePersonalInfo({ lastName: e.target.value })}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="title">Professional Title</Label>
                        <Input
                          id="title"
                          value={data.personalInfo.title}
                          onChange={(e) => updatePersonalInfo({ title: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={data.personalInfo.email}
                          onChange={(e) => updatePersonalInfo({ email: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={data.personalInfo.phone}
                          onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={data.personalInfo.location}
                          onChange={(e) => updatePersonalInfo({ location: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="linkedin">LinkedIn</Label>
                        <Input
                          id="linkedin"
                          value={data.personalInfo.linkedin}
                          onChange={(e) => updatePersonalInfo({ linkedin: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          value={data.personalInfo.website || ""}
                          onChange={(e) => updatePersonalInfo({ website: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="twitter">Twitter</Label>
                        <Input
                          id="twitter"
                          value={data.personalInfo.twitter || ""}
                          onChange={(e) => updatePersonalInfo({ twitter: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="github">GitHub</Label>
                        <Input
                          id="github"
                          value={data.personalInfo.github || ""}
                          onChange={(e) => updatePersonalInfo({ github: e.target.value })}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-medium">Professional Summary</h2>
                      <Button size="sm" variant="outline" onClick={handleGenerateSummary} disabled={isGenerating}>
                        <Wand2 className="h-4 w-4 mr-2" />
                        Generate
                      </Button>
                    </div>
                    <Textarea
                      placeholder="Write a professional summary that highlights your experience and skills..."
                      className="min-h-[120px]"
                      value={data.summary}
                      onChange={(e) => updateSummary(e.target.value)}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-medium">Work Experience</h2>
                      <Button size="sm" variant="outline" onClick={handleAddWorkExperience}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    {data.workExperience.map((experience, index) => (
                      <div key={experience.id} className="border rounded-lg p-3 mb-3">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <Input
                              value={experience.title}
                              onChange={(e) => updateWorkExperience(experience.id, { title: e.target.value })}
                              className="font-medium border-0 p-0 h-auto text-base mb-1"
                              placeholder="Position Title"
                            />
                            <Input
                              value={experience.company}
                              onChange={(e) => updateWorkExperience(experience.id, { company: e.target.value })}
                              className="text-sm text-muted-foreground border-0 p-0 h-auto"
                              placeholder="Company Name"
                            />
                          </div>
                          <div className="flex gap-1">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8"
                              onClick={() => moveWorkExperienceUp(experience.id)}
                              disabled={index === 0}
                            >
                              <MoveUp className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8"
                              onClick={() => moveWorkExperienceDown(experience.id)}
                              disabled={index === data.workExperience.length - 1}
                            >
                              <MoveDown className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-destructive"
                              onClick={() => removeWorkExperience(experience.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-3">
                          <div>
                            <Label htmlFor={`startDate-${experience.id}`}>Start Date</Label>
                            <Input
                              id={`startDate-${experience.id}`}
                              value={experience.startDate}
                              onChange={(e) => updateWorkExperience(experience.id, { startDate: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor={`endDate-${experience.id}`}>End Date</Label>
                            <Input
                              id={`endDate-${experience.id}`}
                              value={experience.endDate}
                              onChange={(e) => updateWorkExperience(experience.id, { endDate: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="mb-3">
                          <Label>Bullet Points</Label>
                          {experience.bullets.map((bullet, bulletIndex) => (
                            <div key={bulletIndex} className="flex items-center gap-2 mt-2">
                              <span className="text-muted-foreground">•</span>
                              <Input
                                value={bullet}
                                onChange={(e) => {
                                  const newBullets = [...experience.bullets]
                                  newBullets[bulletIndex] = e.target.value
                                  updateWorkExperience(experience.id, { bullets: newBullets })
                                }}
                                placeholder="Describe an achievement or responsibility"
                              />
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8 text-destructive flex-shrink-0"
                                onClick={() => {
                                  const newBullets = experience.bullets.filter((_, i) => i !== bulletIndex)
                                  updateWorkExperience(experience.id, { bullets: newBullets })
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                          <div className="flex justify-between mt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const newBullets = [...experience.bullets, ""]
                                updateWorkExperience(experience.id, { bullets: newBullets })
                              }}
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Add Bullet
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleGenerateBullets(experience.id)}
                              disabled={isGenerating}
                            >
                              <Wand2 className="h-4 w-4 mr-2" />
                              Generate Bullets
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Add another experience button */}
                    <Button variant="outline" className="w-full" onClick={handleAddWorkExperience}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Work Experience
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-medium">Education</h2>
                      <Button size="sm" variant="outline" onClick={handleAddEducation}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    {data.education.map((education) => (
                      <div key={education.id} className="border rounded-lg p-3 mb-3">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <Input
                              value={education.degree}
                              onChange={(e) => updateEducation(education.id, { degree: e.target.value })}
                              className="font-medium border-0 p-0 h-auto text-base mb-1"
                              placeholder="Degree Name"
                            />
                            <Input
                              value={education.institution}
                              onChange={(e) => updateEducation(education.id, { institution: e.target.value })}
                              className="text-sm text-muted-foreground border-0 p-0 h-auto"
                              placeholder="Institution Name"
                            />
                          </div>
                          <div className="flex gap-1">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-destructive"
                              onClick={() => removeEducation(education.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label htmlFor={`eduStartDate-${education.id}`}>Start Date</Label>
                            <Input
                              id={`eduStartDate-${education.id}`}
                              value={education.startDate}
                              onChange={(e) => updateEducation(education.id, { startDate: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor={`eduEndDate-${education.id}`}>End Date</Label>
                            <Input
                              id={`eduEndDate-${education.id}`}
                              value={education.endDate}
                              onChange={(e) => updateEducation(education.id, { endDate: e.target.value })}
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Add another education button */}
                    <Button variant="outline" className="w-full" onClick={handleAddEducation}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Education
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-medium">Skills</h2>
                      <Button size="sm" variant="outline">
                        <Wand2 className="h-4 w-4 mr-2" />
                        Suggest
                      </Button>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {data.skills.map((skill, i) => (
                        <div
                          key={i}
                          className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm flex items-center"
                        >
                          {skill}
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-5 w-5 ml-1 hover:bg-transparent hover:text-destructive"
                            onClick={() => removeSkill(skill)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a skill..."
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                      />
                      <Button variant="outline" onClick={handleAddSkill}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Languages - Optional Section */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-medium flex items-center gap-2">
                        <Globe className="h-5 w-5" />
                        Languages
                        <span className="text-xs text-muted-foreground">(Optional)</span>
                      </h2>
                    </div>

                    {/* Existing languages */}
                    {data.languages && data.languages.length > 0 && (
                      <div className="space-y-3 mb-4">
                        {data.languages.map((lang, index) => (
                          <div key={index} className="border rounded-lg p-3 flex justify-between items-center">
                            <div>
                              <p className="font-medium">{lang.language}</p>
                              <p className="text-sm text-muted-foreground">{lang.proficiency}</p>
                            </div>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-destructive"
                              onClick={() => removeLanguage(lang.language)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Add new language form */}
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="language">Language</Label>
                        <Input
                          id="language"
                          value={newLanguage}
                          onChange={(e) => setNewLanguage(e.target.value)}
                          placeholder="e.g., English, French, Twi"
                        />
                      </div>
                      <div>
                        <Label htmlFor="proficiency">Proficiency</Label>
                        <Input
                          id="proficiency"
                          value={newProficiency}
                          onChange={(e) => setNewProficiency(e.target.value)}
                          placeholder="e.g., Native, Fluent, Intermediate, Basic"
                        />
                      </div>

                      <Button variant="outline" className="w-full" onClick={handleAddLanguage}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Language
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Certifications - Optional Section */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-medium flex items-center gap-2">
                        <Award className="h-5 w-5" />
                        Certifications
                        <span className="text-xs text-muted-foreground">(Optional)</span>
                      </h2>
                    </div>

                    {/* Existing certifications */}
                    {data.certifications && data.certifications.length > 0 && (
                      <div className="space-y-3 mb-4">
                        {data.certifications.map((cert) => (
                          <div key={cert.id} className="border rounded-lg p-3 flex justify-between items-center">
                            <div>
                              <p className="font-medium">{cert.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {cert.issuer} • {cert.date}
                              </p>
                            </div>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-destructive"
                              onClick={() => removeCertification(cert.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Add new certification form */}
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="certName">Certification Name</Label>
                        <Input
                          id="certName"
                          value={newCertName}
                          onChange={(e) => setNewCertName(e.target.value)}
                          placeholder="e.g., AWS Certified Solutions Architect"
                        />
                      </div>
                      <div>
                        <Label htmlFor="certIssuer">Issuing Organization</Label>
                        <Input
                          id="certIssuer"
                          value={newCertIssuer}
                          onChange={(e) => setNewCertIssuer(e.target.value)}
                          placeholder="e.g., Amazon Web Services"
                        />
                      </div>
                      <div>
                        <Label htmlFor="certDate">Date</Label>
                        <Input
                          id="certDate"
                          value={newCertDate}
                          onChange={(e) => setNewCertDate(e.target.value)}
                          placeholder="e.g., May 2023"
                        />
                      </div>

                      <Button variant="outline" className="w-full" onClick={handleAddCertification}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Certification
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* References - Optional Section */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-medium flex items-center gap-2">
                        <UserCheck className="h-5 w-5" />
                        References
                        <span className="text-xs text-muted-foreground">(Optional)</span>
                      </h2>
                    </div>

                    {/* Existing references */}
                    {data.references && data.references.length > 0 && (
                      <div className="space-y-3 mb-4">
                        {data.references.map((ref) => (
                          <div key={ref.id} className="border rounded-lg p-3 flex justify-between items-start">
                            <div>
                              <p className="font-medium">{ref.name}</p>
                              <p className="text-sm">
                                {ref.position}, {ref.company}
                              </p>
                              <p className="text-sm text-muted-foreground">{ref.contact}</p>
                              {ref.phone && <p className="text-sm text-muted-foreground">{ref.phone}</p>}
                            </div>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-destructive"
                              onClick={() => removeReference(ref.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Add new reference form */}
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="refName">Name</Label>
                        <Input
                          id="refName"
                          value={newRefName}
                          onChange={(e) => setNewRefName(e.target.value)}
                          placeholder="e.g., Dr. Kofi Mensah"
                        />
                      </div>
                      <div>
                        <Label htmlFor="refPosition">Position</Label>
                        <Input
                          id="refPosition"
                          value={newRefPosition}
                          onChange={(e) => setNewRefPosition(e.target.value)}
                          placeholder="e.g., Director of Technology"
                        />
                      </div>
                      <div>
                        <Label htmlFor="refCompany">Company</Label>
                        <Input
                          id="refCompany"
                          value={newRefCompany}
                          onChange={(e) => setNewRefCompany(e.target.value)}
                          placeholder="e.g., Tech Solutions Ghana"
                        />
                      </div>
                      <div>
                        <Label htmlFor="refContact">Contact Information</Label>
                        <Input
                          id="refContact"
                          value={newRefContact}
                          onChange={(e) => setNewRefContact(e.target.value)}
                          placeholder="e.g., kofi.mensah@example.com or phone number"
                        />
                      </div>
                      <div>
                        <Label htmlFor="refPhone">Phone Number</Label>
                        <Input
                          id="refPhone"
                          value={newRefPhone}
                          onChange={(e) => setNewRefPhone(e.target.value)}
                          placeholder="e.g., +233 20 123 4567"
                        />
                      </div>

                      <Button variant="outline" className="w-full" onClick={handleAddReference}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Reference
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="templates">
                <TemplateSelector selectedTemplate={template} onSelectTemplate={setTemplate} />
              </TabsContent>

              <TabsContent value="ai">
                <AiSuggestions />
              </TabsContent>
            </Tabs>
          </div>

          {/* Resume Preview */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium">Resume Preview</h2>
                  <div className="flex gap-2">
                    <Button size="sm" variant={isATSView ? "default" : "outline"} onClick={toggleATSView}>
                      <FileText className="h-4 w-4 mr-2" />
                      ATS View
                    </Button>
                    <Button size="sm" variant="outline" onClick={openSettingsDialog}>
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Button>
                  </div>
                </div>
                <Separator className="mb-6" />
                <div
                  ref={resumeRef}
                  style={{
                    fontSize: `${resumeSettings.fontSize}rem`,
                    lineHeight: `${resumeSettings.lineSpacing}`,
                    fontFamily:
                      resumeSettings.fontFamily === "default"
                        ? "inherit"
                        : resumeSettings.fontFamily === "serif"
                          ? "Georgia, serif"
                          : resumeSettings.fontFamily === "sans"
                            ? "Arial, sans-serif"
                            : "monospace",
                  }}
                >
                  {isATSView ? <ATSView /> : <ResumeEditor template={template} settings={resumeSettings} />}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Export Dialog */}
      <ExportDialog open={exportDialogOpen} onOpenChange={setExportDialogOpen} resumeRef={resumeRef} />

      {/* Save Dialog */}
      <SaveDialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen} />

      {/* Settings Dialog */}
      <ResumeSettingsDialog
        open={settingsDialogOpen}
        onOpenChange={setSettingsDialogOpen}
        settings={resumeSettings}
        onSettingsChange={setResumeSettings}
      />
    </div>
  )
}

