# Notes API (Express + MongoDB)

A clean, professional backend for a notes app.

## Stack

- Node.js (ESM)
- Express 4
- MongoDB + Mongoose 8
- Zod for request validation
- Helmet, CORS, Morgan
- Centralized error handling

## Run

1. `cp .env.example .env` and set values
2. `npm install`
3. `npm run dev` (or `npm start`)

## API

- `GET    /api/notes` — list (pagination: `?page=1&limit=50&sort=-updatedAt`)
- `GET    /api/notes/:id` — get one
- `POST   /api/notes` — create `{ title, body? }` (unique title, case-insensitive)
- `PATCH  /api/notes/:id` — update partial (great for autosave)
- `DELETE /api/notes/:id` — delete

## Notes

- Unique title enforced with case-insensitive index.
- Errors standardized (409 for duplicate, 400 for validation, 404 not found).
