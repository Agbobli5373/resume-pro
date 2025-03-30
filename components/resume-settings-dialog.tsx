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
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export interface ResumeSettings {
  fontSize: number
  lineSpacing: number
  showProfilePicture: boolean
  showReferences: boolean
  showCertifications: boolean
  showLanguages: boolean
  fontFamily: string
}

interface ResumeSettingsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  settings: ResumeSettings
  onSettingsChange: (settings: ResumeSettings) => void
}

export default function ResumeSettingsDialog({
  open,
  onOpenChange,
  settings,
  onSettingsChange,
}: ResumeSettingsDialogProps) {
  const [localSettings, setLocalSettings] = useState<ResumeSettings>(settings)
  const { toast } = useToast()

  const handleSave = () => {
    onSettingsChange(localSettings)
    onOpenChange(false)
    toast({
      title: "Settings saved",
      description: "Your resume display settings have been updated",
    })
  }

  const handleReset = () => {
    const defaultSettings: ResumeSettings = {
      fontSize: 1,
      lineSpacing: 1,
      showProfilePicture: true,
      showReferences: true,
      showCertifications: true,
      showLanguages: true,
      fontFamily: "default",
    }
    setLocalSettings(defaultSettings)
    onSettingsChange(defaultSettings)
    toast({
      title: "Settings reset",
      description: "Your resume display settings have been reset to default",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Resume Display Settings</DialogTitle>
          <DialogDescription>
            Customize how your resume appears in the preview. These settings don't affect exports.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="font-size">Font Size</Label>
            <div className="flex items-center gap-4">
              <span className="text-sm">Small</span>
              <Slider
                id="font-size"
                min={0.8}
                max={1.2}
                step={0.05}
                value={[localSettings.fontSize]}
                onValueChange={(value) => setLocalSettings({ ...localSettings, fontSize: value[0] })}
                className="flex-1"
              />
              <span className="text-sm">Large</span>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="line-spacing">Line Spacing</Label>
            <div className="flex items-center gap-4">
              <span className="text-sm">Tight</span>
              <Slider
                id="line-spacing"
                min={0.9}
                max={1.5}
                step={0.1}
                value={[localSettings.lineSpacing]}
                onValueChange={(value) => setLocalSettings({ ...localSettings, lineSpacing: value[0] })}
                className="flex-1"
              />
              <span className="text-sm">Spacious</span>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="font-family">Font Family</Label>
            <Select
              value={localSettings.fontFamily}
              onValueChange={(value) => setLocalSettings({ ...localSettings, fontFamily: value })}
            >
              <SelectTrigger id="font-family">
                <SelectValue placeholder="Select font" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="serif">Serif</SelectItem>
                <SelectItem value="sans">Sans-serif</SelectItem>
                <SelectItem value="mono">Monospace</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4">
            <Label>Section Visibility</Label>
            <div className="flex items-center justify-between">
              <Label htmlFor="show-profile-picture" className="cursor-pointer">
                Show Profile Picture
              </Label>
              <Switch
                id="show-profile-picture"
                checked={localSettings.showProfilePicture}
                onCheckedChange={(checked) => setLocalSettings({ ...localSettings, showProfilePicture: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="show-references" className="cursor-pointer">
                Show References
              </Label>
              <Switch
                id="show-references"
                checked={localSettings.showReferences}
                onCheckedChange={(checked) => setLocalSettings({ ...localSettings, showReferences: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="show-certifications" className="cursor-pointer">
                Show Certifications
              </Label>
              <Switch
                id="show-certifications"
                checked={localSettings.showCertifications}
                onCheckedChange={(checked) => setLocalSettings({ ...localSettings, showCertifications: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="show-languages" className="cursor-pointer">
                Show Languages
              </Label>
              <Switch
                id="show-languages"
                checked={localSettings.showLanguages}
                onCheckedChange={(checked) => setLocalSettings({ ...localSettings, showLanguages: checked })}
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleReset}>
            Reset to Default
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

