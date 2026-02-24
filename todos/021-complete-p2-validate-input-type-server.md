---
status: pending
priority: p2
issue_id: "499"
tags: [code-review, security, validation]
dependencies: []
---

# Validate walletAddressInputType on Server

## Problem Statement

The `walletAddressInputType` field from the client is trusted without validating it's one of the expected values ('ens', 'address'). An attacker could send an unexpected value that bypasses both validation paths.

## Findings

### Security Sentinel Analysis
**Location:** `src/pages/api/grantee-finance.ts` lines 29-55

```typescript
if (walletAddressInputType === 'ens') {
  // ENS path - re-verifies resolution
} else if (walletAddressInputType === 'address') {
  // Direct address path - validates format
}
// No else clause - what if inputType is something unexpected?
```

If an attacker sends `walletAddressInputType: 'bypass'`, neither validation path executes, potentially leaving `verifiedAddress` empty while still proceeding with the update.

## Proposed Solutions

### Solution A: Explicit Validation (Recommended)

**Pros:** Clear security boundary
**Cons:** None
**Effort:** Small
**Risk:** Low

```typescript
const validInputTypes = ['ens', 'address', ''] as const;
if (!validInputTypes.includes(walletAddressInputType)) {
  res.status(400).json({ status: 'fail', error: 'Invalid input type' });
  return resolve();
}
```

### Solution B: Strict Type Check with Default

```typescript
// Treat anything unexpected as direct address validation
const inputType = walletAddressInputType === 'ens' ? 'ens' : 'address';
```

## Recommended Action

Implement Solution A for explicit security boundary.

## Technical Details

**Affected Files:**
- `src/pages/api/grantee-finance.ts`

## Acceptance Criteria

- [ ] Invalid `walletAddressInputType` values return 400 error
- [ ] Valid values 'ens', 'address', '' are accepted
- [ ] Test with malformed input type

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2025-01-22 | Security review | Input type field not validated |

## Resources

- PR: #499
