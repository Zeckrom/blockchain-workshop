/* eslint-disable react/prop-types */
// SmartContractQuiz.jsx
import { useState } from 'react';
import { Button } from 'antd';
import './index.css';

// Quiz data
const smartContractQuizQuestions = [
    {
      question: "What is a smart contract?",
      options: [
        { option: "A", text: "A program that executes automatically when conditions are met." },
        { option: "B", text: "A type of cryptocurrency used for transactions." },
        { option: "C", text: "A ledger system used for tracking digital assets." },
        { option: "D", text: "A manual agreement between parties." }
      ],
      correctAnswer: "A",
      explanation: "A smart contract is a self-executing contract with the terms of the agreement directly written into code. It runs on a blockchain and automatically executes actions when predefined conditions are met."
    },
    {
      question: "What language is primarily used to write smart contracts on Ethereum?",
      options: [
        { option: "A", text: "JavaScript" },
        { option: "B", text: "Python" },
        { option: "C", text: "Solidity" },
        { option: "D", text: "Rust" }
      ],
      correctAnswer: "C",
      explanation: "Solidity is the most commonly used language for writing smart contracts on the Ethereum blockchain. It is specifically designed for creating smart contracts that run on the Ethereum Virtual Machine (EVM)."
    },
    {
      question: "What is the purpose of a smart contract's 'fallback' function?",
      options: [
        { option: "A", text: "To handle Ether sent to the contract without data." },
        { option: "B", text: "To store the contract's state variables." },
        { option: "C", text: "To update the contract's code." },
        { option: "D", text: "To log events for external applications." }
      ],
      correctAnswer: "A",
      explanation: "The fallback function in a smart contract is used to handle incoming Ether transactions that do not match any other function signature. It can also be used to handle calls to the contract when the data sent does not match any existing function."
    }
  ];

const SmartContractQuiz = ({ quizContract, updateStep, stepIndex }) => {
  const [answers, setAnswers] = useState({});
  const [totalScore, setTotalScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);
  const totalQuestions = smartContractQuizQuestions.length;

  const handleOptionChange = (questionIndex, selectedOption) => {
    setAnswers(prevAnswers => ({ ...prevAnswers, [questionIndex]: selectedOption }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    let score = 0;
    
    smartContractQuizQuestions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        score += 1;
      }
    });
    
    const quizScore = score / totalQuestions; // Score as a percentage

    // Update the score in the smart contract
    if (quizContract) {
      try {
        await quizContract.answerQuestion(2, Number(quizScore.toFixed(0))); // Example questionIndex = 1
        console.log('Score submitted to the smart contract');
      } catch (error) {
        console.error('Error submitting score to the smart contract:', error);
      } finally {
        setLoading(false);
        setFinished(true);
      }
    }

    setTotalScore(score);
  };

  return (
    <div className='goals'>
      <h2>Smart Contract Quiz</h2>
      {smartContractQuizQuestions.map((question, index) => (
        <div key={index}>
          <h3>{question.question}</h3>
          {question.options.map(option => (
            <div key={option.option}>
              <label>
                <input
                  type="radio"
                  name={`question${index}`}
                  value={option.option}
                  checked={answers[index] === option.option}
                  onChange={() => handleOptionChange(index, option.option)}
                />
                {option.text}
              </label>
            </div>
          ))}
        </div>
      ))}
      <Button style={{marginTop: '15px', height: '50px'}} loading={loading} type='primary' onClick={handleSubmit}>Submit Quiz</Button>
      {totalScore > 0 && <div>Your score: {totalScore} / {totalQuestions}</div>}
                {
                    finished && (
                        <div className='goals-footer'>
                            <Button className="goals-button" onClick={() => updateStep(stepIndex - 1)} type='primary'>Back</Button>
                            <Button className="goals-button" onClick={() => updateStep(stepIndex + 1)} type='primary'>Next</Button>
                        </div>
                    )
                }
            </div>
  );
};

export default SmartContractQuiz;