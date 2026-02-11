---
title: MDX-Driven Grant Round Landing Pages
category: architecture
tags:
  - mdx
  - next.js
  - grant-rounds
  - content-management
  - dynamic-routing
  - salesforce-integration
  - isr
problem_statement: Enable non-developers to create and update grant round landing pages by editing MDX content files, eliminating the need for custom React pages and code deployments for each new funding program.
components_affected:
  - content/rounds/*.mdx
  - src/pages/rounds/[slug].tsx
  - src/pages/rounds/[slug]/[item]/index.tsx
  - src/pages/rounds/[slug]/[item]/apply.tsx
  - src/lib/rounds/index.ts
  - src/lib/extractHeadings.ts
  - src/lib/rounds/heroImages.ts
  - src/components/rounds/RoundPage.tsx
  - src/components/rounds/mdxComponents.tsx
  - src/components/forms/GrantInitiativeSelection.tsx
  - src/pages/applicants/open-rounds/index.tsx
  - src/components/Banners.tsx
  - src/types.ts
related_pr: 494
date_documented: 2026-02-02
---

# MDX-Driven Grant Round Landing Pages

## Problem Statement

Previously, creating new grant round landing pages (like Academic Grants, PhD Fellowship Programs) required developers to write custom React pages for each round. This made content updates dependent on developer availability and deployment cycles, slowing down the launch of new funding programs.

### Symptoms Before This Solution

1. **Code-dependent content**: Each grant round required a custom-built page with hardcoded content
2. **Slow iteration**: Content team couldn't update round information without developer intervention
3. **No unified round management**: Active rounds were managed in scattered locations
4. **Duplicate code**: RFP and Wishlist selection components had significant code duplication
5. **No filtering by round**: Round-specific items weren't isolated from general listings

## Solution Architecture

The solution introduces a **content-driven architecture** using MDX files that enables non-developers to create and update grant round pages by editing markdown files in `content/rounds/`.

### Component Relationships

```
content/rounds/[slug].mdx
        │
        ▼
src/lib/rounds/index.ts          (reads MDX files, parses frontmatter)
        │
        ▼
src/pages/rounds/[slug].tsx      (dynamic routing, getStaticPaths/Props)
        │
        ├── src/lib/extractHeadings.ts    (parses markdown for sidebar)
        │
        ├── src/lib/rounds/heroImages.ts  (maps slug to hero images)
        │
        ├── src/lib/sf/index.ts           (fetches items by tags from Salesforce)
        │
        └── src/components/rounds/
                ├── RoundPage.tsx           (renders MDX + item selection)
                ├── RoundItemLayout.tsx     (layout for item pages)
                └── mdxComponents.tsx       (Chakra UI styled MDX elements)
```

### Route Structure

```
/rounds/[slug]                    -> Main landing page (MDX content + item selection)
/rounds/[slug]/[item]/           -> Item detail page (RFP/Wishlist details)
/rounds/[slug]/[item]/apply      -> Application form page
/applicants/open-rounds          -> Listing of all active rounds
```

## Key Implementation Details

### 1. MDX Content Structure

Each round is defined in `content/rounds/{slug}.mdx`:

```mdx
---
slug: 'phdfp26'
name: 'PhD Fellowship Program'
description: 'A fellowship-style grant program supporting Ethereum-related academic research.'
status: 'active'
tags:
  - PhDFP
heroImage: '/images/phd-fellowship-26-hero.jpeg'
colorBrand: 'phdFellowship2026Hero'
startDate: '2026-02-02'
endDate: '2026-03-23'
---

## About

The Ethereum Foundation is sponsoring the 2026 PhD Fellowship Program...

## Requirements

- All applicants must be actively enrolled in a PhD Program...

## Deadline

The application window opens on **Monday, February 2nd, 2026**...
```

### 2. Round Content Library

`src/lib/rounds/index.ts` provides utilities for reading MDX files:

```typescript
// Get all slugs for static path generation
export function getAllRoundSlugs(): string[] {
  const files = fs.readdirSync(ROUNDS_DIRECTORY);
  return files
    .filter(file => file.endsWith('.mdx'))
    .map(file => file.replace(/\.mdx$/, ''));
}

// Parse MDX file and return content + frontmatter
export function getRoundBySlug(slug: string): Round | null {
  const filePath = path.join(ROUNDS_DIRECTORY, `${slug}.mdx`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  return { ...(data as RoundFrontmatter), content };
}

// Get only active rounds (for Open Rounds listing)
export function getActiveRounds(): RoundFrontmatter[] {
  return getAllRoundSlugs()
    .map(slug => getRoundBySlug(slug))
    .filter(round => round?.status === 'active');
}
```

### 3. Dynamic Routing with ISR

`src/pages/rounds/[slug].tsx` uses Next.js static generation:

```typescript
export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getAllRoundSlugs();
  return {
    paths: slugs.map(slug => ({ params: { slug } })),
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const round = getRoundBySlug(slug);
  const { content, ...frontmatter } = round;

  // Extract headings for sidebar
  const headings = extractHeadings(content);
  const sidebarLinks = headingsToSidebarLinks(headings);

  // Serialize MDX with rehype-slug for heading IDs
  const mdxSource = await serialize(content, {
    mdxOptions: { rehypePlugins: [rehypeSlug] }
  });

  // Fetch items from Salesforce filtered by tags
  const items = await getGrantInitiativeItemsByTag(frontmatter.tags);

  return {
    props: { frontmatter, mdxSource, items, sidebarLinks },
    revalidate: 3600  // ISR: revalidate every hour
  };
};
```

### 4. Sidebar Auto-Generation

`src/lib/extractHeadings.ts` parses MDX for headings:

```typescript
export const extractHeadings = (markdown: string): HeadingData[] => {
  const slugger = new GithubSlugger();
  const headings: HeadingData[] = [];
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;

  let match;
  while ((match = headingRegex.exec(markdown)) !== null) {
    const depth = match[1].length;
    const text = match[2].trim();
    const slug = slugger.slug(text);  // Matches rehype-slug output
    headings.push({ depth, text, slug });
  }
  return headings;
};
```

### 5. Tag-Based Item Filtering

Round items are fetched from Salesforce using tags:

```typescript
// In RoundPage.tsx
<GrantInitiativeSelection
  items={items}
  getItemUrl={getItemUrl}
  hiddenTags={tags}  // Hide round-specific tags from filter UI
/>
```

Items tagged with round-specific tags (e.g., `PhDFP`) are:
- Displayed on the round page
- Hidden from regular RFP/Wishlist listings
- Linked to round-scoped URLs: `/rounds/{slug}/{item-id}`

## Gotchas - Things to Watch Out For

### 1. MDX Frontmatter Fields Are All Required

TypeScript won't catch missing fields because `gray-matter` returns untyped data. All fields must be present:

| Field | Required | Notes |
|-------|----------|-------|
| `slug` | Yes | Must match filename |
| `name` | Yes | Display name |
| `description` | Yes | Used in meta tags |
| `status` | Yes | Must be `'active'` or `'closed'` |
| `tags` | Yes | Array matching Salesforce `Tags__c` |
| `heroImage` | Yes | Path to public image |
| `colorBrand` | Yes | Must exist in theme colors |
| `startDate` | Yes | ISO format `YYYY-MM-DD` |
| `endDate` | Yes | ISO format `YYYY-MM-DD` |

### 2. Hero Images Require Manual Registration

Adding an MDX file is NOT enough. You must also:

1. Add the image to `/public/images/`
2. Import and register in `src/lib/rounds/heroImages.ts`:

```typescript
export const heroImages: Record<string, HeroImages> = {
  yourslug: {
    desktop: yourDesktopImage,
    mobile: yourMobileImage
  }
};
```

### 3. Tags Must Match Salesforce Exactly

Tags are case-sensitive and must match Salesforce `Tags__c` values exactly:

```
Salesforce: "PhDFP;Research"
MDX tags:   ['PhDFP'] or ['Research'] or ['PhDFP', 'Research']
```

### 4. Color Brand Must Exist in Theme

`colorBrand` must be defined in `src/theme/foundations/colors.ts`:

```typescript
yourColorKey: {
  titleWhiteBox: 'rgba(255, 255, 255, 0.6)',
  bgGradient: {
    start: '#yourColor',
    end: 'rgba(235, 209, 251, 0)'
  }
}
```

### 5. Banner is Hardcoded

The active round banner in `src/components/Banners.tsx` requires manual updates:

```typescript
const ACTIVE_ROUND = {
  slug: 'phdfp26',
  name: 'PhD Fellowship Program'
};
```

### 6. ISR Revalidation Delay

Pages use 1-hour ISR. Salesforce changes won't appear immediately. Trigger a rebuild for urgent updates.

### 7. Heading IDs Must Match

Sidebar uses `github-slugger` which must match `rehype-slug`. Don't manually add HTML IDs in MDX.

## Checklist for Adding a New Round

### Pre-Development
- [ ] Confirm Salesforce `Tags__c` values for items
- [ ] Obtain hero images (desktop and mobile)
- [ ] Define color palette for hero section

### MDX Content File
- [ ] Create `content/rounds/{slug}.mdx`
- [ ] Fill all required frontmatter fields
- [ ] Write MDX content with proper headings (h2, h3)

### Images
- [ ] Add hero images to `/public/images/`
- [ ] Import images in `src/lib/rounds/heroImages.ts`
- [ ] Add mapping for the round slug

### Theme
- [ ] Add color entry in `src/theme/foundations/colors.ts`

### Banner (if promoting this round)
- [ ] Update `ACTIVE_ROUND` in `src/components/Banners.tsx`

### Testing
- [ ] Visit `/rounds/{slug}` locally
- [ ] Verify hero displays on desktop and mobile
- [ ] Verify sidebar links work
- [ ] Verify Salesforce items appear
- [ ] Verify items hidden from regular listings
- [ ] Run `npm run build` and `npm run type-check`

### Post-Launch
- [ ] Update `status` to `'closed'` when round ends
- [ ] Update or remove banner

## TypeScript Interfaces

```typescript
// src/types.ts
export type RoundStatus = 'active' | 'closed';

export interface RoundFrontmatter {
  slug: string;
  name: string;
  description: string;
  status: RoundStatus;
  tags: string[];
  heroImage: string;
  colorBrand: string;
  startDate: string;
  endDate: string;
}

export interface Round extends RoundFrontmatter {
  content: string;
}

export interface SidebarLink {
  text: string;
  href: string;
}
```

## Related Files

| File | Purpose |
|------|---------|
| `content/rounds/{slug}.mdx` | Round content and configuration |
| `src/lib/rounds/index.ts` | Round utilities |
| `src/lib/rounds/heroImages.ts` | Image mapping |
| `src/lib/extractHeadings.ts` | Heading extraction |
| `src/theme/foundations/colors.ts` | Color definitions |
| `src/components/Banners.tsx` | Active round banner |
| `src/types.ts` | TypeScript interfaces |
| `src/pages/rounds/[slug].tsx` | Dynamic round page |
| `src/pages/rounds/[slug]/[item]/index.tsx` | Item detail page |
| `src/pages/rounds/[slug]/[item]/apply.tsx` | Application form |
| `src/components/rounds/RoundPage.tsx` | Page layout |
| `src/components/rounds/mdxComponents.tsx` | MDX styling |
| `src/pages/applicants/open-rounds/index.tsx` | Open rounds listing |

## Related PR

- [PR #494: feat: Grant round landing pages with PhD Fellowship Program launch](https://github.com/ethereum/esp-website/pull/494)
