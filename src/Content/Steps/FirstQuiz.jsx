/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Button } from 'antd';

const quizQuestions = [
    {
        question: "What is a Hash?",
        options: [
            { option: "A", text: "A random string of characters used to identify blocks." },
            { option: "B", text: "A function that converts input data into a fixed-length output string." },
            { option: "C", text: "A method used to encrypt transactions on the blockchain." },
            { option: "D", text: "A unique number associated with each miner." }
        ],
        correctAnswer: "B",
        explanation: "A hash is the result of a cryptographic hash function that takes input data and produces a fixed-length output. In blockchain, hashes ensure the integrity of block data."
    },
    {
        question: "What is a Nonce in Blockchain?",
        options: [
            { option: "A", text: "The number of transactions in a block." },
            { option: "B", text: "The number used once to find a valid hash in Proof of Work." },
            { option: "C", text: "The hash of the previous block in the blockchain." },
            { option: "D", text: "The timestamp of the block creation." }
        ],
        correctAnswer: "B",
        explanation: "A nonce (number used once) is a value that miners increment to find a valid hash that satisfies the blockchain's difficulty target during mining."
    },
    {
        question: "What Does Blockchain Difficulty Represent?",
        options: [
            { option: "A", text: "The amount of time it takes to mine a block." },
            { option: "B", text: "The maximum number of blocks that can be mined per second." },
            { option: "C", text: "A measure of how hard it is to find a hash below the target." },
            { option: "D", text: "The total number of blocks in the blockchain." }
        ],
        correctAnswer: "C",
        explanation: "Difficulty in blockchain refers to how challenging it is to find a hash that meets the network’s target. A higher difficulty means more computation is needed to find a valid block hash."
    },
    {
        question: "What is the Main Function of a Block in Blockchain?",
        options: [
            { option: "A", text: "To store data and ensure it's permanently available." },
            { option: "B", text: "To link miners to the blockchain network." },
            { option: "C", text: "To validate all previous transactions in the blockchain." },
            { option: "D", text: "To store transaction data and link it to the previous block." }
        ],
        correctAnswer: "D",
        explanation: "A block stores transaction data and the hash of the previous block, creating a chain of blocks. This structure ensures the integrity and immutability of the blockchain."
    },
    {
        question: "How Does Mining Relate to Hashes, Nonces, and Difficulty?",
        options: [
            { option: "A", text: "Mining involves finding a hash that meets the difficulty target by adjusting the nonce." },
            { option: "B", text: "Mining involves storing hashes and updating difficulty levels." },
            { option: "C", text: "Mining calculates the timestamp of each block." },
            { option: "D", text: "Mining changes the hash of previous blocks to meet difficulty." }
        ],
        correctAnswer: "A",
        explanation: "In mining, a miner tries to find a hash that is lower than a target set by the network’s difficulty. The miner adjusts the nonce until a valid hash is found."
    },
    {
        question: "What Happens If You Change a Transaction in a Block After It's Added to the Blockchain?",
        options: [
            { option: "A", text: "The transaction can be modified and the block is unchanged." },
            { option: "B", text: "The block’s hash changes, and the change propagates through subsequent blocks." },
            { option: "C", text: "Nothing happens since the transaction is already on the blockchain." },
            { option: "D", text: "The nonce of the block is adjusted to keep the hash the same." }
        ],
        correctAnswer: "B",
        explanation: "If you change a transaction in a block, the block’s hash changes, and this invalidates all subsequent blocks because they store the hash of the previous block. The blockchain’s immutability prevents tampering."
    },
    {
        question: "How Does a Block's Hash Ensure Blockchain Security?",
        options: [
            { option: "A", text: "By creating a unique identifier that can’t be altered without changing the entire blockchain." },
            { option: "B", text: "By ensuring that blocks are mined at regular intervals." },
            { option: "C", text: "By storing the miner’s ID." },
            { option: "D", text: "By increasing the difficulty of the mining process." }
        ],
        correctAnswer: "A",
        explanation: "A block’s hash acts as a digital fingerprint for the block’s contents. If the data in the block is altered, the hash changes, making the block invalid without recalculating the hash for all subsequent blocks."
    }
];

const Quiz = ({ quizContract, updateStep, stepIndex }) => {
    const [answers, setAnswers] = useState(new Array(quizQuestions.length).fill(null));
    const [totalScore, setTotalScore] = useState(null);
    const [loading, setLoading] = useState(false);
    const [finished, setFinished] = useState(false);

    const handleOptionChange = (index, option) => {
        const newAnswers = [...answers];
        newAnswers[index] = option;
        setAnswers(newAnswers);
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            // Compute the score locally
            let score = 0;
            quizQuestions.forEach((question, index) => {
                if (answers[index] === question.correctAnswer) {
                    score += 1;
                }
            });

            // Calculate final score as a percentage
            const totalQuestions = quizQuestions.length;
            const finalScore = score / totalQuestions; // This is between 0 and 1

            // Convert finalScore to a whole number (e.g., 1 or 0)
            const quizScore = finalScore * 100; // Convert to percentage if needed

            console.log("Final Score Percentage:", quizScore);

            // Assuming quizContract is initialized and connected
            if (quizContract) {
                // Send the computed score to the contract
                await quizContract.answerQuestion(1, Number(quizScore.toFixed(0)));
                console.log("Score submitted to contract.");
            }

            // Update local state with the total score
            setTotalScore(finalScore);
        } catch (error) {
            console.error("Error submitting score:", error);
        } finally {
            setLoading(false);
            setFinished(true);
        }
    };

    return (
        <div className='goals'>
            <h1>Time for a Quiz!</h1>
            {quizQuestions.map((question, index) => (
                <div key={index} className="question">
                    <h3>{question.question}</h3>
                    {question.options.map((option) => (
                        <div key={option.option}>
                            <input
                                type="radio"
                                id={`q${index}o${option.option}`}
                                name={`q${index}`}
                                value={option.option}
                                checked={answers[index] === option.option}
                                onChange={() => handleOptionChange(index, option.option)}
                            />
                            <label htmlFor={`q${index}o${option.option}`}>{option.text}</label>
                        </div>
                    ))}
                </div>
            ))}
            <Button style={{marginTop: '15px', height: '50px'}} className="goals-button" type='primary' onClick={handleSubmit} disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Quiz'}
            </Button>
            {totalScore !== null && (
                <div>
                    <h2>Your Total Score: {(totalScore * 100).toFixed(0)}%</h2>
                </div>
            )}
            <div className='goals-footer'>
                {
                    finished && (
                        <div className='goals-footer'>
                            <Button className="goals-button" onClick={() => updateStep(stepIndex - 1)} type='primary'>Back</Button>
                            <Button className="goals-button" onClick={() => updateStep(stepIndex + 1)} type='primary'>Next</Button>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Quiz;