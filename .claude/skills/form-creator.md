# Form Creator Skill

Create new forms following the ESP website's four-layer form architecture.

## When to Use

- Creating a new grant application form
- Adding a new form type to the website
- Modifying existing form structure

## Workflow

### Step 1: Gather Requirements

Ask the user:
1. What is the form name/purpose?
2. Does it require file uploads? (Critical for middleware selection)
3. Which sections are needed?
   - ContactInformationSection
   - ProjectOverviewSection
   - ProjectDetailsSection
   - AdditionalDetailsSection
4. Are there conditional fields based on user selection?
5. Which fields should be hidden or made optional?

### Step 2: Create Schema

Create schema in `src/components/forms/schemas/[FormName].ts`:

```typescript
import { z } from 'zod';
import {
  contactInformationSchema,
  projectOverviewSchema,
  projectDetailsSchema,
  additionalDetailsSchema,
  requiredSchema
} from './BaseGrant';
import { stringFieldSchema } from './utils';
import { MAX_TEXT_LENGTH, MAX_TEXT_AREA_LENGTH } from './constants';

export const [FormName]Schema = z.object({
  ...contactInformationSchema,
  ...projectOverviewSchema,
  // Include other schemas as needed
  ...additionalDetailsSchema,
  ...requiredSchema,

  // Override fields as needed
  // referral: stringFieldSchema('Referral', { max: MAX_TEXT_LENGTH }).optional()
});

export type [FormName]Data = z.infer<typeof [FormName]Schema>;
```

For conditional fields, use discriminated union:

```typescript
const option1Schema = baseSchema.extend({
  formType: z.literal('Option1'),
  specificField: stringFieldSchema('Field', { min: 1 })
});

const option2Schema = baseSchema.extend({
  formType: z.literal('Option2'),
  otherField: stringFieldSchema('Other', { min: 1 })
});

export const [FormName]Schema = z.discriminatedUnion('formType', [
  option1Schema,
  option2Schema
]);
```

### Step 3: Add API Submit Function

Add to `src/components/forms/api.ts`:

**WITH file uploads:**
```typescript
[formName]: {
  submit: (data: [FormName]Data) => {
    const curatedData = {
      ...data,
      company: data.company || `${data.firstName} ${data.lastName}`
    };
    const formData = createFormData(curatedData);
    return fetch(API_[FORM_NAME], { method: 'POST', body: formData });
  }
}
```

**WITHOUT file uploads:**
```typescript
[formName]: {
  submit: (data: [FormName]Data) => {
    const curatedData = {
      ...data,
      company: data.company || `${data.firstName} ${data.lastName}`
    };
    return fetch(API_[FORM_NAME], {
      ...methodOptions,
      body: JSON.stringify(curatedData)
    });
  }
}
```

### Step 4: Create Form Component

Create `src/components/forms/[FormName]Form.tsx`:

```typescript
import { FC } from 'react';
import { BaseGrantForm } from './BaseGrantForm';
import {
  ContactInformationSection,
  ProjectOverviewSection,
  AdditionalDetailsSection,
  FormActions,
  FormContainer
} from './sections';
import { [FORM_NAME]_THANK_YOU_PAGE_URL } from '../../constants';
import { api } from './api';
import { FormConfig } from './schemas/BaseGrant';
import { [FormName]Schema, [FormName]Data } from './schemas/[FormName]';

export const [FormName]Form: FC = () => {
  const formConfig: FormConfig = {
    formId: '[form-name]-form',
    submitApiEndpoint: '[form-name]',
    thankYouPageUrl: [FORM_NAME]_THANK_YOU_PAGE_URL,
    selectedItemIdField: 'selected[FormName]Id',
    selectedItemDisplayText: ''
  };

  const mockSelectedItem = {
    Id: '[form-name]',
    Name: '[Form Name]',
    Description__c: '[Form Name] Application'
  };

  return (
    <BaseGrantForm<[FormName]Data>
      config={formConfig}
      schema={[FormName]Schema}
      selectedItem={mockSelectedItem}
      onSubmit={api.[formName].submit}
    >
      <FormContainer>
        <ContactInformationSection />
        <ProjectOverviewSection fields={{ fileUpload: false }} />
        <AdditionalDetailsSection
          fields={{ referral: { isRequired: false } }}
        />
        <FormActions submitText='Submit Application' />
      </FormContainer>
    </BaseGrantForm>
  );
};
```

### Step 5: Create API Route

Create `src/pages/api/[form-name].ts`:

**WITH file uploads:**
```typescript
import type { NextApiRequest, NextApiResponse } from 'next';
import { multipartyParse, sanitizeFields, verifyCaptcha } from '../../middlewares';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Salesforce submission logic
    // Return applicationId and csatToken
    res.status(200).json({ applicationId, csatToken });
  } catch (error) {
    res.status(500).json({ message: 'Submission failed' });
  }
}

export default multipartyParse(sanitizeFields(verifyCaptcha(handler)));
```

**WITHOUT file uploads:**
```typescript
import type { NextApiRequest, NextApiResponse } from 'next';
import { sanitizeFields, verifyCaptcha } from '../../middlewares';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Same implementation
}

// NO multipartyParse for JSON-only forms
export default sanitizeFields(verifyCaptcha(handler));
```

### Step 6: Export and Create Page

1. Add export to `src/components/forms/index.ts`
2. Create page at `src/pages/[form-name]/index.tsx`
3. Add thank you page URL to `src/constants.ts`

## Critical Rules

1. **NEVER use multipartyParse for forms without file uploads** - causes parsing errors
2. **Always populate company field** - required by Salesforce
3. **Reference only active forms** - RFPForm, WishlistForm, DirectGrantForm, OfficeHoursForm
4. **Match API pattern to middleware** - FormData → multipartyParse, JSON → no multipartyParse

## Field Configuration Quick Reference

```typescript
// Hide field
<Section fields={{ fieldName: false }} />

// Make optional
<Section fields={{ fieldName: { isRequired: false } }} />

// Custom label
<Section fields={{ fieldName: { label: 'Custom', helpText: 'Help text' } }} />
```
