# Product Manager – Full-Stack Assignment  
**Backend Developer (Intern) – Project Submission**

---

## Overview

A **secure, scalable REST API** with **JWT-based authentication**, **role-based access control (user vs admin)**, and **CRUD operations on Products**.  
Paired with a **clean, responsive frontend** built using **Next.js 14 (App Router)**, **Redux + Redux Persist**, **Axios**, and **shadcn/ui**.

**Live Demo (if hosted):** \`https://your-frontend.vercel.app\`  
**Backend API:** \`https://your-backend.onrender.com/api/v1\`  
**GitHub:** \`https://github.com/your-username/product-manager\`

---

## Core Features Implemented

| Feature | Status | Notes |
|-------|--------|-------|
| User Registration & Login | Completed | Password hashed with \`bcrypt\`, JWT issued |
| Role-Based Access | Completed | \`user\` vs \`admin\` roles |
| Product CRUD (User) | Completed | Users manage their own products |
| Admin Panel | Completed | View/delete **all users & all products** |
| API Versioning | Completed | \`/api/v1/...\` |
| Input Validation | Completed | \`zod\` + \`express-validator\` |
| Error Handling | Completed | Global handler, consistent JSON responses |
| API Documentation | Completed | Swagger UI at \`/api-docs\` |
| Frontend UI | Completed | Next.js + shadcn/ui + React Hot Toast |
| Secure JWT Handling | Completed | HttpOnly cookies or localStorage + Axios interceptor |
| Responsive & Clean UI | Completed | Mobile-friendly, loading states, toasts |
| State Persistence | Completed | Redux Persist – login survives refresh |

---

## Tech Stack

### Backend
- **Node.js + Express**
- **MongoDB (Mongoose)**
- **JWT + bcrypt**
- **Zod / express-validator**
- **Swagger (API Docs)**
- **Morgan (logging)**

### Frontend
- **Next.js 14 (App Router)**
- **React + Redux Toolkit**
- **Redux Persist** (state survives refresh)
- **Axios** (API calls)
- **shadcn/ui + Tailwind CSS**
- **React Hot Toast** (notifications)

---

## Project Structure

\`\`\`bash
/backend
  ├── controllers/     # Auth, Product, Admin
  ├── middleware/      # auth, admin, errorHandler
  ├── models/          # User, Product
  ├── routes/          # v1/auth, v1/products, v1/admin
  ├── utils/           # sendResponse, catchAsync
  ├── server.js
  └── swagger.js

/frontend
  ├── src/app/
  │   ├── (auth)/login/page.jsx
  │   ├── dashboard/
  │   │   ├── page.jsx
  │   │   └── admin/
  │   │       ├── page.jsx
  │   │       └── products/page.jsx
  ├── src/components/
  │   ├── AuthForm.jsx
  │   ├── ProductTable.jsx
  │   ├── ProductForm.jsx
  │   └── ProtectedRoute.jsx
  ├── src/lib/
  │   ├── store.js
  │   ├── axios.js
  │   └── authSlice.js
  └── src/hooks/
      └── useAuth.js
\`\`\`

---

## API Documentation

- **Swagger UI:** \`https://your-backend.onrender.com/api-docs\`
- **Postman Collection:** [Download here](./ProductManager.postman_collection.json)

---

## Security & Scalability Highlights

| Feature | Implementation |
|--------|----------------|
| **JWT Security** | Tokens stored in Redux + localStorage, auto-injected via Axios interceptor |
| **Input Validation** | Zod on frontend, express-validator + Mongoose on backend |
| **Error Handling** | Centralized error middleware, consistent JSON format |
| **Scalability** | Modular routes/controllers, ready for microservices or Redis caching |
| **Deployment Ready** | Docker support, environment variables, CORS configured |

---

## How to Run

### Backend
\`\`\`bash
cd backend
npm install
cp .env.example .env
npm run dev
\`\`\`

### Frontend
\`\`\`bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
\`\`\`

---

## Why This Solution Stands Out

- **Clean separation** of concerns (auth, products, admin)
- **No over-engineering** — RTK Query removed, Axios used for clarity
- **Production-ready patterns** — error handling, validation, logging
- **Excellent UX** — toast notifications, loading states, responsive design
- **State persistence** — login survives page refresh
- **Admin power tools** — full visibility & control over data

---

**Ready for scaling, secure by default, and easy to extend.**