"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";

export default function BallThrow() {
  const { t } = useI18n();
  const [a, setA] = useState(-1);
  const [h, setH] = useState(1);
  const [k, setK] = useState(2);
  const [feedback, setFeedback] = useState("");

  // y = a(x - h)^2 + k
  const maxHeight = k;
  const apex = h;

  // Find where ball hits ground (y = 0)
  // 0 = a(x - h)^2 + k
  // (x - h)^2 = -k/a
  let hitDistance = "N/A";
  if (a < 0) {
    hitDistance = (h + Math.sqrt(-k / a)).toFixed(1);
  }

  const points = Array.from({ length: 11 }, (_, i) => {
    const x = (i * apex * 2) / 10;
    const y = a * Math.pow(x - h, 2) + k;
    return { x, y };
  }).filter((p) => p.y >= 0);

  const maxY = Math.max(...points.map((p) => p.y));
  const maxX = Math.max(...points.map((p) => p.x));

  const polylinePoints = points.map((p) => `${(p.x / maxX) * 240},${200 - (p.y / maxY) * 150}`).join(" ");

  const handleCheck = () => {
    setFeedback(`✓ Ball reaches max height: ${maxHeight}m at ${apex}m distance\nBall lands at: ${hitDistance}m`);
  };

  const reset = () => {
    setA(-1);
    setH(1);
    setK(2);
    setFeedback("");
  };

  return (
    <div className="interactive-widget">
      <h4>{t("Activity")} 1: Ball Throw</h4>
      <p className="subtext">Adjust parabola parameters to model a thrown ball&apos;s trajectory.</p>

      <div style={{ marginTop: "1.5rem" }}>
        {/* Parabola trajectory */}
        <svg
          width="100%"
          height="280"
          viewBox="0 0 300 250"
          style={{ border: "1px solid #e7e3df", borderRadius: "8px", background: "#faf8f5", marginBottom: "1.5rem" }}
        >
          {/* Ground */}
          <line x1="0" y1="200" x2="300" y2="200" stroke="#7cb342" strokeWidth="3" />
          {/* Axes */}
          <line x1="40" y1="200" x2="40" y2="20" stroke="#5b534c" strokeWidth="1" strokeDasharray="3,3" />
          <line x1="40" y1="200" x2="280" y2="200" stroke="#5b534c" strokeWidth="1" strokeDasharray="3,3" />
          {/* Ball trajectory */}
          {points.length > 0 && (
            <>
              <polyline points={polylinePoints} fill="none" stroke="#d57d3d" strokeWidth="2" />
              {/* Ball position at apex */}
              <circle cx={40 + (apex / maxX) * 240} cy={200 - (maxHeight / maxY) * 150} r="4" fill="#d57d3d" />
            </>
          )}
        </svg>

        {/* Controls */}
        <div style={{ padding: "1rem", background: "#f7f1ea", borderRadius: "8px", marginBottom: "1.5rem" }}>
          <div style={{ marginBottom: "1.2rem" }}>
            <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>
              Curve (a): <span style={{ color: "#d57d3d" }}>{a.toFixed(1)}</span>
            </label>
            <input
              type="range"
              min="-2"
              max="-0.5"
              step="0.1"
              value={a}
              onChange={(e) => {
                setA(Number(e.target.value));
                setFeedback("");
              }}
              style={{ width: "100%" }}
            />
          </div>

          <div style={{ marginBottom: "1.2rem" }}>
            <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>
              Apex X (h): <span style={{ color: "#d57d3d" }}>{h.toFixed(1)}</span>
            </label>
            <input
              type="range"
              min="0.5"
              max="4"
              step="0.1"
              value={h}
              onChange={(e) => {
                setH(Number(e.target.value));
                setFeedback("");
              }}
              style={{ width: "100%" }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>
              Max height (k): <span style={{ color: "#d57d3d" }}>{k.toFixed(1)}</span>
            </label>
            <input
              type="range"
              min="0.5"
              max="4"
              step="0.1"
              value={k}
              onChange={(e) => {
                setK(Number(e.target.value));
                setFeedback("");
              }}
              style={{ width: "100%" }}
            />
          </div>
        </div>

        {/* Equation display */}
        <div style={{ padding: "1rem", background: "#e7f6f4", borderRadius: "8px", marginBottom: "1.5rem", textAlign: "center" }}>
          <p style={{ fontSize: "0.9rem", color: "#5b534c", marginBottom: "0.3rem" }}>Equation:</p>
          <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "#2f6f6a" }}>y = {a.toFixed(1)}(x - {h.toFixed(1)})² + {k.toFixed(1)}</p>
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
            Calculate
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
