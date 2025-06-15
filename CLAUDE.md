# Ethereum Ecosystem Support Program Website

## Overview
The official website for the Ethereum Ecosystem Support Program (ESP), providing financial and non-financial support to accelerate the growth of the Ethereum ecosystem.

## Technology Stack
- **Framework:** Next.js 14 with TypeScript
- **UI Library:** Chakra UI for components and theming
- **Forms:** React Hook Form with Zod validation
- **Animation:** Framer Motion
- **APIs:** Salesforce integration via JSforce
- **Styling:** Emotion with Chakra UI theming
- **Development:** ESLint, Prettier, and TypeScript

## Architecture & Patterns

### Project Structure
- **public/** - Static assets including fonts, images, and documents
- **src/components/** - React components organized hierarchically:
  - `forms/` - Form components, schemas, and field components
  - `UI/common/` - Shared UI components
  - `UI/headings/` - Heading components
- **src/pages/** - Next.js pages and API routes
- **src/theme/** - Chakra UI custom theme with brand colors and overrides
- **src/utils/** - Utility functions and validation helpers
- **src/middlewares/** - Custom middleware for form validation and security

### Component Organization
- **Hierarchical structure** with feature-based grouping
- **Barrel exports** through index.ts files for clean imports
- **PascalCase naming** for components and TypeScript files
- **Descriptive file names** indicating purpose and scope

### TypeScript Conventions
- **Strict typing** for all form data, API responses, and component props
- **Type inference** using `z.infer<typeof Schema>` for form types
- **Type-only imports** where appropriate for better performance

## Form Development Guidelines

### Form Architecture (Three-Layer Pattern)
1. **Schema Layer:** Create Zod validation schema in `src/components/forms/schemas/`
2. **Component Layer:** Create form component in `src/components/forms/`
3. **Field Layer:** Use standardized field components from `src/components/forms/fields/`

### Schema Patterns
```typescript
// Import validation utilities
import { stringFieldSchema, containURL } from './utils'
import { MAX_TEXT_LENGTH, MAX_TEXT_AREA_LENGTH } from '../constants'

// Standard schema structure
export const YourFormSchema = z.object({
  firstName: stringFieldSchema(),
  email: stringFieldSchema().email(),
  projectDescription: z.string()
    .min(MIN_TEXT_AREA_LENGTH)
    .max(MAX_TEXT_AREA_LENGTH)
    .refine(val => !containURL(val), 'URLs not allowed'),
  // Export both schema and inferred type
})

export type YourFormData = z.infer<typeof YourFormSchema>
```

### Form Component Patterns
- **React Hook Form** with `zodResolver` for validation
- **FormProvider** context for nested field components
- **Standard configuration:** `mode: 'onBlur'`, `shouldFocusError: true`
- **Conditional fields** using `watch()` with `Fade` animations
- **Consistent styling** with gradient backgrounds and responsive design

### Available Field Components
- **TextField** - Standard text input with validation
- **TextAreaField** - Multi-line text input with character limits
- **DateField** - Date selection with proper formatting
- **UploadFile** - File uploads with size and type validation
- **Captcha** - Bot protection (required for all forms)
- **Field** - Wrapper component providing labels, help text, and error display

### API & Data Flow
- **Client validation** → **API submission** → **Server validation** → **Salesforce integration**
- **Middleware composition:** `multipartyParse(sanitizeFields(verifyCaptcha(handler)))`
- **Centralized API layer** in `forms/api.ts` with organized methods
- **Error handling** with toast notifications and graceful fallbacks

### Security & Validation
- **URL prevention** using `containURL()` utility in text fields
- **Server-side sanitization** before processing data
- **File upload restrictions** with size limits and MIME type validation
- **Captcha integration** required for all form submissions

### Styling Guidelines
- **Chakra UI theme system** with custom brand colors and component overrides
- **Gradient backgrounds** using theme values (e.g., `brand.newsletter.bgGradient`)
- **Consistent spacing:** `gap={8}` for form sections, 56px input heights
- **Responsive design** with base/md breakpoint patterns