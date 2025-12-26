"use client";

import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface HeroSectionProps {
  onSearch: (country: string, companyName: string) => void;
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
];

export function HeroSection({ onSearch }: HeroSectionProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const country = formData.get("country") as string;
    const companyName = formData.get("companyName") as string;
    onSearch(country, companyName);
  };

  return (
    <section className="relative w-full h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
          alt="Business skyline"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#002b5c]/95 to-[#003d7a]/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
          Search over 1 million
        </h1>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          verified MENA companies
        </h2>
        <p className="text-xl text-white/90 mb-8">
          Search by company name, CRN, or country
        </p>

        {/* Search Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Country Dropdown - Separate Box */}
            <Select name="country" defaultValue="uae">
              <SelectTrigger className="cursor-pointer border-0 text-base w-[200px] font-medium bg-white max-h-[64px] min-h-[64px] h-[64px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent align="start" sideOffset={-200}>
                <SelectGroup>
                  {countries.map((country) => (
                    <SelectItem key={country.value} value={country.value}>
                      {country.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* Search Input and Button - Separate Box */}
            <div className="flex-1 flex gap-3 bg-white rounded-lg shadow-xl p-2">
              <Input
                name="companyName"
                type="text"
                placeholder="Enter company name or partial name..."
                className="h-12 border-0 flex-1 text-base"
                required
              />
              <Button
                type="submit"
                size="lg"
                className="h-12 px-8 bg-primary hover:bg-primary/90 text-white whitespace-nowrap"
              >
                <SearchIcon className="mr-2 h-5 w-5" />
                Search
              </Button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
