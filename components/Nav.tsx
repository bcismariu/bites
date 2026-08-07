'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TABS = [
  { href: '/', label: 'Today', icon: '📊' },
  { href: '/add', label: 'Log food', icon: '➕' },
  { href: '/suggest', label: 'Suggest', icon: '✨' },
  { href: '/profile', label: 'Profile', icon: '⚙️' },
] as const;

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 inset-x-0 border-t border-neutral-200 bg-white/95 backdrop-blur dark:bg-neutral-900/95 dark:border-neutral-800">
      <div className="max-w-lg mx-auto grid grid-cols-4">
        {TABS.map((tab) => {
          const active = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center gap-0.5 py-2.5 text-xs font-medium ${
                active
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-neutral-500 dark:text-neutral-400'
              }`}
            >
              <span className="text-lg leading-none">{tab.icon}</span>
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
