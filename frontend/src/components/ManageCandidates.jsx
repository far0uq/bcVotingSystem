import { useState } from "react";
import AddCandidateForm from "./AddCandidateForm";
import "./ManageForms.css";
import "./generic/adminBtn.css";
import "./generic/adminTable.css";

function ManageCandidates() {
  const [showForm, setShowForm] = useState(false);
  return (
    <div>
      {showForm && <AddCandidateForm setShowForm={setShowForm} />}

      <div className="manage-main-panel d-flex flex-column align-items-center">
        <section>
          <div>
            <table className="table admin-table">
              <tr>
                <th>Candidate Name</th>
              </tr>
              <tr>
                <td>John Doe</td>
              </tr>
              <tr>
                <td>Jane Doe</td>
              </tr>
            </table>
          </div>
        </section>
        <button
          className="mt-4 admin-btn"
          onClick={() => setShowForm(!showForm)}
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default ManageCandidates;
