'use client';

import { useState } from 'react';
import Header from '@/components/header';
import PlaceCard from '@/components/place-card';
import InteractiveMap from '@/components/interactive-map';
import FeedPostComponent from '@/components/feed-post';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Search, TrendingUp, Users, MapPin, ArrowRight } from 'lucide-react';
import { Place, FeedPost } from '@/lib/types';

// Mock data
const mockPlaces: Place[] = [
  {
    id: '1',
    name: 'Eiffel Tower',
    description: 'Iconic iron lattice tower offering stunning views of Paris',
    category: 'attraction',
    address: '5 Avenue Anatole France',
    city: 'Paris',
    country: 'France',
    latitude: 48.8584,
    longitude: 2.2945,
    thumbnail: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop',
    rating: 4.8,
    reviewCount: 2543,
    createdBy: 'user1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Sagrada Família',
    description: 'Gaudí masterpiece basilica with stunning architecture',
    category: 'attraction',
    address: 'Carrer de Mallorca, 401',
    city: 'Barcelona',
    country: 'Spain',
    latitude: 41.4036,
    longitude: 2.1744,
    thumbnail: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400&h=300&fit=crop',
    rating: 4.7,
    reviewCount: 1834,
    createdBy: 'user2',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    name: 'Tokyo Senso-ji',
    description: 'Ancient Buddhist temple in the heart of Tokyo',
    category: 'attraction',
    address: '2 Chome Asakusa, Taito Ward',
    city: 'Tokyo',
    country: 'Japan',
    latitude: 35.7148,
    longitude: 139.7967,
    thumbnail: 'https://images.unsplash.com/photo-1540959375944-7049f642e9a9?w=400&h=300&fit=crop',
    rating: 4.6,
    reviewCount: 1562,
    createdBy: 'user3',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    name: 'Trattoria Veneto',
    description: 'Authentic Italian restaurant with traditional recipes',
    category: 'restaurant',
    address: 'Calle Venecia, 25',
    city: 'Rome',
    country: 'Italy',
    latitude: 41.9028,
    longitude: 12.4964,
    thumbnail: 'https://images.unsplash.com/photo-1504674900967-77501b6bdfeb?w=400&h=300&fit=crop',
    rating: 4.5,
    reviewCount: 892,
    createdBy: 'user4',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const mockFeedPosts: (FeedPost & { userName: string; userAvatar?: string; place?: { name: string; city: string }; list?: { title: string }; isLiked?: boolean })[] = [
  {
    id: 'post1',
    userId: 'user1',
    type: 'review',
    placeId: '1',
    rating: 4.8,
    likes: 234,
    comments: 45,
    isLiked: false,
    createdAt: new Date(Date.now() - 3600000),
    userName: 'Sarah Anderson',
    place: { name: 'Eiffel Tower', city: 'Paris' },
    content: 'The view from the top is absolutely breathtaking! 🗼',
  },
  {
    id: 'post2',
    userId: 'user2',
    type: 'bookmark',
    placeId: '2',
    likes: 156,
    comments: 32,
    isLiked: false,
    createdAt: new Date(Date.now() - 7200000),
    userName: 'Alex Martinez',
    place: { name: 'Sagrada Família', city: 'Barcelona' },
  },
  {
    id: 'post3',
    userId: 'user3',
    type: 'list_created',
    listId: 'list1',
    likes: 421,
    comments: 67,
    isLiked: false,
    createdAt: new Date(Date.now() - 10800000),
    userName: 'Jordan Lee',
    list: { title: 'Best Street Food in Asia' },
  },
];

export default function Home() {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [activeTab, setActiveTab] = useState('feed');

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 border-b border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-balance gradient-text">
              Discover the World's Hidden Gems
            </h1>
            <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
              Connect with travelers worldwide, share authentic experiences, and find the perfect places to explore
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search places, cities, or experiences..."
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-card hover:border-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - Feed & Places */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 lg:w-fit">
                <TabsTrigger value="feed" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span className="hidden sm:inline">Feed</span>
                </TabsTrigger>
                <TabsTrigger value="discover" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span className="hidden sm:inline">Discover</span>
                </TabsTrigger>
                <TabsTrigger value="trending" className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  <span className="hidden sm:inline">Trending</span>
                </TabsTrigger>
              </TabsList>

              {/* Feed Tab */}
              <TabsContent value="feed" className="space-y-4 mt-6">
                {mockFeedPosts.map((post) => (
                  <FeedPostComponent
                    key={post.id}
                    post={post}
                    onLike={(postId) => console.log('Liked post:', postId)}
                    onComment={(postId) => console.log('Commented on post:', postId)}
                    onShare={(postId) => console.log('Shared post:', postId)}
                  />
                ))}
              </TabsContent>

              {/* Discover Tab */}
              <TabsContent value="discover" className="space-y-6 mt-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Featured Places</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {mockPlaces.map((place) => (
                      <PlaceCard
                        key={place.id}
                        place={place}
                        onClick={() => setSelectedPlace(place)}
                        onBookmark={(placeId) => console.log('Bookmarked:', placeId)}
                      />
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Trending Tab */}
              <TabsContent value="trending" className="space-y-6 mt-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Trending This Week</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {mockPlaces.slice(0, 2).map((place) => (
                      <PlaceCard
                        key={place.id}
                        place={place}
                        onClick={() => setSelectedPlace(place)}
                        onBookmark={(placeId) => console.log('Bookmarked:', placeId)}
                      />
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="border border-border rounded-xl p-6 bg-card space-y-4">
              <h3 className="font-bold text-lg">Your Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Bookmarks</span>
                  <span className="font-bold text-primary">24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Reviews</span>
                  <span className="font-bold text-primary">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Following</span>
                  <span className="font-bold text-primary">156</span>
                </div>
              </div>
            </div>

            {/* Trending Cities */}
            <div className="border border-border rounded-xl p-6 bg-card space-y-4">
              <h3 className="font-bold text-lg">Trending Cities</h3>
              <div className="space-y-3">
                {['Tokyo', 'Paris', 'Barcelona', 'Rome', 'Amsterdam'].map((city, i) => (
                  <button
                    key={city}
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-colors group"
                  >
                    <span className="text-sm font-medium">{city}</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>

            {/* Recommended Users */}
            <div className="border border-border rounded-xl p-6 bg-card space-y-4">
              <h3 className="font-bold text-lg">Recommended Users</h3>
              <div className="space-y-3">
                {['Emma Wilson', 'Marco Rossi', 'Yuki Tanaka'].map((name) => (
                  <div key={name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2 flex-1">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold">
                        {name.charAt(0)}
                      </div>
                      <span className="text-sm font-medium line-clamp-1">{name}</span>
                    </div>
                    <Button size="sm" variant="outline" className="text-xs bg-transparent">
                      Follow
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="bg-muted/30 py-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-2">Explore on Map</h2>
          <p className="text-muted-foreground mb-6">Click on markers to see more details about each place</p>
          <div className="h-96 lg:h-[500px] rounded-xl overflow-hidden border border-border shadow-lg">
            <InteractiveMap
              places={mockPlaces}
              onPlaceSelect={(place) => setSelectedPlace(place)}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">Wanderly</h4>
              <p className="text-sm text-muted-foreground">Discover and share travel experiences worldwide</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-4">Explore</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Places</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Cities</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Reviews</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-4">Community</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Travelers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Lists</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Events</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-4">Help</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 Wanderly. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
