import { useState } from "react";
import "./AdminPanel.css";
import AddCandidatesForm from "../admin/forms/AddCandidatesForm";

function AdminPanel() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      {console.log(showForm)}
      {showForm && <AddCandidatesForm setShowForm={setShowForm} />}

      <div className="manage-selection-panel d-flex">
        <h6 className="col-2 justify-content-center d-flex align-items-center">
          Manage Polls
        </h6>
        <h6 className="col-2 justify-content-center d-flex align-items-center">
          Manage Candidates
        </h6>
        <div className="col-8"></div>
      </div>
      <div className="manage-main-panel d-flex flex-column align-items-center">
        <div>this is the management panel currently selected</div>
        <button className="mt-4" onClick={() => setShowForm(!showForm)}>
          Add
        </button>
      </div>
    </div>
  );
}

export default AdminPanel;
