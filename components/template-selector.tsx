"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { motion } from "framer-motion"

interface TemplateSelectorProps {
  selectedTemplate: string
  onSelectTemplate: (template: string) => void
}

export default function TemplateSelector({ selectedTemplate, onSelectTemplate }: TemplateSelectorProps) {
  const templates = [
    { id: "modern", name: "Modern", category: "General" },
    { id: "ghana-formal", name: "Ghana Formal", category: "Ghana" },
    { id: "ghana-modern", name: "Ghana Modern", category: "Ghana" },
    { id: "ghana-professional", name: "Ghana Professional", category: "Ghana" },
    { id: "professional", name: "Professional", category: "Business" },
    { id: "creative", name: "Creative", category: "Design" },
    { id: "minimal", name: "Minimal", category: "Clean" },
    { id: "executive", name: "Executive", category: "Management" },
    { id: "technical", name: "Technical", category: "IT/Engineering" },
    { id: "academic", name: "Academic", category: "Education" },
    { id: "elegant", name: "Elegant", category: "Sophisticated" },
    
  ]

  const [filter, setFilter] = useState("all")

  const filteredTemplates =
    filter === "all" ? templates : templates.filter((t) => t.category.toLowerCase() === filter.toLowerCase())

  return (
    <Card>
      <CardContent className="p-4">
        <h2 className="text-lg font-medium mb-4">Choose a Template</h2>

        <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
          <Button size="sm" variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>
            All
          </Button>
          {Array.from(new Set(templates.map((t) => t.category))).map((category) => (
            <Button
              key={category}
              size="sm"
              variant={filter === category.toLowerCase() ? "default" : "outline"}
              onClick={() => setFilter(category.toLowerCase())}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filteredTemplates.map((template) => (
            <motion.div
              key={template.id}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
              className={`relative cursor-pointer rounded-lg overflow-hidden border-2 ${
                selectedTemplate === template.id ? "border-primary" : "border-border"
              }`}
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="aspect-[3/4] bg-slate-100 dark:bg-slate-800 relative">
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">
                  {template.name}
                </div>
              </div>
              {selectedTemplate === template.id && (
                <div className="absolute top-2 right-2 bg-primary rounded-full p-1">
                  <Check className="h-3 w-3 text-primary-foreground" />
                </div>
              )}
              <div className="p-2 text-xs">
                <p className="font-medium">{template.name}</p>
                <p className="text-muted-foreground">{template.category}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

