"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";

export default function BagOfMarbles() {
  const { t } = useI18n();
  const [redCount, setRedCount] = useState(3);
  const [blueCount, setBlueCount] = useState(2);
  const [greenCount, setGreenCount] = useState(1);
  const [draws, setDraws] = useState<string[]>([]);
  const [feedback, setFeedback] = useState("");

  const totalMarbles = redCount + blueCount + greenCount;
  const theoryRed = (redCount / totalMarbles * 100).toFixed(1);
  const theoryBlue = (blueCount / totalMarbles * 100).toFixed(1);
  const theoryGreen = (greenCount / totalMarbles * 100).toFixed(1);

  const draw = () => {
    const rand = Math.random();
    let color = "";
    let cumulative = 0;

    if (rand < redCount / totalMarbles) color = "red";
    else if (rand < (redCount + blueCount) / totalMarbles) color = "blue";
    else color = "green";

    setDraws((prev) => [...prev, color]);
  };

  const results = {
    red: draws.filter((d) => d === "red").length,
    blue: draws.filter((d) => d === "blue").length,
    green: draws.filter((d) => d === "green").length,
  };

  const handleCheck = () => {
    if (draws.length === 0) {
      setFeedback("Make some draws first!");
    } else {
      const actualRed = ((results.red / draws.length) * 100).toFixed(1);
      const actualBlue = ((results.blue / draws.length) * 100).toFixed(1);
      const actualGreen = ((results.green / draws.length) * 100).toFixed(1);
      setFeedback(`Theory: Red ${theoryRed}%, Blue ${theoryBlue}%, Green ${theoryGreen}%\nActual (${draws.length} draws): Red ${actualRed}%, Blue ${actualBlue}%, Green ${actualGreen}%`);
    }
  };

  const reset = () => {
    setDraws([]);
    setFeedback("");
  };

  return (
    <div className="interactive-widget">
      <h4>{t("Activity")} 3: Bag of Marbles</h4>
      <p className="subtext">Adjust marble counts, draw samples, and compare theoretical vs. actual probabilities.</p>

      <div style={{ marginTop: "1.5rem" }}>
        {/* Marble setup */}
        <div style={{ padding: "1rem", background: "#f7f1ea", borderRadius: "8px", marginBottom: "1.5rem" }}>
          <p style={{ fontWeight: 600, marginBottom: "1rem" }}>Bag composition:</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>
                🔴 Red: <span style={{ color: "#d57d3d" }}>{redCount}</span>
              </label>
              <input
                type="range"
                min="0"
                max="10"
                value={redCount}
                onChange={(e) => {
                  setRedCount(Number(e.target.value));
                  setDraws([]);
                  setFeedback("");
                }}
                style={{ width: "100%" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>
                🔵 Blue: <span style={{ color: "#2f6f6a" }}>{blueCount}</span>
              </label>
              <input
                type="range"
                min="0"
                max="10"
                value={blueCount}
                onChange={(e) => {
                  setBlueCount(Number(e.target.value));
                  setDraws([]);
                  setFeedback("");
                }}
                style={{ width: "100%" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>
                🟢 Green: <span style={{ color: "#7cb342" }}>{greenCount}</span>
              </label>
              <input
                type="range"
                min="0"
                max="10"
                value={greenCount}
                onChange={(e) => {
                  setGreenCount(Number(e.target.value));
                  setDraws([]);
                  setFeedback("");
                }}
                style={{ width: "100%" }}
              />
            </div>
          </div>
        </div>

        {/* Theoretical probabilities */}
        <div style={{ padding: "1rem", background: "#e7f6f4", borderRadius: "8px", marginBottom: "1.5rem" }}>
          <p style={{ fontWeight: 600, marginBottom: "0.8rem" }}>Theoretical Probability:</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.8rem" }}>
            <div>
              <p style={{ fontSize: "0.85rem", color: "#5b534c" }}>Red</p>
              <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "#d57d3d" }}>{theoryRed}%</p>
            </div>
            <div>
              <p style={{ fontSize: "0.85rem", color: "#5b534c" }}>Blue</p>
              <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "#2f6f6a" }}>{theoryBlue}%</p>
            </div>
            <div>
              <p style={{ fontSize: "0.85rem", color: "#5b534c" }}>Green</p>
              <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "#7cb342" }}>{theoryGreen}%</p>
            </div>
          </div>
        </div>

        {/* Draw button */}
        <button
          onClick={draw}
          style={{
            width: "100%",
            padding: "1rem",
            background: "#d57d3d",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontWeight: 700,
            fontSize: "1rem",
            cursor: "pointer",
            marginBottom: "1.5rem",
          }}
        >
          Draw Marble!
        </button>

        {/* Results */}
        <div style={{ padding: "1rem", background: "#f7f1ea", borderRadius: "8px", marginBottom: "1.5rem" }}>
          <p style={{ fontWeight: 600, marginBottom: "0.8rem" }}>Results ({draws.length} draws):</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.8rem" }}>
            <div>
              <p style={{ fontSize: "0.85rem", color: "#5b534c" }}>Red</p>
              <p style={{ fontSize: "1.1rem", fontWeight: 700 }}>{results.red}</p>
            </div>
            <div>
              <p style={{ fontSize: "0.85rem", color: "#5b534c" }}>Blue</p>
              <p style={{ fontSize: "1.1rem", fontWeight: 700 }}>{results.blue}</p>
            </div>
            <div>
              <p style={{ fontSize: "0.85rem", color: "#5b534c" }}>Green</p>
              <p style={{ fontSize: "1.1rem", fontWeight: 700 }}>{results.green}</p>
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
              fontSize: "0.9rem",
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
            Compare
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
