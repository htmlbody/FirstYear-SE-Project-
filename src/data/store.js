'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { VACCINE_CATALOG } from './vaccines';

const AppContext = createContext(null);

// Generate a unique ID
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

// Calculate age from DOB
export function calculateAge(dob) {
  const birthDate = new Date(dob);
  const today = new Date();
  
  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
}

// Calculate age string from DOB
export function getAgeString(dob) {
  const { years, months, days } = calculateAge(dob);
  const parts = [];
  if (years > 0) parts.push(`${years} Year${years > 1 ? 's' : ''}`);
  if (months > 0) parts.push(`${months} Month${months > 1 ? 's' : ''}`);
  if (days > 0) parts.push(`${days} Day${days > 1 ? 's' : ''}`);
  return parts.join(' ') || '0 Days';
}

// Calculate due date for a vaccine based on child's DOB
export function calculateDueDate(dob, recommendedDays) {
  const birthDate = new Date(dob);
  const dueDate = new Date(birthDate);
  dueDate.setDate(dueDate.getDate() + recommendedDays);
  return dueDate;
}

// Determine vaccine status
export function getVaccineStatus(dueDate, completedDate) {
  if (completedDate) return 'completed';
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);
  
  const diffDays = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) return 'overdue';
  if (diffDays <= 14) return 'upcoming';
  return 'future';
}

// Generate vaccine schedule for a child
export function generateVaccineSchedule(childId, dob) {
  return VACCINE_CATALOG.map(vaccine => {
    const dueDate = calculateDueDate(dob, vaccine.recommendedDays);
    return {
      id: `${childId}-${vaccine.id}`,
      childId,
      vaccineId: vaccine.id,
      dueDate: dueDate.toISOString().split('T')[0],
      completedDate: null,
      hospital: '',
      doctor: '',
      batchNumber: '',
      notes: '',
      status: getVaccineStatus(dueDate, null)
    };
  });
}

// Default parent for demo
const DEFAULT_PARENT = {
  id: 'parent-1',
  name: '',
  email: '',
  phone: '',
  address: '',
  createdAt: new Date().toISOString()
};

// Local storage keys
const STORAGE_KEYS = {
  parent: 'firstyears_parent',
  children: 'firstyears_children',
  records: 'firstyears_records',
  certificates: 'firstyears_certificates',
  notifications: 'firstyears_notifications',
  activeChildId: 'firstyears_active_child',
  isLoggedIn: 'firstyears_logged_in',
  isRegistered: 'firstyears_registered'
};

// Safe localStorage helpers
function getStored(key, fallback) {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function setStored(key, value) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('localStorage error:', e);
  }
}

// Generate certificate number
function generateCertificateNumber() {
  const prefix = 'FY';
  const year = new Date().getFullYear();
  const random = Math.random().toString(36).substr(2, 8).toUpperCase();
  return `${prefix}-${year}-${random}`;
}

