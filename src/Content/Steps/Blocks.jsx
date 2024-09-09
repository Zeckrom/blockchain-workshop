/* eslint-disable react/prop-types */
import { Button, Typography } from "antd";
import './index.css'

const Blocks = ({updateStep, stepIndex}) => {
    return (
    <div className="goals">
        <Typography.Title>What are Blocks?</Typography.Title>
        <Typography.Text className="slide-content">Blocks are files stored by a blockchain, where transaction data are permanently recorded. A block records some or all of the most recent transactions not yet validated by the network. Once the data are validated, the block is closed. Then, a new block is created for new transactions to be entered into and validated.</Typography.Text>
        <div className='goals-footer'>
            <Button className="goals-button" onClick={() => updateStep(stepIndex - 1)} type='primary'>Back</Button>
            <Button className="goals-button" onClick={() => updateStep(stepIndex + 1)} type='primary'>Next</Button>
        </div>
    </div>
    )
}

export default Blocks;