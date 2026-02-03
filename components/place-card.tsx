'use client';

import React from "react"

import { Heart, MapPin, Star, MessageCircle, Share2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Place } from '@/lib/types';

interface PlaceCardProps {
  place: Place & { isBookmarked?: boolean };
  onClick?: () => void;
  onBookmark?: (placeId: string) => void;
}

export default function PlaceCard({ place, onClick, onBookmark }: PlaceCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(place.isBookmarked || false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
    onBookmark?.(place.id);
  };

  const categoryColors = {
    restaurant: 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-200',
    attraction: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200',
    accommodation: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-200',
    activity: 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200',
    shopping: 'bg-pink-100 text-pink-800 dark:bg-pink-950 dark:text-pink-200',
    nightlife: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-200',
    other: 'bg-gray-100 text-gray-800 dark:bg-gray-950 dark:text-gray-200',
  };

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:shadow-lg hover:scale-105"
    >
      {/* Image Section */}
      <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
        {place.thumbnail ? (
          <img
            src={place.thumbnail || "/placeholder.svg"}
            alt={place.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <MapPin className="w-12 h-12 text-primary/40" />
          </div>
        )}
        
        {/* Bookmark Button */}
        <button
          onClick={handleBookmark}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 transition-all shadow-md"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isBookmarked ? 'fill-red-500 text-red-500' : 'text-foreground'
            }`}
          />
        </button>

        {/* Category Badge */}
        <div className={`absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[place.category]}`}>
          {place.category.charAt(0).toUpperCase() + place.category.slice(1)}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-bold text-lg line-clamp-2 text-text-pretty">{place.name}</h3>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
            <MapPin className="w-3 h-3" />
            <span>{place.city}, {place.country}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">{place.description}</p>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(place.rating)
                    ? 'fill-accent text-accent'
                    : 'text-border'
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-semibold">{place.rating.toFixed(1)}</span>
          <span className="text-xs text-muted-foreground">({place.reviewCount})</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2 border-t border-border">
          <button className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg hover:bg-muted transition-colors text-sm font-medium group/btn">
            <MessageCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Reviews</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowShareMenu(!showShareMenu);
            }}
            className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg hover:bg-muted transition-colors text-sm font-medium relative"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Share</span>
            {showShareMenu && (
              <div className="absolute bottom-full right-0 mb-2 w-32 bg-card border border-border rounded-lg shadow-lg py-2">
                <button className="w-full px-4 py-2 text-sm hover:bg-muted transition-colors text-left">
                  Twitter
                </button>
                <button className="w-full px-4 py-2 text-sm hover:bg-muted transition-colors text-left">
                  Facebook
                </button>
                <button className="w-full px-4 py-2 text-sm hover:bg-muted transition-colors text-left">
                  Copy Link
                </button>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
