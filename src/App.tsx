import { useCallback, useState } from 'react';
import { IconArrowLeft, IconMoodSad, IconRefresh } from '@tabler/icons-react';
import type { CategoryId, Level, Question } from './types';
import { CATEGORY_TITLES, pickRandomUnused } from './data';
import { useUsedQuestions } from './hooks/useUsedQuestions';
import { CategoryGrid } from './components/CategoryGrid';
import { LevelPicker } from './components/LevelPicker';
import { QuestionCard } from './components/QuestionCard';
import { ResetButton } from './components/ResetButton';

type Screen =
  | { name: 'home' }
  | { name: 'level'; category: CategoryId }
  | { name: 'question'; category: CategoryId; level: Level; question: Question | null };

export default function App() {
  const { used, markUsed, reset } = useUsedQuestions();
  const [screen, setScreen] = useState<Screen>({ name: 'home' });

  const showQuestion = useCallback(
    (category: CategoryId, level: Level) => {
      const question = pickRandomUnused(category, level, used);
      if (question) markUsed(question.id);
      setScreen({ name: 'question', category, level, question });
    },
    [used, markUsed],
  );

  const goHome = () => setScreen({ name: 'home' });

  return (
    <div className="app">
      <header className="app__header">
        {screen.name !== 'home' ? (
          <button
            className="btn btn--ghost btn--back"
            onClick={() =>
              screen.name === 'level' ? goHome() : setScreen({ name: 'level', category: screen.category })
            }
          >
            <IconArrowLeft size={20} stroke={2} aria-hidden />
            Назад
          </button>
        ) : (
          <span className="app__brand">Вопросики к игре "Умнее всех"</span>
        )}
        {screen.name !== 'home' && (
          <span className="app__category">{CATEGORY_TITLES[screen.category]}</span>
        )}
      </header>

      <main className="app__main">
        {screen.name === 'home' && (
          <>
            <p className="app__tagline">Выбери категорию — и вперёд к финалу!</p>
            <CategoryGrid used={used} onSelect={(category) => setScreen({ name: 'level', category })} />
            <ResetButton usedCount={used.size} onReset={reset} />
          </>
        )}

        {screen.name === 'level' && (
          <LevelPicker
            category={screen.category}
            used={used}
            onSelect={(level) => showQuestion(screen.category, level)}
          />
        )}

        {screen.name === 'question' &&
          (screen.question ? (
            <>
              <QuestionCard question={screen.question} />
              <div className="question-actions">
                <button
                  className="btn btn--primary"
                  onClick={() => showQuestion(screen.category, screen.level)}
                >
                  <IconRefresh size={20} stroke={2} aria-hidden />
                  Заменить вопрос
                </button>
                <button className="btn btn--ghost" onClick={goHome}>
                  К категориям
                </button>
              </div>
            </>
          ) : (
            <div className="empty-state">
              <IconMoodSad size={48} stroke={1.5} aria-hidden />
              <p>
                Вопросы этого уровня закончились! Выбери другой уровень или начни новую игру,
                чтобы сбросить историю.
              </p>
              <button className="btn btn--primary" onClick={goHome}>
                К категориям
              </button>
            </div>
          ))}
      </main>
    </div>
  );
}
