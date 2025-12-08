# LuminaDental 🦷✨

**A web-based dental clinic appointment system built for managing patients, appointments, and staff workflows efficiently.**  

> **Author:** Anthony Frade  
> **Project type:** Personal project  
> **Status:** Work-in-progress  

**Note:** This project uses the **[Lucide icon library](https://lucide.dev/)** for clean and consistent icons across the interface. The `node_modules` folder is **not included** in this repository and must be installed locally.  


---

## Overview 📋

LuminaDental is a modern web application designed to streamline dental clinic operations. It helps staff manage appointments, view schedules, and update patient records while allowing patients to book and manage their appointments easily. The system emphasizes clarity, speed, and a visually appealing interface.

Two main user roles:  

* **🧑‍⚕️ Staff:** Manage appointments, view schedules, update records.  
* **🧑‍🤝‍🧑 Patients:** Book and manage their own appointments.  


The interface is clean, responsive, and easy to navigate, with dynamic colors for procedures and clear modals for actions inspired by the Apple UI.

---

## User interface 🎨

* **Staff Dashboard:** Sidebar navigation, month/week/day calendar views, appointment list table, search and filters, modals for adding/editing appointments.  
* **Patient Portal:** Simple appointment form, lookup, and basic editing.  
* **Design Highlights:** Clean UI with responsive layout, toast notifications, dynamic colors, and modals with high z-index for clarity.  

---

## Implemented features ✅

**User management**  

* [x] Patient authentication/login  
* [x] Staff authentication/login  

**Appointment scheduling & management**  

* [x] Patient-facing form  
* [x] Staff-facing form with calendar pre-fill  
* [x] Lookup and edit appointments (patients & staff)  
* [x] Update status (Pending, Confirmed, Completed)  
* [x] Soft-delete, restore, and hard-delete appointments  

**Calendar views**  

* [x] Month, Week, Day views  
* [x] Navigation (previous/next period, Today button)  
* [x] Toggle between views  

**Staff dashboard table**  

* [x] Search, filter by date or procedure, sorting  
* [x] Pagination  

**Procedure color coding**  

* [x] Applied in calendar, table, and modals  
* [x] Dynamic text color for readability  

**UI & experience**  

* [x] Responsive design  
* [x] Toast notifications  
* [x] Prominent modals for new appointments  

**Backend / Utilities**  

* [x] Mock data for users, appointments, procedures  
* [x] Basic form validation  

---

## Known issues ⚠️

**Color & UI**  

* [ ] Color-code procedures are incosistent / not showing
* [ ] Potential color contrast issues in some combinations  
* [ ] New appointment modal is transparent
* [ ] When switching between days in the calendar it doesn't update the (Today) box

**Data & Architecture**  

* [ ] No persistent backend; data lost on refresh  
* [ ] Hardcoded mock data  
* [ ] Limited error handling  
* [ ] No API integration  
* [ ] No automated tests  

**File Structure**  

* [ ] Inconsistent component grouping  
* [ ] Mixed concerns in some files  
* [ ] Duplicate styling logic  
* [ ] Deep nesting in pages directory  

**Other**  

* [ ] Accessibility not explicitly handled  
* [ ] No performance optimizations  
* [ ] Browser compatibility not fully tested  

---

## Possible future implementations 🚀

**Backend & data**  

* [ ] API integration  
* [ ] Database connection (PostgreSQL, MongoDB, MySQL)  

**Appointments**  

* [ ] Recurring appointments  
* [ ] Reminders (SMS/email)  
* [ ] Conflict detection  
* [ ] Drag-and-drop rescheduling  
* [ ] Waiting list management  
* [ ] Cancellation policies  

**Users & roles**  

* [ ] Staff account management  
* [ ] Detailed patient profiles  
* [ ] Role-based access control  

**Calendar**  

* [ ] Multi-doctor view  
* [ ] Printable views  
* [ ] Custom working hours  

**Reports & analytics**  

* [ ] Appointment stats, revenue tracking, doctor performance  

**Communication & integration**  

* [ ] Internal messaging  
* [ ] Patient-staff messaging  
* [ ] Payment gateway  
* [ ] EHR system integration  
* [ ] Third-party calendar sync  

**UI/UX**  

* [ ] Custom theming  
* [ ] Advanced search  
* [ ] Accessibility compliance  
* [ ] Internationalization  

---

## Priority list 📌

* [ ] **Organize file structure** – group components by feature, reduce nesting  
* [ ] **Clean code** – separate UI, logic, and utilities clearly, remove duplicates  
* [ ] **Document code** – use Doxygen for functions, components, and hooks  
* [ ] **Document project** – create a PDF explaining features, structure, and usage  

---

## Installation & setup ⚙️

1. **Clone the repository:**
   ```bash
    git clone [https://github.com/yourusername/lumina-dental.git](https://github.com/yourusername/lumina-dental.git)
     ```
   
2. **Install dependencies:**
   ```bash
    npm install
   ```
   
4. **Run the application:**
   ```bash
    npm start
   ```

   
---
© 2025 Anthony Frade. All Rights Reserved.
