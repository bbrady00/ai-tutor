import { useState, useEffect } from "react";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/user")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>Your Progress</h2>

      <h3>Weaknesses</h3>
      <ul>
        {user.weaknesess.map((w, i) => (
          <li key={i}>{w}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
