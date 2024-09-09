/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {useState} from 'react';
import { Button, Typography } from "antd";
import './index.css'

const FirstInteraction = ({certificateContract, updateStep, stepIndex}) => {
    const [mintedTokenId, setMintedTokenId] = useState(null);
    const [loading, setLoading] = useState(false);

    const mintCertificate = async () => {
        setLoading(true);
        if (certificateContract) {
          try {
            const tx = await certificateContract.mintCertificate();
        
            // Wait for the transaction to be mined
            const receipt = await tx.wait();
    
            // Once the transaction is mined, fetch the latest token ID
            // Assuming _tokenIdCounter is accessible via a public function
            const latestTokenId = await certificateContract.tokenIdCounter();
    
            // Use the tokenId in your application
            console.log(`Certificate minted successfully with token ID ${latestTokenId}`);
            setMintedTokenId(latestTokenId); // Store the token ID
          } catch (error) {
            console.error('Error minting certificate:', error);
          } finally {
            setLoading(false);
          }
        }
      };
    return (
    <div className="goals">
        <Typography.Title>Congratulations, you deserve a certificate!</Typography.Title>
        <Button loading={loading} onClick={mintCertificate} type="primary" style={{height: '50px', width: '160px', marginTop: '25px', marginBottom: '25px'}}>
            Get certificate
        </Button>
        <Typography.Text className="slide-content">
            {mintedTokenId && `You have successfully minted a certificate with token ID ${mintedTokenId}.`}
        </Typography.Text>
        <div className='goals-footer'>
            <Button className="goals-button" onClick={() => updateStep(stepIndex - 1)} type='primary'>Back</Button>
            <Button className="goals-button" onClick={() => updateStep(stepIndex + 1)} type='primary'>Next</Button>
        </div>
    </div>
    )
}

export default FirstInteraction;