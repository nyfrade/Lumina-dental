import React from 'react';
import styles from './landingPage.module.css';
import { procedures } from '../../data/procedures';
import hero from '../../assets/hero.png';

const Welcome = ({ navigate }) => {
  return (
    <div className={styles.welcomeContainer}>
      <div className={styles.hero}>
        <div className={styles.heroText}>
          <h1>Welcome to LuminaDental</h1>
          <p>Experience the future of dental care. Effortless booking and management at your fingertips.</p>
          <div className={styles.welcomeButtons}>
            <button onClick={() => navigate('patientPortal', 'schedule')}>Schedule appointment</button>
            <button onClick={() => navigate('patientPortal', 'edit')}>Edit appointment</button>
          </div>
        </div>
        <div className={styles.heroImage}>
          <img src={hero} alt="Dental" />
        </div>
      </div>
      <div className={styles.constellationSection}>
        <h2>Our services</h2>
        <div className={styles.servicesGrid}>
          {procedures.map(proc => (
            <div key={proc.id} className={styles.serviceCard}>
              <h3>{proc.name}</h3>
              <p>{proc.description}</p>
              <div className={styles.serviceDetails}>
                <span>Duration: {proc.duration} min</span>
                <span>Cost: ${proc.cost}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.patientAuth}>
        <h2>Patient area</h2>
        <p>Login or create an account to manage your appointments.</p>
        <div className={styles.welcomeButtons}>
          <button onClick={() => navigate('patientAuth', 'login')}>Login</button>
          <button onClick={() => navigate('patientAuth', 'register')}>Register</button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
