const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export async function fetchPages(tag?: string): Promise<any[]> {
  const url = tag ? `${API}/api/pages?tag=${encodeURIComponent(tag)}` : `${API}/api/pages`;
  const res = await fetch(url, { cache: 'no-store' });
  return res.json();
}

export async function fetchPage(slug: string): Promise<any> {
  const res = await fetch(`${API}/api/pages/${encodeURIComponent(slug)}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export async function fetchStats(): Promise<any> {
  const res = await fetch(`${API}/api/stats`, { cache: 'no-store' });
  return res.json();
}

export async function fetchTags(): Promise<{ tag: string; count: number }[]> {
  const res = await fetch(`${API}/api/tags`, { cache: 'no-store' });
  return res.json();
}

export async function fetchSearch(q: string): Promise<any[]> {
  const res = await fetch(`${API}/api/search?q=${encodeURIComponent(q)}`, { cache: 'no-store' });
  return res.json();
}
