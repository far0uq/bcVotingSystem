import { useEffect, useState } from "react";
import { useContractContext } from "../context/contractContext";

import "./ManagePoll.css";
import "./generic/adminBtn.css";
import "./generic/adminTable.css";

function ManagePoll() {
  const [isVotingActive, setIsVotingActive] = useState(false);
  const [isVotingConcluded, setIsVotingConcluded] = useState(false);
  const [winner, setWinner] = useState(null);
  const { sharedData } = useContractContext();

  useEffect(() => {
    const fetchVotingStarted = async () => {
      const hasVotingStarted = await sharedData.contract.isVotingStarted();
      setIsVotingActive(hasVotingStarted);
    };

    const fetchVotingConcluded = async () => {
      const hasVotingConcluded = await sharedData.contract.isVotingConcluded();
      setIsVotingConcluded(hasVotingConcluded);
    };

    fetchVotingStarted();
    fetchVotingConcluded();
  }, [sharedData.contract]);

  useEffect(() => {
    const fetchWinner = async () => {
      setWinner(await sharedData.contract.getWinner());
    };
    fetchWinner();
  }, [isVotingConcluded]);

  const startVotingTime = async () => {
    if (!isVotingActive) {
      await sharedData.contract.commenceVoting();
      setIsVotingActive(true);
    }
  };

  const stopVotingTime = async () => {
    if (isVotingActive) {
      await sharedData.contract.endVoting();
      setIsVotingActive(false);
      setIsVotingConcluded(true);
    }
  };

  return (
    <div>
      <div className="manage-main-panel d-flex flex-column align-items-center">
        <section>
          <div>
            <div className="admin-result-heading d-flex align-items-center justify-content-center">
              {isVotingConcluded ? (
                <h2>{winner} won the poll.</h2>
              ) : (
                <h2>Voting Ongoing...</h2>
              )}
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
          onClick={() => startVotingTime(true)}
        >
          Start Voting Time
        </button>
        <button
          className={`mt-4 admin-btn ${
            !isVotingActive && "inactive-voting-btn"
          }`}
          onClick={() => stopVotingTime(false)}
        >
          Stop Voting Time
        </button>
      </div>
    </div>
  );
}

export default ManagePoll;
