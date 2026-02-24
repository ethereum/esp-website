---
title: Automatic Grant Round Opening/Closing with AoE Timezone
date: 2026-02-03
problem_type: architecture_decision
component: grant_rounds
tags: [dates, aoe-timezone, grant-rounds, mdx, automation]
---

# Automatic Grant Round Opening/Closing

## Overview

Grant rounds now **automatically open and close based on dates** defined in MDX frontmatter. No manual status changes required.

Previously, rounds required a manual `status: 'active' | 'closed'` field that someone had to update when deadlines passed. This was error-prone and required manual intervention.

Now, the system computes status automatically from `startDate` and `endDate` using **AoE (Anywhere on Earth) timezone**, ensuring rounds close at the end of the stated deadline day regardless of applicant timezone.

## Key Change: No More Manual Status

**Before (manual):**
```yaml
# Had to manually change status when deadline passed
status: 'active'  # Someone had to change this to 'closed'
startDate: '2026-02-02'
endDate: '2026-04-01'
```

**After (automatic):**
```yaml
# Status computed automatically - no status field needed
startDate: '2026-02-02'
endDate: '2026-04-01'
```

The system computes status at build/ISR time:
- **Before startDate**: `'upcoming'` - hidden from Open Rounds page
- **Between dates**: `'active'` - shown on Open Rounds page
- **After endDate**: `'closed'` - shows "Applications Closed" banner

## Date Fields

Grant rounds use two pairs of date fields to separate **what users see** from **when the system actually opens/closes** the round. This enables operational flexibility for extending deadlines without confusing applicants.

## Date Fields

### Display Dates (Required)

| Field | Purpose | Example |
|-------|---------|---------|
| `startDate` | Shown to users in the UI | `'2026-02-02'` |
| `endDate` | Shown to users as the deadline | `'2026-04-01'` |

These appear in:
- Round page descriptions
- Open Rounds listing
- Any user-facing deadline text

### Effective Dates (Optional)

| Field | Purpose | Example |
|-------|---------|---------|
| `effectiveStartDate` | Controls when round actually opens | `'2026-02-05'` |
| `effectiveEndDate` | Controls when round actually closes | `'2026-04-02'` |

These control:
- Round status computation (`upcoming`, `active`, `closed`)
- Visibility on Open Rounds page
- "Applications Closed" banner display

## How It Works

```typescript
// From src/lib/rounds/index.ts
export function computeRoundStatus(
  startDate: string,
  endDate: string,
  effectiveStartDate?: string,  // Optional override
  effectiveEndDate?: string     // Optional override
): RoundStatus {
  const now = Date.now();
  // Use effective dates if provided, otherwise fall back to display dates
  const startAoE = toAoETimestamp(effectiveStartDate || startDate, true);
  const endAoE = toAoETimestamp(effectiveEndDate || endDate, false);

  if (now < startAoE) return 'upcoming';
  if (now > endAoE) return 'closed';
  return 'active';
}
```

## Use Cases

### 1. Standard Round (No Override)

```yaml
# content/rounds/example.mdx
startDate: '2026-02-02'
endDate: '2026-04-01'
# No effective dates - display dates control everything
```

**Result:** Opens Feb 2nd 00:00 AoE, closes Apr 1st 23:59:59 AoE.

### 2. Silent Deadline Extension

Business needs to extend deadline by 1 day without updating public messaging:

```yaml
startDate: '2026-02-02'
endDate: '2026-04-01'           # Users still see April 1st
effectiveEndDate: '2026-04-02'  # Actually closes April 2nd
```

**Result:** Users see "April 1st" deadline, but applications accepted until Apr 2nd 23:59:59 AoE.

### 3. Delayed Opening

Announce a round early but don't accept applications until later:

```yaml
startDate: '2026-02-01'          # Users see Feb 1st
effectiveStartDate: '2026-02-05' # Actually opens Feb 5th
endDate: '2026-04-01'
```

**Result:** Round page is accessible, but not shown in "Open Rounds" until Feb 5th.

### 4. Both Overrides

```yaml
startDate: '2026-02-01'
effectiveStartDate: '2026-02-05'
endDate: '2026-04-01'
effectiveEndDate: '2026-04-03'
```

**Result:** Shows "Feb 1 - Apr 1" to users, but actually active Feb 5 - Apr 3.

## AoE Timezone

All dates use **AoE (Anywhere on Earth)** timezone (UTC-12):

| Date | AoE Time | UTC Equivalent |
|------|----------|----------------|
| Start: `'2026-02-02'` | 00:00:00 AoE Feb 2 | 12:00:00 UTC Feb 2 |
| End: `'2026-04-01'` | 23:59:59 AoE Apr 1 | 11:59:59 UTC Apr 2 |

This ensures applicants in any timezone have until the end of the stated day.

## Type Definition

```typescript
// From src/types.ts
export interface RoundFrontmatter {
  slug: string;
  name: string;
  description: string;
  tags: string[];
  heroImage: string;
  colorBrand: string;
  startDate: string;              // Required - display
  endDate: string;                // Required - display
  effectiveStartDate?: string;    // Optional - override
  effectiveEndDate?: string;      // Optional - override
}
```

## How Automatic Updates Work (ISR)

Pages use **Incremental Static Regeneration** with `revalidate: 3600` (1 hour):

1. Status is computed in `getStaticProps()` at build/regeneration time
2. When a visitor requests the page after 1 hour, Next.js serves cached version while regenerating in background
3. Next visitor gets fresh page with updated status

**Result:** Up to 1-hour delay between actual deadline and page update. Acceptable for day-granularity deadlines.

```
Deadline passes (23:59:59 AoE)
       ↓
Next page request (after revalidate period)
       ↓
ISR regenerates page in background
       ↓
Status recomputed → 'closed'
       ↓
Next visitor sees "Applications Closed" banner
```

## Testing

Tests are in `src/__tests__/lib/rounds.test.ts`:

```bash
npm run test -- --run
```

Covers:
- AoE timezone conversion boundaries
- Status computation for all states
- Effective date override behavior
- Edge cases (single-day rounds, year boundaries)

## Summary

| Aspect | Before | After |
|--------|--------|-------|
| Status field | Manual `status: 'active'` in MDX | Removed - computed automatically |
| Closing rounds | Edit MDX, change to `'closed'` | Automatic when `endDate` passes |
| Timezone | Undefined | AoE (UTC-12) - fairest for all applicants |
| Deadline extensions | Edit `endDate` (visible to users) | Use `effectiveEndDate` (invisible) |
| Update frequency | Manual | Automatic via ISR (≤1 hour delay) |

## Related Files

- `src/lib/rounds/index.ts` - `computeRoundStatus()` function and `RoundStatus` type
- `src/types.ts` - `RoundFrontmatter` interface (no more `status` field)
- `src/pages/rounds/[slug].tsx` - Status computation at build time
- `src/components/rounds/RoundPage.tsx` - Status display
- `src/__tests__/lib/rounds.test.ts` - Test coverage for AoE logic
- `content/rounds/*.mdx` - Round definitions