export function AppProvider({ children: reactChildren }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [parent, setParent] = useState(DEFAULT_PARENT);
  const [children, setChildren] = useState([]);
  const [records, setRecords] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [activeChildId, setActiveChildId] = useState(null);

  // Load from localStorage on mount (SSR-safe hydration pattern)
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setIsLoggedIn(getStored(STORAGE_KEYS.isLoggedIn, false));
    setIsRegistered(getStored(STORAGE_KEYS.isRegistered, false));
    setParent(getStored(STORAGE_KEYS.parent, DEFAULT_PARENT));
    setChildren(getStored(STORAGE_KEYS.children, []));
    setRecords(getStored(STORAGE_KEYS.records, []));
    setCertificates(getStored(STORAGE_KEYS.certificates, []));
    setNotifications(getStored(STORAGE_KEYS.notifications, []));
    setActiveChildId(getStored(STORAGE_KEYS.activeChildId, null));
    setIsLoaded(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Persist to localStorage on change
  useEffect(() => {
    if (!isLoaded) return;
    setStored(STORAGE_KEYS.isLoggedIn, isLoggedIn);
    setStored(STORAGE_KEYS.isRegistered, isRegistered);
    setStored(STORAGE_KEYS.parent, parent);
    setStored(STORAGE_KEYS.children, children);
    setStored(STORAGE_KEYS.records, records);
    setStored(STORAGE_KEYS.certificates, certificates);
    setStored(STORAGE_KEYS.notifications, notifications);
    setStored(STORAGE_KEYS.activeChildId, activeChildId);
  }, [isLoaded, isLoggedIn, isRegistered, parent, children, records, certificates, notifications, activeChildId]);

  // Get active child
  const activeChild = children.find(c => c.id === activeChildId) || children[0] || null;

  // Get theme based on active child's gender
  const theme = (isLoggedIn && activeChild)
    ? (activeChild.gender === 'female' ? 'pink' : 'blue')
    : 'default';

  // Auth actions
  const register = useCallback((parentData) => {
    const newParent = { ...DEFAULT_PARENT, ...parentData, id: generateId(), createdAt: new Date().toISOString() };
    setParent(newParent);
    setIsRegistered(true);
    setIsLoggedIn(true);
  }, []);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  // Child actions
  const addChild = useCallback((childData) => {
    const childId = generateId();
    const newChild = {
      id: childId,
      parentId: parent.id,
      ...childData,
      createdAt: new Date().toISOString()
    };
    
    // Generate vaccine schedule
    const schedule = generateVaccineSchedule(childId, childData.dob);
    
    // Generate notifications
    const newNotifications = schedule.map(record => {
      const dueDate = new Date(record.dueDate);
      const reminders = [];
      
      // 7 days before
      const r7 = new Date(dueDate);
      r7.setDate(r7.getDate() - 7);
      reminders.push({
        id: generateId(),
        childId,
        vaccineId: record.vaccineId,
        reminderDate: r7.toISOString().split('T')[0],
        type: '7day',
        sent: false,
        message: `${VACCINE_CATALOG.find(v => v.id === record.vaccineId)?.name} is due in 7 days`
      });

      // 3 days before
      const r3 = new Date(dueDate);
      r3.setDate(r3.getDate() - 3);
      reminders.push({
        id: generateId(),
        childId,
        vaccineId: record.vaccineId,
        reminderDate: r3.toISOString().split('T')[0],
        type: '3day',
        sent: false,
        message: `${VACCINE_CATALOG.find(v => v.id === record.vaccineId)?.name} is due in 3 days`
      });

      // 1 day before
      const r1 = new Date(dueDate);
      r1.setDate(r1.getDate() - 1);
      reminders.push({
        id: generateId(),
        childId,
        vaccineId: record.vaccineId,
        reminderDate: r1.toISOString().split('T')[0],
        type: '1day',
        sent: false,
        message: `${VACCINE_CATALOG.find(v => v.id === record.vaccineId)?.name} is due tomorrow`
      });

      // On due date
      reminders.push({
        id: generateId(),
        childId,
        vaccineId: record.vaccineId,
        reminderDate: record.dueDate,
        type: 'due',
        sent: false,
        message: `${VACCINE_CATALOG.find(v => v.id === record.vaccineId)?.name} is due today!`
      });

      return reminders;
    }).flat();

    setChildren(prev => [...prev, newChild]);
    setRecords(prev => [...prev, ...schedule]);
    setNotifications(prev => [...prev, ...newNotifications]);
    
    if (!activeChildId) {
      setActiveChildId(childId);
    }

    return childId;
  }, [parent.id, activeChildId]);

  const switchChild = useCallback((childId) => {
    setActiveChildId(childId);
  }, []);

  const updateChild = useCallback((childId, data) => {
    setChildren(prev => prev.map(c => c.id === childId ? { ...c, ...data } : c));
  }, []);

  const deleteChild = useCallback((childId) => {
    setChildren(prev => prev.filter(c => c.id !== childId));
    setRecords(prev => prev.filter(r => r.childId !== childId));
    setCertificates(prev => prev.filter(c => {
      const record = records.find(r => r.id === c.recordId);
      return record?.childId !== childId;
    }));
    setNotifications(prev => prev.filter(n => n.childId !== childId));
    if (activeChildId === childId) {
      setActiveChildId(prev => {
        const remaining = children.filter(c => c.id !== childId);
        return remaining.length > 0 ? remaining[0].id : null;
      });
    }
  }, [activeChildId, children, records]);

  // Vaccine record actions
  const markVaccineComplete = useCallback((recordId, completionData) => {
    let updatedRecord = null;
    
    setRecords(prev => prev.map(r => {
      if (r.id === recordId) {
        updatedRecord = {
          ...r,
          ...completionData,
          completedDate: completionData.completedDate || new Date().toISOString().split('T')[0],
          status: 'completed'
        };
        return updatedRecord;
      }
      return r;
    }));

    // Auto-generate certificate
    if (updatedRecord) {
      const cert = {
        id: generateId(),
        recordId,
        certificateNumber: generateCertificateNumber(),
        generatedAt: new Date().toISOString(),
        childId: updatedRecord.childId,
        vaccineId: updatedRecord.vaccineId
      };
      setCertificates(prev => [...prev, cert]);
      return cert;
    }
    return null;
  }, []);

  // Get records for active child
  const getChildRecords = useCallback((childId) => {
    const cId = childId || activeChildId;
    return records
      .filter(r => r.childId === cId)
      .map(record => {
        const vaccine = VACCINE_CATALOG.find(v => v.id === record.vaccineId);
        const dueDate = new Date(record.dueDate);
        return {
          ...record,
          vaccine,
          status: record.completedDate ? 'completed' : getVaccineStatus(dueDate, record.completedDate)
        };
      });
  }, [records, activeChildId]);

  // Get certificates for a child
  const getChildCertificates = useCallback((childId) => {
    const cId = childId || activeChildId;
    return certificates.filter(c => c.childId === cId);
  }, [certificates, activeChildId]);

  // Get notifications for active child
  const getChildNotifications = useCallback((childId) => {
    const cId = childId || activeChildId;
    return notifications
      .filter(n => n.childId === cId)
      .sort((a, b) => new Date(a.reminderDate) - new Date(b.reminderDate));
  }, [notifications, activeChildId]);

  // Dashboard stats
  const getDashboardStats = useCallback((childId) => {
    const cId = childId || activeChildId;
    const childRecords = records.filter(r => r.childId === cId).map(r => ({
      ...r,
      status: r.completedDate ? 'completed' : getVaccineStatus(new Date(r.dueDate), r.completedDate)
    }));

    const completed = childRecords.filter(r => r.status === 'completed').length;
    const total = childRecords.length;
    const upcoming = childRecords.filter(r => r.status === 'upcoming');
    const overdue = childRecords.filter(r => r.status === 'overdue');
    
    const nextVaccine = childRecords
      .filter(r => r.status !== 'completed')
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))[0];

    let daysUntilNext = null;
    if (nextVaccine) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const due = new Date(nextVaccine.dueDate);
      due.setHours(0, 0, 0, 0);
      daysUntilNext = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
    }

    return {
      completed,
      total,
      upcoming: upcoming.length,
      overdue: overdue.length,
      nextVaccine: nextVaccine ? {
        ...nextVaccine,
        vaccine: VACCINE_CATALOG.find(v => v.id === nextVaccine.vaccineId)
      } : null,
      daysUntilNext,
      progress: total > 0 ? Math.round((completed / total) * 100) : 0
    };
  }, [records, activeChildId]);

  // Search
  const search = useCallback((query) => {
    if (!query || !activeChildId) return [];
    const q = query.toLowerCase();
    const childRecords = getChildRecords(activeChildId);
    
    return childRecords.filter(record => {
      return (
        record.vaccine?.name?.toLowerCase().includes(q) ||
        record.vaccine?.fullName?.toLowerCase().includes(q) ||
        record.vaccine?.disease?.toLowerCase().includes(q) ||
        record.hospital?.toLowerCase().includes(q) ||
        record.doctor?.toLowerCase().includes(q) ||
        record.dueDate?.includes(q) ||
        record.completedDate?.includes(q)
      );
    });
  }, [activeChildId, getChildRecords]);

  // Clear all data (for testing)
  const clearAllData = useCallback(() => {
    Object.values(STORAGE_KEYS).forEach(key => {
      if (typeof window !== 'undefined') localStorage.removeItem(key);
    });
    setIsLoggedIn(false);
    setIsRegistered(false);
    setParent(DEFAULT_PARENT);
    setChildren([]);
    setRecords([]);
    setCertificates([]);
    setNotifications([]);
    setActiveChildId(null);
  }, []);

  const value = {
    isLoaded,
    isLoggedIn,
    isRegistered,
    parent,
    children,
    activeChild,
    activeChildId,
    theme,
    records,
    certificates,
    notifications,
    // Auth
    register,
    login,
    logout,
    // Children
    addChild,
    switchChild,
    updateChild,
    deleteChild,
    // Vaccines
    markVaccineComplete,
    getChildRecords,
    getChildCertificates,
    getChildNotifications,
    getDashboardStats,
    // Search
    search,
    // Utility
    clearAllData,
    setParent
  };

  return (
    <AppContext.Provider value={value}>
      {reactChildren}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
