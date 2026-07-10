export type CategoryId =
  | 'culture'
  | 'logic'
  | 'science'
  | 'general'
  | 'geography'
  | 'astronomy';

export type Level = 1 | 2 | 3;

export interface Reward {
  /** жетоны подсказок */
  tokens: number;
  /** ходы вперёд по треку */
  moves: number;
}

export interface Question {
  id: string; // формат: `<категория>-<номер карточки>-<уровень>`, напр. 'geo-07-2'
  category: CategoryId;
  level: Level;
  question: string;
  options: [string, string, string];
  correctIndex: 0 | 1 | 2;
  explanation: string;
  reward: Reward;
}

/** Карточка как в игре: 3 вопроса от лёгкого к сложному */
export type Card = [Question, Question, Question];
