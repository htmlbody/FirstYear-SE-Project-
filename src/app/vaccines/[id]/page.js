'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useApp } from '@/data/store';
import { VACCINE_CATALOG } from '@/data/vaccines';
import './details.css';

export default function VaccineDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const { isLoggedIn, activeChild, getChildRecords, markVaccineComplete, isLoaded } = useApp();

  const records = isLoggedIn && activeChild ? getChildRecords() : [];
  const record = records.find(r => r.vaccineId === id);

  const [showMarkForm, setShowMarkForm] = useState(false);
  const [formData, setFormData] = useState({
    completedDate: new Date().toISOString().split('T')[0],
    hospital: '',
    doctor: '',
    batchNumber: '',
    notes: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace('/login');
      return;
    }
    if (!activeChild) {
      router.replace('/add-child');
      return;
    }
    if (isLoaded && !record) {
      router.replace('/vaccines');
    }
  }, [isLoggedIn, activeChild, record, router, isLoaded]);

  if (!isLoggedIn || !activeChild || !record) return null;

  const { vaccine } = record;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.completedDate) errors.completedDate = 'Date administered is required';
    else {
      const selected = new Date(formData.completedDate);
      const today = new Date();
      const birth = new Date(activeChild.dob);
      if (selected > today) errors.completedDate = 'Date cannot be in the future';
      if (selected < birth) errors.completedDate = 'Date cannot be before child DOB';
    }
    if (!formData.hospital.trim()) errors.hospital = 'Hospital or Health Center is required';
    if (!formData.doctor.trim()) errors.doctor = 'Doctor or health worker name is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const cert = markVaccineComplete(record.id, {
      completedDate: formData.completedDate,
      hospital: formData.hospital,
      doctor: formData.doctor,
      batchNumber: formData.batchNumber,
      notes: formData.notes
    });

    setSubmitting(false);
    setShowMarkForm(false);
    
    // Redirect directly to the generated certificate! (WOW factor)
    if (cert) {
      router.push(`/certificates/${cert.id}?success=true`);
    } else {
      router.refresh();
    }
  };

  return (
    <div className="page-container">
      <div className="page-content">
        {/* Navigation Back Header */}
        <header className="details-header animate-fade-in-down">
          <button className="auth-back" onClick={() => router.back()} id="detail-back">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M15 10H5M5 10l4-4M5 10l4 4"/>
            </svg>
          </button>
          <div>
            <span className={`status-badge status-${record.status}`}>
              {record.status === 'completed' ? '🟢 Completed' : record.status === 'overdue' ? '🔴 Overdue' : record.status === 'upcoming' ? '🟡 Upcoming' : '⚪ Future'}
            </span>
            <h1 className="details-title">{vaccine.name}</h1>
          </div>
        </header>

        {/* Hero Card details */}
        <div className="vaccine-hero-card card animate-scale-in">
          <div className="vaccine-hero-grid">
            <div className="hero-cell">
              <span className="hero-cell-label">Disease Targeted</span>
              <span className="hero-cell-val font-accent">{vaccine.disease}</span>
            </div>
            <div className="hero-cell">
              <span className="hero-cell-label">Recommended Age</span>
              <span className="hero-cell-val">{vaccine.recommendedAge}</span>
            </div>
            <div className="hero-cell">
              <span className="hero-cell-label">Dose Number</span>
              <span className="hero-cell-val">{vaccine.doseLabel}</span>
            </div>
            <div className="hero-cell">
              <span className="hero-cell-label">Administration Route</span>
              <span className="hero-cell-val">{vaccine.route || 'Intramuscular'}</span>
            </div>
          </div>
        </div>

        {/* Completion details if completed */}
        {record.completedDate ? (
          <div className="vaccine-completed-card card animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <div className="completed-card-badge">✓ Administered</div>
            <h3 className="comp-card-title">Immunisation Record</h3>
            <div className="comp-grid">
              <div className="comp-row">
                <span>Date Administered:</span>
                <strong>{new Date(record.completedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</strong>
              </div>
              <div className="comp-row">
                <span>Hospital/Center:</span>
                <strong>{record.hospital}</strong>
              </div>
              <div className="comp-row">
                <span>Doctor/Worker:</span>
                <strong>{record.doctor}</strong>
              </div>
              {record.batchNumber && (
                <div className="comp-row">
                  <span>Vaccine Batch:</span>
                  <strong>{record.batchNumber}</strong>
                </div>
              )}
              {record.notes && (
                <div className="comp-row notes-row">
                  <span>Additional Notes:</span>
                  <p>{record.notes}</p>
                </div>
              )}
            </div>
            <div className="comp-actions">
              <button
                className="btn btn-primary btn-full"
                onClick={() => {
                  const certs = getChildRecords();
                  // Find the certificate matched
                  router.push(`/certificates`);
                }}
                id="view-certificate-btn"
              >
                🏆 View Certificate
              </button>
            </div>
          </div>
        ) : (
          /* Call to Action for Complete vaccine */
          !showMarkForm && (
            <div className="mark-complete-cue card animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <h3>Administered this vaccine?</h3>
              <p>Mark it complete to update the schedule, save doctor details, and auto-generate an official e-certificate.</p>
              <button
                className="btn btn-primary btn-full"
                onClick={() => setShowMarkForm(true)}
                id="open-mark-complete"
              >
                Mark Vaccine Completed
              </button>
            </div>
          )
        )}

        {/* Mark Completed Form Modal/Pane */}
        {showMarkForm && (
          <div className="mark-complete-form-panel card animate-scale-in" id="mark-complete-section">
            <div className="form-panel-header">
              <h3>Record Administration</h3>
              <button className="close-panel-btn" onClick={() => setShowMarkForm(false)}>✕</button>
            </div>

            <form onSubmit={handleSave}>
              <div className="input-group">
                <label className="input-label" htmlFor="comp-date">Date Administered</label>
                <input
                  id="comp-date"
                  className={`input-field ${formErrors.completedDate ? 'input-error' : ''}`}
                  type="date"
                  value={formData.completedDate}
                  onChange={e => handleInputChange('completedDate', e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                />
                {formErrors.completedDate && <span className="field-error">{formErrors.completedDate}</span>}
              </div>

              <div className="input-group">
                <label className="input-label" htmlFor="comp-hospital">Hospital / Government Health Center</label>
                <input
                  id="comp-hospital"
                  className={`input-field ${formErrors.hospital ? 'input-error' : ''}`}
                  type="text"
                  placeholder="e.g. Apollo Hospital, Govt PHC Clinic"
                  value={formData.hospital}
                  onChange={e => handleInputChange('hospital', e.target.value)}
                />
                {formErrors.hospital && <span className="field-error">{formErrors.hospital}</span>}
              </div>

              <div className="input-group">
                <label className="input-label" htmlFor="comp-doctor">Pediatrician / Healthcare Practitioner</label>
                <input
                  id="comp-doctor"
                  className={`input-field ${formErrors.doctor ? 'input-error' : ''}`}
                  type="text"
                  placeholder="e.g. Dr. Nitin Sharma"
                  value={formData.doctor}
                  onChange={e => handleInputChange('doctor', e.target.value)}
                />
                {formErrors.doctor && <span className="field-error">{formErrors.doctor}</span>}
              </div>

              <div className="input-group">
                <label className="input-label" htmlFor="comp-batch">Vaccine Batch Number <span className="optional-tag">(Optional)</span></label>
                <input
                  id="comp-batch"
                  className="input-field"
                  type="text"
                  placeholder="e.g. BATCH-897A"
                  value={formData.batchNumber}
                  onChange={e => handleInputChange('batchNumber', e.target.value)}
                />
              </div>

              <div className="input-group">
                <label className="input-label" htmlFor="comp-notes">Remarks / Growth Notes <span className="optional-tag">(Optional)</span></label>
                <textarea
                  id="comp-notes"
                  className="input-field"
                  placeholder="E.g. Mild fever advisory given. Next appointment reminder set."
                  rows={2}
                  value={formData.notes}
                  onChange={e => handleInputChange('notes', e.target.value)}
                />
              </div>

              <div className="form-panel-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  disabled={submitting}
                  onClick={() => setShowMarkForm(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={submitting}
                  id="submit-mark-complete"
                >
                  {submitting ? (
                    <span className="btn-loading">
                      <span className="spinner" />
                      Generating Certificate...
                    </span>
                  ) : 'Save & Generate Certificate'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Informational Sections */}
        <div className="vaccine-info-accordion stagger-children">
          <div className="info-section card animate-fade-in-up" style={{ animationDelay: '150ms' }}>
            <h3 className="info-section-title">💡 Why this Vaccine is Important</h3>
            <p className="info-section-text">{vaccine.importance}</p>
          </div>

          <div className="info-section card animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <h3 className="info-section-title">ℹ️ Description</h3>
            <p className="info-section-text">{vaccine.description}</p>
          </div>

          {vaccine.sideEffects && vaccine.sideEffects.length > 0 && (
            <div className="info-section card animate-fade-in-up" style={{ animationDelay: '250ms' }}>
              <h3 className="info-section-title">🌡️ Common Side Effects</h3>
              <ul className="info-list">
                {vaccine.sideEffects.map((effect, idx) => (
                  <li key={idx}>{effect}</li>
                ))}
              </ul>
            </div>
          )}

          {vaccine.precautions && vaccine.precautions.length > 0 && (
            <div className="info-section card animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <h3 className="info-section-title">🛡️ Precautions & Aftercare</h3>
              <ul className="info-list">
                {vaccine.precautions.map((prec, idx) => (
                  <li key={idx}>{prec}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="info-section card animate-fade-in-up" style={{ animationDelay: '350ms' }}>
            <h3 className="info-section-title">🇮🇳 Government Recommendation</h3>
            <p className="info-section-text">{vaccine.governmentRecommendation}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
