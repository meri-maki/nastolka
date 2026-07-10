import { useCallback, useState } from 'react';

const STORAGE_KEY = 'umnee-vseh:used';

function load(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? new Set(parsed.filter((x) => typeof x === 'string')) : new Set();
  } catch {
    return new Set();
  }
}

function save(used: Set<string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...used]));
  } catch {
    // localStorage недоступен (приватный режим и т.п.) — работаем в памяти
  }
}

export function useUsedQuestions() {
  const [used, setUsed] = useState<Set<string>>(load);

  const markUsed = useCallback((id: string) => {
    setUsed((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      save(next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setUsed(new Set());
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  return { used, markUsed, reset };
}
