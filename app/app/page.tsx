import Counter from '@/components/Counter';

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-8 p-8">
      <h1 className="text-2xl font-semibold tracking-tight">Counter</h1>
      <Counter />
    </main>
  );
}
