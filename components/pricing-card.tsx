import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"
import Link from "next/link"

interface PricingCardProps {
  title: string
  price: string
  period?: string
  description: string
  features: string[]
  buttonText: string
  buttonVariant: "default" | "outline"
  href: string
  popular?: boolean
}

export default function PricingCard({
  title,
  price,
  period,
  description,
  features,
  buttonText,
  buttonVariant,
  href,
  popular = false,
}: PricingCardProps) {
  return (
    <div
      className={`bg-background rounded-xl p-6 shadow-md border ${popular ? "border-primary" : "border-border"} relative`}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-medium py-1 px-3 rounded-full">
          Most Popular
        </div>
      )}
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <div className="flex items-baseline mb-1">
        <span className="text-3xl font-bold">{price}</span>
        {period && <span className="text-muted-foreground ml-1">{period}</span>}
      </div>
      <p className="text-muted-foreground mb-6">{description}</p>
      <Button variant={buttonVariant} className="w-full mb-6" asChild>
        <Link href={href}>{buttonText}</Link>
      </Button>
      <ul className="space-y-3">
        {features.map((feature, i) => (
          <li key={i} className="flex">
            <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

