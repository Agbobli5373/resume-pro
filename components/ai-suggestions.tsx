"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wand2, FileText, Upload, Check, RefreshCw } from "lucide-react"
import { useResumeStore } from "@/lib/resume-store"
import { useToast } from "@/hooks/use-toast"
import { analyzeJobDescription, generateSummary, improveBulletPoint, generateCoverLetter } from "@/lib/ai-service"

export default function AiSuggestions() {
  const [jobDescription, setJobDescription] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isAnalyzed, setIsAnalyzed] = useState(false)
  const [analysisResults, setAnalysisResults] = useState<any>(null)
  const [bulletPoint, setBulletPoint] = useState("")
  const [isImproving, setIsImproving] = useState(false)
  const [improvedBulletPoint, setImprovedBulletPoint] = useState("")
  const [position, setPosition] = useState("")
  const [industry, setIndustry] = useState("")
  const [experience, setExperience] = useState("5")
  const [isGenerating, setIsGenerating] = useState(false)
  const [coverLetter, setCoverLetter] = useState("")

  const { data, updateSummary, addSkill } = useResumeStore()
  const { toast } = useToast()

  const handleAnalyze = () => {
    if (!jobDescription.trim()) {
      toast({
        title: "Job description required",
        description: "Please enter a job description to analyze",
        variant: "destructive",
      })
      return
    }

    setIsAnalyzing(true)

    // Simulate API call
    setTimeout(() => {
      try {
        const results = analyzeJobDescription(jobDescription)
        setAnalysisResults(results)
        setIsAnalyzed(true)

        toast({
          title: "Analysis complete",
          description: "Your resume has been analyzed against the job description",
        })
      } catch (error) {
        toast({
          title: "Analysis failed",
          description: "There was an error analyzing the job description",
          variant: "destructive",
        })
      } finally {
        setIsAnalyzing(false)
      }
    }, 2000)
  }

  const handleAddSuggestedSkill = (skill: string) => {
    addSkill(skill)

    toast({
      title: "Skill added",
      description: `"${skill}" has been added to your skills`,
    })
  }

  const handleApplyAllSuggestions = () => {
    if (!analysisResults) return

    analysisResults.suggestedSkills.forEach((skill: string) => {
      addSkill(skill)
    })

    toast({
      title: "All suggestions applied",
      description: "All suggested skills have been added to your resume",
    })
  }

  const handleImproveBulletPoint = (improvementType: string) => {
    if (!bulletPoint.trim()) {
      toast({
        title: "Bullet point required",
        description: "Please enter a bullet point to improve",
        variant: "destructive",
      })
      return
    }

    setIsImproving(true)

    // Simulate API call
    setTimeout(async () => {
      try {
        const improved = improveBulletPoint(bulletPoint, improvementType)
        setImprovedBulletPoint(await improved)

        toast({
          title: "Bullet point improved",
          description: "Your bullet point has been improved",
        })
      } catch (error) {
        toast({
          title: "Improvement failed",
          description: "There was an error improving your bullet point",
          variant: "destructive",
        })
      } finally {
        setIsImproving(false)
      }
    }, 1500)
  }

  const handleGenerateSummary = () => {
    if (!position.trim() || !industry.trim()) {
      toast({
        title: "Information required",
        description: "Please enter your position and industry",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    // Simulate API call
    setTimeout(async () => {
      try {
        const summary = generateSummary(position, industry, Number.parseInt(experience) || 5)
        updateSummary( await summary)

        toast({
          title: "Summary generated",
          description: "Your professional summary has been generated and applied to your resume",
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
    }, 2000)
  }

  const handleGenerateCoverLetter = () => {
    if (!position.trim()) {
      toast({
        title: "Position required",
        description: "Please enter the position you're applying for",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    // Simulate API call
    setTimeout(async () => {
      try {
        const letter = generateCoverLetter(
          `${data.personalInfo.firstName} ${data.personalInfo.lastName}`,
          position,
          "Example Company",
          data.skills,
        )
        setCoverLetter(await letter)

        toast({
          title: "Cover letter generated",
          description: "Your cover letter has been generated successfully",
        })
      } catch (error) {
        toast({
          title: "Generation failed",
          description: "There was an error generating your cover letter",
          variant: "destructive",
        })
      } finally {
        setIsGenerating(false)
      }
    }, 2000)
  }

  return (
    <Card>
      <CardContent className="p-4">
        <h2 className="text-lg font-medium mb-4">AI Assistant</h2>

        <Tabs defaultValue="optimize">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="optimize">Optimize</TabsTrigger>
            <TabsTrigger value="generate">Generate</TabsTrigger>
            <TabsTrigger value="improve">Improve</TabsTrigger>
          </TabsList>

          <TabsContent value="optimize">
            <div className="space-y-4">
              <div>
                <Label htmlFor="jobDescription">Job Description</Label>
                <Textarea
                  id="jobDescription"
                  placeholder="Paste the job description here to optimize your resume..."
                  className="min-h-[150px]"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </div>

              <div className="flex justify-between">
                <Button variant="outline" className="flex gap-2">
                  <Upload className="h-4 w-4" />
                  Upload PDF
                </Button>
                <Button onClick={handleAnalyze} disabled={!jobDescription.trim() || isAnalyzing}>
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Wand2 className="h-4 w-4 mr-2" />
                      Analyze Job
                    </>
                  )}
                </Button>
              </div>

              {isAnalyzed && analysisResults && (
                <div className="mt-6 space-y-4">
                  <div className="bg-primary/10 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">ATS Compatibility Score</h3>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                      <div
                        className="bg-primary h-2.5 rounded-full"
                        style={{ width: `${analysisResults.compatibilityScore}%` }}
                      ></div>
                    </div>
                    <p className="text-sm mt-2">
                      Your resume is {analysisResults.compatibilityScore}% compatible with this job description.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Missing Keywords</h3>
                    <div className="flex flex-wrap gap-2">
                      {analysisResults.missingKeywords.map((keyword: string, i: number) => (
                        <div
                          key={i}
                          className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100 px-3 py-1 rounded-full text-sm"
                        >
                          {keyword}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Suggested Skills to Add</h3>
                    <div className="flex flex-wrap gap-2">
                      {analysisResults.suggestedSkills.map((skill: string, i: number) => (
                        <div
                          key={i}
                          className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 px-3 py-1 rounded-full text-sm flex items-center"
                        >
                          {skill}
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-5 w-5 ml-1 hover:bg-transparent hover:text-green-800 dark:hover:text-green-100"
                            onClick={() => handleAddSuggestedSkill(skill)}
                          >
                            <Check className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full" onClick={handleApplyAllSuggestions}>
                    Apply All Suggestions
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="generate">
            <div className="space-y-4">
              <div>
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  placeholder="e.g., Senior Product Manager"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="industry">Industry</Label>
                <Input
                  id="industry"
                  placeholder="e.g., Technology, Healthcare, Finance"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="experience">Years of Experience</Label>
                <Input
                  id="experience"
                  type="number"
                  placeholder="e.g., 5"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="w-full" onClick={handleGenerateSummary} disabled={isGenerating}>
                  <Wand2 className="h-4 w-4 mr-2" />
                  Generate Summary
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleGenerateCoverLetter}
                  disabled={isGenerating}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Cover Letter
                </Button>
              </div>

              {coverLetter && (
                <div className="mt-4">
                  <Label htmlFor="coverLetter">Cover Letter</Label>
                  <Textarea
                    id="coverLetter"
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    className="min-h-[300px] mt-1 font-mono text-sm"
                  />
                  <div className="flex justify-end mt-2">
                    <Button
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText(coverLetter)
                        toast({
                          title: "Copied to clipboard",
                          description: "Your cover letter has been copied to the clipboard",
                        })
                      }}
                    >
                      Copy to Clipboard
                    </Button>
                  </div>
                </div>
              )}

              <Button className="w-full" onClick={handleGenerateSummary} disabled={isGenerating}>
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4 mr-2" />
                    Generate Full Resume Content
                  </>
                )}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="improve">
            <div className="space-y-4">
              <div>
                <Label htmlFor="bulletPoint">Bullet Point to Improve</Label>
                <Textarea
                  id="bulletPoint"
                  placeholder="Paste a bullet point from your resume that you want to improve..."
                  className="min-h-[100px]"
                  value={bulletPoint}
                  onChange={(e) => setBulletPoint(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleImproveBulletPoint("concise")}
                  disabled={isImproving}
                >
                  <Wand2 className="h-4 w-4 mr-2" />
                  Make More Concise
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleImproveBulletPoint("metrics")}
                  disabled={isImproving}
                >
                  <Wand2 className="h-4 w-4 mr-2" />
                  Add Metrics
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleImproveBulletPoint("action")}
                  disabled={isImproving}
                >
                  <Wand2 className="h-4 w-4 mr-2" />
                  Use Action Verbs
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleImproveBulletPoint("results")}
                  disabled={isImproving}
                >
                  <Wand2 className="h-4 w-4 mr-2" />
                  Highlight Results
                </Button>
              </div>

              {improvedBulletPoint && (
                <div className="mt-4 p-4 bg-primary/10 rounded-lg">
                  <Label>Improved Bullet Point:</Label>
                  <p className="mt-1">{improvedBulletPoint}</p>
                  <div className="flex justify-end mt-2">
                    <Button
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText(improvedBulletPoint)
                        toast({
                          title: "Copied to clipboard",
                          description: "Your improved bullet point has been copied to the clipboard",
                        })
                      }}
                    >
                      Copy to Clipboard
                    </Button>
                  </div>
                </div>
              )}

              <Button className="w-full" disabled={isImproving}>
                {isImproving ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Improving...
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4 mr-2" />
                    Improve All Bullet Points
                  </>
                )}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

