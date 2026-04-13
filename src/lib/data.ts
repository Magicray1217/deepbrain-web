import data from '../../public/data.json';

export interface PageData {
  slug: string;
  type: string;
  title: string;
  compiled_truth?: string;
  updated_at?: string;
  tags: string[];
  links: any[];
  backlinks: any[];
}

const { pages, stats, tags } = data as { pages: PageData[]; stats: any; tags: { tag: string; count: number }[] };

export function getPages(tag?: string): PageData[] {
  if (!tag) return pages;
  return pages.filter(p => p.tags.includes(tag));
}

export function getPage(slug: string): PageData | undefined {
  return pages.find(p => p.slug === slug);
}

export function getStats() {
  return stats;
}

export function getTags() {
  return tags;
}
