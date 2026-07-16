'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useApp } from '@/data/store';
import './BottomNav.css';

const NAV_ITEMS = [
  { path: '/dashboard', label: 'Home', icon: 'home' },
  { path: '/vaccines', label: 'Vaccines', icon: 'vaccines' },
  { path: '/timeline', label: 'Timeline', icon: 'timeline' },
  { path: '/certificates', label: 'Certs', icon: 'certificate' },
  { path: '/profile', label: 'Profile', icon: 'profile' }
];

function NavIcon({ type, active }) {
  const color = active ? 'var(--nav-active)' : 'var(--nav-inactive)';
  
  const icons = {
    home: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    vaccines: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 21h10"/>
        <rect x="10" y="2" width="4" height="4" rx="1"/>
        <path d="M12 6v2"/>
        <path d="M9 10h6l-1 9H10l-1-9z"/>
        <path d="M9 14h6"/>
      </svg>
    ),
    timeline: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="2" x2="12" y2="22"/>
        <circle cx="12" cy="6" r="2.5" fill={active ? color : 'none'}/>
        <circle cx="12" cy="12" r="2.5" fill={active ? color : 'none'}/>
        <circle cx="12" cy="18" r="2.5" fill={active ? color : 'none'}/>
        <line x1="14.5" y1="6" x2="20" y2="6"/>
        <line x1="14.5" y1="12" x2="20" y2="12"/>
        <line x1="14.5" y1="18" x2="20" y2="18"/>
      </svg>
    ),
    certificate: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="14" rx="2"/>
        <path d="M8 21l4-4 4 4"/>
        <line x1="7" y1="8" x2="17" y2="8"/>
        <line x1="7" y1="12" x2="13" y2="12"/>
      </svg>
    ),
    profile: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4"/>
        <path d="M5 20c0-4 3.5-7 7-7s7 3 7 7"/>
      </svg>
    )
  };

  return icons[type] || null;
}

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn, activeChild } = useApp();

  // Don't show on auth or splash pages
  const hiddenPaths = ['/', '/login', '/register', '/add-child', '/splash'];
  if (hiddenPaths.some(p => pathname === p) || !isLoggedIn || !activeChild) return null;

  return (
    <nav className="bottom-nav" id="bottom-navigation">
      <div className="bottom-nav-inner">
        {NAV_ITEMS.map(item => {
          const isActive = pathname === item.path || pathname.startsWith(item.path + '/');
          return (
            <button
              key={item.path}
              className={`nav-item ${isActive ? 'nav-item-active' : ''}`}
              onClick={() => router.push(item.path)}
              id={`nav-${item.icon}`}
              aria-label={item.label}
            >
              <span className="nav-icon-wrap">
                <NavIcon type={item.icon} active={isActive} />
                {isActive && <span className="nav-active-dot" />}
              </span>
              <span className="nav-label">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
