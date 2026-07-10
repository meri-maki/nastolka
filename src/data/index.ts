import type { CategoryId, Level, Question } from '../types';
import { culture } from './culture';
import { logic } from './logic';
import { science } from './science';
import { general } from './general';
import { geography } from './geography';
import { astronomy } from './astronomy';

export const CATEGORY_ORDER: CategoryId[] = [
  'culture',
  'logic',
  'science',
  'general',
  'geography',
  'astronomy',
];

export const CATEGORY_TITLES: Record<CategoryId, string> = {
  culture: 'Культура',
  logic: 'Логика',
  science: 'Естествознание',
  general: 'Общие знания',
  geography: 'География',
  astronomy: 'Астрономия',
};

export const ALL_QUESTIONS: Question[] = [
  ...culture,
  ...logic,
  ...science,
  ...general,
  ...geography,
  ...astronomy,
];

export function questionsFor(category: CategoryId, level?: Level): Question[] {
  return ALL_QUESTIONS.filter(
    (q) => q.category === category && (level === undefined || q.level === level),
  );
}

export function pickRandomUnused(
  category: CategoryId,
  level: Level,
  used: Set<string>,
): Question | null {
  const pool = questionsFor(category, level).filter((q) => !used.has(q.id));
  if (pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}
