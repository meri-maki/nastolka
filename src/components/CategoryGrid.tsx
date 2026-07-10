import {
  IconMasksTheater,
  IconBulb,
  IconLeaf,
  IconBooks,
  IconWorld,
  IconPlanet,
} from '@tabler/icons-react';
import type { CategoryId } from '../types';
import { CATEGORY_ORDER, CATEGORY_TITLES, questionsFor } from '../data';

const CATEGORY_ICONS: Record<CategoryId, typeof IconBulb> = {
  culture: IconMasksTheater,
  logic: IconBulb,
  science: IconLeaf,
  general: IconBooks,
  geography: IconWorld,
  astronomy: IconPlanet,
};

interface Props {
  used: Set<string>;
  onSelect: (category: CategoryId) => void;
}

export function CategoryGrid({ used, onSelect }: Props) {
  return (
    <div className="category-grid">
      {CATEGORY_ORDER.map((id, i) => {
        const Icon = CATEGORY_ICONS[id];
        const all = questionsFor(id);
        const left = all.filter((q) => !used.has(q.id)).length;
        return (
          <button
            key={id}
            className={`category-tile ${i % 2 === 0 ? 'accent-red' : 'accent-blue'}`}
            onClick={() => onSelect(id)}
            disabled={left === 0}
          >
            <Icon size={32} stroke={1.5} aria-hidden />
            <span className="category-tile__title">{CATEGORY_TITLES[id]}</span>
            <span className="category-tile__count">
              {left > 0 ? `${left} из ${all.length}` : 'все сыграны'}
            </span>
          </button>
        );
      })}
    </div>
  );
}
