import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [system, setSystem] = useState({});

  useEffect(() => {
    axios.get("http://localhost:5000/tickets")
      .then(res => setTickets(res.data));

    axios.get("http://localhost:5000/system/status")
      .then(res => setSystem(res.data));
  }, []);

  return (
    <div>
      <h2>System Status</h2>
      <p>{system.status}</p>
      <p>CPU: {system.cpu}</p>
      <p>Memory: {system.memory}</p>

      <h2>Tickets</h2>
      {tickets.map(t => (
        <div key={t.id}>
          <p>{t.title} - {t.status}</p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
