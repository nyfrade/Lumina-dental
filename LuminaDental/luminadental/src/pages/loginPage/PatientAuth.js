import React, { useState } from 'react';
import styles from './loginPage.module.css';
import { User, Lock, Mail, ArrowRight } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useToastContext } from '../../context/toast-context';

const PatientAuth = ({ navigate, onLogin }) => {
  const [view, setView] = useState('login'); // 'login' or 'register'
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
  });
  const { patientRegister } = useAuth();
  const { showToast } = useToastContext();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (view === 'login') {
      onLogin(formData.username, formData.password, 'patient');
    } else {
      patientRegister(formData.username, formData.password, formData.email);
      showToast('Registered successfully! Please log in.');
      setView('login');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
                  <h2>{view === 'login' ? 'Patient login' : 'Patient registration'}</h2>        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <User size={18} />
            <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
          </div>
          {view === 'register' && (
            <div className={styles.inputGroup}>
              <Mail size={18} />
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            </div>
          )}
          <div className={styles.inputGroup}>
            <Lock size={18} />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
          </div>
          <button type="submit" className={styles.loginButton}>
            {view === 'login' ? 'Login' : 'Register'} <ArrowRight size={18} />
          </button>
        </form>
        <p className={styles.patientLink} onClick={() => setView(view === 'login' ? 'register' : 'login')}>
          {view === 'login' ? 'Need an account? Register' : 'Already have an account? Login'}
        </p>
        <p className={styles.patientLink} onClick={() => navigate('welcome')}>
          Back to Welcome
        </p>
      </div>
    </div>
  );
};

export default PatientAuth;
