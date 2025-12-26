"use client";

import { useState } from "react";
import { Header } from "@/components/home/header";
import { HeroSection } from "@/components/home/hero-section";
import { HowItWorks } from "@/components/home/how-it-works";
import { SearchResults } from "@/components/home/search-results";
import { InvestigationRequestModal } from "@/components/investigation-request-modal";

// Mock data for demonstration
const mockCompanies = [
  {
    id: "1",
    name: "Emirates Steel Industries",
    nameArabic: "صناعات الإمارات للحديد",
    country: "United Arab Emirates",
    city: "Abu Dhabi",
    industry: "Manufacturing & Steel Production",
    employees: "1,500-2,000",
    status: "active" as const,
    registrationNumber: "CN-1234567",
  },
  {
    id: "2",
    name: "Dubai Holdings",
    nameArabic: "دبي القابضة",
    country: "United Arab Emirates",
    city: "Dubai",
    industry: "Investment & Real Estate",
    employees: "5,000+",
    status: "active" as const,
    registrationNumber: "CN-2345678",
  },
  {
    id: "3",
    name: "Saudi Aramco Services",
    nameArabic: "خدمات أرامكو السعودية",
    country: "Saudi Arabia",
    city: "Dhahran",
    industry: "Oil & Gas Services",
    employees: "10,000+",
    status: "active" as const,
    registrationNumber: "CR-3456789",
  },
  {
    id: "4",
    name: "Qatar National Bank",
    nameArabic: "بنك قطر الوطني",
    country: "Qatar",
    city: "Doha",
    industry: "Banking & Finance",
    employees: "3,000-5,000",
    status: "active" as const,
    registrationNumber: "QR-4567890",
  },
  {
    id: "5",
    name: "Emaar Properties",
    nameArabic: "إعمار العقارية",
    country: "United Arab Emirates",
    city: "Dubai",
    industry: "Real Estate Development",
    employees: "2,500-3,000",
    status: "active" as const,
    registrationNumber: "CN-5678901",
  },
  {
    id: "6",
    name: "Al Majid Trading",
    nameArabic: "المجيد للتجارة",
    country: "United Arab Emirates",
    city: "Dubai",
    industry: "Retail & Trading",
    employees: "500-1,000",
    status: "inactive" as const,
    registrationNumber: "CN-6789012",
  },
];

export default function Page() {
  const [searchResults, setSearchResults] = useState<typeof mockCompanies>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = (country: string, companyName: string) => {
    setHasSearched(true);
    setSearchQuery(companyName);
    setSelectedCountry(country);

    // Filter mock data based on search criteria
    const filtered = mockCompanies.filter((company) => {
      const matchesCountry =
        country === "uae"
          ? company.country === "United Arab Emirates"
          : country === "saudi"
          ? company.country === "Saudi Arabia"
          : country === "qatar"
          ? company.country === "Qatar"
          : true;

      const matchesName = company.name
        .toLowerCase()
        .includes(companyName.toLowerCase());

      return matchesCountry && matchesName;
    });

    setSearchResults(filtered);
  };

  const getCountryName = (countryCode: string) => {
    const countryMap: Record<string, string> = {
      uae: "United Arab Emirates",
      saudi: "Saudi Arabia",
      qatar: "Qatar",
      egypt: "Egypt",
      bahrain: "Bahrain",
      kuwait: "Kuwait",
      oman: "Oman",
      jordan: "Jordan",
      lebanon: "Lebanon",
      morocco: "Morocco",
    };
    return countryMap[countryCode] || countryCode;
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection onSearch={handleSearch} />
        <HowItWorks />
        {hasSearched && (
          <SearchResults
            results={searchResults}
            searchQuery={searchQuery}
            country={getCountryName(selectedCountry)}
            onRequestInvestigation={() => setIsModalOpen(true)}
          />
        )}
      </main>
      <InvestigationRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
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
                    Pricing
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
  );
}
