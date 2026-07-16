'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { useApp, getAgeString } from '@/data/store';
import { VACCINE_CATALOG } from '@/data/vaccines';
import '../certificates.css';

// SVG QR Code generator inline
function QRCodeSVG({ value }) {
  // Return a beautiful mocked QR code SVG with small squares
  return (
    <svg width="100" height="100" viewBox="0 0 29 29" fill="none" shapeRendering="crispEdges">
      <path d="M0 0h7v7H0zM22 0h7v7h-7zM0 22h7v7H0z" fill="var(--text-primary)" />
      <path d="M2 2h3v3H2zM24 2h3v3h-3zM2 24h3v3H2z" fill="var(--bg-card)" />
      <path d="M9 0h1v3H9zM12 1h2v2h-2zM15 0h3v1h-3zM19 2h2v2h-2zM9 5h3v1H9zM14 4h4v2h-4zM9 8h5v1H9zM16 7h3v2h-3zM20 8h2v2h-2zM0 9h2v2H0zM4 10h2v2H4zM8 11h2v1H8zM12 10h3v2h-3zM17 11h4v2h-4zM23 10h4v1h-4zM2 13h4v1H2zM8 14h2v2H8zM12 13h2v1h-2zM16 14h4v2h-4zM22 13h5v2h-5zM1 16h5v1H1zM9 17h3v2H9zM15 16h2v1h-2zM21 16h3v3h-3zM3 19h3v2H3zM8 20h4v1H8zM14 19h3v1h-3zM0 26h1v3H0zM8 24h3v2H8zM13 25h4v1h-4zM19 23v4h1v-4zM24 24h2v2h-2z" fill="var(--text-primary)" />
    </svg>
  );
}

