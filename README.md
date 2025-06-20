# TanStack Query + Express Backend

This is a full-stack web application using **React (Vite)** on the frontend and **Express.js** on the backend. It showcases modern best practices for data fetching using **TanStack Query** (React Query), with automatic caching, refetching, and integration with React Router loaders and actions.

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

## Key Concepts Used
- **TanStack Query (React Query)**
  - `useQuery` for fetching and caching **GET** requests (using a unique `queryKey`)
    - Automatically refetches when the tab gains focus  
  - `useMutation` for sending **POST/PUT/DELETE** requests  
  - Eliminates the need for manual `useState` for `loading`, `error`, or `data`  
  - Integrated seamlessly with **React Router** loaders and actions  

- **React Router v6**
  - Used for route-based data fetching and form actions  

- **Express.js**
  - Serves a simple REST API for the React frontend
  
## 💡 Why TanStack Query?

- ✅ Smart caching – avoids redundant network calls  
- ✅ Auto refetching – keeps data fresh on tab focus or reconnect  
- ✅ Simplified state – no manual loading, error, or data state management  
- ✅ Clean integration with React Router loaders and actions

## Screenshots
Home Page ![image](https://github.com/user-attachments/assets/2b81423f-ac84-4745-94b1-750147742a19)

### Error State
![Error State](public/screenshots/error.png)

