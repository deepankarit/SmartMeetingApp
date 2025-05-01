# Smart Meeting Assistant App

An AI-powered mobile app that lets users create, summarize, and manage meeting notes!

## 📱 Tech Stack

- React Native + TypeScript (Frontend)
- Spring Boot + PostgreSQL (Backend)
- OpenAI GPT-4 API (Meeting Summarization)
- JWT Authentication
- Axios for API handling
- React Navigation

## 🚀 Features

- User Registration and Login
- Secure JWT token authentication
- Create new Meetings (Title, Notes, Time, Participants)
- AI-powered Meeting Summarization
- Meeting List with refresh
- Auto-login session handling
- Mobile-first responsive design

## 🏗 Architecture

- Backend: REST API using Spring Boot + PostgreSQL
- Frontend: Clean architecture with React Native + Context API
- AI Integration: OpenAI Chat Completions API

## ⚙ Setup Instructions

### Backend (Spring Boot)

1. Clone backend repository.
2. Create PostgreSQL database (e.g., `smartmeetingdb`).
3. Update `application.properties` for database connection.
4. Run Spring Boot app (`mvn spring-boot:run`).
5. Ensure it's running on `http://localhost:8080/api`.

### Frontend (React Native)

1. Clone frontend repository.
2. Install dependencies: `npm install`
3. Set Axios baseURL to `http://10.0.2.2:8080/api` for Android emulator.
4. Run metro: `npm start -- --reset-cache`
5. Run app:
   - Android: `npm run android`
   - iOS: `npm run ios`

## ✨ Future Improvements

- Admin Panel
- Invite Participants via Email
- Add Push Notifications
- Offline Caching Support

---

# 📢 Contact

Built by Dipanakr Baghel. Available for collaboration opportunities!
