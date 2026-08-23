# 💬 Answerly — Question Answer Forum

> A community-driven learning platform where students can ask questions,
> share answers, discuss concepts, and exchange real-world viva experiences.

![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue)
![React](https://img.shields.io/badge/Frontend-React.js-61DAFB)
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933)
![Express.js](https://img.shields.io/badge/API-Express.js-000000)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248)
![MongoDB Atlas](https://img.shields.io/badge/Cloud-MongoDB%20Atlas-47A248)
![Selenium](https://img.shields.io/badge/Testing-Selenium-43B02A)

---

## 🚀 Overview

**Answerly** is a web-based Question & Answer platform designed primarily
for students and learners.

The idea is simple:

> **Ask → Answer → Discuss → Learn**

Instead of searching across multiple sources for solutions to academic
questions, users can post their doubts and receive answers from other
members of the community.

The platform also introduces a dedicated **Viva Experience** feature,
where students can share their viva experiences and preparation insights
through blogs.

The project was developed as part of the **Advanced Technologies (CE-520)**
course during the 5th semester of B.Tech Computer Engineering.

---

## ✨ Key Features

### 👤 User Management

- User Sign Up
- User Login
- User Profile
- User contribution / credit points
- Top-user concept

### ❓ Question Management

- Post questions
- Edit questions
- View available questions
- Comment on questions
- Like / dislike questions
- Display question contributors

### 💡 Answer Management

- Post answers to questions
- Edit answers
- Comment on answers
- Display answer contributors
- Like / dislike functionality as specified by the system design

### 📝 Viva Experience

Students can share their previous viva experiences through blogs,
helping other students prepare for upcoming viva examinations.

- Create viva blogs
- Edit blogs
- Comment on blogs
- Like / dislike blogs

### 🏆 Community & Engagement

- Voting system
- Comments and discussions
- Contribution-based credit points
- User profiles
- Community-driven knowledge sharing

---

## 🏗️ System Architecture

Answerly follows a **MERN-based web application architecture**.

```text
                    ┌──────────────────────┐
                    │       User           │
                    │  Browser / Mobile    │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │    React.js UI       │
                    │      Frontend        │
                    └──────────┬───────────┘
                               │
                         HTTP / HTTPS
                               │
                               ▼
                    ┌──────────────────────┐
                    │     Node.js +        │
                    │     Express.js       │
                    │      Backend         │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │      MongoDB         │
                    │     Database         │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │    MongoDB Atlas     │
                    │    Cloud Database    │
                    └──────────────────────┘