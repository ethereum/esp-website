# feat: Private Grants Explorer (Internal Route)

**Type:** Enhancement
**Priority:** High
**Affects:** `src/pages/grants/internal.tsx`, `src/lib/sf/grants.ts`, `src/components/grants/GrantsTable.tsx`

---

## Overview

Add a protected `/grants/internal` route to the existing ESP website for internal team members. Requires Google OAuth with `@ethereum.org` domain restriction. Shows extended Salesforce fields not visible on the public grants page.

## Problem Statement

The ESP team needs to view grant data with additional internal fields (Cost Center, Grant Evaluator, Grant Round, Budget) without building and maintaining a separate application.

## Proposed Solution

Add a protected route to the existing Next.js application:
- Google OAuth with `@ethereum.org` domain restriction
- Middleware protecting `/grants/internal` route
- Extended Salesforce query with private fields
- Existing `GrantsTable` component extended with `showPrivateFields` prop

### Architecture

```
src/
├── pages/
│   ├── grants/
│   │   ├── index.tsx              # Existing public page
│   │   └── internal.tsx           # NEW: Protected internal page
│   └── api/
│       ├── auth/
│       │   ├── google.ts          # NEW: OAuth redirect
│       │   └── callback.ts        # NEW: OAuth callback + domain check
│       └── grants/
│           └── internal.ts        # NEW: Protected API route
├── lib/sf/
│   └── grants.ts                  # EXTEND: Add getPrivateGrants()
├── components/grants/
│   ├── GrantsTable.tsx            # MODIFY: Add privateFields prop
│   └── GrantDetailModal.tsx       # MODIFY: Show private fields
├── types/
│   └── grants.ts                  # EXTEND: Add private field types
└── middleware.ts                  # NEW: Protect /grants/internal
```

## Technical Approach

### 1. Middleware Protection

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/grants/internal')) {
    const token = request.cookies.get('esp-internal-auth');
    if (!token) {
      return NextResponse.redirect(new URL('/api/auth/google', request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/grants/internal/:path*'],
};
```

### 2. Simple OAuth API Routes

```typescript
// pages/api/auth/google.ts
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!,
    redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`,
    response_type: 'code',
    scope: 'email profile',
    hd: 'ethereum.org', // Restrict to ethereum.org domain
  });
  res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params}`);
}
```

```typescript
// pages/api/auth/callback.ts
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.query;

  // Exchange code for tokens
  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code: code as string,
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`,
      grant_type: 'authorization_code',
    }),
  });

  const { access_token } = await tokenRes.json();

  // Get user info
  const userRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: { Authorization: `Bearer ${access_token}` },
  });
  const user = await userRes.json();

  // Verify domain
  if (!user.email?.endsWith('@ethereum.org')) {
    return res.redirect('/grants/internal/unauthorized');
  }

  // Set auth cookie (httpOnly, secure, 7 days)
  res.setHeader('Set-Cookie',
    `esp-internal-auth=${Buffer.from(JSON.stringify({ email: user.email })).toString('base64')}; HttpOnly; Secure; Path=/; Max-Age=604800`
  );

  res.redirect('/grants/internal');
}
```

### 3. Extended Salesforce Query

```typescript
// src/lib/sf/grants.ts - ADD this function

const PRIVATE_FIELDS = [
  // Existing public fields
  'Id',
  'Name',
  'Project_Description_Public__c',
  'Opportunity_Domain__c',
  'Opportunity_Output__c',
  'CloseDate',
  'Project_Website__c',
  'Project_Repo_Link__c',
  // Private fields (verify exact API names in Salesforce)
  'Cost_Center_Lookup__c',
  'Opportunity_Grant_Evaluator_Lookup__c',
  'Proactive_Community_Grants_Round__c',
  'Amount',
  'StageName',
];

export async function getPrivateGrants(): Promise<PrivateGrantRecord[]> {
  const conn = await getSalesforceConnection();

  const query = `
    SELECT ${PRIVATE_FIELDS.join(', ')}
    FROM Opportunity
    WHERE RecordType.Name IN ('Sponsorships', 'Proactive community grants', 'Financial support', 'Matching funds')
    AND (StageName = 'Closed Won' OR StageName = 'In Progress' OR StageName = 'Pending')
    ORDER BY CloseDate DESC
  `;

  let allRecords: SFOpportunityRecord[] = [];
  let result = await conn.query<SFOpportunityRecord>(query);
  allRecords.push(...result.records);

  while (!result.done && result.nextRecordsUrl) {
    result = await conn.queryMore<SFOpportunityRecord>(result.nextRecordsUrl);
    allRecords.push(...result.records);
  }

  return allRecords.map(mapToPrivateGrantRecord);
}
```

### 4. Extend GrantsTable Component

```typescript
// src/types/grants.ts - EXTEND
export interface PrivateGrantFields {
  costCenter: string | null;
  grantEvaluator: string | null;
  grantRound: string | null;
  budgetAmount: number | null;
  status: string | null;
}

export type PrivateGrantRecord = GrantRecord & PrivateGrantFields;
```

