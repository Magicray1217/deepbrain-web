import Link from 'next/link';
import { fetchPages, fetchStats, fetchTags } from '@/lib/api';
import { PageCard } from '@/components/PageCard';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [pages, stats, tags] = await Promise.all([fetchPages(), fetchStats(), fetchTags()]);
  const feed = pages.slice(0, 20);
  const topTags = tags.slice(0, 20);

  return (
    <main className="max-w-6xl mx-auto px-6 py-6 flex gap-6">
      <div className="flex-1 min-w-0">
        <div className="mb-6">
          <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wide">最新知识</h2>
        </div>
        {feed.map((p: any) => (
          <PageCard key={p.slug} page={p} tags={p.tags} />
        ))}
        {pages.length > 20 && (
          <div className="text-center py-6">
            <Link href="/explore" className="text-blue-500 hover:text-blue-600 text-sm">
              查看全部 {pages.length} 篇 →
            </Link>
          </div>
        )}
      </div>

      <aside className="w-72 flex-shrink-0 hidden lg:block">
        <div className="bg-white rounded-lg p-5 mb-4 border border-gray-50">
          <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">📊 知识库</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-gray-500">知识页面</span><span className="font-semibold">{stats.page_count}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">知识块</span><span className="font-semibold">{stats.chunk_count}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">标签</span><span className="font-semibold">{stats.tag_count}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">链接</span><span className="font-semibold">{stats.link_count}</span></div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-5 border border-gray-50">
          <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">🏷️ 热门标签</h3>
          <div className="flex flex-wrap gap-1.5">
            {topTags.map((t: any) => (
              <Link key={t.tag} href={`/tag/${encodeURIComponent(t.tag)}`}
                className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors">
                {t.tag} <span className="text-gray-400">{t.count}</span>
              </Link>
            ))}
          </div>
        </div>
      </aside>
    </main>
  );
}
