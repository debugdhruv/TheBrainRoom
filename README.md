# 🧠 The Brain Room

**Your AI-Powered Mental Health Companion**  
A full-stack web application that helps users track moods, access well-being tools, and chat with an intelligent AI bot — all crafted with a clean, modern UI and thoughtful UX.

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

the-brain-room/
├── backend/
│   ├── config/           # DB connection and app configs
│   ├── controllers/      # Route logic (e.g. moodController.js)
│   ├── middleware/       # Auth, error handlers
│   ├── models/           # Mongoose schemas (e.g. MoodLog.js, User.js)
│   ├── routes/           # All API endpoints
│   ├── services/         # OTP service, utils
│   ├── server.js         # Entry point for Express server
│   └── package.json      # Backend dependencies & scripts

├── frontend/
│   ├── src/
│   │   ├── assets/       # Icons, illustrations
│   │   ├── components/   # Reusable UI components
│   │   ├── context/      # React Context API files (XP, User, Loader)
│   │   ├── hooks/        # Custom React hooks
│   │   ├── pages/        # Main app pages (MoodCheck, BotChat, Dashboard etc.)
│   │   ├── services/     # API calls, OTP logic, XP service etc.
│   │   ├── App.jsx       # App routing
│   │   └── main.jsx      # Vite entry point
│   ├── index.html        # Root HTML template
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json      # Frontend dependencies & scripts

├── README.md             # Project overview, docs
├── LICENSE               # License info
└── .gitignore            # Files to ignore during version control
---

## 🤝 Contributing

This project is currently a solo build by **me**, but I’m open to feedback, contributions, or collaboration ideas!

---

## 📫 Contact

- 📧 Email: dhruvtiwari.1130@gmail.com
- 💬 WhatsApp: +91 7974914363
- 🔗 LinkedIn: https://www.linkedin.com/in/dhruvux/

---

## 🚀 Live Demo

👉 [The Brain Room](https://thebrainroom.vercel.app/)

---

## 🧾 License

This project is for educational and demo purposes. All rights reserved © Dhruv.

---

## 🛡️ Note

The source code is password protected and a private repo to prevent unauthorized use. Please be fair and think twice to your real self, "Do I really wanna copy paste the whole base or make my own?", and If you are just exploring and watching how I made it all, Yeah man it took me time haha.. 