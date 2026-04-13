import Link from 'next/link';
import { getTags } from '@/lib/data';

export default function TagsPage() {
  const tags = getTags();

  return (
    <main className="max-w-6xl mx-auto px-6 py-6">
      <h2 className="text-xl font-bold mb-6">🏷️ 标签 ({tags.length})</h2>
      <div className="bg-white rounded-lg p-8 border border-gray-50 flex flex-wrap gap-2 leading-loose">
        {tags.map(t => (
          <Link key={t.tag} href={`/tag/${encodeURIComponent(t.tag)}`}
            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors"
            style={{ fontSize: `${Math.min(1.6, 0.85 + t.count * 0.08)}rem` }}>
            {t.tag} <span className="text-gray-400 text-sm">{t.count}</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
