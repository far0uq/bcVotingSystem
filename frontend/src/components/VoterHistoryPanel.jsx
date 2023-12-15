import { useContractContext } from "../context/contractContext";
import { useEffect, useState } from "react";

import "./VoterHistoryTable.css";

function VoterHistoryPanel() {
  const { sharedData } = useContractContext();
  const [voterHistory, setVoterHistory] = useState([]);

  useEffect(() => {
    const getVoterHistory = async () => {
      setVoterHistory(await sharedData.contract.getVoterHistory());
      console.log("VoterHistory:", voterHistory);
    };
    getVoterHistory();
  }, []);

  return (
    <>
      {voterHistory.length > 0 ? (
        <table className="voter-history-table">
          <thead>
            <tr>
              <th>Address</th>
              <th>Voted For</th>
            </tr>
          </thead>
          <tbody>
            {voterHistory.map((voter) => (
              <tr key={voter}>
                <td>{voter.voterAddress}</td>
                <td>{voter.votedCandidateIndex.toString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h4 className="mt-5" style={{ color: "orange", textAlign: "center" }}>
          No votes yet
        </h4>
      )}
    </>
  );
}

export default VoterHistoryPanel;
