'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/data/store';
import BottomNav from '@/components/BottomNav';
import './notifications.css';

export default function NotificationsPage() {
  const router = useRouter();
  const { isLoggedIn, activeChild, getChildRecords } = useApp();
  const [channels, setChannels] = useState({ sms: true, whatsapp: true, email: false });
  const [simulatedAlert, setSimulatedAlert] = useState(null);

  useEffect(() => {
    if (!isLoggedIn) router.replace('/login');
    else if (!activeChild) router.replace('/add-child');
  }, [isLoggedIn, activeChild, router]);

  if (!isLoggedIn || !activeChild) return null;

  const records = getChildRecords() || [];

  // Generate alerts based on record status
  const overdueAlerts = records.filter(r => r.status === 'overdue');
  const upcomingAlerts = records.filter(r => r.status === 'upcoming');

  const handleChannelToggle = (channel) => {
    setChannels(prev => ({
      ...prev,
      [channel]: !prev[channel]
    }));
  };

  const triggerSimulation = () => {
    // Pick the most pressing notification: first overdue, else first upcoming, else general tip
    let title = 'Healthy Growth Tip';
    let message = 'Keep track of height and weight updates monthly to confirm active milestones.';
    let type = 'tip';
    let vaccineId = null;

    if (overdueAlerts.length > 0) {
      const v = overdueAlerts[0];
      title = '⚠️ OVERDUE IMMUNISATION WARNING';
      message = `Critical alert: ${activeChild.childName} is overdue for the ${v.vaccine?.name} vaccine (${v.vaccine?.disease}). Please visit your pediatrician as soon as possible.`;
      type = 'overdue';
      vaccineId = v.vaccineId;
    } else if (upcomingAlerts.length > 0) {
      const v = upcomingAlerts[0];
      title = '⏰ Upcoming Vaccine Reminder';
      message = `${activeChild.childName}'s dose of ${v.vaccine?.name} is scheduled on ${new Date(v.dueDate).toLocaleDateString('en-IN')}. Please book your clinic slot.`;
      type = 'upcoming';
      vaccineId = v.vaccineId;
    }

    setSimulatedAlert({ title, message, type, vaccineId });

    // Auto-dismiss after 6 seconds
    setTimeout(() => {
      setSimulatedAlert(null);
    }, 6000);
  };

  return (
    <div className="page-container">
      {/* Simulation Banner Overlay */}
      {simulatedAlert && (
        <div className={`simulator-banner animate-scale-in sub-alert-${simulatedAlert.type}`} id="simulation-banner">
          <div className="sim-header">
            <span>📲 SIMULATED REMINDER BROADCAST</span>
            <button className="sim-dismiss" onClick={() => setSimulatedAlert(null)}>✕</button>
          </div>
          <div className="sim-body">
            <div className="sim-phone-screen">
              <div className="sim-app-header">
                <span>FirstYears Reminders</span>
                <span>Just Now</span>
              </div>
              <h4 className="sim-msg-title">{simulatedAlert.title}</h4>
              <p className="sim-msg-text">{simulatedAlert.message}</p>
              {simulatedAlert.vaccineId && (
                <button 
                  className="sim-view-btn"
                  onClick={() => {
                    setSimulatedAlert(null);
                    router.push(`/vaccines/${simulatedAlert.vaccineId}`);
                  }}
                >
                  Configure Appointment Details
                </button>
              )}
            </div>
          </div>
          <div className="sim-footer">
            Simulated message broadcasted successfully to your registered WhatsApp/SMS channels.
          </div>
        </div>
      )}

      <div className="page-content">
        {/* Header */}
        <header className="notif-page-header animate-fade-in-down">
          <div>
            <h1 className="notif-page-title">Reminders</h1>
            <p className="notif-page-subtitle">Alert channels for {activeChild.childName}</p>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={triggerSimulation} id="simulate-notif-btn">
            Test Reminder Simulator
          </button>
        </header>

        {/* Dynamic Alerts List */}
        <div className="notif-alerts-section stagger-children">
          <h3 className="section-title">Critical Status Alerts</h3>
          
          {overdueAlerts.length === 0 && upcomingAlerts.length === 0 ? (
            <div className="notif-clean-state card animate-scale-in">
              <span className="clean-icon">🎉</span>
              <h3>No Pressing Alerts</h3>
              <p>Your child is fully caught up with all current and upcoming immunisations!</p>
            </div>
          ) : (
            <>
              {overdueAlerts.map(alert => (
                <div 
                  key={alert.id}
                  className="alert-item card alert-status-overdue animate-fade-in-up"
                  onClick={() => router.push(`/vaccines/${alert.vaccineId}`)}
                >
                  <span className="notif-icon">⚠️</span>
                  <div className="alert-content">
                    <div className="alert-badge overdue">Missed / Overdue</div>
                    <h4 className="alert-title">{alert.vaccine?.name} Vaccine</h4>
                    <p className="alert-text">
                      Was due on {new Date(alert.dueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}.
                      Dose target is {alert.vaccine?.disease}.
                    </p>
                  </div>
                </div>
              ))}

              {upcomingAlerts.map(alert => (
                <div 
                  key={alert.id}
                  className="alert-item card alert-status-upcoming animate-fade-in-up"
                  onClick={() => router.push(`/vaccines/${alert.vaccineId}`)}
                >
                  <span className="notif-icon">⏰</span>
                  <div className="alert-content">
                    <div className="alert-badge upcoming">Due Soon</div>
                    <h4 className="alert-title">{alert.vaccine?.name} Scheduled</h4>
                    <p className="alert-text">
                      Due on {new Date(alert.dueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}.
                      Immunises against {alert.vaccine?.disease}.
                    </p>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Interactive channels selection form */}
        <div className="notif-channels-card card animate-fade-in-up" style={{ animationDelay: '150ms' }}>
          <h3>Broadcast Notification Settings</h3>
          <p>Tweak where and how you receive immunisation alerts for your child.</p>

          <div className="channels-checklist">
            <label className="channel-row clickable">
              <div className="channel-info">
                <strong>WhatsApp Messenger Alerts</strong>
                <p>Send interactive reminders and calendar invites</p>
              </div>
              <input 
                type="checkbox" 
                checked={channels.whatsapp}
                onChange={() => handleChannelToggle('whatsapp')}
                className="custom-toggle"
                id="channel-whatsapp"
              />
            </label>

            <label className="channel-row clickable">
              <div className="channel-info">
                <strong>SMS Text Alerts</strong>
                <p>Immediate broadcast via cellular network carrier</p>
              </div>
              <input 
                type="checkbox" 
                checked={channels.sms}
                onChange={() => handleChannelToggle('sms')}
                className="custom-toggle"
                id="channel-sms"
              />
            </label>

            <label className="channel-row clickable">
              <div className="channel-info">
                <strong>E-mail Digests</strong>
                <p>Monthly PDF schedule reports and certificates backup</p>
              </div>
              <input 
                type="checkbox" 
                checked={channels.email}
                onChange={() => handleChannelToggle('email')}
                className="custom-toggle"
                id="channel-email"
              />
            </label>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
