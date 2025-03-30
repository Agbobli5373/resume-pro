"use client"

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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useResumeStore } from "@/lib/resume-store"
import { useToast } from "@/hooks/use-toast"
import { formatDistanceToNow } from "date-fns"
import { Save, Trash2, Clock } from "lucide-react"

interface SaveDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function SaveDialog({ open, onOpenChange }: SaveDialogProps) {
  const [versionName, setVersionName] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const { savedVersions, saveVersion, loadVersion, deleteVersion } = useResumeStore()
  const { toast } = useToast()

  const handleSave = () => {
    if (!versionName.trim()) {
      toast({
        title: "Version name required",
        description: "Please enter a name for this version",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)

    try {
      saveVersion(versionName)
      toast({
        title: "Version saved",
        description: `Your resume version "${versionName}" has been saved`,
      })
      setVersionName("")
      setIsSaving(false)
    } catch (error) {
      toast({
        title: "Save failed",
        description: "There was an error saving your resume version",
        variant: "destructive",
      })
      setIsSaving(false)
    }
  }

  const handleLoad = (id: string, name: string) => {
    loadVersion(id)
    toast({
      title: "Version loaded",
      description: `Resume version "${name}" has been loaded`,
    })
    onOpenChange(false)
  }

  const handleDelete = (id: string, name: string) => {
    deleteVersion(id)
    toast({
      title: "Version deleted",
      description: `Resume version "${name}" has been deleted`,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Save & Manage Versions</DialogTitle>
          <DialogDescription>
            Save your current resume as a new version or load a previously saved version
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <Label htmlFor="version-name">New Version Name</Label>
              <Input
                id="version-name"
                value={versionName}
                onChange={(e) => setVersionName(e.target.value)}
                placeholder="e.g., Marketing Position Draft"
                className="mt-1"
              />
            </div>
            <Button onClick={handleSave} disabled={isSaving || !versionName.trim()} className="gap-2">
              <Save className="h-4 w-4" />
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </div>

          {savedVersions.length > 0 ? (
            <div className="border rounded-md">
              <h3 className="font-medium px-4 py-2 border-b">Saved Versions</h3>
              <div className="max-h-[300px] overflow-y-auto">
                {savedVersions.map((version) => (
                  <div
                    key={version.id}
                    className="px-4 py-3 border-b last:border-b-0 flex justify-between items-center hover:bg-muted/50"
                  >
                    <div>
                      <h4 className="font-medium">{version.name}</h4>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{formatDistanceToNow(new Date(version.date), { addSuffix: true })}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleLoad(version.id, version.name)}>
                        Load
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDelete(version.id, version.name)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">No saved versions yet</div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

