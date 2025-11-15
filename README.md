# Real Estate Listing Platform 🏡

A modern full-stack real estate marketplace built with **Next.js**, **Tailwind CSS**, and an **Express + PostgreSQL backend**.

The platform includes:

- Public listings page
- Admin authentication
- Admin dashboard
- Upload property listings
- View property details
- Modern, clean, mobile-friendly UI

---

## 🚀 What We’ve Achieved So Far

### ✅ 1. Project Setup (Frontend + Backend)

- Initialized **Next.js 14 App Router** frontend using Vite → migrated to `.jsx`.
- Setup **Tailwind CSS** and configured base styles.
- Created backend folder with Express server and routes (CRUD ready).
- Connected backend to **PostgreSQL** using Supabase.
- Added CORS, dotenv, basic server structure.

### ✅ 2. Navbar + Layout UI

- Implemented **responsive, modern navbar** with:
  - Clean gradient branding
  - Mobile menu
  - Admin button + logout
  - Navigation to home, listings, admin login
- Works beautifully on all screen sizes.

### ✅ 3. Admin Authentication

- LocalStorage-based admin session.
- Redirects on logout.
- Frontend pages connected to backend login API.

### ✅ 4. Listings Route + Navigation

- `/listing` route created.
- Navbar “Listings” button now correctly navigates to new page.

### ✅ 5. File Cleanup & Component Structure

- Converted components to `.jsx`.
- Simplified Tailwind classes.
- Removed duplicate mobile/desktop styling.
- Modernized the UI to look clean and consistent.

---

## 📌 What’s Left To Build (Roadmap)

### 🔹 **1. Complete Listings Page UI**

To-do:

- Grid layout for properties
- Listing card component
- Integrate backend “get all listings” API
- Search + Filters (price, city, type, BHK, status)

### 🔹 **2. Admin Dashboard**

To-do:

- Add/Delete/Edit property listings
- View analytics
- Better authenticated routes
- Upload images (Cloudinary optional)

### 🔹 **3. API Endpoints Integration**

- GET /listings
- POST /listings
- PUT /listings/:id
- DELETE /listings/:id
- Admin login endpoint

### 🔹 **4. Property Detail Page**

- `/listing/[id]`
- Full gallery, description, map, details section

### 🔹 **5. Deployment**

- Frontend → Vercel
- Backend → Render / Railway
- PostgreSQL → Supabase

---

## 🛠 Tech Stack

### **Frontend**

- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- Lucide Icons

### **Backend**

- Node.js + Express
- PostgreSQL + Prisma + Supabase
- REST APIs

---

## 📂 Folder Structure

root/
│── frontend/
│ ├── src/
│ │ ├── app/
│ │ ├── components/
│ │ ├── styles/
│ │ └── utils/
│ └── package.json
│
└── backend/
├── routes/
├── controllers/
├── models/
├── server.js
└── package.json

## ⚙️ Installation & Running Locally

### 1️⃣ **Clone the Repository**

```bash
git clone <your-repo-url>
cd your-project

🖥 Frontend Setup (Next.js)
cd frontend
npm install
npm run dev

Runs at:
👉 http://localhost:3000

🛠 Backend Setup (Node + Express)
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
node seedAdmin.js
npx nodemon server.js

Backend runs at:
👉 http://localhost:5000

Create a .env file inside backend/:

JWT_SECRET="your-jwt-secret"
JWT_EXPIRES_IN="7d"

# Cloudinary
CLOUDINARY_CLOUD_NAME="cloudinary-name"
CLOUDINARY_API_KEY="cloudinary-api-key"
CLOUDINARY_API_SECRET="cloudinnary-api-secret"

# Admin user initial (for quick testing)
ADMIN_EMAIL="adminemail"
ADMIN_PASSWORD="password"

```
