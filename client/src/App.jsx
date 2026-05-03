import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Chat from "./components/Chat";
import Practice from "./components/Practice";
import Dashboard from "./components/Dashboard";
import "./styles/app.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <header className="app-header">
          <h1>AI German Tutor</h1>

          <nav className="app-nav">
            <a href="/chat">Chat</a>
            <a href="/practice">Practice</a>
            <a href="/dashboard">Progress</a>
          </nav>
        </header>

        <main className="app-content">
          <Routes>
            <Route path="/" element={<Navigate to="/chat" />}></Route>
            <Route path="/chat" element={<Chat />}></Route>
            <Route path="/practice" element={<Practice />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
