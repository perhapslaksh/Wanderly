export interface User {
  id: string;
  email: string;
  username: string;
  fullName: string;
  bio?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Profile extends User {
  followerCount: number;
  followingCount: number;
  listCount: number;
  isFollowing?: boolean;
}

// Location and Place Types
export interface Place {
  id: string;
  name: string;
  description: string;
  category: 'restaurant' | 'attraction' | 'accommodation' | 'activity' | 'shopping' | 'nightlife' | 'other';
  address: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  thumbnail?: string;
  rating: number;
  reviewCount: number;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface City {
  id: string;
  name: string;
  country: string;
  description?: string;
  image?: string;
  latitude: number;
  longitude: number;
  followerCount: number;
  createdAt: Date;
}

// Bookmark and Collections
export interface Bookmark {
  id: string;
  userId: string;
  placeId: string;
  listId?: string;
  createdAt: Date;
}

export interface CustomList {
  id: string;
  userId: string;
  title: string;
  description?: string;
  isPublic: boolean;
  placeCount: number;
  createdAt: Date;
  updatedAt: Date;
}

// Review and Ratings
export interface Review {
  id: string;
  userId: string;
  placeId: string;
  rating: number;
  title: string;
  content: string;
  photos: string[];
  helpfulCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReviewResponse {
  id: string;
  reviewId: string;
  userId: string;
  content: string;
  createdAt: Date;
}

// Social Features
export interface Follow {
  id: string;
  followerId: string;
  followingId: string;
  createdAt: Date;
}

export interface FeedPost {
  id: string;
  userId: string;
  type: 'review' | 'bookmark' | 'list_created' | 'list_updated';
  placeId?: string;
  listId?: string;
  content?: string;
  likes: number;
  comments: number;
  isLiked?: boolean;
  createdAt: Date;
}

export interface FeedComment {
  id: string;
  postId: string;
  userId: string;
  content: string;
  createdAt: Date;
}

export interface Like {
  id: string;
  userId: string;
  postId: string;
  createdAt: Date;
}

// Notifications
export interface Notification {
  id: string;
  userId: string;
  type: 'follow' | 'review_like' | 'review_response' | 'comment';
  actorId: string;
  placeId?: string;
  reviewId?: string;
  read: boolean;
  createdAt: Date;
}
