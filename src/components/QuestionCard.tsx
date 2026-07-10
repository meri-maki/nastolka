import { IconCheck, IconCoin, IconShoe, IconInfoCircle } from '@tabler/icons-react';
import type { Question } from '../types';

const LEVEL_NUMERALS = { 1: 'I', 2: 'II', 3: 'III' } as const;

interface Props {
  question: Question;
}

export function QuestionCard({ question }: Props) {
  return (
    <article className="question-card">
      <header className="question-card__header">
        <span className={`level-badge level-badge--${question.level}`}>
          {LEVEL_NUMERALS[question.level]}
        </span>
        <span className="question-card__reward">
          <span className="reward reward--tokens" title="Жетоны подсказок">
            <IconCoin size={18} stroke={2} aria-hidden /> {question.reward.tokens}
          </span>
          <span className="reward reward--moves" title="Ходы вперёд">
            <IconShoe size={18} stroke={2} aria-hidden /> {question.reward.moves}
          </span>
        </span>
      </header>

      <h2 className="question-card__question">{question.question}</h2>

      <ul className="question-card__options">
        {question.options.map((option, i) => {
          const correct = i === question.correctIndex;
          return (
            <li key={i} className={`option ${correct ? 'option--correct' : ''}`}>
              {correct && <IconCheck size={20} stroke={2.5} aria-label="Правильный ответ" />}
              <span>{option}</span>
            </li>
          );
        })}
      </ul>

      <div className="question-card__explanation">
        <IconInfoCircle size={20} stroke={2} aria-hidden />
        <p>{question.explanation}</p>
      </div>
    </article>
  );
}
