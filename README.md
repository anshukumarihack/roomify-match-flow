# 🏡 Roommate Compatibility Scorer App - roomify-match-flow

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-completed-green)
![Made with](https://img.shields.io/badge/built_with-Next.js,_Supabase,_TypeScript,-informational)

> A modern rule-based web app that evaluates how compatible two roommates are based on preferences and lifestyle. Built with SaaS features and dual admin/user dashboards.

---

## 🔍 Overview

The app matches users based on:

- Sleep Time  
- Cleanliness  
- Work Schedule  
- Food Habits  
- Personality Traits  

Built for **individual users** seeking compatibility and **admins** managing match records.

---
## 🔗 Live Demo

👉 [View Live App] (#)https://roomify-match-flow.lovable.app/

---


## 🚀 Features

- 🔄 Habit-Based Matching Algorithm  
- 📊 Real-Time Habit Comparison & Scoring  
- ✨ Clean and Responsive UI with React + Tailwind + ShadCN  
- 📥 Import mock profiles and rank matches  
- 🔐 Password recovery support  
- ☁️ Hosted with [Lovable](https://lovable.app)

---

## 🧠 Scoring Logic

- **20 points** per exact match (e.g. both like "early" sleep)
- **10 points** for partial compatibility (e.g. "moderate" vs "high")
- Final score is normalized to a **0–100 scale**

---

## 🧭 User Flow

### 📌 User Journey from Login to Feedback:

![User Flow Diagram](./public/User-Flow-diagram.png)

> Users register → fill preferences → get scored → see matches → admins monitor.

---

## 💻 Tech Stack

- **Frontend**: Next.js + TypeScript + TailwindCSS
- **Backend**: Supabase (Auth + Database)
- **State Management**: React Context
- **Deployment**: Vercel / Netlify
- **Design Tools**: Figma, Napkin for flowcharts

---
## ❓ What technologies are used for this project?
-**This project is built with:**

-Vite

-TypeScript

-React

-Shadcn/ui

-Tailwind CSS

---
## 📂 How to Run Locally

Make sure you have **Node.js** and **npm** installed.

```bash
# Clone the repository
git clone https://github.com/<your-username>/habit-harmony-match

# Navigate to the project folder
cd habit-harmony-match

# Install dependencies
npm install

# Start development server
npm run dev
```

### 🧪 Example Input

```json
{
  "user1": {
    "sleep_time": "Early",
    "cleanliness": "Tidy",
    "work_schedule": "Day",
    "food_habits": "Vegetarian"
  },
  "user2": {
    "sleep_time": "Late",
    "cleanliness": "Messy",
    "work_schedule": "Night",
    "food_habits": "Non-Vegetarian"
  }
}
```

> **💡 Use your preferred IDE to work locally.**

---

## 📤 How can I deploy this project?

Simply open [Lovable](https://lovable.app) and click on:

```
Share → Publish
```

---



## 📁 Folder Structure
src/ ├── components/ # UI Components (e.g., MatchCard, UserProfile) ├── context/ # React Context for User and Admin state ├── pages/ # Next.js route pages (e.g., /login, /dashboard) ├── services/ # Supabase API services for auth and data handling ├── utils/ # Compatibility scoring logic and helper functions ├── styles/ # TailwindCSS config and global styles

## 🧩 Future Ideas

- ✅ **Premium Match Filters**  
  Enable advanced filtering for premium users (e.g., lifestyle tags, distance, study/work habits).

- ✅ **Admin-User Separation**  
  Distinct dashboards and privileges for admins and regular users with role-based access control.

- 🔄 **AI/ML-Based Scoring**  
  Enhance compatibility logic with machine learning based on feedback and behavioral data.

- 📨 **In-App Messaging**  
  Allow users to securely chat with matched roommates within the app.

- 🎨 **Dark/Light Mode Toggle**  
  Add a UI toggle for modern aesthetic and accessibility.

- 📱 **PWA Support**  
  Make the app installable on mobile and desktop for offline access and better user experience.
