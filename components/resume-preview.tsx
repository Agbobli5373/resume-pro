"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ResumePreview() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="relative bg-background rounded-xl shadow-2xl overflow-hidden">
      <Tabs defaultValue="modern" className="w-full">
        <div className="px-4 pt-4">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="modern">Modern</TabsTrigger>
            <TabsTrigger value="professional">Professional</TabsTrigger>
            <TabsTrigger value="creative">Creative</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="modern" className="m-0">
          <ResumeTemplate isVisible={isVisible} style="modern" name="Alex Johnson" title="Senior Product Manager" />
        </TabsContent>

        <TabsContent value="professional" className="m-0">
          <ResumeTemplate isVisible={isVisible} style="professional" name="Sarah Williams" title="Marketing Director" />
        </TabsContent>

        <TabsContent value="creative" className="m-0">
          <ResumeTemplate isVisible={isVisible} style="creative" name="Michael Chen" title="UX/UI Designer" />
        </TabsContent>
      </Tabs>

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background to-transparent h-20 flex items-end justify-center pb-4">
        <Button size="sm">Try This Template</Button>
      </div>
    </div>
  )
}

function ResumeTemplate({ isVisible, style, name, title }) {
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  }

  const getTemplateStyles = () => {
    switch (style) {
      case "professional":
        return {
          headerBg: "bg-blue-50 dark:bg-blue-950",
          accentColor: "border-blue-500",
          sectionTitle: "text-blue-700 dark:text-blue-300",
        }
      case "creative":
        return {
          headerBg: "bg-purple-50 dark:bg-purple-950",
          accentColor: "border-purple-500",
          sectionTitle: "text-purple-700 dark:text-purple-300",
        }
      default: // modern
        return {
          headerBg: "bg-slate-50 dark:bg-slate-800",
          accentColor: "border-primary",
          sectionTitle: "text-primary",
        }
    }
  }

  const styles = getTemplateStyles()

  return (
    <div className="p-6 aspect-[8.5/11] bg-white dark:bg-slate-900 text-black dark:text-white">
      {/* Header */}
      <motion.div
        className={`p-4 mb-4 rounded-lg ${styles.headerBg}`}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        custom={0}
        variants={variants}
      >
        <h1 className="text-2xl font-bold">{name}</h1>
        <p className="text-lg">{title}</p>
      </motion.div>

      {/* Two column layout */}
      <div className="flex gap-4">
        {/* Left column */}
        <div className="w-1/3 space-y-4">
          <motion.div initial="hidden" animate={isVisible ? "visible" : "hidden"} custom={1} variants={variants}>
            <h2 className={`text-sm font-bold mb-2 ${styles.sectionTitle}`}>CONTACT</h2>
            <div className="space-y-1 text-xs">
              <p>email@example.com</p>
              <p>(555) 123-4567</p>
              <p>linkedin.com/in/username</p>
              <p>City, State</p>
            </div>
          </motion.div>

          <motion.div initial="hidden" animate={isVisible ? "visible" : "hidden"} custom={2} variants={variants}>
            <h2 className={`text-sm font-bold mb-2 ${styles.sectionTitle}`}>SKILLS</h2>
            <div className="space-y-1 text-xs">
              <p>Product Management</p>
              <p>Team Leadership</p>
              <p>Strategic Planning</p>
              <p>User Research</p>
              <p>Agile Methodologies</p>
              <p>Data Analysis</p>
            </div>
          </motion.div>

          <motion.div initial="hidden" animate={isVisible ? "visible" : "hidden"} custom={3} variants={variants}>
            <h2 className={`text-sm font-bold mb-2 ${styles.sectionTitle}`}>EDUCATION</h2>
            <div className="space-y-1 text-xs">
              <p className="font-medium">MBA, Business Administration</p>
              <p>University of Example</p>
              <p>2015 - 2017</p>
              <div className="h-2"></div>
              <p className="font-medium">BS, Computer Science</p>
              <p>Example State University</p>
              <p>2011 - 2015</p>
            </div>
          </motion.div>
        </div>

        {/* Right column */}
        <div className="w-2/3 space-y-4">
          <motion.div initial="hidden" animate={isVisible ? "visible" : "hidden"} custom={4} variants={variants}>
            <h2 className={`text-sm font-bold mb-2 ${styles.sectionTitle}`}>PROFESSIONAL SUMMARY</h2>
            <p className="text-xs">
              Results-driven product manager with 7+ years of experience leading cross-functional teams to deliver
              innovative solutions. Proven track record of increasing user engagement and driving revenue growth through
              data-informed product decisions.
            </p>
          </motion.div>

          <motion.div initial="hidden" animate={isVisible ? "visible" : "hidden"} custom={5} variants={variants}>
            <h2 className={`text-sm font-bold mb-2 ${styles.sectionTitle}`}>WORK EXPERIENCE</h2>

            <div className={`border-l-2 pl-3 pb-3 ${styles.accentColor}`}>
              <p className="text-xs font-medium">Senior Product Manager</p>
              <p className="text-xs">Example Tech Inc. | 2020 - Present</p>
              <ul className="list-disc text-xs ml-4 mt-1 space-y-1">
                <li>Led product strategy for flagship SaaS platform, resulting in 45% YoY revenue growth</li>
                <li>Managed a team of 5 product owners across 3 product lines</li>
                <li>Implemented user research program that increased customer satisfaction by 32%</li>
              </ul>
            </div>

            <div className="h-2"></div>

            <div className={`border-l-2 pl-3 ${styles.accentColor}`}>
              <p className="text-xs font-medium">Product Manager</p>
              <p className="text-xs">Tech Solutions Co. | 2017 - 2020</p>
              <ul className="list-disc text-xs ml-4 mt-1 space-y-1">
                <li>Developed product roadmap and executed release strategy for mobile application</li>
                <li>Collaborated with engineering to deliver features on time and within budget</li>
                <li>Conducted competitive analysis to identify market opportunities</li>
              </ul>
            </div>
          </motion.div>

          <motion.div initial="hidden" animate={isVisible ? "visible" : "hidden"} custom={6} variants={variants}>
            <h2 className={`text-sm font-bold mb-2 ${styles.sectionTitle}`}>PROJECTS</h2>
            <div className="space-y-1 text-xs">
              <p className="font-medium">Product Redesign Initiative</p>
              <p>Led complete redesign of core product, resulting in 28% increase in user engagement</p>
              <div className="h-1"></div>
              <p className="font-medium">Market Expansion Strategy</p>
              <p>Developed strategy to enter new market segment, contributing to $2M in new revenue</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

