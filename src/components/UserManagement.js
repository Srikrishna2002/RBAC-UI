import React, { useState, useEffect } from "react";
import { fetchUsers, fetchRoles, addUser, deleteUser, editUser } from "../mockApi";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", role: "", status: "Active" });
  const [editingUserId, setEditingUserId] = useState(null); // To track editing user

  useEffect(() => {
    setUsers(fetchUsers());
    setRoles(fetchRoles());
  }, []);

  const handleAddUser = () => {
    if (!newUser.name || !newUser.role) {
      alert("Please fill in all fields");
      return;
    }
    addUser(newUser);
    setUsers(fetchUsers());
    setNewUser({ name: "", role: "", status: "Active" });
  };

  const handleDeleteUser = (id) => {
    deleteUser(id);
    setUsers(fetchUsers());
  };

  const handleEditUser = (user) => {
    setEditingUserId(user.id);
  };

  const handleSaveUser = (id, updatedUser) => {
    editUser(id, updatedUser);
    setUsers(fetchUsers());
    setEditingUserId(null);
  };

  return (
    <section className="management-section">
      <h2>User Management</h2>
      <div className="user-form">
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        >
          <option value="" disabled>
            Select Role
          </option>
          {roles.map((role) => (
            <option key={role.id} value={role.name}>
              {role.name}
            </option>
          ))}
        </select>
        <select
          value={newUser.status}
          onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <button onClick={handleAddUser}>Add User</button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              {editingUserId === user.id ? (
                <>
                  <td>
                    <input
                      type="text"
                      value={user.name}
                      onChange={(e) =>
                        setUsers(
                          users.map((u) =>
                            u.id === user.id ? { ...u, name: e.target.value } : u
                          )
                        )
                      }
                    />
                  </td>
                  <td>
                    <select
                      value={user.role}
                      onChange={(e) =>
                        setUsers(
                          users.map((u) =>
                            u.id === user.id ? { ...u, role: e.target.value } : u
                          )
                        )
                      }
                    >
                      {roles.map((role) => (
                        <option key={role.id} value={role.name}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select
                      value={user.status}
                      onChange={(e) =>
                        setUsers(
                          users.map((u) =>
                            u.id === user.id ? { ...u, status: e.target.value } : u
                          )
                        )
                      }
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </td>
                  <td>
                    <button onClick={() => handleSaveUser(user.id, user)}>Save</button>
                    <button onClick={() => setEditingUserId(null)}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{user.name}</td>
                  <td>{user.role}</td>
                  <td>{user.status}</td>
                  <td>
                    <button onClick={() => handleEditUser(user)}>Edit</button>
                    <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default UserManagement;
