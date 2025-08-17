# Full-Stack Notes Application

![Notes App Screenshot](<./image/Screenshot%20(125).png>) <!-- Add your screenshot path here -->

A complete note-taking application with React.js frontend and Express.js backend. This full-stack solution allows users to create, read, update, and delete notes with real-time updates and robust error handling.

## Table of Contents

- [Full-Stack Notes Application](#full-stack-notes-application)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
    - [Frontend](#frontend)
    - [Backend](#backend)
  - [Technologies](#technologies)
    - [Frontend](#frontend-1)
    - [Backend](#backend-1)
  - [Project Structure](#project-structure)
    - [Frontend](#frontend-2)
    - [Backend](#backend-2)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
      - [Backend](#backend-3)
      - [Frontend](#frontend-3)
    - [Running the Application](#running-the-application)
  - [API Documentation](#api-documentation)
    - [Endpoints](#endpoints)
    - [Validation Rules](#validation-rules)
    - [Error Responses](#error-responses)
  - [Key Features](#key-features)
    - [Frontend](#frontend-4)
    - [Backend](#backend-4)
  - [Deployment](#deployment)
    - [Backend](#backend-5)
    - [Frontend](#frontend-5)
  - [Environment Variables](#environment-variables)
    - [Backend](#backend-6)
    - [Frontend](#frontend-6)
  - [Contributing](#contributing)

## Features

### Frontend

- **Create Notes**: Add new notes with titles and content
- **Edit Notes**: Update existing notes with auto-save functionality
- **Delete Notes**: Remove notes with confirmation
- **Search**: Find notes by title or content
- **Responsive Design**: Works on all device sizes
- **Real-time Updates**: Optimistic UI updates for smooth user experience
- **Error Handling**: Clear error messages and toast notifications
- **Loading States**: Visual feedback during API operations

### Backend

- **RESTful API**: Full CRUD operations for notes
- **Unique Titles**: Prevent duplicate note titles
- **Auto-saving**: Support for real-time updates
- **Timestamps**: Automatic created/updated tracking
- **Validation**: Robust input validation with Zod
- **Pagination**: Efficient note listing
- **Swagger Docs**: Interactive API documentation
- **Error Handling**: Comprehensive error responses

## Technologies

### Frontend

- **React.js v19**: Frontend library for building user interfaces
- **TypeScript**: Static typing for JavaScript
- **Tailwind CSS v4**: Utility-first CSS framework
- **React Router**: Client-side routing
- **React Toastify**: Toast notifications
- **Axios**: HTTP client for API requests
- **Lucide React**: Beautiful & consistent icons
- **Vite**: Next-generation frontend tooling

### Backend

- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **Zod**: Schema validation
- **Helmet**: Security middleware
- **Morgan**: HTTP request logger
- **Swagger UI**: API documentation

## Project Structure

### Frontend

```
notes-app-frontend/
├── src/
│   ├── components/
│   │   ├── common/          # Reusable UI components
│   │   ├── notes/           # Note-related components
│   │   └── layout/          # Layout components
│   ├── hooks/               # Custom React hooks
│   ├── types/               # TypeScript type definitions
│   ├── utils/               # Utility functions and constants
│   ├── App.tsx              # Main application component
│   └── main.tsx             # Application entry point
```

### Backend

```
notes-api/
├── src/
│   ├── config/              # Configuration files
│   ├── controllers/         # Route controllers
│   ├── middlewares/         # Express middlewares
│   ├── models/              # Mongoose models
│   ├── routes/              # API routes
│   ├── services/            # Business logic
│   ├── utils/               # Utility functions
│   ├── app.js               # Express application
│   └── server.js            # Server entry point
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- MongoDB (local or cloud instance)

### Installation

#### Backend

1. Clone the backend repository:

   ```bash
   git clone https://github.com/your-username/notes-api.git
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

#### Frontend

1. Clone the frontend repository:

   ```bash
   git clone https://github.com/your-username/notes-app-frontend.git
   cd notes-app-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create `.env` file:

   ```env
   VITE_API_BASE_URL=http://localhost:4550/api/v1
   ```

### Running the Application

1. Start the backend server:

   ```bash
   cd notes-api
   npm run dev
   ```

2. Start the frontend development server:

   ```bash
   cd ../notes-app-frontend
   npm run dev
   ```

3. Open your browser to `http://localhost:5173`

## API Documentation

The backend provides comprehensive API documentation via Swagger UI at `http://localhost:4550/api-docs` when running locally.

### Endpoints

| Method | Endpoint            | Description               |
| ------ | ------------------- | ------------------------- |
| GET    | `/api/v1/notes`     | Get all notes (paginated) |
| POST   | `/api/v1/notes`     | Create a new note         |
| GET    | `/api/v1/notes/:id` | Get single note by ID     |
| PATCH  | `/api/v1/notes/:id` | Update a note             |
| DELETE | `/api/v1/notes/:id` | Delete a note             |
| GET    | `/api/v1/health`    | API health check          |

### Validation Rules

- **Title**: 1-100 characters (unique)
- **Body**: 1-10,000 characters

### Error Responses

- `400 Bad Request`: Validation errors
- `404 Not Found`: Resource not found
- `409 Conflict`: Duplicate title
- `500 Internal Server Error`: Unexpected errors

## Key Features

### Frontend

- **Auto-Save Functionality**: Notes automatically save as you type, with a 1-second debounce to prevent excessive API calls
- **Optimistic UI Updates**: Uses React's `useOptimistic` hook for immediate feedback
- **Comprehensive Error Handling**: Form validation, API error responses, and toast notifications
- **Responsive Design**: Fully responsive layout using Tailwind CSS

### Backend

- **Case-Insensitive Unique Titles**: MongoDB unique index with collation
- **Automatic Timestamps**: Mongoose `timestamps` for created/updated fields
- **Debounced Updates**: Supports real-time editing with PATCH endpoint
- **Production-Ready**: Helmet for security, CORS configuration, and proper error handling

## Deployment

### Backend

1. Install Vercel CLI:

   ```bash
   npm install -g vercel
   ```

2. Deploy:

   ```bash
   vercel
   ```

### Frontend

1. Install Vercel CLI:

   ```bash
   npm install -g vercel
   ```

2. Deploy:

   ```bash
   vercel
   ```

## Environment Variables

### Backend

| Variable    | Description               | Default Value           |
| ----------- | ------------------------- | ----------------------- |
| PORT        | Server port               | 4550                    |
| NODE_ENV    | Runtime environment       | development             |
| MONGODB_URI | MongoDB connection string | (required)              |
| CORS_ORIGIN | Allowed CORS origin       | <http://localhost:5173> |

### Frontend

| Variable          | Description               | Default Value                  |
| ----------------- | ------------------------- | ------------------------------ |
| VITE_API_BASE_URL | Base URL for API requests | <http://localhost:4550/api/v1> |

## Contributing

1. Fork both the frontend and backend projects
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request for each repository
