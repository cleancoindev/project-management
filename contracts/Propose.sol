pragma solidity ^0.5.0;

// import "openzeppelin-eth/contracts/ownership/Ownable.sol";
import "zos-lib/contracts/Initializable.sol";

contract Propose is Initializable {

    // struct Proposal {
    //     //uint256 proposerId;
    //     string proposerName;      // name of person who propose
    //     address proposerAddress;  // address of person who propose
    //     //string content;   // content of proposal
    // }
    // //mapping (address => Proposal) proposal;  // e.g) proposal[addres].name
    // Proposal[] public proposals;  // e.g) proposal[index].name

    struct Proposer {
        //uint256 proposerId;
        string proposerName;      // name of person who propose
        address proposerAddress;  // address of person who propose
        //mapping (address => Proposal[]) proposal;
    }
    Proposer[] public proposers;  // e.g) proposal[index].name


    struct Proposal {
        string proposalTitle;
        string proposalContent;
    }
    //Proposal[] public proposals;  // e.g) proposal[index].name



    struct Contact {
        string contactName;
        address contactAddress;
    }
    Contact[] public contacts;

    // event CreateProposal(
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

    /* @notice Create new proposal */ 
    //function createProposal(
    function createProposer(
        //uint256 _proposerId,
        string memory _proposerName,
        address _proposerAddress
        //string memory _content
    ) public returns (string memory, address) 
    {
        //Proposal memory proposal = Proposal({
        Proposer memory proposer = Proposer({
            //proposerId: _proposerId,
            proposerName: _proposerName,
            proposerAddress: _proposerAddress
            //content: _content
        });

        //proposals.push(proposal);
        proposers.push(proposer);

        //emit CreateProposal(_proposerId, _proposerAddress, _name, _content);

        return (_proposerName, _proposerAddress);
    }


    /* @notice Get proposerId */
    function getProposerId() public view returns (uint256 _proposerId) {
        return proposers.length - 1;
    }
    // function getProposalId() public view returns (uint256 _proposerId) {
    //     return proposals.length - 1;
    // }


    /* @notice Save new proposal */
    function saveProposer(uint256 _proposerId) public returns (bool success) {
        Proposer storage proposer = proposers[_proposerId];
        //proposal.proposerId = _proposerId;
        proposer.proposerName = proposers[_proposerId].proposerName;
        proposer.proposerAddress = proposers[_proposerId].proposerAddress;
        //proposal.content = _content;
        return true;
    }
    // function saveProposal(uint256 _proposerId) public returns (bool success) {
    //     Proposal storage proposal = proposals[_proposerId];
    //     //proposal.proposerId = _proposerId;
    //     proposal.proposerName = proposals[_proposerId].proposerName;
    //     proposal.proposerAddress = proposals[_proposerId].proposerAddress;
    //     //proposal.content = _content;
    //     return true;
    // }


    



    /* @notice New proposal */ 
    // function newProposal(
    //     // uint256 _proposerId,
    //     string memory _proposerName,
    //     address _proposerAddress
    //     //string memory _content
    // ) public returns (string memory, address) 
    // {
    //     Proposal memory proposal = Proposal({
    //         // proposerId: _proposerId,
    //         proposerName: _proposerName,
    //         proposerAddress: _proposerAddress
    //         //content: _content
    //     });
    //     proposals.push(proposal);

    //     // Get new proposerId
    //     proposerId = proposals.length - 1;

    //     // Save new proposal
    //     Proposal storage proposal = proposals[proposerId];
    //     //proposal.proposerId = _proposerId;
    //     proposal.proposerName = proposals[proposerId].proposerName;
    //     proposal.proposerAddress = proposals[proposerId].proposerAddress;
    //     //proposal.content = _content;

    //     //emit CreateProposal(_proposerId, _proposerAddress, _name, _content);

    //     return (_proposerName, _proposerAddress);
    // }
    


    /* @notice createContace */ 
    function createContact(
        string memory _contactName, 
        address _contactAddress
    ) public returns (string memory, address) 
    {
        Contact memory contact = Contact({
            contactName: _contactName,
            contactAddress: _contactAddress
        });
        contacts.push(contact);

        return (_contactName, _contactAddress);
    }



    /* @notice Get number of total proposal */
    function getNumberOfTotalProposer() public view returns (uint) {
        return proposers.length;
    }
    // function getNumberOfTotalProposal() public view returns (uint) {
    //     return proposals.length;
    // }
    
}
