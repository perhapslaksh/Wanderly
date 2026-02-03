# Wanderly - Social Travel Discovery Platform

A modern, full-featured social travel app built with Next.js 16, React 19, and Tailwind CSS. Connect with travelers worldwide, discover hidden gems, share authentic travel experiences, and build personalized travel lists.

## Project Overview

Wanderly combines the social aspects of platforms like Instagram and Twitter with travel-specific features from TripAdvisor and Google Maps. Users can discover places, read reviews, bookmark locations, create custom lists, and connect with other travelers.

## Key Features

### 🗺️ Core Features
- **Interactive Map**: Visualize places globally with zoom and selection features
- **Place Discovery**: Browse curated recommendations with detailed information
- **Bookmarking System**: Save places to personal lists for future reference
- **Reviews & Ratings**: Read and write authentic reviews with photo uploads
- **Custom Lists**: Create and share personalized travel guides and collections

### 👥 Social Features
- **User Profiles**: Build your travel profile with reviews and followers
- **Following System**: Follow travelers and see their activities
- **Social Feed**: Real-time updates from people you follow
- **City Communities**: Join discussions and followers for specific cities
- **Trending Insights**: Discover what's hot in different destinations

### 🔔 Real-time Updates
- **Notifications**: Get instant updates on follows, likes, and comments
- **Live Feed**: Real-time activity updates from your network
- **Activity Stream**: See what other travelers are doing

### 📱 User Experience
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Dark/Light Modes**: Customizable appearance settings
- **Search & Filter**: Find places, users, and lists easily
- **Privacy Controls**: Manage who sees your profile and activity

## Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation

### Backend (To be implemented)
- **Database**: PostgreSQL (Supabase or Neon recommended)
- **Authentication**: Custom JWT-based or Auth.js
- **File Storage**: Cloudinary (for photo uploads)
- **Real-time**: WebSockets via Next.js API routes

### Architecture Patterns
- Server-Side Rendering (SSR) for SEO
- Client-Side Interactivity with React hooks
- API Routes for backend logic
- Type-safe code with TypeScript

## Project Structure

```
wanderly/
├── app/                          # Next.js app directory
│   ├── layout.tsx               # Root layout with metadata
│   ├── page.tsx                 # Home page with feed & discovery
│   ├── discover/                # Place discovery page
│   ├── cities/                  # Cities browsing and communities
│   ├── place/[id]/              # Place detail page
│   ├── profile/                 # User profile page
│   ├── following/               # Following feed
│   ├── bookmarks/               # Saved bookmarks
│   ├── settings/                # User settings
│   ├── api/                     # API routes (to be implemented)
│   └── globals.css              # Global styles with design tokens
│
├── components/                  # Reusable UI components
│   ├── header.tsx              # Main header/navigation
│   ├── place-card.tsx          # Place display card
│   ├── review-card.tsx         # Review display component
│   ├── feed-post.tsx           # Social feed post
│   ├── interactive-map.tsx     # Global map visualization
│   ├── notification-center.tsx # Notification system
│   └── ui/                     # shadcn/ui components
│
├── lib/                         # Utilities and types
│   ├── types.ts                # TypeScript type definitions
│   └── utils.ts                # Helper functions
│
├── hooks/                       # Custom React hooks
│   ├── use-mobile.tsx
│   └── use-toast.ts
│
├── public/                      # Static assets
└── tsconfig.json               # TypeScript configuration
```

## Page Routes

### Public Pages
- `/` - Home/Feed page
- `/discover` - Place discovery with filters
- `/cities` - Cities listing and community
- `/place/[id]` - Detailed place information

### Protected Pages (Authentication required)
- `/profile` - User profile
- `/following` - Following feed
- `/bookmarks` - Saved bookmarks
- `/settings` - Account settings

## Component Overview

### Header (`/components/header.tsx`)
Main navigation component with:
- Logo and branding
- Navigation links (Home, Discover, Cities, Following)
- User menu (if logged in)
- Notification bell with dropdown
- Mobile navigation toggle

### Place Card (`/components/place-card.tsx`)
Reusable card for displaying places:
- Image with hover effects
- Rating stars and review count
- Category badge
- Bookmark button
- Review and share actions

