/* eslint-disable react/prop-types */
import { Button, Typography } from "antd";
import './index.css'

const Hash = ({updateStep, stepIndex}) => {
    return (
    <div className="goals">
        <Typography.Title>What is a Hash?</Typography.Title>
        <Typography.Text className="slide-content">A Blockchain hash is a digitized fingerprint of a document or set of data. It is used to verify whether or not that information has been tampered with or changed in any way. A Blockchain hash is generated via a cryptographic function that compares an input block of data with a previously generated hash value.</Typography.Text>
        <div className='goals-footer'>
            <Button className="goals-button" onClick={() => updateStep(stepIndex - 1)} type='primary'>Back</Button>
            <Button className="goals-button" onClick={() => updateStep(stepIndex + 1)} type='primary'>Next</Button>
        </div>
    </div>
    )
}

export default Hash;