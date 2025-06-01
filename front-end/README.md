A ReactJS project using Vite, SCSS, Redux Toolkit, React Router, structured with a feature-based architecture, making it highly scalable and maintainable.

📁 Project Structure

my-app/
├── public/
│   └── index.html
├── src/
│   ├── assets/             # Images, icons, fonts, etc.
│   ├── components/         # Reusable UI components (Button, Modal, ...)
│   ├── features/           # Each feature is a module (feature-based pattern)
│   │   └── auth/
│   │       └── authSlice.js    # Redux slice or feature logic
│   ├── hooks/              # Custom reusable hooks (useAuth, useFetch, ...)
│   ├── layouts/            # Main layout components (AdminLayout, AuthLayout, ...)
│   ├── pages/              # Route-mapped pages (Home, About, ...)
│   ├── routes/             # Route definitions (react-router-dom)
│   ├── services/           # API requests (axios instance, service layer)
│   ├── store/              # Redux store or Zustand, Recoil, etc.
│   ├── styles/             # SCSS variables, global styles, theme, ...
│   ├── utils/              # Utility functions (formatDate, validateEmail, ...)
│   ├── App.jsx             # Root component of the app
│   └── main.jsx            # Entry point (ReactDOM.createRoot)
├── .env                    # Environment variables (e.g., VITE_API_URL)
├── package.json
└── vite.config.js          # Vite configuration

🔧 Setup

# 1. Clone the project then
cd front-end

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

🌐 Environment Variables (.env)

VITE_API_URL=http://localhost:3000

Access in code via: import.meta.env.VITE_API_URL

📦 Dependencies

Technology

Description

React 18

UI library

Vite

Fast dev server & bundler

React Router DOM

Routing system

Redux Toolkit

Feature-based state management

Axios

API request handling

SCSS

Styling with variables, nesting, etc.

Ant Design (opt.)

UI Component Library (if used)

🛠️ Redux Store Setup (src/store/index.js)

import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

🧪 Production Build

npm run build
npm run preview

📜 Scripts

Command

Description

npm run dev

Start dev server

npm run build

Build for production

npm run preview

Preview production build

📌 Notes

Follows feature-based architecture: each feature is isolated and scalable.

Easy to extend with i18n, unit tests, authentication, SSR, etc.