import { useState } from "react";
import "../styles/chat.css";

const Chat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userInput = input;
    setInput("");
    setLoading(true);

    try {
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
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page chat-page">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div className={`chat-message ${msg.role}`} key={index}>
            {msg.role === "user" ? (
              <p>
                <strong>You:</strong> {msg.content}
              </p>
            ) : (
              <div className="chat-response">
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
        {loading && (
          <div className="chat-message ai chat-loading">
            <p>Thinking...</p>
          </div>
        )}
      </div>

      <div className="chat-input-container">
        <input
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="chat-button"
          onClick={sendMessage}
          disabled={loading}
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default Chat;
