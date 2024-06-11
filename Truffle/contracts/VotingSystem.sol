// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

contract VotingSystem {
    mapping(uint256 => string) public candidates;
    mapping(string => uint256) private candidateIndices;
    uint256 top = 0;

    event CandidateAdded(uint256 index, string name);
    event CandidateRemoved(uint256 index, string name);

    function addCandidate(string memory name) public {
        require(bytes(name).length > 0, "Candidate name cannot be empty");
        candidates[top] = name;
        candidateIndices[name] = top;
        emit CandidateAdded(top, name);
        top++;
    }
    
    function removeCandidate(string memory name) public {
        require(bytes(name).length > 0, "Candidate name cannot be empty");
        require(candidateExists(name), "Candidate does not exist");

        uint256 index = candidateIndices[name];
        emit CandidateRemoved(index, name);
        
        delete candidates[index];
        delete candidateIndices[name];
    }

    function candidateExists(string memory name) internal view returns (bool) {
        uint256 index = candidateIndices[name];
        return (keccak256(bytes(candidates[index])) == keccak256(bytes(name)));
    }

    function getAllCandidates() public view returns (string[] memory) {
        string[] memory names = new string[](top);
        for (uint256 i = 0; i < top; i++) {
            names[i] = candidates[i];
        }
        return names;
    }
}