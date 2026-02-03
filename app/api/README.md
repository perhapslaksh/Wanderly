# Wanderly API Routes

This directory contains all API endpoints for the Wanderly social travel app.

## Route Structure

### Authentication & Users
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile
- `GET /api/users/:id/followers` - Get user's followers
- `GET /api/users/:id/following` - Get user's following list
- `POST /api/users/:id/follow` - Follow user
- `DELETE /api/users/:id/follow` - Unfollow user

### Places
- `GET /api/places` - Get all places (with filters)
- `GET /api/places/:id` - Get place details
- `POST /api/places` - Create new place
- `PUT /api/places/:id` - Update place
- `DELETE /api/places/:id` - Delete place
- `GET /api/places/:id/reviews` - Get place reviews
- `GET /api/places/city/:city` - Get places by city

### Bookmarks
- `GET /api/bookmarks` - Get user's bookmarks
- `POST /api/bookmarks` - Create bookmark
- `DELETE /api/bookmarks/:id` - Remove bookmark
- `POST /api/bookmarks/:id/lists` - Add bookmark to list

### Reviews
- `POST /api/reviews` - Create review
- `GET /api/reviews/:id` - Get review details
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review
- `POST /api/reviews/:id/like` - Like review
- `DELETE /api/reviews/:id/like` - Unlike review
- `POST /api/reviews/:id/responses` - Reply to review

### Lists
- `GET /api/lists` - Get all lists
- `POST /api/lists` - Create new list
- `GET /api/lists/:id` - Get list details
- `PUT /api/lists/:id` - Update list
- `DELETE /api/lists/:id` - Delete list
- `POST /api/lists/:id/places` - Add place to list
- `DELETE /api/lists/:id/places/:placeId` - Remove place from list

### Feed & Social
- `GET /api/feed` - Get following feed
- `GET /api/feed/trending` - Get trending posts
- `POST /api/posts` - Create post
- `POST /api/posts/:id/like` - Like post
- `DELETE /api/posts/:id/like` - Unlike post
- `POST /api/posts/:id/comments` - Comment on post
- `DELETE /api/posts/:id/comments/:commentId` - Delete comment

### Cities
- `GET /api/cities` - Get all cities
- `GET /api/cities/:id` - Get city details
- `GET /api/cities/:id/followers` - Get city followers
- `POST /api/cities/:id/follow` - Follow city
- `DELETE /api/cities/:id/follow` - Unfollow city

### Notifications
- `GET /api/notifications` - Get user notifications
- `PUT /api/notifications/:id/read` - Mark notification as read
- `PUT /api/notifications/read-all` - Mark all as read
- `DELETE /api/notifications/:id` - Delete notification
- `DELETE /api/notifications` - Clear all notifications

### Search
- `GET /api/search` - Global search (places, users, cities, lists)
- `GET /api/search/places` - Search places
- `GET /api/search/users` - Search users
- `GET /api/search/lists` - Search lists

## Implementation Notes

All endpoints should:
1. Validate authentication token from request headers
2. Validate input data according to Zod schemas in `/lib/types.ts`
3. Return appropriate HTTP status codes
4. Include error messages for debugging
5. Use parameterized queries to prevent SQL injection
6. Implement rate limiting for mutation operations

### Response Format

Success response:
```json
{
  "success": true,
  "data": { /* endpoint-specific data */ }
}
```

Error response:
```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

### Authentication

All protected endpoints require `Authorization: Bearer <token>` header.

### Real-time Updates

For real-time features (live feeds, notifications), implement WebSocket connections:
- `WS /api/ws/feed` - Real-time feed updates
- `WS /api/ws/notifications` - Real-time notifications
- `WS /api/ws/activity` - Real-time activity updates
