'use client';

import Header from '@/components/header';
import ReviewCard from '@/components/review-card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, MapPin, Phone, Globe, Star, Share2, MessageCircle, Users } from 'lucide-react';
import { useState } from 'react';
import { Review, Place } from '@/lib/types';

const mockPlace: Place & { phone?: string; website?: string; hours?: string } = {
  id: '1',
  name: 'Eiffel Tower',
  description: 'Iconic iron lattice tower offering stunning views of Paris and serving as a symbol of France',
  category: 'attraction',
  address: '5 Avenue Anatole France, 75001 Paris, France',
  city: 'Paris',
  country: 'France',
  latitude: 48.8584,
  longitude: 2.2945,
  thumbnail: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop',
  rating: 4.8,
  reviewCount: 2543,
  createdBy: 'user1',
  createdAt: new Date(),
  updatedAt: new Date(),
  phone: '+33 1 45 55 75 01',
  website: 'www.toureiffel.paris',
  hours: '9:00 AM - 12:45 AM (Jan-Apr, Sep-Dec)\n9:00 AM - 1:45 AM (May-Aug)',
};

const mockReviews: (Review & { userName: string; userAvatar?: string; isLiked?: boolean })[] = [
  {
    id: '1',
    userId: 'user1',
    placeId: '1',
    rating: 5,
    title: 'Absolutely Stunning!',
    content: 'The view from the top is absolutely breathtaking! It was worth every euro. Make sure to go at sunset for the best views. The experience was magical, especially with Paris lights coming on as it got darker.',
    photos: [
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop',
    ],
    helpfulCount: 234,
    createdAt: new Date(Date.now() - 86400000 * 2),
    updatedAt: new Date(Date.now() - 86400000 * 2),
    userName: 'Sarah Anderson',
    isLiked: false,
  },
  {
    id: '2',
    userId: 'user2',
    placeId: '1',
    rating: 4,
    title: 'Great Experience',
    content: 'Beautiful structure and great views. The elevator ride was smooth and the second level offers nice photo opportunities. Slightly crowded, but expected for such a famous landmark.',
    photos: [],
    helpfulCount: 156,
    createdAt: new Date(Date.now() - 86400000 * 5),
    updatedAt: new Date(Date.now() - 86400000 * 5),
    userName: 'Alex Martinez',
    isLiked: false,
  },
  {
    id: '3',
    userId: 'user3',
    placeId: '1',
    rating: 5,
    title: 'Must Visit!',
    content: 'A must-visit when in Paris. The engineering marvel from the 19th century is incredible. The walk down the stairs is an interesting experience if you want to skip the elevator queue. Worth the wait!',
    photos: [
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop',
    ],
    helpfulCount: 421,
    createdAt: new Date(Date.now() - 86400000 * 8),
    updatedAt: new Date(Date.now() - 86400000 * 8),
    userName: 'Jordan Lee',
    isLiked: false,
  },
];

export default function PlaceDetailPage({ params }: { params: { id: string } }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Image */}
      <div className="relative h-96 w-full overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
        <img
          src={mockPlace.thumbnail || "/placeholder.svg"}
          alt={mockPlace.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent" />

        {/* Action Buttons */}
        <div className="absolute top-6 right-6 flex gap-2 z-10">
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className="p-3 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 transition-all shadow-lg"
          >
            <Heart
              className={`w-6 h-6 ${
                isBookmarked ? 'fill-red-500 text-red-500' : ''
              }`}
            />
          </button>
          <button className="p-3 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 transition-all shadow-lg">
            <Share2 className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">{mockPlace.name}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(mockPlace.rating)
                          ? 'fill-accent text-accent'
                          : 'text-border'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-semibold">{mockPlace.rating.toFixed(1)}</span>
                <span className="text-muted-foreground">({mockPlace.reviewCount} reviews)</span>
              </div>
            </div>
          </div>

          <p className="text-lg text-muted-foreground mb-6">{mockPlace.description}</p>

          {/* Info Grid */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-start gap-3 p-4 border border-border rounded-lg bg-card">
              <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Address</p>
                <p className="font-medium">{mockPlace.address}</p>
              </div>
            </div>

            {mockPlace.phone && (
              <div className="flex items-start gap-3 p-4 border border-border rounded-lg bg-card">
                <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{mockPlace.phone}</p>
                </div>
              </div>
            )}

            {mockPlace.website && (
              <div className="flex items-start gap-3 p-4 border border-border rounded-lg bg-card">
                <Globe className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Website</p>
                  <p className="font-medium hover:text-primary cursor-pointer transition-colors">
                    {mockPlace.website}
                  </p>
                </div>
              </div>
            )}

            {mockPlace.hours && (
              <div className="flex items-start gap-3 p-4 border border-border rounded-lg bg-card">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Hours</p>
                  <p className="font-medium whitespace-pre-line text-sm">{mockPlace.hours}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="reviews" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="reviews" className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Reviews
            </TabsTrigger>
            <TabsTrigger value="photos" className="flex items-center gap-2">
              Photos
            </TabsTrigger>
            <TabsTrigger value="visits" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Visitors
            </TabsTrigger>
          </TabsList>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-6 mt-6">
            <div className="border border-border rounded-xl p-6 bg-card">
              <Button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="w-full sm:w-auto"
              >
                Write a Review
              </Button>

              {showReviewForm && (
                <div className="mt-6 p-4 border border-border rounded-lg space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          className="p-2 rounded-lg hover:bg-muted transition-colors"
                        >
                          <Star className="w-6 h-6 fill-accent text-accent" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <input
                      type="text"
                      placeholder="Give your review a title"
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Your Review</label>
                    <textarea
                      placeholder="Share your experience..."
                      rows={4}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button>Post Review</Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowReviewForm(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Reviews List */}
            <div className="border border-border rounded-xl p-6 bg-card space-y-6">
              {mockReviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  onLike={(reviewId) => console.log('Liked review:', reviewId)}
                  onReply={(reviewId) => console.log('Replying to review:', reviewId)}
                />
              ))}
            </div>
          </TabsContent>

          {/* Photos Tab */}
          <TabsContent value="photos" className="space-y-6 mt-6">
            <div className="grid md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="aspect-square rounded-lg overflow-hidden bg-muted cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <img
                    src={`https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=400&fit=crop`}
                    alt={`Photo ${i}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Visitors Tab */}
          <TabsContent value="visits" className="space-y-6 mt-6">
            <div className="grid md:grid-cols-3 gap-4">
              {['Sarah Anderson', 'Alex Martinez', 'Jordan Lee', 'Emma Wilson', 'Marco Rossi', 'Yuki Tanaka'].map((name) => (
                <div
                  key={name}
                  className="p-4 border border-border rounded-lg bg-card hover:shadow-md transition-shadow text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold mx-auto mb-3">
                    {name.charAt(0)}
                  </div>
                  <p className="font-medium text-sm">{name}</p>
                  <p className="text-xs text-muted-foreground">Visited • 2 months ago</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
