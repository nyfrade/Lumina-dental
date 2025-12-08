import React, { useState, useEffect } from 'react';
import styles from './patientPortal.module.css';
import ScheduleForm from './ScheduleForm';
import { useAppointments } from '../../context/appointmentconttext';
import { Search } from 'lucide-react';
import { useToastContext } from '../../context/toast-context';

const PatientPortal = ({ navigate, initialView }) => {
  const [view, setView] = useState(initialView || 'schedule'); // 'schedule' or 'edit'
  const [lookup, setLookup] = useState('');
  const [foundAppointment, setFoundAppointment] = useState(null);
  const [editData, setEditData] = useState(null);
  const { getAppointmentById, getAppointmentsByEmail, updateAppointment, deleteAppointment } = useAppointments();
  const { showToast } = useToastContext();
  const [showCancelModal, setShowCancelModal] = useState(false);

  useEffect(() => {
    if (initialView) {
      setView(initialView);
    }
  }, [initialView]);

  const handleLookup = (e) => {
    e.preventDefault();
    let appointment;
    if (lookup.includes('@')) {
      appointment = getAppointmentsByEmail(lookup)[0];
    } else {
      appointment = getAppointmentById(lookup);
    }
    setFoundAppointment(appointment);
    if (appointment) {
      setEditData({
        date: appointment.date,
        time: appointment.time,
        address: appointment.address || '',
      });
    } else {
      showToast('Appointment not found.', 'error');
    }
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateAppointment({ ...foundAppointment, ...editData });
    showToast('Appointment updated successfully!');
    setFoundAppointment(null);
  };

  const handleCancelAppointment = () => {
    deleteAppointment(foundAppointment.id);
    showToast('Appointment cancelled successfully!');
    setFoundAppointment(null);
    setShowCancelModal(false);
  };

  const renderEditView = () => (
    <div className={styles.editView}>
              <h2>Edit your appointment</h2>      <form onSubmit={handleLookup} className={styles.lookupForm}>
        <div className={styles.inputGroup}>
          <Search size={18} />
          <input
            type="text"
            placeholder="Enter your email or appointment ID"
            value={lookup}
            onChange={(e) => setLookup(e.target.value)}
          />
        </div>
        <button type="submit">Find Appointment</button>
      </form>
      {foundAppointment && (
        <form onSubmit={handleEditSubmit} className={styles.editForm}>
          <h3>Appointment details</h3>
          <p><strong>Patient:</strong> {foundAppointment.patientName}</p>
          <p><strong>Procedure:</strong> {foundAppointment.procedure}</p>
          <div className={styles.inputGroup}>
            <label>Date</label>
            <input type="date" name="date" value={editData.date} onChange={handleEditChange} />
          </div>
          <div className={styles.inputGroup}>
            <label>Time</label>
            <input type="time" name="time" value={editData.time} onChange={handleEditChange} />
          </div>
          <div className={styles.inputGroup}>
            <label>Address</label>
            <input type="text" name="address" placeholder="Address" value={editData.address} onChange={handleEditChange} />
          </div>
          <div className={styles.buttonGroup}>
            <button type="submit">Update appointment</button>
            <button type="button" className={styles.cancelButton} onClick={() => setShowCancelModal(true)}>Cancel appointment</button>
          </div>
        </form>
      )}
      {showCancelModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Are you sure you want to cancel?</h3>
            <div className={styles.buttonGroup}>
              <button onClick={handleCancelAppointment}>Yes, Cancel</button>
              <button onClick={() => setShowCancelModal(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className={styles.portalContainer}>
      <div className={styles.portalBox}>
        <div className={styles.portalNav}>
          <button onClick={() => setView('schedule')} className={view === 'schedule' ? styles.active : ''}>
            Schedule
          </button>
          <button onClick={() => setView('edit')} className={view === 'edit' ? styles.active : ''}>
            Edit
          </button>
          <button onClick={() => navigate('welcome')}>
            Back to Welcome
          </button>
        </div>
        {view === 'schedule' ? <ScheduleForm /> : renderEditView()}
      </div>
    </div>
  );
};

export default PatientPortal;
