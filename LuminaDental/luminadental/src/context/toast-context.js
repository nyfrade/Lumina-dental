import React, { createContext, useContext } from 'react';
import useToast from '../hooks/useToast';

const ToastContext = createContext(null);

export const useToastContext = () => {
  return useContext(ToastContext);
};

export const ToastProvider = ({ children }) => {
  const { toast, showToast } = useToast();

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div className={`toast ${toast.type}`}>
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
};
