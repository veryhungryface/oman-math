"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";

export default function ScaleBalance() {
  const { t } = useI18n();
  const [x, setX] = useState(0);
  const [feedback, setFeedback] = useState("");

  // Equation: 2x + 3 = 11 => x = 4
  const leftSide = 2 * x + 3;
  const rightSide = 11;
  const balanced = leftSide === rightSide;

  const handleCheck = () => {
    if (balanced) {
      setFeedback(`✓ Balanced! x = ${x} makes 2x + 3 = 11 true. The scale is level!`);
    } else {
      setFeedback(`Left: ${leftSide}, Right: ${rightSide}. The scale is unbalanced. Try adjusting x.`);
    }
  };

  const reset = () => {
    setX(0);
    setFeedback("");
  };

  const leftHeight = Math.min(100, 50 + leftSide * 3);
  const rightHeight = Math.min(100, 50 + rightSide * 3);

  return (
    <div className="interactive-widget">
      <h4>{t("Activity")} 2: Scale Balance</h4>
      <p className="subtext">Adjust x to balance the equation: 2x + 3 = 11</p>

      <div style={{ marginTop: "1.5rem" }}>
        {/* Scale visualization */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", height: "200px", marginBottom: "2rem", gap: "1rem" }}>
          {/* Left side */}
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "0.9rem", fontWeight: 600, marginBottom: "0.5rem", color: "#5b534c" }}>2x + 3</div>
            <div
              style={{
                width: "60px",
                height: `${leftHeight}px`,
                background: "#d57d3d",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 700,
                fontSize: "1.1rem",
              }}
            >
              {leftSide}
            </div>
          </div>

          {/* Beam */}
          <div
            style={{
              height: "4px",
              width: "100px",
              background: "#5b534c",
              transform: `rotateZ(${balanced ? 0 : leftSide > rightSide ? -5 : 5}deg)`,
              transition: "transform 0.3s",
              transformOrigin: "center",
            }}
          />

          {/* Right side */}
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "0.9rem", fontWeight: 600, marginBottom: "0.5rem", color: "#5b534c" }}>11</div>
            <div
              style={{
                width: "60px",
                height: `${rightHeight}px`,
                background: "#2f6f6a",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 700,
                fontSize: "1.1rem",
              }}
            >
              {rightSide}
            </div>
          </div>
        </div>

        {/* Balance indicator */}
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <p style={{ fontSize: "1.1rem", fontWeight: 700, color: balanced ? "#2d5016" : "#d57d3d" }}>
            {balanced ? "✓ BALANCED!" : "Not balanced"}
          </p>
        </div>

        {/* Variable slider */}
        <div style={{ padding: "1rem", background: "#f7f1ea", borderRadius: "8px", marginBottom: "1.5rem" }}>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "1rem" }}>
            Adjust x: <span style={{ color: "#d57d3d", fontSize: "1.2rem" }}>{x}</span>
          </label>
          <input
            type="range"
            min="0"
            max="8"
            value={x}
            onChange={(e) => {
              setX(Number(e.target.value));
              setFeedback("");
            }}
            style={{ width: "100%" }}
          />
        </div>

        {/* Equation display */}
        <div style={{ padding: "1rem", background: "#e7f6f4", borderRadius: "8px", marginBottom: "1.5rem", textAlign: "center" }}>
          <p style={{ fontSize: "1.2rem", fontWeight: 700, color: "#2f6f6a" }}>2({x}) + 3 = {leftSide}</p>
          <p style={{ fontSize: "0.9rem", color: "#5b534c", marginTop: "0.5rem" }}>Must equal 11</p>
        </div>

        {/* Feedback */}
        {feedback && (
          <div
            style={{
              padding: "0.8rem 1rem",
              borderRadius: "8px",
              marginBottom: "1rem",
              background: balanced ? "#e7f6f4" : "#f6e2d1",
              color: balanced ? "#1a4a47" : "#7a4a2b",
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
            Check Balance
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
