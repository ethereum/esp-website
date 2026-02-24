import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Round, RoundFrontmatter } from '../../types';

const ROUNDS_DIRECTORY = path.join(process.cwd(), 'content/rounds');

export type RoundStatus = 'active' | 'closed' | 'upcoming';

/**
 * Convert a date string to AoE (Anywhere on Earth) timestamp.
 * AoE is UTC-12, the last timezone on Earth.
 * @param dateStr - Date in YYYY-MM-DD format
 * @param startOfDay - If true, returns 00:00:00 AoE; if false, returns 23:59:59 AoE
 */
function toAoETimestamp(dateStr: string, startOfDay: boolean): number {
  const time = startOfDay ? '00:00:00' : '23:59:59';
  return new Date(`${dateStr}T${time}-12:00`).getTime();
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
  const startAoE = toAoETimestamp(effectiveStartDate || startDate, true);
  const endAoE = toAoETimestamp(effectiveEndDate || endDate, false);

  if (now < startAoE) return 'upcoming';
  if (now > endAoE) return 'closed';
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
