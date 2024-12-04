import React from "react";
import UserManagement from "./components/UserManagement";
import RoleManagement from "./components/RoleManagement";
import "./styles.css";

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>RBAC Management Dashboard</h1>
      </header>
      <main>
        <UserManagement />
        <RoleManagement />
      </main>
    </div>
  );
}

export default App;
