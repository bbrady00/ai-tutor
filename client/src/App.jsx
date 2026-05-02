import { useState } from "react";
import Chat from "./components/Chat";
import Practice from "./components/Practice";
import Dashboard from "./components/Dashboard";

function App() {
  const [view, setView] = useState("chat");

  return (
    <div>
      <h1>AI German Tutor</h1>

      <button onClick={() => setView("chat")}>Chat</button>
      <button onClick={() => setView("practice")}>Practice</button>
      <button onClick={() => setView("dashboard")}>Progress</button>

      {view === "chat" && <Chat />}
      {view === "practice" && <Practice />}
      {view === "dashboard" && <Dashboard />}
    </div>
  );
}

export default App;
