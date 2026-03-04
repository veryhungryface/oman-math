"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";

export default function SpeedTangent() {
  const { t } = useI18n();
  const [xPos, setXPos] = useState(2);
  const [feedback, setFeedback] = useState("");

  // Position function: s(t) = t^2 - 2t + 1
  // Derivative (velocity): v(t) = 2t - 2
  const position = xPos * xPos - 2 * xPos + 1;
  const velocity = 2 * xPos - 2;

  // Graph points
  const points = Array.from({ length: 21 }, (_, i) => {
    const t = (i / 2);
    const s = t * t - 2 * t + 1;
    return { t, s };
  });

  const maxS = Math.max(...points.map((p) => p.s));
  const minS = Math.min(...points.map((p) => p.s));

  // Tangent line: y - s(x0) = v(x0) * (x - x0)
  const tangentPoints = [
    { t: xPos - 1, s: position - velocity },
    { t: xPos + 1, s: position + velocity },
  ];

  const handleCheck = () => {
    setFeedback(`✓ At t=${xPos}s:\nPosition: ${position.toFixed(1)} m\nInstantaneous speed: ${Math.abs(velocity).toFixed(1)} m/s`);
  };

  const reset = () => {
    setXPos(2);
    setFeedback("");
  };

  const polylinePoints = points.map((p) => `${40 + (p.t / 5) * 260},${240 - ((p.s - minS) / (maxS - minS)) * 180}`).join(" ");

  return (
    <div className="interactive-widget">
      <h4>{t("Activity")} 1: Speed Tangent</h4>
      <p className="subtext">See how the tangent line shows instantaneous speed.</p>

      <div style={{ marginTop: "1.5rem" }}>
        {/* Position graph */}
        <svg
          width="100%"
          height="320"
          viewBox="0 0 350 320"
          style={{
            border: "1px solid #e7e3df",
            borderRadius: "8px",
            background: "#faf8f5",
            marginBottom: "1.5rem",
          }}
        >
          {/* Axes */}
          <line x1="40" y1="240" x2="40" y2="20" stroke="#5b534c" strokeWidth="2" />
          <line x1="40" y1="240" x2="320" y2="240" stroke="#5b534c" strokeWidth="2" />

          {/* Grid */}
          {Array.from({ length: 5 }, (_, i) => (
            <line
              key={`hgrid-${i}`}
              x1="40"
              y1={240 - (i * 220) / 4}
              x2="320"
              y2={240 - (i * 220) / 4}
              stroke="#e7e3df"
              strokeWidth="0.5"
              strokeDasharray="3,3"
            />
          ))}

          {/* Tangent line */}
          <line
            x1={40 + (tangentPoints[0].t / 5) * 260}
            y1={240 - ((tangentPoints[0].s - minS) / (maxS - minS)) * 180}
            x2={40 + (tangentPoints[1].t / 5) * 260}
            y2={240 - ((tangentPoints[1].s - minS) / (maxS - minS)) * 180}
            stroke="#d57d3d"
            strokeWidth="2"
            strokeDasharray="3,3"
          />

          {/* Position curve */}
          <polyline points={polylinePoints} fill="none" stroke="#2f6f6a" strokeWidth="2" />

          {/* Current point */}
          <circle
            cx={40 + (xPos / 5) * 260}
            cy={240 - ((position - minS) / (maxS - minS)) * 180}
            r="5"
            fill="#d57d3d"
            stroke="#fff"
            strokeWidth="2"
          />

          {/* Labels */}
          <text x="300" y="260" fontSize="12" fontWeight="bold" fill="#5b534c">
            Time (s)
          </text>
          <text x="20" y="15" fontSize="12" fontWeight="bold" fill="#5b534c">
            Position (m)
          </text>
        </svg>

        {/* Position slider */}
        <div style={{ padding: "1rem", background: "#f7f1ea", borderRadius: "8px", marginBottom: "1.5rem" }}>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "1rem" }}>
            Time: <span style={{ color: "#d57d3d", fontSize: "1.2rem" }}>{xPos.toFixed(1)} s</span>
          </label>
          <input
            type="range"
            min="0"
            max="5"
            step="0.1"
            value={xPos}
            onChange={(e) => {
              setXPos(Number(e.target.value));
              setFeedback("");
            }}
            style={{ width: "100%" }}
          />
        </div>

        {/* Speed display */}
        <div style={{ padding: "1rem", background: "#e7f6f4", borderRadius: "8px", marginBottom: "1.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <p style={{ fontSize: "0.85rem", color: "#5b534c" }}>Position:</p>
              <p style={{ fontSize: "1.3rem", fontWeight: 700, color: "#2f6f6a" }}>{position.toFixed(1)} m</p>
            </div>
            <div>
              <p style={{ fontSize: "0.85rem", color: "#5b534c" }}>Speed (dy/dt):</p>
              <p style={{ fontSize: "1.3rem", fontWeight: 700, color: "#d57d3d" }}>{velocity.toFixed(1)} m/s</p>
            </div>
          </div>
        </div>

        {/* Info */}
        <div style={{ padding: "1rem", background: "#f7f1ea", borderRadius: "8px", marginBottom: "1.5rem", fontSize: "0.9rem", color: "#5b534c" }}>
          <p style={{ fontWeight: 600, marginBottom: "0.5rem" }}>The tangent line shows:</p>
          <p>• Slope = instantaneous speed at that moment</p>
          <p>• The derivative (rate of change)</p>
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
            Calculate Speed
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
