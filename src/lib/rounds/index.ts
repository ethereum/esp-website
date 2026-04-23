import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Round, RoundFrontmatter } from '../../types';

const ROUNDS_DIRECTORY = path.join(process.cwd(), 'content/rounds');

export type RoundStatus = 'active' | 'closed' | 'upcoming';

/**
 * Resolve a round date string to a UTC epoch-ms.
 *
 * Accepts two formats:
 *   - Date only `YYYY-MM-DD`: interpreted in AoE (UTC-12) as either
 *     00:00:00 (startOfDay=true) or 23:59:59 (startOfDay=false).
 *   - Full ISO datetime containing `T` (e.g. `2026-04-24T01:00:00Z`):
 *     parsed literally. AoE and `startOfDay` are ignored.
 *
 * Use the datetime form when a specific wall-clock close time is needed
 * (e.g. a short grace period that does not align to AoE day boundaries).
 */
function resolveRoundTimestamp(value: string, startOfDay: boolean): number {
  if (value.includes('T')) {
    return new Date(value).getTime();
  }
  const time = startOfDay ? '00:00:00' : '23:59:59';
  return new Date(`${value}T${time}-12:00`).getTime();
}

/**
 * Compute round status from dates using AoE timezone.
 * Uses effectiveStartDate/effectiveEndDate if provided, otherwise falls back to startDate/endDate.
 */
export function computeRoundStatus(
  startDate: string,
  endDate: string,
  effectiveStartDate?: string,
  effectiveEndDate?: string
): RoundStatus {
  const now = Date.now();
  const start = resolveRoundTimestamp(effectiveStartDate || startDate, true);
  const end = resolveRoundTimestamp(effectiveEndDate || endDate, false);

  if (now < start) return 'upcoming';
  if (now > end) return 'closed';
  return 'active';
}

/**
 * Get all round slugs for static path generation
 */
export function getAllRoundSlugs(): string[] {
  if (!fs.existsSync(ROUNDS_DIRECTORY)) {
    return [];
  }

  const files = fs.readdirSync(ROUNDS_DIRECTORY);
  return files
    .filter(file => file.endsWith('.mdx'))
    .map(file => file.replace(/\.mdx$/, ''));
}

/**
 * Get a round by its slug
 */
export function getRoundBySlug(slug: string): Round | null {
  const filePath = path.join(ROUNDS_DIRECTORY, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    ...(data as RoundFrontmatter),
    content
  };
}

/**
 * Get all active rounds (based on AoE date logic)
 */
export function getActiveRounds(): RoundFrontmatter[] {
  const slugs = getAllRoundSlugs();
  const rounds: RoundFrontmatter[] = [];

  for (const slug of slugs) {
    const round = getRoundBySlug(slug);
    if (round) {
      const status = computeRoundStatus(
        round.startDate,
        round.endDate,
        round.effectiveStartDate,
        round.effectiveEndDate
      );
      if (status === 'active') {
        const { content: _, ...frontmatter } = round;
        rounds.push(frontmatter);
      }
    }
  }

  return rounds;
}

/**
 * Get all rounds (active and closed)
 */
export function getAllRounds(): RoundFrontmatter[] {
  const slugs = getAllRoundSlugs();
  const rounds: RoundFrontmatter[] = [];

  for (const slug of slugs) {
    const round = getRoundBySlug(slug);
    if (round) {
      const { content: _, ...frontmatter } = round;
      rounds.push(frontmatter);
    }
  }

  return rounds;
}
