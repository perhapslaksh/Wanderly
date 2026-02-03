'use client';

import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import { MapPin, Users, Heart, MessageCircle, TrendingUp, Globe, Search } from 'lucide-react';
import { useState } from 'react';

const citiesData = [
  {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    description: 'The City of Light - art, culture, and romance on the Seine',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=400&fit=crop',
    followers: 45230,
    places: 892,
    reviews: 12543,
    trending: true,
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    description: 'Blend of ancient tradition and cutting-edge modernity',
    image: 'https://images.unsplash.com/photo-1540959375944-7049f642e9a9?w=600&h=400&fit=crop',
    followers: 38920,
    places: 756,
    reviews: 10234,
    trending: true,
  },
  {
    id: 'barcelona',
    name: 'Barcelona',
    country: 'Spain',
    description: 'Gaudí\'s architectural wonders and Mediterranean charm',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600&h=400&fit=crop',
    followers: 32145,
    places: 654,
    reviews: 8932,
    trending: true,
  },
  {
    id: 'rome',
    name: 'Rome',
    country: 'Italy',
    description: 'The Eternal City - history, history, and more history',
    image: 'https://images.unsplash.com/photo-1552832860-efaf6b638d32?w=600&h=400&fit=crop',
    followers: 42876,
    places: 723,
    reviews: 11245,
    trending: false,
  },
  {
    id: 'amsterdam',
    name: 'Amsterdam',
    country: 'Netherlands',
    description: 'Canals, bicycles, and cozy Dutch culture',
    image: 'https://images.unsplash.com/photo-1549887534-7e9e9f9f7f9f?w=600&h=400&fit=crop',
    followers: 28934,
    places: 512,
    reviews: 7834,
    trending: false,
  },
  {
    id: 'kyoto',
    name: 'Kyoto',
    country: 'Japan',
    description: 'Traditional temples and serene gardens of ancient Japan',
    image: 'https://images.unsplash.com/photo-1522383507921-d919e1b45f33?w=600&h=400&fit=crop',
    followers: 35678,
    places: 645,
    reviews: 9456,
    trending: true,
  },
  {
    id: 'newyork',
    name: 'New York',
    country: 'USA',
    description: 'The city that never sleeps - endless energy and diversity',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&h=400&fit=crop',
    followers: 51234,
    places: 1245,
    reviews: 15680,
    trending: true,
  },
  {
    id: 'dubai',
    name: 'Dubai',
    country: 'UAE',
    description: 'Desert luxury and ultramodern architecture',
    image: 'https://images.unsplash.com/photo-1518684029980-cf91f2e764e3?w=600&h=400&fit=crop',
    followers: 33456,
    places: 534,
    reviews: 8934,
    trending: false,
  },
];

const communityHighlights = [
  {
    title: 'Top Reviewer of the Month',
    user: 'Sarah Anderson',
    reviews: 24,
    city: 'Paris',
  },
  {
    title: 'Most Followed Traveler',
    user: 'Marco Rossi',
    followers: 15234,
    city: 'Rome',
  },
  {
    title: 'Best Travel List',
    list: 'Street Food Tour of SE Asia',
    creator: 'Jordan Lee',
    saves: 3456,
  },
];

