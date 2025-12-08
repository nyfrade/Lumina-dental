import { useState, useEffect, useContext, createContext } from 'react';

const AppointmentContext = createContext();

export const useAppointments = () => {
  return useContext(AppointmentContext);
};

export const AppointmentProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const storedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
    setAppointments(storedAppointments);
  }, []);

  const addAppointment = (newAppointment) => {
    const updatedAppointments = [...appointments, { ...newAppointment, id: Date.now() }];
    setAppointments(updatedAppointments);
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
  };

  const updateAppointment = (updatedAppointment) => {
    const updatedAppointments = appointments.map(app =>
      app.id === updatedAppointment.id ? updatedAppointment : app
    );
    setAppointments(updatedAppointments);
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
  };

  const deleteAppointment = (id) => {
    const updatedAppointments = appointments.filter(app => app.id !== id);
    setAppointments(updatedAppointments);
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
  };

  const value = {
    appointments,
    addAppointment,
    updateAppointment,
    deleteAppointment,
  };

  return (
    <AppointmentContext.Provider value={value}>
      {children}
    </AppointmentContext.Provider>
  );
};
