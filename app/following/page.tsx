'use client';

import Header from '@/components/header';
import FeedPostComponent from '@/components/feed-post';
import { Button } from '@/components/ui/button';
import { Users, Flame, Clock } from 'lucide-react';
import { useState } from 'react';
import { FeedPost } from '@/lib/types';

const mockFollowingFeed: (FeedPost & {
  userName: string;
  userAvatar?: string;
  place?: { name: string; city: string };
  list?: { title: string };
  isLiked?: boolean;
})[] = [
  {
    id: 'post1',
    userId: 'user1',
    type: 'review',
    placeId: '1',
    likes: 234,
    comments: 45,
    isLiked: false,
    createdAt: new Date(Date.now() - 3600000),
    userName: 'Sarah Anderson',
    place: { name: 'Eiffel Tower', city: 'Paris' },
    content: 'The view from the top is absolutely breathtaking! Worth every minute of waiting in that long queue. The sunset was magical! 🗼',
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
    content: 'I\'ve spent 2 months traveling across Asia eating incredible street food. This list is my top 25 must-try locations! 🍜',
  },
  {
    id: 'post4',
    userId: 'user4',
    type: 'review',
    placeId: '4',
    likes: 312,
    comments: 56,
    isLiked: false,
    createdAt: new Date(Date.now() - 14400000),
    userName: 'Emma Wilson',
    place: { name: 'Trattoria Veneto', city: 'Rome' },
    content: 'Absolutely the best pasta I\'ve ever had! The owner was so welcoming and made us feel like part of the family. Authentic Italian cuisine at its finest! 🍝',
  },
  {
    id: 'post5',
    userId: 'user5',
    type: 'bookmark',
    placeId: '3',
    likes: 289,
    comments: 41,
    isLiked: false,
    createdAt: new Date(Date.now() - 18000000),
    userName: 'Marco Rossi',
    place: { name: 'Sagano Bamboo Forest', city: 'Kyoto' },
  },
  {
    id: 'post6',
    userId: 'user6',
    type: 'list_created',
    listId: 'list2',
    likes: 567,
    comments: 89,
    isLiked: false,
    createdAt: new Date(Date.now() - 21600000),
    userName: 'Yuki Tanaka',
    list: { title: 'Hidden Onsens in Japan' },
    content: 'Spent a month exploring traditional hot springs across Japan. These hidden gems offer the most authentic and peaceful experiences. Can\'t wait to share them all! ♨️',
  },
];

const mockFollowingUsers = [
  {
    id: 'user1',
    name: 'Sarah Anderson',
    followers: 2341,
    reviews: 48,
    bio: 'Exploring the world one destination at a time',
  },
  {
    id: 'user2',
    name: 'Alex Martinez',
    followers: 1856,
    reviews: 32,
    bio: 'Travel photographer and food enthusiast',
  },
  {
    id: 'user3',
    name: 'Jordan Lee',
    followers: 3421,
    reviews: 67,
    bio: 'Adventure seeker and list maker',
  },
];

export default function FollowingPage() {
  const [sortBy, setSortBy] = useState<'recent' | 'popular'>('recent');
  const [feedPosts, setFeedPosts] = useState(mockFollowingFeed);

  const handleSortChange = (sort: 'recent' | 'popular') => {
    setSortBy(sort);
    const sorted = [...feedPosts];
    if (sort === 'popular') {
      sorted.sort((a, b) => b.likes - a.likes);
    } else {
      sorted.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }
    setFeedPosts(sorted);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 border-b border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Following</h1>
          <p className="text-muted-foreground">Stay updated with travel experiences from people you follow</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Sort Options */}
          <div className="flex gap-2">
            <button
              onClick={() => handleSortChange('recent')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                sortBy === 'recent'
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-border hover:bg-muted'
              }`}
            >
              <Clock className="w-4 h-4" />
              Most Recent
            </button>
            <button
              onClick={() => handleSortChange('popular')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                sortBy === 'popular'
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-border hover:bg-muted'
              }`}
            >
              <Flame className="w-4 h-4" />
              Most Popular
            </button>
          </div>

          {/* Feed */}
          <div className="space-y-4">
            {feedPosts.length > 0 ? (
              feedPosts.map((post) => (
                <FeedPostComponent
                  key={post.id}
                  post={post}
                  onLike={(postId) => {
                    const updated = feedPosts.map((p) =>
                      p.id === postId ? { ...p, isLiked: !p.isLiked } : p
                    );
                    setFeedPosts(updated);
                  }}
                  onComment={(postId) => console.log('Comment on post:', postId)}
                  onShare={(postId) => console.log('Share post:', postId)}
                />
              ))
            ) : (
              <div className="text-center py-12 border border-border rounded-xl bg-card">
                <Users className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">You're not following anyone yet</p>
                <Button>Discover People to Follow</Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar - Following List */}
      <div className="fixed right-0 top-0 h-screen w-80 border-l border-border bg-card hidden xl:flex flex-col p-6 pt-24">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <Users className="w-5 h-5" />
          Following ({mockFollowingUsers.length})
        </h3>
        
        <div className="space-y-3 overflow-y-auto flex-1">
          {mockFollowingUsers.map((user) => (
            <div
              key={user.id}
              className="p-3 rounded-lg border border-border hover:bg-muted transition-colors cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {user.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold line-clamp-1">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.followers.toLocaleString()} followers</p>
                  </div>
                </div>
                <button className="p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.5 1.5H19v8h-8.5z M1 1h8v8H1z M1 10h8v9H1z M10.5 10.5H19V19h-8.5z" />
                  </svg>
                </button>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-1 mb-1">{user.bio}</p>
              <p className="text-xs text-muted-foreground">{user.reviews} reviews</p>
            </div>
          ))}
        </div>

        <Button variant="outline" className="w-full mt-4 bg-transparent">
          Find More People
        </Button>
      </div>
    </div>
  );
}
