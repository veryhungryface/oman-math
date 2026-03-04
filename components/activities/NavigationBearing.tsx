"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";

export default function NavigationBearing() {
  const { t } = useI18n();
  const [angle, setAngle] = useState(0);
  const [feedback, setFeedback] = useState("");

  const targetAngle = 45; // Northeast
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const directionIndex = Math.round(angle / 45) % 8;
  const direction = directions[directionIndex];

  const handleCheck = () => {
    if (Math.abs(angle - targetAngle) < 5) {
      setFeedback(`✓ Correct! ${angle}° is ${direction}. The ship reaches port!`);
    } else {
      setFeedback(`The target port is at 45° (Northeast). You're heading ${direction}.`);
    }
  };

  const reset = () => {
    setAngle(0);
    setFeedback("");
  };

  const x = 150 + 80 * Math.cos((angle - 90) * (Math.PI / 180));
  const y = 150 + 80 * Math.sin((angle - 90) * (Math.PI / 180));

  return (
    <div className="interactive-widget">
      <h4>{t("Activity")} 3: Navigation Bearing</h4>
      <p className="subtext">Navigate the ship to the target port using bearings.</p>

      <div style={{ marginTop: "1.5rem" }}>
        {/* Compass */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
          <svg width="320" height="320" viewBox="0 0 300 300">
            {/* Compass circle */}
            <circle cx="150" cy="150" r="140" fill="#f7f1ea" stroke="#5b534c" strokeWidth="2" />

            {/* Direction markers */}
            {directions.map((dir, i) => {
              const rad = (i * 45) * (Math.PI / 180);
              const x1 = 150 + 130 * Math.cos(rad - Math.PI / 2);
              const y1 = 150 + 130 * Math.sin(rad - Math.PI / 2);
              const x2 = 150 + 140 * Math.cos(rad - Math.PI / 2);
              const y2 = 150 + 140 * Math.sin(rad - Math.PI / 2);
              return (
                <g key={dir}>
                  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#5b534c" strokeWidth="2" />
                  <text
                    x={150 + 115 * Math.cos(rad - Math.PI / 2)}
                    y={150 + 115 * Math.sin(rad - Math.PI / 2)}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="14"
                    fontWeight="bold"
                  >
                    {dir}
                  </text>
                </g>
              );
            })}

            {/* Current heading line */}
            <line x1="150" y1="150" x2={x} y2={y} stroke="#d57d3d" strokeWidth="3" />

            {/* Ship */}
            <circle cx="150" cy="150" r="8" fill="#2f6f6a" />

            {/* Target port */}
            <circle cx={150 + 80 * Math.cos((targetAngle - 90) * (Math.PI / 180))} cy={150 + 80 * Math.sin((targetAngle - 90) * (Math.PI / 180))} r="10" fill="#c8e6c9" stroke="#2d5016" strokeWidth="2" />
            <text
              x={150 + 80 * Math.cos((targetAngle - 90) * (Math.PI / 180))}
              y={150 + 80 * Math.sin((targetAngle - 90) * (Math.PI / 180)) + 20}
              textAnchor="middle"
              fontSize="12"
              fontWeight="bold"
            >
              PORT
            </text>
          </svg>
        </div>

        {/* Bearing input */}
        <div style={{ padding: "1rem", background: "#f7f1ea", borderRadius: "8px", marginBottom: "1.5rem" }}>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "1rem" }}>
            Set bearing: <span style={{ color: "#d57d3d", fontSize: "1.3rem" }}>{angle}°</span>
          </label>
          <input
            type="range"
            min="0"
            max="359"
            value={angle}
            onChange={(e) => {
              setAngle(Number(e.target.value));
              setFeedback("");
            }}
            style={{ width: "100%" }}
          />
        </div>

        {/* Current direction */}
        <div style={{ textAlign: "center", marginBottom: "1.5rem", padding: "1rem", background: "#e7f6f4", borderRadius: "8px" }}>
          <p style={{ fontSize: "0.9rem", color: "#5b534c", marginBottom: "0.3rem" }}>Current heading:</p>
          <p style={{ fontSize: "1.5rem", fontWeight: 700, color: "#2f6f6a" }}>{direction}</p>
          <p style={{ fontSize: "1.1rem", color: "#5b534c" }}>({angle}°)</p>
        </div>

        {/* Feedback */}
        {feedback && (
          <div
            style={{
              padding: "0.8rem 1rem",
              borderRadius: "8px",
              marginBottom: "1rem",
              background: feedback.includes("✓") ? "#c8e6c9" : "#f6e2d1",
              color: feedback.includes("✓") ? "#2d5016" : "#7a4a2b",
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
            Check Heading
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
