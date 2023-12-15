import { useEffect, useState } from "react";
import AddCandidateForm from "./AddCandidateForm";
import "./ManageForms.css";
import "./generic/adminBtn.css";
import "./generic/adminTable.css";

import { useContractContext } from "../context/contractContext";

function ManageCandidates() {
  const [showForm, setShowForm] = useState(false);
  const { sharedData } = useContractContext();

  const [votingStarted, setVotingStarted] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [votingConcluded, setVotingConcluded] = useState(false);

  useEffect(() => {
    const getCandidates = async () => {
      setCandidates(await sharedData.contract.getAllCandidates());
      console.log(candidates);
    };
    const getVotingStatus = async () => {
      setVotingStarted(await sharedData.contract.isVotingStarted());
      console.log(votingStarted);
    };
    const getVotingConcluded = async () => {
      setVotingConcluded(await sharedData.contract.isVotingConcluded());
      console.log(votingConcluded);
    };

    getVotingStatus();
    getCandidates();
    getVotingConcluded();
  }, [sharedData.contract]);

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
              {candidates.map((candidate) => (
                <tr key={candidate}>
                  <td>{candidate.name}</td>
                </tr>
              ))}
            </table>
          </div>
        </section>
        {votingStarted ? (
          <p className="mt-4" style={{ color: "orange" }}>
            Voting has started. No more candidates can be added.
          </p>
        ) : (
          <button
            className="mt-4 admin-btn"
            onClick={() => setShowForm(!showForm)}
          >
            Add
          </button>
        )}

        {votingConcluded && (
          <p style={{ color: "red" }}>
            Voting has concluded for the time being.
          </p>
        )}
      </div>
    </div>
  );
}

export default ManageCandidates;
