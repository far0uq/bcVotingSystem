import "./AdminPanel.css";

function AdminPanel() {
  return (
    <div>
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
        <button className="mt-4">Add</button>
      </div>
    </div>
  );
}

export default AdminPanel;
