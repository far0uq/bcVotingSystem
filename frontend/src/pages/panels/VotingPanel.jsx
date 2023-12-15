import { useEffect, useState } from "react";
import { useContractContext } from "../../context/contractContext";

import "./VotingPanel.css";
import "./generic/Panel.css";
import VoteForm from "../../components/VoteForm";
import VoterHistoryPanel from "../../components/VoterHistoryPanel";

function VotingPanel() {
  const { sharedData } = useContractContext();
  const [switchPanel, setSwitchPanel] = useState(true);
  const [votingStarted, setVotingStarted] = useState(false);

  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const getCandidates = async () => {
      setCandidates(await sharedData.contract.getAllCandidates());
      console.log(candidates);
    };
    const getVotingStatus = async () => {
      setVotingStarted(await sharedData.contract.isVotingStarted());
      console.log(votingStarted);
    };
    getVotingStatus();
    getCandidates();
  }, [sharedData.contract]);

  return (
    <div className="voting-panel d-flex flex-column">
      <div className="manage-panels d-flex align-items-center">
        <a href="#" onClick={() => setSwitchPanel(true)}>
          Vote
        </a>
        <a href="#" onClick={() => setSwitchPanel(false)}>
          Check Voter History
        </a>
      </div>

      {switchPanel ? (
        <VoteForm votingStarted={votingStarted} candidates={candidates} />
      ) : (
        <VoterHistoryPanel />
      )}
    </div>
  );
}

export default VotingPanel;
