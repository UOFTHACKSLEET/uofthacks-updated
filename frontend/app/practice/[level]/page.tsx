'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Shuffle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
  
const questions = [
  {
    id: 1,
    question: "Tell me about a time when you had to work with a difficult team member. How did you handle it?",
    level: "Easy",
    feedback: [
      "Described the specific situation clearly",
      "Explained your approach to resolution",
      "Highlighted communication strategies used",
      "Shared the positive outcome",
      "Demonstrated professional handling of conflict"
    ]
  }
]

interface EvaluationResult {
  score: number;
  feedback: string;
  suggestions: string;
}

interface Question {
  question: string;
  level: string;
  feedback: string[];
}

export default function PracticePage() {
  const [answer, setAnswer] = useState('')
  const [showFeedback, setShowFeedback] = useState(false)
  const [isEvaluating, setIsEvaluating] = useState(false)
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState<Question>(questions[0])
  const [isLoadingWildcard, setIsLoadingWildcard] = useState(false)

  const handleWildcardQuestion = async () => {
    setIsLoadingWildcard(true);
    try {
      const response = await fetch(`/api/wildcard?level=${currentQuestion.level}`);
      if (!response.ok) {
        throw new Error('Failed to fetch wildcard question');
      }
      const wildcardQuestion = await response.json();
      setCurrentQuestion(wildcardQuestion);
      // Reset states for new question
      setAnswer('');
      setShowFeedback(false);
      setEvaluation(null);
      setIsSubmitted(false);
    } catch (error) {
      console.error('Error fetching wildcard question:', error);
    } finally {
      setIsLoadingWildcard(false);
    }
  };
  
  const handleSubmit = async () => {
    if (answer.length < 50) {
      console.warn("Answer too short - Please write at least 50 characters");
      return;
    }
    
    setIsEvaluating(true);
    try {
      const response = await fetch('/api/evaluate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          answer,
          question: currentQuestion.question,
          feedback: currentQuestion.feedback,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit answer');
      }

      const result = await response.json();
      setEvaluation(result);
      setShowFeedback(true);
      setIsSubmitted(true);
      console.log("Answer submitted successfully");
    } catch (error) {
      console.error('Error evaluating answer:', error);
    } finally {
      setIsEvaluating(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Link 
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <Card className="bg-white shadow-sm">
          <CardHeader className="space-y-2">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold">Question 1 of 3</h1>
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={handleWildcardQuestion}
                disabled={isLoadingWildcard}
              >
                <Shuffle className="w-4 h-4" />
                {isLoadingWildcard ? 'Loading...' : 'Wildcard Question'}
              </Button>
            </div>
            <p className="text-gray-600">Easy Level Interview Practice</p>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="text-lg font-medium">
              {currentQuestion.question}
            </div>

            <div className="space-y-2">
              <Textarea
                placeholder="Type your answer here... (minimum 50 characters)"
                className="min-h-[200px] resize-none"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
              <div className="text-sm text-gray-500 flex justify-end">
                {answer.length}/50 characters minimum
              </div>
            </div>

            {showFeedback && (
              <div className="space-y-6 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <div className="space-y-3">
                  <h3 className="font-semibold text-yellow-900">Key Points to Consider:</h3>
                  <ul className="space-y-2">
                    {currentQuestion.feedback.map((point, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="h-6 w-6 rounded-full border-2 border-yellow-600 flex items-center justify-center flex-shrink-0">
                          <span className="text-sm text-yellow-600">{index + 1}</span>
                        </div>
                        <span className="text-yellow-800">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {evaluation && (
                  <div className="space-y-4 border-t border-yellow-200 pt-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-yellow-900">AI Evaluation</h3>
                      <div className="text-2xl font-bold text-yellow-600">
                        {evaluation.score}/100
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-yellow-800">{evaluation.feedback}</p>
                      <div>
                        <h4 className="font-medium text-yellow-900">Suggestions for Improvement:</h4>
                        <p className="text-yellow-800">{evaluation.suggestions}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button
              variant="ghost"
              onClick={() => setShowFeedback(true)}
              disabled={answer.length < 50}
            >
              Show Feedback
            </Button>
            <div className="space-x-2">
              <Button
                onClick={handleSubmit}
                disabled={answer.length < 50 || isEvaluating || isSubmitted}
              >
                {isEvaluating ? 'Evaluating...' : isSubmitted ? 'Submitted' : 'Submit Answer'}
              </Button>
              {isSubmitted && (
                <Button variant="outline">
                  Next Question
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

