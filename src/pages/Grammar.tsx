import React, { useState } from 'react';
import toast from 'react-hot-toast';

const GRAMMAR_TOPICS = [
  {
    title: 'Parts of Speech',
    content: `
      1. Nouns: Person, place, thing, or idea
      2. Pronouns: Replace nouns (he, she, it)
      3. Verbs: Action or state of being
      4. Adjectives: Describe nouns
      5. Adverbs: Modify verbs, adjectives, other adverbs
      6. Prepositions: Show relationships (in, on, at)
      7. Conjunctions: Connect words or phrases
      8. Interjections: Express emotion!
    `
  },
  {
    title: 'Tenses',
    content: `
      Simple Present: I play
      Present Continuous: I am playing
      Simple Past: I played
      Past Continuous: I was playing
      Present Perfect: I have played
      Future: I will play
    `
  },
  {
    title: 'Sentence Structure',
    content: `
      Basic Pattern: Subject + Verb + Object
      Example: John (S) reads (V) books (O)
      
      Types of Sentences:
      1. Simple: One independent clause
      2. Compound: Two independent clauses
      3. Complex: Independent + dependent clause
      4. Compound-Complex: Multiple clauses
    `
  }
];

const PRACTICE_QUESTIONS = [
  {
    question: "Choose the correct form of the verb: She ___ to the store yesterday.",
    options: ["go", "goes", "went", "gone"],
    correct: 2,
    explanation: "In the past tense, the correct form is 'went'."
  },
  {
    question: "Identify the adjective: The quick brown fox jumps over the lazy dog.",
    options: ["fox", "quick", "jumps", "over"],
    correct: 1,
    explanation: "'Quick' is an adjective describing the fox."
  },
  {
    question: "Select the correct pronoun: ___ gave the book to John.",
    options: ["Me", "I", "Him", "Mines"],
    correct: 1,
    explanation: "'I' is the correct subject pronoun."
  },
  {
    question: "Choose the correct preposition: The cat is ___ the table.",
    options: ["on", "in", "at", "by"],
    correct: 0,
    explanation: "'On' is used for objects resting on surfaces."
  },
  {
    question: "Identify the adverb: She sang beautifully at the concert.",
    options: ["sang", "beautifully", "at", "concert"],
    correct: 1,
    explanation: "'Beautifully' describes how she sang."
  },
  {
    question: "Select the correct conjunction: I like tea ___ coffee.",
    options: ["but", "and", "or", "so"],
    correct: 1,
    explanation: "'And' connects two similar items in a list."
  },
  {
    question: "Choose the correct verb tense: By next week, I ___ the project.",
    options: ["finish", "finished", "will finish", "finishing"],
    correct: 2,
    explanation: "'Will finish' is the future tense."
  },
  {
    question: "Identify the type of sentence: Although it was raining, we went out.",
    options: ["Simple", "Compound", "Complex", "Fragment"],
    correct: 2,
    explanation: "This is a complex sentence with a dependent and independent clause."
  },
  {
    question: "Select the correct plural form: The ___ are flying south.",
    options: ["gooses", "geese", "goose", "geeses"],
    correct: 1,
    explanation: "'Geese' is the irregular plural form of 'goose'."
  },
  {
    question: "Choose the correct possessive form: The ___ bone is in the yard.",
    options: ["dogs", "dog's", "dogs'", "dog"],
    correct: 1,
    explanation: "'Dog's' shows possession for a single dog."
  }
];

export default function Grammar() {
  const [selectedTopic, setSelectedTopic] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswer = (optionIndex: number) => {
    const isCorrect = optionIndex === PRACTICE_QUESTIONS[currentQuestion].correct;
    
    if (isCorrect) {
      setScore(score + 1);
      toast.success('Correct answer!');
    } else {
      toast.error('Wrong answer!');
    }

    setShowExplanation(true);
    
    setTimeout(() => {
      setShowExplanation(false);
      if (currentQuestion < PRACTICE_QUESTIONS.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setQuizCompleted(true);
      }
    }, 2000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setQuizCompleted(false);
    setShowQuiz(false);
    setShowExplanation(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Grammar Learning</h1>

        {!showQuiz ? (
          <>
            <div className="mb-8">
              <div className="flex space-x-4 mb-4 overflow-x-auto pb-2">
                {GRAMMAR_TOPICS.map((topic, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedTopic(index)}
                    className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                      selectedTopic === index
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  >
                    {topic.title}
                  </button>
                ))}
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-4">
                  {GRAMMAR_TOPICS[selectedTopic].title}
                </h2>
                <pre className="whitespace-pre-wrap font-sans text-gray-700">
                  {GRAMMAR_TOPICS[selectedTopic].content}
                </pre>
              </div>
            </div>

            <button
              onClick={() => setShowQuiz(true)}
              className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Take Practice Quiz
            </button>
          </>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-6">
            {!quizCompleted ? (
              <>
                <div className="mb-4 flex justify-between items-center">
                  <h2 className="text-xl font-bold">
                    Question {currentQuestion + 1} of {PRACTICE_QUESTIONS.length}
                  </h2>
                  <span className="text-blue-600">Score: {score}</span>
                </div>
                <p className="mb-4 text-lg">{PRACTICE_QUESTIONS[currentQuestion].question}</p>
                <div className="space-y-2">
                  {PRACTICE_QUESTIONS[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      disabled={showExplanation}
                      className="w-full p-3 text-left border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50"
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {showExplanation && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <p className="text-blue-800">
                      {PRACTICE_QUESTIONS[currentQuestion].explanation}
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
                <p className="text-lg mb-2">
                  Your score: {score} out of {PRACTICE_QUESTIONS.length}
                </p>
                <p className="mb-4 text-gray-600">
                  {score === PRACTICE_QUESTIONS.length
                    ? 'Perfect score! Excellent work! 🎉'
                    : score >= PRACTICE_QUESTIONS.length * 0.7
                    ? 'Great job! Keep practicing! 👏'
                    : 'Keep learning and try again! 💪'}
                </p>
                <button
                  onClick={resetQuiz}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}