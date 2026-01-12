# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

The official website for the Ethereum Ecosystem Support Program (ESP), providing financial and non-financial support to accelerate the growth of the Ethereum ecosystem.

## Development Commands

```bash
npm run dev          # Start development server at http://localhost:3000
npm run build        # Build for production
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

## Technology Stack

- **Framework:** Next.js 14 with TypeScript
- **UI Library:** Chakra UI for components and theming
- **Forms:** React Hook Form with Zod validation
- **Animation:** Framer Motion
- **APIs:** Salesforce integration via JSforce
- **Styling:** Emotion with Chakra UI theming

## Architecture

### Project Structure

- **src/components/forms/** - Form components, schemas, sections, and field components
- **src/components/UI/** - Shared UI components (common, headings, icons, text)
- **src/components/layout/** - Layout components
- **src/pages/** - Next.js pages and API routes
- **src/pages/api/** - API routes (direct-grant, rfp, wishlist, office-hours, etc.)
- **src/theme/** - Chakra UI custom theme (foundations and components)
- **src/middlewares/** - Custom middleware for form validation and security
- **src/lib/sf/** - Salesforce integration utilities

### Key Conventions

- **Barrel exports** through index.ts files
- **PascalCase** for components and TypeScript files
- **Type inference** using `z.infer<typeof Schema>` for form types

## Form Development

### Active Forms (use these as reference)

- **RFPForm** - Request for Proposals
- **WishlistForm** - Wishlist applications
- **DirectGrantForm** - Direct grants
- **OfficeHoursForm** - Office hours booking

**DEPRECATED:** All other forms in `src/components/forms/` are deprecated. Do NOT use them as reference.

### Form Architecture (Four-Layer Pattern)

1. **BaseGrantForm** - Generic wrapper handling submission, routing, validation
2. **Schema Layer** - Zod schemas composed from base schemas with field overrides
3. **Section Layer** - Reusable sections (ContactInformation, ProjectOverview, ProjectDetails, AdditionalDetails)
4. **Field Layer** - Individual field components (TextField, TextAreaField, DateField, UploadFile, Captcha)

### Critical API Rules

**WITH file uploads:**
```typescript
// Client: use createFormData()
const formData = createFormData(curatedData);
return fetch(API_ENDPOINT, { method: 'POST', body: formData });

// Server: use multipartyParse middleware
export default multipartyParse(sanitizeFields(verifyCaptcha(handler)));
```

**WITHOUT file uploads:**
```typescript
// Client: use JSON
return fetch(API_ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(curatedData)
});

// Server: NO multipartyParse
export default sanitizeFields(verifyCaptcha(handler));
```

**STRICT RULE:** Never use `multipartyParse` for forms without file uploads - it causes parsing errors.

### Salesforce Requirements

```typescript
// Company is required in Salesforce, auto-populate if empty
const curatedData = {
  ...data,
  company: data.company || `${data.firstName} ${data.lastName}`
};
```

### Field Configuration

```typescript
// Hide field
<Section fields={{ fieldName: false }} />

// Make optional
<Section fields={{ fieldName: { isRequired: false } }} />

// Custom label/help text
<Section fields={{ fieldName: { label: 'Custom', helpText: 'Help' } }} />
```

### Schema Patterns

```typescript
// Compose from base schemas
export const YourSchema = z.object({
  ...contactInformationSchema,
  ...projectOverviewSchema,
  ...additionalDetailsSchema,
  ...requiredSchema,
  // Override fields
  referral: stringFieldSchema('Referral', { max: MAX_TEXT_LENGTH }).optional()
});

// Discriminated union for conditional fields
export const Schema = z.discriminatedUnion('type', [schema1, schema2]);
```

### Constants

```typescript
MAX_TEXT_LENGTH = 255
MAX_TEXT_AREA_LENGTH = 2000
MIN_TEXT_AREA_LENGTH = 100
MAX_WISHLIST_FILE_SIZE = 4194304 // 4MB
```

## Testing Forms Locally

Use hCaptcha testing keys from `.env.local.example`:
- Site key: `10000000-ffff-ffff-ffff-000000000001`
- Secret: `0x0000000000000000000000000000000000000000`

## Salesforce Integration

- Uses JSforce library for Salesforce API
- Field names defined in `src/types.ts`
- Checkbox fields must be boolean (`true`/`false`)
- Picklist values must match Salesforce configuration
