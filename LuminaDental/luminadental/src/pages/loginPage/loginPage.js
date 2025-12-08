import React, { useState } from 'react';
import styles from './loginPage.module.css';
import { User, Lock, ArrowRight } from 'lucide-react';

const LoginPage = ({ onLogin, message, navigate }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password, 'staff');
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h1>Lumina Dental</h1>
        <p>Staff Access</p>
        {message && <p className={styles.errorMessage}>{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <User size={18} />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <Lock size={18} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className={styles.loginButton}>
            Login <ArrowRight size={18} />
          </button>
        </form>
        <p className={styles.patientLink} onClick={() => navigate('welcome')}>
          Back to Welcome
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
