'use client';
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div className="flex flex-col items-center gap-6 p-8 rounded-2xl border border-black/10 dark:border-white/10">
      <p className="text-6xl font-bold tabular-nums">{count}</p>
      <div className="flex gap-4">
        <button
          onClick={() => setCount(c => c + 1)}
          className="px-6 py-2 rounded-lg bg-foreground text-background font-semibold hover:opacity-80 transition-opacity"
        >
          +1
        </button>
        <button
          onClick={() => setCount(0)}
          className="px-6 py-2 rounded-lg border border-black/20 dark:border-white/20 font-semibold hover:opacity-80 transition-opacity"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
