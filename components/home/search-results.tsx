"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BuildingIcon, MapPinIcon, UserIcon, ExternalLinkIcon } from "lucide-react"
import { maskCRN } from "@/lib/utils"

interface Company {
  id: string
  name: string
  nameArabic: string
  country: string
  city: string
  industry: string
  employees: string
  status: "active" | "inactive"
  registrationNumber: string
}

interface SearchResultsProps {
  results: Company[]
  searchQuery: string
  country: string
  onRequestInvestigation: () => void
}

export function SearchResults({ results, searchQuery, country, onRequestInvestigation }: SearchResultsProps) {
  if (results.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <BuildingIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              No companies found
            </h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your search criteria or selecting a different country
            </p>
            <p className="text-gray-600 mb-4">
              Can't find the company you're looking for?
            </p>
            <Button
              onClick={onRequestInvestigation}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg"
            >
              Request Fresh Investigation
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-primary mb-2">
            Search Results
          </h2>
          <p className="text-gray-600">
            Found {results.length} {results.length === 1 ? 'company' : 'companies'} matching "{searchQuery}" in {country}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {results.map((company) => (
            <Card key={company.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl text-primary mb-2 flex items-center gap-2">
                      <BuildingIcon className="w-5 h-5" />
                      <div>
                        <div>{company.name}</div>
                        <div className="text-base font-normal text-gray-600 mt-1 font-arabic" dir="rtl">
                          {company.nameArabic}
                        </div>
                      </div>
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={company.status === "active" ? "default" : "secondary"}
                        className={company.status === "active" ? "bg-green-600" : ""}
                      >
                        {company.status}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        CRN: {maskCRN(company.registrationNumber)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-gray-600">
                    <MapPinIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="text-sm">{company.city}, {company.country}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <BuildingIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="text-sm">{company.industry}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <UserIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="text-sm">{company.employees} employees</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={() => window.location.href = `/company/${company.id}`}
                  >
                    View Details
                    <ExternalLinkIcon className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