export default function CitiesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterTrending, setFilterTrending] = useState(false);

  const filteredCities = citiesData.filter((city) => {
    const matchesSearch = city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      city.country.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTrending = !filterTrending || city.trending;
    return matchesSearch && matchesTrending;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 border-b border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Explore Cities</h1>
          <p className="text-muted-foreground">Join travel communities and discover what makes each city special</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Community Highlights */}
          <div className="lg:col-span-1 space-y-6">
            <div className="border border-border rounded-xl p-6 bg-card sticky top-20">
              <h3 className="font-bold text-lg mb-4">Community Highlights</h3>
              <div className="space-y-4">
                {communityHighlights.map((highlight, i) => (
                  <div key={i} className="pb-4 border-b border-border last:border-b-0 last:pb-0">
                    <p className="text-xs text-muted-foreground font-semibold mb-1">
                      {highlight.title}
                    </p>
                    <p className="font-semibold text-sm">
                      {'user' in highlight ? highlight.user : ('creator' in highlight ? highlight.creator : highlight.list)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {'reviews' in highlight && `${highlight.reviews} reviews`}
                      {'followers' in highlight && `${highlight.followers.toLocaleString()} followers`}
                      {'saves' in highlight && `${highlight.saves.toLocaleString()} saves`}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content - Cities */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search and Filter Bar */}
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search cities or countries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-card hover:border-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="flex items-center justify-between gap-4">
                <button
                  onClick={() => setFilterTrending(!filterTrending)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                    filterTrending
                      ? 'bg-primary text-primary-foreground'
                      : 'border border-border hover:bg-muted'
                  }`}
                >
                  <TrendingUp className="w-4 h-4" />
                  Trending
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-primary text-primary-foreground'
                        : 'border border-border hover:bg-muted'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5 3a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H7a2 2 0 01-2-2V3z" />
                      <path d="M14 7a2 2 0 012-2h-2.5a2 2 0 00-2 2v.5a2 2 0 002 2H16a2 2 0 01-2-2V7z" />
                      <path d="M5 14a2 2 0 012-2h6a2 2 0 012 2v3a2 2 0 01-2 2H7a2 2 0 01-2-2v-3z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'list'
                        ? 'bg-primary text-primary-foreground'
                        : 'border border-border hover:bg-muted'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                Showing {filteredCities.length} of {citiesData.length} cities
              </p>
            </div>

            {/* Grid/List View */}
            {viewMode === 'grid' ? (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredCities.map((city) => (
                  <div
                    key={city.id}
                    className="group border border-border rounded-xl overflow-hidden bg-card hover:shadow-lg transition-all duration-300 cursor-pointer"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={city.image || "/placeholder.svg"}
                        alt={city.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {city.trending && (
                        <div className="absolute top-3 right-3 flex items-center gap-1 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold">
                          <TrendingUp className="w-3 h-3" />
                          Trending
                        </div>
                      )}
                    </div>

                    <div className="p-4 space-y-3">
                      <div>
                        <h3 className="text-xl font-bold">{city.name}</h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Globe className="w-4 h-4" />
                          {city.country}
                        </p>
                      </div>

                      <p className="text-sm text-muted-foreground line-clamp-2">{city.description}</p>

                      <div className="flex gap-4 text-xs text-muted-foreground pt-2 border-t border-border">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{(city.followers / 1000).toFixed(1)}K followers</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{city.places} places</span>
                        </div>
                      </div>

                      <Button className="w-full mt-2">Explore {city.name}</Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredCities.map((city) => (
                  <div
                    key={city.id}
                    className="border border-border rounded-lg overflow-hidden bg-card hover:shadow-md transition-all duration-300 cursor-pointer group"
                  >
                    <div className="flex flex-col sm:flex-row gap-4 p-4">
                      <div className="w-full sm:w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={city.image || "/placeholder.svg"}
                          alt={city.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-bold">{city.name}</h3>
                            <p className="text-sm text-muted-foreground">{city.country}</p>
                          </div>
                          {city.trending && (
                            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold">
                              <TrendingUp className="w-3 h-3" />
                              Trending
                            </div>
                          )}
                        </div>

                        <p className="text-sm text-muted-foreground mb-3">{city.description}</p>

                        <div className="flex gap-6 text-xs text-muted-foreground mb-3">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            <span>{(city.followers / 1000).toFixed(1)}K followers</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{city.places} places</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MessageCircle className="w-4 h-4" />
                            <span>{city.reviews.toLocaleString()} reviews</span>
                          </div>
                        </div>

                        <Button size="sm">Explore {city.name}</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {filteredCities.length === 0 && (
              <div className="text-center py-12">
                <MapPin className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">No cities found matching your search</p>
                <Button onClick={() => setSearchQuery('')}>Clear Search</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
