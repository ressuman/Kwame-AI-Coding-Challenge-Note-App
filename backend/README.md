# Notes API

RESTful API for note management built with Express.js and MongoDB. A lightweight Notes API built with Express.js and MongoDB (Mongoose).
Author: Richard Essuman — <ressuman001@gmail.com>

## Features

- Create notes with unique titles
- List all notes with pagination
- Get single note by ID
- Update notes (auto-saves changes)
- Delete notes
- Created/updated timestamps
- Validation with Zod + Mongoose
- OpenAPI (Swagger) documentation at `/api-docs`
- Error handling for duplicate titles

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Validation**: Zod
- **Logging**: Morgan
- **Security**: Helmet, CORS

## Installation

1. Clone repository:

```bash
git clone https://github.com/yourusername/notes-api.git
cd notes-api
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file:

```env
PORT=4550
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
CORS_ORIGIN=http://localhost:5173
```

4. Start server:

```bash
npm run dev  # Development
npm start    # Production
```

## API Endpoints

| Method | Endpoint          | Description                |
| ------ | ----------------- | -------------------------- |
| GET    | /api/v1/notes     | List all notes (paginated) |
| POST   | /api/v1/notes     | Create new note            |
| GET    | /api/v1/notes/:id | Get single note            |
| PATCH  | /api/v1/notes/:id | Update note                |
| DELETE | /api/v1/notes/:id | Delete note                |
| GET    | /api/v1/health    | API health check           |

## Open the API

- Root: GET <http://localhost:4550/api>

- Health: GET <http://localhost:4550/api/v1/health>

- Swagger UI: <http://localhost:4550/api-docs>

## API Endpoints (summary)

- GET /api — root

- GET /api/v1/health — healthcheck

- GET /api/v1/notes — list notes (query: page, limit, sort)

- GET /api/v1/notes/:id — fetch single note

- POST /api/v1/notes — create note { title, body }

- PATCH /api/v1/notes/:id — update note (supports autosave)

- DELETE /api/v1/notes/:id — delete note

## Validation Rules

- **Title**: 1-100 characters (unique)
- **Body**: 1-10,000 characters

## Error Handling

- `400 Bad Request`: Validation errors
- `404 Not Found`: Resource not found
- `409 Conflict`: Duplicate title
- `500 Internal Server Error`: Unexpected errors

## Documentation

Swagger UI available at `/api-docs` when running locally

### 3. Challenge Requirements Compliance

Your backend fully satisfies all requirements:

1. **Database Operations** ✅
   All CRUD operations use MongoDB through backend API routes

2. **Unique Titles** ✅
   Implemented with MongoDB unique index (case-insensitive) and proper error handling (409 Conflict)

3. **Timestamps** ✅
   Mongoose `timestamps: true` automatically adds `createdAt` and `updatedAt`

4. **Auto-saving Updates** ✅
   PATCH endpoint supports partial updates (works with debounced frontend requests)

5. **No Authentication** ✅
   All endpoints are open as specified

6. **Error Handling** ✅
   Custom error handler with:

   - 400 for validation errors
   - 404 for not found
   - 409 for duplicate titles
   - 500 for server errors

7. Implement frontend with React.js using these endpoints:
   - `GET /notes` → Note listing
   - `POST /notes` → Create note
   - `PATCH /notes/:id` → Update note
   - `DELETE /notes/:id` → Delete note
