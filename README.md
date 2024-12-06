# Todo App

This project was planned and created as an experiment using an AI agent (Claude) with minimal user input.

## Features

- Create tasks with title and description
- Mark tasks as complete/incomplete
- Edit existing tasks
- Delete tasks
- Sort by completion status and creation date
- Offline-first with local storage
- Responsive design

## Tech Stack

- TypeScript
- React
- Vite
- Tailwind CSS

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── components/       # React components
├── hooks/           # Custom hooks
├── lib/            # Utilities and services
└── types.ts        # TypeScript interfaces
```

## Implementation Details

- Uses local storage for data persistence
- Task updates maintain referential integrity
- Error handling for storage operations
- Loading states with skeleton UI
- Type-safe operations with TypeScript