# Lumina Dental

**A modern, react-based appointment scheduling application for a dental clinic.**

> 🚧 **Work in Progress:** This project is currently under active development.
>
> **Author:** Anthony Frade
>
> **Project Type:** Personal portfolio project

## 📖 Overview
Lumina Dental is a comprehensive appointment management system designed to demonstrate advanced react patterns and state management. The goal is to move away from standard, rigid medical software and create a fluid, user-friendly experience for both patients and clinic staff.

The application distinguishes between two primary user roles: **Patients** (focused on ease of access) and **Staff** (focused on data management and scheduling efficiency).

## 🚀 Planned Features

### 1. Landing & Authentication
* **Immersive Entry:** A "welcome" experience featuring smooth fade-in animations and a distraction-free interface.
* **Role-Based Access:** A centralized login portal that routes users to the correct environment:
    * **Patient Access:** For booking and self-management.
    * **Staff Access:** For the administrative dashboard.

### 2. Patient Module
* **Smart Scheduling Form:** A clean interface to book appointments (Cleaning, Braces, Check-up, etc.).
* **Automated Age Calculation:** Logic that calculates patient age dynamically based on Date of Birth to minimize data redundancy.
* **Appointment Management:** Patients can retrieve existing appointments via Email or ID search.
* **Restricted Editing:** Patients can modify logistics (Time, Date, Address) but cannot access internal clinic notes or administrative flags.

### 3. Staff Dashboard (Admin)
* **Dual-View Visualization:**
    * **Calendar View:** A full month-grid visualization of the clinic's schedule.
    * **List View:** A linear, detailed list of all appointments.
* **Advanced Filtering:** Tools to view appointments by Day, Week, or Month.
* **Search Functionality:** robust search by Patient Name, Phone, Email, or Appointment Type.
* **Administrative Actions:**
    * Confirm/Verify appointments.
    * Add internal/private notes to patient files.
    * Delete or Reschedule appointments.

### 4. Data Architecture
* **Centralized State:** A unified data structure handling complex patient objects (ID, specific dates, confirmation status).
* **Persistence:** Utilization of `localStorage` to simulate backend persistence during the development phase.

## 🛠️ Tech Stack
* **Core:** React (Functional Components + Hooks)
* **Language:** JavaScript (ES6+)
* **Styling:** CSS Modules / Styled Components
* **Icons:** Lucide React
* **Routing:** React Router

## 🏗️ Development Roadmap
I am currently following a "Logic-First" approach to ensure stability before implementing the final UI design.

- [ ] **Phase 1: Core Architecture** (Data models, state logic, dummy data generation)
- [ ] **Phase 2: Logic Implementation** (CRUD operations, filtering algorithms, age calculation)
- [ ] **Phase 3: Admin Dashboard** (Building the Staff views and management tools)
- [ ] **Phase 4: Patient Interface** (Forms, validation, and user flow)
- [ ] **Phase 5: UI/UX Refinement** (Animations, responsive layout, dark mode integration)

## 📦 Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/yourusername/lumina-dental.git](https://github.com/yourusername/lumina-dental.git)
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the application:**
    ```bash
    npm start
    ```

---
*© 2025 Anthony Frade. All Rights Reserved.*
