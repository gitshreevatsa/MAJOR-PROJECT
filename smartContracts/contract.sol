// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MyToken is ERC721, ERC721URIStorage, ERC721Burnable, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    event minted(address to, uint256 tokenId, string uri);
    mapping(address => uint256[]) public _ownedTokens;
    mapping(uint256 => string) public _tokenURIs;
    mapping(uint256 => string) public _fileNames; // New mapping to store file names


    constructor() ERC721("MyToken", "MTK") Ownable(msg.sender) {
    }

    function safeMint(address to, string memory fileName, string memory uri) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        _ownedTokens[to].push(tokenId);
        _tokenURIs[tokenId] = uri;
        _fileNames[tokenId] = fileName; // Store the file name
        emit minted(to, tokenId, uri);
    }

    // Function to get all token IDs owned by a given address
    function getTokenIDsByOwner(address owner) public view returns (uint256[] memory) {
        return _ownedTokens[owner];
    }

        // Function to retrieve the file name based on token ID
    function getFileName(uint256 tokenId) public view returns (string memory) {
        return _fileNames[tokenId];
    }

        function getTokenURI(uint256 tokenId) public view returns (string memory) {
        return _tokenURIs[tokenId];
    }

    // The following functions are overrides required by Solidity.

    // function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
    //     super._burn(tokenId);
    // }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}