import PropTypes from "prop-types";
import { useContractContext } from "../context/contractContext";
import { useEffect, useState } from "react";

function VoteForm({ votingStarted, candidates }) {
  const { sharedData } = useContractContext();

  const [alreadyVoted, setAlreadyVoted] = useState(false);
  const [selectedCandidateIndex, setSelectedCandidateIndex] = useState(0);
  const [isVotingConcluded, setIsVotingConcluded] = useState(false);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const fetchVotingConcludedStatus = async () => {
      setIsVotingConcluded(await sharedData.contract.isVotingConcluded());
    };
    fetchVotingConcludedStatus();
  }, []);

  useEffect(() => {
    const fetchWinner = async () => {
      setWinner(await sharedData.contract.getWinner());
    };
    fetchWinner();
  }, []);
  const handleSelectChange = (event) => {
    setSelectedCandidateIndex(event.target.selectedIndex);
  };

  const castVote = async () => {
    await sharedData.contract.vote(selectedCandidateIndex);
    setAlreadyVoted(true);
  };

  return (
    <div>
      {isVotingConcluded ? (
        <h3 className="mt-5" style={{ color: "green", textAlign: "center" }}>
          {winner} won!
        </h3>
      ) : (
        <div className="voting-section d-flex flex-column align-items-center">
          {alreadyVoted ? (
            <p style={{ color: "red" }}>You already voted.</p>
          ) : votingStarted ? (
            <div>
              <form>
                <select onChange={handleSelectChange} className="voting-select">
                  {candidates.map((candidate, index) => (
                    <option key={index} value={index}>
                      {candidate.name}
                    </option>
                  ))}
                </select>
                <button onClick={() => castVote()}>Cast Vote</button>
              </form>
            </div>
          ) : (
            <p style={{ color: "orange" }}>Voting has not started yet.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default VoteForm;

VoteForm.propTypes = {
  votingStarted: PropTypes.bool.isRequired,
  candidates: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      votes: PropTypes.number.isRequired,
    })
  ).isRequired,
};
