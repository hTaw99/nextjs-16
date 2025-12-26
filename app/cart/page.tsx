"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/home/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ShoppingCartIcon,
  TrashIcon,
  ArrowLeftIcon,
  BuildingIcon,
} from "lucide-react"
import { CartStore, CartItem } from "@/lib/cart-store"
import { useRouter } from "next/navigation"
import { EmailVerificationModal } from "@/components/email-verification-modal"
import { PaymentConfirmationModal } from "@/components/payment-confirmation-modal"

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false)
  const [isPaymentConfirmationOpen, setIsPaymentConfirmationOpen] = useState(false)
  const [verifiedEmail, setVerifiedEmail] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Load cart items
    setCartItems(CartStore.getCart())

    // Listen for cart updates
    const handleCartUpdate = () => {
      setCartItems(CartStore.getCart())
    }

    window.addEventListener("cart-updated", handleCartUpdate)
    return () => window.removeEventListener("cart-updated", handleCartUpdate)
  }, [])

  const handleRemoveItem = (itemId: string) => {
    CartStore.removeFromCart(itemId)
  }

  const handleClearCart = () => {
    if (confirm("Are you sure you want to clear your cart?")) {
      CartStore.clearCart()
    }
  }

  const subtotal = CartStore.getCartTotal()
  const tax = subtotal * 0.05 // 5% tax
  const total = subtotal + tax

  const handleProceedToCheckout = () => {
    setIsVerificationModalOpen(true)
  }

  const handleEmailVerified = (email: string) => {
    setVerifiedEmail(email)
    setIsVerificationModalOpen(false)
    setIsPaymentConfirmationOpen(true)
  }

  const handlePaymentConfirmationClose = () => {
    setIsPaymentConfirmationOpen(false)
    
    // In production, this would redirect to payment gateway:
    // window.location.href = `/checkout?email=${verifiedEmail}&total=${total}`
    
    // For demo, show completion message
    setTimeout(() => {
      alert("Redirecting to payment gateway...")
    }, 300)
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-6 py-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-6 text-[#002b5c]"
          >
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Continue Shopping
          </Button>

          <div className="text-center py-16">
            <ShoppingCartIcon className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-700 mb-3">
              Your Cart is Empty
            </h2>
            <p className="text-gray-500 mb-6">
              Add premium reports and documents to your cart to get started.
            </p>
            <Button
              onClick={() => router.push("/")}
              className="bg-primary hover:bg-primary/90"
            >
              Browse Companies
            </Button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6 text-[#002b5c]"
        >
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          Continue Shopping
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-primary">
                Shopping Cart
              </h1>
              <Button
                variant="ghost"
                onClick={handleClearCart}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <TrashIcon className="mr-2 h-4 w-4" />
                Clear Cart
              </Button>
            </div>

            {/* Cart Table */}
            <Card>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">
                        Company & Item
                      </th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">
                        Details
                      </th>
                      <th className="text-right py-4 px-6 font-semibold text-gray-700">
                        Price
                      </th>
                      <th className="text-center py-4 px-6 font-semibold text-gray-700 w-20">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => (
                      <tr
                        key={item.id}
                        className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                          index === cartItems.length - 1 ? "border-b-0" : ""
                        }`}
                      >
                        {/* Company & Item Column */}
                        <td className="py-4 px-6">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <BuildingIcon className="w-4 h-4 text-primary" />
                              <span className="text-sm font-medium text-gray-600">
                                {item.companyName}
                              </span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {item.itemName}
                            </h3>
                          </div>
                        </td>

                        {/* Details Column */}
                        <td className="py-4 px-6">
                          {item.language ? (
                            <Badge variant="secondary" className="text-xs">
                              Language: {item.language}
                            </Badge>
                          ) : (
                            <span className="text-sm text-gray-500">
                              Standard Report
                            </span>
                          )}
                        </td>

                        {/* Price Column */}
                        <td className="py-4 px-6 text-right">
                          <div className="text-xl font-bold text-primary">
                            ${item.price.toFixed(2)}
                          </div>
                          <div className="text-xs text-gray-500">USD</div>
                        </td>

                        {/* Action Column */}
                        <td className="py-4 px-6 text-center">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            title="Remove item"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-xl text-primary">
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Items Count */}
                <div className="flex justify-between text-gray-600">
                  <span>Items ({cartItems.length})</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                {/* Tax */}
                <div className="flex justify-between text-gray-600">
                  <span>Tax (5%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span className="text-[#002b5c]">
                      ${total.toFixed(2)} USD
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Button 
                  onClick={handleProceedToCheckout}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg"
                >
                  Proceed to Checkout
                </Button>

                {/* Info Box */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                  <p className="text-sm text-blue-900 mb-2">
                    <strong>Guest Checkout - No Registration Required!</strong>
                  </p>
                  <ul className="text-sm text-blue-900 space-y-1">
                    <li>• Enter your email and verify</li>
                    <li>• Complete secure payment</li>
                    <li>• Receive electronic invoice via email</li>
                    <li>• Documents delivered within TAT</li>
                  </ul>
                </div>

                {/* Additional Info */}
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Verified Documents</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Secure Payment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Email Delivery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>24/7 Support</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Email Verification Modal */}
      <EmailVerificationModal
        isOpen={isVerificationModalOpen}
        onClose={() => setIsVerificationModalOpen(false)}
        onVerified={handleEmailVerified}
        totalAmount={total}
      />

      {/* Payment Confirmation Modal */}
      <PaymentConfirmationModal
        isOpen={isPaymentConfirmationOpen}
        onClose={handlePaymentConfirmationClose}
        email={verifiedEmail || ""}
      />

      {/* Footer */}
      <footer className="bg-primary text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">
                MENA Business Directory
              </h3>
              <p className="text-gray-300">
                Your trusted source for verified company information across the
                MENA region.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="/" className="hover:text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="#" className="hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Email: info@menabusiness.com</li>
                <li>Phone: +971 4 123 4567</li>
                <li>Dubai, UAE</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2025 MENA Business Directory. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

