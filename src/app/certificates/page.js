'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/data/store';
import { VACCINE_CATALOG } from '@/data/vaccines';
import BottomNav from '@/components/BottomNav';
import './certificates.css';

export default function CertificatesPage() {
  const router = useRouter();
  const { isLoggedIn, activeChild, getChildCertificates, getChildRecords } = useApp();

  useEffect(() => {
    if (!isLoggedIn) router.replace('/login');
    else if (!activeChild) router.replace('/add-child');
  }, [isLoggedIn, activeChild, router]);

  if (!isLoggedIn || !activeChild) return null;

  const certificates = getChildCertificates() || [];
  const records = getChildRecords() || [];

  // Match certificates with records and child facts
  const displayCerts = certificates.map(cert => {
    const record = records.find(r => r.id === cert.recordId);
    return {
      ...cert,
      record
    };
  }).sort((a, b) => new Date(b.generatedAt) - new Date(a.generatedAt));

  return (
    <div className="page-container">
      <div className="page-content">
        {/* Header */}
        <header className="certs-header animate-fade-in-down">
          <div>
            <h1 className="certs-title">Certificates</h1>
            <p className="certs-subtitle">Verified digital vaccination records</p>
          </div>
        </header>

        {/* Info card */}
        <div className="certs-banner card animate-scale-in">
          <div className="banner-icon">🏆</div>
          <div className="banner-body">
            <h3>e-Certificates Generated</h3>
            <p>Every time you record a completed vaccine, an official-looking digital certificate is generated automatically.</p>
          </div>
        </div>

        {/* Certificates list */}
        <div className="certs-list stagger-children">
          {displayCerts.length > 0 ? (
            displayCerts.map((cert) => (
              <div
                key={cert.id}
                className="cert-card-item card clickable animate-fade-in-up"
                onClick={() => router.push(`/certificates/${cert.id}`)}
              >
                <div className="cert-item-left">
                  <div className="cert-icon-seal">📜</div>
                  <div>
                    <h3 className="cert-item-name">{cert.record?.vaccine?.name} Certificate</h3>
                    <p className="cert-item-number">{cert.certificateNumber}</p>
                    <p className="cert-item-date">
                      Administered: {new Date(cert.record?.completedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                </div>
                <div className="cert-item-right">
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="var(--text-accent)" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M6 4l4 4-4 4"/>
                  </svg>
                </div>
              </div>
            ))
          ) : (
            <div className="certs-empty card animate-scale-in">
              <span className="empty-icon">📜</span>
              <h3>No Certificates Ready</h3>
              <p>Once you mark a vaccine as completed, its digital certificate will appear here.</p>
              <button 
                className="btn btn-primary btn-sm"
                onClick={() => router.push('/vaccines')}
                id="certs-mark-vaccine"
              >
                Go to Vaccine List
              </button>
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
