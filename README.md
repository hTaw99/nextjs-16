# MENA Business Directory

A modern, full-featured business directory application for searching and discovering verified companies across the Middle East and North Africa (MENA) region.

## 🌟 Features

### Home Page
- **Hero Section**: Full-width banner with integrated search functionality
- **Advanced Search**: Search companies by country and name
- **How It Works**: Clear 3-step process visualization
- **Dynamic Search Results**: Real-time filtering and display of company information
- **Responsive Design**: Mobile-first approach with beautiful UI/UX

### Company Details Page
- **Comprehensive Company Profiles**: Detailed information about each company
- **Contact Information**: Address, phone, email, and website
- **Financial Data**: Revenue, establishment date, and legal structure
- **Document Management**: Access to company certificates and reports
- **Services Overview**: List of company products and services

## 🎨 Design

The application uses a professional navy blue color scheme inspired by leading MENA business platforms:
- **Primary Color**: `#002b5c` (Navy Blue)
- **Secondary Color**: `#003d7a` (Lighter Navy)
- **Modern UI Components**: Built with shadcn/ui
- **Smooth Animations**: Hover effects and transitions

## 🛠️ Tech Stack

- **Framework**: Next.js 16.1.1 with App Router
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui (Vega preset)
- **Icons**: Lucide React
- **TypeScript**: Full type safety
- **Font**: Inter (primary), Geist Sans & Mono

## 📁 Project Structure

```
nextjs-16/
├── app/
│   ├── page.tsx                    # Home page with search functionality
│   ├── layout.tsx                  # Root layout with metadata
│   ├── globals.css                 # Global styles and theme
│   └── company/
│       └── [id]/
│           └── page.tsx            # Dynamic company details page
├── components/
│   ├── home/
│   │   ├── header.tsx             # Navigation header
│   │   ├── hero-section.tsx       # Hero banner with search
│   │   ├── how-it-works.tsx       # Process explanation section
│   │   └── search-results.tsx     # Search results display
│   └── ui/                         # shadcn/ui components
└── lib/
    └── utils.ts                    # Utility functions
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd nextjs-16
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📱 Pages

### Home Page (`/`)
- Full-width hero section with background image
- Country selector dropdown (10 MENA countries)
- Company name search input
- "How It Works" section with 3 steps
- Dynamic search results section (appears after search)
- Footer with company information and links

### Company Details Page (`/company/[id]`)
- Company header with logo and status badge
- Contact information sidebar
- Company overview and description
- Services and products listing
- Financial information
- Available documents for download
- Call-to-action for detailed reports

## 🎯 Key Features Explained

### Search Functionality
- **Country Filter**: Select from 10 MENA countries
- **Name Search**: Full or partial company name matching
- **Real-time Results**: Instant filtering of company database
- **Smart Matching**: Case-insensitive search

### Company Cards
- Status indicators (Active/Inactive)
- Registration numbers (CRN)
- Location information
- Industry classification
- Employee count
- Quick actions (View Details, Request Report)

### Navigation
- Sticky header for easy access
- Back navigation from detail pages
- Responsive mobile menu
- Professional branding

## 🌍 Supported Countries

- United Arab Emirates
- Saudi Arabia
- Egypt
- Qatar
- Bahrain
- Kuwait
- Oman
- Jordan
- Lebanon
- Morocco

## 🎨 UI/UX Highlights

1. **Professional Color Scheme**: Navy blue (#002b5c) matching Zawya's brand
2. **Intuitive Layout**: Clear information hierarchy
3. **Smooth Interactions**: Hover effects and transitions
4. **Accessibility**: Proper semantic HTML and ARIA labels
5. **Loading States**: Visual feedback for user actions
6. **Responsive Grid**: Adapts to all screen sizes

## 📊 Mock Data

The application currently uses mock data for demonstration. The data structure includes:
- Company names and IDs
- Registration numbers
- Contact information
- Financial metrics
- Employee counts
- Industry classifications
- Document listings

## 🔜 Future Enhancements

- Integration with real MENA business databases
- Advanced filtering (industry, size, revenue)
- User authentication and profiles
- Saved searches and favorites
- Report generation and download
- Multi-language support (Arabic/English)
- Payment integration for premium reports
- Admin dashboard for company management

## 📄 License

This project is private and proprietary.

## 🤝 Contributing

Please contact the development team for contribution guidelines.

## 📞 Support

For support and questions, please contact:
- Email: info@menabusiness.com
- Phone: +971 4 123 4567
- Location: Dubai, UAE

---

Built with ❤️ for the MENA business community
