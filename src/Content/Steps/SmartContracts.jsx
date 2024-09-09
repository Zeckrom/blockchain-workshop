/* eslint-disable react/prop-types */
import { Button, Typography } from "antd";
import './index.css'

const SmartContracts = ({updateStep, stepIndex}) => {
    return (
    <div className="goals">
        <Typography.Title>what is a Smart Contract?</Typography.Title>
        <Typography.Text className="slide-content">A smart contract is a digital agreement that automatically enforces and executes the terms of a contract when certain conditions are met. Think of it as a self-running program that lives on the blockchain. Once it’s set up, it operates without the need for human intervention, ensuring that all parties follow the agreed-upon rules.</Typography.Text>
        <div className='goals-footer'>
            <Button className="goals-button" onClick={() => updateStep(stepIndex - 1)} type='primary'>Back</Button>
            <Button className="goals-button" onClick={() => updateStep(stepIndex + 1)} type='primary'>Next</Button>
        </div>
    </div>
    )
}

export default SmartContracts;