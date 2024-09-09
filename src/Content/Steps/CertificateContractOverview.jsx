/* eslint-disable react/prop-types */
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

import './index.css'
import { Typography, Button } from 'antd';

const CertificateSmartContractOverview = ({ updateStep, stepIndex }) => {
    const contractCode = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

// Interface to interact with the QuizContract
interface IQuizContract {
    function isCompleted() external view returns (bool);
}

contract CertificateNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    // Mapping from token ID to user address
    mapping(uint256 => address) public tokenIdToUser;

    // Reference to the QuizContract
    IQuizContract public quizContract;

    // Constructor to initialize ERC721 and set the QuizContract address
    constructor(address _quizContractAddress) 
        ERC721("CertificateNFT", "CNFT")
        Ownable(0x3e9AD9F7e4b226e229C86e1b51eC7ef9501FB6d4)  // This will automatically set the deployer as the initial owner
    {
        quizContract = IQuizContract(_quizContractAddress);
    }

    // Function to mint a certificate
    function mintCertificate() external {
        require(quizContract.isCompleted(), "Quiz not completed.");

        uint256 tokenId = _tokenIdCounter.current();
        _mint(msg.sender, tokenId);
        tokenIdToUser[tokenId] = msg.sender;
        _tokenIdCounter.increment();
    }

    // Override _baseURI to point to your IPFS metadata
    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://<ipfs-hash>/"; // Point to your IPFS metadata location
    }
}
`;
return (
    <div className='code-card'>
      <Typography.Title>Certificate Smart Contract Code overview</Typography.Title>
      <SyntaxHighlighter language="solidity" style={solarizedlight}>
        {contractCode}
      </SyntaxHighlighter>
      <div className='goals-footer'>
            <Button className="goals-button" onClick={() => updateStep(stepIndex - 1)} type='primary'>Back</Button>
            <Button className="goals-button" onClick={() => updateStep(stepIndex + 1)} type='primary'>Next</Button>
        </div>
    </div>
  );
}

export default CertificateSmartContractOverview;