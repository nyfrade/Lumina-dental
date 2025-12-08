import { useState, useEffect } from 'react';
import { MOCK_USERS } from '../data/users';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const storedPatients = JSON.parse(localStorage.getItem('patients')) || [];
    setPatients(storedPatients);
  }, []);

  const login = (username, password) => {
    const staffUser = MOCK_USERS.find(u => u.username === username && u.password === password);
    if (staffUser) {
      const loggedInUser = { username, role: 'staff' };
      setUser(loggedInUser);
      return loggedInUser;
    }
    return null;
  };

  const logout = () => {
    setUser(null);
  };

  const patientLogin = (username, password) => {
    const patient = patients.find(p => p.username === username && p.password === password);
    if (patient) {
      setUser(patient);
      return patient;
    }
    return null;
  };

  const patientRegister = (username, password, email) => {
    const newPatient = { username, password, email, role: 'patient' };
    const updatedPatients = [...patients, newPatient];
    setPatients(updatedPatients);
    localStorage.setItem('patients', JSON.stringify(updatedPatients));
  };

  return { user, login, logout, patientLogin, patientRegister };
};

export { useAuth };