/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { useState, useEffect } from 'react'
import './index.css'
import Intro from './Steps/Intro'
import Goals from './Steps/Goals'
import BlockChainIntro from './Steps/BlockChainIntro'
import Components from './Steps/Components'
import Hash from './Steps/Hash'
import Nonce from './Steps/Nonce'
import Difficulty from './Steps/Difficulty'
import Blocks from './Steps/Blocks'
import BlockChainDefinition from './Steps/BlockChainDefinition'
import Quiz from './Steps/FirstQuiz'
import FirstInteraction from './Steps/FirstInteraction'
import SmartContracts from './Steps/SmartContracts'
import QuizSmartContractOverview from './Steps/QuizSmartContractOverview'
import SmartContractQuiz from './Steps/SecondQuiz'
import MintCertificate from './Steps/MintCertificate'
import NFT from './Steps/NFT'
import CertificateSmartContractOverview from './Steps/CertificateContractOverview'



const Content = ({quizContract, certificateContract}) => {
    const [step, setStep] = useState(0)

    useEffect(() => {
        const step = localStorage.getItem('step') ? localStorage.getItem('step') : 0

        if (!localStorage.getItem('step')) {
            localStorage.setItem('step', step)
        }

        setStep(Number(step))
    }, [])

    const updateStep = (stepNumber) => {
        localStorage.setItem('step', stepNumber)
        setStep(stepNumber)
    }

    const steps = [
        <Intro updateStep={updateStep} stepIndex={step} />,
        <Goals updateStep={updateStep} stepIndex={step} />,
        <BlockChainIntro updateStep={updateStep} stepIndex={step} />,
        <Components updateStep={updateStep} stepIndex={step} />,
        <Hash updateStep={updateStep} stepIndex={step} />,
        <Nonce updateStep={updateStep} stepIndex={step} />,
        <Difficulty updateStep={updateStep} stepIndex={step} />,
        <Blocks updateStep={updateStep} stepIndex={step} />,
        <BlockChainDefinition updateStep={updateStep} stepIndex={step} />,
        <Quiz updateStep={updateStep} stepIndex={step} quizContract={quizContract}/>,
        <FirstInteraction updateStep={updateStep} stepIndex={step} />,
        <SmartContracts updateStep={updateStep} stepIndex={step} />,
        <QuizSmartContractOverview updateStep={updateStep} stepIndex={step} />,
        <SmartContractQuiz quizContract={quizContract} updateStep={updateStep} stepIndex={step} />,
        <MintCertificate updateStep={updateStep} stepIndex={step} certificateContract={certificateContract} />,
        <NFT updateStep={updateStep} stepIndex={step}/>,
        <CertificateSmartContractOverview updateStep={updateStep} stepIndex={step}  />,
        'Closing',
    ]
    return <div className='content'>{
        steps[step]
        }</div>
}

export default Content