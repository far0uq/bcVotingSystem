import React, { useState } from "react";
import { contract } from "../ether.js"; 

function AdminPanel() {
  const [candidateName, setCandidateName] = useState("");
  const [candidateAddress, setCandidateAddress] = useState("");

  const addCandidate = async () => {
    try {
      await contract.addCandidate(candidateName, candidateAddress);
      console.log("Candidate added successfully!");
    } catch (error) {
      console.error("Error adding candidate:", error);
    }
  };

  return (
    <div>
      <div className="manage-selection-panel d-flex">
      </div>
      <div className="manage-main-panel d-flex flex-column align-items-center">
        <div>
          <input
            type="text"
            placeholder="Candidate Name"
            value={candidateName}
            onChange={(e) => setCandidateName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Candidate Address"
            value={candidateAddress}
            onChange={(e) => setCandidateAddress(e.target.value)}
          />
          <button className="mt-4" onClick={addCandidate}>
            Add Candidate
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
