import { fetchPages } from '@/lib/api';
import { PageCard } from '@/components/PageCard';

export const dynamic = 'force-dynamic';

export default async function TagDetail({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  const pages = await fetchPages(decoded);

  return (
    <main className="max-w-4xl mx-auto px-6 py-6">
      <h2 className="text-xl font-bold mb-2">#{decoded}</h2>
      <p className="text-gray-400 text-sm mb-6">{pages.length} 篇知识</p>
      {pages.map((p: any) => <PageCard key={p.slug} page={p} tags={p.tags} />)}
      {pages.length === 0 && (
        <div className="text-center py-20 text-gray-400">该标签下暂无内容</div>
      )}
    </main>
  );
}
