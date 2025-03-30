import { jsPDF } from "jspdf"
import type { ResumeData } from "./resume-store"
import html2canvas from "html2canvas"

// Function to export resume as PDF
export const exportToPdf = async (resumeElement: HTMLElement, filename = "resume.pdf") => {
  try {
    // Create a canvas from the resume element
    const canvas = await html2canvas(resumeElement, {
      scale: 2, // Higher scale for better quality
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
    })

    // Calculate dimensions to maintain aspect ratio
    const imgWidth = 210 // A4 width in mm
    const pageHeight = 297 // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    // Create PDF of A4 size
    const pdf = new jsPDF("p", "mm", "a4")

    // Add the image to the PDF
    const imgData = canvas.toDataURL("image/png")
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight)

    // If the height of the canvas exceeds the height of a single page,
    // add new pages as needed
    let heightLeft = imgHeight
    let position = 0

    while (heightLeft > pageHeight) {
      position = heightLeft - pageHeight
      pdf.addPage()
      pdf.addImage(imgData, "PNG", 0, -position, imgWidth, imgHeight)
      heightLeft -= pageHeight
    }

    // Save the PDF
    pdf.save(filename)
    return true
  } catch (error) {
    console.error("Error exporting to PDF:", error)
    return false
  }
}

// Function to export resume as plain text
export const exportToText = (resumeData: ResumeData, filename = "resume.txt") => {
  try {
    const { personalInfo, summary, workExperience, education, skills } = resumeData

    // Build the text content
    let content = `${personalInfo.firstName} ${personalInfo.lastName}\n`
    content += `${personalInfo.title}\n`
    content += `${personalInfo.email} | ${personalInfo.phone} | ${personalInfo.location}\n`
    if (personalInfo.linkedin) content += `${personalInfo.linkedin}\n`
    if (personalInfo.website) content += `${personalInfo.website}\n`

    content += `\n\nPROFESSIONAL SUMMARY\n`
    content += `${summary}\n`

    content += `\n\nWORK EXPERIENCE\n`
    workExperience.forEach((exp) => {
      content += `\n${exp.title}\n`
      content += `${exp.company} | ${exp.startDate} - ${exp.endDate}\n`
      exp.bullets.forEach((bullet) => {
        content += `• ${bullet}\n`
      })
    })

    content += `\n\nEDUCATION\n`
    education.forEach((edu) => {
      content += `\n${edu.degree}\n`
      content += `${edu.institution} | ${edu.startDate} - ${edu.endDate}\n`
      if (edu.description) content += `${edu.description}\n`
    })

    content += `\n\nSKILLS\n`
    content += skills.join(", ")

    // Create a blob and download
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    return true
  } catch (error) {
    console.error("Error exporting to text:", error)
    return false
  }
}

// Function to export resume as JSON (for backup/import)
export const exportToJson = (resumeData: ResumeData, template: string, filename = "resume.json") => {
  try {
    const data = {
      resumeData,
      template,
      exportDate: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    return true
  } catch (error) {
    console.error("Error exporting to JSON:", error)
    return false
  }
}

// Function to create a shareable link (mock implementation)
export const createShareableLink = (resumeData: ResumeData, template: string) => {
  // In a real implementation, this would save to a database and generate a unique URL
  // For this mock, we'll just create a fake URL
  const uniqueId = Math.random().toString(36).substring(2, 15)
  return `https://resumepro.example/share/${uniqueId}`
}

