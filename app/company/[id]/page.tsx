"use client"

import { useState } from "react"
import { Header } from "@/components/home/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  BuildingIcon,
  MapPinIcon,
  UserIcon,
  PhoneIcon,
  MailIcon,
  GlobeIcon,
  CalendarIcon,
  FileTextIcon,
  DownloadIcon,
  ArrowLeftIcon,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { PremiumSection } from "@/components/premium-section"
import { CartStore } from "@/lib/cart-store"
import { CustomReportModal } from "@/components/custom-report-modal"
import { maskCRN } from "@/lib/utils"

// Mock data for demonstration
const companyData: Record<string, any> = {
  "1": {
    id: "1",
    name: "Emirates Steel Industries",
    nameArabic: "صناعات الإمارات للحديد",
    country: "United Arab Emirates",
    city: "Abu Dhabi",
    address: "Musaffah Industrial Area, Abu Dhabi, UAE",
    industry: "Manufacturing & Steel Production",
    employees: "1,500-2,000",
    status: "active",
    registrationNumber: "CN-1234567",
    foundedDate: "1998",
    legalForm: "Private Limited Company",
    phone: "+971 2 123 4567",
    email: "info@emiratessteel.ae",
    website: "www.emiratessteel.ae",
    description:
      "Emirates Steel Industries is one of the largest steel manufacturing companies in the Middle East, producing high-quality steel products for construction and industrial applications.",
    services: [
      "Steel Manufacturing",
      "Rebar Production",
      "Wire Rod Production",
      "Quality Control",
      "Export Services",
    ],
    documents: [
      { name: "Company Registration Certificate", type: "PDF", size: "2.5 MB" },
      { name: "Trade License", type: "PDF", size: "1.8 MB" },
      { name: "Financial Statement 2024", type: "PDF", size: "4.2 MB" },
    ],
  },
  // Add more mock companies as needed
}

// Premium items configuration
const premiumItems = [
  {
    id: "business_activities",
    title: "Business Activities",
    description:
      "Detailed breakdown of all registered business activities, trade classifications, and industry codes.",
    price: 25,
    turnaroundDays: "2-3 days",
  },
  {
    id: "commercial_address",
    title: "Commercial Address",
    description:
      "Verified commercial address with full details including building, street, district, and postal information.",
    price: 15,
    turnaroundDays: "1-2 days",
  },
  {
    id: "company_capital",
    title: "Company Capital",
    description:
      "Complete capital structure including authorized capital, paid-up capital, and share distribution details.",
    price: 30,
    turnaroundDays: "3-5 days",
  },
  {
    id: "partners_shareholders",
    title: "Partners and Shareholders",
    description:
      "Full list of partners and shareholders with ownership percentages, nationalities, and contribution details.",
    price: 45,
    turnaroundDays: "5-7 days",
  },
  {
    id: "authorized_signatories",
    title: "Authorized Signatories",
    description:
      "Verified list of authorized signatories with their powers, limitations, and signature specimens.",
    price: 35,
    turnaroundDays: "4-6 days",
  },
  {
    id: "media_report",
    title: "Media Report",
    description:
      "Comprehensive media coverage analysis including news articles, press releases, and public mentions.",
    price: 50,
    turnaroundDays: "7-10 days",
    languageOptions: {
      english: 50,
      arabic: 50,
      both: 85,
    },
  },
  {
    id: "litigation_records",
    title: "Litigation Records",
    description:
      "Complete litigation history including court cases, judgments, and pending legal matters.",
    price: 60,
    turnaroundDays: "7-10 days",
  },
  {
    id: "credit_rating",
    title: "Credit Rating & Score",
    description:
      "Professional credit assessment with rating, score, payment behavior, and risk analysis.",
    price: 75,
    turnaroundDays: "5-7 days",
  },
]

export default function CompanyDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const router = useRouter()
  const [company, setCompany] = useState(companyData["1"])
  const [cart, setCart] = useState<
    Array<{ itemId: string; price: number; language?: string }>
  >([])
  const [isCustomReportModalOpen, setIsCustomReportModalOpen] = useState(false)

  // Unwrap params Promise
  useState(() => {
    params.then((p) => {
      setCompany(companyData[p.id] || companyData["1"])
    })
  })

  const handleAddToCart = (
    itemId: string,
    price: number,
    language?: string
  ) => {
    const item = premiumItems.find((i) => i.id === itemId)
    if (item) {
      const cartItem = {
        id: `${company.id}-${itemId}-${Date.now()}`,
        companyId: company.id,
        companyName: company.name,
        itemName: item.title,
        price,
        language,
      }
      CartStore.addToCart(cartItem)
      // Item added silently - button will show "Added" state and cart count will update
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6 text-primary"
        >
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          Back to Search Results
        </Button>

        {/* Company Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center">
                    <BuildingIcon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-3xl text-primary">
                      {company.name}
                    </CardTitle>
                    <div className="text-xl text-gray-600 mt-1 font-arabic" dir="rtl">
                      {company.nameArabic}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge
                        variant={
                          company.status === "active" ? "default" : "secondary"
                        }
                        className={
                          company.status === "active" ? "bg-green-600" : ""
                        }
                      >
                        {company.status}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        CRN: {maskCRN(company.registrationNumber)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Request Custom Report button removed */}
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Company Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-primary">
                  Company Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {company.description}
                </p>
                <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-gray-200">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Year Established</p>
                    <p className="font-semibold text-gray-900">
                      {company.foundedDate}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Legal Form</p>
                    <p className="font-semibold text-gray-900">
                      {company.legalForm}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Services */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-primary">
                  Services & Products
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {company.services.map((service: string, index: number) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-sm py-1 px-3"
                    >
                      {service}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Available Documents section hidden as per requirements */}

            {/* Premium Reports Section */}
            <PremiumSection
              items={premiumItems}
              onAddToCart={handleAddToCart}
              companyId={company.id}
              companyName={company.name}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-primary">
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPinIcon className="w-5 h-5 text-[#002b5c] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Address</p>
                    <p className="text-gray-900">{company.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                      <PhoneIcon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Phone</p>
                    <p className="text-gray-900">{company.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                      <MailIcon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Email</p>
                    <p className="text-gray-900">{company.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                      <GlobeIcon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Website</p>
                    <a
                      href={`https://${company.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {company.website}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Call to Action */}
            <Card className="bg-gradient-to-br from-primary to-primary/80 text-white">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">
                  Need Specific Information?
                </h3>
                <p className="text-sm text-white/90 mb-4">
                  Request custom reports tailored to your needs. We can provide specific information, documents, or data analysis based on your requirements.
                </p>
                <Button 
                  onClick={() => setIsCustomReportModalOpen(true)}
                  className="w-full bg-white text-primary hover:bg-gray-100"
                >
                  Request Custom Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Custom Report Modal */}
      <CustomReportModal
        isOpen={isCustomReportModalOpen}
        onClose={() => setIsCustomReportModalOpen(false)}
        companyName={company.name}
        companyNameArabic={company.nameArabic}
      />
    </div>
  )
}

