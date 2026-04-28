# SD URL Shortener

A simple Node.js URL-shortening app with user authentication, MongoDB persistence, and session-based access control.

## Features

- User signup and login
- URL shortening with optional custom short IDs
- Redirect short URLs to original destinations
- URL listing for authenticated users
- Visit tracking via `visitHistory`

## Tech stack

- Node.js
- Express
- MongoDB / Mongoose
- EJS templates
- bcrypt for password hashing
- express-session for user sessions
- shortid for generated short IDs

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file in the project root with:
   ```env
   MONGO_URL=mongodb://localhost:27017/sd_url
   PORT=3000
   ```
3. Start the app:
   ```bash
   npm start
   ```

## Usage

- Open `http://localhost:3000/auth/signup` to create a new account
- Open `http://localhost:3000/auth/login` to sign in
- After login, go to `http://localhost:3000/url` to view and create short URLs
- Visit any generated short URL at `http://localhost:3000/<shortId>` to redirect

## Routes

- `GET /` - health check / server running
- `GET /auth/signup` - signup page
- `POST /auth/signup` - register a new user
- `GET /auth/login` - login page
- `POST /auth/login` - authenticate user
- `GET /auth/logout` - logout user
- `GET /url` - show all URLs (authenticated only)
- `POST /url` - create a new short URL (authenticated only)
- `GET /:shortId` - redirect to the original URL

## Project structure

- `app.js` - main application setup
- `routes/` - route definitions for authentication and URL handling
- `controllers/` - business logic for auth and URL features
- `models/` - MongoDB schemas for `User` and `URL`
- `views/` - EJS templates for pages
- `middlewares/` - session-based auth middleware

## Notes

- `node_modules/` should be ignored by Git via `.gitignore`
- `nodemon` is used for development auto-reload
