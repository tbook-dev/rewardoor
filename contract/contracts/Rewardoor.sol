// contracts/ERC1155Token.sol

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

contract Rewardoor is ERC1155Supply, Ownable {
    uint[] public ids; //uint array of ids
    string public baseMetadataURI; //the token metadata URI
    string public name = "Rewardoor"; //the token mame
    uint public mintFee = 0 wei; //mintfee, 0 by default. only used in mint function, not batch.
    mapping(uint => bool) private minted;
    
    mapping(uint => uint) public twitIdToId; //name to id mapping
    mapping(uint => uint) public idToTwitId; //id to name mapping
    uint private nextId = 1;

    /*
    constructor is executed when the factory contract calls its own deployERC1155 method
    */
    constructor(string memory _uri, string memory _baseUrl) ERC1155(_uri) {
        setURI(_uri);
        baseMetadataURI = _baseUrl;
        //name = _contractName;
        //transferOwnership(tx.origin);
    }

    modifier notMinted(uint _twitId) {
        require(!minted[_twitId], "already minted");
        _;
    }

    function addMapping(uint _twitId, uint _supply) public notMinted(_twitId) onlyOwner returns (uint) {
        ids.push(_twitId);
        _mint(msg.sender, nextId, _supply, "");
        minted[_twitId] = true;
        twitIdToId[_twitId] = nextId;
        idToTwitId[nextId] = _twitId;
        nextId = nextId + 1;
        return nextId - 1;
    }

    /*
    creates a mapping of strings to ids (i.e ["one","two"], [1,2] - "one" maps to 1, vice versa.)
    */
    function createMapping() private {
    }

    function currentId() public view returns (uint) {
        return nextId;
    }

    /*
    sets our URI and makes the ERC1155 OpenSea compatible
    */
    function uri(uint256 _tokenid) override public view returns (string memory) {
        return string(
            abi.encodePacked(
                baseMetadataURI,
                Strings.toString(_tokenid),".json"
            )
        );
    }

    /*
    used to change metadata, only owner access
    */
    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function setBaseURI(string memory newuri) public onlyOwner {
        baseMetadataURI = newuri;
    }

    /*
    set a mint fee. only used for mint, not batch.
    */
    function setFee(uint _fee) public onlyOwner {
        mintFee = _fee;
    }

    function airDropBatchTo(address to, uint id, uint amount) public onlyOwner {
        safeTransferFrom(msg.sender, to, id, amount, "");
    }

    /*
    mint(address account, uint _id, uint256 amount)

    account - address to mint the token to
    _id - the ID being minted
    amount - amount of tokens to mint
    
    function mint(address account, uint _id, uint256 amount) 
        public payable returns (uint)
    {
        require(msg.value == mintFee);
        _mint(account, _id, amount, "");
        return _id;
    }
    */

    /*
    mintBatch(address to, uint256[] memory _ids, uint256[] memory amounts, bytes memory data)

    to - address to mint the token to
    _ids - the IDs being minted
    amounts - amount of tokens to mint given ID
    bytes - additional field to pass data to function
    function mintBatch(address to, uint256[] memory _ids, uint256[] memory amounts, bytes memory data)
        public
    {
        _mintBatch(to, _ids, amounts, data);
    }
    */
}