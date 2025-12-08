import React, { useState, useCallback } from 'react';
import styles from './appleCalendar.module.css';
import { useAppointments } from '../../context/appointmentconttext';
import MonthView from './MonthView';
import WeekView from './WeekView';
import DayView from './DayView';
import AppointmentForm from '../appointmentForm/AppointmentForm'; // Import AppointmentForm

const AppleCalendar = ({ openEditModal }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month'); // 'month', 'week', 'day'
  const { appointments } = useAppointments();
  const [showNewAppointmentModal, setShowNewAppointmentModal] = useState(false); // New state

  const handlePrev = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      if (view === 'month') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else if (view === 'week') {
        newDate.setDate(newDate.getDate() - 7);
      } else { // day view
        newDate.setDate(newDate.getDate() - 1);
      }
      return newDate;
    });
  };

  const handleNext = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      if (view === 'month') {
        newDate.setMonth(newDate.getMonth() + 1);
      } else if (view === 'week') {
        newDate.setDate(newDate.getDate() + 7);
      } else { // day view
        newDate.setDate(newDate.getDate() + 1);
      }
      return newDate;
    });
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const filteredAppointments = useCallback(() => {
    // Basic filtering logic for now, will refine as views are built
    return appointments.filter(appointment => {
      const appDate = new Date(appointment.date);
      // For month view, just show all appointments in the current month
      if (view === 'month') {
        return appDate.getMonth() === currentDate.getMonth() && appDate.getFullYear() === currentDate.getFullYear();
      }
      // For week/day views, more precise filtering will be needed
      return true; // Placeholder
    });
  }, [appointments, currentDate, view]);


  return (
    <div className={styles.appleCalendar}>
      <div className={styles.header}>
        <div className={styles.navButtons}>
          <button onClick={handlePrev}>&lt;</button>
          <button onClick={handleToday}>Today</button>
          <button onClick={handleNext}>&gt;</button>
        </div>
        <h2 className={styles.currentPeriod}>
          {view === 'month' && currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          {view === 'week' && `Week of ${currentDate.toLocaleDateString()}`}
          {view === 'day' && currentDate.toLocaleDateString('default', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </h2>
        <div className={styles.viewSelector}>
          <button onClick={() => setView('day')} className={view === 'day' ? styles.active : ''}>Day</button>
          <button onClick={() => setView('week')} className={view === 'week' ? styles.active : ''}>Week</button>
          <button onClick={() => setView('month')} className={view === 'month' ? styles.active : ''}>Month</button>
        </div>
        <button className={styles.addButton} onClick={() => setShowNewAppointmentModal(true)}>+</button>
      </div>
      <div className={styles.content}>
        {view === 'month' && <MonthView currentDate={currentDate} appointments={filteredAppointments()} openEditModal={openEditModal} />}
        {view === 'week' && <WeekView currentDate={currentDate} appointments={filteredAppointments()} openEditModal={openEditModal} />}
        {view === 'day' && <DayView currentDate={currentDate} appointments={filteredAppointments()} openEditModal={openEditModal} />}
      </div>

      {showNewAppointmentModal && (
        <AppointmentForm
          onClose={() => setShowNewAppointmentModal(false)}
          initialDate={currentDate.toISOString().split('T')[0]} // Pass current calendar date
        />
      )}
    </div>
  );
};

export default AppleCalendar;
