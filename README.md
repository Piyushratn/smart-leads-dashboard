<div align="center">

# 🧩 Smart Leads Dashboard

### Full-Stack CRM · Lead Management System

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://docker.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on_Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://smart-leads-dashboard-navy.vercel.app/)

<br/>

**[🔗 Live Demo](https://smart-leads-dashboard-navy.vercel.app/) · [📂 Repository](https://github.com/Piyushratn/smart-leads-dashboard) · [🐛 Report Bug](https://github.com/Piyushratn/smart-leads-dashboard/issues) · [✨ Request Feature](https://github.com/Piyushratn/smart-leads-dashboard/issues)**

</div>

---

## 📌 The Problem

> Sales teams waste hours managing leads across spreadsheets, with no role-based visibility, no search, no filtering, and no audit trail. Admins can't control what sales reps can delete. Data leaks through CSV exports without access control.

**Smart Leads Dashboard solves this** — a production-grade CRM with JWT auth, role-based permissions, debounced search, paginated APIs, and one-click CSV export. Built entirely in TypeScript across the full stack.

---

## 📊 Stats

<div align="center">

| 🔷 TypeScript Coverage | 🔐 Auth System | 📄 Records Per Page | ⚡ Search Debounce | 🐳 Containerized |
|:---:|:---:|:---:|:---:|:---:|
| **94.1%** | **JWT + RBAC** | **10 (paginated)** | **400ms** | **Docker Compose** |

</div>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔐 **JWT Authentication** | Secure register/login with token-based sessions |
| 👥 **Role-Based Access Control** | Admin sees all leads; Sales sees own leads only |
| 🗂️ **Full Lead CRUD** | Create, Read, Update, Delete with validation |
| 🔍 **Debounced Search** | Search by name or email — 400ms debounce, no API spam |
| 🎛️ **Advanced Filtering** | Filter by Status (New/Contacted/Qualified/Lost) and Source |
| 📑 **Backend Pagination** | 10 records per page, server-side — scales with data size |
| 📤 **CSV Export** | One-click export of filtered leads data |
| 🌙 **Dark Mode** | Full dark/light theme support |
| 📱 **Responsive Design** | Works on desktop, tablet, and mobile |
| 🐳 **Docker Support** | Full `docker-compose` setup — one command to run everything |

---

## 🖼️ Screenshots

> **Dashboard — Lead Management View**

![Dashboard](./dashboard.png)

> *(Add screenshots: login page, admin view, sales view, filters in action)*

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (React + TS)                     │
│              TailwindCSS · React Router · Axios                  │
│    [ Login ] [ Register ] [ Dashboard ] [ Lead Form ] [ CSV ]    │
└────────────────────────┬────────────────────────────────────────┘
                         │ HTTP Requests (Axios + JWT Header)
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    EXPRESS API (Node.js + TS)                    │
│                                                                  │
│   /api/auth/register   /api/auth/login   /api/auth/me           │
│   /api/leads           /api/leads/:id    /api/leads/export/csv  │
└──────────┬──────────────────────┬───────────────────────────────┘
           │                      │
           ▼                      ▼
┌─────────────────┐    ┌──────────────────────────────────────────┐
│  AUTH MIDDLEWARE │    │           ROLE MIDDLEWARE                 │
│  Verify JWT      │    │  Admin → all leads                       │
│  Attach user     │    │  Sales → own leads only                  │
│  to request      │    │  Delete → Admin only                     │
└────────┬────────┘    └──────────────────┬───────────────────────┘
         │                                │
         └──────────────┬─────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────────┐
│                CONTROLLERS (TypeScript)                          │
│   auth.controller.ts        lead.controller.ts                  │
│   • register / login        • CRUD operations                   │
│   • bcrypt hashing          • Filter + Search + Sort            │
│   • JWT signing             • Pagination logic                  │
│                             • CSV generation                    │
└──────────────────────────┬──────────────────────────────────────┘
                           │ Mongoose ODM
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                     MONGODB DATABASE                             │
│              Users Collection · Leads Collection                │
│         Mongoose Models with TypeScript interfaces              │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat-square&logo=react-router&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=flat-square&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)
![bcrypt](https://img.shields.io/badge/bcryptjs-338?style=flat-square)

### Database
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat-square&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=flat-square&logo=mongoose&logoColor=white)

