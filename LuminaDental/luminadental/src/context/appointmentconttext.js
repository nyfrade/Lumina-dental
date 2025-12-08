

import React, { createContext, useState, useContext, useEffect } from 'react';
import { appointments as mockAppointments } from '../data/appointment';
import { loadState, saveState } from '../utilis/storage';

// Create the context
const AppointmentsContext = createContext();

// Create a custom hook to use the context
export const useAppointments = () => {
  return useContext(AppointmentsContext);
};

// Create the provider component
export const AppointmentsProvider = ({ children }) => {
  const [appointments, setAppointments] = useState(loadState()?.appointments || mockAppointments);

  useEffect(() => {
    saveState({ appointments });
  }, [appointments]);

  // Function to add an appointment
  const addAppointment = (appointment) => {
    const newAppointment = {
      ...appointment,
      id: appointments.length + 1, // Simple ID generation
      status: 'Pending',
      isDeleted: false,
    };
    setAppointments([...appointments, newAppointment]);
  };

  // Function to update an appointment
  const updateAppointment = (updatedAppointment) => {
    setAppointments(
      appointments.map((appointment) =>
        appointment.id === updatedAppointment.id ? updatedAppointment : appointment
      )
    );
  };

  // Function to find an appointment by ID
  const getAppointmentById = (id) => {
    return appointments.find((appointment) => appointment.id === parseInt(id));
  };

  // Function to find appointments by email
  const getAppointmentsByEmail = (email) => {
    return appointments.filter((appointment) => appointment.email.toLowerCase() === email.toLowerCase());
  };

  // Function to update an appointment's status
  const updateAppointmentStatus = (appointmentId, newStatus) => {
    setAppointments(
      appointments.map((appointment) =>
        appointment.id === appointmentId ? { ...appointment, status: newStatus } : appointment
      )
    );
  };

  // Function to add a note to an appointment
  const addAppointmentNote = (appointmentId, note) => {
    setAppointments(
      appointments.map((appointment) =>
        appointment.id === appointmentId ? { ...appointment, notes: `${appointment.notes || ''} ${note}` } : appointment
      )
    );
  };

  // Function to soft delete an appointment
  const deleteAppointment = (appointmentId) => {
    setAppointments(
      appointments.map((appointment) =>
        appointment.id === appointmentId ? { ...appointment, isDeleted: true } : appointment
      )
    );
  };

  // Function to restore an appointment
  const restoreAppointment = (appointmentId) => {
    setAppointments(
      appointments.map((appointment) =>
        appointment.id === appointmentId ? { ...appointment, isDeleted: false } : appointment
      )
    );
  };

  // Function to permanently delete an appointment
  const hardDeleteAppointment = (appointmentId) => {
    setAppointments(appointments.filter((appointment) => appointment.id !== appointmentId));
  };


  const value = {
    appointments,
    addAppointment,
    updateAppointment,
    getAppointmentById,
    getAppointmentsByEmail,
    updateAppointmentStatus,
    addAppointmentNote,
    deleteAppointment,
    restoreAppointment,
    hardDeleteAppointment,
  };

  return (
    <AppointmentsContext.Provider value={value}>
      {children}
    </AppointmentsContext.Provider>
  );
};
