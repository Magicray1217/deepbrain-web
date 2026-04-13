import Link from 'next/link';
import { typeLabel, typeColor, formatDate, excerpt } from '@/lib/utils';

interface Page {
  slug: string;
  type: string;
  title: string;
  compiled_truth?: string;
  updated_at?: string;
  tags?: string[];
}

export function PageCard({ page, tags }: { page: Page; tags?: string[] }) {
  return (
    <div className="bg-white rounded-lg p-5 mb-3 hover:shadow-md transition-shadow duration-200 border border-gray-50">
      <Link href={`/page/${encodeURIComponent(page.slug)}`} className="block">
        <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors mb-2 leading-snug">
          {page.title}
        </h3>
      </Link>
      <p className="text-gray-500 text-sm leading-relaxed mb-3 line-clamp-3">
        {excerpt(page.compiled_truth)}...
      </p>
      <div className="flex items-center gap-3 flex-wrap">
        <span className={`${typeColor(page.type)} text-white text-xs px-2.5 py-0.5 rounded-full`}>
          {typeLabel(page.type)}
        </span>
        {formatDate(page.updated_at) && (
          <span className="text-gray-400 text-xs">{formatDate(page.updated_at)}</span>
        )}
        {(tags || page.tags || []).slice(0, 3).map(t => (
          <Link key={t} href={`/tag/${encodeURIComponent(t)}`}
            className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors">
            #{t}
          </Link>
        ))}
      </div>
    </div>
  );
}
