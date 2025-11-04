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
  - `forms/` - Form components, schemas, sections, and field components
  - `UI/` - Shared UI components (common, headings, etc.)
  - `layout/` - Layout components
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

### Current Active Forms (Post-Revamp)

The following forms represent the current architecture and should be used as reference:

- **RFPForm** - Request for Proposals applications
- **WishlistForm** - Wishlist item applications
- **DirectGrantForm** - Direct grant applications
- **OfficeHoursForm** - Office hours booking

**⚠️ DEPRECATED FORMS:** All other forms in `src/components/forms/` are deprecated and will be removed. Do NOT use them as reference for new development.

### Form Architecture (Four-Layer Modular Pattern)

The new form system uses a modular, section-based architecture with four distinct layers:

#### 1. BaseGrantForm Layer (Wrapper)

Generic form wrapper that handles submission, routing, validation, and error handling.

```typescript
<BaseGrantForm<FormDataType>
  config={formConfig}           // Form configuration (IDs, endpoints, URLs)
  schema={FormSchema}            // Zod validation schema
  selectedItem={item}            // Selected item (for RFP/Wishlist forms)
  onSubmit={api.form.submit}    // API submit function
  defaultValues={defaults}       // Optional default values
>
  {/* Form sections */}
</BaseGrantForm>
```

**Key Features:**

- Automatic form state management via React Hook Form
- Zod schema validation with `zodResolver`
- Success/error handling with toast notifications
- Automatic routing to thank you page with applicationId and csatToken
- FormProvider context for nested field components

#### 2. Schema Layer (Validation)

Zod schemas define form structure and validation rules. Schemas are composed from base schemas with field overrides.

**Schema Composition Patterns:**

```typescript
// Basic composition from base schemas
export const WishlistSchema = z.object({
  selectedWishlistId: stringFieldSchema('Wishlist item', { min: 1 }),
  ...contactInformationSchema,
  ...projectOverviewSchema,
  ...projectDetailsSchema,
  ...additionalDetailsSchema,
  ...requiredSchema,

  // Override fields as needed
  referral: stringFieldSchema('Referral', { max: MAX_TEXT_LENGTH }).optional(),
  fileUpload: z
    .any()
    .optional()
    .refine(file => !file || (file?.size ?? 0) <= MAX_WISHLIST_FILE_SIZE, 'Max file size is 4MB.')
});

export type WishlistData = z.infer<typeof WishlistSchema>;
```

**Discriminated Union Pattern (for conditional fields):**

```typescript
// Schema varies based on a discriminator field
const adviceSchema = baseSchema.extend({
  officeHoursRequest: z.literal('Advice')
});

const projectFeedbackSchema = baseSchema.extend({
  officeHoursRequest: z.literal('Project Feedback'),
  projectName: stringFieldSchema('Project name', { min: 1, max: 80 }),
  projectSummary: stringFieldSchema('Project summary', { min: 1, max: MAX_TEXT_AREA_LENGTH })
});

export const OfficeHoursSchema = z.discriminatedUnion('officeHoursRequest', [
  adviceSchema,
  projectFeedbackSchema
]);
```

#### 3. Section Layer (Composition)

Reusable section components that group related fields. Each section accepts a `fields` prop for granular customization.

**Available Sections:**

**ContactInformationSection**

- Fields: firstName, lastName, email, company, profileType, otherProfileType, alternativeContact, website, country, timezone, applicantProfile

**ProjectOverviewSection**

- Fields: projectName, projectSummary, fileUpload, projectRepo, domain, output, budgetRequest, currency
- Note: Budget fields render first, then project fields

**ProjectDetailsSection**

- Fields: projectStructure, sustainabilityPlan, funding, problemBeingSolved, measuredImpact, successMetrics, ecosystemFit, communityFeedback, openSourceLicense

**AdditionalDetailsSection**

- Fields: repeatApplicant, referral, additionalInfo, opportunityOutreachConsent

