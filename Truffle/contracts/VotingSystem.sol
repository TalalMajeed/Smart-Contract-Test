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
        require(!candidateExists(name), "Candidate already exists");
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
        return (index < top && keccak256(bytes(candidates[index])) == keccak256(bytes(name)));
    }

    function getAllCandidates() public view returns (string[] memory) {
        string[] memory tempNames = new string[](top);
        uint256 count = 0;

        for (uint256 i = 0; i < top; i++) {
            if (bytes(candidates[i]).length > 0) {
                tempNames[count] = candidates[i];
                count++;
            }
        }

        string[] memory validNames = new string[](count);
        for (uint256 j = 0; j < count; j++) {
            validNames[j] = tempNames[j];
        }

        return validNames;
    }
}