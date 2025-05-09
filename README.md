# Full-Stack Application

A production-ready, full-stack application skeleton built with React.js (frontend), Node.js + Express (backend), and PostgreSQL as the database.

## Project Structure

The project is organized into two main directories:

- `frontend/`: React.js application built with Vite
- `backend/`: Node.js + Express application

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- PostgreSQL

### Installation

1. Clone the repository
2. Install dependencies for both frontend and backend:

```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Set up environment variables:
   - Create `.env` files in both frontend and backend directories based on the provided examples

### Running the Application

#### Backend

```bash
cd backend
npm run dev  # Starts the server with nodemon for development
```

The backend server will run on port 8080.

#### Frontend

```bash
cd frontend
npm run dev  # Starts the Vite development server
```

The frontend development server will run on the default Vite port.

## Features

- React.js with Vite for the frontend
- Material UI components
- Tailwind CSS for styling
- React Router for client-side routing
- React Hook Form for form handling
- Node.js with Express for the backend
- PostgreSQL database integration
- Winston logging with daily rotation
