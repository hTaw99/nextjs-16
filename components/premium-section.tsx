"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { LockIcon, ShoppingCartIcon, CheckIcon } from "lucide-react"
import { CartStore } from "@/lib/cart-store"

interface PremiumItem {
  id: string
  title: string
  description: string
  price: number
  turnaroundDays: string
  languageOptions?: {
    english: number
    arabic: number
    both: number
  }
}

interface PremiumSectionProps {
  items: PremiumItem[]
  onAddToCart: (itemId: string, price: number, language?: string) => void
  companyId: string
  companyName: string
}

export function PremiumSection({ items, onAddToCart, companyId, companyName }: PremiumSectionProps) {
  const [selectedLanguages, setSelectedLanguages] = useState<
    Record<string, string>
  >({})
  const [itemsInCart, setItemsInCart] = useState<Record<string, boolean>>({})

  useEffect(() => {
    // Check which items are in cart
    const updateCartStatus = () => {
      const cart = CartStore.getCart()
      const inCart: Record<string, boolean> = {}
      
      items.forEach((item) => {
        const isInCart = cart.some(
          (cartItem) =>
            cartItem.companyId === companyId &&
            cartItem.itemName === item.title
        )
        inCart[item.id] = isInCart
      })
      
      setItemsInCart(inCart)
    }

    updateCartStatus()

    // Listen for cart updates
    window.addEventListener("cart-updated", updateCartStatus)
    return () => window.removeEventListener("cart-updated", updateCartStatus)
  }, [items, companyId])

  const getItemPrice = (item: PremiumItem) => {
    if (!item.languageOptions) return item.price

    const language = selectedLanguages[item.id] || "english"
    return item.languageOptions[language as keyof typeof item.languageOptions]
  }

  const handleAddToCart = (item: PremiumItem) => {
    const price = getItemPrice(item)
    const language = item.languageOptions
      ? selectedLanguages[item.id] || "english"
      : undefined
    onAddToCart(item.id, price, language)
  }

  const isItemInCart = (itemId: string) => {
    return itemsInCart[itemId] || false
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-[#002b5c]">
          Premium Reports & Documents
        </CardTitle>
        <p className="text-sm text-gray-500">
          Unlock detailed information and verified documents
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
                      className="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:border-primary transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <LockIcon className="w-4 h-4 text-primary" />
                    <h4 className="font-semibold text-gray-900">{item.title}</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>
                      Turnaround: <strong>{item.turnaroundDays}</strong>
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      Verified Data
                    </Badge>
                  </div>

                  {/* Language Selection for Media Report */}
                  {item.languageOptions && (
                    <div className="mt-3">
                      <label className="text-sm text-gray-700 mb-1 block">
                        Select Language:
                      </label>
                      <Select
                        value={selectedLanguages[item.id] || "english"}
                        onValueChange={(value) =>
                          setSelectedLanguages({
                            ...selectedLanguages,
                            [item.id]: value || "english",
                          })
                        }
                      >
                        <SelectTrigger className="w-full max-w-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="english">
                              English - ${item.languageOptions.english}
                            </SelectItem>
                            <SelectItem value="arabic">
                              Arabic - ${item.languageOptions.arabic}
                            </SelectItem>
                            <SelectItem value="both">
                              Both Languages - ${item.languageOptions.both}
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-end gap-2">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">
                      ${getItemPrice(item)}
                    </div>
                    <div className="text-xs text-gray-500">USD</div>
                  </div>
                  <Button
                    onClick={() => handleAddToCart(item)}
                    className={
                      isItemInCart(item.id)
                        ? "bg-gray-400 hover:bg-gray-500 text-white cursor-default"
                        : "bg-green-600 hover:bg-green-700 text-white"
                    }
                    size="sm"
                    disabled={isItemInCart(item.id)}
                  >
                    {isItemInCart(item.id) ? (
                      <>
                        <CheckIcon className="mr-2 h-4 w-4" />
                        Added
                      </>
                    ) : (
                      <>
                        <ShoppingCartIcon className="mr-2 h-4 w-4" />
                        Add to Cart
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-900">
            <strong>Note:</strong> All documents are officially verified and
            delivered within the specified turnaround time. After adding items
            to cart and completing payment, you'll receive the documents via
            email.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

