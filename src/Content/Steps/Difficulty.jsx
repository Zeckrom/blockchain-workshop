/* eslint-disable react/prop-types */
import { Button, Typography } from "antd";
import './index.css'

const Difficulty = ({updateStep, stepIndex}) => {
    return (
    <div className="goals">
        <Typography.Title>What is Difficulty in a Blockchain?</Typography.Title>
        <Typography.Text className="slide-content">Cryptocurrency difficulty is a measure of how difficult it is to mine a block in a proof-of-work blockchain. A high cryptocurrency difficulty means it takes additional computing power to verify transactions entered on a blockchain—a process called mining.</Typography.Text>
        <div className='goals-footer'>
            <Button className="goals-button" onClick={() => updateStep(stepIndex - 1)} type='primary'>Back</Button>
            <Button className="goals-button" onClick={() => updateStep(stepIndex + 1)} type='primary'>Next</Button>
        </div>
    </div>
    )
}

export default Difficulty;