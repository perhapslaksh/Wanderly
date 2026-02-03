'use client';

import { useState, useRef, useEffect } from 'react';
import { MapPin, Loader, ZoomIn, ZoomOut } from 'lucide-react';
import { Place } from '@/lib/types';

interface InteractiveMapProps {
  places: Place[];
  onPlaceSelect?: (place: Place) => void;
  center?: { latitude: number; longitude: number };
  zoom?: number;
}

export default function InteractiveMap({
  places,
  onPlaceSelect,
  center = { latitude: 40, longitude: 0 },
  zoom = 3,
}: InteractiveMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentZoom, setCurrentZoom] = useState(zoom);
  const [mapCenter, setMapCenter] = useState(center);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleZoom = (direction: 'in' | 'out') => {
    if (direction === 'in' && currentZoom < 15) {
      setCurrentZoom(currentZoom + 1);
    } else if (direction === 'out' && currentZoom > 1) {
      setCurrentZoom(currentZoom - 1);
    }
  };

  const handlePlaceSelect = (place: Place) => {
    setSelectedPlace(place);
    setMapCenter({ latitude: place.latitude, longitude: place.longitude });
    setCurrentZoom(10);
    onPlaceSelect?.(place);
  };

  return (
    <div className="relative w-full h-full min-h-[500px] rounded-xl overflow-hidden border border-border bg-gradient-to-br from-primary/10 via-background to-accent/10">
      {/* Canvas/Map Container */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 dark:from-blue-950/20 to-cyan-50 dark:to-cyan-950/20">
        {isLoading ? (
          <div className="text-center space-y-3">
            <Loader className="w-8 h-8 animate-spin text-primary mx-auto" />
            <p className="text-muted-foreground text-sm">Loading map...</p>
          </div>
        ) : (
          <>
            {/* Map Grid Background */}
            <svg className="absolute inset-0 w-full h-full opacity-10" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Map Markers */}
            <div className="absolute inset-0 flex items-center justify-center">
              {places.map((place, index) => {
                const xPercent = ((place.longitude + 180) / 360) * 100;
                const yPercent = ((90 - place.latitude) / 180) * 100;

                return (
                  <button
                    key={place.id}
                    onClick={() => handlePlaceSelect(place)}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 z-${index} ${
                      selectedPlace?.id === place.id ? 'scale-150' : 'scale-100 hover:scale-125'
                    }`}
                    style={{
                      left: `${xPercent}%`,
                      top: `${yPercent}%`,
                    }}
                    title={place.name}
                  >
                    <div
                      className={`relative w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all ${
                        selectedPlace?.id === place.id
                          ? 'bg-gradient-to-br from-primary to-accent ring-2 ring-primary'
                          : 'bg-white dark:bg-slate-900 ring-1 ring-border hover:ring-primary'
                      }`}
                    >
                      <MapPin className="w-5 h-5 text-primary" />
                      <span className="absolute top-full mt-1 px-2 py-1 bg-card border border-border rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        {place.city}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Zoom Controls */}
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-2 z-10">
              <button
                onClick={() => handleZoom('in')}
                className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-border hover:bg-primary hover:text-primary-foreground transition-all shadow-md"
                title="Zoom in"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleZoom('out')}
                className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-border hover:bg-primary hover:text-primary-foreground transition-all shadow-md"
                title="Zoom out"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white dark:bg-slate-900 border border-border rounded-lg p-3 text-xs space-y-2">
              <div className="font-semibold text-foreground">Places by Category</div>
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-primary mt-1" />
                <span className="text-muted-foreground">Featured Locations</span>
              </div>
            </div>

            {/* Zoom Level Indicator */}
            <div className="absolute bottom-4 right-4 bg-white dark:bg-slate-900 border border-border rounded-lg px-3 py-1 text-xs font-medium text-foreground">
              Zoom: {currentZoom}x
            </div>
          </>
        )}
      </div>

      {/* Selected Place Info */}
      {selectedPlace && (
        <div className="absolute bottom-4 left-4 right-4 max-w-sm bg-white dark:bg-slate-900 border border-border rounded-lg p-4 shadow-lg">
          <h3 className="font-bold text-sm text-foreground mb-1">{selectedPlace.name}</h3>
          <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{selectedPlace.description}</p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="w-3 h-3" />
            <span>{selectedPlace.city}, {selectedPlace.country}</span>
          </div>
        </div>
      )}
    </div>
  );
}
