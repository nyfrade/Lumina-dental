import React from 'react';
import styles from './appleCalendar.module.css';
import { procedures } from '../../data/procedures';

const MonthView = ({ currentDate, appointments, openEditModal }) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const firstDayOfWeek = firstDayOfMonth.getDay(); // 0 for Sunday, 6 for Saturday
  const totalDaysInMonth = lastDayOfMonth.getDate();

  const daysInView = [];

  // Fill in leading empty days
  for (let i = 0; i < firstDayOfWeek; i++) {
    daysInView.push(null);
  }

  // Fill in days of the month
  for (let i = 1; i <= totalDaysInMonth; i++) {
    daysInView.push(new Date(year, month, i));
  }

  // Fill in trailing empty days to complete the last week
  const remainingCells = 42 - daysInView.length; // Max 6 weeks * 7 days = 42 cells
  for (let i = 0; i < remainingCells; i++) {
    daysInView.push(null);
  }

  const daysOfWeekNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getAppointmentsForDay = (date) => {
    if (!date) return [];
    return appointments.filter(appointment => {
      const appDate = new Date(appointment.date);
      return appDate.getFullYear() === date.getFullYear() &&
             appDate.getMonth() === date.getMonth() &&
             appDate.getDate() === date.getDate();
    });
  };

  return (
    <div className={styles.monthView}>
      <div className={styles.daysOfWeekNames}>
        {daysOfWeekNames.map(dayName => (
          <div key={dayName} className={styles.dayOfWeekHeader}>{dayName}</div>
        ))}
      </div>
      <div className={styles.monthGrid}>
        {daysInView.map((day, index) => {
          const isToday = day && day.toDateString() === new Date().toDateString();
          const dayAppointments = getAppointmentsForDay(day);
          return (
            <div
              key={index}
              className={`${styles.monthDayCell} ${!day ? styles.empty : ''} ${isToday ? styles.today : ''}`}
            >
              {day && (
                <>
                  <div className={styles.dayNumberContainer}>
                    <span className={styles.dayNumber}>{day.getDate()}</span>
                  </div>
                  <div className={styles.appointmentsList}>
                    {dayAppointments.map(appointment => {
                      const procedure = procedures.find(p => p.name === appointment.procedure);
                      return (
                        <div
                          key={appointment.id}
                          className={styles.monthEvent}
                          style={{ backgroundColor: procedure?.color || '#ccc' }}
                          title={`${appointment.time} - ${appointment.procedure} with ${appointment.patientName}`}
                          onClick={(e) => { e.stopPropagation(); openEditModal(appointment); }}
                        >
                          <span className={styles.eventTime}>{appointment.time}</span>
                          <span className={styles.eventName}>{appointment.procedure}</span>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonthView;
