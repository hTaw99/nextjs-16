import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Cairo } from "next/font/google";
import "./globals.css";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-arabic',
  display: 'swap',
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MENA Business Directory - Search Verified Companies",
  description: "Search over 1 million verified MENA companies. Find company information, reports, and business intelligence across the Middle East and North Africa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cairo.variable}`}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
