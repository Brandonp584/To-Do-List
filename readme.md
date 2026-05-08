# 🚀 Full Stack Task Manager

A modern full-stack task management application built with the MERN stack. It includes secure authentication, protected routes, responsive UI, inline task editing, skeleton loading states, toast notifications, and a polished SaaS-style user experience.

## ✨ Features

### 🔐 Authentication

- User registration & Login
- JWT authentication
- Protected routes
- Persistent sessions with localStorage
- Show / Hide password toggle

### ✅ Task Mangement

- Create Tasks
- Delete Tasks
- Mark tasks complete/incomplete
- Inline task editing
- Filter tasks by:
    - All
    - Active
    - Complete

### 🎨 UX/UI

- Responsive mobile-first design
- Skeleton Loading states
- Toast Notifications
- Smooth animation & micro-interactions
- Mobile / Desktop / Tablet breakpoints

### 🧠 Developer features

- Component-based architecture
- Resusable React components
- Organized folder structure
- REST API backend
- MongoDB database integration

## 🛠 Tech Stack

### Frontend:
- React
- React Router
- CSS3
- React Icons
- Vite

### Backend:
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs

### 📸 Screenshots

- Adding Later:
- Examples:
- Login Page:
- Register Page:
- Task Dashboard:
- Mobile responsive view:

### 📂 Project Structure
```
client/
│
├── src/
│   ├── components/
│   │   ├── ProtectRoutes.jsx
│   │   ├── SkeletonLoader.jsx
│   │   ├── TaskCard.jsx
│   │   ├── TaskFilters.jsx
│   │   ├── TaskInput.jsx
│   │   └── Toast.jsx
│   │
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── Tasks.jsx
│   │
│   ├── styles/
│   │   ├── auth.css
│   │   └── tasks.css
│   │
│   └── App.jsx
│
server/
│
├── routes/
├── middleware/
├── models/
├── .env
└── server.js
```

### ⚙️ Installation
- 1: Clone Repository
Git Clone https://github.com/Brandonp584/To-Do-List

- 2: Install Frontend Dependencies
```
cd client
npm install
```

- 3: Install Backend Depenedenices
```
cd ../server
npm install
```

### 🔑 Environment Variables

- Create a .env file inside /server
```
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
PORT=5000
```
### ▶️ Run Locally
- Start Backend:
```
cd server
npm run dev
```

- Start Frontend
```
cd client
npm run dev
```
### 🌐 Deployment

- This Project uses a separted deployment setup:

- The React Frontend is deployed on netlify.
- The Node/Express backend is deployed on Render.

- MongoDB Atlas is ude for the cloud database.

### 📱 Responsive Design

- 📱 Mobile
- 📲 Tablet
- 💻 Desktop

Built using a mobile-first worklow with progressive media queries.

### 🧩 Future Improvements

- Drag & Drop Tasks
- Due Dates
- Task Priorities
- Serach Functionality
- Light/Dark Mode Toggle
- User Profile Settings

### 📚 What I learned

Through Building this project I improved my skills in:

- Full-Stack application architecture
- REST API Development
- Authentication & Authorization
- State Management in React
- Responsive UI Design
- Component Refacting
- Async JavaScript & API handling
- UX/UI polish techniques

### Author

Frontend and Backend developer for this project.

- GitHub: [Brandon]https://github.com/Brandonp584

### ⭐ Licence

This project is open source and available under the MIT Licence.