**OfficeHoursRequestSection**

- Custom section with conditional field rendering based on request type

**FormBlocks Components:**

- `FormContainer` - Wrapper with consistent spacing
- `SelectedItemDisplay` - Displays selected RFP/Wishlist item
- `FormActions` - Captcha and submit button
- `FormSection` - Generic section wrapper

#### 4. Field Layer (Inputs)

Individual field components with built-in validation and error display.

**Available Field Components:**

- `TextField` - Standard text input with validation
- `TextAreaField` - Multi-line text input with character limits
- `DateField` - Date selection with proper formatting
- `UploadFile` - File uploads with size and type validation
- `Captcha` - Bot protection (required for all forms)
- `Field` - Wrapper component providing labels, help text, and error display

### Field Configuration System

The field configuration system allows fine-grained control over section fields without duplicating section code.

**Configuration Options:**

```typescript
interface FieldConfig {
  label?: string; // Custom label text
  helpText?: string; // Custom help text
  isRequired?: boolean; // Override required state
}

// In section props
interface SectionProps {
  fields?: {
    fieldName?: FieldConfig | false; // false = hide field entirely
  };
}
```

**Usage Examples:**

```typescript
// Hide a field
<ContactInformationSection
  fields={{ applicantProfile: false }}
/>

// Make field optional
<AdditionalDetailsSection
  fields={{
    referral: { isRequired: false }
  }}
/>

// Customize label and help text
<AdditionalDetailsSection
  fields={{
    referral: {
      label: 'Internal EF Contact',
      helpText: 'Provide the name of the Ethereum Foundation team member...'
    }
  }}
/>

// Multiple customizations
<ContactInformationSection
  fields={{
    company: { isRequired: false },
    website: false,
    applicantProfile: false
  }}
/>

// File upload with custom props
<ProjectOverviewSection
  fields={{
    fileUpload: {
      label: 'PDF Proposal',
      helpText: 'Attach a PDF proposal...',
      dropzoneProps: {
        accept: ['application/pdf'],
        maxFiles: 1,
        maxSize: 4194304 // 4MB
      }
    }
  }}
/>
```

### Form Implementation Examples

#### Example 1: RFP Form (Item-based with selected item)

```typescript
interface RFPFormProps {
  rfpItem: RFPItem;  // Selected item passed as prop
}

const rfpFormConfig: FormConfig = {
  formId: 'rfp-form',
  submitApiEndpoint: 'rfp',
  thankYouPageUrl: RFP_THANK_YOU_PAGE_URL,
  selectedItemIdField: 'selectedRFPId',
  selectedItemDisplayText: 'Selected RFP'
};

export const RFPForm: FC<RFPFormProps> = ({ rfpItem }) => {
  return (
    <BaseGrantForm<RFPData>
      config={rfpFormConfig}
      schema={RFPSchema}
      selectedItem={rfpItem}
      onSubmit={api.rfp.submit}
    >
      <FormContainer>
        <SelectedItemDisplay
          selectedItem={rfpItem}
          displayText={rfpFormConfig.selectedItemDisplayText}
        />
        <ContactInformationSection fields={{ applicantProfile: false }} />
        <ProjectOverviewSection />
        <AdditionalDetailsSection fields={{ referral: { isRequired: false } }} />
        <FormActions submitText='Submit Application' />
      </FormContainer>
    </BaseGrantForm>
  );
};
```

**Key Features:**

- Uses `SelectedItemDisplay` to show selected RFP item
- Hides `applicantProfile` field in contact section
- Makes `referral` optional in additional details
- No `ProjectDetailsSection` (lighter form)

#### Example 2: Direct Grant & Wishlist Forms (Full forms with repositioned file upload)

