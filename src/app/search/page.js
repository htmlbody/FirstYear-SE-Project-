'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/data/store';
import BottomNav from '@/components/BottomNav';
import './search.css';

export default function SearchPage() {
  const router = useRouter();
  const { isLoggedIn, activeChild, getChildRecords } = useApp();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    if (!isLoggedIn) router.replace('/login');
    else if (!activeChild) router.replace('/add-child');
  }, [isLoggedIn, activeChild, router]);

  const records = getChildRecords() || [];

  // Searching function computed inline to avoid rendering loop
  let results = [];

  if (query.trim() || activeCategory !== 'all') {
    let matched = [...records];

    if (activeCategory !== 'all') {
      matched = matched.filter(r => r.vaccine?.category === activeCategory);
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      matched = matched.filter(r => 
        r.vaccine?.name?.toLowerCase().includes(q) ||
        r.vaccine?.fullName?.toLowerCase().includes(q) ||
        r.vaccine?.disease?.toLowerCase().includes(q) ||
        r.vaccine?.importance?.toLowerCase().includes(q) ||
        r.vaccine?.recommendedAge?.toLowerCase().includes(q)
      );
    }

    results = matched;
  }

  if (!isLoggedIn || !activeChild) return null;

  // Quick suggestions list
  const suggestionQueries = [
    { label: 'Polio (OPV/IPV)', val: 'polio' },
    { label: 'Hepatitis B', val: 'hepatitis' },
    { label: 'BCG Tuberculosis', val: 'bcg' },
    { label: 'Rotavirus Diarrhea', val: 'rotavirus' },
    { label: 'Measles & Rubella', val: 'mr' },
    { label: 'DPT Booster', val: 'dpt' }
  ];

  return (
    <div className="page-container">
      <div className="page-content">
        {/* Header */}
        <header className="search-page-header animate-fade-in-down">
          <div>
            <h1 className="search-page-title">Search Schedule</h1>
            <p className="search-page-subtitle">Search vaccine records of {activeChild.childName}</p>
          </div>
        </header>

        {/* Search bar */}
        <div className="search-bar animate-fade-in" style={{ animationDelay: '100ms' }}>
          <div className="search-input-wrap">
            <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Search immunisations, doses, rules, or diseases..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              id="global-search-input"
            />
            {query && (
              <button className="search-clear" onClick={() => setQuery('')}>
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Milestone filters quick toggle */}
        <div className="search-milestones animate-fade-in" style={{ animationDelay: '150ms' }}>
          <span className="milestones-label">Milestone:</span>
          <div className="milestones-chips">
            <button className={`m-chip ${activeCategory === 'all' ? 'active' : ''}`} onClick={() => setActiveCategory('all')}>
              All Ages
            </button>
            <button className={`m-chip ${activeCategory === 'birth' ? 'active' : ''}`} onClick={() => setActiveCategory('birth')}>
              At Birth
            </button>
            <button className={`m-chip ${activeCategory === '6weeks' ? 'active' : ''}`} onClick={() => setActiveCategory('6weeks')}>
              6 Wks
            </button>
            <button className={`m-chip ${activeCategory === '10weeks' ? 'active' : ''}`} onClick={() => setActiveCategory('10weeks')}>
              10 Wks
            </button>
            <button className={`m-chip ${activeCategory === '14weeks' ? 'active' : ''}`} onClick={() => setActiveCategory('14weeks')}>
              14 Wks
            </button>
            <button className={`m-chip ${activeCategory === '9months' ? 'active' : ''}`} onClick={() => setActiveCategory('9months')}>
              9 Mts
            </button>
            <button className={`m-chip ${activeCategory === '16-24months' ? 'active' : ''}`} onClick={() => setActiveCategory('16-24months')}>
              16-24 Mts
            </button>
            <button className={`m-chip ${activeCategory === '5-6years' ? 'active' : ''}`} onClick={() => setActiveCategory('5-6years')}>
              5-6 Yrs
            </button>
          </div>
        </div>

        {/* Results / Suggestions panel */}
        <div className="search-body stagger-children">
          {results.length > 0 ? (
            <div className="results-grid">
              <h3 className="section-title">Search Results ({results.length})</h3>
              {results.map((record) => (
                <div
                  key={record.id}
                  className="search-item-card card clickable animate-fade-in-up"
                  onClick={() => router.push(`/vaccines/${record.vaccineId}`)}
                >
                  <div className="search-item-header">
                    <div>
                      <h4 className="search-item-name">{record.vaccine?.name}</h4>
                      <p className="search-item-desc">{record.vaccine?.fullName}</p>
                    </div>
                    <span className={`status-badge status-${record.status}`}>
                      {record.status === 'completed' ? '🟢 Taken' : record.status === 'overdue' ? '🔴 Missed' : '🟡 Scheduled'}
                    </span>
                  </div>
                  <div className="search-item-details">
                    <p>🎯 <strong>Protects from:</strong> {record.vaccine?.disease}</p>
                    <p>📅 <strong>Recommended:</strong> {record.vaccine?.recommendedAge} ({record.vaccine?.doseLabel})</p>
                  </div>
                </div>
              ))}
            </div>
          ) : query || activeCategory !== 'all' ? (
            <div className="search-empty card animate-scale-in">
              <span>🔍</span>
              <h3>No Matches Found</h3>
              <p>Check spellings or select a different age milestone filter.</p>
            </div>
          ) : (
            <div className="search-suggestions card animate-fade-in-up">
              <h3>Search Recommendations</h3>
              <p>Quick search popular vaccines and disease protectives recommended in India:</p>
              <div className="suggestions-tags-wrap">
                {suggestionQueries.map((item, idx) => (
                  <button
                    key={idx}
                    className="suggestion-tag-btn"
                    onClick={() => setQuery(item.val)}
                  >
                    🔍 {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
