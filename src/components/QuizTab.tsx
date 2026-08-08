import React, { useState, useEffect } from 'react';
import { questionBank } from '../data/prayerData';
import { QuizQuestion } from '../types';
import { HelpCircle, CheckCircle, XCircle, RotateCcw, Award } from 'lucide-react';

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const QuizTab: React.FC = () => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    startQuiz();
  }, []);

  const startQuiz = () => {
    setQuestions(shuffle(questionBank));
    setCurrentIndex(0);
    setScore(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCompleted(false);
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswered || isCompleted) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === questions[currentIndex].correct) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (!isAnswered) return;

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
    }
  };

  const letters = ['A', 'B', 'C', 'D'];
  const currentQ = questions[currentIndex];
  const progressPercent = questions.length > 0 ? ((currentIndex) / questions.length) * 100 : 0;

  let feedbackMessage = '';
  if (isCompleted && questions.length > 0) {
    const pct = Math.round((score / questions.length) * 100);
    if (pct === 100) feedbackMessage = 'Perfect score — mashaAllah!';
    else if (pct >= 75) feedbackMessage = 'Excellent work — you know your basics well.';
    else if (pct >= 50) feedbackMessage = 'Good effort — a little more review and you’ll have it down.';
    else feedbackMessage = 'Keep learning — try again and see how much you remember.';
  }

  return (
    <div className="space-y-8 pb-16">
      {/* Hero Section */}
      <section className="max-w-2xl mx-auto text-center px-4 pt-6 space-y-3">
        <span className="inline-block text-[11px] uppercase tracking-widest text-[#cda355] border border-[#cda355]/30 rounded-full px-3 py-1 bg-[#123c46]/40">
          Learn a little
        </span>
        <h1 className="font-marcellus text-3xl sm:text-4xl text-[#e6cd94]">
          Islamic Quiz
        </h1>
        <p className="text-sm text-[#9fbfc2] max-w-lg mx-auto leading-relaxed">
          Twelve friendly questions on the basics of Islam. No pressure — just a quick way to learn or refresh what you know.
        </p>
      </section>

      {/* Main Quiz Area */}
      <main className="max-w-2xl mx-auto px-4">
        {!isCompleted && currentQ ? (
          <div className="space-y-4">
            {/* Meta header */}
            <div className="flex justify-between items-center text-xs text-[#9fbfc2] px-1 font-outfit">
              <span>Question {currentIndex + 1} of {questions.length}</span>
              <span className="font-semibold text-[#e6cd94]">Score: {score}</span>
            </div>

            {/* Progress Bar */}
            <div className="h-2 bg-[#123c46] rounded-full overflow-hidden border border-[#cda355]/25">
              <div
                className="h-full bg-gradient-to-r from-[#cda355] to-[#e6cd94] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Question Card */}
            <div className="bg-[#123c46] border border-[#cda355]/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
              <h2 className="font-marcellus text-xl sm:text-2xl text-[#f4efe1] leading-snug">
                {currentQ.q}
              </h2>

              {/* Options */}
              <div className="space-y-3">
                {currentQ.options.map((option, idx) => {
                  const isCorrect = idx === currentQ.correct;
                  const isSelected = idx === selectedOption;

                  let optionStyle = 'bg-[#0a2229] border-[#cda355]/30 text-[#f4efe1] hover:border-[#cda355]';

                  if (isAnswered) {
                    if (isCorrect) {
                      optionStyle = 'bg-emerald-900/30 border-emerald-500 text-emerald-200';
                    } else if (isSelected) {
                      optionStyle = 'bg-rose-900/30 border-rose-500 text-rose-200';
                    } else {
                      optionStyle = 'bg-[#0a2229]/40 border-[#cda355]/10 text-[#9fbfc2]/50 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswered}
                      className={`w-full text-left p-4 rounded-xl border flex items-center gap-3.5 transition-all text-sm font-outfit cursor-pointer ${optionStyle}`}
                    >
                      <span className="w-7 h-7 rounded-full border border-[#cda355] text-[#e6cd94] font-marcellus text-xs flex items-center justify-center shrink-0">
                        {letters[idx]}
                      </span>
                      <span className="flex-1">{option}</span>
                      {isAnswered && isCorrect && <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />}
                      {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Next Button */}
              <div className="flex justify-end pt-2">
                <button
                  onClick={handleNext}
                  disabled={!isAnswered}
                  className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-md cursor-pointer ${
                    isAnswered
                      ? 'bg-[#cda355] text-[#0c2a32] hover:bg-[#e6cd94]'
                      : 'bg-[#164854] text-[#9fbfc2] opacity-40 cursor-not-allowed'
                  }`}
                >
                  {currentIndex === questions.length - 1 ? 'See results' : 'Next question'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Results View */
          <div className="bg-[#123c46] border border-[#cda355] rounded-3xl p-8 sm:p-10 text-center shadow-2xl space-y-6">
            <div className="w-28 h-28 rounded-full border-4 border-[#cda355] flex flex-col items-center justify-center mx-auto text-[#e6cd94] shadow-lg bg-[#164854]">
              <span className="font-marcellus text-3xl font-bold">{score}/{questions.length}</span>
            </div>

            <div className="space-y-2">
              <h2 className="font-marcellus text-3xl text-[#f4efe1]">
                {Math.round((score / questions.length) * 100)}% Correct
              </h2>
              <p className="text-sm text-[#9fbfc2] max-w-md mx-auto leading-relaxed">
                {feedbackMessage}
              </p>
            </div>

            <button
              onClick={startQuiz}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#cda355] text-[#e6cd94] font-semibold text-sm hover:bg-[#164854] transition-colors shadow-md cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Try again
            </button>
          </div>
        )}
      </main>
    </div>
  );
};