```typescript
export const DirectGrantForm: FC = () => {
  const directGrantFormConfig: FormConfig = {
    formId: 'direct-grant-form',
    submitApiEndpoint: 'direct-grant',
    thankYouPageUrl: DIRECT_GRANT_THANK_YOU_PAGE_URL,
    selectedItemIdField: 'selectedDirectGrantId',
    selectedItemDisplayText: ''
  };

  const mockSelectedItem = {
    Id: 'direct-grant',
    Name: 'Direct Grant',
    Description__c: 'Direct Grant Application'
  };

  return (
    <BaseGrantForm<DirectGrantData>
      config={directGrantFormConfig}
      schema={DirectGrantSchema}
      selectedItem={mockSelectedItem}
      onSubmit={api.directGrant.submit}
    >
      <FormContainer>
        <ContactInformationSection />

        {/* Disable file upload in overview since we want it at the bottom */}
        <ProjectOverviewSection fields={{ fileUpload: false }} />

        <ProjectDetailsSection />

        <AdditionalDetailsSection
          fields={{
            referral: {
              label: 'Internal EF Contact',
              helpText: 'Provide the name of the Ethereum Foundation team member...'
            }
          }}
        />

        {/* File upload as optional at the bottom */}
        <UploadFile
          id='fileUpload'
          label='PDF Proposal'
          helpText='Attach a PDF proposal if you'd like to share additional details...'
          dropzoneProps={{
            accept: ['application/pdf'],
            maxFiles: 1,
            maxSize: 4194304 // 4MB
          }}
        />

        <FormActions submitText='Submit Application' />
      </FormContainer>
    </BaseGrantForm>
  );
};
```

**Key Features:**

- Complete form with all sections
- File upload moved from `ProjectOverviewSection` to bottom of form
- Made optional via schema override
- Custom referral field configuration
- Mock selected item for forms without selection UI

#### Example 3: Office Hours Form (Conditional fields with discriminated union)

```typescript
export const OfficeHoursForm: FC = () => {
  const officeHoursFormConfig: FormConfig = {
    formId: 'office-hours-form',
    submitApiEndpoint: 'direct-grant',
    thankYouPageUrl: OFFICE_HOURS_THANK_YOU_PAGE_URL,
    selectedItemIdField: 'selectedDirectGrantId',
    selectedItemDisplayText: ''
  };

  const mockSelectedItem = {
    Id: 'office-hours',
    Name: 'Office Hours',
    Description__c: 'Office Hours Application'
  };

  const defaultValues: Partial<OfficeHoursData> = {
    officeHoursRequest: 'Project Feedback',
    profileType: 'Individual',
    repeatApplicant: false,
    opportunityOutreachConsent: true
  };

  return (
    <BaseGrantForm<OfficeHoursData>
      config={officeHoursFormConfig}
      schema={OfficeHoursSchema}
      selectedItem={mockSelectedItem}
      onSubmit={api.officeHours.submit}
      defaultValues={defaultValues}
    >
      <FormContainer>
        <ContactInformationSection
          fields={{
            company: { isRequired: false },
            website: false
          }}
        />

        <OfficeHoursRequestSection />

        <AdditionalDetailsSection
          fields={{
            referral: false,
            additionalInfo: false
          }}
        />

        <FormActions submitText='Submit Application' />
      </FormContainer>
    </BaseGrantForm>
  );
};
```

**Key Features:**

- Default values for common fields
- Custom `OfficeHoursRequestSection` with conditional rendering
- Discriminated union schema validates based on request type
- Simplified contact information (optional company, no website)
- Hidden fields in additional details section

### Schema Patterns & Best Practices

#### Base Schema Composition

```typescript
import {
  contactInformationSchema,
  projectOverviewSchema,
  projectDetailsSchema,
  additionalDetailsSchema,
  requiredSchema
} from './BaseGrant';

export const YourFormSchema = z.object({
  // Unique identifier field (for item-based forms)
  selectedItemId: stringFieldSchema('Item', { min: 1 }),

  // Spread base schemas
  ...contactInformationSchema,
  ...projectOverviewSchema,
  ...projectDetailsSchema,
  ...additionalDetailsSchema,
  ...requiredSchema
});
```

