"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Star } from "lucide-react"
import Image from "next/image"

interface TestimonialCardProps {
  name: string
  role: string
  image: string
  rating: number
  testimonial: string
}

export default function TestimonialCard({ name, role, image, rating, testimonial }: TestimonialCardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="bg-background rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-border"
    >
      <div className="flex items-center mb-4">
        <div className="mr-4">
          <Image src={image || "/placeholder.svg"} alt={name} width={50} height={50} className="rounded-full" />
        </div>
        <div>
          <h3 className="font-medium">{name}</h3>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </div>
      <div className="flex mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
        ))}
      </div>
      <p className="text-muted-foreground">{testimonial}</p>
    </motion.div>
  )
}

