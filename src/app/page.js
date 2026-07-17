'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/data/store';
import './page.css';

export default function SplashPage() {
  const router = useRouter();
  const { isLoaded, isLoggedIn, activeChild, clearAllData } = useApp();
  const [showContent, setShowContent] = useState(false);
  const [clickedCTA, setClickedCTA] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  // Modal display states
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  // Auto rotate slides every 4.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % 3);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    
    // Default splash loading state
    const timer = setTimeout(() => setShowContent(true), 150);
    return () => clearTimeout(timer);
  }, [isLoaded]);

  const handleStartJourney = (targetPath = '/register') => {
    if (isLoggedIn) {
      if (activeChild) {
        router.push('/dashboard');
      } else {
        router.push('/add-child');
      }
    } else {
      setClickedCTA(true);
      setTimeout(() => {
        router.push(targetPath);
      }, 800);
    }
  };

  const handleAppReset = () => {
    clearAllData();
    setShowResetModal(false);
    setResetSuccess(true);
    setTimeout(() => {
      setResetSuccess(false);
      window.location.reload();
    }, 1800);
  };

  const slides = [
    {
      title: 'Never Miss a Vital Vaccine',
      subtitle: 'Keep your child protected on time with automated smart reminders and milestones scheduling.',
      theme: 'blue',
      badge: '🎯 Smart Reminders'
    },
    {
      title: 'Replace the Paper Vaccination Book',
      subtitle: 'Ditch the physical booklet. Securely digitised Indian VIP immunisation cards, accessible anywhere.',
      theme: 'pink',
      badge: '📋 Active Records'
    },
    {
      title: 'Verifiable Digital Certificates',
      subtitle: 'Instantly download official e-Certificates featuring secure QR validation codes for school admissions.',
      theme: 'default',
      badge: '🏆 Certified Protection'
    }
  ];

  if (!isLoaded) return null;

  return (
    <div className="landing-layout" data-theme={slides[activeSlide].theme}>
      {/* Top Banner Bar */}
      <div className="promo-top-bar">
        <div className="promo-container">
          <div className="promo-left">
            <span>Welcome to FirstYears</span>
            <span className="divider">|</span>
            <span>National Universal Immunisation Programme Guide</span>
          </div>
          <div className="promo-right">
            <span>Helpline: 1800-120-4100</span>
            <span className="divider">|</span>
            <span>ENG (IN)</span>
          </div>
        </div>
      </div>

      {/* Main Header / Navigation */}
      <header className="main-navbar">
        <div className="nav-container">
          <div className="nav-logo" onClick={() => router.push('/')}>
            <div className="logo-icon-sphere">👶</div>
            <span className="logo-brand-text">First<span>Years</span></span>
          </div>

          <nav className="nav-links">
            <button className="nav-link-btn active">Home</button>
            <button className="nav-link-btn" onClick={() => handleStartJourney('/vaccines')}>Schedule Catalog</button>
            <button className="nav-link-btn" onClick={() => handleStartJourney('/timeline')}>Milestones</button>
            <button className="nav-link-btn" onClick={() => handleStartJourney('/certificates')}>e-Certificates</button>
            <button className="nav-link-btn" onClick={() => handleStartJourney('/notifications')}>Reminders</button>
          </nav>

          <div className="nav-meta-actions">
            {isLoggedIn ? (
              <button 
                className="btn-nav-primary" 
                onClick={() => router.push(activeChild ? '/dashboard' : '/add-child')}
              >
                Go to Dashboard →
              </button>
            ) : (
              <>
                <button className="btn-nav-login" onClick={() => router.push('/login')}>Login</button>
                <button className="btn-nav-primary" onClick={() => router.push('/register')}>Register</button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Interactive Hero Slider */}
      <section className="hero-slider-section">
        <div className="slider-wrapper">
          {slides.map((slide, index) => (
            <div 
              key={index} 
              className={`slide-item ${index === activeSlide ? 'active' : ''}`}
            >
              {/* Slider background illustration details */}
              <div className="slide-bg-graphic">
                <div className="graphic-blob blob-1"></div>
                <div className="graphic-blob blob-2"></div>
                <div className="graphic-blob blob-3"></div>
              </div>

              <div className="slide-content-container">
                <div className="hero-panel-overlay">
                  <span className="hero-badge">{slide.badge}</span>
                  <h1 className="hero-title">{slide.title}</h1>
                  <p className="hero-subtitle">{slide.subtitle}</p>
                  
                  <div className="hero-actions">
                    <button 
                      className={`btn-hero-cta ${clickedCTA ? 'submitting' : ''}`}
                      onClick={() => handleStartJourney('/register')}
                    >
                      {clickedCTA ? 'Launching App...' : 'Start Digital Card Now'}
                      <span className="arrow-icon">→</span>
                    </button>
                    <button 
                      className="btn-hero-secondary"
                      onClick={() => handleStartJourney('/vaccines')}
                    >
                      Browse Indian Schedule
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Slider dots */}
        <div className="slider-controls-dots">
          {slides.map((_, index) => (
            <button 
              key={index} 
              className={`dot-indicator ${index === activeSlide ? 'active' : ''}`}
              onClick={() => setActiveSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 3-Column Spotlight Banners (Matching Jadusona's styles) */}
      <section className="spotlight-banners-section">
        <div className="spotlight-grid">
          
          {/* Card 1: Blue theme */}
          <div className="spotlight-card blue-card animate-fade-in-up">
            <div className="spotlight-info">
              <span className="spotlight-badge">Milestone Schedule</span>
              <h3 className="spotlight-headline">Never Miss Baby&apos;s Doses</h3>
              <p className="spotlight-desc">Smart reminders track milestone schedules automatically.</p>
              <button className="spotlight-btn" onClick={() => handleStartJourney('/notifications')}>
                Explore Calendar <span className="arrow">→</span>
              </button>
            </div>
            <div className="spotlight-graphic-circle">
              <svg viewBox="0 0 100 100" className="svg-illustration">
                <circle cx="50" cy="50" r="45" fill="var(--primary-100)" />
                <path d="M50 25v30M35 45h30" stroke="var(--primary-500)" strokeWidth="6" strokeLinecap="round" />
                <rect x="42" y="15" width="16" height="10" rx="3" fill="var(--primary-600)" />
                <path d="M47 55v15M53 55v15M45 70h10" stroke="var(--primary-400)" strokeWidth="4" />
              </svg>
            </div>
          </div>

          {/* Card 2: Pink theme */}
          <div className="spotlight-card pink-card animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <div className="spotlight-info">
              <span className="spotlight-badge">Easy Upload</span>
              <h3 className="spotlight-headline">Digital Booklet Cards</h3>
              <p className="spotlight-desc">Replace your physical cards and certificates globally.</p>
              <button className="spotlight-btn" onClick={() => handleStartJourney('/timeline')}>
                Digitise Now <span className="arrow">→</span>
              </button>
            </div>
            <div className="spotlight-graphic-circle">
              <svg viewBox="0 0 100 100" className="svg-illustration">
                <circle cx="50" cy="50" r="45" fill="var(--primary-100)" />
                <rect x="30" y="25" width="40" height="50" rx="4" fill="white" stroke="var(--primary-400)" strokeWidth="4" />
                <line x1="38" y1="38" x2="62" y2="38" stroke="var(--primary-300)" strokeWidth="4" strokeLinecap="round" />
                <line x1="38" y1="50" x2="56" y2="50" stroke="var(--primary-300)" strokeWidth="4" strokeLinecap="round" />
                <line x1="38" y1="62" x2="48" y2="62" stroke="var(--primary-500)" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Card 3: Orange/Gold theme */}
          <div className="spotlight-card amber-card animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <div className="spotlight-info">
              <span className="spotlight-badge">Printable PDF</span>
              <h3 className="spotlight-headline">e-Certificates Secured</h3>
              <p className="spotlight-desc">Download and share government accredited documents.</p>
              <button className="spotlight-btn" onClick={() => handleStartJourney('/certificates')}>
                View Certificates <span className="arrow">→</span>
              </button>
            </div>
            <div className="spotlight-graphic-circle">
              <svg viewBox="0 0 100 100" className="svg-illustration">
                <circle cx="50" cy="50" r="45" fill="var(--primary-100)" />
                <polygon points="50,20 60,40 82,40 65,55 70,78 50,65 30,78 35,55 18,40 40,40" fill="var(--primary-500)" />
                <circle cx="50" cy="45" r="8" fill="white" opacity="0.8" />
              </svg>
            </div>
          </div>

        </div>
      </section>

      {/* Trust credentials details bar */}
      <section className="credentials-info-sec">
        <div className="credentials-container">
          <div className="credential-item">
            <span className="cred-icon">🇮🇳</span>
            <div>
              <h4>India UIP Recommended</h4>
              <p>Supports all 32 mandatory vaccine schedules</p>
            </div>
          </div>
          <div className="credential-item">
            <span className="cred-icon">🔒</span>
            <div>
              <h4>100% Secure Storage</h4>
              <p>Local state sandbox ensures absolute data privacy</p>
            </div>
          </div>
          <div className="credential-item">
            <span className="cred-icon">📲</span>
            <div>
              <h4>Zero Network Wait</h4>
              <p>Works fully offline on your mobile browser</p>
            </div>
          </div>
        </div>
      </section>

      {/* Styled clean footer */}
      <footer className="landing-footer">
        <div className="footer-container">
          <p>© {new Date().getFullYear()} FirstYears Digital Health Services. Working in alignment with the Ministry of Health and Family Welfare (MoHFW) guidelines.</p>
          <div className="footer-links">
            <button className="footer-btn" onClick={() => setShowPrivacyModal(true)}>Privacy Policy</button>
            <button className="footer-btn" onClick={() => setShowTermsModal(true)}>Terms of Use</button>
            <button className="footer-btn" onClick={() => setShowResetModal(true)}>App Reset</button>
          </div>
        </div>
      </footer>

      {/* --- SUCCESS RESET TOAST SIGNAL --- */}
      {resetSuccess && (
        <div className="toast-reset-banner animate-scale-in">
          <span className="toast-icon">🗑️</span>
          <div className="toast-msg">
            <h4>App Sandbox Deleted</h4>
            <p>Restarting application fresh...</p>
          </div>
        </div>
      )}

      {/* --- PRIVACY POLICY MODAL --- */}
      {showPrivacyModal && (
        <div className="modal-backdrop-wrap animate-fade-in" onClick={() => setShowPrivacyModal(false)}>
          <div className="modal-content-card animate-scale-in" onClick={e => e.stopPropagation()}>
            <div className="modal-head">
              <h3>🔒 Privacy Policy</h3>
              <button className="modal-close-trigger" onClick={() => setShowPrivacyModal(false)}>✕</button>
            </div>
            <div className="modal-body-scroll">
              <span className="modal-category">Data Sovereign Statement</span>
              <p>At FirstYears, your privacy is our supreme directive. In accordance with the <strong>Digital Personal Data Protection (DPDP) Act of India</strong>, we provide a complete data-private client sandbox model.</p>
              
              <h4>1. Local Storage Exclusive Model</h4>
              <p>All data entered—including your child&apos;s full name, date of birth, blood group, logs of administration, doctor metadata, and digital e-certificates—is kept securely inside your device&apos;s local application container sandbox (localStorage/IndexedDB).</p>
              
              <h4>2. No Cloud Synchronization</h4>
              <p>This web application does not transmit your personal child profiles to any external servers or third-party cloud stores. The e-certificates generated are processed inside the local runtime of your browser.</p>
              
              <h4>3. Absolute Sovereignty</h4>
              <p>You have full, absolute sovereignty over your records. You can delete all traces of your account instantly by using the <strong>App Reset</strong> feature or clearing your browser files.</p>
            </div>
            <div className="modal-foot">
              <button className="btn-modal-action" onClick={() => setShowPrivacyModal(false)}>Ack and Close</button>
            </div>
          </div>
        </div>
      )}

      {/* --- TERMS OF USE MODAL --- */}
      {showTermsModal && (
        <div className="modal-backdrop-wrap animate-fade-in" onClick={() => setShowTermsModal(false)}>
          <div className="modal-content-card animate-scale-in" onClick={e => e.stopPropagation()}>
            <div className="modal-head">
              <h3>📋 Terms of Use</h3>
              <button className="modal-close-trigger" onClick={() => setShowTermsModal(false)}>✕</button>
            </div>
            <div className="modal-body-scroll">
              <span className="modal-category">Legal Disclaimer & Guide</span>
              <p>Please read these Terms of Use carefully before using firstyears.co.in or local testing installations of the digital immunization ledger.</p>
              
              <h4>1. Medical Disclaimer</h4>
              <p>FirstYears works in alignment with vaccine tables recommended under the National Universal Immunisation Programme (UIP) of India. However, this app functions strictly as a record helper companion. It is NOT a substitute for professional clinical medical advice, pediatric diagnosis, or custom vaccination advice by your family pediatrician.</p>
              
              <h4>2. Accurate Record Keeping</h4>
              <p>You are solely responsible for ensuring the dates and batch logs entered correspond with actual health administrations. The stamp verification seal is generated locally based on user data input.</p>
              
              <h4>3. Sandbox Limitation</h4>
              <p>Because the app runs locally inside your browser storage, uninstalling or resetting your browser will permanently delete all records. Always export or print your certificates as printed booklet backups.</p>
            </div>
            <div className="modal-foot">
              <button className="btn-modal-action" onClick={() => setShowTermsModal(false)}>I Agree & Continue</button>
            </div>
          </div>
        </div>
      )}

      {/* --- APP RESET DESTRUCTIVE WARNING MODAL --- */}
      {showResetModal && (
        <div className="modal-backdrop-wrap animate-fade-in" onClick={() => setShowResetModal(false)}>
          <div className="modal-content-card modal-border-destructive animate-scale-in" onClick={e => e.stopPropagation()}>
            <div className="modal-head head-destructive">
              <h3>⚠️ Permanent Application Reset</h3>
              <button className="modal-close-trigger" onClick={() => setShowResetModal(false)}>✕</button>
            </div>
            <div className="modal-body-scroll text-center-mobile">
              <div className="warning-excl">🗑️</div>
              <h4>Are you absolutely sure?</h4>
              <p>This action is completely irreversible. Your current parent account, all registered children sibling details, vaccination calendars, doctor files, and generated e-certificates will be permanently erased from this browser sandbox.</p>
              <div className="warning-callout">
                Once executed, your data cannot be retrieved, and the app will reload to the registration phase.
              </div>
            </div>
            <div className="modal-foot gap-12">
              <button className="btn-modal-cancel" onClick={() => setShowResetModal(false)}>No, Keep Card</button>
              <button className="btn-modal-destructive" onClick={handleAppReset}>Yes, Delete Data</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
