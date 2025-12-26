"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MenuIcon, ShoppingCartIcon } from "lucide-react"
import { CartStore } from "@/lib/cart-store"
import { useRouter } from "next/navigation"

export function Header() {
  const [cartCount, setCartCount] = useState(0)
  const router = useRouter()

  useEffect(() => {
    // Initial cart count
    setCartCount(CartStore.getCartCount())

    // Listen for cart updates
    const handleCartUpdate = () => {
      setCartCount(CartStore.getCartCount())
    }

    window.addEventListener("cart-updated", handleCartUpdate)
    return () => window.removeEventListener("cart-updated", handleCartUpdate)
  }, [])

  return (
    <header className="bg-primary text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold hover:text-gray-300 transition-colors">
              MENA Business Directory
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="/" className="hover:text-gray-300 transition-colors">
              Home
            </a>
            <a href="#about" className="hover:text-gray-300 transition-colors">
              About Us
            </a>
            <a href="#services" className="hover:text-gray-300 transition-colors">
              Services
            </a>
            <a href="#contact" className="hover:text-gray-300 transition-colors">
              Contact
            </a>
            
            {/* Cart Icon */}
            <button
              onClick={() => router.push("/cart")}
              className="relative p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ShoppingCartIcon className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Sign In/Register buttons removed - Guest checkout only */}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => router.push("/cart")}
              className="relative p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ShoppingCartIcon className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="p-2">
              <MenuIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

