"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";

export default function TreasureMapScale() {
  const { t } = useI18n();
  const [scale, setScale] = useState(2);
  const [feedback, setFeedback] = useState("");

  // Map distance: 5cm on map = actual distance
  const mapDistance = 5;
  const actualDistance = mapDistance * scale;

  const handleCheck = () => {
    setFeedback(`✓ Map scale 1:${scale} means 5cm on map = ${actualDistance}m actual distance. Treasure is ${actualDistance}m away!`);
  };

  const reset = () => {
    setScale(2);
    setFeedback("");
  };

  return (
    <div className="interactive-widget">
      <h4>{t("Activity")} 2: Treasure Map Scale</h4>
      <p className="subtext">Use the map scale to convert map distance to real distance.</p>

      <div style={{ marginTop: "1.5rem" }}>
        {/* Map visualization */}
        <div
          style={{
            padding: "1.5rem",
            background: "#e8d7c3",
            borderRadius: "8px",
            marginBottom: "1.5rem",
            textAlign: "center",
            position: "relative",
          }}
        >
          <svg width="280" height="240" viewBox="0 0 280 240" style={{ margin: "0 auto", display: "block" }}>
            {/* Grid */}
            <defs>
              <pattern id="map-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#d4a574" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="280" height="240" fill="url(#map-grid)" />

            {/* Starting point */}
            <circle cx="40" cy="120" r="8" fill="#2f6f6a" stroke="#fff" strokeWidth="2" />
            <text x="40" y="150" textAnchor="middle" fontSize="12" fontWeight="bold">
              START
            </text>

            {/* Treasure */}
            <circle cx="240" cy="120" r="8" fill="#d57d3d" stroke="#fff" strokeWidth="2" />
            <text x="240" y="150" textAnchor="middle" fontSize="12" fontWeight="bold">
              TREASURE
            </text>

            {/* Distance line */}
            <line x1="40" y1="120" x2="240" y2="120" stroke="#d57d3d" strokeWidth="2" strokeDasharray="5,5" />
            <text x="140" y="110" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#5b534c">
              {mapDistance}cm (map)
            </text>
          </svg>
        </div>

        {/* Scale slider */}
        <div style={{ padding: "1rem", background: "#f7f1ea", borderRadius: "8px", marginBottom: "1.5rem" }}>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "1rem" }}>
            Map scale 1:<span style={{ color: "#d57d3d", fontSize: "1.2rem" }}>{scale}</span>
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={scale}
            onChange={(e) => {
              setScale(Number(e.target.value));
              setFeedback("");
            }}
            style={{ width: "100%" }}
          />
          <p style={{ fontSize: "0.85rem", color: "#5b534c", marginTop: "0.5rem" }}>1cm on map = {scale}m in reality</p>
        </div>

        {/* Calculation */}
        <div style={{ padding: "1rem", background: "#e7f6f4", borderRadius: "8px", marginBottom: "1.5rem" }}>
          <p style={{ fontSize: "0.9rem", color: "#5b534c", marginBottom: "0.5rem" }}>Calculation:</p>
          <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "#2f6f6a" }}>
            {mapDistance}cm × {scale}m/cm = <span style={{ color: "#d57d3d" }}>{actualDistance}m</span>
          </p>
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
            Calculate Distance
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
