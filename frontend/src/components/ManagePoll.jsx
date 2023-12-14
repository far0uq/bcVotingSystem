import "./ManagePoll.css";
import "./generic/adminBtn.css";
import "./generic/adminTable.css";
import { useState } from "react";
function ManagePoll() {
  const [isVotingActive, setIsVotingActive] = useState(false);

  return (
    <div>
      <div className="manage-main-panel d-flex flex-column align-items-center">
        <section>
          <div>
            <div className="admin-result-heading d-flex align-items-center justify-content-center">
              <h2>Voting Ongoing...</h2>
            </div>
            <table className="table admin-table">
              <tr>
                <th>Candidate Name</th>
                <th>Votes</th>
              </tr>
              <tr>
                <td>John Doe</td>
                <td>0</td>
              </tr>
              <tr>
                <td>Jane Doe</td>
                <td>0</td>
              </tr>

              <tr>
                <td>Damien Wayne</td>
                <td>0</td>
              </tr>
            </table>
          </div>
        </section>
        <button
          className={`mt-4 admin-btn ${
            isVotingActive && "inactive-voting-btn"
          }`}
          onClick={() => setIsVotingActive(true)}
        >
          Start Voting Time
        </button>
        <button
          className={`mt-4 admin-btn ${
            !isVotingActive && "inactive-voting-btn"
          }`}
          onClick={() => setIsVotingActive(false)}
        >
          Stop Voting Time
        </button>
      </div>
    </div>
  );
}

export default ManagePoll;
