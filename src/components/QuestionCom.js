import React, { useState, useEffect } from 'react';

export default function Questions() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    async function loadQuestions() {
      try {
        const response = await fetch('/api/get-questions');
        if (!response.ok) {
          throw new Error('Failed to fetch questions');
        }
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error('Error loading questions:', error);
      }
    }
    loadQuestions();
  }, []);

  const handleAnswerChange = (e) => {
    setAnswers({ ...answers, [questions[currentQuestionIndex].id]: e.target.value });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      saveAnswers();
    }
  };

  const saveAnswers = async () => {
    try {
      const response = await fetch('/api/save-answers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(answers),
      });
      if (response.ok) {
        alert('Answers saved successfully!');
      } else {
        throw new Error('Failed to save answers');
      }
    } catch (error) {
      console.error('Error saving answers:', error);
      alert('Failed to save answers. Please try again.');
    }
  };

  if (questions.length === 0) return <div>Loading questions...</div>;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      <h1>Questionnaire</h1>
      <p>{currentQuestion.text}</p>
      <input
        type="text"
        value={answers[currentQuestion.id] || ''}
        onChange={handleAnswerChange}
      />
      <button onClick={handleNext}>
        {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Submit'}
      </button>
    </div>
  );
}