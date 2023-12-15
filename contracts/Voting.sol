// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    address public admin;
    string public winnerName;
    bool votingPeriodActive = false;
    bool votingConcluded = false;

    struct Voter {
        bool hasVoted;
        uint256 votedCandidateIndex;
    }

    struct Candidate {
        string name;
        uint256 voteCount;
    }

    struct VoterHistory{
        address voterAddress;
        uint256 votedCandidateIndex;
    }

    mapping(address => Voter) public voters;
    Candidate[] public candidates;

    VoterHistory[] public voterHistory;

    modifier onlyAdmin {
        require(msg.sender == admin, "Not the admin");
        _;
    }

    modifier onlyDuringVotingPeriod {
        require(votingPeriodActive == true,"voting has not started yet");
        _;
    }

    modifier onlyBeforeVotingPeriod {
        require(votingPeriodActive == false,"voting has already started");
        _;
    }

    modifier onlyAfterVotingPeriod {
        require(votingConcluded == true,"voting has not ended yet");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function commenceVoting() public onlyAdmin onlyBeforeVotingPeriod {
        votingPeriodActive = true;
    }

    function endVoting() public onlyAdmin onlyDuringVotingPeriod {
        votingPeriodActive = false;
        votingConcluded = true;
    }

    function restartVoting() public onlyAdmin onlyAfterVotingPeriod {
        votingConcluded = false;
    }

    function addCandidate(string memory _name) public onlyAdmin onlyBeforeVotingPeriod payable{
        candidates.push(Candidate({
            name: _name,
            voteCount: 0
        }));
    }

    function vote(uint256 _candidateIndex) public onlyDuringVotingPeriod {
        require(!voters[msg.sender].hasVoted, "You have already voted.");
        require(_candidateIndex < candidates.length, "Invalid candidate index.");

        candidates[_candidateIndex].voteCount++;
        voters[msg.sender].hasVoted = true;
        voters[msg.sender].votedCandidateIndex = _candidateIndex;

        voterHistory.push(VoterHistory({
            voterAddress: msg.sender,
            votedCandidateIndex: _candidateIndex
        }));
    }

    function getVoterHistory() public view returns (VoterHistory[] memory) {
        return voterHistory;
    }

    function getAllCandidates() public view returns (Candidate[] memory) {
        return candidates;
    }

    function getCandidateByIndex(uint256 _candidateIndex) public view returns (string memory,  uint256) {
        require(_candidateIndex < candidates.length, "Invalid candidate index");

        Candidate memory candidate = candidates[_candidateIndex];
        return (candidate.name,  candidate.voteCount);
    }

    function getWinner() external view onlyAdmin onlyAfterVotingPeriod returns (string memory){
        uint256 highestVoteCount = 0;
        string memory winningCandidateName;

        for (uint256 i = 0; i < candidates.length; i++) {
            if (candidates[i].voteCount > highestVoteCount) {
                highestVoteCount = candidates[i].voteCount;
                winningCandidateName = candidates[i].name;
            }
        }

        return winningCandidateName;
    }

    function isVotingConcluded() public view returns (bool) {
        return votingConcluded;
    }
    
    function isVotingStarted() public view returns (bool) {
        return votingPeriodActive;
    }

}