#### Field Override Patterns

```typescript
// Make a required field optional
export const FormSchema = z.object({
  ...baseSchema,
  referral: stringFieldSchema('Referral', { max: MAX_TEXT_LENGTH }).optional()
});

// Change validation rules
export const FormSchema = z.object({
  ...baseSchema,
  fileUpload: z
    .any()
    .optional() // Now optional
    .refine(file => !file || (file?.size ?? 0) <= MAX_SIZE, 'Max file size is 4MB.')
});

// Add new fields
export const FormSchema = z.object({
  ...baseSchema,
  applicantProfile: stringFieldSchema('Applicant profile', {
    min: MIN_TEXT_AREA_LENGTH,
    max: MAX_TEXT_AREA_LENGTH
  })
});
```

#### String Field Schema Utility

```typescript
// Utility for consistent string validation
export const stringFieldSchema = (
  fieldName: string,
  { min, max }: { min?: number; max?: number }
) => {
  let fieldSchema = z.string({ required_error: `${fieldName} is required` });

  if (min) {
    fieldSchema = fieldSchema.min(
      min,
      min > 1
        ? `${fieldName} must contain at least ${min} character(s)`
        : `${fieldName} is required`
    );
  }

  if (max) {
    fieldSchema = fieldSchema.max(max, `${fieldName} cannot exceed ${max} characters`);
  }

  return fieldSchema;
};
```

### API Integration & Data Flow

#### Standard API Submit Pattern

**Pattern 1: Forms WITH File Uploads (use multipart/form-data)**

```typescript
// In src/components/forms/api.ts
export const api = {
  formWithFiles: {
    submit: (data: FormData) => {
      // 1. Curate data (handle required Salesforce fields)
      const curatedData: { [key: string]: any } = {
        ...data,
        // Company is required in SF, default to full name if empty
        company: data.company || `${data.firstName} ${data.lastName}`
      };

      // 2. Create FormData for multipart/form-data submission
      const formData = createFormData(curatedData);

      // 3. Configure request (NO Content-Type header - browser sets it with boundary)
      const requestOptions: RequestInit = {
        method: 'POST',
        body: formData
      };

      // 4. Return fetch promise (BaseGrantForm handles response)
      return fetch(API_ENDPOINT, requestOptions);
    }
  }
};
```

**API Route (with multipartyParse middleware):**

```typescript
// src/pages/api/form-with-files.ts
export default multipartyParse(sanitizeFields(verifyCaptcha(handler)));
```

**Pattern 2: Forms WITHOUT File Uploads (use JSON)**

```typescript
// In src/components/forms/api.ts
const methodOptions = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' }
};

export const api = {
  formWithoutFiles: {
    submit: (data: FormData) => {
      // 1. Curate data
      const curatedData = {
        ...data,
        company: data.company || `${data.firstName} ${data.lastName}`
      };

      // 2. Configure request with JSON body
      const requestOptions: RequestInit = {
        ...methodOptions,
        body: JSON.stringify(curatedData)
      };

      // 3. Return fetch promise
      return fetch(API_ENDPOINT, requestOptions);
    }
  }
};
```

**API Route (WITHOUT multipartyParse middleware):**

```typescript
// src/pages/api/form-without-files.ts
export default sanitizeFields(verifyCaptcha(handler));
```

**⚠️ CRITICAL RULE:**

- **WITH file uploads** → Use `createFormData()` + `multipartyParse` middleware
- **WITHOUT file uploads** → Use `JSON.stringify()` + `methodOptions` (no multipartyParse)

#### Data Flow Pipeline

1. **Client Validation** → Zod schema validates all fields
2. **Form Submission** → `onSubmit` function processes data
3. **API Layer** → Data curation and FormData creation
4. **Middleware Stack** → Apply appropriate middleware based on form type:
   - **With File Uploads:** `multipartyParse(sanitizeFields(verifyCaptcha(handler)))`
   - **Without File Uploads:** `sanitizeFields(verifyCaptcha(handler))`
