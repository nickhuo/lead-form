# Lead Form Application

A modern, responsive lead form application built with Next.js, TypeScript, and TailwindCSS. The form collects information from prospects interested in immigration services.

## Features

- Modern, responsive design
- Form validation
- File upload support
- Success confirmation page
- TypeScript support
- Tailwind CSS styling

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- TailwindCSS
- React Hook Form

## Project Structure

```
lead-form/
├── app/
│   ├── api/
│   │   └── leads/
│   │   ├── components/
│   │   │   ├── LeadForm.tsx
│   │   │   └── SuccessMessage.tsx
│   │   └── page.tsx
│   ├── public/
│   └── package.json
```

## Development

The application uses:
- `react-hook-form` for form handling and validation
- TailwindCSS for styling
- Next.js App Router for routing and API routes
- TypeScript for type safety

## API Routes

- `POST /api/leads` - Handles form submissions
