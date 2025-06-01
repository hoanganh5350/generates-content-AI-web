AI Content Generator

A project that generates social media content using AI and verifies phone numbers via SMS.

✨ Features

Generate captions based on social network, subject, and tone

Suggest post ideas by topic

Generate captions from an idea

Send OTP codes via Twilio SMS

Save captions selected by the user

🔧 Backend Setup

Navigate to the backend directory:

cd back-end

🚀 Installation

npm install

📄 Create .env file

PORT=3000
TWILIO_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE=+123456789
GEMINI_API_KEY=your_gemini_api_key

Also, add a Firebase service account key file:config/firebaseServiceAccountKey.json(Download it from your Firebase Console)

▶️ Run the server

npm run dev

🔧 Front-end Setup

# 1. Clone the project then
cd front-end

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

🌐 Environment Variables (.env)

VITE_API_URL=http://localhost:3000

Access in code via: import.meta.env.VITE_API_URL


Back-end:

📂 Project Structure

src/
├── controllers/         // API logic
├── routes/              // Route definitions
├── services/            // Firebase, Twilio, Gemini integrations
├── utils/               // Utility functions (e.g., access code generator)
├── app.ts               // Express app setup
├── index.ts             // Server entry point

📁 API Endpoints

🔐 Auth

POST /auth/create-code

Send OTP via SMSInput:

{ "phoneNumber": "+849xxxxxxxx" }

Output:

{ "accessCode": "123456" }

POST /auth/validate-code

Validate access codeInput:

{ "phoneNumber": "+849xxxxxxxx", "accessCode": "123456" }

Output:

{ "success": true }

🎨 Content

POST /content/generate-captions

Generate captions from subjectInput:

{ "socialNetwork": "Facebook", "subject": "food", "tone": "funny" }

Output:

["Caption 1", "Caption 2"]

POST /content/post-ideas

Suggest post ideas by topicInput:

{ "topic": "travel" }

Output:

["Idea 1", "Idea 2"]

POST /content/captions-from-idea

Generate captions from ideaInput:

{ "idea": "street food under $2" }

Output:

["Caption 1", "Caption 2"]

POST /content/save

Save generated captionsInput:

{
  "topic": "food",
  "data": ["Caption 1", "Caption 2"],
  "phoneNumber": "+849xxxxxxxx"
}

Output:

{ "success": true }

GET /content/user-contents?phone_number=+849xxxxxxxx

Get user-saved captionsOutput:

[
  {
    "id": "abc123",
    "topic": "food",
    "data": ["Caption 1", "Caption 2"],
    "phoneNumber": "+849xxxxxxxx",
    "createdAt": "2024-06-01T08:00:00Z"
  }
]

POST /content/unsave

Delete saved captionInput:

{ "captionId": "abc123" }

Output:

{ "success": true }


Front-end:

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