5. **Server Validation** → Re-validate on server side
6. **Salesforce Integration** → JSforce submits to Salesforce
7. **Response Handling** → BaseGrantForm handles success/error
8. **Navigation** → Redirect to thank you page with applicationId and csatToken

**⚠️ CRITICAL MIDDLEWARE RULE:** Only use `multipartyParse` middleware when the form includes file uploads. For forms without file uploads, use JSON body with `methodOptions` (Content-Type: application/json) and skip `multipartyParse`.

#### BaseGrantForm Response Handling

```typescript
// Automatic in BaseGrantForm
const onSubmit: SubmitHandler<T> = async data => {
  return submitFunction(data).then(async res => {
    if (res.ok) {
      reset();

      // Parse response to get applicationId and csatToken
      const responseData = await res.json();
      const { applicationId, csatToken } = responseData;

      // Navigate to thank you page with query params
      if (applicationId && csatToken) {
        router.push(
          `${config.thankYouPageUrl}?applicationId=${applicationId}&csatToken=${csatToken}`
        );
      } else {
        router.push(config.thankYouPageUrl);
      }
    } else {
      toast({
        title: 'Something went wrong while submitting, please try again.',
        status: 'error'
      });
    }
  });
};
```

### Security & Validation

#### URL Prevention in Text Fields

```typescript
// Validation to prevent URLs in name fields
firstName: stringFieldSchema('First name', { min: 1, max: 20 }).refine(
  value => !containURL(value),
  'First name cannot contain a URL'
);
```

#### File Upload Validation

```typescript
fileUpload: z.any()
  .refine(file => !!file, 'PDF proposal is required')
  .refine(file => (file?.size ?? 0) <= MAX_WISHLIST_FILE_SIZE, 'Max file size is 4MB.')
  .refine(file => (file?.type || file?.mimetype) === 'application/pdf', 'File must be a PDF');
```

#### Server-Side Middleware Stack

- **multipartyParse** - Parses multipart/form-data including file uploads (**⚠️ ONLY use when files are uploaded**)
- **sanitizeFields** - Sanitizes input to prevent XSS attacks (always use)
- **verifyCaptcha** - Validates hCaptcha token before processing (always use)

**Middleware Composition Rules:**

```typescript
// WITH file uploads
export default multipartyParse(sanitizeFields(verifyCaptcha(handler)));

// WITHOUT file uploads (JSON body)
export default sanitizeFields(verifyCaptcha(handler));
```

**⚠️ STRICT RULE:** Never use `multipartyParse` for forms that don't include file uploads. It causes parsing errors and performance issues when the request body is JSON.

#### Salesforce Field Requirements

```typescript
// Company is required in Salesforce, auto-populate if empty
const curatedData = {
  ...data,
  company: data.company || `${data.firstName} ${data.lastName}`
};
```

### Creating a New Form: Step-by-Step Guide

#### 1. Determine Form Requirements

- Which sections do you need?
- Are any fields optional/hidden?
- Is there a selected item (RFP/Wishlist)?
- Are there conditional fields?

#### 2. Create Zod Schema

```typescript
// src/components/forms/schemas/YourForm.ts
import { z } from 'zod';
import {
  contactInformationSchema,
  projectOverviewSchema,
  additionalDetailsSchema,
  requiredSchema
} from './BaseGrant';
import { stringFieldSchema } from './utils';

export const YourFormSchema = z.object({
  ...contactInformationSchema,
  ...projectOverviewSchema,
  ...additionalDetailsSchema,
  ...requiredSchema,

  // Override fields as needed
  referral: stringFieldSchema('Referral', { max: MAX_TEXT_LENGTH }).optional()
});

export type YourFormData = z.infer<typeof YourFormSchema>;
```

#### 3. Add API Submit Function

**If your form includes file uploads:**

