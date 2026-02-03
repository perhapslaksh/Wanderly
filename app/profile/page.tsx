'use client';

import Header from '@/components/header';
import PlaceCard from '@/components/place-card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Edit, Users, Heart, BookOpen, Share2 } from 'lucide-react';
import { useState } from 'react';
import { Place } from '@/lib/types';

const mockUserProfile = {
  username: 'sarah_travels',
  fullName: 'Sarah Anderson',
  bio: 'Exploring the world one destination at a time. Food enthusiast, photographer, and adventure seeker.',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
  location: 'San Francisco, USA',
  joinDate: 'January 2024',
  followerCount: 2341,
  followingCount: 856,
  reviewCount: 48,
  bookmarkCount: 234,
  listCount: 12,
  isFollowing: false,
};

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
    createdBy: 'user2',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
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
];

const mockLists = [
  {
    id: 'list1',
    title: 'Best Street Food in Asia',
    description: 'Hidden gems and must-try street food locations across Asia',
    placeCount: 24,
    isPublic: true,
  },
  {
    id: 'list2',
    title: 'Winter Wonderland Destinations',
    description: 'Perfect places to experience snow, ice, and cozy warmth',
    placeCount: 18,
    isPublic: true,
  },
  {
    id: 'list3',
    title: 'Budget-Friendly Cities',
    description: 'Amazing cities where your money goes further',
    placeCount: 15,
    isPublic: true,
  },
];

const mockFollowers = [
  { id: 'f1', name: 'Alex Martinez', isFollowing: false },
  { id: 'f2', name: 'Jordan Lee', isFollowing: true },
  { id: 'f3', name: 'Emma Wilson', isFollowing: false },
  { id: 'f4', name: 'Marco Rossi', isFollowing: true },
];

export default function ProfilePage() {
  const [isFollowing, setIsFollowing] = useState(mockUserProfile.isFollowing);
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Profile Header */}
      <div className="bg-gradient-to-r from-primary/10 via-background to-accent/10 border-b border-border py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-6 mb-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-4xl font-bold overflow-hidden flex-shrink-0">
              <img
                src={mockUserProfile.avatar || "/placeholder.svg"}
                alt={mockUserProfile.fullName}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <h1 className="text-3xl font-bold">{mockUserProfile.fullName}</h1>
                  <p className="text-muted-foreground text-sm">@{mockUserProfile.username}</p>
                </div>
                <Button
                  onClick={() => setIsFollowing(!isFollowing)}
                  variant={isFollowing ? 'outline' : 'default'}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </Button>
              </div>

              <p className="text-foreground mb-3">{mockUserProfile.bio}</p>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {mockUserProfile.location}
                </div>
                <span>Joined {mockUserProfile.joinDate}</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-primary">{mockUserProfile.followerCount}</p>
              <p className="text-xs text-muted-foreground mt-1">Followers</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-primary">{mockUserProfile.followingCount}</p>
              <p className="text-xs text-muted-foreground mt-1">Following</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-primary">{mockUserProfile.reviewCount}</p>
              <p className="text-xs text-muted-foreground mt-1">Reviews</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-primary">{mockUserProfile.listCount}</p>
              <p className="text-xs text-muted-foreground mt-1">Lists</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="bookmarks" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="bookmarks" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              <span className="hidden sm:inline">Bookmarks</span>
            </TabsTrigger>
            <TabsTrigger value="lists" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Lists</span>
            </TabsTrigger>
            <TabsTrigger value="followers" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Followers</span>
            </TabsTrigger>
            <TabsTrigger value="following" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Following</span>
            </TabsTrigger>
          </TabsList>

          {/* Bookmarks Tab */}
          <TabsContent value="bookmarks" className="space-y-6 mt-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">My Bookmarks</h2>
              <span className="text-sm text-muted-foreground">{mockBookmarks.length} saved</span>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {mockBookmarks.map((place) => (
                <PlaceCard
                  key={place.id}
                  place={{ ...place, isBookmarked: true }}
                  onBookmark={(placeId) => console.log('Removed bookmark:', placeId)}
                />
              ))}
            </div>
          </TabsContent>

          {/* Lists Tab */}
          <TabsContent value="lists" className="space-y-6 mt-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">My Lists</h2>
              <Button>Create List</Button>
            </div>
            <div className="space-y-4">
              {mockLists.map((list) => (
                <div
                  key={list.id}
                  className="border border-border rounded-lg p-6 bg-card hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">{list.title}</h3>
                    <span className={`text-xs px-3 py-1 rounded-full ${
                      list.isPublic
                        ? 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-950 dark:text-gray-200'
                    }`}>
                      {list.isPublic ? 'Public' : 'Private'}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-3">{list.description}</p>
                  <p className="text-sm text-muted-foreground">{list.placeCount} places</p>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Followers Tab */}
          <TabsContent value="followers" className="space-y-6 mt-6">
            <h2 className="text-2xl font-bold">Followers ({mockUserProfile.followerCount})</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {mockFollowers.map((follower) => (
                <div
                  key={follower.id}
                  className="border border-border rounded-lg p-4 bg-card flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                      {follower.name.charAt(0)}
                    </div>
                    <span className="font-medium">{follower.name}</span>
                  </div>
                  <Button size="sm" variant={follower.isFollowing ? 'outline' : 'default'}>
                    {follower.isFollowing ? 'Following' : 'Follow'}
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Following Tab */}
          <TabsContent value="following" className="space-y-6 mt-6">
            <h2 className="text-2xl font-bold">Following ({mockUserProfile.followingCount})</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {mockFollowers.map((follower) => (
                <div
                  key={follower.id}
                  className="border border-border rounded-lg p-4 bg-card flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                      {follower.name.charAt(0)}
                    </div>
                    <span className="font-medium">{follower.name}</span>
                  </div>
                  <Button size="sm" variant="outline">
                    Unfollow
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
