/* eslint-disable react/prop-types */
import { Button, Typography } from "antd";
import './index.css'

const BlockChainIntro = ({updateStep, stepIndex}) => {
    return (
    <div className="goals">
        <Typography.Title>What is Blockchain?</Typography.Title>
        <Typography.Text className="slide-content">Blockchain is a distributed ledger technology. It’s a system where multiple participants (nodes) maintain a copy of a shared ledger. Think of it as a digital notebook that everyone can read and write to, but once something is written, it can’t be altered easily.</Typography.Text>
        <div className='goals-footer'>
            <Button className="goals-button" onClick={() => updateStep(stepIndex - 1)} type='primary'>Back</Button>
            <Button className="goals-button" onClick={() => updateStep(stepIndex + 1)} type='primary'>Next</Button>
        </div>
    </div>
    )
}

export default BlockChainIntro;