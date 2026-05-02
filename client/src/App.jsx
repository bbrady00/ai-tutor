import { useState } from "react";
import "./styles/app.css";
import Chat from "./components/Chat";
import Practice from "./components/Practice";
import Dashboard from "./components/Dashboard";

function App() {
  const [view, setView] = useState("chat");

  return (
    <div className="app">
      <header className="app-header">
        <h1>AI German Tutor</h1>

        <nav className="app-nav">
          <button onClick={() => setView("chat")}>Chat</button>
          <button onClick={() => setView("practice")}>Practice</button>
          <button onClick={() => setView("dashboard")}>Progress</button>
        </nav>
      </header>
      <main className="app-content">
        {view === "chat" && <Chat />}
        {view === "practice" && <Practice />}
        {view === "dashboard" && <Dashboard />}
      </main>
    </div>
  );
}

export default App;
