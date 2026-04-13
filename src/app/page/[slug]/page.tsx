import Link from 'next/link';
import { fetchPage } from '@/lib/api';
import { typeLabel, typeColor, formatDate, markdownToHtml } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function PageDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await fetchPage(decodeURIComponent(slug));

  if (!page) {
    return (
      <main className="max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="text-5xl mb-4">🔍</div>
        <p className="text-gray-400">页面不存在</p>
      </main>
    );
  }

  const bodyHtml = markdownToHtml(page.compiled_truth || '');
  const allRelated = [...(page.links || []), ...(page.backlinks || [])];

  return (
    <main className="max-w-6xl mx-auto px-6 py-6 flex gap-6">
      <article className="flex-1 min-w-0">
        <div className="mb-6">
          <h1 className="text-2xl font-bold leading-snug mb-3">{page.title}</h1>
          <div className="flex items-center gap-3 flex-wrap text-sm">
            <span className={`${typeColor(page.type)} text-white text-xs px-2.5 py-0.5 rounded-full`}>
              {typeLabel(page.type)}
            </span>
            <span className="text-gray-400">{formatDate(page.updated_at)}</span>
            {(page.tags || []).map((t: string) => (
              <Link key={t} href={`/tag/${encodeURIComponent(t)}`}
                className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full hover:bg-blue-50 hover:text-blue-600">
                #{t}
              </Link>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-lg p-8 border border-gray-50"
          dangerouslySetInnerHTML={{ __html: `<p>${bodyHtml}</p>` }} />
      </article>

      <aside className="w-72 flex-shrink-0 hidden lg:block">
        {(page.tags || []).length > 0 && (
          <div className="bg-white rounded-lg p-5 mb-4 border border-gray-50">
            <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">🏷️ 标签</h3>
            <div className="flex flex-wrap gap-1.5">
              {page.tags.map((t: string) => (
                <Link key={t} href={`/tag/${encodeURIComponent(t)}`}
                  className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full hover:bg-blue-50 hover:text-blue-600">
                  #{t}
                </Link>
              ))}
            </div>
          </div>
        )}
        {allRelated.length > 0 && (
          <div className="bg-white rounded-lg p-5 border border-gray-50">
            <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">🔗 关联知识</h3>
            <ul className="space-y-2">
              {allRelated.map((l: any, i: number) => {
                const target = l.source === page.slug ? l.target : l.source;
                return (
                  <li key={i}>
                    <Link href={`/page/${encodeURIComponent(target)}`}
                      className="text-sm text-gray-700 hover:text-blue-600">{target}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </aside>
    </main>
  );
}
