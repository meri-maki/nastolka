import type { CategoryId, Level, Question, Reward } from '../types';

export interface QuestionSpec {
  q: string;
  options: [string, string, string];
  correct: 0 | 1 | 2;
  explain: string;
  /** необязательное переопределение награды: [жетоны, ходы] */
  reward?: [number, number];
}

export type CardSpec = [QuestionSpec, QuestionSpec, QuestionSpec];

// Пулы наград в духе оригинальных карточек: чем сложнее вопрос, тем щедрее.
const REWARD_POOLS: Record<Level, [number, number][]> = {
  1: [
    [2, 1],
    [1, 1],
    [3, 0],
    [1, 2],
    [2, 0],
  ],
  2: [
    [2, 2],
    [0, 3],
    [1, 2],
    [3, 1],
    [2, 1],
  ],
  3: [
    [2, 2],
    [2, 3],
    [1, 3],
    [3, 2],
    [0, 4],
  ],
};

function rewardFor(level: Level, cardIndex: number, override?: [number, number]): Reward {
  const [tokens, moves] = override ?? REWARD_POOLS[level][cardIndex % REWARD_POOLS[level].length];
  return { tokens, moves };
}

/** Разворачивает карточки (3 вопроса от лёгкого к сложному) в плоский список вопросов */
export function makeQuestions(category: CategoryId, prefix: string, cards: CardSpec[]): Question[] {
  return cards.flatMap((card, i) =>
    card.map((spec, levelIndex) => {
      const level = (levelIndex + 1) as Level;
      return {
        id: `${prefix}-${String(i + 1).padStart(2, '0')}-${level}`,
        category,
        level,
        question: spec.q,
        options: spec.options,
        correctIndex: spec.correct,
        explanation: spec.explain,
        reward: rewardFor(level, i, spec.reward),
      } satisfies Question;
    }),
  );
}
