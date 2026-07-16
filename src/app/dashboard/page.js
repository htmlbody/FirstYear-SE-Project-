'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp, getAgeString } from '@/data/store';
import { VACCINE_CATALOG } from '@/data/vaccines';
import BottomNav from '@/components/BottomNav';
import './dashboard.css';

export default function DashboardPage() {
  const router = useRouter();
  const { isLoggedIn, activeChild, children, switchChild, getDashboardStats, getChildRecords, parent } = useApp();

  useEffect(() => {
    if (!isLoggedIn) router.replace('/login');
    else if (!activeChild) router.replace('/add-child');
  }, [isLoggedIn, activeChild, router]);

  if (!isLoggedIn || !activeChild) return null;

  const stats = getDashboardStats();
  const records = getChildRecords();
  const upcomingRecords = records
    .filter(r => r.status === 'upcoming' || r.status === 'overdue')
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 3);

  const overdueRecords = records.filter(r => r.status === 'overdue');

  return (
    <div className="page-container">
      <div className="page-content">
        {/* Header */}
        <header className="dash-header animate-fade-in-down">
          <div className="dash-header-left">
            <p className="dash-greeting">Hello, {parent.name?.split(' ')[0] || 'Parent'} 👋</p>
            <h1 className="dash-heading">Dashboard</h1>
          </div>
          <button className="dash-notif-btn" onClick={() => router.push('/notifications')} id="dash-notifications">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round">
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              <path d="M18 8A7 7 0 1 0 4 8c0 7-3 9-3 9h20s-3-2-3-9"/>
            </svg>
            {overdueRecords.length > 0 && (
              <span className="notif-badge">{overdueRecords.length}</span>
            )}
          </button>
        </header>

        <div className="dash-layout-grid">
          <div className="dash-column-main">
            {/* Child Switcher */}
            {children.length > 1 && (
              <div className="child-switcher animate-fade-in">
                {children.map(child => (
                  <button
                    key={child.id}
                    className={`child-chip ${child.id === activeChild.id ? 'child-chip-active' : ''}`}
                    onClick={() => switchChild(child.id)}
                  >
                    <span className="child-chip-emoji">
                      {child.gender === 'female' ? '👧' : '👦'}
                    </span>
                    {child.childName.split(' ')[0]}
                  </button>
                ))}
                <button
                  className="child-chip child-chip-add"
                  onClick={() => router.push('/add-child')}
                  id="dash-add-child"
                >
                  <span>+</span>
                </button>
              </div>
            )}

            {/* Child Info Card */}
            <div className="dash-child-card card animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <div className="dash-child-avatar">
                {activeChild.gender === 'female' ? '👧' : '👦'}
              </div>
              <div className="dash-child-info">
                <h2 className="dash-child-name">{activeChild.childName}</h2>
                <p className="dash-child-age">{getAgeString(activeChild.dob)}</p>
                <div className="dash-child-meta">
                  {activeChild.bloodGroup && (
                    <span className="dash-meta-tag">🩸 {activeChild.bloodGroup}</span>
                  )}
                  <span className="dash-meta-tag">
                    {activeChild.gender === 'female' ? '♀ Girl' : '♂ Boy'}
                  </span>
                </div>
              </div>
            </div>

            {/* Progress Card */}
            <div className="dash-progress-card card animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <div className="dash-progress-header">
                <h3 className="dash-progress-title">Vaccination Progress</h3>
                <span className="dash-progress-count">{stats.completed}/{stats.total}</span>
              </div>
              <div className="dash-progress-bar-wrap">
                <div className="dash-progress-bar">
                  <div 
                    className="dash-progress-fill"
                    style={{ width: `${stats.progress}%`, animationName: 'progressFill' }}
                  />
                </div>
                <span className="dash-progress-percent">{stats.progress}%</span>
              </div>
              <div className="dash-progress-stats">
                <div className="dash-stat">
                  <span className="dash-stat-dot completed" />
                  <span className="dash-stat-label">Completed</span>
                  <span className="dash-stat-value">{stats.completed}</span>
                </div>
                <div className="dash-stat">
                  <span className="dash-stat-dot upcoming" />
                  <span className="dash-stat-label">Upcoming</span>
                  <span className="dash-stat-value">{stats.upcoming}</span>
                </div>
                <div className="dash-stat">
                  <span className="dash-stat-dot overdue" />
                  <span className="dash-stat-label">Overdue</span>
                  <span className="dash-stat-value">{stats.overdue}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="dash-section animate-fade-in-up" style={{ animationDelay: '500ms' }}>
              <h3 className="section-title">Quick Actions</h3>
              <div className="dash-quick-actions">
                <button className="dash-quick-btn" onClick={() => router.push('/vaccines')} id="dash-quick-vaccines">
                  <span className="dash-quick-icon">💉</span>
                  <span>All Vaccines</span>
                </button>
                <button className="dash-quick-btn" onClick={() => router.push('/timeline')} id="dash-quick-timeline">
                  <span className="dash-quick-icon">📅</span>
                  <span>Timeline</span>
                </button>
                <button className="dash-quick-btn" onClick={() => router.push('/certificates')} id="dash-quick-certs">
                  <span className="dash-quick-icon">🏆</span>
                  <span>Certificates</span>
                </button>
                <button className="dash-quick-btn" onClick={() => router.push('/search')} id="dash-quick-search">
                  <span className="dash-quick-icon">🔍</span>
                  <span>Search</span>
                </button>
              </div>
            </div>
          </div>

          <div className="dash-column-side">
            {/* Next Vaccine Card */}
            {stats.nextVaccine && (
              <div className="dash-next-card card animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                <div className="dash-next-header">
                  <span className="dash-next-badge">
                    {stats.daysUntilNext < 0 ? '🔴 Overdue' : stats.daysUntilNext <= 7 ? '🟡 Coming Soon' : '💉 Next Vaccine'}
                  </span>
                </div>
                <h3 className="dash-next-name">{stats.nextVaccine.vaccine?.name}</h3>
                <p className="dash-next-fullname">{stats.nextVaccine.vaccine?.fullName}</p>
                <div className="dash-next-details">
                  <div className="dash-next-detail">
                    <span className="dash-next-detail-label">Due Date</span>
                    <span className="dash-next-detail-value">
                      {new Date(stats.nextVaccine.dueDate).toLocaleDateString('en-IN', { 
                        day: 'numeric', month: 'short', year: 'numeric' 
                      })}
                    </span>
                  </div>
                  <div className="dash-next-detail">
                    <span className="dash-next-detail-label">
                      {stats.daysUntilNext < 0 ? 'Overdue By' : 'Due In'}
                    </span>
                    <span className={`dash-next-detail-value ${stats.daysUntilNext < 0 ? 'text-overdue' : ''}`}>
                      {Math.abs(stats.daysUntilNext)} {Math.abs(stats.daysUntilNext) === 1 ? 'Day' : 'Days'}
                    </span>
                  </div>
                  <div className="dash-next-detail">
                    <span className="dash-next-detail-label">Prevents</span>
                    <span className="dash-next-detail-value dash-next-disease">
                      {stats.nextVaccine.vaccine?.disease}
                    </span>
                  </div>
                </div>
                <button
                  className="btn btn-primary btn-full btn-sm"
                  onClick={() => router.push(`/vaccines/${stats.nextVaccine.vaccineId}`)}
                  id="dash-next-vaccine-btn"
                  style={{ marginTop: 'var(--space-4)' }}
                >
                  View Details
                </button>
              </div>
            )}

            {/* Overdue Alert */}
            {overdueRecords.length > 0 && (
              <div className="dash-alert dash-alert-overdue animate-fade-in-up" style={{ animationDelay: '350ms' }}>
                <div className="dash-alert-icon">⚠️</div>
                <div className="dash-alert-content">
                  <h4>{overdueRecords.length} Overdue Vaccine{overdueRecords.length > 1 ? 's' : ''}</h4>
                  <p>Please consult your doctor immediately</p>
                </div>
                <button
                  className="btn btn-sm"
                  onClick={() => router.push('/vaccines')}
                  style={{ color: 'var(--status-overdue)', fontWeight: 700 }}
                >
                  View →
                </button>
              </div>
            )}

            {/* Upcoming Vaccines */}
            {upcomingRecords.length > 0 && (
              <div className="dash-section animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                <div className="dash-section-header">
                  <h3 className="section-title" style={{ marginBottom: 0 }}>Upcoming Vaccines</h3>
                  <button
                    className="dash-see-all"
                    onClick={() => router.push('/vaccines')}
                    id="dash-see-all-vaccines"
                  >
                    See All
                  </button>
                </div>
                <div className="dash-upcoming-list stagger-children">
                  {upcomingRecords.map(record => (
                    <button
                      key={record.id}
                      className="dash-upcoming-item card"
                      onClick={() => router.push(`/vaccines/${record.vaccineId}`)}
                    >
                      <div className="dash-upcoming-left">
                        <span className={`status-badge status-${record.status}`}>
                          {record.status === 'overdue' ? '🔴' : '🟡'} {record.status}
                        </span>
                        <h4 className="dash-upcoming-name">{record.vaccine?.name}</h4>
                        <p className="dash-upcoming-info">{record.vaccine?.disease}</p>
                      </div>
                      <div className="dash-upcoming-right">
                        <span className="dash-upcoming-date">
                          {new Date(record.dueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                        </span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="var(--text-tertiary)" strokeWidth="2" strokeLinecap="round">
                          <path d="M6 4l4 4-4 4"/>
                        </svg>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
