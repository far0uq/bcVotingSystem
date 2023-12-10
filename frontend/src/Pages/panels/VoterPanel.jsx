import React, { useState, useEffect } from "react";
import { contract } from "../ether.js"; 

function VotingPanel() {
  const [selectedCandidateIndex, setSelectedCandidateIndex] = useState(0);
  const [voterAddress, setVoterAddress] = useState("");
  const [canVote, setCanVote] = useState(true);

  useEffect(() => {
    const checkVoterStatus = async () => {
      try {
        const hasVoted = (await contract.voters(voterAddress)).hasVoted; // Access hasVoted property
        setCanVote(!hasVoted);
      } catch (error) {
        console.error("Error checking voter status:", error);
      }
    };

    if (voterAddress) {
      checkVoterStatus();
    }
  }, [voterAddress]);

  const castVote = async () => {
    try {
      await contract.vote(selectedCandidateIndex);
      setCanVote(false);
      console.log("Vote cast successfully!");
    } catch (error) {
      console.error("Error casting vote:", error);
    }
  };

  return (
    <div className="voting-panel d-flex flex-column">
      <div className="voting-section d-flex flex-column align-items-center">
        <h1 className="mt-4">This is the voting section</h1>
        <input
          type="text"
          placeholder="Your Ethereum Address"
          value={voterAddress}
          onChange={(e) => setVoterAddress(e.target.value)}
        />
        <select
          className="poll-dropdown"
          value={selectedCandidateIndex}
          onChange={(e) => setSelectedCandidateIndex(Number(e.target.value))}
        >
          {contract.candidates.map((candidate, index) => (
            <option key={index} value={index}>
              {candidate.name}
            </option>
          ))}
        </select>
        <button onClick={castVote} disabled={!canVote}>
          Cast Vote
        </button>
      </div>
    </div>
  );
}

export { VoterPanel as default };
