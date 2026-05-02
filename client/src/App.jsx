import { useState } from "react";
import Dashboard from "./components/Dashboard";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const [showDashboard, setShowDashboard] = useState(false);

  const sendMessage = async () => {
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

  return (
    <div>
      <h1>AI German Tutor</h1>
      <button onClick={() => setShowDashboard(!showDashboard)}>
        {showDashboard ? "Back to Chat" : "View Progress"}
      </button>

      {showDashboard ? (
        <Dashboard />
      ) : (
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
                      <strong>✅ Correct:</strong> {msg.correct}
                    </p>
                    <p>
                      <strong>🧠 Explanation:</strong> {msg.explanation}
                    </p>
                    <p>
                      <strong>💬 Response:</strong> {msg.response}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
