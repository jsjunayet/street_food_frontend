# 🍜 Street Food Finder

A community-powered platform for discovering and sharing street food spots. Users can post, rate, and review local favorites, while Premium users gain access to exclusive content. Admins maintain platform quality through post moderation and content management.

---

## 🚀 Live Demo

- 🔗 Frontend: [https://your-frontend-url.vercel.app](https://your-frontend-url.vercel.app)
- 🔗 Backend: [https://your-backend-api-url.com](https://your-backend-api-url.com)
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

## 📦 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/street_food_finder.git
cd street_food_finder
```

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```
