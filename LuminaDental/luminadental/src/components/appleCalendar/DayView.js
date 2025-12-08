import React from 'react';
import styles from './appleCalendar.module.css';
import { procedures } from '../../data/procedures';

const DayView = ({ currentDate, appointments, openEditModal }) => {
  const day = currentDate;
  const hours = Array.from({ length: 24 }).map((_, i) => i); // 0 to 23

  const getAppointmentsForDayAndTime = (day, hour) => {
    if (!day) return [];
    return appointments.filter(appointment => {
      const appDate = new Date(appointment.date);
      const appHour = parseInt(appointment.time.split(':')[0]);
      return appDate.getFullYear() === day.getFullYear() &&
             appDate.getMonth() === day.getMonth() &&
             appDate.getDate() === day.getDate() &&
             appHour === hour;
    });
  };

  const renderEvent = (appointment) => {
    const procedure = procedures.find(p => p.name === appointment.procedure);
    const [, startMinute] = appointment.time.split(':').map(Number);
    const duration = procedure?.duration || 60; // Default to 60 minutes if not found

    const top = (startMinute / 60) * 100; // Percentage from the top of the hour slot
    const height = (duration / 60) * 100; // Percentage of the hour slot height

    return (
      <div
        key={appointment.id}
        className={styles.eventBlock}
        style={{
          backgroundColor: procedure?.color || '#ccc',
          top: `${top}%`,
          height: `${height}%`,
        }}
        onClick={(e) => { e.stopPropagation(); openEditModal(appointment); }}
      >
        <span className={styles.eventTime}>{appointment.time}</span>
        <span className={styles.eventName}>{appointment.procedure}</span>
        <span className={styles.eventPatient}>{appointment.patientName}</span>
      </div>
    );
  };

  return (
    <div className={styles.dayView}>
      <div className={styles.dayHeader}>
        <div className={styles.dayName}>{day.toLocaleDateString('default', { weekday: 'long' })}</div>
        <div className={styles.dayNumber}>{day.getDate()}</div>
      </div>
      <div className={styles.dayGrid}>
        <div className={styles.timeColumn}>
          {hours.map(hour => (
            <div key={hour} className={styles.hourSlot}>
              {`${hour.toString().padStart(2, '0')}:00`}
            </div>
          ))}
        </div>
        <div className={styles.dayColumn}>
          {hours.map(hour => (
            <div key={hour} className={styles.hourCell}>
              {/* Render events that start in this hour slot */}
              {getAppointmentsForDayAndTime(day, hour).map(renderEvent)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DayView;
