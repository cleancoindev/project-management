pragma solidity ^0.5.0;

import "zos-lib/contracts/Initializable.sol";
//import "openzeppelin-solidity/contracts/math/SafeMath.sol";
//import "openzeppelin-solidity/contracts/ownership/Ownable.sol";


contract Widgets is Initializable {
    //using SafeMath for uint;

    /// Events
    event WidgetAdded();
    event WidgetRemoved();
    event WidgetsReordered();
    event WidgetUpdated();

    /// Struct
    struct Widget {
        string addr;
        bool deleted;
    }

    /// State
    Widget[] public widgets;

    /// ACL
    // bytes32 constant public MODIFIER_ROLE = keccak256("MODIFIER_ROLE");

    //it keeps a count to demonstrate stage changes
    uint private countPropose;
    address private _owner;

    function initialize(uint num) public initializer {
        _owner = msg.sender;
       countPropose = num;
    }


    /**
     * @notice Add a widget's IPFS hash to the registry
     * @param _addr IPFS hash of the widget's data
     */
    function addWidget(string memory _addr) public {
        widgets.push(Widget(_addr, false));
        emit WidgetAdded();
    }

    /**
     * @notice Update a widget's IPFS hash
     * @param _priority Index of the widget
     * @param _addr IPFS hash of the widget's data
     */
    function updateWidget(uint _priority, string memory _addr) public {
        Widget storage widget = widgets[_priority];
        widget.addr = _addr;
        emit WidgetUpdated();
    }

    /**
     * @notice Remove a widget from the registry
     * @param _priority Index of the widget
     */
    function removeWidget(uint _priority) public {
        Widget storage widget = widgets[_priority];
        widget.addr = "";
        widget.deleted = true;
        emit WidgetRemoved();
    }

    /**
     * @notice Swap Two widgets
     * @param _priority1 index of the first widget to be swapped
     * @param _priority2 index of the second widget to be swapped
     */
    function reorderWidgets(uint _priority1, uint _priority2) public {
        Widget memory temp = widgets[_priority1];
        widgets[_priority1] = widgets[_priority2];
        widgets[_priority2] = temp;
        emit WidgetsReordered();
    }

    /**
     * @notice Get the Length of the widgets array
     * @return  length of widgets array
     */
    function getWidgetsLength() public view returns (uint) {
        return widgets.length;
    }

    /**
     * @notice Get a widget's information
     * @param  _priority index of the widget
     */
    function getWidget(uint _priority) public view returns (string memory addr, bool deleted) {
        Widget storage widget = widgets[_priority];
        addr = widget.addr;
        deleted = widget.deleted;
    }

}
