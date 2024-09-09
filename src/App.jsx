/* eslint-disable no-unused-vars */
import { Button, Layout, Typography } from 'antd';
const { Header, Content } = Layout;
import { ethers } from "ethers";
import WorkshopContent from './Content';
import './App.css'
import { useEffect, useState } from 'react';

const { Link } = Typography;

const headerStyle = {
  color: 'black',
  height: 64,
  // paddingInline: 48,
  backgroundColor: 'white',
  display: 'flex',
  justifyContent: 'space-between',
  padding: 16
};
const layoutStyle = {
  borderRadius: 8,
  overflow: 'scroll',
  width: '100%',
  // height: 'calc(100vh - 64px)',
  height: '100vh',
};

const buttonStyle = {
  heght: 60,
  width: 100,
}



function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [quizContract, setQuizContract] = useState(null);
  const [certificateContract, setCertificateContract] = useState(null)
  const [isConnected, setIsConnected] = useState(false);
  const quizContractAddress = "0xf8e81D47203A594245E36C48e151709F0C19fBe8";
  const certificateContractAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138";

  const quizAbi = [
    "function answerQuestion(uint256 questionIndex, uint256 score) public",
    "function getAllScores() public view returns (uint256[] memory)",
    "function isCompleted() public view returns (bool)"
  ];

  const certificateAbi = [
    "function mintCertificate() external",
    "event CertificateMinted(address indexed user, uint256 tokenId)"  // Correct event definition
  ];

  const sepoliaChainId = '0xaa36a7';

  async function switchToSepolia() {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: sepoliaChainId }],
      });
    } catch (error) {
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: sepoliaChainId,
                chainName: 'Sepolia Testnet',
                rpcUrls: ['https://rpc.sepolia.org'],
                nativeCurrency: {
                  name: 'Sepolia ETH',
                  symbol: 'ETH',
                  decimals: 18,
                },
                blockExplorerUrls: ['https://sepolia.etherscan.io'],
              },
            ],
          });
        } catch (addError) {
          console.error("Error adding Sepolia network:", addError);
        }
      } else {
        console.error("Failed to switch network:", error);
      }
    }
  }
  async function initializeEthers() {
    if (typeof window.ethereum !== 'undefined') {
      // MetaMask or another wallet is installed
      try {
         // Switch to Sepolia network
         await switchToSepolia();
        // Request permission to access the user's accounts
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Create an instance of Web3Provider
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
        const signer = provider.getSigner();
        setSigner(signer);
        const quizContract = new ethers.Contract(quizContractAddress, quizAbi, signer);
        setQuizContract(quizContract);
        const certificateContract = new ethers.Contract(certificateContractAddress, certificateAbi, signer);
        setCertificateContract(certificateContract)
        console.log('Ethereum wallet connected');
        setIsConnected(true);
        return { provider, signer };
      } catch (error) {
        console.error("User denied account access or an error occurred:", error);
      }
    } else {
      // No wallet found, display an error message or prompt user to install MetaMask
      alert("Please install MetaMask or another Ethereum wallet.");
    }
  }

  useEffect(() => {
    initializeEthers();
  }, [])
  

  return (
    <>
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>
          <Typography.Title level={3} style={{ margin: 0 }}>Blockchain workshop</Typography.Title>
          <Button style={buttonStyle} type='primary'>
            <Link target='_blank' href='https://andersbrownworth.com/blockchain/hash'>Playground</Link>
          </Button>
        </Header>
        <Content>
          <WorkshopContent certificateContract={certificateContract} quizContract={quizContract} />
        </Content>
      </Layout>
    </>
  )
}

export default App
