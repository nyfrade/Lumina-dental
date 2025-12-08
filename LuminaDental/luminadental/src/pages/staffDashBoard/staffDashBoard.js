import React, { useState, useMemo } from 'react';
import styles from './staffDashboard.module.css';
import AppleCalendar from '../../components/appleCalendar/AppleCalendar';
import { useAppointments } from '../../context/appointmentconttext';
import { Calendar as CalendarIcon, List, LogOut, Search, Check, Edit, Trash, X, RotateCcw } from 'lucide-react';
import { procedures } from '../../data/procedures';
import { MOCK_USERS } from '../../data/users';
import { getContrastTextColor } from '../../utilis/colorUtilis'; // Import the utility

const StaffDashboard = ({ user, onLogout }) => {
  const [view, setView] = useState('calendar');
  const { appointments, updateAppointmentStatus, deleteAppointment, updateAppointment, restoreAppointment, hardDeleteAppointment } = useAppointments();
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [procedureFilter, setProcedureFilter] = useState('all');
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const [appointmentsPerPage] = useState(10);

  const sortedAppointments = useMemo(() => {
    let sortableItems = [...appointments];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [appointments, sortConfig]);

  const filteredAppointments = useMemo(() => {
    return sortedAppointments
      .filter(appointment => !appointment.isDeleted)
      .filter(appointment => {
        // Search filter
        const term = searchTerm.toLowerCase();
        return (
          appointment.patientName.toLowerCase().includes(term) ||
          appointment.phone.includes(term) ||
          appointment.id.toString().includes(term)
        );
      })
      .filter(appointment => {
        // Date filter
        if (dateFilter === 'all') return true;
        const today = new Date();
        const appointmentDate = new Date(appointment.date);
        if (dateFilter === 'today') {
          return appointmentDate.toDateString() === today.toDateString();
        }
        if (dateFilter === 'thisWeek') {
          const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
          const lastDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 6));
          return appointmentDate >= firstDayOfWeek && appointmentDate <= lastDayOfWeek;
        }
        if (dateFilter === 'thisMonth') {
          return appointmentDate.getMonth() === today.getMonth() && appointmentDate.getFullYear() === today.getFullYear();
        }
        return true;
      })
      .filter(appointment => {
        // Procedure filter
        if (procedureFilter === 'all') return true;
        return appointment.procedure === procedureFilter;
      });
  }, [sortedAppointments, searchTerm, dateFilter, procedureFilter]);

  const deletedAppointments = useMemo(() => {
    return appointments.filter(appointment => appointment.isDeleted);
  }, [appointments]);

  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = filteredAppointments.slice(indexOfFirstAppointment, indexOfLastAppointment);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const openEditModal = (appointment) => {
    setEditingAppointment({ ...appointment });
  };

  const closeEditModal = () => {
    setEditingAppointment(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingAppointment({ ...editingAppointment, [name]: value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateAppointment(editingAppointment);
    closeEditModal();
  };

  const renderView = () => {
    switch (view) {
      case 'calendar':
        return <AppleCalendar openEditModal={openEditModal} />;
      case 'list':
        return (
          <div>
            <div className={styles.listHeader}>
              <h2>Appointments</h2>
              <div className={styles.searchBar}>
                <Search size={20} />
                <input
                  type="text"
                  placeholder="Search by name, phone, or ID"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className={styles.filters}>
              <div className={styles.dateFilters}>
                <button onClick={() => setDateFilter('all')} className={dateFilter === 'all' ? styles.activeFilter : ''}>All</button>
                <button onClick={() => setDateFilter('today')} className={dateFilter === 'today' ? styles.activeFilter : ''}>Today</button>
                <button onClick={() => setDateFilter('thisWeek')} className={dateFilter === 'thisWeek' ? styles.activeFilter : ''}>This Week</button>
                <button onClick={() => setDateFilter('thisMonth')} className={dateFilter === 'thisMonth' ? styles.activeFilter : ''}>This Month</button>
              </div>
              <div className={styles.procedureFilters}>
                <select onChange={(e) => setProcedureFilter(e.target.value)} value={procedureFilter}>
                  <option value="all">All Procedures</option>
                  {procedures.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                </select>
              </div>
            </div>
            <table className={styles.appointmentTable}>
              <thead>
                <tr>
                  <th onClick={() => requestSort('id')}>ID</th>
                  <th onClick={() => requestSort('patientName')}>Patient</th>
                  <th onClick={() => requestSort('doctor')}>Doctor</th>
                  <th onClick={() => requestSort('procedure')}>Procedure</th>
                  <th onClick={() => requestSort('date')}>Date</th>
                  <th onClick={() => requestSort('time')}>Time</th>
                  <th onClick={() => requestSort('status')}>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentAppointments.map(appointment => (
                  <tr key={appointment.id}>
                    <td>{appointment.id}</td>
                    <td>{appointment.patientName}</td>
                    <td>{appointment.doctor}</td>
                    <td
                      style={{
                        backgroundColor: procedures.find(p => p.name === appointment.procedure)?.color || 'inherit',
                        color: getContrastTextColor(procedures.find(p => p.name === appointment.procedure)?.color || '#ffffff'), // Dynamic text color
                      }}
                    >
                      {appointment.procedure}
                    </td>
                    <td>{appointment.date}</td>
                    <td>{appointment.time}</td>
                    <td>
                      <span className={`${styles.status} ${styles[appointment.status.toLowerCase()]}`}>
                        {appointment.status}
                      </span>
                    </td>
                    <td className={styles.actions}>
                      {appointment.status === 'Pending' && (
                        <button onClick={() => updateAppointmentStatus(appointment.id, 'Confirmed')} title="Confirm appointment"><Check size={16} /></button>
                      )}
                      {appointment.status === 'Confirmed' && (
                        <button onClick={() => updateAppointmentStatus(appointment.id, 'Completed')} title="Mark as completed"><Check size={16} /></button>
                      )}
                      <button onClick={() => openEditModal(appointment)} title="Edit appointment"><Edit size={16} /></button>
                      <button onClick={() => deleteAppointment(appointment.id)} title="Soft delete appointment"><Trash size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={styles.pagination}>
              {Array.from({ length: Math.ceil(filteredAppointments.length / appointmentsPerPage) }, (_, i) => (
                <button key={i + 1} onClick={() => paginate(i + 1)} className={currentPage === i + 1 ? styles.activePage : ''}>
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        );
      case 'trash':
        return (
          <div>
            <h2>Trash</h2>
            <table className={styles.appointmentTable}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Patient</th>
                  <th>Procedure</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {deletedAppointments.map(appointment => (
                  <tr key={appointment.id}>
                    <td>{appointment.id}</td>
                    <td>{appointment.patientName}</td>
                    <td>{appointment.procedure}</td>
                    <td>{appointment.date}</td>
                    <td>{appointment.time}</td>
                    <td className={styles.actions}>
                      <button onClick={() => restoreAppointment(appointment.id)}><RotateCcw size={16} /></button>
                      <button onClick={() => hardDeleteAppointment(appointment.id)}><Trash size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      default:
        return <AppleCalendar openEditModal={openEditModal} />;
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2>Lumina Dental</h2>
        </div>
        <div className={styles.sidebarMenu}>
          <button
            className={`${styles.menuItem} ${view === 'calendar' ? styles.active : ''}`}
            onClick={() => setView('calendar')}
          >
            <CalendarIcon size={20} />
            <span>Calendar</span>
          </button>
          <button
            className={`${styles.menuItem} ${view === 'list' ? styles.active : ''}`}
            onClick={() => setView('list')}
          >
            <List size={20} />
            <span>Appointments</span>
          </button>
          <button
            className={`${styles.menuItem} ${view === 'trash' ? styles.active : ''}`}
            onClick={() => setView('trash')}
          >
            <Trash size={20} />
            <span>Trash</span>
          </button>
        </div>
        <div className={styles.sidebarFooter}>
          <button className={styles.menuItem} onClick={onLogout}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
      <div className={styles.mainContent}>
        {renderView()}
      </div>
      {editingAppointment && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>Edit appointment</h2>
              <button onClick={closeEditModal} className={styles.closeButton}><X size={24} /></button>
            </div>
            <form onSubmit={handleEditSubmit} className={styles.editForm}>
              <div className={styles.inputGroup}>
                <label>Patient Name</label>
                <input type="text" name="patientName" value={editingAppointment.patientName} onChange={handleEditChange} />
              </div>
              <div className={styles.inputGroup}>
                <label>Email</label>
                <input type="email" name="email" value={editingAppointment.email} onChange={handleEditChange} />
              </div>
              <div className={styles.inputGroup}>
                <label>Phone</label>
                <input type="tel" name="phone" value={editingAppointment.phone} onChange={handleEditChange} />
              </div>
              <div className={styles.inputGroup}>
                <label>Date</label>
                <input type="date" name="date" value={editingAppointment.date} onChange={handleEditChange} />
              </div>
              <div className={styles.inputGroup}>
                <label>Time</label>
                <input type="time" name="time" value={editingAppointment.time} onChange={handleEditChange} />
              </div>
              <div className={styles.inputGroup}>
                <label>Procedure</label>
                {editingAppointment.procedure && (
                  <span
                    className={styles.procedureColorIndicator}
                    style={{
                      backgroundColor: procedures.find(p => p.name === editingAppointment.procedure)?.color || '#ccc',
                    }}
                  ></span>
                )}
                <select name="procedure" value={editingAppointment.procedure} onChange={handleEditChange}>
                  {procedures.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label>Doctor</label>
                <select name="doctor" value={editingAppointment.doctor} onChange={handleEditChange}>
                  {MOCK_USERS.filter(user => user.role === 'staff' && user.name.startsWith('Dr.')).map(doctor => (
                    <option key={doctor.id} value={doctor.name}>{doctor.name}</option>
                  ))}
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label>Internal Notes</label>
                <textarea name="notes" value={editingAppointment.notes || ''} onChange={handleEditChange}></textarea>
              </div>
              <button type="submit">Save Changes</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffDashboard;
