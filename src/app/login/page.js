'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/data/store';
import EarthyBackground from '@/components/EarthyBackground';
import '../register/auth.css';

export default function LoginPage() {
  const router = useRouter();
  const { login, isRegistered, parent } = useApp();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [navigating, setNavigating] = useState(false);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.email.trim()) errs.email = 'Email is required';
    if (!form.password) errs.password = 'Password is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));

    // Local auth — check if registered
    if (!isRegistered) {
      setErrors({ email: 'No account found. Please register first.' });
      setLoading(false);
      return;
    }

    if (form.email !== parent.email) {
      setErrors({ email: 'Email does not match registered account' });
      setLoading(false);
      return;
    }

    if (form.password !== parent.password) {
      setErrors({ password: 'Incorrect password' });
      setLoading(false);
      return;
    }

    login();
    setNavigating(true);
    await new Promise(r => setTimeout(r, 1800));
    router.push('/dashboard');
  };

  return (
    <div className="auth-page">
      {/* Premium canvas fluid waves background */}
      <EarthyBackground />

      <div className="auth-container animate-fade-in-up">
        <div className="auth-welcome-header">
          <div className="auth-welcome-icon">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="12" r="5" stroke="var(--primary-500)" strokeWidth="2"/>
              <path d="M6 28c0-5.5 4.5-10 10-10s10 4.5 10 10" stroke="var(--primary-500)" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Log in to access your child&apos;s vaccination records</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form" id="login-form">
          <div className="input-group">
            <label className="input-label" htmlFor="login-email">Email Address</label>
            <input
              id="login-email"
              className={`input-field ${errors.email ? 'input-error' : ''}`}
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={e => handleChange('email', e.target.value)}
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="login-password">Password</label>
            <div className="password-input-wrapper">
              <input
                id="login-password"
                className={`input-field ${errors.password ? 'input-error' : ''}`}
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={form.password}
                onChange={e => handleChange('password', e.target.value)}
              />
              <button
                type="button"
                className={`password-toggle-btn ${showPassword ? 'visible' : ''}`}
                onClick={() => setShowPassword(prev => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                id="login-password-toggle"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="eye-icon"
                >
                  <g className="eye-open-g">
                    <path className="eye-outline" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle className="eye-pupil" cx="12" cy="12" r="3" fill="currentColor" />
                  </g>
                  <g className="eye-closed-g">
                    <path className="eye-lid" d="M2 11c3 4 7 6 10 6s7-2 10-6" />
                    <path className="eye-lashes" d="M12 17v3.5M5 14L3 17M19 14l2 3M8.2 16L6.5 19M15.8 16l1.7 3" />
                  </g>
                </svg>
              </button>
            </div>
            {errors.password && <span className="field-error">{errors.password}</span>}
          </div>

          <button type="button" className="auth-forgot" id="login-forgot">
            Forgot Password?
          </button>

          <button
            type="submit"
            className="btn btn-primary btn-lg btn-full"
            disabled={loading}
            id="login-submit"
          >
            {loading ? (
              <span className="btn-loading">
                <span className="spinner" />
                Logging In...
              </span>
            ) : 'Log In'}
          </button>
        </form>

        <p className="auth-footer-text">
          Don&apos;t have an account?{' '}
          <button onClick={() => router.push('/register')} className="auth-link" id="login-to-register">
            Register
          </button>
        </p>
      </div>

      {/* Premium Loading Transition Overlay */}
      {navigating && (
        <div className="premium-loader-overlay">
          <div className="premium-loader-content">
            <div className="premium-loader-spinner">
              <div className="loader-ring loader-ring-1" />
              <div className="loader-ring loader-ring-2" />
              <div className="loader-ring loader-ring-3" />
              <div className="loader-logo">
                <svg width="44" height="44" viewBox="0 0 56 56" fill="none">
                  <defs>
                    <linearGradient id="loaderGradLogin" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFB385"/>
                      <stop offset="50%" stopColor="#FFD2B8"/>
                      <stop offset="100%" stopColor="#D2EBFC"/>
                    </linearGradient>
                  </defs>
                  <circle cx="28" cy="28" r="26" stroke="url(#loaderGradLogin)" strokeWidth="4.5" fill="none"/>
                  <path d="M20 32C20 32 22 36 28 36C34 36 36 32 36 32" stroke="url(#loaderGradLogin)" strokeWidth="2.5" strokeLinecap="round"/>
                  <circle cx="22" cy="24" r="2" fill="#FFB385"/>
                  <circle cx="34" cy="24" r="2" fill="#8AC8F5"/>
                </svg>
              </div>
            </div>
            <div className="premium-loader-text">
              <h2 className="loader-title">Welcome Back!</h2>
              <p className="loader-subtitle">Loading your dashboard...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
