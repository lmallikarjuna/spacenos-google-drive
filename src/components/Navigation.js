import React from "react";

import GoogleDriveIcon from "./utils/GoogleDriveIcon";

export default function Navigation({
  handleLoginClick,
  handleLogoutClick,
  currentState,
}) {
  return (
    <nav className="nav-container">
      {!currentState ? (
        <button onClick={handleLoginClick}><GoogleDriveIcon /> Google Login</button>
      ) : (
        <button onClick={handleLogoutClick}><GoogleDriveIcon /> Google Logout</button>
      )}
    </nav>
  );
}
