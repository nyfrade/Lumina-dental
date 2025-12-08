import React, { useState } from "react";
import "./App.css";

// Import page components
import Welcome from "./pages/landingPage/Welcome.js";
import LoginPage from "./pages/loginPage/loginPage.js";
import StaffDashboard from "./pages/staffDashBoard/staffDashBoard.js";
import PatientPortal from "./pages/patientPortal/patientPortal.js";
import PatientAuth from "./pages/loginPage/PatientAuth.js";
import PatientDashboard from "./pages/patientPortal/PatientDashboard.js";


// Import the context provider
import { useAuth } from "./hooks/useAuth.js";
import { AppointmentsProvider } from "./context/appointmentconttext.js";
import { ToastProvider } from "./context/toast-context.js";

// Import for animations (ensure 'framer-motion' is installed)
import { AnimatePresence, motion } from "framer-motion";

function App() {
  const [view, setView] = useState("welcome");
  const { user, login, logout, patientLogin } = useAuth();

  const handleLogin = (username, password, role) => {
    let loggedInUser;
    if (role === 'staff') {
      loggedInUser = login(username, password);
    } else {
      loggedInUser = patientLogin(username, password);
    }

    if (loggedInUser) {
      if (loggedInUser.role === "staff") {
        setView("staffDashboard");
      } else {
        setView("patientDashboard");
      }
    }
  };

  const handleLogout = () => {
    logout();
    setView("welcome");
  };

  const navigate = (newView) => {
    setView(newView);
  };

  const renderView = () => {
    const pageVariants = {
      initial: { opacity: 0, y: 20 },
      in: { opacity: 1, y: 0 },
      out: { opacity: 0, y: -20 },
    };
    const pageTransition = {
      type: "tween",
      ease: "anticipate",
      duration: 0.5,
    };

    switch (view) {
      case "staffDashboard":
        return (
          <motion.div key="staff" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
            {user && user.role === "staff" ? (
              <StaffDashboard user={user} onLogout={handleLogout} />
            ) : (
              <LoginPage onLogin={handleLogin} message="Unauthorized. Please log in." />
            )}
          </motion.div>
        );
      case "patientPortal":
        return (
          <motion.div key="portal" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
            <PatientPortal navigate={navigate} />
          </motion.div>
        );
      case "patientAuth":
        return (
          <motion.div key="patientAuth" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
            <PatientAuth navigate={navigate} onLogin={handleLogin} />
          </motion.div>
        );
      case "patientDashboard":
        return (
          <motion.div key="patientDashboard" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
            {user && user.role === "patient" ? (
              <PatientDashboard navigate={navigate} />
            ) : (
              <PatientAuth navigate={navigate} />
            )}
          </motion.div>
        );
      case "staffLogin":
        return (
          <motion.div key="staffLogin" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
            <LoginPage onLogin={handleLogin} navigate={navigate} />
          </motion.div>
        );
      case "welcome":
      default:
        return (
          <motion.div key="welcome" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
            <Welcome navigate={navigate} />
            <p style={{ textAlign: 'center', paddingBottom: '20px' }}>
              <span style={{ cursor: 'pointer', color: '#007aff' }} onClick={() => navigate('staffLogin')}>
                Staff Login
              </span>
            </p>
          </motion.div>
        );
    }
  };

  return (
    <ToastProvider>
      <AppointmentsProvider>
        <div className="App">
          <AnimatePresence mode="out-in">
            {renderView()}
          </AnimatePresence>
        </div>
      </AppointmentsProvider>
    </ToastProvider>
  );
}

export default App;
