pragma solidity ^0.5.0;

// import "openzeppelin-eth/contracts/ownership/Ownable.sol";
import "zos-lib/contracts/Initializable.sol";

contract Propose is Initializable {

    struct Proposal {
        uint256 proposerId;
        address proposerAddress;  // address of person who propose
        string name;      // name of person who propose
        string content;   // content of proposal
    }
    //mapping (address => Proposal) proposal;  // e.g) proposal[addres].name
    Proposal[] public proposals;  // e.g) proposal[index].name



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
    function createProposal(
        uint256 _proposerId,
        address _proposerAddress,
        string memory _name, 
        string memory _content
    ) public returns (bool) 
    {
        // Propose storage proposal = proposal.push(Propose({
        //     proposerAddress: _proposerAddress,
        //     name: _name,
        //     content: _content
        // }));
        
        Proposal storage proposal = proposals[_proposerId];
        proposal.proposerId = _proposerId;
        proposal.proposerAddress = _proposerAddress;
        proposal.name = _name;
        proposal.content = _content;

        //proposals.push(proposal);

        //emit CreateProposal(_proposerId, _proposerAddress, _name, _content);

        return true;
    }


    /* @notice Get number of total proposal */
    function getNumberOfTotalProposal() public view returns (uint) {
        return proposals.length;
    }
    
  


    // function owner() public view returns (address) {
    //     return _owner;
    // }

    // // getter
    // function getCounter() public view returns (uint) {
    //     return count;
    // }

    // //and it can add to a count
    // function increaseCounter(uint256 amount) public {
    //     count = count + amount;
    // }

    // //We'll upgrade the contract with this function after deploying it
    // //Function to decrease the counter
    // function decreaseCounter(uint256 amount) public returns (bool) {
    //     require(count > amount, "Cannot be lower than 0");
    //     count = count - amount;
    //     return true;
    // }
}
