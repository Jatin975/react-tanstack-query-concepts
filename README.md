# ⚛️ Events App – React + TanStack Query + Express Backend

A **frontend-focused Events Management Application** built using **React (Vite)** and **TanStack Query (React Query)**, showcasing modern, scalable data-fetching patterns using `useQuery`, `useMutation`, and deep integration with **React Router v6**.
The backend is a simple **Express.js server** acting as a mock API to demonstrate full **CRUD operations** — *not the focus of this project*.

---

## 📁 Project Structure

- **root/**
  - **backend/**
    - `app.js` — Express backend entry point
  - **src/** — React frontend source
  - **public/** — Static assets

## 🚀 Getting Started

### 1. Start the Backend Server

```bash
cd backend
npm install
npm start
```
This starts the Express backend server.
### 2. Start the Frontend React App

```bash
npm install
npm run dev
```
This starts the frontend React app.


## 📡 API Endpoints (Mock Backend)

- `GET /events` – Fetch all events (supports `?max` and `?search`)
- `GET /events/:id` – Fetch event by ID
- `POST /events` – Create a new event
- `PUT /events/:id` – Update an event
- `DELETE /events/:id` – Delete an event

## 🎯 Features

- 🔍 **Search for events**
- 📋 **View event details**
- ➕ **Create new events**
- ✏️ **Edit existing events**
- ❌ **Delete events**

All operations are performed via **REST API** calls and handled elegantly using **TanStack Query** hooks, with automatic caching, invalidation, and revalidation.


## 🛠️ Technologies Used

- **React (Vite)** – Fast frontend dev experience
- **TanStack Query** – `useQuery`, `useMutation`, query cache & lifecycle
- **React Router v6** – Route-based loaders and actions
- **Express.js (Mock)** – Minimal server for CRUD API (no DB)
- **File-based JSON storage** – Backend persists data to local files


## 💡 Why TanStack Query?

- ✅ **Smart caching** – reduces redundant fetches
- ✅ **Auto-refetching** – data stays fresh on tab focus / reconnect
- ✅ **Error & loading states** – handled out-of-the-box
- ✅ **Mutations with optimistic updates** – easy form handling
- ✅ **Cleanly integrates with React Router v6** loaders/actions


## 🔍 Focus Area

📌 This project is primarily a showcase of **advanced client-side data handling** using **TanStack Query** in a real-world **React app setup**.  
The backend is intentionally simple and **file-based**, created to support frontend interaction and **API exploration**.

## Screenshots
**Home Page** ![image](https://github.com/user-attachments/assets/2b81423f-ac84-4745-94b1-750147742a19)

Event Details Page ![image](https://github.com/user-attachments/assets/b02f569b-fcbd-459c-8f7c-0043830281a8)

Edit/Create Event  ![image](https://github.com/user-attachments/assets/59c52a7c-c691-4bb0-b934-c0ed04c2528d)

Delete event ![image](https://github.com/user-attachments/assets/91421771-d2f2-4c9d-83dd-a19409d7e0be)



