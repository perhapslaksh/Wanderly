'use client';

import Header from '@/components/header';
import PlaceCard from '@/components/place-card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Grid, List as ListIcon, Filter } from 'lucide-react';
import { useState } from 'react';
import { Place } from '@/lib/types';

const mockLists = [
  { id: 'all', label: 'All Bookmarks', count: 24 },
  { id: 'personal', label: 'Personal List', count: 8 },
  { id: 'wishlist', label: 'Wishlist', count: 12 },
  { id: 'visited', label: 'Visited Places', count: 4 },
];

const mockBookmarks: Place[] = [
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
  {
    id: '5',
    name: 'Park Güell',
    description: 'Gaudí-designed public park with colorful mosaics',
    category: 'attraction',
    address: 'Carrer d\'Olot, 5',
    city: 'Barcelona',
    country: 'Spain',
    latitude: 41.4145,
    longitude: 2.1525,
    thumbnail: 'https://images.unsplash.com/photo-1583436266556-d19d0d9851b5?w=400&h=300&fit=crop',
    rating: 4.7,
    reviewCount: 2156,
    createdBy: 'user5',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '6',
    name: 'Sagano Bamboo Forest',
    description: 'Enchanting bamboo grove with winding paths',
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
  {
    id: '7',
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
    createdBy: 'user7',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '8',
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
    createdBy: 'user8',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function BookmarksPage() {
  const [selectedList, setSelectedList] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('recent');
  const [filteredBookmarks, setFilteredBookmarks] = useState(mockBookmarks);

  const handleListChange = (listId: string) => {
    setSelectedList(listId);
    // In a real app, this would filter the bookmarks by the selected list
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    const sorted = [...filteredBookmarks];
    if (sort === 'rating') {
      sorted.sort((a, b) => b.rating - a.rating);
    } else if (sort === 'name') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    }
    setFilteredBookmarks(sorted);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 border-b border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2 flex items-center gap-2">
                <Heart className="w-8 h-8 text-red-500" />
                My Bookmarks
              </h1>
              <p className="text-muted-foreground">Save and organize places you want to visit</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Lists */}
          <div className="lg:col-span-1">
            <div className="border border-border rounded-xl p-4 bg-card sticky top-20">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <ListIcon className="w-5 h-5" />
                My Lists
              </h3>
              <div className="space-y-2">
                {mockLists.map((list) => (
                  <button
                    key={list.id}
                    onClick={() => handleListChange(list.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors text-sm font-medium flex justify-between items-center ${
                      selectedList === list.id
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                  >
                    <span>{list.label}</span>
                    <span className="text-xs opacity-70">{list.count}</span>
                  </button>
                ))}
              </div>

              {/* Sort Options */}
              <div className="mt-6 pt-6 border-t border-border">
                <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Sort By
                </h4>
                <div className="space-y-2">
                  <button
                    onClick={() => handleSortChange('recent')}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors text-sm ${
                      sortBy === 'recent'
                        ? 'bg-primary/20 text-primary'
                        : 'hover:bg-muted'
                    }`}
                  >
                    Most Recent
                  </button>
                  <button
                    onClick={() => handleSortChange('rating')}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors text-sm ${
                      sortBy === 'rating'
                        ? 'bg-primary/20 text-primary'
                        : 'hover:bg-muted'
                    }`}
                  >
                    Top Rated
                  </button>
                  <button
                    onClick={() => handleSortChange('name')}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors text-sm ${
                      sortBy === 'name'
                        ? 'bg-primary/20 text-primary'
                        : 'hover:bg-muted'
                    }`}
                  >
                    A-Z
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Bookmarks */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold">
                  {mockLists.find((l) => l.id === selectedList)?.label || 'All Bookmarks'}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {filteredBookmarks.length} places
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-primary text-primary-foreground'
                      : 'border border-border hover:bg-muted'
                  }`}
                  title="Grid view"
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list'
                      ? 'bg-primary text-primary-foreground'
                      : 'border border-border hover:bg-muted'
                  }`}
                  title="List view"
                >
                  <ListIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            {viewMode === 'grid' ? (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredBookmarks.map((place) => (
                  <PlaceCard
                    key={place.id}
                    place={{ ...place, isBookmarked: true }}
                    onBookmark={(placeId) => {
                      setFilteredBookmarks(
                        filteredBookmarks.filter((p) => p.id !== placeId)
                      );
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredBookmarks.map((place) => (
                  <div
                    key={place.id}
                    className="border border-border rounded-lg p-4 bg-card hover:shadow-md transition-all flex items-start gap-4 group"
                  >
                    <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={place.thumbnail || "/placeholder.svg"}
                        alt={place.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{place.name}</h3>
                      <p className="text-sm text-muted-foreground mb-1">
                        {place.city}, {place.country}
                      </p>
                      <p className="text-sm text-muted-foreground line-clamp-1 mb-2">
                        {place.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-semibold">{place.rating}</span>
                          <span className="text-muted-foreground">({place.reviewCount} reviews)</span>
                        </div>
                        <button
                          onClick={() => {
                            setFilteredBookmarks(
                              filteredBookmarks.filter((p) => p.id !== place.id)
                            );
                          }}
                          className="p-2 hover:bg-muted rounded-lg transition-colors"
                        >
                          <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {filteredBookmarks.length === 0 && (
              <div className="text-center py-12 border border-border rounded-xl bg-card">
                <Heart className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">No bookmarks in this list yet</p>
                <Button>Discover Places</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
