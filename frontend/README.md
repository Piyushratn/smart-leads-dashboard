# Smart Leads Dashboard

A full-stack Lead Management Dashboard built with the MERN stack.

## Tech Stack
- **Frontend**: React, TypeScript, TailwindCSS
- **Backend**: Node.js, Express, TypeScript
- **Database**: MongoDB + Mongoose
- **Auth**: JWT + bcrypt
- **Infra**: Docker, docker-compose

## Features
- JWT authentication with protected routes
- Role-based access control (admin / sales)
- Lead CRUD with status and source tracking
- Advanced filtering: status, source, search, sort
- Debounced search (400ms)
- Backend pagination (10 records/page)
- CSV export
- Dark mode
- Responsive design

## Setup

### With Docker (recommended)
```bash
git clone <repo>
cd smart-leads
cp backend/.env.example backend/.env
docker-compose up --build
```

### Manual
```bash
# Backend
cd backend && npm install && npm run dev

# Frontend
cd frontend && npm install && npm start
```

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/register | — | Register user |
| POST | /api/auth/login | — | Login |
| GET | /api/auth/me | ✓ | Get current user |
| GET | /api/leads | ✓ | List leads (filters + pagination) |
| POST | /api/leads | ✓ | Create lead |
| PATCH | /api/leads/:id | ✓ | Update lead |
| DELETE | /api/leads/:id | admin | Delete lead |
| GET | /api/leads/export/csv | ✓ | Export CSV |

## Environment Variables
See `backend/.env.example`


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
