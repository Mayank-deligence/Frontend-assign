import { useEffect, useState } from "react";
import API from "../api";

export default function Progress() {
  const [summary, setSummary] = useState({ easy: 0, medium: 0, hard: 0 });

  useEffect(() => {
    API.get("/progress/summary").then(r => setSummary(r.data)).catch(()=>{});
  }, []);

  return (
    <div className="panel">
      <h2>Progress Reports</h2>
      <div className="progress-list">
        <Bar label="Easy"   value={summary.easy}/>
        <Bar label="Medium" value={summary.medium}/>
        <Bar label="Hard"   value={summary.hard}/>
      </div>
    </div>
  );
}

function Bar({ label, value }) {
  return (
    <div className="bar">
      <div className="bar-head">
        <span>{label}</span><span>{value}%</span>
      </div>
      <div className="bar-rail"><div className="bar-fill" style={{ width: `${value}%` }}/></div>
    </div>
  );
}
