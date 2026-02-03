'use client';

import { Star, MessageCircle, Heart, MoreVertical } from 'lucide-react';
import { useState } from 'react';
import { Review } from '@/lib/types';

interface ReviewCardProps {
  review: Review & { userName: string; userAvatar?: string; isLiked?: boolean };
  onLike?: (reviewId: string) => void;
  onReply?: (reviewId: string) => void;
}

export default function ReviewCard({ review, onLike, onReply }: ReviewCardProps) {
  const [isLiked, setIsLiked] = useState(review.isLiked || false);
  const [showMenu, setShowMenu] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike?.(review.id);
  };

  return (
    <div className="border-b border-border pb-4 last:border-b-0">
      {/* Review Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3 flex-1">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold flex-shrink-0">
            {review.userName.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-sm">{review.userName}</h4>
              <span className="text-xs text-muted-foreground">
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 mt-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < review.rating
                      ? 'fill-accent text-accent'
                      : 'text-border'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowMenu(!showMenu)}
          className="p-1 hover:bg-muted rounded-lg transition-colors relative"
        >
          <MoreVertical className="w-4 h-4" />
          {showMenu && (
            <div className="absolute right-0 mt-1 w-32 bg-card border border-border rounded-lg shadow-lg py-1">
              <button className="w-full px-4 py-2 text-sm hover:bg-muted transition-colors text-left">
                Report
              </button>
              <button className="w-full px-4 py-2 text-sm hover:bg-muted transition-colors text-left">
                Share
              </button>
            </div>
          )}
        </button>
      </div>

      {/* Review Title */}
      <h3 className="font-semibold text-sm text-foreground mb-1">{review.title}</h3>

      {/* Review Content */}
      <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{review.content}</p>

      {/* Photos */}
      {review.photos && review.photos.length > 0 && (
        <div className="flex gap-2 mb-3 overflow-x-auto">
          {review.photos.map((photo, index) => (
            <div
              key={index}
              className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-border hover:border-primary transition-colors cursor-pointer"
            >
              <img
                src={photo || "/placeholder.svg"}
                alt={`Review photo ${index + 1}`}
                className="w-full h-full object-cover hover:scale-110 transition-transform"
              />
            </div>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <button
          onClick={handleLike}
          className="flex items-center gap-1 hover:text-primary transition-colors"
        >
          <Heart
            className={`w-4 h-4 ${
              isLiked ? 'fill-red-500 text-red-500' : ''
            }`}
          />
          <span>{review.helpfulCount}</span>
        </button>
        <button
          onClick={() => onReply?.(review.id)}
          className="flex items-center gap-1 hover:text-primary transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Reply</span>
        </button>
      </div>
    </div>
  );
}
