# 🍜 Street Food Finder

A community-powered platform for discovering and sharing street food spots. Users can post, rate, and review local favorites, while Premium users gain access to exclusive content. Admins maintain platform quality through post moderation and content management.

---

## 🚀 Live Demo

- 🔗 Frontend: [https://your-frontend-url.vercel.app](https://your-frontend-url.vercel.app)
- 🔗 Backend: [https://your-backend-api-url.com](https://street-foo-finder-backend.vercel.app)
- 🔐 Admin Login:
  - Email: `admin@gmail.com`
  - Password: `123456`

---

## 🧩 Features

### 👤 User Roles

#### Normal User

- Register and login
- Post food spots (title, description, location, category, price range, image)
- Comment, rate (1-5 stars), upvote/downvote
- Filter/search by title, category, price range

#### Premium User

- All Normal User features
- Access Premium posts after subscribing via SSLCommerz or ShurjoPay

#### Admin

- Approve/reject user posts
- Mark posts as Premium
- Moderate comments & ratings
- Manage users & categories

---

## 🛠️ Tech Stack

### Frontend

- **Next.js** – SSR & routing
- **React** – UI framework
- **Tailwind CSS** – Styling
- **Radix UI + ShadCN** – UI components
- **Framer Motion** – Animations
- **Recharts** – Data visualization
- **React Hook Form + Zod** – Form handling & validation

### Backend

- **Node.js + Express.js** – API
- **Prisma ORM** – Database client
- **PostgreSQL** – Relational database

### Auth & Payment

- **NextAuth.js** – JWT-based authentication
- **SSLCommerz / ShurjoPay** – Payment gateway for subscriptions

### Deployment

- Frontend: **Vercel**
- Backend: **Render / Railway**

---

## 📦 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/street_food_finder.git
cd street_food_finder
```

### 2. Install Frontend Dependencies

```bash
npm install
# or
yarn
```

### 3. Environment Setup (Frontend)

Create a `.env.local` file in the root directory and add:

```env
NEXT_PUBLIC_API_BASE_URL=https://street-foo-finder-backend.vercel.app/api/v1
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key
```

> ⚠️ Replace the values with your actual API endpoint and secret.

### 4. Run Development Server

```bash
npm run dev
```

> App will be available at: [http://localhost:3000](http://localhost:3000)

### 5. Build for Production

```bash
npm run build
npm start
```

---
