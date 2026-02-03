# Wanderly Implementation Guide

This guide outlines the next steps to complete the Wanderly social travel app from the current UI/UX prototype to a fully functional application.

## Current State

✅ **Completed**
- Full UI/UX implementation with all pages and components
- Responsive design for mobile, tablet, and desktop
- Interactive map visualization
- Social feed and notification system
- User profile and settings pages
- Search and filtering capabilities
- Design tokens and theme system

## Phase 1: Authentication & Backend Setup

### 1.1 Database Setup (PostgreSQL)
Choose one provider:
- **Supabase** (recommended - includes auth)
- **Neon** (serverless PostgreSQL)

**Tasks:**
1. Create PostgreSQL database
2. Run migration scripts from `/scripts/db-schema.sql`
3. Set up connection pooling
4. Create indexes for search queries

### 1.2 Authentication
Implement user authentication with:
- Registration endpoint
- Login endpoint
- JWT token management
- Password hashing (bcrypt)
- Session management

**Files to create:**
```
app/api/auth/
  ├── register/route.ts
  ├── login/route.ts
  ├── logout/route.ts
  └── refresh/route.ts
```

**Implementation example:**
```typescript
// app/api/auth/register/route.ts
import { hash } from 'bcryptjs';
import { z } from 'zod';

const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  fullName: z.string().min(2),
  username: z.string().min(3).max(30),
});

export async function POST(request: Request) {
  const body = await request.json();
  const validated = RegisterSchema.parse(body);
  
  // Hash password
  const hashedPassword = await hash(validated.password, 10);
  
  // Create user in database
  // Return JWT token
}
```

### 1.3 Update Components for Real Auth
Replace mock data in components with actual API calls:

**Header Component:**
```typescript
// Get auth state from context or hook
const { user, logout } = useAuth();

// Conditionally render login/profile based on user state
```

**Create Context for Auth:**
```typescript
// lib/auth-context.tsx
import { createContext, useContext, ReactNode } from 'react';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const useAuth = () => useContext(AuthContext);
```

## Phase 2: API Routes Implementation

### 2.1 Create API Routes
Implement all endpoints listed in `/app/api/README.md`

**Priority order:**
1. User endpoints (profile, follow, unfollow)
2. Place endpoints (get, create, filter)
3. Bookmark endpoints
4. Review endpoints
5. Feed/social endpoints

**Example structure:**
```typescript
// app/api/places/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const city = searchParams.get('city');
  
  // Query database with filters
  // Return paginated results
}

export async function POST(request: Request) {
  const auth = await verifyAuth(request);
  if (!auth) return unauthorized();
  
  const body = await request.json();
  // Validate and create place
}
```

### 2.2 Input Validation
Use Zod schemas for all API inputs:

```typescript
// lib/schemas.ts
export const CreatePlaceSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().min(10).max(5000),
  category: z.enum(['restaurant', 'attraction', ...]),
  address: z.string(),
  city: z.string(),
  country: z.string(),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});
```

### 2.3 Error Handling
Implement consistent error responses:

```typescript
// lib/api-error.ts
export class APIError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code: string = 'INTERNAL_ERROR'
  ) {
    super(message);
  }
}

export const errorHandler = (error: unknown) => {
  if (error instanceof APIError) {
    return Response.json(
      { error: error.message, code: error.code },
      { status: error.statusCode }
    );
  }
  return Response.json(
    { error: 'Internal server error' },
    { status: 500 }
  );
};
```

## Phase 3: Client-Side Data Fetching

### 3.1 Convert Components to Use API
Replace mock data with real API calls using SWR:

```typescript
// hooks/use-places.ts
import useSWR from 'swr';
import { Place } from '@/lib/types';

export function usePlaces(filters?: Record<string, string>) {
  const queryString = new URLSearchParams(filters).toString();
  const { data, error, isLoading } = useSWR<Place[]>(
    `/api/places${queryString ? `?${queryString}` : ''}`,
    fetcher
  );
  
  return { places: data, error, isLoading };
}
```

### 3.2 Create Custom Hooks
For common operations:

```typescript
// hooks/use-bookmark.ts
export function useBookmark(placeId: string) {
  const { data: isBookmarked } = useSWR(
    `/api/bookmarks/${placeId}`
  );
  
  const bookmark = async () => {
    const res = await fetch('/api/bookmarks', {
      method: 'POST',
      body: JSON.stringify({ placeId }),
    });
    return res.json();
  };
  
  return { isBookmarked, bookmark };
}
```

### 3.3 Update Components
Example: Convert PlaceCard to use real data

```typescript
// components/place-card.tsx
interface PlaceCardProps {
  placeId: string;
  onClick?: () => void;
}

export default function PlaceCard({ placeId, onClick }: PlaceCardProps) {
  const { place, error, isLoading } = useSinglePlace(placeId);
  const { isBookmarked, bookmark } = useBookmark(placeId);
  
  if (isLoading) return <PlaceCardSkeleton />;
  if (error) return <PlaceCardError />;
  
  return (
    <div onClick={onClick} className="...">
      {/* Use place data instead of mock */}
      <h3>{place.name}</h3>
      <button onClick={() => bookmark()}>
        <Heart className={isBookmarked ? 'fill-red-500' : ''} />
      </button>
    </div>
  );
}
```

