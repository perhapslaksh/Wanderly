'use client';

import { useState, useEffect } from 'react';
import { Bell, X, Heart, MessageCircle, Users, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface NotificationItem {
  id: string;
  type: 'follow' | 'review_like' | 'review_response' | 'comment';
  actorName: string;
  message: string;
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
}

const mockNotifications: NotificationItem[] = [
  {
    id: '1',
    type: 'follow',
    actorName: 'Emma Wilson',
    message: 'started following you',
    read: false,
    createdAt: new Date(Date.now() - 600000),
  },
  {
    id: '2',
    type: 'review_like',
    actorName: 'Marco Rossi',
    message: 'liked your review of Eiffel Tower',
    read: false,
    createdAt: new Date(Date.now() - 1800000),
  },
  {
    id: '3',
    type: 'review_response',
    actorName: 'Yuki Tanaka',
    message: 'replied to your review',
    read: false,
    createdAt: new Date(Date.now() - 3600000),
  },
  {
    id: '4',
    type: 'comment',
    actorName: 'Alex Martinez',
    message: 'commented on your list "Best Street Food"',
    read: true,
    createdAt: new Date(Date.now() - 7200000),
  },
];

export default function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);
  const [unreadCount, setUnreadCount] = useState(
    notifications.filter((n) => !n.read).length
  );

  useEffect(() => {
    setUnreadCount(notifications.filter((n) => !n.read).length);
  }, [notifications]);

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleRemoveNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const getIconForType = (type: NotificationItem['type']) => {
    switch (type) {
      case 'follow':
        return <Users className="w-4 h-4" />;
      case 'review_like':
        return <Heart className="w-4 h-4" />;
      case 'review_response':
        return <MessageCircle className="w-4 h-4" />;
      case 'comment':
        return <MessageCircle className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-muted rounded-lg transition-colors"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-card border border-border rounded-lg shadow-2xl z-50 max-h-[600px] flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-border flex items-center justify-between sticky top-0 bg-card rounded-t-lg">
            <h3 className="font-bold text-lg">Notifications</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-muted rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Notifications List */}
          <div className="overflow-y-auto flex-1">
            {notifications.length > 0 ? (
              <div className="divide-y divide-border">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    onClick={() => handleMarkAsRead(notification.id)}
                    className={`p-4 hover:bg-muted transition-colors cursor-pointer ${
                      !notification.read ? 'bg-primary/5' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white flex-shrink-0 mt-1">
                        {getIconForType(notification.type)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm">
                          <span className="font-semibold">{notification.actorName}</span>
                          {' '}
                          <span className="text-muted-foreground">
                            {notification.message}
                          </span>
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatTime(notification.createdAt)}
                        </p>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveNotification(notification.id);
                        }}
                        className="p-1 hover:bg-border rounded transition-colors flex-shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Bell className="w-12 h-12 text-muted-foreground/30 mb-3" />
                <p className="text-muted-foreground text-sm">No notifications yet</p>
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-3 border-t border-border space-y-2 sticky bottom-0 bg-card rounded-b-lg">
              <Button
                variant="outline"
                size="sm"
                onClick={handleMarkAllAsRead}
                className="w-full bg-transparent"
              >
                Mark all as read
              </Button>
              <a href="/notifications" className="block">
                <Button variant="ghost" size="sm" className="w-full">
                  View all notifications
                </Button>
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
