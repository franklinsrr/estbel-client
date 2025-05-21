estbel-client is a Next.js application built with TypeScript and styled with Tailwind CSS. The project currently features a robust authentication system (including sign-in, forgot password, and change password functionalities located in `src/app/auth/`) and a basic dashboard page (found in `src/app/dashboard/`). The project leverages key libraries such as Radix UI for accessible UI components, Zod for data validation, and React Hook Form for efficient form handling.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### Running Tests

To run the automated tests for this project:

```bash
npm run test
```

To run tests in watch mode:
```bash
npm run test:watch
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Project Structure

Here's an overview of the key directories within the `src` folder and their purposes:

*   `src/app/`: Main application folder for Next.js, containing pages, routes, and layouts.
    *   `src/app/auth/`: Houses all authentication-related pages (e.g., sign-in, sign-up, forgot password).
    *   `src/app/dashboard/`: Contains pages related to the user dashboard area.
*   `src/components/`: Contains reusable React components.
    *   `src/components/ui/`: Specifically for user interface elements, possibly from a UI library like Shadcn/UI or Radix UI.
*   `src/lib/`: For shared utility functions, helper scripts, or library configurations.
*   `src/schemas/`: Holds Zod schema definitions, used for data validation.
*   `src/interfaces/`: Contains TypeScript type definitions and interfaces.
*   `src/app/constants/`: For storing constant values used throughout the application.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details. Project-specific deployment details and configurations for 'estbel-client' are yet to be defined.
