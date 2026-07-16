'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/data/store';
import BottomNav from '@/components/BottomNav';
import './vaccines.css';

export default function VaccinesPage() {
  const router = useRouter();
  const { isLoggedIn, activeChild, getChildRecords } = useApp();
  const [filter, setFilter] = useState('all'); // all, completed, upcoming, overdue, future
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!isLoggedIn) router.replace('/login');
    else if (!activeChild) router.replace('/add-child');
  }, [isLoggedIn, activeChild, router]);

  const records = getChildRecords() || [];

  // Filter & Search records computed inline to avoid infinite render loops
  let results = [...records];

  if (filter !== 'all') {
    results = results.filter(r => r.status === filter);
  }

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    results = results.filter(r => 
      r.vaccine?.name?.toLowerCase().includes(q) ||
      r.vaccine?.fullName?.toLowerCase().includes(q) ||
      r.vaccine?.disease?.toLowerCase().includes(q)
    );
  }

  if (!isLoggedIn || !activeChild) return null;

  const countByStatus = (status) => {
    if (status === 'all') return records.length;
    return records.filter(r => r.status === status).length;
  };

  return (
    <div className="page-container">
      <div className="page-content">
        {/* Header */}
        <header className="vaccines-header animate-fade-in-down">
          <div>
            <h1 className="vaccines-title">Vaccine Schedule</h1>
            <p className="vaccines-subtitle">Indian National Immunisation Programme (UIP)</p>
          </div>
        </header>

        {/* Search Bar */}
        <div className="search-bar animate-fade-in" style={{ animationDelay: '100ms' }}>
          <div className="search-input-wrap">
            <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Search vaccine, disease, or dose..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              id="vaccines-search"
            />
            {searchQuery && (
              <button className="search-clear" onClick={() => setSearchQuery('')} aria-label="Clear search">
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="status-grid animate-fade-in" style={{ animationDelay: '150ms' }}>
          <button className={`status-pill pill-all ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
            <span>All</span>
            <span className="status-count">{countByStatus('all')}</span>
          </button>
          <button className={`status-pill pill-completed ${filter === 'completed' ? 'active' : ''}`} onClick={() => setFilter('completed')}>
            <span>🟢 Done</span>
            <span className="status-count">{countByStatus('completed')}</span>
          </button>
          <button className={`status-pill pill-upcoming ${filter === 'upcoming' ? 'active' : ''}`} onClick={() => setFilter('upcoming')}>
            <span>🟡 Due</span>
            <span className="status-count">{countByStatus('upcoming')}</span>
          </button>
          <button className={`status-pill pill-overdue ${filter === 'overdue' ? 'active' : ''}`} onClick={() => setFilter('overdue')}>
            <span>🔴 Missed</span>
            <span className="status-count">{countByStatus('overdue')}</span>
          </button>
          <button className={`status-pill pill-future ${filter === 'future' ? 'active' : ''}`} onClick={() => setFilter('future')}>
            <span>⚪ Future</span>
            <span className="status-count">{countByStatus('future')}</span>
          </button>
        </div>

        {/* Vaccines List */}
        <div className="vaccine-records-list stagger-children">
          {results.length > 0 ? (
            results.map((record) => (
              <div
                key={record.id}
                className={`vaccine-card card clickable animate-fade-in-up status-border-${record.status}`}
                onClick={() => router.push(`/vaccines/${record.vaccineId}`)}
              >
                <div className="vaccine-card-top">
                  <div>
                    <span className={`status-badge status-${record.status}`}>
                      {record.status === 'completed' && '🟢 Completed'}
                      {record.status === 'upcoming' && '🟡 Upcoming'}
                      {record.status === 'overdue' && '🔴 Overdue'}
                      {record.status === 'future' && '⚪ Future'}
                    </span>
                    <h3 className="vaccine-name-full">
                      {record.vaccine?.name}
                      {record.vaccine?.doseLabel && (
                        <span className="vaccine-dose-badge">{record.vaccine.doseLabel}</span>
                      )}
                    </h3>
                  </div>
                  <div className="vaccine-age-badge">
                    {record.vaccine?.recommendedAge}
                  </div>
                </div>

                <div className="vaccine-card-mid">
                  <p className="vaccine-prevents">
                    <strong>Disease:</strong> {record.vaccine?.disease}
                  </p>
                  <p className="vaccine-due-info">
                    {record.completedDate ? (
                      <>Given on: <strong>{new Date(record.completedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</strong></>
                    ) : (
                      <>Due Date: <strong>{new Date(record.dueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</strong></>
                    )}
                  </p>
                </div>

                <div className="vaccine-card-bottom">
                  {record.completedDate ? (
                    <div className="vaccine-completion-meta">
                      <span>🏥 {record.hospital}</span>
                      <span>👨‍⚕️ {record.doctor}</span>
                    </div>
                  ) : (
                    <div className="vaccine-action-cue">
                      <span>View details & mark complete</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="var(--text-accent)" strokeWidth="2" strokeLinecap="round">
                        <path d="M6 4l4 4-4 4"/>
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="no-results card animate-scale-in">
              <span className="no-results-icon">🔍</span>
              <h3>No Vaccines Found</h3>
              <p>Try matching spelling or changing filters</p>
              <button className="btn btn-secondary btn-sm" onClick={() => { setFilter('all'); setSearchQuery(''); }}>
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
}
