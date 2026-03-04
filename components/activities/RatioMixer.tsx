"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";

export default function RatioMixer() {
  const { t } = useI18n();
  const [scale, setScale] = useState(1);
  const [inputAnswer, setInputAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [completed, setCompleted] = useState(false);

  // Original ratio: 2:3 (juice concentrate to water, or similar)
  const originalA = 2;
  const originalB = 3;

  const scaledA = originalA * scale;
  const scaledB = originalB * scale;

  const handleCheck = () => {
    // Expected answer format: "4:6" for scale 2, etc.
    const expected = `${scaledA}:${scaledB}`;
    const normalized = inputAnswer.replace(/\s/g, "").toLowerCase();
    const expectedNorm = expected.replace(/\s/g, "").toLowerCase();

    // Also accept equivalent ratios
    const [userA, userB] = normalized.split(":").map(Number);
    const expectedRatio = scaledA / scaledB;
    const userRatio = userA / userB;

    if (Math.abs(userRatio - expectedRatio) < 0.01) {
      setFeedback(`✓ Perfect! ${inputAnswer} is equivalent to ${originalA}:${originalB} scaled by ${scale}x`);
      setCompleted(true);
    } else {
      setFeedback(`Not quite. The ratio should have both parts multiplied by ${scale}. Try again!`);
    }
  };

  const reset = () => {
    setScale(1);
    setInputAnswer("");
    setFeedback("");
    setCompleted(false);
  };

  return (
    <div className="interactive-widget">
      <h4>{t("Activity")} 4: Ratio mixer mini-challenge</h4>
      <p className="subtext">A juice recipe uses a ratio of 2:3 (concentrate to water). Scale the recipe to make different amounts while keeping the taste the same.</p>

      <div style={{ marginTop: "1.5rem" }}>
        {/* Original ratio */}
        <div style={{ padding: "1rem", background: "#f7f1ea", borderRadius: "8px", marginBottom: "1.5rem" }}>
          <p style={{ fontWeight: 600, marginBottom: "0.5rem" }}>Original recipe:</p>
          <p style={{ fontSize: "1.2rem", fontWeight: 700, color: "#d57d3d" }}>
            {originalA}:{originalB}
          </p>
          <p style={{ color: "#5b534c", fontSize: "0.9rem" }}>
            {originalA} parts concentrate : {originalB} parts water
          </p>
        </div>

        {/* Scale selector */}
        <div style={{ marginBottom: "1.5rem" }}>
          <p style={{ fontWeight: 600, marginBottom: "1rem" }}>
            Scale the recipe by <span style={{ color: "#d57d3d", fontWeight: 700 }}>{scale}x</span>:
          </p>
          <input
            type="range"
            min="1"
            max="5"
            value={scale}
            onChange={(e) => {
              setScale(Number(e.target.value));
              setInputAnswer("");
              setFeedback("");
              setCompleted(false);
            }}
            style={{
              width: "100%",
              marginBottom: "1rem",
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "0.5rem",
              marginBottom: "1.5rem",
            }}
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                onClick={() => setScale(num)}
                style={{
                  flex: 1,
                  padding: "0.6rem",
                  background: scale === num ? "#d57d3d" : "#fff",
                  color: scale === num ? "#fff" : "#5b534c",
                  border: scale === num ? "none" : "1px solid #ddd",
                  borderRadius: "6px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {num}x
              </button>
            ))}
          </div>
        </div>

        {/* Scaled recipe display */}
        <div
          style={{
            padding: "1.2rem",
            background: "#e7f1ef",
            borderRadius: "8px",
            marginBottom: "1.5rem",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: "0.9rem", color: "#5b534c", marginBottom: "0.5rem" }}>Scaled recipe:</p>
          <p style={{ fontSize: "1.4rem", fontWeight: 700, color: "#2f6f6a" }}>
            {scaledA}:{scaledB}
          </p>
          <p style={{ color: "#5b534c", fontSize: "0.85rem" }}>
            {scaledA} parts concentrate : {scaledB} parts water
          </p>
        </div>

        {/* Input field */}
        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>
            Write the new ratio:
          </label>
          <input
            type="text"
            value={inputAnswer}
            onChange={(e) => setInputAnswer(e.target.value)}
            placeholder="e.g., 4:6"
            style={{
              width: "100%",
              padding: "0.8rem",
              border: "2px solid #ddd",
              borderRadius: "6px",
              fontSize: "1rem",
              fontWeight: 600,
            }}
          />
          <p style={{ fontSize: "0.85rem", color: "#5b534c", marginTop: "0.5rem" }}>
            Format: number:number (e.g., 4:6)
          </p>
        </div>

        {/* Feedback */}
        {feedback && (
          <div
            style={{
              padding: "0.8rem 1rem",
              borderRadius: "8px",
              marginBottom: "1rem",
              background: completed ? "#e7f6f4" : "#f6e2d1",
              color: completed ? "#1a4a47" : "#7a4a2b",
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
