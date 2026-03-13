'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path + '/');
  };

  return (
    <nav className="bg-[var(--color-background-primary)] border-b border-[var(--color-border-primary)] px-6 py-4 shadow-sm">
      <div className="max-w-[1800px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <img src="/salmon-favicon.ico" alt="Salmon Logo" className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
                Template Tools
              </h1>
              <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                Preview and build email templates
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 ml-8">
            <Link
              href="/preview"
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive('/preview')
                  ? 'bg-[var(--color-brand-primary)] text-white shadow-sm'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-background-secondary)]'
              }`}
            >
              Template Preview
            </Link>
            <Link
              href="/builder"
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive('/builder')
                  ? 'bg-[var(--color-brand-primary)] text-white shadow-sm'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-background-secondary)]'
              }`}
            >
              Email Builder
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
