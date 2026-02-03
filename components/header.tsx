'use client';

import Link from 'next/link';
import { useState } from 'react';
import { MapPin, Menu, X, User, LogOut, Home, Compass, Heart, Users, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NotificationCenter from '@/components/notification-center';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <MapPin className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl hidden sm:inline gradient-text">Wanderly</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2">
              <Home className="w-4 h-4" />
              Home
            </Link>
            <Link href="/discover" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2">
              <Compass className="w-4 h-4" />
              Discover
            </Link>
            <Link href="/cities" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Cities
            </Link>
            <Link href="/following" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2">
              <Users className="w-4 h-4" />
              Following
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <NotificationCenter />
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white hover:shadow-lg transition-all"
                  >
                    <User className="w-5 h-5" />
                  </button>
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg">
                      <Link href="/profile" className="flex items-center gap-2 px-4 py-3 hover:bg-muted transition-colors border-b border-border">
                        <User className="w-4 h-4" />
                        <span className="text-sm">My Profile</span>
                      </Link>
                      <Link href="/bookmarks" className="flex items-center gap-2 px-4 py-3 hover:bg-muted transition-colors border-b border-border">
                        <Heart className="w-4 h-4" />
                        <span className="text-sm">My Bookmarks</span>
                      </Link>
                      <Link href="/settings" className="flex items-center gap-2 px-4 py-3 hover:bg-muted transition-colors border-b border-border">
                        <Settings className="w-4 h-4" />
                        <span className="text-sm">Settings</span>
                      </Link>
                      <button
                        onClick={() => {
                          setIsLoggedIn(false);
                          setShowUserMenu(false);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-3 hover:bg-muted transition-colors text-destructive"
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm">Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Button variant="ghost" onClick={() => setIsLoggedIn(true)} className="hidden sm:inline">
                  Login
                </Button>
                <Button onClick={() => setIsLoggedIn(true)} className="hidden sm:inline">
                  Sign Up
                </Button>
              </>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t border-border space-y-3">
            <Link href="/" className="block px-4 py-2 rounded-lg hover:bg-muted transition-colors text-sm font-medium">
              Home
            </Link>
            <Link href="/discover" className="block px-4 py-2 rounded-lg hover:bg-muted transition-colors text-sm font-medium">
              Discover
            </Link>
            <Link href="/cities" className="block px-4 py-2 rounded-lg hover:bg-muted transition-colors text-sm font-medium">
              Cities
            </Link>
            <Link href="/following" className="block px-4 py-2 rounded-lg hover:bg-muted transition-colors text-sm font-medium">
              Following
            </Link>
            {!isLoggedIn && (
              <div className="space-y-2 pt-2">
                <Button variant="outline" onClick={() => setIsLoggedIn(true)} className="w-full">
                  Login
                </Button>
                <Button onClick={() => setIsLoggedIn(true)} className="w-full">
                  Sign Up
                </Button>
              </div>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
