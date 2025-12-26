"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface InvestigationRequestModalProps {
  isOpen: boolean
  onClose: () => void
}

const countries = [
  { value: "uae", label: "United Arab Emirates" },
  { value: "saudi", label: "Saudi Arabia" },
  { value: "egypt", label: "Egypt" },
  { value: "qatar", label: "Qatar" },
  { value: "bahrain", label: "Bahrain" },
  { value: "kuwait", label: "Kuwait" },
  { value: "oman", label: "Oman" },
  { value: "jordan", label: "Jordan" },
  { value: "lebanon", label: "Lebanon" },
  { value: "morocco", label: "Morocco" },
]

const serviceOptions = [
  { id: "cr_doc", label: "Commercial Registration Document" },
  { id: "litigation", label: "Litigation Records" },
  { id: "shareholders", label: "Shareholders Information" },
  { id: "financial", label: "Financial Statements" },
  { id: "ownership", label: "Ownership Details" },
  { id: "credit", label: "Credit Report" },
  { id: "bankruptcy", label: "Bankruptcy Records" },
  { id: "directors", label: "Directors Information" },
]

export function InvestigationRequestModal({
  isOpen,
  onClose,
}: InvestigationRequestModalProps) {
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [formData, setFormData] = useState({
    companyName: "",
    companyCountry: "",
    streetName: "",
    city: "",
    poBox: "",
    registrationNumber: "",
    bankers: "",
    contactPerson: "",
    comments: "",
    clientReference: "",
  })

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    alert(
      "Thank you for your request! Your order will be assessed and we will send you an email with the full cost, turnaround time, and payment link. After successful payment, we will send you the requested documents via email within the specified turnaround time."
    )
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-xl">
        <div className="sticky top-0 bg-green-600 text-white p-4 flex items-center justify-between rounded-t-lg">
          <h2 className="text-2xl font-bold">Order's Information</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Information of the company to be investigated
            </h3>
            <p className="text-sm text-red-600 mb-4">* Required Fields</p>

            <div className="space-y-4">
              {/* Company Name */}
              <div>
                <Label htmlFor="companyName" className="text-red-600">
                  Company Name *
                </Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) =>
                    setFormData({ ...formData, companyName: e.target.value })
                  }
                  required
                  className="mt-1"
                />
              </div>

              {/* Company Country */}
              <div>
                <Label htmlFor="companyCountry" className="text-red-600">
                  Company Country *
                </Label>
                <Select
                  value={formData.companyCountry}
                  onValueChange={(value) =>
                    setFormData({ ...formData, companyCountry: value })
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="None Selected" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {countries.map((country) => (
                        <SelectItem key={country.value} value={country.value}>
                          {country.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Street Name */}
              <div>
                <Label htmlFor="streetName">Street Name</Label>
                <Input
                  id="streetName"
                  value={formData.streetName}
                  onChange={(e) =>
                    setFormData({ ...formData, streetName: e.target.value })
                  }
                  className="mt-1"
                />
              </div>

              {/* City */}
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  className="mt-1"
                />
              </div>

              {/* PO Box */}
              <div>
                <Label htmlFor="poBox">PO Box</Label>
                <Input
                  id="poBox"
                  value={formData.poBox}
                  onChange={(e) =>
                    setFormData({ ...formData, poBox: e.target.value })
                  }
                  className="mt-1"
                />
              </div>

              {/* Registration Number */}
              <div>
                <Label htmlFor="registrationNumber">Registration Number</Label>
                <Input
                  id="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      registrationNumber: e.target.value,
                    })
                  }
                  className="mt-1"
                />
              </div>

              {/* Bankers */}
              <div>
                <Label htmlFor="bankers">Bankers</Label>
                <Input
                  id="bankers"
                  value={formData.bankers}
                  onChange={(e) =>
                    setFormData({ ...formData, bankers: e.target.value })
                  }
                  className="mt-1"
                />
              </div>

              {/* Contact Person */}
              <div>
                <Label htmlFor="contactPerson">
                  Contact Person / Direct Telephone and Email
                </Label>
                <Input
                  id="contactPerson"
                  value={formData.contactPerson}
                  onChange={(e) =>
                    setFormData({ ...formData, contactPerson: e.target.value })
                  }
                  className="mt-1"
                />
              </div>

              {/* Services - Multiple Selection */}
              <div>
                <Label className="text-red-600">Services Required *</Label>
                <Card className="mt-2">
                  <CardContent className="pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {serviceOptions.map((service) => (
                        <div
                          key={service.id}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={service.id}
                            checked={selectedServices.includes(service.id)}
                            onCheckedChange={() =>
                              handleServiceToggle(service.id)
                            }
                          />
                          <Label
                            htmlFor={service.id}
                            className="text-sm font-normal cursor-pointer"
                          >
                            {service.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <p className="text-xs text-gray-500 mt-2">
                  Select all services you need for this investigation
                </p>
              </div>

              {/* Comments */}
              <div>
                <Label htmlFor="comments">Comments</Label>
                <textarea
                  id="comments"
                  value={formData.comments}
                  onChange={(e) =>
                    setFormData({ ...formData, comments: e.target.value })
                  }
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows={3}
                />
              </div>

              {/* Client Reference */}
              <div>
                <Label htmlFor="clientReference">Client Reference</Label>
                <Input
                  id="clientReference"
                  value={formData.clientReference}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      clientReference: e.target.value,
                    })
                  }
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Note */}
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
            <p className="text-sm text-blue-900">
              <strong>Note:</strong> Your order will be assessed by our team. We
              will send you an email with the full cost, turnaround time, and a
              secure payment link. After successful payment, we will send you
              the requested documents via email within the specified turnaround
              time.
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="px-6"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700 px-6"
            >
              Submit Request
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

