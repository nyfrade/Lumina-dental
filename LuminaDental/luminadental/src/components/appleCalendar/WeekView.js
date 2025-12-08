import React from 'react';
import styles from './appleCalendar.module.css';
import { procedures } from '../../data/procedures';

const WeekView = ({ currentDate, appointments, openEditModal }) => {
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay()); // Start on Sunday

  const daysInWeek = Array.from({ length: 7 }).map((_, i) => {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    return day;
  });

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
    <div className={styles.weekView}>
      <div className={styles.weekHeader}>
        <div className={styles.timeColumnHeader}></div> {/* Empty for alignment */}
        {daysInWeek.map((day, index) => (
          <div key={index} className={styles.dayHeader}>
            <div className={styles.dayName}>{day.toLocaleDateString('default', { weekday: 'short' })}</div>
            <div className={styles.dayNumber}>{day.getDate()}</div>
          </div>
        ))}
      </div>
      <div className={styles.weekGrid}>
        <div className={styles.timeColumn}>
          {hours.map(hour => (
            <div key={hour} className={styles.hourSlot}>
              {`${hour.toString().padStart(2, '0')}:00`}
            </div>
          ))}
        </div>
        {daysInWeek.map((day, dayIndex) => (
          <div key={dayIndex} className={styles.dayColumn}>
            {hours.map(hour => (
              <div key={hour} className={styles.hourCell}>
                {/* Render events that start in this hour slot */}
                {getAppointmentsForDayAndTime(day, hour).map(renderEvent)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekView;
