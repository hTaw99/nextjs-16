"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MailIcon, ShieldCheckIcon, XIcon } from "lucide-react"

interface EmailVerificationModalProps {
  isOpen: boolean
  onClose: () => void
  onVerified: (email: string) => void
  totalAmount: number
}

export function EmailVerificationModal({
  isOpen,
  onClose,
  onVerified,
  totalAmount,
}: EmailVerificationModalProps) {
  const [step, setStep] = useState<"email" | "code">("email")
  const [email, setEmail] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address")
      return
    }

    setIsLoading(true)

    // TODO: Replace with actual API call
    // Simulate API call to send verification code
    setTimeout(() => {
      setIsLoading(false)
      setStep("code")
      // In production, this would call: await sendVerificationCode(email)
      alert(
        `Verification code sent to ${email}\n\nFor demo purposes, use code: 123456`
      )
    }, 1000)
  }

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (verificationCode.length !== 6) {
      setError("Please enter a 6-digit verification code")
      return
    }

    setIsLoading(true)

    // TODO: Replace with actual API call
    // Simulate API call to verify code
    setTimeout(() => {
      setIsLoading(false)

      // For demo purposes, accept code "123456"
      if (verificationCode === "123456") {
        onVerified(email)
        // Reset state
        setStep("email")
        setEmail("")
        setVerificationCode("")
      } else {
        setError("Invalid verification code. Please try again.")
      }
    }, 1000)
  }

  const handleResendCode = () => {
    setError("")
    // TODO: Replace with actual API call
    alert(`New verification code sent to ${email}\n\nFor demo: use code 123456`)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl text-[#002b5c]">
              {step === "email" ? "Verify Your Email" : "Enter Verification Code"}
            </CardTitle>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <XIcon className="w-5 h-5" />
            </button>
          </div>
        </CardHeader>
        <CardContent>
          {step === "email" ? (
            <form onSubmit={handleSendCode} className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-3">
                  <MailIcon className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div className="text-sm text-blue-900">
                    <p className="font-semibold mb-1">Guest Checkout</p>
                    <p>
                      No registration required! Enter your email to receive your
                      order confirmation and invoice after payment.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-gray-700">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  required
                  className="mt-1"
                  disabled={isLoading}
                />
                <p className="text-xs text-gray-500 mt-1">
                  We'll send a verification code to this email
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-800">
                  {error}
                </div>
              )}

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Order Total:</span>
                  <span className="text-xl font-bold text-primary">
                    ${totalAmount.toFixed(2)} USD
                  </span>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white py-6"
                disabled={isLoading}
              >
                {isLoading ? "Sending Code..." : "Send Verification Code"}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyCode} className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-3">
                  <ShieldCheckIcon className="w-5 h-5 text-green-600 mt-0.5" />
                  <div className="text-sm text-green-900">
                    <p className="font-semibold mb-1">Code Sent!</p>
                    <p>
                      We've sent a 6-digit verification code to{" "}
                      <strong>{email}</strong>
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="code" className="text-gray-700">
                  Verification Code *
                </Label>
                <Input
                  id="code"
                  type="text"
                  value={verificationCode}
                  onChange={(e) => {
                    // Only allow numbers and max 6 digits
                    const value = e.target.value.replace(/\D/g, "").slice(0, 6)
                    setVerificationCode(value)
                  }}
                  placeholder="Enter 6-digit code"
                  required
                  className="mt-1 text-center text-2xl tracking-widest font-mono"
                  maxLength={6}
                  disabled={isLoading}
                  autoComplete="off"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-800">
                  {error}
                </div>
              )}

              <div className="text-center">
                <button
                  type="button"
                  onClick={handleResendCode}
                  className="text-sm text-primary hover:underline"
                >
                  Didn't receive the code? Resend
                </button>
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setStep("email")
                    setVerificationCode("")
                    setError("")
                  }}
                  className="flex-1"
                  disabled={isLoading}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  disabled={isLoading || verificationCode.length !== 6}
                >
                  {isLoading ? "Verifying..." : "Verify & Continue"}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