export default function CertificateViewerPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const { id } = params;
  const { isLoggedIn, activeChild, certificates, getChildRecords, parent } = useApp();

  // Derive cert and record synchronously during render
  const cert = certificates.find(c => c.id === id) || null;
  const childRecords = isLoggedIn && activeChild ? getChildRecords() : [];
  const record = cert ? childRecords.find(r => r.id === cert.recordId) || null : null;

  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const certificateRef = useRef(null);

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace('/login');
      return;
    }
    if (!activeChild) {
      router.replace('/add-child');
      return;
    }
    if (!cert) {
      router.replace('/certificates');
      return;
    }

    // Show success alert toast if redirecting from completed entry form
    if (searchParams.get('success') === 'true') {
      /* eslint-disable react-hooks/set-state-in-effect */
      setShowSuccessToast(true);
      const timer = setTimeout(() => setShowSuccessToast(false), 4000);
      /* eslint-enable react-hooks/set-state-in-effect */
      return () => clearTimeout(timer);
    }
  }, [id, isLoggedIn, activeChild, cert, searchParams, router]);

  if (!isLoggedIn || !activeChild || !cert || !record) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${record.vaccine?.name} Vaccination Certificate`,
          text: `Digital Immunisation record of ${activeChild.childName} for ${record.vaccine?.name}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share error:', err);
      }
    } else {
      alert(`Share link copied: ${window.location.href}`);
    }
  };

  return (
    <div className="page-container no-print-bg">
      {/* Toast Alert */}
      {showSuccessToast && (
        <div className="success-toast animate-scale-in" id="success-toast">
          <div className="toast-icon">🟢</div>
          <div className="toast-content">
            <h4>Vaccination Logged Successfully</h4>
            <p>e-Certificate generated below!</p>
          </div>
          <button className="toast-close" onClick={() => setShowSuccessToast(false)}>✕</button>
        </div>
      )}

      <div className="page-content print-full-width">
        {/* Navigation back and Actions */}
        <header className="viewer-header no-print">
          <button className="auth-back" onClick={() => router.back()} id="viewer-back">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M15 10H5M5 10l4-4M5 10l4 4"/>
            </svg>
          </button>
          <div className="viewer-actions-btns">
            <button className="btn btn-secondary btn-sm" onClick={handleShare} id="cert-share-btn">
              Share
            </button>
            <button className="btn btn-primary btn-sm" onClick={handlePrint} id="cert-print-btn">
              Download PDF / Print
            </button>
          </div>
        </header>

        {/* Certificate Card Frame details */}
        <div className="certificate-frame animate-scale-in" ref={certificateRef} id="official-certificate">
          <div className="cert-border-outer">
            <div className="cert-border-inner">
              
              {/* Watermark in background */}
              <div className="cert-watermark">
                ⚖️
              </div>

              {/* Certificate Header branding */}
              <div className="cert-header-box">
                <div className="cert-logo">🛡️</div>
                <div className="cert-header-title">
                  <h2>GOVT. OF INDIA HEALTH DEPARTMENT SERVICES</h2>
                  <h3>National Immunisation Programme e-Certificate</h3>
                </div>
              </div>

              <div className="cert-main-statement">
                This certifies that the child described below has been successfully administered the specified vaccine dose in accordance with the national immunization directives.
              </div>

              {/* Main Content Details split */}
              <div className="cert-details-grid">
                
                {/* Section 1: Child info */}
                <div className="cert-section">
                  <h4 className="cert-sec-title">Child details</h4>
                  <div className="cert-row">
                    <span className="cert-label">Name of Child</span>
                    <span className="cert-val">{activeChild.childName}</span>
                  </div>
                  <div className="cert-row">
                    <span className="cert-label">Date of Birth</span>
                    <span className="cert-val">{new Date(activeChild.dob).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  </div>
                  <div className="cert-row">
                    <span className="cert-label">Gender (At birth)</span>
                    <span className="cert-val text-capitalize">{activeChild.gender}</span>
                  </div>
                  <div className="cert-row">
                    <span className="cert-label">Parent / Guardian</span>
                    <span className="cert-val">{parent.name || 'Parent'}</span>
                  </div>
                </div>

                {/* Section 2: Vaccine info */}
                <div className="cert-section">
                  <h4 className="cert-sec-title">Vaccination Details</h4>
                  <div className="cert-row">
                    <span className="cert-label">Vaccine Name</span>
                    <span className="cert-val">{record.vaccine?.name} ({record.vaccine?.fullName})</span>
                  </div>
                  <div className="cert-row">
                    <span className="cert-label">Dose Details</span>
                    <span className="cert-val">{record.vaccine?.doseLabel || 'Single Dose'}</span>
                  </div>
                  <div className="cert-row">
                    <span className="cert-label">Age at Administration</span>
                    <span className="cert-val">{getAgeString(activeChild.dob)}</span>
                  </div>
                  <div className="cert-row">
                    <span className="cert-label">Diseases Prevented</span>
                    <span className="cert-val disease-val">{record.vaccine?.disease}</span>
                  </div>
                </div>

                {/* Section 3: Hospital & Doctor */}
                <div className="cert-section cert-sec-span">
                  <h4 className="cert-sec-title">Immunisation Authority</h4>
                  <div className="cert-row-cols">
                    <div className="cert-col">
                      <span className="cert-label">Administered Date</span>
                      <span className="cert-val">{new Date(record.completedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </div>
                    <div className="cert-col">
                      <span className="cert-label">Hospital / Clinic Center</span>
                      <span className="cert-val">{record.hospital}</span>
                    </div>
                    <div className="cert-col">
                      <span className="cert-label">Healthcare Professional</span>
                      <span className="cert-val">{record.doctor}</span>
                    </div>
                    {record.batchNumber && (
                      <div className="cert-col">
                        <span className="cert-label">Vaccine Batch No.</span>
                        <span className="cert-val font-mono">{record.batchNumber}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Seal and signature footer */}
              <div className="cert-footer">
                
                {/* QR Code */}
                <div className="cert-qr-box">
                  <QRCodeSVG value={cert.certificateNumber} />
                  <span className="cert-qr-label">{cert.certificateNumber}</span>
                </div>

                {/* Stamp / verification seal */}
                <div className="cert-seal">
                  <div className="official-stamp-circle">
                    <span>FIRSTYEARS</span>
                    <span>VERIFIED</span>
                    <span className="stamp-check">✓</span>
                  </div>
                </div>

                {/* Digital lock signature */}
                <div className="cert-signature">
                  <div className="signature-line" />
                  <span className="sig-label">Digital Signature Area</span>
                  <span className="sig-note">Electronically authenticated record</span>
                  <span className="sig-timestamp">Timestamp: {new Date(cert.generatedAt).toLocaleString('en-IN')}</span>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
