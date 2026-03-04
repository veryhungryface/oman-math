"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";

type PatternData = {
  n: number;
  tiles: number;
};

export default function TilePatternRule() {
  const { t } = useI18n();
  const [formula, setFormula] = useState("");
  const [feedback, setFeedback] = useState("");

  const pattern: PatternData[] = [
    { n: 1, tiles: 4 },
    { n: 2, tiles: 7 },
    { n: 3, tiles: 10 },
    { n: 4, tiles: 13 },
    { n: 5, tiles: 16 },
  ];

  const handleCheck = () => {
    const userInput = formula.trim().toLowerCase().replace(/\\s/g, "");
    const expected = ["3n+1", "3*n+1"];

    if (expected.includes(userInput)) {
      setFeedback(`✓ Correct! The rule is 3n + 1. For n = 10: 3(10) + 1 = 31 tiles`);
    } else {
      setFeedback(`Not quite. Look at the pattern: the difference increases by 3 each time!`);
    }
  };

  const reset = () => {
    setFormula("");
    setFeedback("");
  };

  return (
    <div className="interactive-widget">
      <h4>{t("Activity")} 1: Tile Pattern Rule</h4>
      <p className="subtext">Find the rule that describes this growing tile pattern.</p>

      <div style={{ marginTop: "1.5rem" }}>
        {/* Pattern visualization */}
        <div style={{ marginBottom: "1.5rem" }}>
          {pattern.slice(0, 3).map((p) => (
            <div key={p.n} style={{ marginBottom: "1rem" }}>
              <p style={{ fontWeight: 600, marginBottom: "0.5rem" }}>
                Pattern {p.n}:
              </p>
              <svg width="100%" height="60" viewBox="0 0 200 60" style={{ border: "1px solid #e7e3df", borderRadius: "4px", background: "#faf8f5" }}>
                {Array.from({ length: p.tiles }, (_, i) => (
                  <rect key={i} x={20 + i * 12} y="10" width="10" height="10" fill="#d57d3d" stroke="#5b534c" strokeWidth="1" />
                ))}
              </svg>
            </div>
          ))}
        </div>

        {/* Table */}
        <div style={{ padding: "1rem", background: "#f7f1ea", borderRadius: "8px", marginBottom: "1.5rem", overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #d57d3d" }}>
                <th style={{ padding: "0.5rem", textAlign: "left", fontWeight: 700 }}>n (Pattern #)</th>
                <th style={{ padding: "0.5rem", textAlign: "left", fontWeight: 700 }}>Tiles</th>
              </tr>
            </thead>
            <tbody>
              {pattern.map((p) => (
                <tr key={p.n} style={{ borderBottom: "1px solid #e7e3df" }}>
                  <td style={{ padding: "0.5rem" }}>{p.n}</td>
                  <td style={{ padding: "0.5rem", fontWeight: 600, color: "#d57d3d" }}>{p.tiles}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Rule input */}
        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>
            Write the rule (e.g., 3n+1):
          </label>
          <input
            type="text"
            value={formula}
            onChange={(e) => {
              setFormula(e.target.value);
              setFeedback("");
            }}
            placeholder="3n+1"
            style={{
              width: "100%",
              padding: "0.8rem",
              border: "2px solid #ddd",
              borderRadius: "6px",
              fontSize: "1rem",
              fontWeight: 600,
            }}
          />
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
            Check Rule
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
