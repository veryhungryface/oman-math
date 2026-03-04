"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";

type Fraction = { value: number; label: string; correct: number; color: string };

const fractions: Fraction[] = [
  { value: 0.25, label: "1/4", correct: 25, color: "#E74C3C" },
  { value: 0.5, label: "1/2", correct: 50, color: "#27AE60" },
  { value: 0.75, label: "3/4", correct: 75, color: "#3498DB" },
];

export default function NumberLineDefend() {
  const { t } = useI18n();
  const [positions, setPositions] = useState<Record<string, number>>({
    "1/4": -1,
    "1/2": -1,
    "3/4": -1,
  });
  const [feedback, setFeedback] = useState("");
  const [completed, setCompleted] = useState(false);

  const handleDragStart = (e: React.DragEvent, label: string) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("fraction", label);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, position: number) => {
    e.preventDefault();
    const label = e.dataTransfer.getData("fraction");
    setPositions((prev) => ({
      ...prev,
      [label]: position,
    }));
  };

  const handleCheck = () => {
    const tolerance = 5;
    const allCorrect = fractions.every((frac) => {
      const placed = positions[frac.label];
      return placed >= 0 && Math.abs(placed - frac.correct) < tolerance;
    });

    if (allCorrect) {
      setFeedback("✓ Perfect! Equal spacing shows equal fractions!");
      setCompleted(true);
    } else {
      setFeedback("❌ Try again! Look at the equal gaps between marks.");
    }
  };

  const reset = () => {
    setPositions({ "1/4": -1, "1/2": -1, "3/4": -1 });
    setFeedback("");
    setCompleted(false);
  };

  const unplacedFractions = fractions.filter((f) => positions[f.label] < 0);

  return (
    <div className="interactive-widget">
      <h4>📏 Number line defend</h4>
      <p className="subtext">Place each fraction at the correct position. Equal spaces = equal amounts!</p>

      <div style={{ marginTop: "2rem" }}>
        {/* Number line - larger and more visual */}
        <div
          style={{
            marginBottom: "2.5rem",
            padding: "2rem",
            background: "linear-gradient(180deg, #f8f4f0 0%, #fff9f5 100%)",
            borderRadius: "16px",
          }}
        >
          <svg width="100%" height="200" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
            {/* Background */}
            <rect width="400" height="200" fill="transparent" />

            {/* Grid background */}
            {[0, 1, 2, 3, 4].map((i) => {
              const x = 30 + (i * 340) / 4;
              return (
                <line
                  key={`grid-${i}`}
                  x1={x}
                  y1="60"
                  x2={x}
                  y2="120"
                  stroke="#E0D7CC"
                  strokeWidth="1"
                  strokeDasharray="2,2"
                />
              );
            })}

            {/* Main number line */}
            <line x1="30" y1="90" x2="370" y2="90" stroke="#333" strokeWidth="4" />

            {/* End caps */}
            <circle cx="30" cy="90" r="6" fill="#333" />
            <circle cx="370" cy="90" r="6" fill="#333" />

            {/* Major ticks */}
            {[0, 1, 2, 3, 4].map((i) => {
              const x = 30 + (i * 340) / 4;
              return (
                <g key={`tick-${i}`}>
                  <line x1={x} y1="82" x2={x} y2="98" stroke="#333" strokeWidth="3" />
                </g>
              );
            })}

            {/* Labels for 0 and 1 */}
            <text x="30" y="135" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#333">
              0
            </text>
            <text x="370" y="135" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#333">
              1
            </text>

            {/* Drop zones with visual feedback */}
            {fractions.map((frac) => {
              const x = 30 + (frac.correct * 340) / 100;
              return (
                <g key={`zone-${frac.label}`} onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, frac.correct)} style={{ cursor: "pointer" }}>
                  {/* Zone highlight */}
                  <rect x={x - 20} y="55" width="40" height="70" fill={frac.color} opacity="0.1" stroke={frac.color} strokeWidth="2" strokeDasharray="4,2" rx="4" />
                </g>
              );
            })}

            {/* Placed fractions */}
            {fractions.map((frac) => {
              const placed = positions[frac.label];
              if (placed < 0) return null;
              const x = 30 + (placed * 340) / 100;
              const isCorrect = Math.abs(placed - frac.correct) < 5;

              return (
                <g key={`placed-${frac.label}`}>
                  {/* Shadow */}
                  <circle cx={x} cy="92" r="12" fill={isCorrect ? "#2f6f6a" : "#d57d3d"} opacity="0.2" />
                  {/* Circle */}
                  <circle cx={x} cy="90" r="11" fill={frac.color} stroke={isCorrect ? "#2f6f6a" : "#fff"} strokeWidth="3" />
                  {/* Label */}
                  <text x={x} y="30" textAnchor="middle" fontSize="14" fontWeight="bold" fill={frac.color}>
                    {frac.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Draggable fractions */}
        <div style={{ marginBottom: "1.5rem" }}>
          <p style={{ fontWeight: 700, marginBottom: "1rem", color: "#5b534c" }}>Drag fractions to the number line:</p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            {unplacedFractions.map((frac) => (
              <div
                key={frac.label}
                draggable
                onDragStart={(e) => handleDragStart(e, frac.label)}
                style={{
                  padding: "1rem 1.5rem",
                  background: frac.color,
                  color: "#fff",
                  border: "3px solid " + frac.color,
                  borderRadius: "12px",
                  cursor: "grab",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  transition: "all 0.2s",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.2)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
                }}
              >
                {frac.label}
              </div>
            ))}
          </div>
          {unplacedFractions.length === 0 && (
            <p style={{ color: "#27AE60", fontWeight: 700, fontSize: "1.1rem" }}>✓ All placed!</p>
          )}
        </div>

        {/* Feedback */}
        {feedback && (
          <div
            style={{
              padding: "1.2rem 1.5rem",
              borderRadius: "12px",
              marginBottom: "1.5rem",
              background: completed ? "#e7f6f4" : "#fff3e0",
              color: completed ? "#1a4a47" : "#e65100",
              fontWeight: 700,
              fontSize: "1.05rem",
              border: completed ? "2px solid #27AE60" : "2px solid #ff9800",
            }}
          >
            {feedback}
          </div>
        )}

        {/* Buttons */}
        <div style={{ display: "flex", gap: "1rem" }}>
          <button
            onClick={handleCheck}
            style={{
              padding: "1rem 2rem",
              background: "#3498DB",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              fontWeight: 700,
              cursor: "pointer",
              fontSize: "1rem",
              transition: "all 0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = "#2980B9")}
            onMouseOut={(e) => (e.currentTarget.style.background = "#3498DB")}
          >
            ✓ Check Answer
          </button>
          <button
            onClick={reset}
            style={{
              padding: "1rem 2rem",
              background: "#fff",
              color: "#5b534c",
              border: "2px solid #ddd",
              borderRadius: "12px",
              fontWeight: 700,
              cursor: "pointer",
              fontSize: "1rem",
              transition: "all 0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.borderColor = "#3498DB")}
            onMouseOut={(e) => (e.currentTarget.style.borderColor = "#ddd")}
          >
            🔄 Reset
          </button>
        </div>
      </div>
    </div>
  );
}
