"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";

export default function FenceBuilder() {
  const { t } = useI18n();
  const [width, setWidth] = useState(6);
  const [height, setHeight] = useState(4);
  const [feedback, setFeedback] = useState("");

  const perimeter = 2 * (width + height);
  const area = width * height;

  const handleCheck = () => {
    setFeedback(`✓ Garden: ${width}m × ${height}m | Perimeter: ${perimeter}m (${perimeter} fence posts needed) | Area: ${area} sq meters`);
  };

  const reset = () => {
    setWidth(6);
    setHeight(4);
    setFeedback("");
  };

  return (
    <div className="interactive-widget">
      <h4>{t("Activity")} 2: Fence Builder</h4>
      <p className="subtext">Design a rectangular garden and calculate how much fence you need.</p>

      <div style={{ marginTop: "1.5rem" }}>
        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.8rem" }}>
            Width: <span style={{ color: "#d57d3d", fontSize: "1.2rem" }}>{width}m</span>
          </label>
          <input
            type="range"
            min="2"
            max="12"
            value={width}
            onChange={(e) => {
              setWidth(Number(e.target.value));
              setFeedback("");
            }}
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.8rem" }}>
            Height: <span style={{ color: "#d57d3d", fontSize: "1.2rem" }}>{height}m</span>
          </label>
          <input
            type="range"
            min="2"
            max="12"
            value={height}
            onChange={(e) => {
              setHeight(Number(e.target.value));
              setFeedback("");
            }}
            style={{ width: "100%" }}
          />
        </div>

        {/* Garden visualization */}
        <div
          style={{
            marginTop: "2rem",
            marginBottom: "1.5rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <svg width="300" height="250" viewBox="0 0 300 250">
            {/* Garden */}
            <rect x="50" y="40" width="200" height={(height / width) * 200} fill="#c8e6c9" stroke="#2d5016" strokeWidth="3" />
            {/* Grid */}
            <defs>
              <pattern id="garden-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#a5d6a7" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect x="50" y="40" width="200" height={(height / width) * 200} fill="url(#garden-grid)" />
            {/* Fence */}
            <rect x="50" y="40" width="200" height={(height / width) * 200} fill="none" stroke="#d57d3d" strokeWidth="2" strokeDasharray="5,5" />
            {/* Dimensions */}
            <text x="150" y="260" textAnchor="middle" fontSize="14" fontWeight="bold">
              {width}m
            </text>
            <text x="30" y={40 + (height / width) * 100} textAnchor="end" fontSize="14" fontWeight="bold" dominantBaseline="middle">
              {height}m
            </text>
          </svg>
        </div>

        {/* Calculations */}
        <div style={{ padding: "1rem", background: "#f7f1ea", borderRadius: "8px", marginBottom: "1.5rem" }}>
          <div style={{ marginBottom: "1rem" }}>
            <p style={{ fontSize: "0.9rem", color: "#5b534c" }}>Area (how much grass):</p>
            <p style={{ fontSize: "1.4rem", fontWeight: 700, color: "#2d5016" }}>
              {width}m × {height}m = {area} m²
            </p>
          </div>
          <div>
            <p style={{ fontSize: "0.9rem", color: "#5b534c" }}>Perimeter (fence length):</p>
            <p style={{ fontSize: "1.4rem", fontWeight: 700, color: "#d57d3d" }}>
              2 × ({width}m + {height}m) = {perimeter}m
            </p>
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
            Check Answer
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