```typescript
// src/components/forms/api.ts
export const api = {
  // ... existing api methods
  yourFormWithFiles: {
    submit: (data: YourFormData) => {
      const curatedData = {
        ...data,
        company: data.company || `${data.firstName} ${data.lastName}`
      };

      const formData = createFormData(curatedData);

      return fetch(API_YOUR_FORM, {
        method: 'POST',
        body: formData // multipart/form-data
      });
    }
  }
};
```

**If your form does NOT include file uploads:**

```typescript
// src/components/forms/api.ts
const methodOptions = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' }
};

export const api = {
  // ... existing api methods
  yourFormWithoutFiles: {
    submit: (data: YourFormData) => {
      const curatedData = {
        ...data,
        company: data.company || `${data.firstName} ${data.lastName}`
      };

      return fetch(API_YOUR_FORM, {
        ...methodOptions,
        body: JSON.stringify(curatedData) // JSON body
      });
    }
  }
};
```

#### 4. Create Form Component

```typescript
// src/components/forms/YourForm.tsx
import { FC } from 'react';
import { BaseGrantForm } from './BaseGrantForm';
import {
  ContactInformationSection,
  ProjectOverviewSection,
  AdditionalDetailsSection,
  FormActions,
  FormContainer
} from './sections';
import { YOUR_FORM_THANK_YOU_PAGE_URL } from '../../constants';
import { api } from './api';
import { FormConfig } from './schemas/BaseGrant';
import { YourFormSchema, YourFormData } from './schemas/YourForm';

export const YourForm: FC = () => {
  const yourFormConfig: FormConfig = {
    formId: 'your-form',
    submitApiEndpoint: 'your-form',
    thankYouPageUrl: YOUR_FORM_THANK_YOU_PAGE_URL,
    selectedItemIdField: 'selectedYourFormId',
    selectedItemDisplayText: ''
  };

  const mockSelectedItem = {
    Id: 'your-form',
    Name: 'Your Form',
    Description__c: 'Your Form Application'
  };

  return (
    <BaseGrantForm<YourFormData>
      config={yourFormConfig}
      schema={YourFormSchema}
      selectedItem={mockSelectedItem}
      onSubmit={api.yourForm.submit}
    >
      <FormContainer>
        <ContactInformationSection />
        <ProjectOverviewSection />
        <AdditionalDetailsSection
          fields={{ referral: { isRequired: false } }}
        />
        <FormActions submitText='Submit Application' />
      </FormContainer>
    </BaseGrantForm>
  );
};
```

#### 5. Configure API Route

**If your form includes file uploads:**

```typescript
// src/pages/api/your-form-with-files.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { multipartyParse, sanitizeFields, verifyCaptcha } from '../../middlewares';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // ... implementation
}

// Use multipartyParse for file uploads
export default multipartyParse(sanitizeFields(verifyCaptcha(handler)));
```

**If your form does NOT include file uploads:**

```typescript
// src/pages/api/your-form-without-files.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { sanitizeFields, verifyCaptcha } from '../../middlewares';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // ... implementation
}

// NO multipartyParse for JSON-only forms
export default sanitizeFields(verifyCaptcha(handler));
```

**⚠️ IMPORTANT:** Always match your API submit pattern with your API route middleware:

- FormData + createFormData() → multipartyParse middleware
- JSON.stringify() + methodOptions → NO multipartyParse middleware

#### 6. Create Page Component

```typescript
// src/pages/your-form/index.tsx
import { YourForm } from '../../components/forms/YourForm';
// ... page implementation
```

### Field Customization Cheat Sheet

```typescript
// HIDING FIELDS
<Section fields={{ fieldName: false }} />

// MAKING FIELDS OPTIONAL
<Section fields={{ fieldName: { isRequired: false } }} />

// CUSTOM LABELS
<Section fields={{
  fieldName: {
    label: 'Custom Label',
    helpText: 'Custom help text'
  }
}} />

// MULTIPLE CUSTOMIZATIONS
<Section fields={{
  field1: false,
  field2: { isRequired: false },
  field3: { label: 'Custom', helpText: 'Help' }
}} />

// CUSTOM FILE UPLOAD
<UploadFile
  id='fileUpload'
  label='Custom Label'
  helpText='Custom help text'
  dropzoneProps={{
    accept: ['application/pdf'],
    maxFiles: 1,
    maxSize: 4194304
  }}
/>
```

