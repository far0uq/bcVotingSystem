import { useState } from "react";
import "./AdminPanel.css";
import AddCandidateForm from "../../components/AddCandidateForm";

function AdminPanel() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      {console.log(showForm)}
      {showForm && <AddCandidateForm setShowForm={setShowForm} />}

      <div className="manage-main-panel d-flex flex-column align-items-center">
        <section>
          <div>
            <table className="table candidate-table">
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
        <button className="mt-4" onClick={() => setShowForm(!showForm)}>
          Add
        </button>
      </div>
    </div>
  );
}

export default AdminPanel;
