"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";

export default function FerrisWheel() {
  const { t } = useI18n();
  const [angle, setAngle] = useState(0);
  const [feedback, setFeedback] = useState("");

  const radius = 50;
  const centerHeight = 60;
  const height = centerHeight + radius * Math.sin((angle - 90) * (Math.PI / 180));
  const sinValue = Math.sin((angle - 90) * (Math.PI / 180));

  const handleCheck = () => {
    setFeedback(`✓ At ${angle}°: sin(${angle}°) = ${sinValue.toFixed(2)}\nCab height = ${height.toFixed(0)}m (center at ${centerHeight}m)`);
  };

  const reset = () => {
    setAngle(0);
    setFeedback("");
  };

  return (
    <div className="interactive-widget">
      <h4>{t("Activity")} 1: Ferris Wheel</h4>
      <p className="subtext">Rotate the wheel and see how sin(θ) gives the height.</p>

      <div style={{ marginTop: "1.5rem" }}>
        {/* Ferris wheel SVG */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
          <svg width="300" height="300" viewBox="0 0 300 300">
            {/* Ground */}
            <line x1="0" y1="260" x2="300" y2="260" stroke="#7cb342" strokeWidth="4" />
            {/* Base */}
            <rect x="130" y="260" width="40" height="20" fill="#5b534c" />
            {/* Center circle */}
            <circle cx="150" cy="150" r="75" fill="none" stroke="#5b534c" strokeWidth="2" />
            {/* Spokes */}
            {Array.from({ length: 8 }, (_, i) => {
              const spokeAngle = (i * 45) * (Math.PI / 180);
              const x1 = 150 + 70 * Math.cos(spokeAngle);
              const y1 = 150 + 70 * Math.sin(spokeAngle);
              return (
                <line
                  key={`spoke-${i}`}
                  x1="150"
                  y1="150"
                  x2={x1}
                  y2={y1}
                  stroke="#5b534c"
                  strokeWidth="1"
                />
              );
            })}
            {/* Wheel ring */}
            <circle cx="150" cy="150" r="70" fill="none" stroke="#5b534c" strokeWidth="2" />
            {/* Cab */}
            {(() => {
              const cabAngle = ((angle - 90) * Math.PI) / 180;
              const cabX = 150 + 70 * Math.cos(cabAngle);
              const cabY = 150 + 70 * Math.sin(cabAngle);
              return (
                <>
                  <circle cx={cabX} cy={cabY} r="8" fill="#d57d3d" stroke="#fff" strokeWidth="2" />
                  {/* Height line */}
                  <line x1={cabX} y1={cabY} x2={cabX} y2="260" stroke="#d57d3d" strokeWidth="2" strokeDasharray="3,3" />
                </>
              );
            })()}
            {/* Center marker */}
            <circle cx="150" cy="150" r="4" fill="#2f6f6a" />
            {/* Angle arc */}
            {angle > 0 && (
              <path
                d={`M 150 80 A 70 70 0 0 1 ${150 + 70 * Math.cos(((angle - 90) * Math.PI) / 180)} ${150 + 70 * Math.sin(((angle - 90) * Math.PI) / 180)}`}
                fill="none"
                stroke="#d57d3d"
                strokeWidth="1"
                strokeDasharray="3,3"
              />
            )}
          </svg>
        </div>

        {/* Angle control */}
        <div style={{ padding: "1rem", background: "#f7f1ea", borderRadius: "8px", marginBottom: "1.5rem" }}>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "1rem" }}>
            Angle: <span style={{ color: "#d57d3d", fontSize: "1.2rem" }}>{angle}°</span>
          </label>
          <input
            type="range"
            min="0"
            max="360"
            value={angle}
            onChange={(e) => {
              setAngle(Number(e.target.value));
              setFeedback("");
            }}
            style={{ width: "100%" }}
          />
        </div>

        {/* Height calculation */}
        <div style={{ padding: "1rem", background: "#e7f6f4", borderRadius: "8px", marginBottom: "1.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <p style={{ fontSize: "0.85rem", color: "#5b534c" }}>sin({angle}°):</p>
              <p style={{ fontSize: "1.3rem", fontWeight: 700, color: "#2f6f6a" }}>
                {sinValue.toFixed(2)}
              </p>
            </div>
            <div>
              <p style={{ fontSize: "0.85rem", color: "#5b534c" }}>Cab Height:</p>
              <p style={{ fontSize: "1.3rem", fontWeight: 700, color: "#d57d3d" }}>
                {height.toFixed(0)}m
              </p>
            </div>
          </div>
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
            Calculate Height
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
