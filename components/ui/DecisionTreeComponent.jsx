"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const DecisionTreeComponent = ({ data }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [answer, setAnswer] = useState("");
  const [resultCode, setResultCode] = useState(null);
  const [questions, setQuestions] = useState(data.questions);

  const handleAnswer = (questionId, answer, text, type, options = []) => {
    const newAnswer = { answer, questionId, text };
    answers.push(newAnswer);
    setAnswers([...answers]);

    if (options?.length > 0) {
      const option = options.find((option) => option.value == answer);
      setResultCode(option.resultCode);
    }

    if (type === "multiple") {
      const questionIndex = questions.findIndex(
        (question) => question.value == answer
      );
      setCurrentQuestionIndex(questionIndex);
    } else {
      setCurrentQuestionIndex((prevState) => prevState + 1);
    }

    setAnswer("");
  };

  const renderQuestion = (question) => {
    const {
      id,
      question: text,
      type,
      options,
      required,
      resultCode,
    } = question;

    return (
      <>
        <div className="h-[500px] w-[500px]">
          <p className="text-violet-500 text-lg">
            Question:{" "}
            <span className="text-sm">
              {required ? "(Required)" : "(Optional)"}
            </span>
          </p>
          <h1 className="text-3xl font-extrabold text-white leading-10">
            {text}
          </h1>
        </div>
        <div className="h-[500px] w-[500px] space-y-8">
          {type == "string" && (
            <div className="flex bg-gray-700 p-6 items-center gap-5 rounded-md">
              <div className="bg-white border rounded-md p-3">Aa</div>
              <div className="grow">
                <input
                  type="text"
                  className="w-full p-5 rounded-md"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Enter your answer"
                />
              </div>
            </div>
          )}
          {type == "number" && (
            <div className="flex bg-gray-700 p-6 items-center gap-5 rounded-md">
              <div className="bg-white border rounded-md p-3">Numeric</div>
              <div className="grow">
                <input
                  type="number"
                  value={answer}
                  className="w-full p-5 rounded-md"
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Enter your answer"
                />
              </div>
            </div>
          )}
          {type === "multiple" &&
            options.map((opt, index) => (
              <button
                className="flex bg-gray-700 p-6 items-center justify-start gap-5 rounded-md w-full"
                onClick={() => setAnswer(opt?.value)}
                key={index}
              >
                <div
                  className={`${
                    answer == opt?.value
                      ? "bg-violet-500 text-white"
                      : "bg-white"
                  } rounded-md p-3`}
                >
                  {index + 1}
                </div>
                <p className="font-bold text-white">{opt.key}</p>
              </button>
            ))}
          <Button
            className={`${
              required && answer?.length === 0
                ? "bg-violet-400"
                : "bg-violet-500"
            } w-full rounded-md p-5 text-white font-bold hover:bg-violet-700`}
            onClick={() => handleAnswer(id, answer, text, type, options)}
            disabled={required && answer?.length === 0 ? true : false}
          >
            Submit
          </Button>
        </div>
      </>
    );
  };

  const getCurrentQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    console.log(currentQuestion);
    // check if has parent question
    if (currentQuestion.hasOwnProperty("parentQuestionId")) {
      // console.log(currentQuestion);
      const subQuestions = questions.filter(
        (question) =>
          question.parentQuestionId == currentQuestion.parentQuestionId
      );

      const prevAnswerIndex = answers.length - 1;
      const prevAnswer = answers[prevAnswerIndex];
      const updatedCurrentQuestion = subQuestions.find(
        (question) => question.value == prevAnswer.answer
      );

      const idx = questions.findIndex(
        (question) => question.id == updatedCurrentQuestion.id
      );
      return questions[idx];
    } else {
      return currentQuestion;
    }
  };

  const getResultMessage = () => {
    const result = data?.results.find((res) => res.resultCode === resultCode);

    return result ? (
      <>
        <div className="p-4 rounded-md bg-gray-800 text-violet-500 mb-5">
          <p>Output:</p>
          <h1 className="text-xl font-extrabold">{result.message}</h1>
        </div>
        <h3 className="text-md font-bold">Your Answers</h3>
        <Accordion type="single" collapsible className="w-full">
          {answers.map((answer) => (
            <AccordionItem
              value={`item-${answer?.questionId}`}
              key={answer?.questionId}
            >
              <AccordionTrigger>{answer?.text}</AccordionTrigger>
              <AccordionContent>
                <span className="font-bold">Answer:</span> {answer?.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </>
    ) : (
      "No result found"
    );
  };

  return (
    <div>
      <div className="text-center my-5">
        <h1 className="text-4xl font-extrabold text-violet-500">
          Find Answers
        </h1>
      </div>
      <div className="flex justify-center p-12 gap-10">
        {!resultCode ? (
          renderQuestion(getCurrentQuestion())
        ) : (
          <div className="bg-gray-100 rounded-md p-10">
            <div className="mb-4">{getResultMessage()}</div>
            <Button onClick={() => window.location.reload()}>Start Over</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DecisionTreeComponent;
