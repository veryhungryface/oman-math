"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";

const sportLabels = {
  en: ["Football", "Basketball", "Swimming", "Cricket"],
  ar: ["كرة القدم", "كرة السلة", "السباحة", "الكريكيت"]
};

const sportColors = ["#3856b0", "#d57d3d", "#2f6f6a", "#8e44ad"];

const initialVotes = [0, 0, 0, 0];

export default function BarChartPoll() {
  const { t, locale } = useI18n();
  const [votes, setVotes] = useState(initialVotes);
  const maxVotes = Math.max(...votes, 1);
  const totalVotes = votes.reduce((a, b) => a + b, 0);
  const isChallengeComplete = totalVotes >= 10;
  const mostVoted = isChallengeComplete ? votes.indexOf(Math.max(...votes)) : -1;

  function vote(index: number) {
    setVotes((prev) => {
      const next = [...prev];
      next[index]++;
      return next;
    });
  }

  function reset() {
    setVotes(initialVotes);
  }

  const labels = sportLabels[locale as keyof typeof sportLabels] || sportLabels.en;

  return (
    <div className="interactive-widget">
      <h4>{t("Class Poll — Vote & Visualize")}</h4>
      <div className="scenario-panel">
        <div className="scenario-illustration">
          <svg className="scenario-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            {/* Classroom */}
            <rect x="10" y="10" width="80" height="70" fill="#f5efe3" stroke="#888" strokeWidth="1"/>
            {/* Students raising hands */}
            <circle cx="25" cy="40" r="6" fill="#d4a574"/>
            <line x1="25" y1="33" x2="25" y2="20" stroke="#333" strokeWidth="1.5"/>
            <line x1="25" y1="22" x2="20" y2="28" stroke="#333" strokeWidth="1.5"/>
            <line x1="25" y1="22" x2="30" y2="28" stroke="#333" strokeWidth="1.5"/>

            <circle cx="50" cy="45" r="6" fill="#d4a574"/>
            <line x1="50" y1="38" x2="50" y2="22" stroke="#333" strokeWidth="1.5"/>
            <line x1="50" y1="24" x2="45" y2="30" stroke="#333" strokeWidth="1.5"/>
            <line x1="50" y1="24" x2="55" y2="30" stroke="#333" strokeWidth="1.5"/>

            <circle cx="75" cy="40" r="6" fill="#d4a574"/>
            <line x1="75" y1="33" x2="75" y2="20" stroke="#333" strokeWidth="1.5"/>
            <line x1="75" y1="22" x2="70" y2="28" stroke="#333" strokeWidth="1.5"/>
            <line x1="75" y1="22" x2="80" y2="28" stroke="#333" strokeWidth="1.5"/>
          </svg>
        </div>
        <div className="scenario-text">
          <p className="detail-label">{t("Classroom Sports Poll")}</p>
          <p>{t("Vote for your favorite sport. Need at least 10 total votes to see results.")}</p>
        </div>
      </div>
      <div className="poll-buttons">
        {labels.map((label, i) => (
          <button key={i} className="poll-btn" type="button" style={{ borderColor: sportColors[i] }} onClick={() => vote(i)}>
            {label}
          </button>
        ))}
        <button className="ghost-button" type="button" onClick={reset}>{t("Reset")}</button>
      </div>
      <div className="poll-chart">
        {labels.map((label, i) => (
          <div key={i} className="poll-bar-row">
            <span className="poll-label">{label}</span>
            <div className="poll-track">
              <div className="poll-fill" style={{ width: `${(votes[i] / maxVotes) * 100}%`, background: sportColors[i] }} />
            </div>
            <span className="poll-count">{votes[i]}</span>
          </div>
        ))}
      </div>
      {isChallengeComplete ? (
        <div className="hint-text">
          {t("Most voted")}: {labels[mostVoted]} ({votes[mostVoted]} {t("votes")})
        </div>
      ) : (
        <div className="challenge-miss">
          {t("Votes needed")}: {10 - totalVotes}
        </div>
      )}
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
