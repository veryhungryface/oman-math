"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";

type StationaryPoint = {
  x: number;
  type: "max" | "min";
};

export default function RollerCoaster() {
  const { t } = useI18n();
  const [selected, setSelected] = useState<number[]>([]);
  const [feedback, setFeedback] = useState("");

  // f(x) = 0.1x^4 - 0.5x^2 + 1
  // f'(x) = 0.4x^3 - x
  // Stationary points: 0.4x^3 - x = 0 => x(0.4x^2 - 1) = 0 => x = 0, ±1.58

  const stationaryPoints: StationaryPoint[] = [
    { x: -1.58, type: "max" },
    { x: 0, type: "min" },
    { x: 1.58, type: "max" },
  ];

  const points = Array.from({ length: 41 }, (_, i) => {
    const x = (i / 5 - 4);
    const y = 0.1 * x * x * x * x - 0.5 * x * x + 1;
    return { x, y };
  });

  const maxY = Math.max(...points.map((p) => p.y));
  const minY = Math.min(...points.map((p) => p.y));

  const polylinePoints = points.map((p) => `${40 + ((p.x + 4) / 8) * 280},${240 - ((p.y - minY) / (maxY - minY)) * 180}`).join(" ");

  const correctSelection = stationaryPoints.map((_, i) => i);
  const isCorrect = selected.length === correctSelection.length && selected.every((s) => correctSelection.includes(s));

  const handleCheck = () => {
    if (isCorrect) {
      setFeedback("✓ All stationary points found! Where f'(x) = 0, the slope is zero.");
    } else {
      setFeedback(`Find ${stationaryPoints.length} stationary points where the slope is zero.`);
    }
  };

  const reset = () => {
    setSelected([]);
    setFeedback("");
  };

  return (
    <div className="interactive-widget">
      <h4>{t("Activity")} 2: Roller Coaster</h4>
      <p className="subtext">Click on all the stationary points (where slope = 0).</p>

      <div style={{ marginTop: "1.5rem" }}>
        {/* Graph with clickable points */}
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

          {/* Curve */}
          <polyline points={polylinePoints} fill="none" stroke="#d57d3d" strokeWidth="2" />

          {/* Clickable stationary points */}
          {stationaryPoints.map((sp, idx) => {
            const x = 40 + ((sp.x + 4) / 8) * 280;
            const y = 0.1 * sp.x * sp.x * sp.x * sp.x - 0.5 * sp.x * sp.x + 1;
            const screenY = 240 - ((y - minY) / (maxY - minY)) * 180;
            const isSelected = selected.includes(idx);
            return (
              <g key={`sp-${idx}`}>
                <circle
                  cx={x}
                  cy={screenY}
                  r={isSelected ? 8 : 6}
                  fill={isSelected ? "#7cb342" : "transparent"}
                  stroke={isSelected ? "#7cb342" : "#d57d3d"}
                  strokeWidth={2}
                  onClick={() => {
                    setSelected((prev) => (prev.includes(idx) ? prev.filter((s) => s !== idx) : [...prev, idx]));
                    setFeedback("");
                  }}
                  style={{ cursor: "pointer" }}
                />
                <text x={x} y={screenY - 15} textAnchor="middle" fontSize="10" fill={isSelected ? "#7cb342" : "#d57d3d"} fontWeight="bold">
                  {sp.type === "max" ? "Max" : "Min"}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Instructions */}
        <div style={{ padding: "1rem", background: "#f7f1ea", borderRadius: "8px", marginBottom: "1.5rem" }}>
          <p style={{ fontWeight: 600, marginBottom: "0.5rem" }}>Click on stationary points:</p>
          <p style={{ fontSize: "0.9rem", color: "#5b534c" }}>
            Points where the derivative = 0 (peaks and valleys). You found {selected.length} of {stationaryPoints.length}.
          </p>
        </div>

        {/* Feedback */}
        {feedback && (
          <div
            style={{
              padding: "0.8rem 1rem",
              borderRadius: "8px",
              marginBottom: "1rem",
              background: isCorrect ? "#c8e6c9" : "#f6e2d1",
              color: isCorrect ? "#2d5016" : "#7a4a2b",
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
            Check
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
