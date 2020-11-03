pragma solidity ^0.4.2;

contract DappToken {
    //Name
    string public name = "DApp Token";

    //Symbol
    string public symbol = "DAPP";

    //Standard
    string public standard = "DApp Token v1.0";

    //Set number of tokens
    uint256 public totalSupply; 

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    // approve
    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    mapping(address => uint256) public balanceOf;
    // allowance 
    mapping(address => mapping(address => uint256)) public allowance;

    //Constructor    
    constructor(uint256 _initialSupply) public {
        //function DappToken() public {
        balanceOf[msg.sender] = _initialSupply;
        totalSupply = _initialSupply;   
    }

    // Transfer
    function transfer(address _to, uint256 _value) public returns(bool success){
        // Exception if sender's account doens't have enough tokens in their balance
        require(balanceOf[msg.sender] >= _value);
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;       

        // Transfer Event 
        emit Transfer(msg.sender, _to, _value);

        // Return boolean
        return true;
    }

    // approve
    function approve(address _spender, uint256 _value) public returns (bool success) {
        // allowance
        allowance[msg.sender][_spender] = _value;

        // approve event
        emit Approval(msg.sender, _spender, _value);

        return true;
    }

    // transfer from
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        // require _from the have enough tokens 
        require(_value <= balanceOf[_from]);
        // require allowance is large enough
        require(_value <= allowance[_from][msg.sender]);
        // change the balance 
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        // update the allowance
        allowance[_from][msg.sender] -= _value;
        // transfer event
        emit Transfer(_from, _to, _value);
        // returns a boolean
        return true;
    }

}