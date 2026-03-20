# TaskFlow — Task Management System

A full-stack Task Management System built with Node.js, TypeScript, and Next.js.

## Tech Stack

**Backend:** Node.js, Express, TypeScript, Prisma ORM, SQLite, JWT, bcrypt, Zod

**Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Axios, React Hook Form, Zod

---

## Project Structure

```
task-manager/
├── backend/       # Node.js + Express REST API
└── frontend/      # Next.js web application
```

---

## Getting Started

### Prerequisites

- Node.js v18 or higher
- npm v9 or higher

---

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Run database migrations
npx prisma generate
npx prisma migrate dev --name init

# Start development server
npm run dev
```

Server runs at: `http://localhost:4000`

---

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local

# Start development server
npm run dev
```

App runs at: `http://localhost:3000`

---

## API Endpoints

### Auth

| Method | Endpoint         | Description          | Auth Required |
| ------ | ---------------- | -------------------- | ------------- |
| POST   | `/auth/register` | Register new user    | No            |
| POST   | `/auth/login`    | Login user           | No            |
| POST   | `/auth/refresh`  | Refresh access token | No            |
| POST   | `/auth/logout`   | Logout user          | Yes           |
| GET    | `/auth/me`       | Get current user     | Yes           |

### Tasks

| Method | Endpoint            | Description               | Auth Required |
| ------ | ------------------- | ------------------------- | ------------- |
| GET    | `/tasks`            | Get all tasks (paginated) | Yes           |
| POST   | `/tasks`            | Create a task             | Yes           |
| GET    | `/tasks/:id`        | Get single task           | Yes           |
| PATCH  | `/tasks/:id`        | Update a task             | Yes           |
| DELETE | `/tasks/:id`        | Delete a task             | Yes           |
| PATCH  | `/tasks/:id/toggle` | Toggle task status        | Yes           |

### Query Parameters for GET /tasks

| Param    | Type   | Description                        |
| -------- | ------ | ---------------------------------- |
| `page`   | number | Page number (default: 1)           |
| `limit`  | number | Items per page (default: 10)       |
| `status` | string | Filter by `pending` or `completed` |
| `search` | string | Search by task title               |

---

## Features

- JWT authentication with Access Token (15m) + Refresh Token (7d)
- Automatic token refresh on expiry
- Password hashing with bcrypt
- Full task CRUD with ownership enforcement
- Pagination, filtering, and search
- Form validation on both frontend and backend (Zod)
- Optimistic UI updates
- Toast notifications
- Responsive design
- Route protection (unauthenticated users redirected to login)
