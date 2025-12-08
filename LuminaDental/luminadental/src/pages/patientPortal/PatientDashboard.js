import React from 'react';
import styles from './patientPortal.module.css';
import { useAppointments } from '../../context/appointmentconttext';
import { useAuth } from '../../hooks/useAuth';

const PatientDashboard = ({ navigate }) => {
  const { user } = useAuth();
  const { getAppointmentsByEmail } = useAppointments();
  const appointments = user ? getAppointmentsByEmail(user.email) : [];

  return (
    <div className={styles.portalContainer}>
      <div className={styles.portalBox}>
        <h2>Welcome, {user?.username}</h2>
        <h3>Your Appointments</h3>
        <div className={styles.appointmentList}>
          {appointments.map(appointment => (
            <div key={appointment.id} className={styles.appointmentCard}>
              <p><strong>Procedure:</strong> {appointment.procedure}</p>
              <p><strong>Date:</strong> {appointment.date}</p>
              <p><strong>Time:</strong> {appointment.time}</p>
            </div>
          ))}
        </div>
        <button onClick={() => navigate('welcome')}>Back to Welcome</button>
      </div>
    </div>
  );
};

export default PatientDashboard;
