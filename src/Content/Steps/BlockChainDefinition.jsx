/* eslint-disable react/prop-types */
import { Button, Typography } from "antd";
import './index.css'

const BlockChainDefinition = ({updateStep, stepIndex}) => {
    return (
    <div className="goals">
        <Typography.Title>So, what is a Blockchain?</Typography.Title>
        <Typography.Text className="slide-content">A blockchain is “a distributed database that maintains a continuously growing list of ordered records, called blocks.” These blocks “are linked using cryptography. Each block contains a cryptographic hash of the previous block, a timestamp, and transaction data.</Typography.Text>
        <div className='goals-footer'>
            <Button className="goals-button" onClick={() => updateStep(stepIndex - 1)} type='primary'>Back</Button>
            <Button className="goals-button" onClick={() => updateStep(stepIndex + 1)} type='primary'>Next</Button>
        </div>
    </div>
    )
}

export default BlockChainDefinition;