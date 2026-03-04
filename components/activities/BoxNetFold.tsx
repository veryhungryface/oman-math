"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";

export default function BoxNetFold() {
  const { t } = useI18n();
  const [width, setWidth] = useState(5);
  const [height, setHeight] = useState(4);
  const [depth, setDepth] = useState(3);
  const [folded, setFolded] = useState(false);
  const [feedback, setFeedback] = useState("");

  const volume = width * height * depth;
  const surfaceArea = 2 * (width * height + height * depth + width * depth);

  const handleFold = () => {
    setFolded(!folded);
  };

  const handleCheck = () => {
    setFeedback(`✓ Box dimensions: ${width}×${height}×${depth} cm\nVolume: ${volume} cm³\nSurface Area: ${surfaceArea} cm²`);
  };

  const reset = () => {
    setWidth(5);
    setHeight(4);
    setDepth(3);
    setFolded(false);
    setFeedback("");
  };

  return (
    <div className="interactive-widget">
      <h4>{t("Activity")} 4: Box Net Fold</h4>
      <p className="subtext">Design a box by adjusting dimensions, then fold it.</p>

      <div style={{ marginTop: "1.5rem" }}>
        {/* Net visualization */}
        <div
          style={{
            marginBottom: "2rem",
            padding: "1.5rem",
            background: "#f7f1ea",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <svg
            width="100%"
            height="300"
            viewBox="0 0 400 300"
            style={{
              background: "#faf8f5",
              borderRadius: "4px",
            }}
          >
            {folded ? (
              // 3D box
              <>
                {/* Front face */}
                <rect x="100" y="80" width={width * 15} height={height * 15} fill="#d57d3d" stroke="#5b534c" strokeWidth="2" />
                {/* Right face */}
                <polygon
                  points={`${100 + width * 15},${80} ${100 + width * 15 + depth * 8},${80 - depth * 8} ${100 + width * 15 + depth * 8},${80 + height * 15 - depth * 8} ${100 + width * 15},${80 + height * 15}`}
                  fill="#c44536"
                  stroke="#5b534c"
                  strokeWidth="2"
                />
                {/* Top face */}
                <polygon
                  points={`${100},${80} ${100 + depth * 8},${80 - depth * 8} ${100 + width * 15 + depth * 8},${80 - depth * 8} ${100 + width * 15},${80}`}
                  fill="#f5a623"
                  stroke="#5b534c"
                  strokeWidth="2"
                />
                <text x="200" y="290" textAnchor="middle" fontSize="14" fontWeight="bold">
                  Folded Box
                </text>
              </>
            ) : (
              // Net
              <>
                {/* Bottom */}
                <rect x="80" y="120" width={width * 20} height={depth * 20} fill="#d57d3d" stroke="#5b534c" strokeWidth="2" />
                {/* Front */}
                <rect x="80" y="120 - height * 20" width={width * 20} height={height * 20} fill="#d57d3d" stroke="#5b534c" strokeWidth="2" />
                {/* Top */}
                <rect x="80" y="120 - height * 40" width={width * 20} height={depth * 20} fill="#d57d3d" stroke="#5b534c" strokeWidth="2" />
                {/* Right */}
                <rect x="80 + width * 20" y="120" width={depth * 20} height={height * 20} fill="#c44536" stroke="#5b534c" strokeWidth="2" />
                {/* Left */}
                <rect x="80 - depth * 20" y="120" width={depth * 20} height={height * 20} fill="#f5a623" stroke="#5b534c" strokeWidth="2" />
                {/* Back */}
                <rect x="80" y="120 + depth * 20" width={width * 20} height={height * 20} fill="#c44536" stroke="#5b534c" strokeWidth="2" />
                <text x="200" y="290" textAnchor="middle" fontSize="14" fontWeight="bold">
                  Box Net (Unfold)
                </text>
              </>
            )}
          </svg>
        </div>

        {/* Controls */}
        <div style={{ padding: "1rem", background: "#f7f1ea", borderRadius: "8px", marginBottom: "1.5rem" }}>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>
              Width: <span style={{ color: "#d57d3d" }}>{width} cm</span>
            </label>
            <input
              type="range"
              min="2"
              max="8"
              value={width}
              onChange={(e) => {
                setWidth(Number(e.target.value));
                setFeedback("");
              }}
              style={{ width: "100%" }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>
              Height: <span style={{ color: "#d57d3d" }}>{height} cm</span>
            </label>
            <input
              type="range"
              min="2"
              max="8"
              value={height}
              onChange={(e) => {
                setHeight(Number(e.target.value));
                setFeedback("");
              }}
              style={{ width: "100%" }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>
              Depth: <span style={{ color: "#d57d3d" }}>{depth} cm</span>
            </label>
            <input
              type="range"
              min="2"
              max="8"
              value={depth}
              onChange={(e) => {
                setDepth(Number(e.target.value));
                setFeedback("");
              }}
              style={{ width: "100%" }}
            />
          </div>
        </div>

        {/* Metrics */}
        <div style={{ padding: "1rem", background: "#e7f6f4", borderRadius: "8px", marginBottom: "1.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <p style={{ fontSize: "0.85rem", color: "#5b534c" }}>Volume:</p>
              <p style={{ fontSize: "1.3rem", fontWeight: 700, color: "#2f6f6a" }}>{volume} cm³</p>
            </div>
            <div>
              <p style={{ fontSize: "0.85rem", color: "#5b534c" }}>Surface Area:</p>
              <p style={{ fontSize: "1.3rem", fontWeight: 700, color: "#2f6f6a" }}>{surfaceArea} cm²</p>
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
            onClick={handleFold}
            style={{
              padding: "0.7rem 1.5rem",
              background: folded ? "#2f6f6a" : "#d57d3d",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {folded ? "Unfold" : "Fold"}
          </button>
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
