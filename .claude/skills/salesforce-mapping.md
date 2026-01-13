# Salesforce Field Mapping Skill

Map form fields to Salesforce API fields and handle data type conversions.

## When to Use

- Adding new fields that need to sync with Salesforce
- Debugging Salesforce submission errors
- Understanding field naming conventions
- Converting data types for Salesforce

## Field Name Reference

Salesforce field names are defined in `src/types.ts`. Common patterns:

```typescript
// Standard fields
firstName        → FirstName
lastName         → LastName
email            → Email
company          → Company

// Custom fields (end with __c)
projectName      → Project_Name__c
projectSummary   → Project_Summary__c
budgetRequest    → Requested_Amount__c
```

## Data Type Conversions

### Checkbox Fields (Boolean)

Salesforce expects boolean values, not strings:

```typescript
// WRONG
repeatApplicant: 'true'

// CORRECT
repeatApplicant: true
```

Handle in API layer:
```typescript
const curatedData = {
  ...data,
  repeatApplicant: data.repeatApplicant === 'true' || data.repeatApplicant === true
};
```

### Picklist Fields

Values must match exactly what's configured in Salesforce:

```typescript
// Check Salesforce for valid values
profileType: 'Individual' | 'Organization' | 'Academic Institution'
currency: 'USD' | 'EUR' | 'ETH' | 'DAI'
```

If you get error: `bad value for restricted picklist field`
- Check the exact value in Salesforce
- Disable "Restrict picklist to the values defined in the value set" in Salesforce if needed

### Date Fields

Format dates as ISO strings:

```typescript
submissionDate: new Date().toISOString()
```

### Multi-Select Fields

Send as semicolon-separated string:

```typescript
domains: ['DeFi', 'Infrastructure'].join(';')
```

## Required Fields

### Company Field (Critical)

Company is required in Salesforce. Auto-populate if empty:

```typescript
const curatedData = {
  ...data,
  company: data.company || `${data.firstName} ${data.lastName}`
};
```

### Record Type

Different forms use different Salesforce record types. Set via environment variables:

```
SF_RECORD_TYPE_OFFICE_HOURS
SF_RECORD_TYPE_PROJECT_GRANTS
SF_RECORD_TYPE_SMALL_GRANTS
SF_RECORD_TYPE_SPONSORSHIPS
SF_RECORD_TYPE_GRANTS_ROUND
```

## Common Salesforce Errors

### "REQUIRED_FIELD_MISSING"
- Check which field is missing in the error details
- Ensure the field is included in the submission data
- Company is the most common culprit

### "INVALID_FIELD_VALUE"
- Picklist value doesn't match Salesforce configuration
- Boolean field received string instead of boolean
- Check exact spelling and case

### "STRING_TOO_LONG"
- Field exceeds Salesforce character limit
- Typical limits: Text(255), TextArea(2000), LongTextArea(32000)
- Validate in Zod schema before submission

## Adding New Salesforce Fields

1. **Create field in Salesforce** - Note the API name (ends with __c for custom)

2. **Add to types.ts**:
```typescript
export interface LeadFields {
  // ... existing fields
  New_Field__c?: string;
}
```

3. **Add to form schema**:
```typescript
newField: stringFieldSchema('New Field', { max: 255 })
```

4. **Map in API route**:
```typescript
const leadData: LeadFields = {
  // ... existing mappings
  New_Field__c: data.newField
};
```

## Debugging Submissions

1. **Check API route logs** - Add console.log for curatedData
2. **Verify field names** - Match exactly with Salesforce API names
3. **Test in Salesforce sandbox** - Use SF_PROD_LOGIN_URL for sandbox URL
4. **Check JSforce response** - Log the full error object

```typescript
try {
  const result = await conn.sobject('Lead').create(leadData);
  console.log('Success:', result);
} catch (error) {
  console.error('Salesforce error:', JSON.stringify(error, null, 2));
  throw error;
}
```

## Reference: src/lib/sf/

Salesforce integration utilities:
- Connection management
- Authentication
- Query helpers
