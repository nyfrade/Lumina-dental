// src/data/users.js

/**
 * MOCK USER DATABASE
 * IMPORTANT NOTE: In a real production app, passwords should never be stored in plain text.
 * This is for portfolio demonstration purposes only.
 */

export const MOCK_USERS = [
  {
    id: 1,
    username: "dr_elisa",
    password: "password123",
    name: "Dr. Elisa JR",
    role: "staff", // Grants access to dashboard
  },

  {
    id: 2,
    username: "dr_morgan",
    password: "password123",
    name: "Dr. Alex Morgan",
    role: "staff", // Grants access to dashboard
  },
  {
    id: 3,
    username: "reception",
    password: "password123",
    name: "Front Desk", // generic staff user
    role: "staff",
  },
  {
    id: 4,
    username: "assistant",
    password: "password123",
    name: "Dental Assistant",
    role: "staff",
  },
  {
    id: 5,
    username: "john_doe",
    password: "user123",
    name: "John Doe",
    phoneNumber: "555-1234",
    address: "123 Main St, Anytown, USA",
    email: "johndoe@example.com",
    role: "patient", // grants access to booking history only
  },
  {
    id: 6,
    username: "jane_smith",
    password: "mypassword",
    name: "Jane Smith",
    phoneNumber: "555-5678",
    address: "456 Elm St, Anytown, USA",
    email: "janesmith@example.com",
    role: "patient", // grants access to booking history only
  },
  {
    id: 7,
    username: "mark_twain",
    password: "huckleberry",
    name: "Mark Twain",
    phoneNumber: "555-8765",
    address: "789 Oak St, Anytown, USA",
    email: "marktwain@example.com",
    role: "patient",
  },
  {
    id: 8,
    username: "emily_carter",
    password: "password123",
    name: "Emily Carter",
    phoneNumber: "555-1111",
    address: "111 Pine St, Anytown, USA",
    email: "emily.carter@example.com",
    role: "patient",
  },
  {
    id: 9,
    username: "michael_chen",
    password: "password123",
    name: "Michael Chen",
    phoneNumber: "555-2222",
    address: "222 Birch St, Anytown, USA",
    email: "michael.chen@example.com",
    role: "patient",
  },
  {
    id: 10,
    username: "sarah_davis",
    password: "password123",
    name: "Sarah Davis",
    phoneNumber: "555-3333",
    address: "333 Cedar St, Anytown, USA",
    email: "sarah.davis@example.com",
    role: "patient",
  },
];

/**
 * Simulates an API login call.
 * @param {string} username
 * @param {string} password
 * @returns {object|null} Returns user object if successful, null if failed.
 */
export const authenticateUser = (username, password) => {
  const user = MOCK_USERS.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    // Return user info without the password for security simulation
    const { password, ...safeUser } = user;
    return safeUser;
  }

  return null;
};
