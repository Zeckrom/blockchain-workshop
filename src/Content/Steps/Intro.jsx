/* eslint-disable react/prop-types */
import { Button, Typography } from "antd";
import './index.css'

const Intro = ({updateStep, stepIndex}) => {
    return (
        <div className="intro">
            <Typography.Title>Welcome to Blockchain 101</Typography.Title>
            <Typography.Text className="slide-content" size={50}>Welcome, everyone! Today, we'll explore the exciting world of blockchain. By the end of this workshop, you'll understand the core concepts behind blockchain and have hands-on experience with a live smart contract.</Typography.Text>
            <div className='intro-footer'>
                <Button className="intro-button" onClick={() => updateStep(stepIndex + 1)} type='primary'>Next</Button>
            </div>
        </div>
    );
}

export default Intro;