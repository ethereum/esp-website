import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Round, RoundFrontmatter } from '../../types';

const ROUNDS_DIRECTORY = path.join(process.cwd(), 'content/rounds');

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
 * Get all active rounds
 */
export function getActiveRounds(): RoundFrontmatter[] {
  const slugs = getAllRoundSlugs();
  const rounds: RoundFrontmatter[] = [];

  for (const slug of slugs) {
    const round = getRoundBySlug(slug);
    if (round && round.status === 'active') {
      const { content: _, ...frontmatter } = round;
      rounds.push(frontmatter);
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
