"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";

export default function SampleSizeDemo() {
  const { t } = useI18n();
  const [sampleSize, setSampleSize] = useState(30);
  const [feedback, setFeedback] = useState("");

  const populationMean = 50; // 50% defect rate
  const sampleMean = 50 + (Math.random() - 0.5) * (200 / sampleSize); // Closer to mean with larger sample

  const handleCheck = () => {
    const difference = Math.abs(sampleMean - populationMean);
    setFeedback(`✓ Sample of ${sampleSize}: ${sampleMean.toFixed(1)}% | Population: ${populationMean}% | Difference: ${difference.toFixed(1)}%\nLarger samples give more accurate estimates!`);
  };

  const reset = () => {
    setSampleSize(30);
    setFeedback("");
  };

  return (
    <div className="interactive-widget">
      <h4>{t("Activity")} 1: Sample Size Demo</h4>
      <p className="subtext">Explore how sample size affects estimate accuracy.</p>

      <div style={{ marginTop: "1.5rem" }}>
        {/* Sample size control */}
        <div style={{ padding: "1rem", background: "#f7f1ea", borderRadius: "8px", marginBottom: "1.5rem" }}>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "1rem" }}>
            Sample size: <span style={{ color: "#d57d3d", fontSize: "1.3rem" }}>{sampleSize}</span>
          </label>
          <input
            type="range"
            min="10"
            max="200"
            step="10"
            value={sampleSize}
            onChange={(e) => {
              setSampleSize(Number(e.target.value));
              setFeedback("");
            }}
            style={{ width: "100%" }}
          />
        </div>

        {/* Distribution visualization */}
        <div
          style={{
            padding: "1rem",
            background: "#e7f6f4",
            borderRadius: "8px",
            marginBottom: "1.5rem",
          }}
        >
          <p style={{ fontWeight: 600, marginBottom: "1rem" }}>Sample Results:</p>
          <svg width="100%" height="150" viewBox="0 0 300 150">
            {/* Target line */}
            <line x1="50" y1="120" x2="280" y2="120" stroke="#5b534c" strokeWidth="2" />

            {/* Population mean */}
            <line x1="150" y1="100" x2="150" y2="140" stroke="#2f6f6a" strokeWidth="3" />
            <text x="150" y="85" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#2f6f6a">
              Population Mean: {populationMean}%
            </text>

            {/* Sample mean */}
            <line
              x1={50 + ((sampleMean - 30) / 40) * 230}
              y1="100"
              x2={50 + ((sampleMean - 30) / 40) * 230}
              y2="140"
              stroke="#d57d3d"
              strokeWidth="3"
            />
            <text
              x={50 + ((sampleMean - 30) / 40) * 230}
              y="85"
              textAnchor="middle"
              fontSize="11"
              fontWeight="bold"
              fill="#d57d3d"
            >
              Sample Mean: {sampleMean.toFixed(1)}%
            </text>
          </svg>
        </div>

        {/* Info */}
        <div style={{ padding: "1rem", background: "#f7f1ea", borderRadius: "8px", marginBottom: "1.5rem" }}>
          <p style={{ fontSize: "0.9rem", color: "#5b534c", marginBottom: "0.5rem" }}>
            Larger samples → More accurate estimates of the population
          </p>
          <p style={{ fontSize: "0.85rem", color: "#5b534c" }}>
            Try adjusting the sample size and observe how the estimate changes!
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
              whiteSpace: "pre-wrap",
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
            Check Sample
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
