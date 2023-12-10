// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    address public admin;
    string public winnerName;

    struct Voter {
        bool hasVoted;
        uint256 votedCandidateIndex;
    }

    struct Candidate {
        string name;
        address candidateAddress; 
        uint256 voteCount;
    }

    mapping(address => Voter) public voters;
    Candidate[] public candidates;

    event VoteCast(address indexed voter, uint256 indexed candidateIndex);

    modifier onlyAdmin {
        require(msg.sender == admin, "Not the admin");
        _;
    }

    modifier onlyDuringVotingPeriod {
        require(bytes(winnerName).length == 0, "Voting period has ended.");
        _;
    }

    constructor(string[] memory _candidateNames, address[] memory _candidateAddresses) {
        require(_candidateNames.length == _candidateAddresses.length, "Mismatch in candidate data");

        admin = msg.sender;

        for (uint256 i = 0; i < _candidateNames.length; i++) {
            candidates.push(Candidate({
                name: _candidateNames[i],
                candidateAddress: _candidateAddresses[i],
                voteCount: 0
            }));
        }
    }

    function addCandidate(string memory _name, address _candidateAddress) public onlyAdmin onlyDuringVotingPeriod {
        candidates.push(Candidate({
            name: _name,
            candidateAddress: _candidateAddress,
            voteCount: 0
        }));
    }

    function vote(uint256 _candidateIndex) public onlyDuringVotingPeriod {
        require(!voters[msg.sender].hasVoted, "You have already voted.");
        require(_candidateIndex < candidates.length, "Invalid candidate index.");

        candidates[_candidateIndex].voteCount++;
        voters[msg.sender].hasVoted = true;
        voters[msg.sender].votedCandidateIndex = _candidateIndex;

        emit VoteCast(msg.sender, _candidateIndex);
    }

    function getAllVotesOfCandidates() public view returns (Candidate[] memory) {
        return candidates;
    }

    function getVotingStatus() public view returns (bool) {
        return (bytes(winnerName).length == 0);
    }

    function getRemainingTime() public view returns (uint256) {
        if (bytes(winnerName).length > 0) {
            return 0;
        }
        return type(uint256).max;
    }

    function getCandidateByIndex(uint256 _candidateIndex) public view returns (string memory, address, uint256) {
        require(_candidateIndex < candidates.length, "Invalid candidate index");

        Candidate memory candidate = candidates[_candidateIndex];
        return (candidate.name, candidate.candidateAddress, candidate.voteCount);
    }
}
