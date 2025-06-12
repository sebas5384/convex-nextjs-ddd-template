# Convex DDD Example

A clean Domain-Driven Design (DDD) project template built with [Convex](https://convex.dev/) and [Next.js](https://nextjs.org/).

## Stack

- **Backend**: Convex (database, server logic)
- **Frontend**: React + Next.js
- **Styling**: Tailwind CSS
- **Authentication**: Convex Auth

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

This will start both the Next.js frontend and Convex backend in parallel.

## Project Structure

```
├── app/                 # Next.js app directory (pages, layouts)
├── components/          # Reusable React components
├── convex/             # Convex backend functions and schema
│   ├── schema.ts       # Database schema definition
│   ├── myFunctions.ts  # Domain functions (queries, mutations, actions)
│   └── auth.config.ts  # Authentication configuration
└── ...
```

## Learn More

- [Convex Documentation](https://docs.convex.dev/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Convex Auth Documentation](https://labs.convex.dev/auth)
