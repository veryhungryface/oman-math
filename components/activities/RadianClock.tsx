"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";

export default function RadianClock() {
  const { t } = useI18n();
  const [degrees, setDegrees] = useState(0);
  const [feedback, setFeedback] = useState("");

  const radians = (degrees * Math.PI) / 180;
  const radiansText = (degrees === 0 ? "0" : degrees === 90 ? "π/2" : degrees === 180 ? "π" : degrees === 270 ? "3π/2" : degrees === 360 ? "2π" : `${(radians / Math.PI).toFixed(2)}π`);

  const handleCheck = () => {
    setFeedback(`✓ ${degrees}° = ${radians.toFixed(3)} radians = ${radiansText}`);
  };

  const reset = () => {
    setDegrees(0);
    setFeedback("");
  };

  const getClock = () => {
    const angle = (degrees * Math.PI) / 180;
    const x = 150 + 80 * Math.cos(angle - Math.PI / 2);
    const y = 150 + 80 * Math.sin(angle - Math.PI / 2);
    return { x, y };
  };

  const position = getClock();

  return (
    <div className="interactive-widget">
      <h4>{t("Activity")} 2: Radian Clock</h4>
      <p className="subtext">Convert degrees to radians and visualize on a unit circle.</p>

      <div style={{ marginTop: "1.5rem" }}>
        {/* Unit circle */}
        <svg width="300" height="300" viewBox="0 0 300 300" style={{ border: "1px solid #e7e3df", borderRadius: "8px", background: "#faf8f5", margin: "0 auto 1.5rem" }}>
          {/* Circle */}
          <circle cx="150" cy="150" r="80" fill="none" stroke="#5b534c" strokeWidth="2" />
          {/* Quadrant lines */}
          <line x1="70" y1="150" x2="230" y2="150" stroke="#e7e3df" strokeWidth="1" />
          <line x1="150" y1="70" x2="150" y2="230" stroke="#e7e3df" strokeWidth="1" />
          {/* Angle arc */}
          {degrees > 0 && (
            <path
              d={`M 150 70 A 80 80 0 0 1 ${position.x} ${position.y}`}
              fill="none"
              stroke="#d57d3d"
              strokeWidth="2"
              strokeDasharray="3,3"
            />
          )}
          {/* Radius line */}
          <line x1="150" y1="150" x2={position.x} y2={position.y} stroke="#d57d3d" strokeWidth="2" />
          {/* Point */}
          <circle cx={position.x} cy={position.y} r="5" fill="#d57d3d" />
          {/* Center */}
          <circle cx="150" cy="150" r="3" fill="#5b534c" />
          {/* Labels */}
          <text x="230" y="155" fontSize="12" fontWeight="bold" fill="#5b534c">
            0
          </text>
          <text x="145" y="65" fontSize="12" fontWeight="bold" fill="#5b534c">
            π/2
          </text>
          <text x="65" y="155" fontSize="12" fontWeight="bold" fill="#5b534c">
            π
          </text>
          <text x="145" y="245" fontSize="12" fontWeight="bold" fill="#5b534c">
            3π/2
          </text>
        </svg>

        {/* Degree input */}
        <div style={{ padding: "1rem", background: "#f7f1ea", borderRadius: "8px", marginBottom: "1.5rem" }}>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "1rem" }}>
            Degrees: <span style={{ color: "#d57d3d", fontSize: "1.2rem" }}>{degrees}°</span>
          </label>
          <input
            type="range"
            min="0"
            max="360"
            value={degrees}
            onChange={(e) => {
              setDegrees(Number(e.target.value));
              setFeedback("");
            }}
            style={{ width: "100%" }}
          />
        </div>

        {/* Conversion display */}
        <div style={{ padding: "1rem", background: "#e7f6f4", borderRadius: "8px", marginBottom: "1.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <p style={{ fontSize: "0.85rem", color: "#5b534c" }}>Degrees:</p>
              <p style={{ fontSize: "1.3rem", fontWeight: 700, color: "#2f6f6a" }}>{degrees}°</p>
            </div>
            <div>
              <p style={{ fontSize: "0.85rem", color: "#5b534c" }}>Radians:</p>
              <p style={{ fontSize: "1.3rem", fontWeight: 700, color: "#2f6f6a" }}>
                {radiansText} ({radians.toFixed(2)})
              </p>
            </div>
          </div>
        </div>

        {/* Reference */}
        <div style={{ padding: "1rem", background: "#f7f1ea", borderRadius: "8px", marginBottom: "1.5rem", fontSize: "0.9rem", color: "#5b534c" }}>
          <p style={{ fontWeight: 600, marginBottom: "0.5rem" }}>Key values:</p>
          <p>0° = 0 | 90° = π/2 | 180° = π | 270° = 3π/2 | 360° = 2π</p>
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
            Convert
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
