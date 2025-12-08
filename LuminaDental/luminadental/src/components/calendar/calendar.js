import React, { useState, useEffect } from 'react';
import styles from './calendar.module.css';
import { useAppointments } from '../../context/appointmentconttext';
import { procedures } from '../../data/procedures';

const Calendar = ({ openEditModal }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [days, setDays] = useState([]);
  const { appointments } = useAppointments();

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDayOfMonth.getDay();
    const totalDays = lastDayOfMonth.getDate();

    const monthDays = [];

    // Add empty cells for the days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      monthDays.push(null);
    }

    // Add the days of the month
    for (let i = 1; i <= totalDays; i++) {
      monthDays.push(new Date(year, month, i));
    }

    setDays(monthDays);
  }, [currentDate]);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const getAppointmentsForDay = (date) => {
    return appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.date);
      return appointmentDate.getFullYear() === date.getFullYear() &&
             appointmentDate.getMonth() === date.getMonth() &&
             appointmentDate.getDate() === date.getDate();
    });
  };

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <button onClick={handlePrevMonth}>&lt;</button>
        <h2>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className={styles.daysOfWeek}>
        {daysOfWeek.map(day => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className={styles.days}>
        {days.map((day, index) => (
          <div
            key={index}
            className={`${styles.day} ${day ? '' : styles.empty} ${day && day.toDateString() === new Date().toDateString() ? styles.today : ''} ${day && selectedDate && day.toDateString() === selectedDate.toDateString() ? styles.selected : ''}`}
            onClick={() => day && handleDateClick(day)}
          >
            {day && <span>{day.getDate()}</span>}
            <div className={styles.dotsContainer}>
              {day && getAppointmentsForDay(day).map(appointment => {
                const procedure = procedures.find(p => p.name === appointment.procedure);
                return (
                  <div
                    key={appointment.id}
                    className={styles.dot}
                    style={{ backgroundColor: procedure?.color || '#7f8c8d' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      openEditModal(appointment);
                    }}
                  >
                    <div className={styles.tooltip}>
                      <p>{appointment.patientName}</p>
                      <p>{appointment.procedure} at {appointment.time}</p>
                      <p>Dr. {appointment.doctor}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.appointments}>
        <h3>Appointments for {selectedDate.toLocaleDateString()}</h3>
        <ul>
          {getAppointmentsForDay(selectedDate).map(appointment => (
            <li key={appointment.id} onClick={() => openEditModal(appointment)}>
              <span style={{ color: procedures.find(p => p.name === appointment.procedure)?.color || 'inherit' }}>
                {appointment.procedure}
              </span> with {appointment.patientName} with Dr. {appointment.doctor} at {appointment.time}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Calendar;
