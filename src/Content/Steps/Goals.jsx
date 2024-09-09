/* eslint-disable react/prop-types */
import { Button, Typography } from "antd";
import './index.css'

const Goals = ({updateStep, stepIndex}) => {
    return (
    <div className="goals">
        <Typography.Title>Workshop Goals</Typography.Title>
        <Typography.Text className="slide-content">Our goals are to introduce you to blockchain technology, walk you through how transactions and blocks work, and interact with a blockchain testnet.</Typography.Text>
        <div className='goals-footer'>
            <Button className="goals-button" onClick={() => updateStep(stepIndex - 1)} type='primary'>Back</Button>
            <Button className="goals-button" onClick={() => updateStep(stepIndex + 1)} type='primary'>Next</Button>
        </div>
    </div>
    )
}

export default Goals;