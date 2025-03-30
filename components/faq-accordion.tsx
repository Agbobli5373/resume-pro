"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqItems = [
  {
    question: "How does the AI content generation work?",
    answer:
      "Our AI analyzes your existing resume content and the job description you're targeting to generate tailored bullet points, summaries, and skill suggestions. It uses advanced natural language processing to create professional, ATS-friendly content that highlights your qualifications for the specific role.",
  },
  {
    question: "Can I export my resume in different formats?",
    answer:
      "Yes! With our free plan, you can export your resume as a PDF. Premium users can export in multiple formats including PDF, Word (.docx), plain text for ATS systems, and HTML for online portfolios. All exports maintain perfect formatting and are optimized for their respective formats.",
  },
  {
    question: "How does the ATS optimization feature work?",
    answer:
      "Our ATS optimization analyzes your resume against the job description to ensure it contains relevant keywords and phrases that applicant tracking systems look for. It provides suggestions to improve your resume's compatibility with ATS systems and gives you a score indicating how likely your resume is to pass through these systems.",
  },
  {
    question: "Can I create multiple versions of my resume?",
    answer:
      "You can create unlimited resume versions with both our free and premium plans. This allows you to tailor different resumes for different job applications or industries. Premium users get unlimited cloud storage for all versions with a complete version history.",
  },
  {
    question: "Is my data secure and private?",
    answer:
      "Yes, we take data security and privacy very seriously. All your resume data is encrypted both in transit and at rest. We never share your personal information with third parties, and you maintain complete ownership of your content. You can delete your data at any time from your account settings.",
  },
  {
    question: "Can I cancel my subscription at any time?",
    answer:
      "Yes, you can cancel your premium subscription at any time from your account settings. You'll continue to have access to premium features until the end of your current billing period. After that, your account will revert to the free plan, but you'll still have access to all your created resumes.",
  },
]

export default function FaqAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqItems.map((item, i) => (
        <AccordionItem key={i} value={`item-${i}`}>
          <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

