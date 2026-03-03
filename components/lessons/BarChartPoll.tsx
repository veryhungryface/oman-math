"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";

const initialData = [
  { label: "Apple", votes: 0, color: "#e74c3c" },
  { label: "Banana", votes: 0, color: "#f1c40f" },
  { label: "Orange", votes: 0, color: "#e67e22" },
  { label: "Grape", votes: 0, color: "#8e44ad" },
];

export default function BarChartPoll() {
  const { t } = useI18n();
  const [data, setData] = useState(initialData);
  const maxVotes = Math.max(...data.map((d) => d.votes), 1);

  function vote(index: number) {
    setData((prev) =>
      prev.map((d, i) => (i === index ? { ...d, votes: d.votes + 1 } : d))
    );
  }

  function reset() {
    setData(initialData);
  }

  return (
    <div className="interactive-widget">
      <h4>{t("Class Poll — Vote & Visualize")}</h4>
      <div className="poll-buttons">
        {data.map((d, i) => (
          <button key={d.label} className="poll-btn" type="button" style={{ borderColor: d.color }} onClick={() => vote(i)}>
            {d.label}
          </button>
        ))}
        <button className="ghost-button" type="button" onClick={reset}>{t("Reset")}</button>
      </div>
      <div className="poll-chart">
        {data.map((d) => (
          <div key={d.label} className="poll-bar-row">
            <span className="poll-label">{d.label}</span>
            <div className="poll-track">
              <div className="poll-fill" style={{ width: `${(d.votes / maxVotes) * 100}%`, background: d.color }} />
            </div>
            <span className="poll-count">{d.votes}</span>
          </div>
        ))}
      </div>
      <div className="lesson-task">
        <h5>{t("Try this")}</h5>
        <ul className="task-list">
          <li>{t("Ask the class to vote and identify the tallest bar.")}</li>
          <li>{t("Compare the top two choices and state the difference.")}</li>
          <li>{t("Reset and predict how the chart might change.")}</li>
        </ul>
      </div>
    </div>
  );
}