### Schema Override Cheat Sheet

```typescript
// MAKE FIELD OPTIONAL
export const Schema = z.object({
  ...baseSchema,
  fieldName: stringFieldSchema('Field', { max: 100 }).optional()
});

// MAKE FIELD REQUIRED (override optional)
export const Schema = z.object({
  ...baseSchema,
  fieldName: stringFieldSchema('Field', { min: 1, max: 100 })
});

// CHANGE VALIDATION RULES
export const Schema = z.object({
  ...baseSchema,
  fileUpload: z
    .any()
    .optional()
    .refine(file => !file || (file?.size ?? 0) <= SIZE, 'Too big')
});

// ADD NEW FIELD
export const Schema = z.object({
  ...baseSchema,
  newField: stringFieldSchema('New Field', { min: 1, max: 200 })
});

// DISCRIMINATED UNION (conditional fields)
const option1Schema = baseSchema.extend({
  discriminator: z.literal('Option1'),
  field1: stringFieldSchema('Field 1', { min: 1 })
});

const option2Schema = baseSchema.extend({
  discriminator: z.literal('Option2'),
  field2: stringFieldSchema('Field 2', { min: 1 })
});

export const Schema = z.discriminatedUnion('discriminator', [option1Schema, option2Schema]);
```

### Determining If Your Form Needs File Uploads

**Forms that include file uploads:**

- RFPForm (required PDF proposal)
- WishlistForm (optional PDF proposal)
- DirectGrantForm (optional PDF proposal)
- OfficeHoursForm with Project Feedback (optional file upload)

**Check your schema:**

```typescript
// If your schema has fileUpload field, you need multipart
export const YourSchema = z.object({
  ...baseSchemas,
  fileUpload: z.any().refine(file => !!file, 'File required') // Required or optional
});
```

**Check your form sections:**

```typescript
// If you use UploadFile component anywhere, you need multipart
<UploadFile id='fileUpload' {...props} />
// OR
<ProjectOverviewSection />  // Has fileUpload by default
```

**Decision Tree:**

```
Does your form have UploadFile component or fileUpload in schema?
├─ YES → Use createFormData() + multipartyParse middleware
└─ NO  → Use JSON.stringify() + methodOptions (no multipartyParse)
```

### Common Patterns & Tips

#### Pattern: Conditional Field Rendering

```typescript
// In custom section component
const { watch } = useFormContext();
const requestType = watch('requestType');

return (
  <Stack spacing={6}>
    <RadioGroupField name='requestType' options={['A', 'B']} />

    {requestType === 'A' && (
      <Fade in={requestType === 'A'}>
        <TextField id='fieldForA' label='Field A' />
      </Fade>
    )}

    {requestType === 'B' && (
      <Fade in={requestType === 'B'}>
        <TextField id='fieldForB' label='Field B' />
      </Fade>
    )}
  </Stack>
);
```

#### Pattern: Mock Selected Item (for forms without selection)

```typescript
const mockSelectedItem = {
  Id: 'form-id',
  Name: 'Form Name',
  Description__c: 'Form Description'
};
```

#### Pattern: Default Values

```typescript
const defaultValues: Partial<FormData> = {
  profileType: 'Individual',
  repeatApplicant: false,
  opportunityOutreachConsent: true
};

<BaseGrantForm
  defaultValues={defaultValues}
  // ... other props
/>
```

#### Pattern: File Upload Positioning

```typescript
// Option 1: In ProjectOverviewSection (default position)
<ProjectOverviewSection />

// Option 2: Disable in section, add separately at bottom
<ProjectOverviewSection fields={{ fileUpload: false }} />
{/* other sections */}
<UploadFile id='fileUpload' {...props} />
```

