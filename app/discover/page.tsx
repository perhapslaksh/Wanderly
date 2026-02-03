'use client';

import { useState } from 'react';
import Header from '@/components/header';
import PlaceCard from '@/components/place-card';
import { Button } from '@/components/ui/button';
import { Filter, MapPin, Star, TrendingUp } from 'lucide-react';
import { Place } from '@/lib/types';

const categories = [
  { id: 'all', label: 'All Places', count: 2847 },
  { id: 'restaurant', label: 'Restaurants', count: 652 },
  { id: 'attraction', label: 'Attractions', count: 421 },
  { id: 'accommodation', label: 'Accommodations', count: 534 },
  { id: 'activity', label: 'Activities', count: 389 },
  { id: 'shopping', label: 'Shopping', count: 276 },
  { id: 'nightlife', label: 'Nightlife', count: 198 },
];

const mockPlaces: Place[] = [
  {
    id: '1',
    name: 'Le Jules Verne',
    description: 'Michelin-starred French restaurant with Eiffel Tower views',
    category: 'restaurant',
    address: '5 Avenue Anatole France',
    city: 'Paris',
    country: 'France',
    latitude: 48.8584,
    longitude: 2.2945,
    thumbnail: 'https://images.unsplash.com/photo-1517457373614-b7152f800fd1?w=400&h=300&fit=crop',
    rating: 4.9,
    reviewCount: 834,
    createdBy: 'user1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Park Güell',
    description: 'Gaudí-designed public park with colorful mosaics and gardens',
    category: 'attraction',
    address: 'Carrer d\'Olot, 5',
    city: 'Barcelona',
    country: 'Spain',
    latitude: 41.4145,
    longitude: 2.1525,
    thumbnail: 'https://images.unsplash.com/photo-1583436266556-d19d0d9851b5?w=400&h=300&fit=crop',
    rating: 4.7,
    reviewCount: 2156,
    createdBy: 'user2',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    name: 'Tsukiji Outer Market',
    description: 'Bustling seafood market with fresh sushi and street food',
    category: 'shopping',
    address: '4 Chome Tsukiji, Chuo Ward',
    city: 'Tokyo',
    country: 'Japan',
    latitude: 35.6645,
    longitude: 139.7708,
    thumbnail: 'https://images.unsplash.com/photo-1579954587867-dea6b814e330?w=400&h=300&fit=crop',
    rating: 4.6,
    reviewCount: 1245,
    createdBy: 'user3',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    name: 'Colosseum',
    description: 'Ancient Roman amphitheater and iconic landmark',
    category: 'attraction',
    address: 'Piazza del Colosseo, 1',
    city: 'Rome',
    country: 'Italy',
    latitude: 41.8902,
    longitude: 12.4923,
    thumbnail: 'https://images.unsplash.com/photo-1552832860-efaf6b638d32?w=400&h=300&fit=crop',
    rating: 4.8,
    reviewCount: 3421,
    createdBy: 'user4',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '5',
    name: 'Anne Frank House',
    description: 'Historic museum documenting Anne Frank\'s life during WWII',
    category: 'attraction',
    address: 'Prinsengracht 263-267',
    city: 'Amsterdam',
    country: 'Netherlands',
    latitude: 52.3755,
    longitude: 4.8843,
    thumbnail: 'https://images.unsplash.com/photo-1549887534-7e9e9f9f7f9f?w=400&h=300&fit=crop',
    rating: 4.7,
    reviewCount: 1834,
    createdBy: 'user5',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '6',
    name: 'Sagano Bamboo Forest',
    description: 'Enchanting bamboo grove with winding paths and natural beauty',
    category: 'activity',
    address: 'Sagatenryuji Susukinobabacho',
    city: 'Kyoto',
    country: 'Japan',
    latitude: 35.0173,
    longitude: 135.6768,
    thumbnail: 'https://images.unsplash.com/photo-1522383507921-d919e1b45f33?w=400&h=300&fit=crop',
    rating: 4.8,
    reviewCount: 2567,
    createdBy: 'user6',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function DiscoverPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('trending');
  const [filteredPlaces, setFilteredPlaces] = useState(mockPlaces);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    if (categoryId === 'all') {
      setFilteredPlaces(mockPlaces);
    } else {
      setFilteredPlaces(mockPlaces.filter(p => p.category === categoryId));
    }
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    const sorted = [...filteredPlaces];
    if (sort === 'rating') {
      sorted.sort((a, b) => b.rating - a.rating);
    } else if (sort === 'reviews') {
      sorted.sort((a, b) => b.reviewCount - a.reviewCount);
    }
    setFilteredPlaces(sorted);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 border-b border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Discover Places</h1>
          <p className="text-muted-foreground">Explore curated recommendations from travelers around the world</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Categories */}
            <div className="border border-border rounded-xl p-4 bg-card sticky top-20">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors text-sm font-medium flex justify-between items-center ${
                      selectedCategory === cat.id
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span className="text-xs opacity-70">{cat.count}</span>
                  </button>
                ))}
              </div>

              {/* Sort Options */}
              <div className="mt-6 pt-6 border-t border-border">
                <h4 className="font-semibold text-sm mb-3">Sort By</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => handleSortChange('trending')}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors text-sm flex items-center gap-2 ${
                      sortBy === 'trending'
                        ? 'bg-primary/20 text-primary'
                        : 'hover:bg-muted'
                    }`}
                  >
                    <TrendingUp className="w-4 h-4" />
                    Trending
                  </button>
                  <button
                    onClick={() => handleSortChange('rating')}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors text-sm flex items-center gap-2 ${
                      sortBy === 'rating'
                        ? 'bg-primary/20 text-primary'
                        : 'hover:bg-muted'
                    }`}
                  >
                    <Star className="w-4 h-4" />
                    Top Rated
                  </button>
                  <button
                    onClick={() => handleSortChange('reviews')}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors text-sm flex items-center gap-2 ${
                      sortBy === 'reviews'
                        ? 'bg-primary/20 text-primary'
                        : 'hover:bg-muted'
                    }`}
                  >
                    <MapPin className="w-4 h-4" />
                    Most Reviewed
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Places Grid */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold">
                  {selectedCategory === 'all' ? 'All Places' : categories.find(c => c.id === selectedCategory)?.label}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {filteredPlaces.length} places found
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {filteredPlaces.map((place) => (
                <PlaceCard
                  key={place.id}
                  place={place}
                  onBookmark={(placeId) => console.log('Bookmarked:', placeId)}
                />
              ))}
            </div>

            {filteredPlaces.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No places found in this category</p>
                <Button onClick={() => handleCategoryChange('all')}>
                  View All Places
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
