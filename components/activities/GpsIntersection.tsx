"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";

export default function GpsIntersection() {
  const { t } = useI18n();
  const [slope1, setSlope1] = useState(1);
  const [slope2, setSlope2] = useState(-0.5);
  const [intercept1, setIntercept1] = useState(1);
  const [intercept2, setIntercept2] = useState(5);
  const [feedback, setFeedback] = useState("");

  // Line 1: y = slope1 * x + intercept1
  // Line 2: y = slope2 * x + intercept2
  // Intersection: slope1 * x + intercept1 = slope2 * x + intercept2

  let intersectX = 0;
  let intersectY = 0;

  if (slope1 !== slope2) {
    intersectX = (intercept2 - intercept1) / (slope1 - slope2);
    intersectY = slope1 * intersectX + intercept1;
  }

  const points1 = Array.from({ length: 7 }, (_, i) => {
    const x = (i - 3) * 2;
    const y = slope1 * x + intercept1;
    return { x, y };
  });

  const points2 = Array.from({ length: 7 }, (_, i) => {
    const x = (i - 3) * 2;
    const y = slope2 * x + intercept2;
    return { x, y };
  });

  const allPoints = [...points1, ...points2];
  const maxY = Math.max(...allPoints.map((p) => p.y));
  const minY = Math.min(...allPoints.map((p) => p.y));
  const maxX = 6;
  const minX = -6;

  const handleCheck = () => {
    if (slope1 === slope2) {
      setFeedback("Parallel lines! No intersection (or infinite solutions if same line)");
    } else {
      setFeedback(`✓ Lines intersect at (${intersectX.toFixed(1)}, ${intersectY.toFixed(1)})\nGPS location found!`);
    }
  };

  const reset = () => {
    setSlope1(1);
    setSlope2(-0.5);
    setIntercept1(1);
    setIntercept2(5);
    setFeedback("");
  };

  const scale = 20;
  const xOffset = 150;
  const yOffset = 150;

  return (
    <div className="interactive-widget">
      <h4>{t("Activity")} 3: GPS Intersection</h4>
      <p className="subtext">Adjust two signal lines to find their intersection point.</p>

      <div style={{ marginTop: "1.5rem" }}>
        {/* Graph */}
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
          <line x1={xOffset} y1={yOffset - 100} x2={xOffset} y2={yOffset + 100} stroke="#5b534c" strokeWidth="2" />
          <line x1={xOffset - 100} y1={yOffset} x2={xOffset + 100} y2={yOffset} stroke="#5b534c" strokeWidth="2" />

          {/* Grid */}
          {Array.from({ length: 13 }, (_, i) => (
            <g key={`grid-${i}`}>
              <line x1={xOffset - 100} y1={yOffset - 100 + i * 16.67} x2={xOffset + 100} y2={yOffset - 100 + i * 16.67} stroke="#e7e3df" strokeWidth="0.5" strokeDasharray="3,3" />
              <line x1={xOffset - 100 + i * 16.67} y1={yOffset - 100} x2={xOffset - 100 + i * 16.67} y2={yOffset + 100} stroke="#e7e3df" strokeWidth="0.5" strokeDasharray="3,3" />
            </g>
          ))}

          {/* Line 1 */}
          <polyline
            points={points1.map((p) => `${xOffset + p.x * scale},${yOffset - p.y * scale}`).join(" ")}
            fill="none"
            stroke="#d57d3d"
            strokeWidth="2"
          />

          {/* Line 2 */}
          <polyline
            points={points2.map((p) => `${xOffset + p.x * scale},${yOffset - p.y * scale}`).join(" ")}
            fill="none"
            stroke="#2f6f6a"
            strokeWidth="2"
          />

          {/* Intersection point */}
          {slope1 !== slope2 && (
            <circle
              cx={xOffset + intersectX * scale}
              cy={yOffset - intersectY * scale}
              r="5"
              fill="#7cb342"
              stroke="#fff"
              strokeWidth="2"
            />
          )}

          {/* Legend */}
          <line x1="20" y1="20" x2="35" y2="20" stroke="#d57d3d" strokeWidth="2" />
          <text x="40" y="25" fontSize="12" fontWeight="bold" fill="#5b534c">
            Signal 1
          </text>
          <line x1="20" y1="40" x2="35" y2="40" stroke="#2f6f6a" strokeWidth="2" />
          <text x="40" y="45" fontSize="12" fontWeight="bold" fill="#5b534c">
            Signal 2
          </text>
        </svg>

        {/* Controls */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem", padding: "1rem", background: "#f7f1ea", borderRadius: "8px" }}>
          <div>
            <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>
              Line 1 slope: <span style={{ color: "#d57d3d" }}>{slope1.toFixed(1)}</span>
            </label>
            <input
              type="range"
              min="-2"
              max="2"
              step="0.1"
              value={slope1}
              onChange={(e) => {
                setSlope1(Number(e.target.value));
                setFeedback("");
              }}
              style={{ width: "100%" }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>
              Line 2 slope: <span style={{ color: "#2f6f6a" }}>{slope2.toFixed(1)}</span>
            </label>
            <input
              type="range"
              min="-2"
              max="2"
              step="0.1"
              value={slope2}
              onChange={(e) => {
                setSlope2(Number(e.target.value));
                setFeedback("");
              }}
              style={{ width: "100%" }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>
              Line 1 intercept: <span style={{ color: "#d57d3d" }}>{intercept1.toFixed(1)}</span>
            </label>
            <input
              type="range"
              min="-5"
              max="5"
              step="0.1"
              value={intercept1}
              onChange={(e) => {
                setIntercept1(Number(e.target.value));
                setFeedback("");
              }}
              style={{ width: "100%" }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>
              Line 2 intercept: <span style={{ color: "#2f6f6a" }}>{intercept2.toFixed(1)}</span>
            </label>
            <input
              type="range"
              min="-5"
              max="5"
              step="0.1"
              value={intercept2}
              onChange={(e) => {
                setIntercept2(Number(e.target.value));
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
            Find Intersection
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