### Styling Guidelines

- **Chakra UI theme system** with custom brand colors and component overrides
- **Gradient backgrounds** using theme values (e.g., `brand.newsletter.bgGradient`)
- **Consistent spacing:** `spacing={8}` for FormContainer, `spacing={6}` for sections
- **Responsive design** with base/md breakpoint patterns
- **Input heights:** 56px standard for text fields
- **Form container:** Gradient background with padding and border radius

### Migration Notes

#### Deprecated Forms

All forms except the following are **deprecated** and should NOT be used as reference:

- ✅ RFPForm
- ✅ WishlistForm
- ✅ DirectGrantForm
- ✅ OfficeHoursForm

❌ **Do not reference:** ProjectGrantsForm, SmallGrantsForm, DevconGrantsForm, EcodevGrantsForm, PSESponsorshipsForm, EPFApplicationForm, PSEApplicationForm, AcademicGrantsForm, etc.

#### Key Differences from Legacy Forms

**Legacy Approach:**

- Monolithic form components with all fields inline
- Manual form state management
- Repetitive field definitions across forms
- Conditional rendering with ternary operators
- Individual submission logic per form

**New Approach:**

- Section-based composition with reusable components
- BaseGrantForm handles all form logic
- Field configuration system for customization
- Declarative section composition
- Centralized submission patterns

#### Migration Steps (if needed)

1. Identify which sections the legacy form uses
2. Create new schema by composing base schemas
3. Use BaseGrantForm wrapper
4. Compose form using section components
5. Configure fields as needed with `fields` prop
6. Update API function to follow new pattern

### Testing Forms Locally

#### hCaptcha Test Keys

Use [hCaptcha testing keys](https://docs.hcaptcha.com/#test-key-set-publisher-account) (defined in `.env.local.example`) to test forms locally without solving captchas.

#### Form Validation Testing

```typescript
// Test required fields - submit empty form
// Test min/max lengths - use boundary values
// Test URL prevention - try adding URLs in text fields
// Test file upload - try different file types and sizes
// Test conditional fields - change discriminator values
```

### LLM Development Best Practices

When working with an LLM assistant on form development:

1. **Reference Active Forms Only** - Point to RFPForm, WishlistForm, DirectGrantForm, or OfficeHoursForm
2. **Specify Section Needs** - Clearly state which sections are required
3. **Define Field Customizations** - List which fields should be hidden or modified
4. **Provide Schema Requirements** - Specify required/optional fields and validation rules
5. **Mention Conditional Logic** - Describe any conditional field behavior
6. **Clarify File Upload Position** - State if file upload should be repositioned
7. **Reference Similar Forms** - Compare to existing active forms for context

**Example Prompt:**
"Create a new grant form similar to DirectGrantForm but without the ProjectDetailsSection. Make the referral field optional. Position the file upload at the bottom of the form with a custom label 'Supporting Documents'."

### Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Chakra UI Documentation](https://v2.chakra-ui.com/docs)
- [React Hook Form Documentation](https://react-hook-form.com/)
- [Zod Documentation](https://zod.dev/)
- [JSforce Documentation](https://jsforce.github.io/)

### Common Constants

```typescript
// Character limits
MAX_TEXT_LENGTH = 255
MAX_TEXT_AREA_LENGTH = 2000
MIN_TEXT_AREA_LENGTH = 100
CUSTOM_MIN_TEXT_AREA_LENGTH = 50
MAX_WISHLIST_FILE_SIZE = 4194304 // 4MB

// Form configuration
FormConfig {
  formId: string
  submitApiEndpoint: 'wishlist' | 'rfp' | 'direct-grant'
  thankYouPageUrl: string
  selectedItemIdField: 'selectedWishlistId' | 'selectedRFPId' | 'selectedDirectGrantId'
  selectedItemDisplayText: string
}
```
