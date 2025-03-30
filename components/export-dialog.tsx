"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { exportToPdf, exportToText, exportToJson, createShareableLink } from "@/lib/export-service"
import { useResumeStore } from "@/lib/resume-store"
import { Download, FileText, FileJson, LinkIcon, Copy, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ExportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  resumeRef: React.RefObject<HTMLDivElement>
}

export default function ExportDialog({ open, onOpenChange, resumeRef }: ExportDialogProps) {
  const [exportTab, setExportTab] = useState("pdf")
  const [filename, setFilename] = useState("my-resume")
  const [isExporting, setIsExporting] = useState(false)
  const [shareableLink, setShareableLink] = useState("")
  const [linkCopied, setLinkCopied] = useState(false)
  const [includePersonalInfo, setIncludePersonalInfo] = useState(true)
  const [optimizeForAts, setOptimizeForAts] = useState(true)

  const { data, template } = useResumeStore()
  const { toast } = useToast()

  const handleExport = async () => {
    setIsExporting(true)
    let success = false

    try {
      switch (exportTab) {
        case "pdf":
          if (resumeRef.current) {
            success = await exportToPdf(resumeRef.current, `${filename}.pdf`)
          }
          break
        case "text":
          success = exportToText(data, `${filename}.txt`)
          break
        case "json":
          success = exportToJson(data, template, `${filename}.json`)
          break
        case "share":
          const link = createShareableLink(data, template)
          setShareableLink(link)
          success = true
          break
      }

      if (success) {
        toast({
          title: exportTab === "share" ? "Link generated successfully" : "Export successful",
          description:
            exportTab === "share"
              ? "You can now share your resume with others"
              : `Your resume has been exported as ${exportTab.toUpperCase()}`,
        })
      } else {
        throw new Error("Export failed")
      }
    } catch (error) {
      toast({
        title: "Export failed",
        description: "There was an error exporting your resume. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  const copyShareableLink = () => {
    navigator.clipboard.writeText(shareableLink)
    setLinkCopied(true)
    setTimeout(() => setLinkCopied(false), 2000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Export Resume</DialogTitle>
          <DialogDescription>Choose a format to export your resume</DialogDescription>
        </DialogHeader>

        <Tabs value={exportTab} onValueChange={setExportTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="pdf">PDF</TabsTrigger>
            <TabsTrigger value="text">Text</TabsTrigger>
            <TabsTrigger value="json">JSON</TabsTrigger>
            <TabsTrigger value="share">Share</TabsTrigger>
          </TabsList>

          <TabsContent value="pdf">
            <div className="space-y-4">
              <div>
                <Label htmlFor="pdf-filename">Filename</Label>
                <Input
                  id="pdf-filename"
                  value={filename}
                  onChange={(e) => setFilename(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="optimize-ats"
                  checked={optimizeForAts}
                  onCheckedChange={(checked) => setOptimizeForAts(checked as boolean)}
                />
                <Label htmlFor="optimize-ats">Optimize for ATS</Label>
              </div>

              <p className="text-sm text-muted-foreground">
                Exports your resume as a PDF document that maintains formatting and is suitable for both human reviewers
                and ATS systems.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="text">
            <div className="space-y-4">
              <div>
                <Label htmlFor="text-filename">Filename</Label>
                <Input
                  id="text-filename"
                  value={filename}
                  onChange={(e) => setFilename(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="include-personal"
                  checked={includePersonalInfo}
                  onCheckedChange={(checked) => setIncludePersonalInfo(checked as boolean)}
                />
                <Label htmlFor="include-personal">Include personal information</Label>
              </div>

              <p className="text-sm text-muted-foreground">
                Exports your resume as plain text, which is ideal for pasting into online application forms and is
                highly compatible with ATS systems.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="json">
            <div className="space-y-4">
              <div>
                <Label htmlFor="json-filename">Filename</Label>
                <Input
                  id="json-filename"
                  value={filename}
                  onChange={(e) => setFilename(e.target.value)}
                  className="mt-1"
                />
              </div>

              <p className="text-sm text-muted-foreground">
                Exports your resume data as a JSON file, which you can use to back up your resume or import it into
                ResumePro later.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="share">
            <div className="space-y-4">
              {!shareableLink ? (
                <>
                  <p className="text-sm text-muted-foreground">
                    Generate a shareable link that allows others to view your resume online. The link will be valid for
                    30 days.
                  </p>

                  <div className="flex items-center space-x-2">
                    <Switch id="password-protect" />
                    <Label htmlFor="password-protect">Password protect</Label>
                  </div>
                </>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="shareable-link">Shareable Link</Label>
                  <div className="flex">
                    <Input id="shareable-link" value={shareableLink} readOnly className="rounded-r-none" />
                    <Button variant="secondary" className="rounded-l-none" onClick={copyShareableLink}>
                      {linkCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">This link will expire in 30 days</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleExport} disabled={isExporting} className="gap-2">
            {isExporting ? (
              <>Exporting...</>
            ) : (
              <>
                {exportTab === "pdf" && <Download className="h-4 w-4" />}
                {exportTab === "text" && <FileText className="h-4 w-4" />}
                {exportTab === "json" && <FileJson className="h-4 w-4" />}
                {exportTab === "share" && !shareableLink && <LinkIcon className="h-4 w-4" />}
                {exportTab === "share" && shareableLink ? "Copy Link" : `Export as ${exportTab.toUpperCase()}`}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

