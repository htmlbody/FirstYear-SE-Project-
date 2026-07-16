'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/data/store';
import { VACCINE_SCHEDULE_GROUPS } from '@/data/vaccines';
import BottomNav from '@/components/BottomNav';
import './timeline.css';

export default function TimelinePage() {
  const router = useRouter();
  const { isLoggedIn, activeChild, getChildRecords } = useApp();
  const [activeGroup, setActiveGroup] = useState('all');

  useEffect(() => {
    if (!isLoggedIn) router.replace('/login');
    else if (!activeChild) router.replace('/add-child');
  }, [isLoggedIn, activeChild, router]);

  if (!isLoggedIn || !activeChild) return null;

  const records = getChildRecords();

  // Group records by their category (birth, 6weeks, etc.)
  const groupedRecords = VACCINE_SCHEDULE_GROUPS.map(group => {
    const groupRecords = records.filter(r => r.vaccine?.category === group.key);
    const completedCount = groupRecords.filter(r => r.status === 'completed').length;
    const totalCount = groupRecords.length;
    const isCompleted = completedCount === totalCount && totalCount > 0;
    const isPending = groupRecords.some(r => r.status === 'overdue' || r.status === 'upcoming');
    
    let groupStatus = 'future';
    if (isCompleted) groupStatus = 'completed';
    else if (isPending) {
      groupStatus = groupRecords.some(r => r.status === 'overdue') ? 'overdue' : 'upcoming';
    }

    return {
      ...group,
      records: groupRecords,
      completedCount,
      totalCount,
      status: groupStatus
    };
  });

  return (
    <div className="page-container">
      <div className="page-content">
        {/* Header */}
        <header className="timeline-header animate-fade-in-down">
          <div>
            <h1 className="timeline-title">Vaccine Booklet</h1>
            <p className="timeline-subtitle">Immunisation timeline for {activeChild.childName}</p>
          </div>
        </header>

        {/* Info Box */}
        <div className="timeline-bio-card card animate-scale-in">
          <div className="bio-avatar">📅</div>
          <div className="bio-details">
            <h4>Universal Immunisation Program</h4>
            <p>Chronological vaccination history from birth up to 5 years.</p>
          </div>
        </div>

        {/* Timeline Visualization */}
        <div className="timeline-container stagger-children">
          {groupedRecords.map((group, index) => {
            const isGroupActive = activeGroup === 'all' || activeGroup === group.key;

            return (
              <div 
                key={group.key} 
                className={`timeline-node status-${group.status} ${isGroupActive ? 'active-node' : 'collapsed-node'}`}
              >
                {/* Visual Line */}
                {index < groupedRecords.length - 1 && (
                  <div className={`timeline-line line-${groupedRecords[index + 1].status}`} />
                )}

                {/* Node Milestone Mark */}
                <div 
                  className="timeline-badge"
                  onClick={() => setActiveGroup(activeGroup === group.key ? 'all' : group.key)}
                >
                  <span className="badge-bullet">
                    {group.status === 'completed' && '✓'}
                    {group.status === 'overdue' && '⚠️'}
                    {group.status === 'upcoming' && '⏰'}
                    {group.status === 'future' && '•'}
                  </span>
                </div>

                {/* Node Panel */}
                <div className="timeline-panel card">
                  <div 
                    className="panel-header"
                    onClick={() => setActiveGroup(activeGroup === group.key ? 'all' : group.key)}
                  >
                    <div>
                      <h3 className="panel-age">{group.label}</h3>
                      <p className="panel-summary">
                        {group.completedCount} of {group.totalCount} completed
                      </p>
                    </div>
                    <div className="panel-status-indicator">
                      <span className={`status-tag status-${group.status}`}>
                        {group.status === 'completed' && 'Fully Taken'}
                        {group.status === 'overdue' && 'Missed Dose'}
                        {group.status === 'upcoming' && 'Due Now'}
                        {group.status === 'future' && 'Scheduled'}
                      </span>
                    </div>
                  </div>

                  {/* Vaccines in this Group */}
                  <div className="panel-body">
                    <div className="timeline-vaccines-list">
                      {group.records.map(record => (
                        <div 
                          key={record.id} 
                          className="timeline-vaccine-item"
                          onClick={() => router.push(`/vaccines/${record.vaccineId}`)}
                        >
                          <div className="vaccine-item-left">
                            <span className={`item-dot status-${record.status}`} />
                            <div>
                              <h4 className="item-name">{record.vaccine?.name}</h4>
                              <p className="item-target">{record.vaccine?.disease}</p>
                            </div>
                          </div>
                          
                          <div className="vaccine-item-right">
                            <span className="item-dose">{record.vaccine?.doseLabel}</span>
                            <span className={`item-status-pill status-${record.status}`}>
                              {record.status === 'completed' ? 'Taken' : record.status}
                            </span>
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="var(--text-tertiary)" strokeWidth="2" strokeLinecap="round">
                              <path d="M6 4l4 4-4 4"/>
                            </svg>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
