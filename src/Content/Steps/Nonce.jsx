/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { Button, Typography } from "antd";
import './index.css'

const Nonce = ({updateStep, stepIndex}) => {
    return (
    <div className="goals">
        <Typography.Title>What is a Nonce?</Typography.Title>
        <Typography.Text className="slide-content">A nonce, in blockchain terms, is a number used once. Regarding its use on a blockchain, it is a number that increases sequentially in every attempt to generate a hash that meets the network's difficulty criteria.</Typography.Text>
        <div className='goals-footer'>
            <Button className="goals-button" onClick={() => updateStep(stepIndex - 1)} type='primary'>Back</Button>
            <Button className="goals-button" onClick={() => updateStep(stepIndex + 1)} type='primary'>Next</Button>
        </div>
    </div>
    )
}

export default Nonce;