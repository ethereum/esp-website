[![Netlify Status](https://api.netlify.com/api/v1/badges/dc4a526c-394c-4001-8452-b63ce3c1c77b/deploy-status)](https://app.netlify.com/sites/ecosystem-support/deploys)

<p align="center">
  <img src="https://user-images.githubusercontent.com/8097623/69177629-c137a400-0abc-11ea-9bcd-da3ba03d2688.png" width="60%" alt="Ethereum Ecosystem Support Program">
</p>

<h1 align="center">
  Ethereum Ecosystem Support Program
</h1>

The Ethereum Ecosystem Support Program exists to provide both financial and non-financial support to projects and entities within the greater Ethereum community, in order to accelerate the growth of the ecosystem. The Ecosystem Support Program is an expansion of the original Ethereum Grants Program which mainly focused on financial support. Our focus is on deploying our resources where they will have the biggest impact.

This repository holds the codebase to our website, [esp.ethereum.foundation](https://esp.ethereum.foundation)

## Stack

The main stack used in the project includes:

- [Next.js](https://nextjs.org/).
- TypeScript.
- [ChakraUI](https://chakra-ui.com/) as component library.
- [react-hook-form](https://react-hook-form.com/) to validate forms.
- [Framer Motion](https://www.framer.com/motion/) to animate buttons.
- [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) for linting and code formatting.

## Project Structure

The following list describes the main elements of the project structure:

- `public`: contains static assets like fonts and images.
- `src`: contains the source code.
  - `components`: React components.
    - components with state are directly located inside `/components`.
    - `forms`: components used in forms.
    - `layout`: components used to contain and apply different layouts to different pages.
    - `UI`: stateless (functional) components.
  - `hooks`: custom hooks.
  - `middlewares`: custom middlewares (required for captcha input validation).
  - `pages`: includes components that renders to pages and [NextJS API Routes](https://nextjs.org/docs/api-routes/introduction).
  - `theme`: contains the [Chakra UI custom theme](https://chakra-ui.com/docs/styled-system/theming/customize-theme), organized in `foundations` and `components` for better scaling.
  - `utils`
  - `constants.ts`: this is the _global_ constants file (we have another one for specific _form constants_), containg URLs and lists of elements we use across the site.
  - `global.css`: global stylesheet.
  - `types.ts`: contains the custom defined TypeScript types and interfaces.

## Local development

The project is bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app), with a custom scaffolding.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learning NextJS

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Adding ChakraUI to a NextJS project

[This](https://chakra-ui.com/guides/getting-started/nextjs-guide) is a very clear and step-by-step guide on it.

## Learning ChakraUI

We recommend checking the [official docs](https://chakra-ui.com/docs/getting-started).
