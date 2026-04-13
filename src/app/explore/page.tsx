import Link from 'next/link';
import { fetchPages } from '@/lib/api';
import { typeLabel, typeColor } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function ExplorePage() {
  const pages = await fetchPages();

  const byType: Record<string, any[]> = {};
  for (const p of pages) {
    (byType[p.type] = byType[p.type] || []).push(p);
  }
  const sections = Object.entries(byType).sort((a, b) => b[1].length - a[1].length);

  return (
    <main className="max-w-4xl mx-auto px-6 py-6">
      <h2 className="text-xl font-bold mb-6">📚 按类型浏览</h2>
      {sections.map(([type, items]) => (
        <div key={type} className="bg-white rounded-lg p-5 mb-4 border border-gray-50">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <span className={`${typeColor(type)} text-white text-xs px-2.5 py-0.5 rounded-full`}>
              {typeLabel(type)}
            </span>
            <span className="text-gray-400 text-sm">{items.length} 篇</span>
          </h3>
          <div className="space-y-1">
            {items.map((p: any) => (
              <div key={p.slug}>
                <Link href={`/page/${encodeURIComponent(p.slug)}`}
                  className="text-sm text-gray-700 hover:text-blue-600">{p.title}</Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </main>
  );
}
