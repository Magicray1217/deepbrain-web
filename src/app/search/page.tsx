import { fetchSearch } from '@/lib/api';
import { PageCard } from '@/components/PageCard';

export const dynamic = 'force-dynamic';

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const query = q || '';
  const results = query ? await fetchSearch(query) : [];

  return (
    <main className="max-w-4xl mx-auto px-6 py-6">
      <h2 className="text-xl font-bold mb-4">🔍 搜索{query ? ` "${query}"` : ''}</h2>
      <form action="/search" method="GET" className="mb-6">
        <input name="q" defaultValue={query} placeholder="用自然语言搜索你的知识..."
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-base outline-none focus:border-blue-400 transition-colors"
          autoFocus />
      </form>
      {query && results.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <div className="text-4xl mb-3">🔍</div>
          没有找到相关知识
        </div>
      )}
      {results.map((r: any, i: number) => (
        <div key={i} className="mb-1">
          <PageCard page={{ slug: r.slug, type: r.type || 'note', title: r.title || r.slug, compiled_truth: r.content }} />
        </div>
      ))}
    </main>
  );
}
