# Game Explorer – RAWG API

A modern game discovery web application built with **React**, **TypeScript**, and **TanStack Query** using the **RAWG Video Games Database API**.  
The application allows users to browse games, search with debouncing, view detailed game information, and load data efficiently with pagination and caching.

---

## Live Demo

## https://game-weld-seven.vercel.app/games

## Features

- Browse popular and trending games
- Search games with debounced input
- View detailed game information:
  - Game description
  - Screenshots
  - Ratings
  - Release date
  - Platforms
- Infinite scrolling and pagination
- API data caching and background refetching
- Optimized API calls using Axios
- Clean and scalable project structure
- Fully typed with TypeScript

---

## Tech Stack

- React
- TypeScript
- Vite
- TanStack Query (React Query)
- Axios
- RAWG Video Games Database API
- Tailwind CSS
- React Router

---

## Data Fetching & State Management

TanStack Query is used for:

- Data caching
- Background refetching
- Pagination and infinite scrolling
- Avoiding unnecessary API calls

Debouncing is applied to the search input to prevent excessive requests.

Separate custom hooks handle:

- Game list fetching
- Single game details
- Game screenshots

---

## Environment Variables

Create a `.env` file in the root directory and add:

VITE_RAWG_API_KEY=your_rawg_api_key

You can generate an API key from the RAWG website.

---

## Installation & Setup

Clone the repository:

git clone https://github.com/your-username/your-repo-name.git

Navigate to the project directory:

cd your-repo-name

Install dependencies:

npm install

Add environment variables:

VITE_RAWG_API_KEY=your_api_key

Start the development server:

npm run dev

---

## API Used

RAWG Video Games Database API  
Provides data for games, screenshots, ratings, platforms, and more.

---

## Key Learnings

- Building scalable React applications using TypeScript
- Efficient API handling with TanStack Query
- Implementing debounced search
- Managing infinite scrolling and pagination
- Structuring a real-world React project
- Separating API logic from UI components

---

## Future Enhancements

- Game filters by genre and platform
- User authentication
- Favorites and bookmarks
- Dark and light theme persistence
- SEO optimization
