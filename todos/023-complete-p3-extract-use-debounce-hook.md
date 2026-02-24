---
status: pending
priority: p3
issue_id: "499"
tags: [code-review, refactoring, hooks]
dependencies: []
---

# Extract useDebounce Hook to Shared Location

## Problem Statement

The `useDebounce` hook is defined inline in `WalletAddressInput.tsx`. It's a generic utility that could be reused elsewhere in the codebase.

## Findings

### Architecture Strategist Analysis
**Location:** `src/components/forms/fields/WalletAddressInput.tsx` lines 25-32

```typescript
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}
```

This is a well-implemented generic hook that should be in a shared location for:
1. Reuse in other components
2. Unit testing in isolation
3. Discoverability

## Proposed Solutions

### Solution A: Extract to hooks directory (Recommended)

**Pros:** Standard pattern, reusable, testable
**Cons:** Extra file
**Effort:** Small
**Risk:** Low

```typescript
// src/hooks/useDebounce.ts
import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}
```

## Recommended Action

Extract to `src/hooks/useDebounce.ts` and update import in `WalletAddressInput.tsx`.

## Technical Details

**Files to Create:**
- `src/hooks/useDebounce.ts`
- `src/hooks/index.ts` (barrel export)

**Files to Modify:**
- `src/components/forms/fields/WalletAddressInput.tsx` - update import

## Acceptance Criteria

- [ ] Hook moved to `src/hooks/useDebounce.ts`
- [ ] WalletAddressInput imports from new location
- [ ] Hook is properly typed and exported

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2025-01-22 | Architecture review | Generic hook should be shared |

## Resources

- PR: #499
