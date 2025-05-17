# Event Management System (EMS)

A full-stack event management application built with React and Node.js that allows users to browse, book, and manage events.

## Live Demo 🌐

- **Frontend**: [https://event-managment-git-main-omarmohammed000s-projects.vercel.app/](https://event-managment-git-main-omarmohammed000s-projects.vercel.app/)
- **Backend API**: [https://eventmanagment-4i0o.onrender.com/api](https://eventmanagment-4i0o.onrender.com/api)

## Features ✨

- 🔐 User authentication and authorization
- 📅 Event creation and management
- 🏷️ Event categorization with tags
- 🎫 Event booking system
- 🖼️ Image upload support
- 🌓 Dark/Light mode
- 👑 Admin dashboard
- 🔍 Event search functionality

## API Endpoints 🛣️

### Authentication Routes
```http
POST /api/auth/register    # Register new user
POST /api/auth/login       # User login
GET  /api/auth/me         # Get current user info
POST /api/auth/logout     # Logout user
POST /api/auth/refresh    # Refresh access token
```

### Event Routes
```http
GET    /api/events              # Get all events
GET    /api/events/:id          # Get specific event
GET    /api/events/tag/:tagId   # Get events by tag
GET    /api/events/user/:userId # Get user's booked events
POST   /api/events             # Create new event (Admin)
PUT    /api/events/:id         # Update event (Admin)
DELETE /api/events/:id         # Delete event (Admin)
GET    /api/events/search      # Search events
```

### Event Booking Routes
```http
POST   /api/events/:eventId/users/:userId  # Book an event
DELETE /api/events/:eventId/users/:userId  # Cancel booking
```

### Tag Routes
```http
GET    /api/tags     # Get all tags
POST   /api/tags     # Create new tag (Admin)
PUT    /api/tags/:id # Update tag (Admin)
DELETE /api/tags/:id # Delete tag (Admin)
```

### User Routes
```http
GET    /api/users                    # Get all users (Admin)
DELETE /api/users/:id                # Delete user (Admin)
PATCH  /api/users/:id/make-admin     # Make user admin (Admin)
```

## Local Development Setup 🚀

### Prerequisites
- Node.js (v14+)
- PostgreSQL
- Cloudinary account (for image uploads)

### Database Setup 📊

```sql
create table users(
    id serial,
    email varchar(50) unique not null,
    password varchar(100) not null check (length(password)>6),
    is_admin boolean default false,
    created_at timestamp default now(),
    updated_at timestamp default null,
    primary key(id) 
);

create table events(
    id serial primary key,
    event_name text not null,
    description text not null,
    start_date timestamp not null,
    end_date timestamp not null,
    venu text not null
);

create table events_images(
    id serial primary key,
    image_location text not null unique,
    event_id int not null references events(id) on delete cascade
);

create table tags(
    id serial primary key,
    name varchar(30) not null unique
);

create table event_tags(
    tag_id int references tags(id) on delete cascade,
    event_id int references events(id) on delete cascade,
    primary key (tag_id,event_id)
);

create table user_events(
    user_id int references users(id),
    event_id int references events(id) on delete cascade,
    primary key (user_id, event_id)
);
```

### Backend Setup 🔧
1. Clone the repository
2. Navigate to server directory:
```bash
cd server
```
3. Install dependencies:
```bash
npm install
```
4. Create `.env` file:
```env
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_DATABASE=your_db_name
DB_HOST=localhost
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```
5. Start the server:
```bash
npm run devStart
```

### Frontend Setup 💻
1. Navigate to client directory:
```bash
cd client
```
2. Install dependencies:
```bash
npm install
```
3. Create `.env` file:
```env
REACT_APP_API_URL=http://localhost:3000/api
```
4. Start the development server:
```bash
npm start
```

## Important Notes ⚠️
- For local development, update `ApiLink.jsx` to point to your local server
- Cloudinary setup is required for image upload functionality
- Default admin user should be created manually in the database
- CORS is configured for specific origins, update as needed

## Tech Stack 🛠️
- **Frontend**: React, Material-UI, React Router
- **Backend**: Node.js, Express, Sequelize
- **Database**: PostgreSQL
- **Image Storage**: Cloudinary
- **Authentication**: JWT

## License 📝
MIT