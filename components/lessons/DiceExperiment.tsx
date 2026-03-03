"use client";

import { useState, useCallback } from "react";
import { useI18n } from "@/lib/i18n";

export default function DiceExperiment() {
  const { t } = useI18n();
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0, 0, 0]);
  const [lastRoll, setLastRoll] = useState<number | null>(null);
  const total = counts.reduce((a, b) => a + b, 0);
  const maxCount = Math.max(...counts, 1);

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
      <div className="poll-buttons">
        <button className="primary-button" type="button" onClick={roll}>{t("Roll once")}</button>
        <button className="ghost-button" type="button" onClick={rollMany}>{t("Roll 30 times")}</button>
        <button className="ghost-button" type="button" onClick={reset}>{t("Reset")}</button>
      </div>
      {lastRoll !== null && <p className="dice-result">{lastRoll}</p>}
      <p className="subtext">{t("Total rolls")}: {total} | {t("Theoretical")}: 1/6 = {(100 / 6).toFixed(1)}%</p>
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
