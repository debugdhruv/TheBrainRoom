# 🧠 The Brain Room

**Your AI-Powered Mental Health Companion**  
A full-stack web application that helps users track moods, access well-being tools, and chat with an intelligent AI bot — all crafted with a clean, modern UI and thoughtful UX.

---

## 🌟 Features

- ✅ **Daily Mood Check** — Track how you feel with 5 simple questions, scored and visualized beautifully.
- ✅ **Mood Report Visualization** — Personalized mood score with dynamic feedback and suggestions.
- ✅ **Interactive Mood Chart** — View your mental wellness trend over the past week or month.
- ✅ **Brain Bot Chat** — An OpenAI-powered chatbot that understands your mood and responds with empathy.
- ✅ **Suggestion Cards** — AI-generated tips, exercises, and YouTube videos based on your mental state.
- ✅ **Gamified XP System** — Earn XP for self-care tasks and unlock new areas.
- ✅ **Premium Access** — Unlock special tools & features after reaching 2000 XP.
- ✅ **Auth & Security** — Login/register with email, OTP verification, password reset via OTP, token auth.
- ✅ **Responsive Design** — Fully mobile-optimized, smooth interactions on all devices.

---

## 🛠️ Tech Stack

### **Frontend**  
- **React.js** + **Vite**
- **TailwindCSS** (UI styling)  
- **ShadCN/UI** (components)  
- **Recharts** (mood chart)
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

- **OpenAI GPT-4o** model (via API)
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

## 🧩 Folder Structure (Frontend)

src/
├── assets/           # Icons and images
├── components/       # UI components
├── context/          # Global state (User, XP, Loader)
├── pages/            # Pages like MoodCheck, BotChat, Dashboard
├── services/         # API and logic files
├── utils/            # Helper functions

---

## 🤝 Contributing

This project is currently a solo build by **Dhruv**, but I’m open to feedback, contributions, or collaboration ideas!

---

## 📫 Contact

- 📧 Email: [your-email@example.com]
- 💬 WhatsApp: [+91 7974914363]
- 🔗 [LinkedIn](https://www.linkedin.com/in/your-link/)
- 📷 [Instagram](https://www.instagram.com/your-handle)

---

## 🚀 Live Demo

👉 [The Brain Room](https://thebrainroom.vercel.app/)

---

## 🧾 License

This project is for educational and demo purposes. All rights reserved © Dhruv.

---

## 🛡️ Note

Some parts of the source code are protected to prevent unauthorized use. Reach out if you're genuinely interested in exploring the internals!