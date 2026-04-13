import Link from 'next/link';

export function Navbar() {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 flex items-center h-14">
        <Link href="/" className="text-xl font-bold text-blue-600 flex items-center gap-2 hover:opacity-80">
          🧠 DeepBrain
        </Link>
        <nav className="flex gap-1 ml-10">
          <Link href="/" className="px-4 py-2 text-sm text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
            首页
          </Link>
          <Link href="/explore" className="px-4 py-2 text-sm text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
            发现
          </Link>
          <Link href="/tags" className="px-4 py-2 text-sm text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
            标签
          </Link>
        </nav>
        <div className="ml-auto">
          <form action="/search" method="GET">
            <input name="q" placeholder="搜索知识..."
              className="w-60 px-4 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-sm outline-none focus:border-blue-400 focus:bg-white focus:w-80 transition-all" />
          </form>
        </div>
      </div>
    </header>
  );
}
