// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract MyToken is ERC721, Ownable, ReentrancyGuard {
    uint256 private _currentTokenId = 0;

    constructor(address initialOwner)
        ERC721("NFToken", "NFTKN")
        Ownable(initialOwner)
    {}

    event NFTMinted(address to, uint256 tokenId, uint256 timestamp);

    function safeMint(address to) public onlyOwner nonReentrant {
        uint256 newTokenId = _currentTokenId + 1;
        _safeMint(to, newTokenId);

        emit NFTMinted(to, newTokenId, block.timestamp);
        _currentTokenId = newTokenId;
    }
}