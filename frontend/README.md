# Notes App - Frontend

A modern note-taking application built with React.js v19, TypeScript, and Tailwind CSS v4. This frontend connects to a RESTful API backend for full CRUD operations on notes.

![Notes App Screenshot](<./public/Screenshot%20(125).png>) <!-- Add your screenshot path here -->

## Features

- **Create Notes**: Add new notes with titles and content
- **Edit Notes**: Update existing notes with auto-save functionality
- **Delete Notes**: Remove notes with confirmation
- **Search**: Find notes by title or content
- **Responsive Design**: Works on all device sizes
- **Real-time Updates**: Optimistic UI updates for smooth user experience
- **Error Handling**: Clear error messages and toast notifications
- **Loading States**: Visual feedback during API operations

## Technologies Used

- **React.js v19**: Frontend library for building user interfaces
- **TypeScript**: Static typing for JavaScript
- **Tailwind CSS v4**: Utility-first CSS framework
- **React Router**: Client-side routing
- **React Toastify**: Toast notifications
- **Axios**: HTTP client for API requests
- **Lucide React**: Beautiful & consistent icons
- **Vite**: Next-generation frontend tooling

## Project Structure

````

src/
├── components/
│ ├── common/ # Reusable UI components
│ ├── notes/ # Note-related components
│ └── layout/ # Layout components
├── hooks/ # Custom React hooks
├── types/ # TypeScript type definitions
├── utils/ # Utility functions and constants
├── App.tsx # Main application component
└── main.tsx # Application entry point



## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Backend API server running (see backend documentation)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/notes-app-frontend.git
   cd notes-app-frontend
````

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:

   ```env
   VITE_API_BASE_URL=http://localhost:4550/api/v1
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser to `http://localhost:5173`

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build locally
- `npm run lint`: Run ESLint
- `npm run format`: Format code with Prettier

## API Integration

The frontend communicates with the following API endpoints:

| Method | Endpoint     | Description       |
| ------ | ------------ | ----------------- |
| GET    | `/notes`     | Get all notes     |
| POST   | `/notes`     | Create a new note |
| PATCH  | `/notes/:id` | Update a note     |
| DELETE | `/notes/:id` | Delete a note     |

## Key Implementation Details

### Auto-Save Functionality

Notes automatically save as you type, with a 1-second debounce to prevent excessive API calls.

### Optimistic UI Updates

The app uses React's `useOptimistic` hook to provide immediate feedback when creating, updating, or deleting notes.

### Error Handling

Comprehensive error handling with:

- Form validation errors
- API error responses
- Toast notifications for user feedback

### Responsive Design

Fully responsive layout using Tailwind CSS's responsive utility classes.

## Deployment

### Vercel

1. Install Vercel CLI:

   ```bash
   npm install -g vercel
   ```

2. Deploy:

   ```bash
   vercel
   ```

### Netlify

1. Install Netlify CLI:

   ```bash
   npm install -g netlify-cli
   ```

2. Deploy:

   ```bash
   netlify deploy
   ```

## Environment Variables

| Variable          | Description               | Default Value                  |
| ----------------- | ------------------------- | ------------------------------ |
| VITE_API_BASE_URL | Base URL for API requests | <http://localhost:4550/api/v1> |

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

````

This README includes:

1. **Project Overview**: Brief description and features
2. **Technology Stack**: All major technologies used
3. **Project Structure**: Directory layout explanation
4. **Installation Guide**: Step-by-step setup instructions
5. **API Documentation**: Endpoints used
6. **Key Features**: Implementation details
7. **Deployment Instructions**: For popular platforms
8. **Environment Variables**: Configuration options
9. **Contributing Guidelines**: For open-source collaboration
10. **License and Contact Info**

You can customize this further by:
- Adding screenshots or GIFs
- Including a demo link
- Adding badges for build status, test coverage, etc.
- Expanding the API documentation section
- Adding a "Roadmap" section for future features


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
````

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
