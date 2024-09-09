/* eslint-disable react/prop-types */
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

import './index.css'
import { Typography, Button } from 'antd';

const QuizSmartContractOverview = ({ updateStep, stepIndex }) => {
    const contractCode = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract QuizContract {
    // Struct to store the user's progress and scores
    struct User {
        uint256[] scores;  // Array that holds the user's score for each question
        bool completed;    // Flag to mark if the user has completed all questions
    }

    // Mapping from user address to their User struct
    mapping(address => User) public users;

    // Total number of questions in the quiz
    uint256 public totalQuestions;

    // Events to log when a question is answered and when the quiz is completed
    event QuestionAnswered(address indexed user, uint256 questionIndex, uint256 score);
    event QuizCompleted(address indexed user);

    // Constructor to set the total number of questions when the contract is deployed
    constructor(uint256 _totalQuestions) {
        totalQuestions = _totalQuestions; // Set the number of questions in the quiz
    }

    // Function to submit the score for a question
    function answerQuestion(uint256 questionIndex, uint256 score) public {
        // Ensure the question index is valid (0 <= questionIndex < totalQuestions)
        require(questionIndex < totalQuestions, "Invalid question index.");
        
        // Ensure the user hasn't already completed the quiz
        require(!users[msg.sender].completed, "Quiz already completed.");

        // Check if the user has already answered this question. If not, extend their scores array.
        if (users[msg.sender].scores.length <= questionIndex) {
            // Add a new score for the question
            users[msg.sender].scores.push(score);
        } else {
            // If already answered, update the existing score
            users[msg.sender].scores[questionIndex] = score;
        }

        // Emit event that the question has been answered
        emit QuestionAnswered(msg.sender, questionIndex, score);

        // Check if the user has answered all questions. If yes, mark the quiz as completed.
        if (users[msg.sender].scores.length == totalQuestions) {
            users[msg.sender].completed = true;
            emit QuizCompleted(msg.sender); // Emit event that the quiz is completed
        }
    }

    // Function to retrieve the user's score for a specific question
    function getScore(uint256 questionIndex) public view returns (uint256) {
        require(questionIndex < totalQuestions, "Invalid question index.");
        return users[msg.sender].scores[questionIndex];  // Return the score for the specific question
    }

    // Function to retrieve all of the user's scores for the quiz
    function getAllScores() public view returns (uint256[] memory) {
        return users[msg.sender].scores;  // Return the entire array of scores
    }

    // Function to check if the user has completed the quiz
    function isCompleted() public view returns (bool) {
        return users[msg.sender].completed;  // Return the completion status
    }
}
`;
return (
    <div className='code-card'>
      <Typography.Title>Smart Contract Code overview</Typography.Title>
      <SyntaxHighlighter language="solidity" style={solarizedlight}>
        {contractCode}
      </SyntaxHighlighter>
      <div className='goals-footer'>
            <Button className="goals-button" onClick={() => updateStep(stepIndex - 1)} type='primary'>Back</Button>
            <Button className="goals-button" onClick={() => updateStep(stepIndex + 1)} type='primary'>Next</Button>
        </div>
    </div>
  );
}

export default QuizSmartContractOverview;