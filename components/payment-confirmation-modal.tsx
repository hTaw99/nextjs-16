"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XIcon } from "lucide-react"

interface PaymentConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  email: string
}

export function PaymentConfirmationModal({
  isOpen,
  onClose,
}: PaymentConfirmationModalProps) {
  if (!isOpen) return null

  const handleRedirect = () => {
    // TODO: Redirect to actual payment gateway
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl text-primary">
              Payment Confirmation
            </CardTitle>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <XIcon className="w-5 h-5" />
            </button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Email Verified */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-green-700 font-medium mb-2">
              <CheckCircle2 className="w-5 h-5" />
              <span>Email verified successfully</span>
            </div>
          </div>

          {/* Redirecting Message */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-900 font-medium">
              Redirecting to secure payment gateway...
            </p>
          </div>

          {/* After Successful Payment */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">
              After successful payment:
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700 text-sm">
                  Order confirmation will be sent to your email
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700 text-sm">
                  Electronic invoice will be generated and emailed
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700 text-sm">
                  Documents will be delivered within TAT
                </p>
              </div>
            </div>
          </div>

          {/* OK Button */}
          <Button
            onClick={handleRedirect}
            className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-base"
          >
            OK
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

