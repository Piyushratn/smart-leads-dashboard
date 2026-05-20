# Smart Leads Dashboard

A full-stack Lead Management Dashboard built with the MERN stack (MongoDB, Express, React, Node.js) with TypeScript, JWT authentication, role-based access control, and Docker support.

## Live Demo
[Link to deployed app](https://your-deployment-link.com)

## GitHub Repository
[https://github.com/Piyushratn/smart-leads-dashboard](https://github.com/Piyushratn/smart-leads-dashboard)

## Features

- JWT-based authentication (Register/Login)
- Role-based access control (Admin / Sales User)
- Full Lead CRUD (Create, Read, Update, Delete)
- Advanced filtering by Status and Source
- Search by Name or Email (debounced 400ms)
- Sort by Latest or Oldest
- Backend pagination (10 records per page)
- CSV Export functionality
- Dark mode support
- Responsive design
- Docker setup with docker-compose
- TypeScript throughout (frontend + backend)

## Tech Stack

### Frontend
- React.js with TypeScript
- TailwindCSS
- React Router DOM
- Axios

### Backend
- Node.js with TypeScript
- Express.js
- MongoDB with Mongoose
- JWT (jsonwebtoken)
- bcryptjs

### Infrastructure
- Docker + docker-compose
- MongoDB

## Project Structure

```
smart-leads-dashboard/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.ts
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts
│   │   │   └── lead.controller.ts
│   │   ├── middleware/
│   │   │   ├── auth.ts
│   │   │   ├── role.ts
│   │   │   └── errorHandler.ts
│   │   ├── models/
│   │   │   ├── User.ts
│   │   │   └── Lead.ts
│   │   ├── routes/
│   │   │   ├── auth.routes.ts
│   │   │   └── lead.routes.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   └── app.ts
│   ├── .env.example
│   ├── Dockerfile
│   ├── tsconfig.json
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   ├── axios.ts
│   │   │   ├── auth.api.ts
│   │   │   └── leads.api.ts
│   │   ├── components/
│   │   │   ├── Filters.tsx
│   │   │   ├── LeadForm.tsx
│   │   │   └── Pagination.tsx
│   │   ├── context/
│   │   │   └── AuthContext.tsx
│   │   ├── hooks/
│   │   │   ├── useLeads.ts
│   │   │   └── useDebounce.ts
│   │   ├── pages/
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   └── Dashboard.tsx
│   │   ├── types/
│   │   │   └── index.ts
│   │   └── App.tsx
│   ├── Dockerfile
│   ├── tailwind.config.js
│   └── package.json
├── docker-compose.yml
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js v18+
- MongoDB
- Docker (optional)

### Without Docker

**Backend:**
```bash
cd backend
cp .env.example .env
# Fill in your .env values
npm install
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
npm start
```

### With Docker
```bash
docker-compose up --build
```

## Environment Variables

See `backend/.env.example` for all required variables:
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/smart-leads
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d
NODE_ENV=development
CLIENT_URL=http://localhost:3000

## API Documentation

### Auth Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login user |
| GET | /api/auth/me | Get current user |

### Lead Routes (Protected)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /api/leads | All | Get all leads with filters |
| GET | /api/leads/:id | All | Get single lead |
| POST | /api/leads | All | Create new lead |
| PATCH | /api/leads/:id | All | Update lead |
| DELETE | /api/leads/:id | Admin only | Delete lead |
| GET | /api/leads/export/csv | All | Export leads as CSV |

### Query Parameters for GET /api/leads
| Parameter | Type | Description |
|-----------|------|-------------|
| status | string | Filter by status (New/Contacted/Qualified/Lost) |
| source | string | Filter by source (Website/Instagram/Referral) |
| search | string | Search by name or email |
| sort | string | Sort order (latest/oldest) |
| page | number | Page number (default: 1) |
| limit | number | Records per page (default: 10) |

## Role-Based Access

|      Feature   |     Admin       | Sales |
|----------------|---------------- |-------|
| View leads     |  All leads    |  Own leads only 
| Create lead    |  yes          | Yes 
| Edit lead      |  yes          | Yes
| Delete lead    |  yes          | No    
| Export CSV     |  yes          | Yes 

## Git Commit Convention
This project follows conventional commits:
- `feat:` new features
- `fix:` bug fixes
- `refactor:` code refactoring
- `docs:` documentation updates