/* eslint-disable react/prop-types */
import { Button, Typography } from "antd";
import './index.css'

const FirstInteraction = ({updateStep, stepIndex}) => {
    return (
    <div className="goals">
        <Typography.Title>Congratulations, you just interacted with a smart contract!</Typography.Title>
        <div className='goals-footer'>
            <Button className="goals-button" onClick={() => updateStep(stepIndex - 1)} type='primary'>Back</Button>
            <Button className="goals-button" onClick={() => updateStep(stepIndex + 1)} type='primary'>Next</Button>
        </div>
    </div>
    )
}

export default FirstInteraction;