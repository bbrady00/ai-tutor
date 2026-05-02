import { useState } from "react";
import "../styles/practice.css";

const Practice = () => {
  const [practicePrompt, setPracticePrompt] = useState("");
  const [practiceInput, setPracticeInput] = useState("");
  const [practiceFeedback, setPracticeFeedback] = useState("");

  const startPractice = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/chat/practice");
      const data = await res.json();

      setPracticePrompt(data.prompt);
      setPracticeFeedback("");
      setPracticeInput("");
    } catch (err) {
      console.error(err);
    }
  };

  const submitPractice = async () => {
    if (!practiceInput.trim()) return;

    try {
      const res = await fetch("http://localhost:5000/api/chat/practice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userAnswer: practiceInput,
          originalSentence: practicePrompt,
        }),
      });

      const data = await res.json();
      setPracticeFeedback(data.feedback);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="page practice-page">
      <div className="practice-header">
        <h2>Practice Mode</h2>
        <button className="practice-start-button" onClick={startPractice}>
          Start / New Question
        </button>
      </div>

      <div className="practice-card">
        <p className="practice-prompt">
          <strong>Translate:</strong>{" "}
          {practicePrompt || "Click 'Start / New Question to begin"}
        </p>
      </div>

      <div className="practice-input-container">
        <input
          className="practice-input"
          value={practiceInput}
          onChange={(e) => setPracticeInput(e.target.value)}
        />

        <button
          className="practice-submit-button"
          onClick={submitPractice}
          disabled={!practicePrompt}
        >
          Submit
        </button>
      </div>

      {practiceFeedback && (
        <div className="practice-feedback">
          <p>{practiceFeedback}</p>
        </div>
      )}
    </div>
  );
};

export default Practice;
