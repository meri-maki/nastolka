import type { CategoryId, Level } from '../types';
import { questionsFor } from '../data';

const LEVEL_LABELS: Record<Level, string> = {
  1: 'Лёгкий',
  2: 'Средний',
  3: 'Сложный',
};

const LEVEL_NUMERALS: Record<Level, string> = { 1: 'I', 2: 'II', 3: 'III' };

interface Props {
  category: CategoryId;
  used: Set<string>;
  onSelect: (level: Level) => void;
}

export function LevelPicker({ category, used, onSelect }: Props) {
  return (
    <div className="level-picker">
      {([1, 2, 3] as Level[]).map((level) => {
        const all = questionsFor(category, level);
        const left = all.filter((q) => !used.has(q.id)).length;
        return (
          <button
            key={level}
            className={`level-btn level-btn--${level}`}
            onClick={() => onSelect(level)}
            disabled={left === 0}
          >
            <span className="level-btn__numeral">{LEVEL_NUMERALS[level]}</span>
            <span className="level-btn__label">{LEVEL_LABELS[level]}</span>
            <span className="level-btn__count">
              {left > 0 ? `осталось ${left}` : 'все сыграны'}
            </span>
          </button>
        );
      })}
    </div>
  );
}
