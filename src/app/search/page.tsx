'use client';
import { useState } from 'react';
import { getPages } from '@/lib/data';
import { PageCard } from '@/components/PageCard';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const allPages = getPages();

  // Client-side keyword search (no API needed)
  const results = query.length >= 2
    ? allPages.filter(p =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        (p.compiled_truth || '').toLowerCase().includes(query.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 20)
    : [];

  return (
    <main className="max-w-4xl mx-auto px-6 py-6">
      <h2 className="text-xl font-bold mb-4">🔍 搜索</h2>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="搜索知识..."
        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-base outline-none focus:border-blue-400 transition-colors mb-6"
        autoFocus
      />
      {query.length >= 2 && results.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <div className="text-4xl mb-3">🔍</div>
          没有找到相关知识
        </div>
      )}
      {results.map(r => (
        <div key={r.slug} className="mb-1">
          <PageCard page={r} tags={r.tags} />
        </div>
      ))}
    </main>
  );
}
