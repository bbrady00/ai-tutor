import { useState, useEffect } from "react";
import "../styles/practice.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/user")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="page dashboard-page">
      <div className="dashboard-header">
        <h2>Your Progress</h2>
      </div>
      <div className="dashboard-weaknesses">
        <h3>Weaknesses</h3>
        <ul className="dashboard-weakness-list">
          {user.weaknesses.map((w, i) => (
            <li className="dashboard-weakness-item" key={i}>
              {w}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
