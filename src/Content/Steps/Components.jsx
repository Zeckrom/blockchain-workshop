/* eslint-disable react/prop-types */
import { Button, Typography } from "antd";
import './index.css'

const Components = ({updateStep, stepIndex}) => {
    return (
    <div className="goals">
        <Typography.Title>Key Components of Blockchain</Typography.Title>
        <Typography.Text className="slide-content">
            <ul>
                <li>Hash</li>
                <li>Nonce</li>
                <li>Difficulty</li>
                <li>Blocks</li>
            </ul>
        </Typography.Text>

        <div className='goals-footer'>
            <Button className="goals-button" onClick={() => updateStep(stepIndex - 1)} type='primary'>Back</Button>
            <Button className="goals-button" onClick={() => updateStep(stepIndex + 1)} type='primary'>Next</Button>
        </div>
    </div>
    )
}

export default Components;