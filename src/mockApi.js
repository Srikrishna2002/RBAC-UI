// Mock Data for Users and Roles
let roles = [
  { id: 1, name: "Admin", permissions: ["Read", "Write", "Delete"] },
  { id: 2, name: "Editor", permissions: ["Read", "Write"] },
  { id: 3, name: "Viewer", permissions: ["Read"] },
];

let users = [
  { id: 1, name: "John Doe", role: "Admin", status: "Active" },
  { id: 2, name: "Jane Smith", role: "Editor", status: "Inactive" },
];

// Fetch all roles
export const fetchRoles = () => {
  return roles;
};

// Fetch all users
export const fetchUsers = () => {
  return users;
};

// Add a new user
export const addUser = (newUser) => {
  const id = users.length + 1;
  users.push({ id, ...newUser });
};

// Add a new role
export const addRole = (newRole) => {
  const id = roles.length + 1;
  roles.push({ id, ...newRole });
};

// Edit an existing user
export const editUser = (id, updatedUser) => {
  users = users.map((user) => (user.id === id ? { ...user, ...updatedUser } : user));
};

// Delete an existing user
export const deleteUser = (id) => {
  users = users.filter((user) => user.id !== id);
};

// Edit an existing role (the new function)
export const editRole = (id, updatedRole) => {
  roles = roles.map((role) =>
    role.id === id ? { ...role, name: updatedRole.name, permissions: updatedRole.permissions } : role
  );
};

