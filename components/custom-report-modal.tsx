"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CustomReportModalProps {
  isOpen: boolean
  onClose: () => void
  companyName: string
  companyNameArabic: string
}

export function CustomReportModal({
  isOpen,
  onClose,
  companyName,
  companyNameArabic,
}: CustomReportModalProps) {
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false)
      alert(
        "Thank you for your custom report request!\n\n" +
        "Your request has been received. Our team will assess your requirements and send you an email with:\n" +
        "• Detailed cost breakdown\n" +
        "• Estimated turnaround time\n" +
        "• Secure payment link\n\n" +
        "After successful payment, we will deliver your custom report via email."
      )
      setDescription("")
      onClose()
    }, 1000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-xl">
        <div className="sticky top-0 bg-green-600 text-white p-4 flex items-center justify-between rounded-t-lg">
          <h2 className="text-2xl font-bold">Request Custom Report</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* Company Name */}
            <div>
              <Label htmlFor="companyName" className="text-gray-700">
                Company Name
              </Label>
              <Input
                id="companyName"
                value={companyName}
                readOnly
                className="mt-1 bg-gray-50"
              />
            </div>

            {/* Company Name Arabic */}
            <div>
              <Label htmlFor="companyNameArabic" className="text-gray-700">
                Company Name (Arabic)
              </Label>
              <Input
                id="companyNameArabic"
                value={companyNameArabic}
                readOnly
                className="mt-1 bg-gray-50 font-arabic"
                dir="rtl"
              />
            </div>

            {/* Custom Request Description */}
            <div>
              <Label htmlFor="description" className="text-red-600">
                Describe your extra info or report you need *
              </Label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 min-h-[120px]"
                placeholder="Please provide details about the specific information or custom report you need..."
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Be as specific as possible about your requirements
              </p>
            </div>

            {/* Note */}
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <p className="text-sm text-blue-900">
                <strong>Note:</strong> Your request will be assessed by our team. We
                will send you an email with the full cost, turnaround time, and a
                secure payment link. After successful payment, we will send you
                the requested information via email within the specified turnaround
                time.
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-3 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="px-6"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700 px-6"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

