"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useResumeStore } from "@/lib/resume-store"
import { Camera, Upload, Trash2 } from "lucide-react"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"

export default function ProfilePictureUpload() {
  const { data, setProfilePicture } = useResumeStore()
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPEG, PNG, etc.)",
        variant: "destructive",
      })
      return
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    // In a real app, you would upload to a server or cloud storage
    // For this demo, we'll use a local URL
    const reader = new FileReader()
    reader.onload = (event) => {
      if (event.target?.result) {
        setProfilePicture(event.target.result as string)
        toast({
          title: "Profile picture updated",
          description: "Your profile picture has been updated successfully",
        })
      }
      setIsUploading(false)
    }
    reader.onerror = () => {
      toast({
        title: "Upload failed",
        description: "There was an error uploading your profile picture",
        variant: "destructive",
      })
      setIsUploading(false)
    }
    reader.readAsDataURL(file)
  }

  const handleRemovePicture = () => {
    setProfilePicture("")
    toast({
      title: "Profile picture removed",
      description: "Your profile picture has been removed",
    })
  }

  const hasProfilePicture =
    data.personalInfo.profilePicture && data.personalInfo.profilePicture !== "/placeholder.svg?height=200&width=200"

  return (
    <Card className="p-4">
      <div className="flex flex-col items-center">
        <div className="relative mb-4">
          <div className="h-32 w-32 rounded-full overflow-hidden border-2 border-primary bg-muted flex items-center justify-center">
            {hasProfilePicture ? (
              <Image
                src={data.personalInfo.profilePicture || ""}
                alt="Profile"
                width={128}
                height={128}
                className="object-cover h-full w-full"
              />
            ) : (
              <Camera className="h-12 w-12 text-muted-foreground" />
            )}
          </div>
          <Button size="icon" className="absolute bottom-0 right-0 rounded-full" onClick={handleUploadClick}>
            <Camera className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleUploadClick} disabled={isUploading} className="flex gap-2">
            <Upload className="h-4 w-4" />
            {isUploading ? "Uploading..." : "Upload Photo"}
          </Button>

          {hasProfilePicture && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleRemovePicture}
              className="flex gap-2 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
              Remove
            </Button>
          )}
        </div>

        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
      </div>
    </Card>
  )
}