## Phase 4: File Upload & Image Processing

### 4.1 Setup Cloudinary
1. Create Cloudinary account
2. Get API key and upload preset
3. Store in environment variables

### 4.2 Create Upload Endpoint
```typescript
// app/api/upload/route.ts
import { v2 as cloudinary } from 'cloudinary';

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file') as File;
  
  const buffer = await file.arrayBuffer();
  const result = await cloudinary.uploader.upload_stream(
    { resource_type: 'auto' },
    (error, result) => {
      if (error) throw error;
      return result;
    }
  ).end(buffer);
  
  return Response.json({ url: result.secure_url });
}
```

### 4.3 Update Review Component
```typescript
// Add file input to review form
<input
  type="file"
  multiple
  onChange={handlePhotoSelect}
  accept="image/*"
/>

const handlePhotoSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = e.currentTarget.files;
  if (!files) return;
  
  const uploads = Array.from(files).map(file => {
    const formData = new FormData();
    formData.append('file', file);
    return fetch('/api/upload', { method: 'POST', body: formData })
      .then(res => res.json());
  });
  
  const results = await Promise.all(uploads);
  setPhotos(results.map(r => r.url));
};
```

## Phase 5: Real-Time Features

### 5.1 Setup WebSocket Connection
```typescript
// lib/websocket.ts
export class TravelSocket {
  private ws: WebSocket | null = null;
  
  connect(token: string) {
    this.ws = new WebSocket(`wss://api.wanderly.app/ws?token=${token}`);
    
    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.handleMessage(data);
    };
  }
  
  private handleMessage(data: any) {
    if (data.type === 'notification') {
      // Update notifications
    }
    if (data.type === 'feed_update') {
      // Update feed
    }
  }
}
```

### 5.2 Update Notification Component
```typescript
// Use WebSocket for real-time notifications
const ws = useRef<TravelSocket | null>(null);

useEffect(() => {
  const socket = new TravelSocket();
  socket.connect(token);
  ws.current = socket;
  
  return () => socket.disconnect();
}, [token]);
```

## Phase 6: Performance Optimization

### 6.1 Image Optimization
```typescript
// Use Next.js Image component
import Image from 'next/image';

<Image
  src={place.thumbnail}
  alt={place.name}
  width={400}
  height={300}
  priority={false}
  placeholder="blur"
/>
```

### 6.2 Code Splitting
```typescript
// Use dynamic imports for heavy components
const InteractiveMap = dynamic(
  () => import('@/components/interactive-map'),
  { loading: () => <MapSkeleton /> }
);
```

### 6.3 Database Queries
- Add indexes on frequently queried columns
- Use pagination for large result sets
- Implement caching with Redis
- Use database query optimization

## Phase 7: Testing

### 7.1 Unit Tests
```bash
npm install --save-dev @testing-library/react vitest
```

```typescript
// components/__tests__/place-card.test.tsx
import { render, screen } from '@testing-library/react';
import PlaceCard from '@/components/place-card';

describe('PlaceCard', () => {
  it('renders place information', () => {
    render(<PlaceCard place={mockPlace} />);
    expect(screen.getByText(mockPlace.name)).toBeInTheDocument();
  });
});
```

### 7.2 API Tests
```typescript
// Test API endpoints
describe('GET /api/places', () => {
  it('returns places with filters', async () => {
    const res = await GET(new Request('?city=Paris'));
    const data = await res.json();
    expect(data).toHaveProperty('places');
  });
});
```

## Phase 8: Deployment

### 8.1 Prepare for Production
```bash
# Build application
npm run build

# Test build locally
npm start
```

### 8.2 Environment Variables
Set up in deployment platform:
- `DATABASE_URL`
- `CLOUDINARY_API_KEY`
- `JWT_SECRET`
- `NEXT_PUBLIC_API_URL`

### 8.3 Deploy to Vercel
```bash
vercel deploy --prod
```

## Maintenance Checklist

- [ ] Setup monitoring (Sentry for errors)
- [ ] Setup analytics (Google Analytics or Mixpanel)
- [ ] Setup backup strategy for database
- [ ] Setup CDN for static assets
- [ ] Setup rate limiting for API
- [ ] Setup CORS policies
- [ ] Setup security headers
- [ ] Setup SSL/TLS certificates

## Quick Reference

### Key NPM Commands
```bash
npm run dev        # Start development
npm run build      # Build for production
npm start          # Start production server
npm run lint       # Lint code
npm test           # Run tests
```

### Database Migration Example
```typescript
// scripts/db-schema.sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  bio TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
```

## Getting Help

- Next.js Docs: https://nextjs.org/docs
- React Docs: https://react.dev
- TypeScript: https://www.typescriptlang.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- Supabase: https://supabase.com/docs
- Cloudinary: https://cloudinary.com/documentation

## Timeline Estimate

- Phase 1: 1 week (Auth setup)
- Phase 2: 2 weeks (API routes)
- Phase 3: 1 week (Data fetching)
- Phase 4: 1 week (Image upload)
- Phase 5: 1 week (Real-time)
- Phase 6-8: 2 weeks (Optimization & deployment)

**Total: 8-9 weeks for production-ready app**

---

Good luck building Wanderly! 🚀
