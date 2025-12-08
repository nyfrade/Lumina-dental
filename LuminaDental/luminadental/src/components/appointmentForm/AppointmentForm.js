import React, { useState, useEffect } from 'react';
import styles from './appointmentForm.module.css';
import { useAppointments } from '../../context/appointmentconttext';
import { procedures } from '../../data/procedures';
import { User, Mail, Phone, Calendar, Clock, Stethoscope, X } from 'lucide-react';
import { useToastContext } from '../../context/toast-context';
import { MOCK_USERS } from '../../data/users'; // Assuming doctors are staff users

const AppointmentForm = ({ onClose, initialDate }) => {
  const { addAppointment } = useAppointments();
  const { showToast } = useToastContext();
  const [formData, setFormData] = useState({
    patientName: '',
    email: '',
    phone: '',
    dob: '',
    age: '',
    procedure: '',
    date: initialDate || '',
    time: '',
    doctor: '', // Added doctor field
    notes: '', // Added notes field
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialDate) {
      setFormData(prevData => ({ ...prevData, date: initialDate }));
    }
  }, [initialDate]);

  const calculateAge = (dob) => {
    if (!dob) return '';
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.patientName) newErrors.patientName = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    if (!formData.dob) newErrors.dob = 'Date of birth is required';
    if (!formData.procedure) newErrors.procedure = 'Procedure is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    if (!formData.doctor) newErrors.doctor = 'Doctor is required';

    if (formData.date) {
      const selectedDate = new Date(formData.date);
      const dayOfWeek = selectedDate.getDay(); // 0 for Sunday, 6 for Saturday
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        newErrors.date = 'Appointments cannot be scheduled on weekends.';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
    if (name === 'dob') {
      setFormData(prevData => ({ ...prevData, dob: value, age: calculateAge(value) }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const newAppointment = { ...formData, id: Date.now(), status: 'Pending', isDeleted: false };
      addAppointment(newAppointment);
      showToast('Appointment scheduled successfully!');
      onClose(); // Close the form after submission
    } else {
      showToast('Please fill in all required fields.', 'error');
    }
  };

  const doctors = MOCK_USERS.filter(user => user.role === 'staff' && user.name.startsWith('Dr.'));

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.appointmentForm}>
        <div className={styles.formHeader}>
          <h2>Schedule New Appointment</h2>
          <button onClick={onClose} className={styles.closeButton}><X size={24} /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <Mail size={18} />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            {errors.email && <span className={styles.error}>{errors.email}</span>}
          </div>
          <div className={styles.inputGroup}>
            <User size={18} />
            <input type="text" name="patientName" placeholder="Full Name" value={formData.patientName} onChange={handleChange} />
            {errors.patientName && <span className={styles.error}>{errors.patientName}</span>}
          </div>
          <div className={styles.inputGroup}>
            <Phone size={18} />
            <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
            {errors.phone && <span className={styles.error}>{errors.phone}</span>}
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="dob" className={styles.labelWithIcon}>
              <Calendar size={18} />
              <input type="date" name="dob" id="dob" value={formData.dob} onChange={handleChange} />
            </label>
            <label htmlFor="dob">Date of Birth</label>
            {errors.dob && <span className={styles.error}>{errors.dob}</span>}
          </div>

          <div className={styles.inputGroup}>
            <Stethoscope size={18} />
            {formData.procedure && (
              <span
                className={styles.procedureColorIndicator}
                style={{
                  backgroundColor: procedures.find(p => p.name === formData.procedure)?.color || '#ccc',
                }}
              ></span>
            )}
            <select name="procedure" value={formData.procedure} onChange={handleChange}>
              <option value="">Select Procedure</option>
              {procedures.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
            </select>
            {errors.procedure && <span className={styles.error}>{errors.procedure}</span>}
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="date" className={styles.labelWithIcon}>
              <Calendar size={18} />
              <input type="date" name="date" id="date" value={formData.date} onChange={handleChange} />
            </label>
            {errors.date && <span className={styles.error}>{errors.date}</span>}
          </div>
          <div className={styles.inputGroup}>
            <Clock size={18} />
            <select name="time" value={formData.time} onChange={handleChange}>
              <option value="">Select Time</option>
              {(() => {
                const times = [];
                for (let i = 9; i <= 17; i++) { // From 9 AM to 5 PM
                  times.push(`${i.toString().padStart(2, '0')}:00`);
                  if (i < 17) { // Don't add 5:30 PM if 5 PM is the end
                    times.push(`${i.toString().padStart(2, '0')}:30`);
                  }
                }
                return times.map(time => (
                  <option key={time} value={time}>{time}</option>
                ));
              })()}
            </select>
            {errors.time && <span className={styles.error}>{errors.time}</span>}
          </div>
          <div className={styles.inputGroup}>
            <Stethoscope size={18} />
            <select name="doctor" value={formData.doctor} onChange={handleChange}>
              <option value="">Select Doctor</option>
              {doctors.map(doctor => (
                <option key={doctor.id} value={doctor.name}>{doctor.name}</option>
              ))}
            </select>
            {errors.doctor && <span className={styles.error}>{errors.doctor}</span>}
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="notes">Internal Notes</label>
            <textarea name="notes" id="notes" value={formData.notes} onChange={handleChange}></textarea>
          </div>
          <button type="submit" className={styles.submitButton} disabled={Object.keys(errors).length > 0}>
            Schedule Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;
