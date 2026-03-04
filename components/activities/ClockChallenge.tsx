"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";

export default function ClockChallenge() {
  const { t } = useI18n();
  const [hours, setHours] = useState(3);
  const [minutes, setMinutes] = useState(0);
  const [feedback, setFeedback] = useState("");

  const targetHours = 7;
  const targetMinutes = 30;

  const hourDegrees = (hours % 12) * 30 + minutes * 0.5;
  const minuteDegrees = minutes * 6;

  const handleCheck = () => {
    if (hours === targetHours && minutes === targetMinutes) {
      setFeedback(`✓ Perfect! You set the time to ${targetHours}:${targetMinutes.toString().padStart(2, "0")}`);
    } else {
      setFeedback(`Try again! Target time is ${targetHours}:${targetMinutes.toString().padStart(2, "0")}`);
    }
  };

  const reset = () => {
    setHours(3);
    setMinutes(0);
    setFeedback("");
  };

  return (
    <div className="interactive-widget">
      <h4>{t("Activity")} 4: Clock Challenge</h4>
      <p className="subtext">Set the analog clock to match the target time.</p>

      <div style={{ marginTop: "1.5rem" }}>
        <p style={{ fontWeight: 600, marginBottom: "1.5rem", textAlign: "center" }}>
          Target time: <span style={{ color: "#d57d3d", fontSize: "1.3rem" }}>{targetHours}:{targetMinutes.toString().padStart(2, "0")}</span>
        </p>

        {/* Clock SVG */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
          <svg width="280" height="280" viewBox="0 0 280 280">
            {/* Clock face */}
            <circle cx="140" cy="140" r="130" fill="#faf8f5" stroke="#5b534c" strokeWidth="3" />

            {/* Hour markers */}
            {Array.from({ length: 12 }, (_, i) => {
              const angle = (i * 30) * (Math.PI / 180);
              const x1 = 140 + 110 * Math.cos(angle - Math.PI / 2);
              const y1 = 140 + 110 * Math.sin(angle - Math.PI / 2);
              const x2 = 140 + 120 * Math.cos(angle - Math.PI / 2);
              const y2 = 140 + 120 * Math.sin(angle - Math.PI / 2);
              return (
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#5b534c" strokeWidth="2" />
              );
            })}

            {/* Hour numbers */}
            {Array.from({ length: 12 }, (_, i) => {
              const num = i === 0 ? 12 : i;
              const angle = (i * 30) * (Math.PI / 180);
              const x = 140 + 95 * Math.cos(angle - Math.PI / 2);
              const y = 140 + 95 * Math.sin(angle - Math.PI / 2);
              return (
                <text key={`num-${i}`} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fontSize="14" fontWeight="bold">
                  {num}
                </text>
              );
            })}

            {/* Hour hand */}
            <line
              x1="140"
              y1="140"
              x2={140 + 60 * Math.cos((hourDegrees - 90) * (Math.PI / 180))}
              y2={140 + 60 * Math.sin((hourDegrees - 90) * (Math.PI / 180))}
              stroke="#d57d3d"
              strokeWidth="6"
              strokeLinecap="round"
            />

            {/* Minute hand */}
            <line
              x1="140"
              y1="140"
              x2={140 + 85 * Math.cos((minuteDegrees - 90) * (Math.PI / 180))}
              y2={140 + 85 * Math.sin((minuteDegrees - 90) * (Math.PI / 180))}
              stroke="#2f6f6a"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Center dot */}
            <circle cx="140" cy="140" r="6" fill="#5b534c" />
          </svg>
        </div>

        {/* Digital display */}
        <div style={{ textAlign: "center", marginBottom: "1.5rem", padding: "1rem", background: "#f7f1ea", borderRadius: "8px" }}>
          <p style={{ fontSize: "0.9rem", color: "#5b534c", marginBottom: "0.5rem" }}>Current time:</p>
          <p style={{ fontSize: "2rem", fontWeight: 700, fontFamily: "monospace", color: "#d57d3d" }}>
            {hours}:{minutes.toString().padStart(2, "0")}
          </p>
        </div>

        {/* Controls */}
        <div style={{ marginBottom: "1.5rem" }}>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>
              Hours: <span style={{ color: "#d57d3d" }}>{hours}</span>
            </label>
            <input
              type="range"
              min="0"
              max="11"
              value={hours}
              onChange={(e) => {
                setHours(Number(e.target.value));
                setFeedback("");
              }}
              style={{ width: "100%" }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>
              Minutes: <span style={{ color: "#d57d3d" }}>{minutes.toString().padStart(2, "0")}</span>
            </label>
            <input
              type="range"
              min="0"
              max="59"
              step="5"
              value={minutes}
              onChange={(e) => {
                setMinutes(Number(e.target.value));
                setFeedback("");
              }}
              style={{ width: "100%" }}
            />
          </div>
        </div>

        {/* Feedback */}
        {feedback && (
          <div
            style={{
              padding: "0.8rem 1rem",
              borderRadius: "8px",
              marginBottom: "1rem",
              background: feedback.includes("✓") ? "#e7f6f4" : "#f6e2d1",
              color: feedback.includes("✓") ? "#1a4a47" : "#7a4a2b",
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
            Check Time
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
