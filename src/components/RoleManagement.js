import React, { useState, useEffect } from "react";
import { fetchRoles, addRole, editRole } from "../mockApi";  // Assuming mockApi has these functions

function RoleManagement() {
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState({ name: "", permissions: [] });
  const [editingRoleId, setEditingRoleId] = useState(null);  // To track editing role

  useEffect(() => {
    setRoles(fetchRoles()); // Get roles from the mock API or state
  }, []);

  const handleAddRole = () => {
    if (!newRole.name || newRole.permissions.length === 0) {
      alert("Please provide a role name and at least one permission.");
      return;
    }
    addRole(newRole);
    setRoles(fetchRoles());
    setNewRole({ name: "", permissions: [] });  // Clear the new role form
  };

  const handleEditRole = (role) => {
    setEditingRoleId(role.id);  // Mark role for editing
    setNewRole({ name: role.name, permissions: role.permissions });  // Pre-fill the role fields
  };

  const handleSaveRole = () => {
    editRole(editingRoleId, newRole);
    setRoles(fetchRoles());
    setEditingRoleId(null);  // Exit editing mode
    setNewRole({ name: "", permissions: [] });
  };

  const handlePermissionChange = (permission) => {
    setNewRole((prevRole) => {
      const permissions = prevRole.permissions.includes(permission)
        ? prevRole.permissions.filter((p) => p !== permission) // Remove permission
        : [...prevRole.permissions, permission]; // Add permission
      return { ...prevRole, permissions };
    });
  };

  return (
    <section className="management-section">
      <h2>Role Management</h2>
      {/* Form to add new role */}
      <div className="role-form">
        <input
          type="text"
          placeholder="Role Name"
          value={newRole.name}
          onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
        />
        <div className="permissions">
          <label>
            <input
              type="checkbox"
              checked={newRole.permissions.includes("Read")}
              onChange={() => handlePermissionChange("Read")}
            />
            Read
          </label>
          <label>
            <input
              type="checkbox"
              checked={newRole.permissions.includes("Write")}
              onChange={() => handlePermissionChange("Write")}
            />
            Write
          </label>
          <label>
            <input
              type="checkbox"
              checked={newRole.permissions.includes("Delete")}
              onChange={() => handlePermissionChange("Delete")}
            />
            Delete
          </label>
          {/* Add custom permissions if needed */}
          <label>
            <input
              type="checkbox"
              checked={newRole.permissions.includes("Custom Permission")}
              onChange={() => handlePermissionChange("Custom Permission")}
            />
            Custom Permission
          </label>
        </div>
        {editingRoleId ? (
          <button onClick={handleSaveRole}>Save Role</button>
        ) : (
          <button onClick={handleAddRole}>Add Role</button>
        )}
      </div>

      {/* Role List Table */}
      <table className="table">
        <thead>
          <tr>
            <th>Role Name</th>
            <th>Permissions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td>{role.name}</td>
              <td>{role.permissions.join(", ")}</td>
              <td>
                <button onClick={() => handleEditRole(role)}>Edit</button>
                {/* Optionally, add a delete button */}
                {/* <button onClick={() => handleDeleteRole(role.id)}>Delete</button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default RoleManagement;
