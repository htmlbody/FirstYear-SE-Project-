'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/data/store';
import BottomNav from '@/components/BottomNav';
import './profile.css';

export default function ProfilePage() {
  const router = useRouter();
  const { isLoggedIn, parent, children, activeChild, logout, clearAllData, setParent } = useApp();
  const [editingParent, setEditingParent] = useState(false);
  const [parentForm, setParentForm] = useState(() => ({
    name: parent?.name || '',
    email: parent?.email || '',
    phone: parent?.phone || '',
    address: parent?.address || ''
  }));
  const [successMsg, setSuccessMsg] = useState('');

  // Sync parentForm when parent data changes (e.g. after hydration)
  const parentKey = `${parent?.name}|${parent?.email}|${parent?.phone}|${parent?.address}`;
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (!editingParent) {
      setParentForm({
        name: parent?.name || '',
        email: parent?.email || '',
        phone: parent?.phone || '',
        address: parent?.address || ''
      });
    }
  }, [parentKey]); // eslint-disable-line react-hooks/exhaustive-deps
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (!isLoggedIn) router.replace('/login');
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;

  const handleParentSave = (e) => {
    e.preventDefault();
    setParent(prev => ({
      ...prev,
      ...parentForm
    }));
    setEditingParent(false);
    setSuccessMsg('Profile updated successfully');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handlePurge = () => {
    if (confirm('Are you sure you want to delete all child profiles, logs, and account files from this device? This action is permanent!')) {
      clearAllData();
      router.replace('/');
    }
  };

  return (
    <div className="page-container">
      <div className="page-content">
        {/* Header */}
        <header className="profile-header animate-fade-in-down">
          <div>
            <h1 className="profile-title">Profile Settings</h1>
            <p className="profile-subtitle">Manage parent and child details</p>
          </div>
          <button className="btn btn-secondary btn-sm text-overdue" onClick={logout} id="opt-logout">
            Log Out
          </button>
        </header>

        {successMsg && (
          <div className="profile-toast animate-scale-in">
            <span>✓</span> {successMsg}
          </div>
        )}

        {/* Parent Details Card */}
        <div className="profile-card card animate-scale-in">
          <div className="card-sec-head">
            <h3>Parent Information</h3>
            {!editingParent && (
              <button className="edit-link-btn" onClick={() => setEditingParent(true)} id="edit-parent-btn">
                Edit
              </button>
            )}
          </div>

          {editingParent ? (
            <form onSubmit={handleParentSave} className="profile-form">
              <div className="input-group">
                <label className="input-label" htmlFor="edit-p-name">Full Name</label>
                <input
                  id="edit-p-name"
                  type="text"
                  className="input-field"
                  value={parentForm.name}
                  onChange={e => setParentForm(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
              <div className="input-group">
                <label className="input-label" htmlFor="edit-p-email">Email Address</label>
                <input
                  id="edit-p-email"
                  type="email"
                  className="input-field"
                  value={parentForm.email}
                  disabled
                />
                <span className="field-hint">Email address cannot be changed</span>
              </div>
              <div className="input-group">
                <label className="input-label" htmlFor="edit-p-phone">Phone Number</label>
                <input
                  id="edit-p-phone"
                  type="tel"
                  className="input-field"
                  value={parentForm.phone}
                  onChange={e => setParentForm(prev => ({ ...prev, phone: e.target.value }))}
                  maxLength={10}
                  required
                />
              </div>
              <div className="input-group">
                <label className="input-label" htmlFor="edit-p-address">Residential Address</label>
                <textarea
                  id="edit-p-address"
                  className="input-field"
                  rows={2}
                  placeholder="Street and City details"
                  value={parentForm.address}
                  onChange={e => setParentForm(prev => ({ ...prev, address: e.target.value }))}
                />
              </div>
              <div className="form-buttons">
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setEditingParent(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm" id="save-parent-btn">
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="profile-display-grid">
              <div className="p-row">
                <span className="p-lbl">Name:</span>
                <span className="p-val">{parent.name || 'Not provided'}</span>
              </div>
              <div className="p-row">
                <span className="p-lbl">Email:</span>
                <span className="p-val">{parent.email}</span>
              </div>
              <div className="p-row">
                <span className="p-lbl">Phone:</span>
                <span className="p-val">+91 {parent.phone}</span>
              </div>
              <div className="p-row">
                <span className="p-lbl">Address:</span>
                <span className="p-val">{parent.address || 'Not provided'}</span>
              </div>
            </div>
          )}
        </div>

        {/* Children Details Area */}
        <div className="profile-section-block animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <div className="block-header">
            <h3 className="section-title" style={{ marginBottom: 0 }}>Registered Children</h3>
            <button className="btn btn-secondary btn-sm" onClick={() => router.push('/add-child')} id="profile-add-child">
              + Add Sibling
            </button>
          </div>

          <div className="profile-children-list stagger-children">
            {children.map(child => (
              <div key={child.id} className="child-item-card card">
                <div className="child-item-left">
                  <div className="child-av-small">
                    {child.gender === 'female' ? '👧' : '👦'}
                  </div>
                  <div>
                    <h4>{child.childName}</h4>
                    <p>DOB: {new Date(child.dob).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                    <p className="gender-tag">Gender: {child.gender}</p>
                    {child.bloodGroup && <p className="blood-tag">Blood: {child.bloodGroup}</p>}
                  </div>
                </div>
                <div className="child-item-right">
                  {child.id === activeChild?.id && (
                    <span className="active-tag-p">Active</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* App Utility Actions settings */}
        <div className="profile-card card animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <h3 className="card-sec-head" style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: 'var(--space-2)' }}>
            App Preferences
          </h3>
          <div className="profile-display-grid">
            <div className="pref-row">
              <div>
                <h4>7 Days Reminder Alerts</h4>
                <p>Notify baby vaccinations progress beforehand</p>
              </div>
              <input type="checkbox" className="custom-toggle" defaultChecked />
            </div>
            <div className="pref-row">
              <div>
                <h4>Immediate Missed Reminders</h4>
                <p>Notify if vaccines are overdue every 3 days</p>
              </div>
              <input type="checkbox" className="custom-toggle" defaultChecked />
            </div>
          </div>
        </div>

        {/* Purge Card */}
        <div className="profile-card card purge-card animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <h3>Dangerous Actions</h3>
          <p>This will erase certificates, profiles, and logs locally from this app database. It cannot be undone.</p>
          <button className="btn btn-secondary btn-full text-overdue border-overdue" onClick={handlePurge} id="dev-purge-btn">
            Purge Local Vaccine Records
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
