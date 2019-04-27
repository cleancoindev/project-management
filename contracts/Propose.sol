pragma solidity ^0.5.0;

// import "openzeppelin-eth/contracts/ownership/Ownable.sol";
import "zos-lib/contracts/Initializable.sol";


contract Propose is Initializable {

    //uint256 public proposerId;
    //uint256 public proposalId;

    struct Proposer {
        string proposerName;      // name of person who propose
        address proposerAddress;  // address of person who propose
        //mapping (uint256 => Proposal) proposals;  // proposals[index].proposals[uint256]
    }
    Proposer[] public proposers;  // e.g) proposers[index].proposerName


    struct Proposal {
        address proposalBy;
        string proposalTitle;
        string proposalContent;
        uint256 votingCountOfProposal;  // Count voting status of proposal
    }
    Proposal[] public proposals;  // e.g) proposal[index].name



    // event CreateProposer(
    //     uint256 indexed _proposerId, 
    //     address indexed _proposerAddress, 
    //     string indexed _name, 
    //     string indexed _content
    // );
    
    //it keeps a count to demonstrate stage changes
    uint private countPropose;
    address private _owner;

    function initialize(uint num) public initializer {
        _owner = msg.sender;
       countPropose = num;
    }

    /* @notice Check owner address */ 
    function owner() public view returns (address) {
        return _owner;
    }

    /* @notice Create new proposer */ 
    function createProposer(
        //uint256 _proposerId,
        string memory _proposerName,
        address _proposerAddress
        //string memory _proposalTitle,
        //string memory _proposalContent
    ) public returns (string memory, address) 
    {
        Proposer memory proposer = Proposer({
            //proposerId: _proposerId,
            proposerName: _proposerName,
            proposerAddress: _proposerAddress
            //proposalTitle: _proposalTitle,
            //proposalContent: _proposalContent
        });
        proposers.push(proposer);

        //emit CreateProposer(_proposerId, _proposerAddress, _name, _content);

        //return (_proposerName, _proposerAddress, _proposalTitle, _proposalContent);
        return (_proposerName, _proposerAddress);
    }



    /* @notice Save new proposer */
    function saveProposer(uint256 _proposerId) public returns (bool success) {
        Proposer storage proposer = proposers[_proposerId];
        //proposer.proposerId = _proposerId;
        proposer.proposerName = proposers[_proposerId].proposerName;
        proposer.proposerAddress = proposers[_proposerId].proposerAddress;
        //proposer.proposalTitle = proposers[_proposerId].proposalTitle;
        //proposer.proposalContent = proposers[_proposerId].proposalContent;

        return true;
    }


    /* @notice Call proposer */ 
    function getProposer(uint256 _proposerId) public view returns (string memory _proposerName, address _proposerAddress) {
        //Proposer storage proposer = proposers[_proposerId];
        Proposer memory proposer = proposers[_proposerId];

        _proposerName = proposers[_proposerId].proposerName;
        _proposerAddress = proposers[_proposerId].proposerAddress;

        return (_proposerName, _proposerAddress);
    }
    

    /* @notice Create new proposal */ 
    function createProposal(
        address _proposalBy,
        string memory _proposalTitle,
        string memory _proposalContent,
        uint256 _votingCountOfProposal
    ) public returns (address, string memory, string memory, uint256) 
    {
        Proposal memory proposal = Proposal({
            proposalBy: _proposalBy,
            proposalTitle: _proposalTitle,
            proposalContent: _proposalContent,
            votingCountOfProposal: _votingCountOfProposal
        });
        proposals.push(proposal);

        return (_proposalBy, _proposalTitle, _proposalContent, _votingCountOfProposal);
    }

    /* @notice Save new proposal */
    function saveProposal(uint256 _proposalId) public returns (bool success) {
        Proposal storage proposal = proposals[_proposalId];
        proposal.proposalBy = proposals[_proposalId].proposalBy;
        proposal.proposalTitle = proposals[_proposalId].proposalTitle;
        proposal.proposalContent = proposals[_proposalId].proposalContent;
        proposal.votingCountOfProposal = proposals[_proposalId].votingCountOfProposal;

        return true;
    }



    /* @notice Get proposerId */
    function getProposerId() public view returns (uint256 _proposerId) {
        return proposers.length - 1;
    }

    /* @notice Get number of total proposer */
    function getNumberOfTotalProposer() public view returns (uint) {
        return proposers.length;
    }


    /* @notice Get proposalId */
    function getProposalId() public view returns (uint256 _proposalId) {
        return proposals.length - 1;
    }

    /* @notice Get number of total proposal */
    function getNumberOfTotalProposal() public view returns (uint) {
        return proposals.length;
    }



    /* @notice Voting status of proposal (count of voting per proposal) */
    function votingStatus(uint256 _proposalId) public view returns (uint256) {
        Proposal memory proposal = proposals[_proposalId];
        //proposal.proposalBy = proposals[_proposalId].proposalBy;
        //proposal.proposalTitle = proposals[_proposalId].proposalTitle;
        //proposal.proposalContent = proposals[_proposalId].proposalContent;
        proposal.votingCountOfProposal = proposals[_proposalId].votingCountOfProposal;

        return proposal.votingCountOfProposal;
    }

    /* @notice New Voting (Who is voting) */
    function newVoting(address _proposerAddress) public view returns (address) {
        return _proposerAddress;
    }

}
