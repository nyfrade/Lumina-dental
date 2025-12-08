
import React from 'react';
import Welcome from './Welcome';
import PatientAuth from '../patientAuth/PatientAuth';
import PatientPortal from '../patientPortal/PatientPortal';
import { useAuth } from '../../hooks/useAuth';

const LandingPage = ({ navigate }) => {
  const { user, patientLogin, patientRegister } = useAuth();

  const handleAuthNavigate = (targetView, authType) => {
    navigate(targetView, authType);
  };

  const renderContent = () => {
    // If user is logged in, show patient portal
    if (user && user.role === 'patient') {
      return <PatientPortal user={user} navigate={navigate} />;
    }

    // Otherwise, show the welcome page with auth options
    return <Welcome navigate={handleAuthNavigate} />;
  };

  return (
    <div className="landing-page">
      {renderContent()}
    </div>
  );
};

export default LandingPage;
