/* eslint-disable react/prop-types */
import { Button, Typography } from "antd";
import './index.css'

const NFT = ({updateStep, stepIndex}) => {
    return (
    <div className="goals">
        <Typography.Title>Thank you for your attention</Typography.Title>
        <div className='goals-footer'>
            <Button className="goals-button" onClick={() => updateStep(stepIndex - 1)} type='primary'>Back</Button>
            <Button disabled className="goals-button" onClick={() => updateStep(stepIndex + 1)} type='primary'>Next</Button>
        </div>
    </div>
    )
}

export default NFT;