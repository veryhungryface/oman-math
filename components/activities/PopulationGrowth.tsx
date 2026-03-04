"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";

export default function PopulationGrowth() {
  const { t } = useI18n();
  const [growthRate, setGrowthRate] = useState(0.3);
  const [feedback, setFeedback] = useState("");

  // Population: P(t) = 1000 * e^(0.3t)
  // Growth rate: P'(t) = 1000 * 0.3 * e^(0.3t)

  const populationPoints = Array.from({ length: 11 }, (_, i) => {
    const t = i;
    const p = 1000 * Math.exp(growthRate * t);
    return { t, p };
  });

  const ratePoints = Array.from({ length: 11 }, (_, i) => {
    const t = i;
    const rate = 1000 * growthRate * Math.exp(growthRate * t);
    return { t, rate };
  });

  const maxP = Math.max(...populationPoints.map((p) => p.p));
  const maxRate = Math.max(...ratePoints.map((p) => p.rate));

  const handleCheck = () => {
    const maxGrowthIndex = ratePoints.reduce((maxIdx, p, idx) => (p.rate > ratePoints[maxIdx].rate ? idx : maxIdx), 0);
    setFeedback(`✓ Growth rate parameter: ${growthRate.toFixed(2)}\nFastest growth at year ${maxGrowthIndex} (always increasing with this model)`);
  };

  const reset = () => {
    setGrowthRate(0.3);
    setFeedback("");
  };

  const popPolyline = populationPoints
    .map((p) => `${40 + (p.t / 10) * 280},${240 - (p.p / maxP) * 180}`)
    .join(" ");

  const ratePolyline = ratePoints
    .map((p) => `${40 + (p.t / 10) * 280},${240 - (p.rate / maxRate) * 180}`)
    .join(" ");

  return (
    <div className="interactive-widget">
      <h4>{t("Activity")} 3: Population Growth</h4>
      <p className="subtext">Compare population and growth rate over time.</p>

      <div style={{ marginTop: "1.5rem" }}>
        {/* Growth rate control */}
        <div style={{ padding: "1rem", background: "#f7f1ea", borderRadius: "8px", marginBottom: "1.5rem" }}>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "1rem" }}>
            Growth rate: <span style={{ color: "#d57d3d", fontSize: "1.2rem" }}>{growthRate.toFixed(2)}</span>
          </label>
          <input
            type="range"
            min="0.1"
            max="0.5"
            step="0.05"
            value={growthRate}
            onChange={(e) => {
              setGrowthRate(Number(e.target.value));
              setFeedback("");
            }}
            style={{ width: "100%" }}
          />
        </div>

        {/* Population graph */}
        <div style={{ marginBottom: "1.5rem" }}>
          <p style={{ fontWeight: 600, marginBottom: "0.5rem" }}>Population:</p>
          <svg
            width="100%"
            height="200"
            viewBox="0 0 350 220"
            style={{
              border: "1px solid #e7e3df",
              borderRadius: "8px",
              background: "#faf8f5",
            }}
          >
            <line x1="40" y1="200" x2="40" y2="20" stroke="#5b534c" strokeWidth="1" />
            <line x1="40" y1="200" x2="320" y2="200" stroke="#5b534c" strokeWidth="1" />
            <polyline points={popPolyline} fill="none" stroke="#d57d3d" strokeWidth="2" />
            <text x="300" y="215" fontSize="11" fill="#5b534c">
              Year
            </text>
          </svg>
        </div>

        {/* Growth rate graph */}
        <div style={{ marginBottom: "1.5rem" }}>
          <p style={{ fontWeight: 600, marginBottom: "0.5rem" }}>Growth Rate (dP/dt):</p>
          <svg
            width="100%"
            height="200"
            viewBox="0 0 350 220"
            style={{
              border: "1px solid #e7e3df",
              borderRadius: "8px",
              background: "#faf8f5",
            }}
          >
            <line x1="40" y1="200" x2="40" y2="20" stroke="#5b534c" strokeWidth="1" />
            <line x1="40" y1="200" x2="320" y2="200" stroke="#5b534c" strokeWidth="1" />
            <polyline points={ratePolyline} fill="none" stroke="#2f6f6a" strokeWidth="2" />
            <text x="300" y="215" fontSize="11" fill="#5b534c">
              Year
            </text>
          </svg>
        </div>

        {/* Info */}
        <div style={{ padding: "1rem", background: "#e7f6f4", borderRadius: "8px", marginBottom: "1.5rem", fontSize: "0.9rem", color: "#5b534c" }}>
          <p style={{ fontWeight: 600, marginBottom: "0.5rem" }}>Exponential Growth Model:</p>
          <p>P(t) = P₀ · e^(rt)</p>
          <p style={{ marginTop: "0.5rem" }}>The growth rate (derivative) increases as population increases!</p>
        </div>

        {/* Feedback */}
        {feedback && (
          <div
            style={{
              padding: "0.8rem 1rem",
              borderRadius: "8px",
              marginBottom: "1rem",
              background: "#e7f6f4",
              color: "#1a4a47",
              fontWeight: 600,
              whiteSpace: "pre-wrap",
            }}
          >
            {feedback}
          </div>
        )}

        {/* Buttons */}
        <div style={{ display: "flex", gap: "0.8rem" }}>
          <button
            onClick={handleCheck}
            style={{
              padding: "0.7rem 1.5rem",
              background: "#d57d3d",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Analyze
          </button>
          <button
            onClick={reset}
            style={{
              padding: "0.7rem 1.5rem",
              background: "#fff",
              color: "#5b534c",
              border: "1px solid #ddd",
              borderRadius: "8px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
