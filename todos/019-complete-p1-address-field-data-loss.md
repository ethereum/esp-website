---
status: pending
priority: p1
issue_id: "499"
tags: [code-review, data-integrity, salesforce, critical]
dependencies: []
---

# CRITICAL: Token Selection Causes Data Loss on Other Address Field

## Problem Statement

When a user submits the Grantee Finance form with a specific token (ETH or DAI), the current implementation **overwrites the other token's address field with an empty string**, causing irreversible data loss.

This is a **BLOCKS MERGE** issue.

## Findings

### Data Integrity Guardian Analysis
**Location:** `src/pages/api/grantee-finance.ts` lines 70-89

**Scenario:**
1. Grantee previously submitted: `ETH_Address = 0xAAA...`, `DAI_Address = 0xBBB...`
2. Grantee now submits update with `token=ETH` and new address `0xCCC...`
3. **Result:** `ETH_Address = 0xCCC...`, `DAI_Address = ''` (SILENTLY OVERWRITTEN)

**Current Code:**
```typescript
let ETH_Address__c = '';
let DAI_Address__c = '';

if (verifiedAddress && token) {
  if (token === 'ETH') {
    ETH_Address__c = verifiedAddress;
  } else if (token === 'DAI') {
    DAI_Address__c = verifiedAddress;
  }
}
```

The problem: Both variables start as empty strings, so whichever token is NOT selected gets its Salesforce field overwritten with `''`.

## Proposed Solutions

### Solution A: Conditional Field Updates (Recommended)
Only update the field corresponding to the selected token.

**Pros:** No data loss, simple fix
**Cons:** Requires restructuring update payload
**Effort:** Small
**Risk:** Low

```typescript
const updateFields: Record<string, any> = {
  Id: Contract_ID__c.trim(),
  // ... other required fields
};

// Only update the address field for the selected token
if (verifiedAddress && token) {
  if (token === 'ETH') {
    updateFields.ETH_Address__c = verifiedAddress;
  } else if (token === 'DAI') {
    updateFields.DAI_Address__c = verifiedAddress;
  }
}

conn.sobject('Contract').update(updateFields, ...);
```

### Solution B: Fetch-Then-Update Pattern
Fetch existing record first, preserve other address.

**Pros:** Explicit preservation of existing data
**Cons:** Extra Salesforce API call, more complex
**Effort:** Medium
**Risk:** Low

```typescript
const existing = await conn.sobject('Contract').retrieve(Contract_ID__c);
const updateFields = {
  ETH_Address__c: token === 'ETH' ? verifiedAddress : existing.ETH_Address__c,
  DAI_Address__c: token === 'DAI' ? verifiedAddress : existing.DAI_Address__c,
};
```

### Solution C: Add UI Confirmation
Warn users their other address will be cleared.

**Pros:** Explicit user consent
**Cons:** Bad UX, doesn't prevent accidental data loss
**Effort:** Small
**Risk:** Medium (users may not read warnings)

## Recommended Action

**Implement Solution A** - Conditional field updates. This is the simplest fix with no API overhead.

## Technical Details

**Affected Files:**
- `src/pages/api/grantee-finance.ts`

**Risk Assessment:**
- HIGH: Data loss is irreversible
- HIGH: Affects all users updating their payment details
- HIGH: No audit trail of what was overwritten

## Acceptance Criteria

- [ ] Selecting ETH does NOT overwrite existing DAI_Address__c
- [ ] Selecting DAI does NOT overwrite existing ETH_Address__c
- [ ] Only the field for the selected token is updated
- [ ] Unit test verifies partial update behavior

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2025-01-22 | Code review | Dual-write logic has critical data loss bug |

## Resources

- PR: #499
- Related todo: `012-pending-p1-salesforce-backward-compatibility.md`
