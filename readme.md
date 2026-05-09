# 🚀 Full Stack Task Manager

A modern full-stack task management application built with the MERN stack. It features secure authentication, protected routes, drag-and-drop task reordering, responsive UI, inline editing, skeleton loading states, toast notifications, and a polished SaaS-style user experience.

## ✨ Features

### 🔐 Authentication

- User Registration & Login
- JWT Authentication
- Protected Routes
- Persistent Sessions with localStorage
- Show / Hide Password Toggle

### ✅ Task Management

- Create Tasks
- Delete Tasks
- Inline Task Editing
- Mark Tasks Complete / Incomplete
- Drag & Drop Task Reordering
- Persistent Task Ordering
- Task Priority Levels (Low / Medium / High)
- Colour-Coded Priority Badges
- Filter Tasks by:
  - All
  - Active
  - Completed

### 🎨 UX / UI

- Responsive Mobile-First Design
- Skeleton Loading States
- Toast Notifications
- Smooth Animations & Micro-Interactions
- Mobile / Tablet / Desktop Breakpoints
- Modern Glassmorphism-Inspired UI

### 🧠 Developer Features

- Component-Based Architecture
- Reusable React Components
- Modular Folder Structure
- REST API Backend
- MongoDB Database Integration
- Sortable Drag & Drop Architecture
- Service-Based API Structure

## 🛠 Tech Stack

### Frontend

- React
- React Router
- Vite
- CSS3
- React Icons
- dnd-kit

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcryptjs

## 📸 Screenshots

### Planned Screenshots

- Login Page
- Register Page
- Task Dashboard
- Drag & Drop Task Reordering
- Mobile Responsive View
- Priority Task Badges

## 📂 Project Structure

```txt
client/
│
├── src/
│   ├── components/
│   │   ├── ProtectedRoutes.jsx
│   │   ├── SkeletonLoader.jsx
│   │   ├── SortableTask.jsx
│   │   ├── TaskCard.jsx
│   │   ├── TaskFilters.jsx
│   │   ├── TaskInput.jsx
│   │   ├── TaskList.jsx
│   │   └── Toast.jsx
│   │
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── Task.jsx
│   │
│   ├── services/
│   │   └── taskService.js
│   │
│   ├── styles/
│   │   ├── auth.css
│   │   ├── global.css
│   │   └── tasks.css
│   │
│   ├── App.jsx
│   └── main.jsx
│
server/
│
├── middleware/
├── models/
├── routes/
├── .env
└── server.js
```

## ⚙️ Installation

### 1️⃣ Clone Repository

```bash
git clone https://github.com/Brandonp584/To-Do-List
```

### 2️⃣ Install Frontend Dependencies

```bash
cd client
npm install
```

### 3️⃣ Install Backend Dependencies

```bash
cd ../server
npm install
```

## 🔑 Environment Variables

Create a `.env` file inside `/server`

```env
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
PORT=5000
```

Create a `.env` file inside `/client`

```env
VITE_API_URL=http://localhost:5000
```

## ▶️ Run Locally

### Start Backend

```bash
cd server
npm run dev
```

### Start Frontend

```bash
cd client
npm run dev
```

## 🌐 Deployment

This project uses a separated deployment setup:

- Frontend deployed on Netlify
- Backend deployed on Render
- Database hosted on MongoDB Atlas

## 📱 Responsive Design

Built with a mobile-first workflow using progressive media queries.

- 📱 Mobile
- 📲 Tablet
- 💻 Desktop

## 🧩 Future Improvements

- Due Dates
- Search Functionality
- Light / Dark Mode Toggle
- User Profile Settings
- Task Categories
- Task Analytics Dashboard
- Real-Time Sync

## 📚 What I Learned

Through building this project I improved my skills in:

- Full-Stack MERN Architecture
- REST API Development
- Authentication & Authorization
- React State Management
- Component Refactoring
- Drag & Drop UI Architecture
- Drag & Drop State Managment
- Responsive UI Design
- Async JavaScript & API Handling
- UX/UI Polish Techniques
- MongoDB Data Modeling
- Service Layer Architecture
- Data Persistence Strategies

## 👨‍💻 Author

Frontend & Backend Developer for this project.

- GitHub: https://github.com/Brandonp584

## ⭐ License

This project is open source and available under the MIT License.