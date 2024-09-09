/* eslint-disable react/prop-types */
import { Button, Typography } from "antd";
import './index.css'

const NFT = ({updateStep, stepIndex}) => {
    return (
    <div className="goals">
        <Typography.Title>Congratulations, you just minted an NFT! (Normalement)</Typography.Title>
        <Typography.Text className="slide-content">NFTs (Non-Fungible Tokens) are unique digital assets stored on a blockchain. Unlike cryptocurrencies such as Bitcoin or Ethereum, which are fungible (meaning every coin is the same and can be exchanged 1:1), NFTs are unique and cannot be exchanged on a like-for-like basis.</Typography.Text>
        <Typography.Text className="slide-content">NFTs give creators and buyers the ability to prove ownership and authenticity of unique digital items in a transparent and secure way, using blockchain technology.</Typography.Text>
        <div className='goals-footer'>
            <Button className="goals-button" onClick={() => updateStep(stepIndex - 1)} type='primary'>Back</Button>
            <Button className="goals-button" onClick={() => updateStep(stepIndex + 1)} type='primary'>Next</Button>
        </div>
    </div>
    )
}

export default NFT;