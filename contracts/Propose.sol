pragma solidity ^0.5.0;

// import "openzeppelin-eth/contracts/ownership/Ownable.sol";
import "zos-lib/contracts/Initializable.sol";

contract Propose is Initializable {

    struct Proposer {
        //uint256 proposerId;
        string proposerName;      // name of person who propose
        address proposerAddress;  // address of person who propose
        //mapping (address => Proposal[]) proposal;
    }
    Proposer[] public proposers;  // e.g) proposers[index].proposerName


    struct Proposal {
        string proposalTitle;
        string proposalContent;
    }
    //Proposal[] public proposals;  // e.g) proposal[index].name



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
        //string memory _content
    ) public returns (string memory, address) 
    {
        Proposer memory proposer = Proposer({
            //proposerId: _proposerId,
            proposerName: _proposerName,
            proposerAddress: _proposerAddress
            //content: _content
        });
        proposers.push(proposer);

        //emit CreateProposer(_proposerId, _proposerAddress, _name, _content);

        return (_proposerName, _proposerAddress);
    }


    /* @notice Get proposerId */
    function getProposerId() public view returns (uint256 _proposerId) {
        return proposers.length - 1;
    }


    /* @notice Save new proposer */
    function saveProposer(uint256 _proposerId) public returns (bool success) {
        Proposer storage proposer = proposers[_proposerId];
        //proposer.proposerId = _proposerId;
        proposer.proposerName = proposers[_proposerId].proposerName;
        proposer.proposerAddress = proposers[_proposerId].proposerAddress;
        //proposer.content = _content;
        return true;
    }


    /* @notice Get number of total proposer */
    function getNumberOfTotalProposer() public view returns (uint) {
        return proposers.length;
    }
}
