import React from "react";

function ConnectionStatus({ connected }) {
  let status = connected ? "Connected" : "Disconnected";
  return (
    <div className="connectionStatus">
      <strong>Status:</strong> {status}
    </div>
  );
}

export default ConnectionStatus;
