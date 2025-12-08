// Mock up appointment data for testing purposes

import { MOCK_USERS } from "./users"; // Importing mock user data
import { procedures } from "./procedures"; // Importing mock procedures data

// Helper function to get a random item from an array
const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Function to generate a random date within the next 30 days
const getRandomDate = () => {
  const today = new Date();
  const futureDate = new Date(today);
  futureDate.setDate(today.getDate() + Math.floor(Math.random() * 30) + 1); // 1-30 days in the future
  return futureDate.toISOString().split("T")[0];
};

// Function to generate a random time between 9 AM and 5 PM
const getRandomTime = () => {
  const hours = Math.floor(Math.random() * 8) + 9; // 9 AM to 4 PM
  const minutes = Math.random() > 0.5 ? "30" : "00";
  return `${hours.toString().padStart(2, "0")}:${minutes}`;
};

export const appointments = [
  {
    id: 1,
    patientId: 5,
    patientName: "John Doe",
    date: "2025-03-15",
    time: "10:00",
    phone: "555-1234",
    address: "123 Main St, Anytown, USA",
    email: "johndoe@example.com",
    procedure: "Teeth cleaning",
    status: "Confirmed",
    doctor: "Dr. Jeinny Papel",
    doctorId: 1,
    notes: "Annual check-up.",
  },
  {
    id: 2,
    patientId: 6,
    patientName: "Jane Smith",
    date: "2025-03-20",
    time: "11:30",
    phone: "555-5678",
    address: "456 Elm St, Anytown, USA",
    email: "janesmith@example.com",
    procedure: "Filling (cavity)",
    status: "Confirmed",
    doctor: "Dr. Alex Morgan",
    doctorId: 2,
    notes: "Lower right molar.",
  },
  {
    id: 3,
    patientId: 7,
    patientName: "Mark Twain",
    date: "2025-03-22",
    time: "13:00",
    phone: "555-8765",
    address: "789 Oak St, Anytown, USA",
    email: "marktwain@example.com",
    procedure: "Teeth whitening",
    status: "Pending",
    doctor: "Dr. Alex Morgan",
    doctorId: 2,
    notes: "Follow-up from consultation.",
  },

  // Dynamically generated appointments so that we have more data
  ...Array.from({ length: 10 }, (_, i) => { // 10 more appointments
    const patient = getRandomItem( 
      MOCK_USERS.filter((u) => u.role === "patient") // select only patients
    );
    const procedure = getRandomItem(procedures); // select a random procedure
    const doctor = getRandomItem( // select only staff doctors
      MOCK_USERS.filter((u) => u.role === "staff" && u.name.startsWith("Dr.")) // only doctors
    );
    // Return a new appointment object
    return {
      id: i + 4,
      patientId: patient.id,
      patientName: patient.name,
      date: getRandomDate(),
      time: getRandomTime(),
      phone: patient.phoneNumber,
      address: patient.address,
      email: patient.email,
      procedure: procedure.name,
      status: getRandomItem(["Confirmed", "Pending", "Cancelled"]),
      doctor: doctor.name,
      doctorId: doctor.id,
      notes: "Generated appointment.",
    };
  }),
];