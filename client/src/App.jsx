import { useState } from "react";
import Dashboard from "./components/Dashboard";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [practicePrompt, setPracticePrompt] = useState("");
  const [practiceInput, setPracticeInput] = useState("");
  const [practiceFeedback, setPracticeFeedback] = useState("");
  const startPractice = async () => {
    const res = await fetch("http://localhost:5000/api/chat/practice");
    const data = await res.json();

    setPracticePrompt(data.prompt);
    setPracticeFeedback("");
    setPracticeInput("");
  };

  const submitPractice = async () => {
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
  };

  const [view, setView] = useState("chat");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userInput = input;
    setInput("");
    const res = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userInput }),
    });

    const data = await res.json();

    const aiText = data.reply;

    const correct = aiText
      .split("Correct:")[1]
      ?.split("Explanation:")[0]
      ?.trim();
    const explanation = aiText
      .split("Explanation:")[1]
      ?.split("Response:")[0]
      ?.trim();
    const response = aiText.split("Response:")[1]?.trim();

    setMessages((prev) => [
      ...prev,
      { role: "user", content: userInput },
      { role: "ai", correct, explanation, response },
    ]);
  };
  const goToPractice = async () => {
    setView("practice");
    await startPractice();
  };

  return (
    <div>
      <h1>AI German Tutor</h1>
      <button onClick={() => setView("chat")}>Chat</button>
      <button onClick={goToPractice}>Practice</button>
      <button onClick={() => setView("dashboard")}>Progress</button>
      <div>
        {view === "practice" && (
          <div>
            <h2> Practice Mode</h2>

            <p>
              <strong>Translate:</strong> {practicePrompt}
            </p>

            <input
              value={practiceInput}
              onChange={(e) => setPracticeInput(e.target.value)}
            />

            <button onClick={submitPractice}>Submit</button>

            {practiceFeedback && <p>{practiceFeedback}</p>}

            <button onClick={startPractice}>New Question</button>
          </div>
        )}

        {view === "dashboard" && <Dashboard />}

        {view === "chat" && (
          <>
            <div>
              {messages.map((msg, index) => (
                <div key={index}>
                  {msg.role === "user" ? (
                    <p>
                      <strong>You:</strong> {msg.content}
                    </p>
                  ) : (
                    <div>
                      <p>
                        <strong>Correct:</strong> {msg.correct}
                      </p>
                      <p>
                        <strong>Explanation:</strong> {msg.explanation}
                      </p>
                      <p>
                        <strong>Response:</strong> {msg.response}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <input value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={sendMessage}>Send</button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
