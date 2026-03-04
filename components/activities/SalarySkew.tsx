"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";

export default function SalarySkew() {
  const { t } = useI18n();
  const [salaries, setSalaries] = useState([30, 32, 35, 38, 40, 42, 45, 140]);
  const [feedback, setFeedback] = useState("");

  const mean = (salaries.reduce((a, b) => a + b, 0) / salaries.length).toFixed(1);
  const sorted = [...salaries].sort((a, b) => a - b);
  const median = salaries.length % 2 === 0 ? ((sorted[salaries.length / 2 - 1] + sorted[salaries.length / 2]) / 2).toFixed(1) : sorted[Math.floor(salaries.length / 2)].toFixed(1);

  const handleCheck = () => {
    const difference = Math.abs(parseFloat(mean) - parseFloat(median));
    setFeedback(`✓ Mean: €${mean}k | Median: €${median}k | Difference: €${difference.toFixed(1)}k\nThe outlier CEO salary skews the mean higher!`);
  };

  const reset = () => {
    setSalaries([30, 32, 35, 38, 40, 42, 45, 140]);
    setFeedback("");
  };

  const maxSalary = Math.max(...salaries);
  const scale = 200 / maxSalary;

  return (
    <div className="interactive-widget">
      <h4>{t("Activity")} 2: Salary Skew</h4>
      <p className="subtext">Explore how outliers affect mean and median.</p>

      <div style={{ marginTop: "1.5rem" }}>
        {/* Bar chart */}
        <div style={{ marginBottom: "1.5rem", padding: "1rem", background: "#f7f1ea", borderRadius: "8px", minHeight: "250px", display: "flex", alignItems: "flex-end", gap: "0.3rem", overflow: "auto", paddingBottom: "2rem" }}>
          {salaries.map((salary, i) => (
            <div
              key={i}
              style={{
                flex: "0 0 auto",
                width: "30px",
                height: `${salary * scale}px`,
                background: salary > 100 ? "#d57d3d" : "#2f6f6a",
                borderRadius: "4px 4px 0 0",
                position: "relative",
              }}
              title={`€${salary}k`}
            >
              <span
                style={{
                  position: "absolute",
                  bottom: "-20px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontSize: "0.75rem",
                  whiteSpace: "nowrap",
                }}
              >
                {salary}
              </span>
            </div>
          ))}
        </div>

        {/* Statistics */}
        <div style={{ padding: "1rem", background: "#e7f6f4", borderRadius: "8px", marginBottom: "1.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <p style={{ fontSize: "0.85rem", color: "#5b534c" }}>Mean:</p>
              <p style={{ fontSize: "1.3rem", fontWeight: 700, color: "#2f6f6a" }}>€{mean}k</p>
            </div>
            <div>
              <p style={{ fontSize: "0.85rem", color: "#5b534c" }}>Median:</p>
              <p style={{ fontSize: "1.3rem", fontWeight: 700, color: "#2f6f6a" }}>€{median}k</p>
            </div>
          </div>
          <p style={{ fontSize: "0.85rem", color: "#5b534c", marginTop: "1rem" }}>
            One CEO salary (€140k) is pulling the mean up!
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
            Compare Stats
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
