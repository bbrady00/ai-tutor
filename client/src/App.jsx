import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    const res = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();

    const aiText = data.reply();

    const correct = aiText.split("Correct:")[1]?.split("Explanation:")[0];
    const explanation = aiText.split("Explanation:")[1]?.split("Response:")[0];
    const response = aiText.split("Response:")[1];

    setMessages([
      ...messages,
      { role: "user", content: input },
      { role: "ai", correct, explanation, response },
    ]);

    setInput("");
  };

  return (
    <div>
      <h1>AI German Tutor</h1>

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

      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
