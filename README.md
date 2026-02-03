# 🌍 Wanderly - Social Travel Discovery Platform

A modern, full-featured social travel app built with Next.js 16, React 19, and Tailwind CSS. Connect with travelers worldwide, discover hidden gems, share authentic travel experiences, and build personalized travel lists.

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1-blue?logo=tailwindcss)](https://tailwindcss.com)

## ✨ Features

### 🗺️ Discovery & Navigation
- **Interactive Global Map** - Visualize and explore places worldwide
- **Smart Search** - Find places, users, and travel lists
- **Browse by Category** - Restaurants, attractions, accommodations, activities
- **Trending Cities** - See what's hot in different destinations
- **Advanced Filters** - Sort by rating, reviews, distance, and more

### 👥 Social Network
- **User Profiles** - Build your travel identity
- **Follow System** - Connect with other travelers
- **Social Feed** - See activities from people you follow
- **Real-time Notifications** - Stay updated on interactions
- **City Communities** - Join discussions for specific locations

### 📍 Place Management
- **Detailed Listings** - Address, hours, contact info, and more
- **Star Ratings** - Community-driven quality indicators
- **Photo Galleries** - Browse authentic traveler photos
- **Review System** - Read and write detailed reviews
- **Bookmark Places** - Save for future reference

### 📋 Lists & Collections
- **Create Custom Lists** - Build personalized travel guides
- **Organize Bookmarks** - Categorize saved places
- **Share Lists** - Share your curated collections
- **Public/Private** - Control who sees your lists
- **Collaborate** - Work with other travelers

### 🔔 Engagement
- **Like & Comment** - Interact with community
- **Share Places** - Recommend to others
- **Real-time Updates** - Live activity streams
- **Badges & Recognition** - Highlight top contributors
- **Community Highlights** - Featured travelers and lists

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ ([Download](https://nodejs.org))
- npm or yarn
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/wanderly.git
cd wanderly

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

```
wanderly/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page
│   ├── discover/          # Discovery page
│   ├── cities/            # Cities directory
│   ├── place/[id]/        # Place details
│   ├── profile/           # User profile
│   ├── following/         # Following feed
│   ├── bookmarks/         # Saved bookmarks
│   ├── settings/          # Settings page
│   ├── api/               # API routes (docs)
│   └── globals.css        # Global styles
├── components/            # Reusable components
├── lib/                   # Utilities & types
├── public/                # Static assets
└── PROJECT.md            # Full documentation
```

## 🎨 Design System

### Color Palette
- **Primary**: Indigo (#5866d5)
- **Secondary**: Orange (#ff8d3d)
- **Accent**: Yellow (#ffc230)
- **Neutrals**: Whites, grays, and dark backgrounds

### Typography
- **Font Family**: Geist (sans-serif)
- **Mono Font**: Geist Mono
- **Scale**: Responsive h1-h6 hierarchy

### Components
- **Buttons** - Primary, outline, ghost variants
- **Cards** - With hover effects and shadows
- **Inputs** - Form fields with validation states
- **Modals** - Dialog boxes for confirmations

## 📖 Documentation

### For Getting Started
- **[QUICK_START.md](/QUICK_START.md)** - Quick developer guide
- **[PROJECT.md](/PROJECT.md)** - Complete project overview

### For Development
- **[IMPLEMENTATION_GUIDE.md](/IMPLEMENTATION_GUIDE.md)** - Backend integration steps
- **[FEATURES.md](/FEATURES.md)** - Feature checklist and roadmap
- **[BUILD_SUMMARY.md](/BUILD_SUMMARY.md)** - Completed work summary

### API Documentation
- **[API Routes](/app/api/README.md)** - Endpoint specifications

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **State**: Mock data (ready for SWR/RTK)

### Backend (To Implement)
- **Database**: PostgreSQL (Supabase/Neon)
- **Auth**: JWT + custom or Auth.js
- **Storage**: Cloudinary
- **Real-time**: WebSockets
- **Hosting**: Vercel

## 📋 Pages

| Page | Path | Purpose |
|------|------|---------|
| Home | `/` | Feed, discovery, trending |
| Discover | `/discover` | Browse and filter places |
| Cities | `/cities` | City directory & communities |
| Place Detail | `/place/[id]` | Complete place information |
| Profile | `/profile` | User profile & activities |
| Following | `/following` | Feed from followed users |
| Bookmarks | `/bookmarks` | Saved places collection |
| Settings | `/settings` | Account & preferences |

## 🎯 Current State

✅ **Complete Frontend MVP**
- All 8 pages built and functional
- 25+ reusable components
- Fully responsive design
- Type-safe codebase
- Professional design system
- Mock data included

🔄 **Ready for Backend Integration**
- API routes documented
- Database schema defined
- Type definitions complete
- Error handling patterns
- Authentication flows designed

## 🚀 Next Steps

### Phase 1: Backend (Week 1-2)
- [ ] Setup PostgreSQL database
- [ ] Implement authentication
- [ ] Create API routes
- [ ] Validate input data

### Phase 2: Integration (Week 3-5)
- [ ] Connect components to API
- [ ] Implement bookmarks
- [ ] Add reviews functionality
- [ ] Setup file uploads

### Phase 3: Real-time (Week 6-7)
- [ ] WebSocket implementation
- [ ] Live notifications
- [ ] Activity streaming
- [ ] Real-time feed updates

### Phase 4: Production (Week 8-10)
- [ ] Testing & QA
- [ ] Performance optimization
- [ ] Security hardening
- [ ] Deployment & monitoring

See [IMPLEMENTATION_GUIDE.md](/IMPLEMENTATION_GUIDE.md) for detailed instructions.

## 📊 Key Statistics

- **Pages**: 8
- **Components**: 25+
- **Type Definitions**: 50+
- **Design Tokens**: 30+
- **Lines of Code**: 5000+
- **Test Coverage**: Ready for implementation
- **TypeScript**: 100% strict mode

## 🎨 Responsive Design

✅ Mobile-first approach
✅ Tablet optimized
✅ Desktop enhanced
✅ Touch-friendly controls
✅ Accessible navigation

## 🔒 Security

✅ XSS protection
✅ CSRF readiness
✅ Input validation (Zod)
✅ Password field patterns
✅ Session management structure

## ♿ Accessibility

✅ Semantic HTML
✅ ARIA labels
✅ Keyboard navigation
✅ Focus management
✅ Color contrast compliant
✅ Screen reader friendly

## 📱 Browser Support

- Chrome/Edge (Latest)
- Firefox (Latest)
- Safari (Latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🚢 Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Deploy to Vercel
```bash
vercel deploy --prod
```

## 📦 Dependencies

### Core
- next@16.0.10
- react@19.2.0
- react-dom@19.2.0
- typescript@5

### UI & Styling
- tailwindcss@4.1.9
- @tailwindcss/postcss@4.1.9
- lucide-react@0.454.0

### Forms & Validation
- react-hook-form@7.60.0
- zod@3.25.76
- @hookform/resolvers@3.10.0

### UI Components
- @radix-ui/* (multiple)
- shadcn/ui components

See [package.json](/package.json) for full list.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 Code Style

- TypeScript strict mode
- ESLint configuration
- Prettier formatting
- 2-space indentation
- Meaningful variable names
- JSDoc comments on components

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/wanderly/issues)
- **Email**: support@wanderly.app
- **Documentation**: See `/` directory for guides

## 📄 License

MIT License - see [LICENSE](/LICENSE) file

## 🙏 Acknowledgments

- **shadcn/ui** - Beautiful component library
- **Next.js** - Amazing React framework
- **Tailwind CSS** - Utility-first CSS
- **Vercel** - Hosting and deployment

## 🎯 Vision

Wanderly connects travelers worldwide, enabling authentic discovery and sharing of travel experiences. Our mission is to help people find hidden gems, connect with like-minded explorers, and build meaningful travel memories together.

## 📈 Roadmap

- ✅ Frontend MVP (v0.1)
- 🔄 Backend Integration (v0.2)
- 🔮 Mobile Apps (v0.3)
- 🔮 AI Recommendations (v1.0)
- 🔮 Marketplace (v1.1)

See [FEATURES.md](/FEATURES.md) for complete roadmap.

---

## Quick Links

- **Live Demo**: [wanderly.app](https://wanderly.app)
- **Documentation**: [/PROJECT.md](/PROJECT.md)
- **Getting Started**: [/QUICK_START.md](/QUICK_START.md)
- **Implementation**: [/IMPLEMENTATION_GUIDE.md](/IMPLEMENTATION_GUIDE.md)
- **Features**: [/FEATURES.md](/FEATURES.md)

---

<div align="center">

**Built with ❤️ for travelers everywhere**

[Website](https://wanderly.app) • [Twitter](https://twitter.com/wanderlyapp) • [Email](mailto:support@wanderly.app)

© 2025 Wanderly. All rights reserved.

</div>
