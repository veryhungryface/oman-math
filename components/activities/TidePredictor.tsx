"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";

export default function TidePredictor() {
  const { t } = useI18n();
  const [amplitude, setAmplitude] = useState(2);
  const [period, setPeriod] = useState(1);
  const [phase, setPhase] = useState(0);
  const [offset, setOffset] = useState(3);
  const [feedback, setFeedback] = useState("");

  // Tide height: h(t) = amplitude * sin((2π/period) * t + phase) + offset
  const points = Array.from({ length: 61 }, (_, i) => {
    const t = (i / 10);
    const h = amplitude * Math.sin((2 * Math.PI / period) * t + phase) + offset;
    return { t, h };
  });

  const maxTide = Math.max(...points.map((p) => p.h));
  const minTide = Math.min(...points.map((p) => p.h));

  const handleCheck = () => {
    setFeedback(`✓ Tide parameters:\nAmplitude: ${amplitude}m | Period: ${period} hrs\nMax height: ${maxTide.toFixed(1)}m | Min height: ${minTide.toFixed(1)}m`);
  };

  const reset = () => {
    setAmplitude(2);
    setPeriod(1);
    setPhase(0);
    setOffset(3);
    setFeedback("");
  };

  const polylinePoints = points
    .map((p) => `${40 + (p.t / 6) * 280},${240 - ((p.h - minTide) / (maxTide - minTide)) * 180}`)
    .join(" ");

  return (
    <div className="interactive-widget">
      <h4>{t("Activity")} 4: Tide Predictor</h4>
      <p className="subtext">Adjust sine wave parameters to model tidal patterns.</p>

      <div style={{ marginTop: "1.5rem" }}>
        {/* Tide graph */}
        <svg
          width="100%"
          height="300"
          viewBox="0 0 350 300"
          style={{
            border: "1px solid #e7e3df",
            borderRadius: "8px",
            background: "#faf8f5",
            marginBottom: "1.5rem",
          }}
        >
          {/* Axes */}
          <line x1="40" y1="240" x2="40" y2="20" stroke="#5b534c" strokeWidth="2" />
          <line x1="40" y1="240" x2="330" y2="240" stroke="#5b534c" strokeWidth="2" />

          {/* Grid */}
          {Array.from({ length: 5 }, (_, i) => (
            <line
              key={`hgrid-${i}`}
              x1="40"
              y1={240 - (i * 220) / 4}
              x2="330"
              y2={240 - (i * 220) / 4}
              stroke="#e7e3df"
              strokeWidth="0.5"
              strokeDasharray="3,3"
            />
          ))}

          {/* Tide curve */}
          <polyline points={polylinePoints} fill="none" stroke="#2f6f6a" strokeWidth="2" />

          {/* Labels */}
          <text x="320" y="260" fontSize="12" fontWeight="bold" fill="#5b534c">
            Time (hrs)
          </text>
          <text x="20" y="15" fontSize="12" fontWeight="bold" fill="#5b534c">
            Height (m)
          </text>
        </svg>

        {/* Controls */}
        <div style={{ padding: "1rem", background: "#f7f1ea", borderRadius: "8px", marginBottom: "1.5rem" }}>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>
              Amplitude (wave height): <span style={{ color: "#d57d3d" }}>{amplitude.toFixed(1)} m</span>
            </label>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.1"
              value={amplitude}
              onChange={(e) => {
                setAmplitude(Number(e.target.value));
                setFeedback("");
              }}
              style={{ width: "100%" }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>
              Period (cycle length): <span style={{ color: "#d57d3d" }}>{period.toFixed(1)} hrs</span>
            </label>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.1"
              value={period}
              onChange={(e) => {
                setPeriod(Number(e.target.value));
                setFeedback("");
              }}
              style={{ width: "100%" }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>
              Phase shift: <span style={{ color: "#d57d3d" }}>{phase.toFixed(1)}</span>
            </label>
            <input
              type="range"
              min="0"
              max={Math.PI * 2}
              step="0.1"
              value={phase}
              onChange={(e) => {
                setPhase(Number(e.target.value));
                setFeedback("");
              }}
              style={{ width: "100%" }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>
              Mean sea level (offset): <span style={{ color: "#d57d3d" }}>{offset.toFixed(1)} m</span>
            </label>
            <input
              type="range"
              min="1"
              max="5"
              step="0.1"
              value={offset}
              onChange={(e) => {
                setOffset(Number(e.target.value));
                setFeedback("");
              }}
              style={{ width: "100%" }}
            />
          </div>
        </div>

        {/* Equation */}
        <div style={{ padding: "1rem", background: "#e7f6f4", borderRadius: "8px", marginBottom: "1.5rem", textAlign: "center" }}>
          <p style={{ fontSize: "0.9rem", color: "#5b534c", marginBottom: "0.5rem" }}>Height equation:</p>
          <p style={{ fontSize: "1rem", fontWeight: 700, color: "#2f6f6a" }}>
            h(t) = {amplitude.toFixed(1)} sin(2πt/{period.toFixed(1)} + {phase.toFixed(1)}) + {offset.toFixed(1)}
          </p>
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
            Analyze Tides
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
