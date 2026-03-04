"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";

export default function HeightHistogram() {
  const { t } = useI18n();
  const [binWidth, setBinWidth] = useState(10);
  const [feedback, setFeedback] = useState("");

  // Sample classroom height data (cm)
  const heights = [140, 142, 145, 148, 150, 152, 152, 155, 158, 160, 162, 165, 165, 168, 170];

  const getBins = () => {
    const bins: Record<string, number> = {};
    const minHeight = Math.floor(Math.min(...heights) / binWidth) * binWidth;
    const maxHeight = Math.ceil(Math.max(...heights) / binWidth) * binWidth;

    for (let i = minHeight; i < maxHeight; i += binWidth) {
      bins[`${i}-${i + binWidth}`] = 0;
    }

    heights.forEach((h) => {
      const binStart = Math.floor(h / binWidth) * binWidth;
      const binLabel = `${binStart}-${binStart + binWidth}`;
      if (binLabel in bins) bins[binLabel]++;
    });

    return bins;
  };

  const bins = getBins();
  const maxCount = Math.max(...Object.values(bins));

  const handleCheck = () => {
    const mode = Object.entries(bins).reduce((a, b) => (b[1] > a[1] ? b : a))[0];
    setFeedback(`✓ With bin width ${binWidth}cm:\nMode (most frequent): ${mode}\nTotal students: ${heights.length}`);
  };

  const reset = () => {
    setBinWidth(10);
    setFeedback("");
  };

  return (
    <div className="interactive-widget">
      <h4>{t("Activity")} 4: Height Histogram</h4>
      <p className="subtext">Adjust bin width to explore different views of the height distribution.</p>

      <div style={{ marginTop: "1.5rem" }}>
        {/* Bin width control */}
        <div style={{ padding: "1rem", background: "#f7f1ea", borderRadius: "8px", marginBottom: "1.5rem" }}>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "1rem" }}>
            Bin width: <span style={{ color: "#d57d3d", fontSize: "1.2rem" }}>{binWidth} cm</span>
          </label>
          <input
            type="range"
            min="2"
            max="20"
            step="2"
            value={binWidth}
            onChange={(e) => {
              setBinWidth(Number(e.target.value));
              setFeedback("");
            }}
            style={{ width: "100%" }}
          />
          <p style={{ fontSize: "0.85rem", color: "#5b534c", marginTop: "0.5rem" }}>Larger bins show overall shape; smaller bins show details.</p>
        </div>

        {/* Histogram */}
        <div
          style={{
            padding: "1.5rem",
            background: "#f7f1ea",
            borderRadius: "8px",
            marginBottom: "1.5rem",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-around",
            gap: "0.5rem",
            minHeight: "250px",
            overflow: "auto",
          }}
        >
          {Object.entries(bins).map(([label, count]) => (
            <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: "0 0 auto" }}>
              <div
                style={{
                  width: "40px",
                  height: `${(count / maxCount) * 150}px`,
                  background: "#d57d3d",
                  borderRadius: "4px 4px 0 0",
                  marginBottom: "0.5rem",
                }}
              />
              <p style={{ fontSize: "0.7rem", textAlign: "center", color: "#5b534c" }}>{count}</p>
              <p style={{ fontSize: "0.65rem", textAlign: "center", color: "#5b534c", marginTop: "0.3rem" }}>
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* Statistics */}
        <div style={{ padding: "1rem", background: "#e7f6f4", borderRadius: "8px", marginBottom: "1.5rem" }}>
          <p style={{ fontWeight: 600, marginBottom: "0.8rem" }}>Statistics:</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem" }}>
            <div>
              <p style={{ fontSize: "0.85rem", color: "#5b534c" }}>Min height:</p>
              <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "#2f6f6a" }}>{Math.min(...heights)} cm</p>
            </div>
            <div>
              <p style={{ fontSize: "0.85rem", color: "#5b534c" }}>Max height:</p>
              <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "#2f6f6a" }}>{Math.max(...heights)} cm</p>
            </div>
            <div>
              <p style={{ fontSize: "0.85rem", color: "#5b534c" }}>Mean:</p>
              <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "#2f6f6a" }}>
                {(heights.reduce((a, b) => a + b, 0) / heights.length).toFixed(0)} cm
              </p>
            </div>
            <div>
              <p style={{ fontSize: "0.85rem", color: "#5b534c" }}>Count:</p>
              <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "#2f6f6a" }}>{heights.length} students</p>
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
            Find Mode
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
