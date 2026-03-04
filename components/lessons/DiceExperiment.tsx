"use client";

import { useState, useCallback } from "react";
import { useI18n } from "@/lib/i18n";

export default function DiceExperiment() {
  const { t } = useI18n();
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0, 0, 0]);
  const [lastRoll, setLastRoll] = useState<number | null>(null);
  const total = counts.reduce((a, b) => a + b, 0);
  const maxCount = Math.max(...counts, 1);
  const isSuccess = total >= 30;

  const roll = useCallback(() => {
    const face = Math.floor(Math.random() * 6);
    setLastRoll(face + 1);
    setCounts((prev) => prev.map((c, i) => (i === face ? c + 1 : c)));
  }, []);

  const rollMany = useCallback(() => {
    const newCounts = [...counts];
    for (let i = 0; i < 30; i++) {
      newCounts[Math.floor(Math.random() * 6)]++;
    }
    setCounts(newCounts);
    setLastRoll(null);
  }, [counts]);

  const reset = useCallback(() => {
    setCounts([0, 0, 0, 0, 0, 0]);
    setLastRoll(null);
  }, []);

  return (
    <div className="interactive-widget">
      <h4>{t("Dice Experiment")}</h4>
      <div className="scenario-panel">
        <div className="scenario-illustration">
          <svg className="scenario-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            {/* Weather icons - sun, cloud, rain */}
            {/* Sun */}
            <circle cx="25" cy="30" r="8" fill="#FFD700"/>
            <line x1="25" y1="12" x2="25" y2="8" stroke="#FFD700" strokeWidth="1.5"/>
            <line x1="25" y1="48" x2="25" y2="52" stroke="#FFD700" strokeWidth="1.5"/>
            <line x1="43" y1="30" x2="47" y2="30" stroke="#FFD700" strokeWidth="1.5"/>
            <line x1="7" y1="30" x2="3" y2="30" stroke="#FFD700" strokeWidth="1.5"/>
            {/* Cloud */}
            <path d="M 50 35 Q 60 35 65 40 Q 65 50 55 50 Q 45 50 45 45 Q 45 35 50 35" fill="#BDBDBD" stroke="#666" strokeWidth="1"/>
            {/* Rain */}
            <circle cx="75" cy="30" r="10" fill="none" stroke="#87CEEB" strokeWidth="1.5"/>
            <line x1="75" y1="42" x2="72" y2="50" stroke="#3856b0" strokeWidth="1"/>
            <line x1="80" y1="42" x2="77" y2="50" stroke="#3856b0" strokeWidth="1"/>
            <line x1="70" y1="42" x2="67" y2="50" stroke="#3856b0" strokeWidth="1"/>
          </svg>
        </div>
        <div className="scenario-text">
          <p className="detail-label">{t("Weather Prediction Experiment")}</p>
          <p>{t("Roll the dice 30 times to observe the probability converging to 1/6.")}</p>
        </div>
      </div>
      <div className="poll-buttons">
        <button className="primary-button" type="button" onClick={roll}>{t("Roll once")}</button>
        <button className="ghost-button" type="button" onClick={rollMany}>{t("Roll 30 times")}</button>
        <button className="ghost-button" type="button" onClick={reset}>{t("Reset")}</button>
      </div>
      {lastRoll !== null && <p className="dice-result">{lastRoll}</p>}
      <p className="subtext">{t("Total rolls")}: {total} | {t("Theoretical")}: 1/6 = {(100 / 6).toFixed(1)}%</p>
      {isSuccess ? (
        <div className="hint-text">
          {t("Success! Challenge complete.")}
        </div>
      ) : (
        <div className="challenge-miss">
          {t("Rolls remaining")}: {Math.max(0, 30 - total)}
        </div>
      )}
      <div className="poll-chart">
        {counts.map((c, i) => (
          <div key={i} className="poll-bar-row">
            <span className="poll-label">{i + 1}</span>
            <div className="poll-track">
              <div className="poll-fill" style={{ width: `${(c / maxCount) * 100}%`, background: "#3856b0" }} />
            </div>
            <span className="poll-count">{c} ({total > 0 ? ((c / total) * 100).toFixed(0) : 0}%)</span>
          </div>
        ))}
      </div>
      <div className="lesson-task">
        <h5>{t("Try this")}</h5>
        <ul className="task-list">
          <li>{t("Roll 30 times and compare to theoretical 1/6.")}</li>
          <li>{t("Identify which face appears most often.")}</li>
          <li>{t("Reset and predict the next set of results.")}</li>
        </ul>
      </div>
    </div>
  );
}
