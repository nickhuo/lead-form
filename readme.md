# Lead Form Application

A modern web application for collecting and managing visa consultation leads, built with Next.js, TypeScript, and TailwindCSS.

## Features

- Interactive lead submission form with real-time validation
- Admin dashboard for lead management
- Status tracking system (Pending → Reached Out → Closed)
- Search and filter functionality
- Responsive design for all devices

## Prerequisites

Before you begin, ensure you have installed:
- Node.js (v18 or higher)
- npm (v9 or higher)
- Git

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/lead-form.git
cd lead-form
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```bash
cp .env.example .env.local
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
lead-form/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── components/        # React components
│   ├── store/            # Redux store and slices
│   └── types/            # TypeScript types
├── public/               # Static files
└── styles/              # Global styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Design Documentation

See [DESIGN.md](./DESIGN.md) for detailed information about the design decisions and architecture of this project.

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- TailwindCSS
- React Hook Form

## Development

The application uses:
- `react-hook-form` for form handling and validation
- TailwindCSS for styling
- Next.js App Router for routing and API routes
- TypeScript for type safety

## API Routes

- `POST /api/leads` - Handles form submissions
