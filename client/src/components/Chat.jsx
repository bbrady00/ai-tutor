import { useState, useEffect, useRef } from "react";
import "../styles/chat.css";

const Chat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const messageEndRef = useRef(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

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
                {" "}
                {msg.correct && (
                  <p>
                    <strong>Correct:</strong> {msg.correct}
                  </p>
                )}
                {msg.explanation && (
                  <p>
                    <strong>Explanation:</strong> {msg.explanation}
                  </p>
                )}
                {msg.response && (
                  <p>
                    <strong>Response:</strong> {msg.response}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="chat-message ai chat-loading">
            <p>Thinking...</p>
          </div>
        )}
        <div ref={messageEndRef}></div>
      </div>

      <div className="chat-input-container">
        <input
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !loading) {
              sendMessage();
            }
          }}
          disabled={loading}
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
