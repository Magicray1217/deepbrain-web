export function typeLabel(type: string) {
  const map: Record<string, string> = {
    paper: '📄 论文', analysis: '📊 分析', product: '📦 产品',
    report: '📋 报告', reference: '📖 参考', strategy: '🎯 战略',
    design: '🎨 设计', document: '📝 文档', note: '📝 笔记',
  };
  return map[type] || '📝 ' + type;
}

export function typeColor(type: string) {
  const map: Record<string, string> = {
    paper: 'bg-blue-500', analysis: 'bg-green-500', product: 'bg-purple-500',
    report: 'bg-orange-500', reference: 'bg-cyan-500', strategy: 'bg-red-500',
    design: 'bg-pink-500', document: 'bg-gray-500',
  };
  return map[type] || 'bg-gray-500';
}

export function formatDate(d: string | Date | null | undefined) {
  if (!d) return '';
  return new Date(d).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' });
}

export function excerpt(text: string | null | undefined, len = 200) {
  if (!text) return '';
  return text.replace(/^#.+$/gm, '').replace(/[#*`\[\]]/g, '').trim().slice(0, len);
}

export function markdownToHtml(md: string): string {
  return md
    .replace(/^#### (.+)$/gm, '<h4 class="text-base font-semibold mt-4 mb-2">$1</h4>')
    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold mt-6 mb-3">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold mt-8 mb-4 pb-2 border-b border-gray-100">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold mt-8 mb-4 pb-3 border-b border-gray-200">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-gray-900">$1</strong>')
    .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1.5 py-0.5 rounded text-sm text-red-600">$1</code>')
    .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc">$1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li class="ml-4 list-decimal">$2</li>')
    .replace(/\n\n/g, '</p><p class="my-2">')
    .replace(/\n/g, '<br>');
}