### Infrastructure
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)
![Docker Compose](https://img.shields.io/badge/Docker_Compose-2496ED?style=flat-square&logo=docker&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

---

## 📁 Project Structure

```
smart-leads-dashboard/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.ts              # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts # Register, login, me
│   │   │   └── lead.controller.ts # CRUD, filters, pagination, CSV
│   │   ├── middleware/
│   │   │   ├── auth.ts            # JWT verification
│   │   │   ├── role.ts            # RBAC (Admin / Sales)
│   │   │   └── errorHandler.ts    # Global error handler
│   │   ├── models/
│   │   │   ├── User.ts            # User schema + types
│   │   │   └── Lead.ts            # Lead schema + types
│   │   ├── routes/
│   │   │   ├── auth.routes.ts     # Auth endpoints
│   │   │   └── lead.routes.ts     # Lead endpoints
│   │   ├── types/
│   │   │   └── index.ts           # Shared TypeScript types
│   │   └── app.ts                 # Express app entry
│   ├── .env.example
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   ├── axios.ts           # Axios instance + interceptors
│   │   │   ├── auth.api.ts        # Auth API calls
│   │   │   └── leads.api.ts       # Leads API calls
│   │   ├── components/
│   │   │   ├── Filters.tsx        # Status + Source filters
│   │   │   ├── LeadForm.tsx       # Create/Edit lead form
│   │   │   └── Pagination.tsx     # Page navigation
│   │   ├── context/
│   │   │   └── AuthContext.tsx    # Global auth state
│   │   ├── hooks/
│   │   │   ├── useLeads.ts        # Lead data fetching hook
│   │   │   └── useDebounce.ts     # 400ms debounce hook
│   │   ├── pages/
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   └── Dashboard.tsx
│   │   ├── types/
│   │   │   └── index.ts           # Shared frontend types
│   │   └── App.tsx
│   └── package.json
├── docker-compose.yml
└── README.md
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js v18+
- MongoDB (local or [MongoDB Atlas](https://cloud.mongodb.com) free tier)
- Docker (optional)

### Option A — Without Docker

**Backend:**
```bash
cd backend
cp .env.example .env
# Fill in your .env values (see Environment Variables below)
npm install
npm run dev
```

**Frontend (separate terminal):**
```bash
cd frontend
npm install
npm start
```

### Option B — With Docker (recommended)

```bash
# From the root of the project
docker-compose up --build
```

That's it — MongoDB, backend, and frontend all start together.

---

## 🔑 Environment Variables

Create `backend/.env` using the example file:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/smart-leads
JWT_SECRET=your_strong_jwt_secret_here
JWT_EXPIRES_IN=7d
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

> **Never commit `.env` to Git.** It's already in `.gitignore`.

---

## 📡 API Documentation

### Auth Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Register new user |
| `POST` | `/api/auth/login` | Login — returns JWT |
| `GET` | `/api/auth/me` | Get current user (Protected) |

### Lead Routes (All Protected — JWT required)

| Method | Endpoint | Role | Description |
|--------|----------|------|-------------|
| `GET` | `/api/leads` | All | Get leads with filters + pagination |
| `GET` | `/api/leads/:id` | All | Get single lead |
| `POST` | `/api/leads` | All | Create new lead |
| `PATCH` | `/api/leads/:id` | All | Update lead |
| `DELETE` | `/api/leads/:id` | **Admin only** | Delete lead |
| `GET` | `/api/leads/export/csv` | All | Export filtered leads as CSV |

### Query Parameters for `GET /api/leads`

| Parameter | Type | Description |
|-----------|------|-------------|
| `status` | string | `New` / `Contacted` / `Qualified` / `Lost` |
| `source` | string | `Website` / `Instagram` / `Referral` |
| `search` | string | Search by name or email |
| `sort` | string | `latest` / `oldest` |
| `page` | number | Page number (default: `1`) |
| `limit` | number | Records per page (default: `10`) |

---

## 👥 Role-Based Access Control

| Feature | Admin | Sales |
|---------|-------|-------|
| View leads | ✅ All leads | ✅ Own leads only |
| Create lead | ✅ | ✅ |
| Edit lead | ✅ | ✅ |
| Delete lead | ✅ | ❌ |
| Export CSV | ✅ | ✅ |

---

## 🔐 Security

- Passwords hashed with **bcryptjs** (10 salt rounds) — never stored in plain text
- **JWT tokens** signed with secret key — validated on every protected route
- **Role middleware** runs after auth middleware — two-layer protection
- `.env` excluded from Git via `.gitignore`
- Mongoose ODM prevents NoSQL injection by design

---

## 🚀 Key Engineering Highlights

- **94% TypeScript** — full type safety across frontend and backend, shared type definitions in `types/index.ts`
- **Custom `useDebounce` hook** — prevents API spam during search, fires request only after 400ms of inactivity
- **Server-side pagination** — `skip` + `limit` in MongoDB queries, not client-side filtering
- **RBAC middleware chain** — `auth.ts` verifies JWT and attaches user, `role.ts` checks permissions — clean separation of concerns
- **Docker Compose orchestration** — single command starts MongoDB + backend + frontend with correct networking
- **Conventional commits** — `feat:`, `fix:`, `refactor:`, `docs:` — traceable, professional git history

---

## 🗺️ Roadmap

- [ ] Email notifications when lead status changes
- [ ] Lead activity timeline / audit log
- [ ] Dashboard analytics (charts — leads by source, conversion rate)
- [ ] Bulk lead import via CSV upload
- [ ] Two-factor authentication (2FA)

---

## 👨‍💻 Author

**Piyush Ratn** — AI-Focused Full-Stack Developer

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://linkedin.com/in/piyush-ratn)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/Piyushratn)
[![Email](https://img.shields.io/badge/Email-D14836?style=flat-square&logo=gmail&logoColor=white)](mailto:piyushratn932@gmail.com)
[![Portfolio](https://img.shields.io/badge/More_Projects-000000?style=flat-square&logo=vercel&logoColor=white)](https://github.com/Piyushratn)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

⭐ **If this project helped you, consider giving it a star!** ⭐

*Built with ❤️ by [Piyush Ratn](https://github.com/Piyushratn)*

</div>
