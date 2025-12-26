import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function maskCRN(crn: string): string {
  if (!crn || crn.length <= 4) return crn
  const lastFour = crn.slice(-4)
  const masked = 'x'.repeat(crn.length - 4)
  return masked + lastFour
}
