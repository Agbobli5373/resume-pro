import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import ResumePreview from "@/components/resume-preview"
import FeatureCard from "@/components/feature-card"
import TestimonialCard from "@/components/testimonial-card"
import PricingCard from "@/components/pricing-card"
import FaqAccordion from "@/components/faq-accordion"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="container mx-auto py-6 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold">R</span>
          </div>
          <span className="font-bold text-xl">ResumePro</span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <Link href="#features" className="text-sm font-medium hover:text-primary">
            Features
          </Link>
          <Link href="#templates" className="text-sm font-medium hover:text-primary">
            Templates
          </Link>
          <Link href="#pricing" className="text-sm font-medium hover:text-primary">
            Pricing
          </Link>
          <Link href="#faq" className="text-sm font-medium hover:text-primary">
            FAQ
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium hover:text-primary hidden md:block">
            Log in
          </Link>
          <Button asChild>
            <Link href="/builder">Get Started</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium bg-background">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
            AI-Powered Resume Builder
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Create <span className="text-primary">stunning</span> resumes that get you hired
          </h1>
          <p className="text-lg text-muted-foreground">
            Craft ATS-friendly resumes with our AI-powered platform. Stand out from the crowd and land your dream job.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild>
              <Link href="/builder">
                Start Building for Free <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#templates">View Templates</Link>
            </Button>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex -space-x-1">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-6 w-6 rounded-full border-2 border-background bg-primary" />
              ))}
            </div>
            <div>
              <span className="font-medium">4,000+</span> professionals hired last month
            </div>
          </div>
        </div>
        <div className="flex-1 relative">
          <div className="absolute -z-10 aspect-square w-full rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl" />
          <ResumePreview />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to create professional, ATS-friendly resumes that help you land interviews.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon="Wand2"
            title="AI Content Generation"
            description="Generate job-specific bullet points, summaries, and skill suggestions with our AI assistant."
          />
          <FeatureCard
            icon="LayoutTemplate"
            title="50+ Professional Templates"
            description="Choose from a wide range of elegant, customizable templates for any industry or role."
          />
          <FeatureCard
            icon="Target"
            title="ATS Optimization"
            description="Ensure your resume passes through Applicant Tracking Systems with our AI-powered optimization."
          />
          <FeatureCard
            icon="FileText"
            title="Cover Letter Generator"
            description="Create personalized cover letters that match your resume and target specific job descriptions."
          />
          <FeatureCard
            icon="Share2"
            title="Easy Sharing & Export"
            description="Export to PDF, Word, or share via secure link with password protection and expiry dates."
          />
          <FeatureCard
            icon="History"
            title="Version History"
            description="Keep track of all your resume versions and easily revert to previous iterations."
          />
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" className="bg-slate-100 dark:bg-slate-900 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Professional Templates</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose from 50+ professionally designed templates that stand out and get noticed.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Executive", category: "Professional" },
              { name: "Creative", category: "Design" },
              { name: "Technical", category: "IT" },
              { name: "Modern", category: "General" },
              { name: "Minimalist", category: "Clean" },
              { name: "Academic", category: "Education" },
            ].map((template, i) => (
              <div
                key={i}
                className="bg-background rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="aspect-[3/4] bg-slate-200 dark:bg-slate-800 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    Template Preview
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium">{template.name}</h3>
                  <p className="text-sm text-muted-foreground">{template.category}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link href="/builder">
                View All Templates <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of professionals who have landed their dream jobs with ResumePro.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TestimonialCard
            name="Sarah Johnson"
            role="Marketing Manager"
            image="/placeholder.svg?height=80&width=80"
            rating={5}
            testimonial="ResumePro helped me land interviews at top tech companies. The AI suggestions were spot-on and saved me hours of work."
          />
          <TestimonialCard
            name="Michael Chen"
            role="Software Engineer"
            image="/placeholder.svg?height=80&width=80"
            rating={5}
            testimonial="The ATS optimization feature is a game-changer. I went from zero callbacks to five interviews in just one week!"
          />
          <TestimonialCard
            name="Jessica Williams"
            role="UX Designer"
            image="/placeholder.svg?height=80&width=80"
            rating={4}
            testimonial="As a designer, I was impressed with the beautiful templates. They allowed me to showcase my portfolio and skills effectively."
          />
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-slate-100 dark:bg-slate-900 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that works best for your career needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard
              title="Free"
              price="$0"
              description="Perfect for getting started"
              features={[
                "3 exports per month",
                "5 professional templates",
                "Basic AI suggestions",
                "PDF export",
                "7-day history",
              ]}
              buttonText="Get Started"
              buttonVariant="outline"
              href="/signup"
            />
            <PricingCard
              title="Premium"
              price="$9"
              period="per month"
              description="Everything you need for job hunting"
              features={[
                "Unlimited exports",
                "All 50+ templates",
                "Advanced AI features",
                "ATS optimization",
                "Cover letter generator",
                "Multiple file formats",
                "Unlimited history",
              ]}
              buttonText="Start Free Trial"
              buttonVariant="default"
              href="/signup"
              popular
            />
            <PricingCard
              title="Team"
              price="$19"
              period="per month"
              description="For career coaches and teams"
              features={[
                "All Premium features",
                "Team collaboration",
                "Comments & feedback",
                "Analytics dashboard",
                "Priority support",
                "Custom branding",
              ]}
              buttonText="Contact Sales"
              buttonVariant="outline"
              href="/contact"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about ResumePro.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <FaqAccordion />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-primary/10 rounded-3xl p-8 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to land your dream job?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of professionals who have accelerated their careers with ResumePro.
          </p>
          <Button size="lg" asChild>
            <Link href="/builder">
              Start Building Your Resume <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-200 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold">R</span>
                </div>
                <span className="font-bold text-xl">ResumePro</span>
              </div>
              <p className="text-slate-400">AI-powered resume builder helping professionals land their dream jobs.</p>
            </div>
            <div>
              <h3 className="font-medium mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#features" className="text-slate-400 hover:text-white">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#templates" className="text-slate-400 hover:text-white">
                    Templates
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="text-slate-400 hover:text-white">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#faq" className="text-slate-400 hover:text-white">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-slate-400 hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-slate-400 hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-slate-400 hover:text-white">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-slate-400 hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy" className="text-slate-400 hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-slate-400 hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="text-slate-400 hover:text-white">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400">© 2025 ResumePro. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="#" className="text-slate-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link href="#" className="text-slate-400 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

