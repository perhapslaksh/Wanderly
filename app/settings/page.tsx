'use client';

import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Bell, Lock, Palette, LogOut, Trash2, ToggleLeft as Toggle } from 'lucide-react';
import { useState } from 'react';

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [profilePrivacy, setProfilePrivacy] = useState('public');
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 border-b border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences and privacy</p>
        </div>
      </section>

      {/* Settings Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              <span className="hidden sm:inline">Privacy</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              <span className="hidden sm:inline">Appearance</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6 mt-6">
            <div className="border border-border rounded-xl p-6 bg-card">
              <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>

              <div className="space-y-6">
                {/* Avatar */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Profile Picture</label>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-2xl font-bold">
                      SA
                    </div>
                    <div className="space-y-2">
                      <Button size="sm">Upload New Photo</Button>
                      <Button size="sm" variant="outline">
                        Remove Photo
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Full Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Full Name</label>
                  <input
                    type="text"
                    defaultValue="Sarah Anderson"
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Username */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Username</label>
                  <input
                    type="text"
                    defaultValue="sarah_travels"
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Email Address</label>
                  <input
                    type="email"
                    defaultValue="sarah@example.com"
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Bio</label>
                  <textarea
                    rows={4}
                    defaultValue="Exploring the world one destination at a time. Food enthusiast, photographer, and adventure seeker."
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                  <p className="text-xs text-muted-foreground">
                    Maximum 500 characters
                  </p>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Location</label>
                  <input
                    type="text"
                    defaultValue="San Francisco, USA"
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <Button>Save Changes</Button>
              </div>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6 mt-6">
            <div className="border border-border rounded-xl p-6 bg-card">
              <h2 className="text-2xl font-bold mb-6">Notification Preferences</h2>

              <div className="space-y-4">
                {/* Email Notifications */}
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <button
                    onClick={() => setEmailNotifications(!emailNotifications)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      emailNotifications ? 'bg-primary' : 'bg-muted'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white transition-transform ${
                        emailNotifications ? 'translate-x-6' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>

                {/* Push Notifications */}
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Get instant notifications on your device
                    </p>
                  </div>
                  <button
                    onClick={() => setPushNotifications(!pushNotifications)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      pushNotifications ? 'bg-primary' : 'bg-muted'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white transition-transform ${
                        pushNotifications ? 'translate-x-6' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>

                {/* Weekly Digest */}
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <p className="font-medium">Weekly Digest</p>
                    <p className="text-sm text-muted-foreground">
                      Receive a weekly summary of travel trends
                    </p>
                  </div>
                  <button
                    onClick={() => setWeeklyDigest(!weeklyDigest)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      weeklyDigest ? 'bg-primary' : 'bg-muted'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white transition-transform ${
                        weeklyDigest ? 'translate-x-6' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>

                <div className="pt-4 border-t border-border">
                  <h3 className="font-semibold mb-4">Notification Types</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'New Followers', enabled: true },
                      { label: 'Review Likes & Comments', enabled: true },
                      { label: 'Replies to Your Reviews', enabled: true },
                      { label: 'Recommendations', enabled: false },
                      { label: 'Community Events', enabled: true },
                    ].map((type) => (
                      <div key={type.label} className="flex items-center">
                        <input
                          type="checkbox"
                          defaultChecked={type.enabled}
                          className="w-4 h-4 rounded border-border cursor-pointer"
                        />
                        <label className="ml-3 text-sm">{type.label}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button>Save Preferences</Button>
              </div>
            </div>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy" className="space-y-6 mt-6">
            <div className="border border-border rounded-xl p-6 bg-card">
              <h2 className="text-2xl font-bold mb-6">Privacy Settings</h2>

              <div className="space-y-6">
                {/* Profile Privacy */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Profile Privacy</label>
                  <div className="space-y-2">
                    {[
                      { value: 'public', label: 'Public - Anyone can view your profile and reviews' },
                      { value: 'friends', label: 'Friends Only - Only people you follow can view' },
                      { value: 'private', label: 'Private - Only you can view your profile' },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center p-3 border border-border rounded-lg cursor-pointer hover:bg-muted transition-colors">
                        <input
                          type="radio"
                          name="privacy"
                          value={option.value}
                          checked={profilePrivacy === option.value}
                          onChange={(e) => setProfilePrivacy(e.target.value)}
                          className="w-4 h-4"
                        />
                        <span className="ml-3 text-sm">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Show Email */}
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <p className="font-medium">Show Email Address</p>
                    <p className="text-sm text-muted-foreground">
                      Allow others to see your email on your profile
                    </p>
                  </div>
                  <button className="w-12 h-6 rounded-full bg-muted">
                    <div className="w-5 h-5 rounded-full bg-white translate-x-0.5" />
                  </button>
                </div>

                {/* Allow Reviews */}
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <p className="font-medium">Allow Others to Review Your Lists</p>
                    <p className="text-sm text-muted-foreground">
                      Let other travelers comment and suggest improvements
                    </p>
                  </div>
                  <button className="w-12 h-6 rounded-full bg-primary">
                    <div className="w-5 h-5 rounded-full bg-white translate-x-6" />
                  </button>
                </div>

                {/* Blocked Users */}
                <div className="pt-4 border-t border-border">
                  <h3 className="font-semibold mb-4">Blocked Users</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    You haven't blocked anyone yet
                  </p>
                </div>

                <Button>Save Privacy Settings</Button>
              </div>
            </div>
          </TabsContent>

          {/* Appearance Tab */}
          <TabsContent value="appearance" className="space-y-6 mt-6">
            <div className="border border-border rounded-xl p-6 bg-card">
              <h2 className="text-2xl font-bold mb-6">Appearance</h2>

              <div className="space-y-6">
                {/* Theme */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Theme</label>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { value: 'light', label: 'Light', icon: '☀️' },
                      { value: 'dark', label: 'Dark', icon: '🌙' },
                      { value: 'system', label: 'System', icon: '🖥️' },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setTheme(option.value as any)}
                        className={`p-4 rounded-lg border-2 transition-all text-center space-y-2 ${
                          theme === option.value
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary'
                        }`}
                      >
                        <div className="text-2xl">{option.icon}</div>
                        <p className="text-sm font-medium">{option.label}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Font Size */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Default Font Size</label>
                  <div className="flex gap-2">
                    {['Small', 'Regular', 'Large'].map((size) => (
                      <button
                        key={size}
                        className="flex-1 px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors text-sm"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <Button>Save Appearance</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Danger Zone */}
        <div className="mt-12 border border-destructive rounded-xl p-6 bg-destructive/5">
          <h3 className="text-lg font-bold text-destructive mb-4">Danger Zone</h3>
          <div className="space-y-4">
            <div className="p-4 border border-destructive rounded-lg">
              <p className="font-medium mb-2">Change Password</p>
              <Button variant="outline" size="sm">
                <Lock className="w-4 h-4 mr-2" />
                Change Password
              </Button>
            </div>

            <div className="p-4 border border-destructive rounded-lg">
              <p className="font-medium mb-2">Logout</p>
              <Button variant="outline" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Logout All Devices
              </Button>
            </div>

            <div className="p-4 border border-destructive/50 rounded-lg bg-destructive/5">
              <p className="font-medium text-destructive mb-2">Delete Account</p>
              <p className="text-sm text-muted-foreground mb-4">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="text-destructive border-destructive hover:bg-destructive/10 bg-transparent"
                onClick={() => setShowDeleteConfirm(true)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Account
              </Button>
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-card border border-border rounded-xl p-6 max-w-sm mx-4">
              <h3 className="text-xl font-bold mb-2">Delete Account</h3>
              <p className="text-muted-foreground mb-6">
                Are you sure? This action cannot be undone. All your data will be permanently deleted.
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-destructive hover:bg-destructive/90"
                  onClick={() => {
                    console.log('Account deleted');
                    setShowDeleteConfirm(false);
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
