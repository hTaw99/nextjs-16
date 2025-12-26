"use client"

import { SearchIcon, FileTextIcon, DownloadIcon } from "lucide-react"

const steps = [
  {
    icon: SearchIcon,
    title: "Search the company",
    description: "Search across MENA databases",
  },
  {
    icon: FileTextIcon,
    title: "Select the reports you need",
    description: "Registry extract, litigation, Tredia, ownership, etc.",
  },
  {
    icon: DownloadIcon,
    title: "Pay and receive reports",
    description: "Delivered to your inbox or profile in 2-9 days",
  },
]

export function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-primary mb-16">
          How It Works
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              {/* Icon Container */}
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
                  <step.icon className="w-10 h-10 text-white" />
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-full w-48 h-0.5 bg-gradient-to-r from-primary to-gray-300" 
                       style={{ marginLeft: '1rem' }} />
                )}
              </div>
              
              {/* Step Number */}
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg mb-4">
                {index + 1}
              </div>
              
              {/* Content */}
              <h3 className="text-2xl font-semibold text-primary mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed max-w-xs">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

