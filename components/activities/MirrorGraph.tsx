"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";

export default function MirrorGraph() {
  const { t } = useI18n();
  const [showInverse, setShowInverse] = useState(false);
  const [feedback, setFeedback] = useState("");

  // Original function: y = sqrt(x) approximated as points
  const fPoints = Array.from({ length: 21 }, (_, i) => {
    const x = (i / 20) * 10;
    const y = Math.sqrt(x * 2.5);
    return { x, y };
  });

  const invPoints = fPoints.map((p) => ({ x: p.y, y: p.x }));

  const handleCheck = () => {
    setFeedback(
      "✓ The inverse function (blue) is the original function (red) flipped across y=x. If f(a)=b then f⁻¹(b)=a!"
    );
  };

  const reset = () => {
    setShowInverse(false);
    setFeedback("");
  };

  return (
    <div className="interactive-widget">
      <h4>{t("Activity")} 3: Mirror Graph</h4>
      <p className="subtext">Toggle the inverse function and see it mirror across y=x.</p>

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
          <line x1="40" y1="280" x2="40" y2="20" stroke="#5b534c" strokeWidth="2" />
          <line x1="40" y1="280" x2="340" y2="280" stroke="#5b534c" strokeWidth="2" />

          {/* Grid */}
          {Array.from({ length: 5 }, (_, i) => (
            <g key={`grid-${i}`}>
              <line
                x1="40"
                y1={280 - (i * 260) / 4}
                x2="340"
                y2={280 - (i * 260) / 4}
                stroke="#e7e3df"
                strokeWidth="0.5"
                strokeDasharray="3,3"
              />
              <line
                x1={40 + (i * 300) / 4}
                y1="280"
                x2={40 + (i * 300) / 4}
                y2="20"
                stroke="#e7e3df"
                strokeWidth="0.5"
                strokeDasharray="3,3"
              />
            </g>
          ))}

          {/* y=x mirror line */}
          <line x1="40" y1="280" x2="340" y2="20" stroke="#999" strokeWidth="1" strokeDasharray="5,5" />
          <text x="320" y="40" fontSize="11" fill="#999">
            y=x
          </text>

          {/* Original function */}
          <polyline
            points={fPoints.map((p) => `${40 + (p.x / 10) * 300},${280 - (p.y / 5.5) * 260}`).join(" ")}
            fill="none"
            stroke="#d57d3d"
            strokeWidth="2"
          />

          {/* Inverse function */}
          {showInverse && (
            <polyline
              points={invPoints.map((p) => `${40 + (p.x / 5.5) * 300},${280 - (p.y / 10) * 260}`).join(" ")}
              fill="none"
              stroke="#2f6f6a"
              strokeWidth="2"
            />
          )}

          {/* Legend */}
          <line x1="20" y1="10" x2="35" y2="10" stroke="#d57d3d" strokeWidth="2" />
          <text x="40" y="15" fontSize="12" fontWeight="bold">
            f(x)
          </text>
          {showInverse && (
            <>
              <line x1="20" y1="30" x2="35" y2="30" stroke="#2f6f6a" strokeWidth="2" />
              <text x="40" y="35" fontSize="12" fontWeight="bold">
                f⁻¹(x)
              </text>
            </>
          )}
        </svg>

        {/* Toggle button */}
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <button
            onClick={() => {
              setShowInverse(!showInverse);
              setFeedback("");
            }}
            style={{
              padding: "0.8rem 2rem",
              background: showInverse ? "#2f6f6a" : "#d57d3d",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontWeight: 700,
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            {showInverse ? "Hide Inverse" : "Show Inverse"}
          </button>
        </div>

        {/* Info */}
        <div style={{ padding: "1rem", background: "#f7f1ea", borderRadius: "8px", marginBottom: "1.5rem" }}>
          <p style={{ fontWeight: 600, marginBottom: "0.5rem" }}>How inverse functions work:</p>
          <ul style={{ fontSize: "0.9rem", color: "#5b534c", lineHeight: "1.6", marginLeft: "1.5rem" }}>
            <li>If f(x) = y, then f⁻¹(y) = x</li>
            <li>The inverse is the reflection across the line y = x</li>
            <li>Domain of f = Range of f⁻¹</li>
          </ul>
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
            Explain
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
