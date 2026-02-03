# Quick Start Guide - Wanderly

Get Wanderly up and running in minutes!

## Prerequisites

- Node.js 18+ ([Download](https://nodejs.org))
- npm or yarn
- Git
- Code editor (VS Code recommended)

## 1. Clone & Setup (2 minutes)

```bash
# Clone the repository
git clone <repository-url>
cd wanderly

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
```

## 2. Start Development Server (1 minute)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. You should see the Wanderly home page!

## 3. Project Structure Overview

```
wanderly/
├── app/                  # All pages and routes
│   ├── page.tsx         # Home page
│   ├── discover/        # Discovery page
│   ├── cities/          # Cities page
│   ├── profile/         # User profile
│   └── ...
├── components/          # Reusable React components
│   ├── header.tsx       # Navigation
│   ├── place-card.tsx   # Place display
│   └── ...
├── lib/                 # Utilities and types
│   ├── types.ts         # TypeScript definitions
│   └── utils.ts         # Helper functions
└── public/              # Static assets
```

## 4. Key Pages to Explore

### Home Page (`/`)
- Main feed with social posts
- Feature discovery section
- Interactive map
- Trending cities and users

### Discover (`/discover`)
- Browse all places
- Filter by category
- Sort by rating or reviews
- View in grid or list

### Cities (`/cities`)
- City communities
- Trending insights
- Follow cities
- Search locations

### Place Detail (`/place/[id]`)
- Place information
- Reviews and ratings
- Photo gallery
- Visitor profiles

## 5. Key Components

### Header
```typescript
import Header from '@/components/header';

// Used on every page
<Header />
```

### Place Card
```typescript
import PlaceCard from '@/components/place-card';

<PlaceCard 
  place={placeData}
  onBookmark={(id) => console.log('Bookmarked:', id)}
/>
```

### Interactive Map
```typescript
import InteractiveMap from '@/components/interactive-map';

<InteractiveMap 
  places={places}
  onPlaceSelect={(place) => console.log(place)}
/>
```

## 6. Available Scripts

```bash
# Development
npm run dev        # Start dev server (http://localhost:3000)

# Building
npm run build      # Build for production
npm start          # Start production server

# Code Quality
npm run lint       # Check code quality
npm run format     # Format code with Prettier

# Testing (when implemented)
npm test          # Run unit tests
npm run test:e2e  # Run E2E tests
```

## 7. Component Examples

### Creating a Simple Component

```typescript
// components/my-component.tsx
import { Button } from '@/components/ui/button';

interface MyComponentProps {
  title: string;
  onClick?: () => void;
}

export default function MyComponent({ title, onClick }: MyComponentProps) {
  return (
    <div className="p-4 border border-border rounded-lg bg-card">
      <h2 className="text-xl font-bold">{title}</h2>
      <Button onClick={onClick} className="mt-4">
        Click Me
      </Button>
    </div>
  );
}
```

### Using Design Tokens

```typescript
// Use design tokens defined in globals.css
<div className="bg-background text-foreground">
  <h1 className="text-primary">Primary color</h1>
  <h2 className="text-accent">Accent color</h2>
  <p className="text-muted-foreground">Muted text</p>
</div>
```

## 8. Common Tasks

### Add a New Page

1. Create file in `app/[page-name]/page.tsx`:
```typescript
export default function PageName() {
  return (
    <div>
      <Header />
      {/* Your content */}
    </div>
  );
}
```

2. It's automatically accessible at `/page-name`

### Add a New Component

1. Create file in `components/my-component.tsx`
2. Import and use:
```typescript
import MyComponent from '@/components/my-component';

<MyComponent prop="value" />
```

### Update Styling

All styles use Tailwind CSS classes:
```typescript
<div className="
  px-4 py-2              // Padding
  bg-primary             // Background
  text-white             // Text color
  rounded-lg             // Border radius
  hover:shadow-lg        // Hover effect
  transition-all         // Smooth transition
  dark:bg-slate-900     // Dark mode
"
>
  Styled content
</div>
```

### Add Type Definitions

Edit `lib/types.ts`:
```typescript
export interface MyType {
  id: string;
  name: string;
  // ... more fields
}
```

## 9. Useful Tools & Extensions

### VS Code Extensions (Recommended)
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin
- Prettier - Code formatter
- ESLint

### Browser DevTools
- React Developer Tools
- Redux DevTools
- Tailwind CSS IntelliSense

## 10. Styling Cheatsheet

### Common Patterns

```typescript
// Flexbox layout
<div className="flex items-center justify-between gap-4">

// Grid layout
<div className="grid grid-cols-2 md:grid-cols-3 gap-4">

// Card styling
<div className="border border-border rounded-lg p-4 bg-card hover:shadow-lg transition-shadow">

// Button styling
<button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90">

// Text styling
<h1 className="text-4xl font-bold text-balance gradient-text">

// Responsive design
<div className="hidden md:block lg:hidden"> {/* visible on md and lg only */}
```

## 11. Data Flow

### Current Architecture (Mock Data)
```
Page Component
  ↓
  Uses mock data from arrays
  ↓
  Renders child components
  ↓
  User interactions (console logs)
```

### Future Architecture (With Backend)
```
Page Component
  ↓
  Fetch from API (/api/...)
  ↓
  Store in React state/SWR cache
  ↓
  Render child components
  ↓
  User interactions → API calls → State updates
```

## 12. Troubleshooting

### Port 3000 already in use
```bash
# macOS/Linux
sudo lsof -i :3000
kill -9 <PID>

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Module not found errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Styling not working
- Make sure you're using Tailwind classes (not CSS)
- Check that `app/globals.css` is imported in `app/layout.tsx`
- Verify class names match Tailwind syntax

### TypeScript errors
```bash
# Run type check
npx tsc --noEmit

# Fix any errors shown
```

## 13. Next Steps

1. **Explore the code**: Read through components to understand structure
2. **Make small changes**: Try modifying text, colors, or layouts
3. **Add a new component**: Create something simple and add it to a page
4. **Study the design**: Understand how the design system works
5. **Plan features**: Think about what features to build next

## 14. Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [React 19 Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)

### Learning Resources
- [Next.js Tutorial](https://nextjs.org/learn)
- [React Patterns](https://react-patterns.com)
- [Tailwind Utilities](https://tailwindcss.com/docs/utility-first)

## 15. Getting Help

### Common Questions

**Q: How do I add a new page?**
A: Create a new folder in `/app` with a `page.tsx` file

**Q: How do I style components?**
A: Use Tailwind CSS classes in the `className` prop

**Q: Where do I put shared components?**
A: Create them in `/components` and import where needed

**Q: How do I add types?**
A: Define them in `lib/types.ts` and import

**Q: How do I add global styles?**
A: Modify `app/globals.css` with Tailwind `@layer` directives

### Need More Help?
- Check existing components for examples
- Read the `/IMPLEMENTATION_GUIDE.md` for detailed info
- Review TypeScript error messages carefully
- Search GitHub issues for similar problems

---

## You're Ready! 🚀

You now have Wanderly running locally. Start exploring and building amazing features!

**Happy coding!**
