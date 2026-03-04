"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";

export default function ProfitRegion() {
  const { t } = useI18n();
  const [feedback, setFeedback] = useState("");

  // Profit function: P(x) = -2x^2 + 8x + 10
  // Zeros at x ≈ -1 and x ≈ 5
  const points = Array.from({ length: 13 }, (_, i) => {
    const x = (i / 2) - 1;
    const y = -2 * x * x + 8 * x + 10;
    return { x, y };
  });

  const maxY = Math.max(...points.map((p) => p.y));
  const minY = Math.min(...points.map((p) => p.y));
  const range = maxY - minY;

  const profitablePoints = points.filter((p) => p.y > 0);
  const minProfit = 0;
  const maxProfit = Math.max(...points.map((p) => Math.max(0, p.y)));

  const handleCheck = () => {
    setFeedback(
      `✓ Profit is positive between x ≈ -1 and x ≈ 5\nProfit range: €0 to €${maxProfit.toFixed(0)}\nBest profit at x ≈ 2 units`
    );
  };

  const reset = () => {
    setFeedback("");
  };

  return (
    <div className="interactive-widget">
      <h4>{t("Activity")} 4: Profit Region</h4>
      <p className="subtext">Shade the region where profit is positive.</p>

      <div style={{ marginTop: "1.5rem" }}>
        {/* Graph with shaded region */}
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
          <line x1="50" y1="250" x2="50" y2="20" stroke="#5b534c" strokeWidth="2" />
          <line x1="50" y1="250" x2="330" y2="250" stroke="#5b534c" strokeWidth="2" />

          {/* x-axis label */}
          <text x="320" y="270" fontSize="12" fontWeight="bold">
            Units
          </text>
          {/* y-axis label */}
          <text x="20" y="30" fontSize="12" fontWeight="bold">
            Profit (€)
          </text>

          {/* Profit shading (green for positive) */}
          {profitablePoints.length > 0 && (
            <polygon
              points={[
                { x: profitablePoints[0].x, y: 0 },
                ...profitablePoints,
                { x: profitablePoints[profitablePoints.length - 1].x, y: 0 },
              ]
                .map((p) => `${50 + ((p.x + 1) / 6) * 280},${250 - ((p.y - minY) / range) * 230}`)
                .join(" ")}
              fill="#c8e6c9"
              opacity="0.5"
            />
          )}

          {/* Break-even line */}
          <line x1="50" y1="250" x2="330" y2="250" stroke="#d57d3d" strokeWidth="2" strokeDasharray="5,5" />

          {/* Profit curve */}
          <polyline
            points={points
              .map((p) => `${50 + ((p.x + 1) / 6) * 280},${250 - ((p.y - minY) / range) * 230}`)
              .join(" ")}
            fill="none"
            stroke="#d57d3d"
            strokeWidth="3"
          />

          {/* Grid lines */}
          {Array.from({ length: 6 }, (_, i) => (
            <line
              key={`gridx-${i}`}
              x1={50 + (i * 280) / 5}
              y1="240"
              x2={50 + (i * 280) / 5}
              y2="260"
              stroke="#5b534c"
              strokeWidth="1"
            />
          ))}

          {/* Labels */}
          {Array.from({ length: 6 }, (_, i) => (
            <text
              key={`labelx-${i}`}
              x={50 + (i * 280) / 5}
              y="280"
              textAnchor="middle"
              fontSize="11"
            >
              {(i - 1) * 2}
            </text>
          ))}
        </svg>

        {/* Info box */}
        <div style={{ padding: "1rem", background: "#f7f1ea", borderRadius: "8px", marginBottom: "1.5rem" }}>
          <p style={{ fontWeight: 600, marginBottom: "0.8rem" }}>Profit Function: P(x) = -2x² + 8x + 10</p>
          <p style={{ fontSize: "0.9rem", color: "#5b534c", marginBottom: "0.5rem" }}>
            🟢 Green shaded region = Positive profit (P(x) &gt; 0)
          </p>
          <p style={{ fontSize: "0.9rem", color: "#5b534c" }}>
            🔴 Red line = Break-even point (P(x) = 0)
          </p>
        </div>

        {/* Feedback */}
        {feedback && (
          <div
            style={{
              padding: "0.8rem 1rem",
              borderRadius: "8px",
              marginBottom: "1rem",
              background: "#c8e6c9",
              color: "#2d5016",
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
            Find Profit Region
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
