import { useState } from 'react';
import { IconRefresh } from '@tabler/icons-react';

interface Props {
  usedCount: number;
  onReset: () => void;
}

export function ResetButton({ usedCount, onReset }: Props) {
  const [confirming, setConfirming] = useState(false);

  if (usedCount === 0) return null;

  if (confirming) {
    return (
      <div className="reset-confirm">
        <span>Сбросить историю ({usedCount})?</span>
        <button
          className="btn btn--danger"
          onClick={() => {
            onReset();
            setConfirming(false);
          }}
        >
          Да, сбросить
        </button>
        <button className="btn btn--ghost" onClick={() => setConfirming(false)}>
          Отмена
        </button>
      </div>
    );
  }

  return (
    <button className="btn btn--ghost reset-btn" onClick={() => setConfirming(true)}>
      <IconRefresh size={18} stroke={2} aria-hidden />
      Новая игра
    </button>
  );
}