```typescript
// src/components/grants/GrantsTable.tsx - MODIFY props
interface GrantsTableProps {
  grants: GrantRecord[] | PrivateGrantRecord[];
  showPrivateFields?: boolean;  // NEW
  // ... existing props
}

// In table header, conditionally render private columns:
{showPrivateFields && (
  <>
    <Th>Cost Center</Th>
    <Th>Evaluator</Th>
    <Th>Budget</Th>
    <Th>Status</Th>
  </>
)}

// In table body, conditionally render private cells:
{showPrivateFields && (
  <>
    <Td>{(grant as PrivateGrantRecord).costCenter || '-'}</Td>
    <Td>{(grant as PrivateGrantRecord).grantEvaluator || '-'}</Td>
    <Td>{(grant as PrivateGrantRecord).budgetAmount?.toLocaleString() || '-'}</Td>
    <Td>{(grant as PrivateGrantRecord).status || '-'}</Td>
  </>
)}
```

### 5. Internal Grants Page

```typescript
// src/pages/grants/internal.tsx
import { GrantsExplorer } from '../../components/grants/GrantsExplorer';
import { getPrivateGrants } from '../../lib/sf/grants';

export default function InternalGrantsPage({ grants }: { grants: PrivateGrantRecord[] }) {
  return (
    <PageSection>
      <PageMetadata title="Internal Grants Explorer" />
      <main>
        <GrantsExplorer grants={grants} showPrivateFields />
      </main>
    </PageSection>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  // Double-check auth cookie (middleware should have already checked)
  const authCookie = req.cookies['esp-internal-auth'];
  if (!authCookie) {
    return { redirect: { destination: '/api/auth/google', permanent: false } };
  }

  const grants = await getPrivateGrants();
  return { props: { grants } };
};
```

## Acceptance Criteria

### Authentication
- [ ] `/grants/internal` redirects unauthenticated users to Google OAuth
- [ ] Only `@ethereum.org` emails can access the page
- [ ] Non-org emails see unauthorized message
- [ ] Auth cookie persists for 7 days
- [ ] Logout clears cookie

### Private Data
- [ ] Extended Salesforce fields fetched correctly
- [ ] Cost Center, Evaluator, Budget, Status columns visible
- [ ] Private fields shown in detail modal
- [ ] Public grants page unchanged

### UI/UX
- [ ] Same look and feel as public explorer
- [ ] All existing features work (search, filter, sort, pagination)
- [ ] Table handles additional columns responsively
- [ ] Fixed column widths prevent layout shift

## Files to Modify/Create

| File | Change |
|------|--------|
| `middleware.ts` | NEW - Route protection |
| `src/pages/api/auth/google.ts` | NEW - OAuth redirect |
| `src/pages/api/auth/callback.ts` | NEW - OAuth callback |
| `src/pages/grants/internal.tsx` | NEW - Internal page |
| `src/pages/grants/internal/unauthorized.tsx` | NEW - Error page |
| `src/lib/sf/grants.ts` | EXTEND - Add getPrivateGrants() |
| `src/types/grants.ts` | EXTEND - Add private field types |
| `src/components/grants/GrantsTable.tsx` | MODIFY - Add showPrivateFields |
| `src/components/grants/GrantsExplorer.tsx` | MODIFY - Pass showPrivateFields |
| `src/components/grants/GrantDetailModal.tsx` | MODIFY - Show private fields |

## Environment Variables

```bash
# Add to .env.local
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXT_PUBLIC_BASE_URL=http://localhost:3000  # or production URL
```

## Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create OAuth 2.0 credentials
3. Add authorized redirect URI: `https://your-domain.com/api/auth/callback`
4. Copy Client ID and Secret to `.env.local`

## Pre-Implementation Checklist

Before coding, verify these Salesforce field names:
- [ ] Cost Center field API name (is it `Cost_Center_Lookup__c` or `Cost_Center__c`?)
- [ ] Grant Evaluator field API name
- [ ] Grant Round field API name
- [ ] Budget/Amount field API name
- [ ] Status field values (picklist options)

## Out of Scope

- Role-based permissions (all @ethereum.org users have same access)
- Edit/create grant functionality
- Data export to CSV
- Audit logging

## Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Separate app vs route | Protected route | Same codebase, no component duplication, single deployment |
| Auth library | Simple API routes | No new dependency for basic OAuth flow |
| Component sharing | Extend with prop | One source of truth, no drift |
| Data fetching | getServerSideProps | Real-time data for internal use |

## References

### Internal
- Public Grants Explorer: `src/pages/grants/index.tsx`
- Salesforce integration: `src/lib/sf/grants.ts`
- Grant types: `src/types/grants.ts`
- Existing components: `src/components/grants/`

### External
- [Google OAuth 2.0](https://developers.google.com/identity/protocols/oauth2/web-server)
- [Next.js Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)
