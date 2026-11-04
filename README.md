<img width="915" height="833" alt="create Event" src="https://github.com/user-attachments/assets/ffda928b-ca5c-422e-861f-b15f951a50f7" />
# 🌱 Ekota — Social Development Events Platform

**Small Acts. Stronger Communities.**

Ekota is a community-driven social development events platform that connects people through meaningful activities. Users can create community events, discover upcoming activities, join events, and contribute to positive social change.

Our goal is to make community participation easier and encourage people to work together for a better society.

---

## ✨ Features
<img width="1872" height="864" alt="home" src="https://github.com/user-attachments/assets/bf0fb44a-8383-4708-815f-f6e426b2b63d" />


### Public Features

- Responsive homepage with a hero section and platform highlights.
- Display six upcoming events dynamically.
- Browse all upcoming community events.
- View individual event details.
- About page explaining Ekota's mission, vision, and values.
- Light and dark theme support.

### Authentication

- User registration with email and password.
- User login with email and password.
- Google authentication.
- Password validation (uppercase, lowercase, minimum 6 characters).
- JWT-based authentication for protected backend APIs.
- User profile view and update.

### Event Management

- Create community events.
- View upcoming events.
- Update events created by the logged-in user.
- Delete events created by the logged-in user.
- Join community events.
- Prevent users from joining their own events.
- Prevent duplicate event participation.
- View events joined by the current user.
- Protect event management operations with ownership checks.

### Additional Features

- Reusable loading skeletons.
- Search functionality for personal event lists.
- Event statistics.
- Responsive mobile navigation.
- Toast notifications.
- Profile picture support.
- Error and empty states.

---

## 🛠️ Technologies Used

### Frontend

- Next.js (App Router)
- React
- JavaScript
- Tailwind CSS
- shadcn/ui
- Lucide React
- Sonner
- Better Auth

### Backend

- Node.js
- Express.js
- MongoDB
- MongoDB Node.js Driver
- JOSE (JWT verification)

### Authentication & Security

- Better Auth
- Google OAuth
- JSON Web Tokens (JWT)
- JWKS-based token verification
- Protected API routes
- Event ownership verification

### Deployment

- Vercel (Frontend)
- Render (Backend)
- MongoDB Atlas (Database)

---

## 📁 Project Structure

```text
ekota/
│
├── ekota-client/
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   │   ├── about/
│   │   │   ├── create-event/
│   │   │   ├── events/
│   │   │   ├── joined-events/
│   │   │   ├── login/
│   │   │   ├── manage-events/
│   │   │   ├── profile/
│   │   │   ├── register/
│   │   │   ├── layout.js
│   │   │   └── page.js
│   │   │
│   │   ├── components/
│   │   │   ├── home/
│   │   │   ├── shared/
│   │   │   └── ui/
│   │   │
│   │   └── lib/
│   │       ├── api.js
│   │       ├── auth.js
│   │       └── auth-client.js
│   │
│   ├── .env.local
│   └── package.json
│
├── ekota-server/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── middleware/
│   │   │   └── verifyToken.js
│   │   ├── routes/
│   │   │   └── eventRoutes.js
│   │   └── server.js
│   │
│   ├── .env
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

Follow these instructions to run Ekota locally.

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- MongoDB Atlas account
- Google Cloud project with OAuth credentials
- Git

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Navigate to the project directory:

```bash
cd ekota
```

### 2. Setup the Frontend

Navigate to the client folder:

```bash
cd ekota-client
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file inside `ekota-client`:

```env
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_long_random_secret
BETTER_AUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

Run the frontend:

```bash
npm run dev
```

Frontend runs at:

```text
http://localhost:3000
```

### 3. Setup the Backend

Open another terminal and navigate to the server folder:

```bash
cd ekota/ekota-server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside `ekota-server`:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
MONGODB_DB_NAME=ekota

CLIENT_URL=http://localhost:3000
BETTER_AUTH_URL=http://localhost:3000
```

Run the backend:

```bash
npm run dev
```

Backend runs at:

```text
http://localhost:5000
```

The MongoDB database name used by Ekota is `ekota`.

**Important:** Keep your actual connection strings, authentication secrets, and Google credentials private. Never commit `.env` or `.env.local` files.

---

## 🔐 Authentication Flow

Ekota uses Better Auth for user authentication and Google OAuth.

The frontend obtains a JWT token after authentication and sends it to the Express backend using the Authorization header.

Example:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

The Express middleware verifies the token using Better Auth's JWKS endpoint before allowing access to protected routes.

Protected operations also check event ownership so that users cannot manage events created by other users.

---

## 🔌 API Endpoints

Base URL:

```text
http://localhost:5000/api/events
```

### Public Endpoints

| Method | Endpoint  | Description             |
| ------ | --------- | ----------------------- |
| GET    | `/`       | Get upcoming events     |
| GET    | `/recent` | Get six upcoming events |
| GET    | `/test`   | Test the event API      |
| GET    | `/:id`    | Get event details       |

### Protected Endpoints

These endpoints require a valid Bearer token.

| Method | Endpoint             | Description                              |
| ------ | -------------------- | ---------------------------------------- |
| POST   | `/`                  | Create an event                          |
| GET    | `/my-events`         | Get events created by the current user   |
| GET    | `/joined`            | Get events joined by the current user    |
| POST   | `/:id/join`          | Join an event                            |
| GET    | `/:id/participation` | Check participation and ownership status |
| PATCH  | `/:id`               | Update an owned event                    |
| DELETE | `/:id`               | Delete an owned event                    |

The `/:id/participation` endpoint is available in the updated backend route implementation.

---

## 🗄️ Database

Ekota uses MongoDB Atlas.

Main collection:

```text
Database: ekota
Collection: events
```

An event document follows this general structure:

```json
{
  "title": "Tree Plantation Campaign",
  "description": "Let's make our community greener.",
  "eventType": "Environmental",
  "thumbnailUrl": "https://example.com/tree.jpg",
  "location": "Dhaka, Bangladesh",
  "eventDate": "2026-12-20",
  "creatorEmail": "creator@example.com",
  "joinedUsers": [],
  "createdAt": "2026-11-01T10:00:00.000Z"
}
```

The backend manages the creator information, joined users, and timestamps.

---

## 🎨 Design

Ekota focuses on a clean, accessible, and responsive user experience.

- Mobile-first responsive layouts.
- Consistent green-based visual identity.
- Light and dark theme support.
- Reusable components.
- Loading skeletons.
- Clear form validation and toast messages.

---

## 🌍 Deployment

The planned deployment architecture:

| Application      | Platform      |
| ---------------- | ------------- |
| Next.js frontend | Vercel        |
| Express backend  | Render        |
| MongoDB database | MongoDB Atlas |

Before deploying, configure production environment variables, Google OAuth redirect URLs, frontend API URLs, CORS origins, and Better Auth URLs to use the deployed domains.

---

## 👨‍💻 Author

**Your Name**
Yeasin Khan

- GitHub:https://github.com/yeasinkhan08

---

## 💚 Our Mission

We believe that positive change begins with small actions.

Ekota brings people together to create opportunities for meaningful participation, community support, and social development.

**Together, we make a difference.**
