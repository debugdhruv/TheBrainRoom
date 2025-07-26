# 🧠 The Brain Room

**Your AI-Powered Mental Health Companion**  
A full-stack web application that helps users track moods, access well-being tools, and chat with an intelligent AI bot — all crafted with a clean, modern UI and thoughtful UX.

---

## 📚 Index

- [🌟 Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🧩 Folder Structure](#-folder-structure)
- [🧠 AI Integration](#-ai-integration)
- [🔒 Authentication Flow](#-authentication-flow)
- [📊 Mood Tracking Logic](#-mood-tracking-logic)
- [🚀 Live Demo](#-live-demo)
- [🔌 Setup Instructions](#-setup-instructions)
- [📫 Contact](#-contact)
- [🤝 Contributing](#-contributing)
- [🛡️ Note](#️-note)

---

## 🌟 Features

- ✅ **Daily Mood Check** — Track how you feel with 5 simple questions, scored and visualized beautifully.
- ✅ **Mood Report Visualization** — Personalized mood score with dynamic feedback and suggestions.
- ✅ **Interactive Mood Chart** — View your mental wellness trend over the past week or month.
- ✅ **Brain Bot Chat** — A DeepSeek-powered chatbot that understands your mood and responds with empathy.
- ✅ **Suggestion Cards** — AI-generated tips, exercises, and YouTube videos based on your mental state.
- ✅ **Gamified XP System** — Earn XP for certain tasks and unlock new areas.
- ✅ **Premium Access** — Unlock special tools & features after reaching 2000 XP.
- ✅ **Auth & Security** — Login/register with email, OTP verification, password reset via OTP, token auth.
- ✅ **Responsive Design** — Fully mobile-optimized, smooth interactions on all devices.
- ✅ **Edit Profile Details and Credentials** — Easily update the user specific details; Name, Date Of Birth, Age, Gender, Password.

---

## 🛠️ Tech Stack

### **Frontend**  
- **React.js** + **Vite**
- **TailwindCSS** (UI styling)  
- **ShadCN/UI** (components)  
- **Framer Motion** (animations)
- **React Router**  
- **Context API** for state  
- **Vercel** for deployment

### **Backend**  
- **Node.js + Express**
- **MongoDB** with **Mongoose**
- **JWT** for Auth
- **Custom OTP Service** (email-based verification & reset)
- **Render** for backend hosting

---

## 🧠 AI Integration

- **DeepSeek Chat v3** model (via API)
- Context-aware responses
- Custom system messages (e.g. mood data silently passed for relevant answers)

---

## 🔒 Authentication Flow

- Register/Login with secure password
- OTP email verification before first login
- Forgot Password? Reset with OTP
- Token-based protection for all private routes
- Conditional feature access (Premium unlock via XP)

---

## 📊 Mood Tracking Logic

- User answers 5 mood-related questions
- Each question has polarity & weight
- A weighted average generates the mood score
- Mood categories: Depressed, Anxious, Stressed, Neutral, Calm
- Chart updates in real-time via event-driven logic

---

## 🧩 Folder Structure

<pre>

the-brain-room/
├── backend/
│   ├── config/             # DB connection and app configs
│   ├── controllers/        # Route logic (e.g. moodController.js)
│   ├── middleware/         # Auth, error handlers
│   ├── models/             # Mongoose schemas (MoodLog.js, User.js)
│   ├── routes/             # All API endpoints
│   ├── services/           # OTP service, utilities
│   ├── server.js           # Express app entry point
│   └── package.json        # Backend dependencies & scripts
│
├── frontend/
│   ├── src/
│   │   ├── api/            # API request functions
│   │   ├── assets/         # Icons, logos, and illustrations
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # React Context (XP, User, Loader)
│   │   ├── lib/            # Custom libraries or middleware
│   │   ├── pages/          # Main app screens (MoodCheck, BotChat etc.)
│   │   ├── utils/          # Utility helper functions
│   │   ├── App.jsx         # Root app component
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx        # Vite entry point
│   ├── index.html          # HTML template
│   ├── tailwind.config.js  # Tailwind config
│   ├── vite.config.js      # Vite config
│   └── package.json        # Frontend dependencies
│
├── .gitignore              # Ignored files
├── LICENSE                 # License info
└── README.md               # Project overview & documentation

</pre>

---

## 🤝 Contributing

This project is currently a solo build by **me**, but I’m open to feedback, contributions, or collaboration ideas!

---

## 📫 Contact

- 📧 Email: dhruvtiwari.1130@gmail.com
- 🔗 LinkedIn: https://www.linkedin.com/in/dhruvux/
- 💬 WhatsApp: +91 7974914363

---

## 🚀 Live Demo

👉 [The Brain Room](https://thebrainroom.vercel.app/)

---

## 🔌 Setup Instructions

Follow this step-by-step guide to set up **The Brain Room** on your local machine and start contributing or exploring.

---

### 🔁 1. Clone the Repository

First, fork this repository to your GitHub account. Then open your terminal and run:

```bash
git clone https://github.com/debugdhruv/TheBrainRoom.git
cd TheBrainRoom
```
---

### 📦 2. Install Dependencies

Install all necessary packages for both the **backend** and the **frontend**.

#### 🔧 Backend

```bash
cd backend
npm install
```

#### 🎨 Frontend

```bash
cd ../frontend
npm install
```

---

### 🧪 3. Configure Environment Variables

You’ll need to set up `.env` files in both `backend/` and `frontend/` folders. These help manage sensitive data like DB URI, email password, API URLs, etc.

---

#### 📍 Backend `.env`

Create a file named `.env` inside the `/backend` directory:

```env
PORT = <Your Port where Backend is running>
MONGO_URI = your_mongodb_connection_string
JWT_SECRET = your_super_secret_key
OTP_EMAIL_USER = your_email@example.com
OTP_EMAIL_PASS = your_email_password_or_app_password
FRONTEND_URL=http://localhost:5173
PROTECTED_PASSWORD = your_pwd_for_site_access
OPENROUTER_API_KEY = your_api_key_of_OpenRouter
```

> ✅ You can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for free cloud DB hosting.  
> 📧 If using Gmail for OTP service:  
> - Enable **2-Step Verification**  
> - Generate an **App Password**  
> - Use that App Password as your `EMAIL_PASS`

---

#### 📍 Frontend `.env`

Create a file named `.env` inside the `/frontend` directory:

```env
VITE_APP_BASE_URL=http://localhost:5050
```

> 🌐 This points your frontend to the backend API during development.

---

### 🛢️ 4. Setup MongoDB (Skip this step, if you already made the DB and connected with URI in .env file)

If you're using MongoDB locally:

```bash
brew services start mongodb-community@6.0
```

> Or, use a **MongoDB Atlas URI** in your `MONGO_URI` to skip local setup altogether (recommended).

---

### 🚀 5. Run the App

Now you're ready to launch both servers.

#### 🖥️ Start the Backend Server

```bash
cd backend
npm run dev
```

> This will start the backend on [http://localhost:5050](http://localhost:5000)

#### 🖥️ Start the Frontend Dev Server

```bash
cd ../frontend
npm run dev
```

> This will start the frontend app on [http://localhost:5173](http://localhost:5173)

---

### 🏁 Final Tips

- This app uses `Vite` for blazing-fast frontend dev. Make sure you're using **Node.js 18+**.
- If anything fails, double-check:
  - MongoDB connection URI
  - Gmail SMTP credentials
  - Frontend `.env` pointing to correct backend URL

---

## 🧾 License

This project is for educational and demo purposes. All rights reserved © Dhruv.

---

## 🛡️ Note

The source code is password-protected to prevent misuse. So If you are here I am assuming with a fair reason. Be real with yourself — do you want to build your own or just copy-paste mine? 😄 If you’re just exploring how I built it, welcome aboard — it took effort, trust me!