### Review Card (`/components/review-card.tsx`)
Display individual reviews with:
- User avatar and name
- Star rating
- Review title and content
- Photo gallery
- Helpful count and reply options

### Interactive Map (`/components/interactive-map.tsx`)
Global map visualization:
- SVG-based map rendering
- Clickable place markers
- Zoom controls (in/out)
- Place info on selection
- Responsive design

### Feed Post (`/components/feed-post.tsx`)
Social media-style posts showing:
- User activity (review, bookmark, list creation)
- Place/list preview
- Like, comment, share actions
- Real-time interaction counters

### Notification Center (`/components/notification-center.tsx`)
Notification management:
- Dropdown notification list
- Mark as read/unread
- Notification types (follow, like, comment)
- Relative timestamps
- Quick navigation

## Design System

### Color Palette
- **Primary**: #5866d5 (Indigo Blue) - Main brand color
- **Secondary**: #ff8d3d (Warm Orange) - Accents and highlights
- **Accent**: #ffc230 (Golden Yellow) - Call-to-action elements
- **Neutrals**: White, grays, and dark backgrounds for contrast

### Typography
- **Font**: Geist (sans-serif) for body and headers
- **Mono**: Geist Mono for code elements
- **Hierarchy**: Clear H1-H6 sizing with proper line heights

### Spacing Scale
Uses Tailwind's default spacing (4px units) for consistency:
- `p-2`, `p-4`, `p-6` for padding
- `gap-2`, `gap-4`, `gap-6` for spacing between elements
- `mb-4`, `mt-6` for margin adjustments

### Components
- Buttons with multiple variants (primary, outline, ghost)
- Cards with hover effects and shadows
- Rounded corners (0.625rem default)
- Smooth transitions and animations

## Future Enhancements

### Phase 2
- [ ] User authentication and registration
- [ ] Database integration (PostgreSQL)
- [ ] Photo upload to Cloudinary
- [ ] Email notifications
- [ ] Search functionality

### Phase 3
- [ ] WebSocket real-time updates
- [ ] Mobile app (React Native)
- [ ] Advanced filters and recommendations
- [ ] Offline mode with sync
- [ ] AI-powered place recommendations

### Phase 4
- [ ] Monetization (sponsored places, premium features)
- [ ] Analytics dashboard for place owners
- [ ] Travel itinerary planner
- [ ] Integration with booking platforms
- [ ] Community moderation tools

## Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- Modern web browser

### Installation
```bash
# Clone repository
git clone <repo-url>
cd wanderly

# Install dependencies
npm install

# Run development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

### Build for Production
```bash
npm run build
npm start
```

## Development Guidelines

### Code Style
- Use TypeScript for all new code
- Follow ESLint configuration in project
- Use Prettier for consistent formatting
- Write descriptive commit messages

### Component Patterns
- Create reusable components in `/components`
- Use React hooks for state management
- Keep components focused and single-responsibility
- Document props with JSDoc comments

### Performance
- Use React.memo for expensive components
- Implement code splitting with dynamic imports
- Optimize images with Next.js Image component
- Use CSS Grid/Flexbox for layouts (not floats)

### Accessibility
- Semantic HTML elements
- ARIA labels for screen readers
- Keyboard navigation support
- Color contrast ratios ≥ 4.5:1

## Deployment

### Vercel (Recommended)
```bash
vercel deploy
```

### Docker
```bash
docker build -t wanderly .
docker run -p 3000:3000 wanderly
```

## Environment Variables

Create `.env.local` file with:
```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
DATABASE_URL=postgresql://...
CLOUDINARY_API_KEY=...
JWT_SECRET=...
```

## Contributing

1. Create feature branch: `git checkout -b feature/amazing-feature`
2. Make changes and test thoroughly
3. Commit with clear messages: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request with description

## License

MIT License - see LICENSE file for details

## Support

For issues or questions:
- Open an issue on GitHub
- Contact: support@wanderly.app
- Documentation: https://docs.wanderly.app

---

**Built with ❤️ for travelers everywhere**
