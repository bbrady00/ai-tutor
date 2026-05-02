import { useState } from "react";

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
    <div>
      <h2>Practice Mode</h2>

      <button onClick={startPractice}>Start / New Question</button>

      <p>
        <strong>Translate:</strong> {practicePrompt}
      </p>

      <input
        value={practiceInput}
        onChange={(e) => setPracticeInput(e.target.value)}
      />

      <button onClick={submitPractice}>Submit</button>

      {practiceFeedback && <p>{practiceFeedback}</p>}
    </div>
  );
};

export default Practice;
