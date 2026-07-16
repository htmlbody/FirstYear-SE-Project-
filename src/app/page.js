'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/data/store';
import BottomNav from '@/components/BottomNav';
import EarthyBackground from '@/components/EarthyBackground';
import './page.css';

export default function SplashPage() {
  const router = useRouter();
  const { isLoaded, isLoggedIn, activeChild } = useApp();
  const [showContent, setShowContent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loaderKey, setLoaderKey] = useState(0);

  useEffect(() => {
    if (!isLoaded) return;
    
    // If already logged in, redirect
    if (isLoggedIn && activeChild) {
      router.replace('/dashboard');
      return;
    }
    if (isLoggedIn && !activeChild) {
      router.replace('/add-child');
      return;
    }

    // Show splash content
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, [isLoaded, isLoggedIn, activeChild, router]);

  // Reset loading when component re-mounts (e.g. navigating back)
  useEffect(() => {
    setLoading(false);
  }, []);

  const handleGetStarted = async () => {
    setLoaderKey(prev => prev + 1); // Force fresh DOM for animations
    setLoading(true);
    await new Promise(r => setTimeout(r, 1600));
    router.push('/register');
  };

  return (
    <div className="splash-page">
      {/* Premium canvas fluid waves background */}
      <EarthyBackground />

      <div className={`splash-content ${showContent ? 'splash-visible' : ''}`}>
        {/* Logo / Brand */}
        <div className="splash-logo-wrap">
          <div className="splash-logo">
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
              <defs>
                <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFB385"/>
                  <stop offset="50%" stopColor="#FFD2B8"/>
                  <stop offset="100%" stopColor="#D2EBFC"/>
                </linearGradient>
              </defs>
              <circle cx="28" cy="28" r="26" stroke="url(#logoGrad)" strokeWidth="3" fill="none"/>
              <path d="M20 32C20 32 22 36 28 36C34 36 36 32 36 32" stroke="url(#logoGrad)" strokeWidth="2.5" strokeLinecap="round"/>
              <circle cx="22" cy="24" r="2" fill="#FFB385"/>
              <circle cx="34" cy="24" r="2" fill="#8AC8F5"/>
              <path d="M28 16V14M28 14L26 12M28 14L30 12" stroke="url(#logoGrad)" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <h1 className="splash-title">FirstYears</h1>
          <p className="splash-tagline">Digital Vaccination Record & Reminder</p>
        </div>

        {/* Feature highlights */}
        <div className="splash-features">
          <div className="splash-feature">
            <span className="splash-feature-icon">🛡️</span>
            <div>
              <h3>Never Miss a Vaccine</h3>
              <p>Smart reminders keep your child on schedule</p>
            </div>
          </div>
          <div className="splash-feature">
            <span className="splash-feature-icon">📋</span>
            <div>
              <h3>Digital Records</h3>
              <p>Replace the physical vaccination booklet</p>
            </div>
          </div>
          <div className="splash-feature">
            <span className="splash-feature-icon">🏆</span>
            <div>
              <h3>e-Certificates</h3>
              <p>Auto-generated digital vaccination certificates</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="splash-actions">
          <button
            className={`btn btn-primary btn-lg btn-full splash-cta ${loading ? 'cta-loading' : ''}`}
            onClick={handleGetStarted}
            disabled={loading}
            id="splash-get-started"
          >
            {loading ? (
              <span className="luxury-btn-loading">
                <svg className="luxury-btn-spinner" width="20" height="20" viewBox="0 0 24 24">
                  <circle className="spinner-track" cx="12" cy="12" r="10" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="2.5" fill="none" />
                  <circle className="spinner-fill" cx="12" cy="12" r="10" stroke="url(#btnSpinnerGrad)" strokeWidth="2.5" fill="none" strokeDasharray="62.8" strokeDashoffset="20" />
                  <defs>
                    <linearGradient id="btnSpinnerGrad" x1="0" y1="0" x2="24" y2="24">
                      <stop offset="0%" stopColor="#FFF2E8" />
                      <stop offset="50%" stopColor="#FFA06E" />
                      <stop offset="100%" stopColor="#FFF2E8" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className="luxury-btn-text">Preparing Journey...</span>
                <div className="btn-progress-line-fill" />
              </span>
            ) : (
              <>
                Get Started
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M4 10h12M12 6l4 4-4 4"/>
                </svg>
              </>
            )}
          </button>
          <p className="splash-login-link">
            Already have an account?{' '}
            <button onClick={() => router.push('/login')} className="splash-link" id="splash-login">
              Log In
            </button>
          </p>
        </div>

        <p className="splash-footer">
          Following India&apos;s Universal Immunisation Programme
        </p>
      </div>
    </div>
  );
}
