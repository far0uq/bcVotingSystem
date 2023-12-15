import ManageCandidates from "../../components/ManageCandidates";
import ManagePoll from "../../components/ManagePoll";
import "./generic/Panel.css";
import { useState } from "react";

function AdminPanel() {
  const [switchPanel, setSwitchPanel] = useState(true);

  return (
    <div>
      <div className="manage-panels d-flex align-items-center">
        <a href="#" onClick={() => setSwitchPanel(true)}>
          Manage Candidates
        </a>
        <a href="#" onClick={() => setSwitchPanel(false)}>
          Manage Poll
        </a>
      </div>

      {switchPanel ? <ManageCandidates /> : <ManagePoll />}
    </div>
  );
}

export default AdminPanel;
