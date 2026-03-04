"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";

type GridCell = {
  x: number;
  y: number;
  colored: boolean;
};

export default function ButterflySymmetry() {
  const { t } = useI18n();
  const gridSize = 8;
  const [grid, setGrid] = useState<GridCell[]>(
    Array.from({ length: gridSize * gridSize }, (_, i) => ({
      x: i % gridSize,
      y: Math.floor(i / gridSize),
      colored: false,
    }))
  );
  const [feedback, setFeedback] = useState("");

  const toggleCell = (x: number, y: number) => {
    setFeedback("");
    if (x < gridSize / 2) {
      // Left side - can color
      const idx = y * gridSize + x;
      const mirrorIdx = y * gridSize + (gridSize - 1 - x);

      setGrid((prev) => {
        const newGrid = [...prev];
        newGrid[idx].colored = !newGrid[idx].colored;
        newGrid[mirrorIdx].colored = newGrid[idx].colored; // Mirror automatically
        return newGrid;
      });
    }
  };

  const handleCheck = () => {
    const leftSide = grid.filter((c) => c.x < gridSize / 2 && c.colored).length;
    const rightSide = grid.filter((c) => c.x >= gridSize / 2 && c.colored).length;

    if (leftSide === rightSide && leftSide > 0) {
      setFeedback(`✓ Perfect symmetry! ${leftSide} squares on each side create a beautiful butterfly!`);
    } else if (leftSide === 0) {
      setFeedback("Start coloring the left side to create a butterfly pattern!");
    } else {
      setFeedback("Check your symmetry - the right side should mirror the left!");
    }
  };

  const reset = () => {
    setGrid(
      Array.from({ length: gridSize * gridSize }, (_, i) => ({
        x: i % gridSize,
        y: Math.floor(i / gridSize),
        colored: false,
      }))
    );
    setFeedback("");
  };

  return (
    <div className="interactive-widget">
      <h4>{t("Activity")} 3: Butterfly Symmetry</h4>
      <p className="subtext">Color the left side of the butterfly - the right side mirrors automatically!</p>

      <div style={{ marginTop: "1.5rem" }}>
        <p style={{ fontSize: "0.9rem", color: "#5b534c", marginBottom: "1rem" }}>Click cells on the LEFT side to create a symmetric pattern:</p>

        {/* Grid visualization */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
          <svg width="320" height="320" viewBox={`0 0 ${gridSize * 40} ${gridSize * 40}`}>
            {/* Vertical line for symmetry */}
            <line x1={gridSize * 20} y1="0" x2={gridSize * 20} y2={gridSize * 40} stroke="#d57d3d" strokeWidth="1" strokeDasharray="3,3" />

            {/* Grid cells */}
            {grid.map((cell, idx) => (
              <rect
                key={idx}
                x={cell.x * 40}
                y={cell.y * 40}
                width="40"
                height="40"
                fill={cell.colored ? "#d57d3d" : "#f7f1ea"}
                stroke="#e7e3df"
                strokeWidth="1"
                onClick={() => toggleCell(cell.x, cell.y)}
                style={{ cursor: cell.x < gridSize / 2 ? "pointer" : "not-allowed" }}
                opacity={cell.x < gridSize / 2 ? 1 : 0.7}
              />
            ))}

            {/* Center labels */}
            <text x={gridSize / 2 * 40 - 10} y="20" textAnchor="middle" fontSize="12" fill="#d57d3d" fontWeight="bold">
              FOLD
            </text>
          </svg>
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
            Check Symmetry
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
