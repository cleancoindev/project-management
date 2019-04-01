pragma solidity ^0.5.0;

// import "openzeppelin-eth/contracts/ownership/Ownable.sol";
import "zos-lib/contracts/Initializable.sol";

contract Propose is Initializable {

    struct Proposal {
        // uint256 proposerId;
        string proposerName;      // name of person who propose
        address proposerAddress;  // address of person who propose
        //string content;   // content of proposal
    }
    //mapping (address => Proposal) proposal;  // e.g) proposal[addres].name
    Proposal[] public proposals;  // e.g) proposal[index].name



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
    function createProposal(
        // uint256 _proposerId,
        string memory _proposerName,
        address _proposerAddress
        //string memory _content
    ) public returns (string memory, address) 
    {
        Proposal memory proposal = Proposal({
            // proposerId: _proposerId,
            proposerName: _proposerName,
            proposerAddress: _proposerAddress
            //content: _content
        });

        proposals.push(proposal);

        // Proposal storage proposal = proposals[_proposerId];
        // proposal.proposerId = _proposerId;
        // proposal.proposerAddress = _proposerAddress;
        // proposal.name = _name;
        // proposal.content = _content;

        //emit CreateProposal(_proposerId, _proposerAddress, _name, _content);

        return (_proposerName, _proposerAddress);
    }


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
