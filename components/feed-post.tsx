'use client';

import { Heart, MessageCircle, Share2, MoreVertical } from 'lucide-react';
import { useState } from 'react';
import { FeedPost, Review, CustomList } from '@/lib/types';

interface FeedPostProps {
  post: FeedPost & {
    userName: string;
    userAvatar?: string;
    place?: { name: string; city: string };
    list?: { title: string };
    isLiked?: boolean;
  };
  onLike?: (postId: string) => void;
  onComment?: (postId: string) => void;
  onShare?: (postId: string) => void;
}

export default function FeedPostComponent({ post, onLike, onComment, onShare }: FeedPostProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [likes, setLikes] = useState(post.likes);
  const [showMenu, setShowMenu] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
    onLike?.(post.id);
  };

  const getPostContent = () => {
    switch (post.type) {
      case 'review':
        return {
          icon: '⭐',
          action: 'left a review on',
          target: post.place?.name,
        };
      case 'bookmark':
        return {
          icon: '🔖',
          action: 'bookmarked',
          target: post.place?.name,
        };
      case 'list_created':
        return {
          icon: '📋',
          action: 'created a list',
          target: post.list?.title,
        };
      case 'list_updated':
        return {
          icon: '📝',
          action: 'updated their list',
          target: post.list?.title,
        };
      default:
        return {
          icon: '✨',
          action: 'shared something',
          target: 'interesting',
        };
    }
  };

  const content = getPostContent();

  return (
    <div className="border border-border rounded-xl p-4 bg-card hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3 flex-1">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold flex-shrink-0">
            {post.userName.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-semibold text-sm">{post.userName}</h4>
              <span className="text-xs text-muted-foreground">
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              <span className="mr-1">{content.icon}</span>
              {content.action}
              {post.place && (
                <span className="font-semibold text-foreground"> {post.place.name}</span>
              )}
              {post.list && (
                <span className="font-semibold text-foreground"> "{post.list.title}"</span>
              )}
              {post.place && (
                <span className="text-muted-foreground"> in {post.place.city}</span>
              )}
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowMenu(!showMenu)}
          className="p-1 hover:bg-muted rounded-lg transition-colors relative flex-shrink-0"
        >
          <MoreVertical className="w-4 h-4" />
          {showMenu && (
            <div className="absolute right-0 mt-1 w-32 bg-card border border-border rounded-lg shadow-lg py-1">
              <button className="w-full px-4 py-2 text-sm hover:bg-muted transition-colors text-left">
                Report
              </button>
              <button className="w-full px-4 py-2 text-sm hover:bg-muted transition-colors text-left">
                Mute
              </button>
            </div>
          )}
        </button>
      </div>

      {/* Content */}
      {post.content && (
        <p className="text-sm text-foreground mb-4 leading-relaxed">{post.content}</p>
      )}

      {/* Preview Card */}
      {(post.place || post.list) && (
        <div className="mb-4 p-3 rounded-lg bg-muted border border-border">
          {post.place && (
            <div className="text-sm">
              <p className="font-semibold text-foreground">{post.place.name}</p>
              <p className="text-xs text-muted-foreground">{post.place.city}</p>
            </div>
          )}
          {post.list && (
            <div className="text-sm">
              <p className="font-semibold text-foreground">{post.list.title}</p>
              <p className="text-xs text-muted-foreground">View list</p>
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 pt-3 border-t border-border">
        <button
          onClick={handleLike}
          className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg hover:bg-muted transition-colors text-xs font-medium"
        >
          <Heart
            className={`w-4 h-4 ${
              isLiked ? 'fill-red-500 text-red-500' : ''
            }`}
          />
          <span>{likes}</span>
        </button>
        <button
          onClick={() => onComment?.(post.id)}
          className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg hover:bg-muted transition-colors text-xs font-medium"
        >
          <MessageCircle className="w-4 h-4" />
          <span>{post.comments}</span>
        </button>
        <button
          onClick={() => onShare?.(post.id)}
          className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg hover:bg-muted transition-colors text-xs font-medium"
        >
          <Share2 className="w-4 h-4" />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
}
