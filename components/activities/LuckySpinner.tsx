"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";

type SpinResult = {
  color: string;
  count: number;
};

export default function LuckySpinner() {
  const { t } = useI18n();
  const [redPercent, setRedPercent] = useState(33);
  const [bluePercent, setBluePercent] = useState(33);
  const [greenPercent, setGreenPercent] = useState(34);
  const [spins, setSpins] = useState<string[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [feedback, setFeedback] = useState("");

  const colors: { name: string; color: string; percent: number }[] = [
    { name: "Red", color: "#d57d3d", percent: redPercent },
    { name: "Blue", color: "#2f6f6a", percent: bluePercent },
    { name: "Green", color: "#7cb342", percent: greenPercent },
  ];

  const handlePercentChange = (index: number, value: number) => {
    const others = colors.filter((_, i) => i !== index);
    const otherTotal = others.reduce((sum, c) => sum + (index === 0 ? bluePercent + greenPercent : index === 1 ? redPercent + greenPercent : redPercent + bluePercent), 0);
    const remaining = 100 - value;

    if (index === 0) {
      setRedPercent(value);
    } else if (index === 1) {
      setBluePercent(value);
    } else {
      setGreenPercent(value);
    }
    setFeedback("");
  };

  const spin = () => {
    setIsSpinning(true);
    setTimeout(() => {
      const rand = Math.random() * 100;
      let colorIndex = 0;
      let cumulative = redPercent;

      if (rand < redPercent) colorIndex = 0;
      else if (rand < redPercent + bluePercent) colorIndex = 1;
      else colorIndex = 2;

      const result = colors[colorIndex];
      setSpins((prev) => [...prev, result.name]);
      setIsSpinning(false);
    }, 1000);
  };

  const results: SpinResult[] = colors.map((c) => ({
    color: c.name,
    count: spins.filter((s) => s === c.name).length,
  }));

  const handleCheck = () => {
    if (spins.length === 0) {
      setFeedback("Spin the spinner first!");
    } else {
      const predictions = colors.map((c) => Math.round((c.percent / 100) * spins.length));
      const actual = results.map((r) => r.count);
      const message = `Prediction vs. Reality:\nRed: ${predictions[0]} predicted, ${actual[0]} actual\nBlue: ${predictions[1]} predicted, ${actual[1]} actual\nGreen: ${predictions[2]} predicted, ${actual[2]} actual`;
      setFeedback(message);
    }
  };

  const reset = () => {
    setSpins([]);
    setFeedback("");
  };

  return (
    <div className="interactive-widget">
      <h4>{t("Activity")} 3: Lucky Spinner</h4>
      <p className="subtext">Adjust the spinner colors, then spin to test your predictions!</p>

      <div style={{ marginTop: "1.5rem" }}>
        {/* Spinner visualization */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
          <svg width="240" height="280" viewBox="0 0 240 280">
            {/* Spinner circle */}
            <defs>
              <g id="spinner-circle">
                {colors.map((c, idx) => {
                  const startAngle = colors.slice(0, idx).reduce((sum, col) => sum + (col.percent / 100) * 360, 0);
                  const endAngle = startAngle + (c.percent / 100) * 360;
                  const radius = 80;

                  const startRad = (startAngle * Math.PI) / 180;
                  const endRad = (endAngle * Math.PI) / 180;

                  const x1 = 120 + radius * Math.cos(startRad - Math.PI / 2);
                  const y1 = 120 + radius * Math.sin(startRad - Math.PI / 2);
                  const x2 = 120 + radius * Math.cos(endRad - Math.PI / 2);
                  const y2 = 120 + radius * Math.sin(endRad - Math.PI / 2);

                  const largeArc = endAngle - startAngle > 180 ? 1 : 0;

                  return (
                    <path key={`sector-${idx}`} d={`M 120 120 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`} fill={c.color} stroke="#fff" strokeWidth="2" />
                  );
                })}
              </g>
            </defs>
            <use href="#spinner-circle" />
            <circle cx="120" cy="120" r="8" fill="#5b534c" />
            {/* Pointer */}
            <polygon points="120,30 115,50 125,50" fill="#d57d3d" />
          </svg>
        </div>

        {/* Spinner adjustment */}
        <div style={{ padding: "1rem", background: "#f7f1ea", borderRadius: "8px", marginBottom: "1.5rem" }}>
          <p style={{ fontWeight: 600, marginBottom: "1rem" }}>Spinner colors:</p>
          {colors.map((c, idx) => (
            <div key={idx} style={{ marginBottom: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <label style={{ fontWeight: 600 }}>
                  <span style={{ display: "inline-block", width: "20px", height: "20px", background: c.color, borderRadius: "3px", marginRight: "0.5rem", verticalAlign: "middle" }} />
                  {c.name}:
                </label>
                <span style={{ color: "#d57d3d", fontWeight: 700 }}>{idx === 0 ? redPercent : idx === 1 ? bluePercent : greenPercent}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={idx === 0 ? redPercent : idx === 1 ? bluePercent : greenPercent}
                onChange={(e) => handlePercentChange(idx, Number(e.target.value))}
                style={{ width: "100%" }}
              />
            </div>
          ))}
        </div>

        {/* Spin button */}
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <button
            onClick={spin}
            disabled={isSpinning}
            style={{
              padding: "1rem 2rem",
              background: "#d57d3d",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontWeight: 700,
              cursor: isSpinning ? "not-allowed" : "pointer",
              fontSize: "1rem",
              opacity: isSpinning ? 0.6 : 1,
            }}
          >
            {isSpinning ? "Spinning..." : "SPIN!"}
          </button>
        </div>

        {/* Results */}
        <div style={{ padding: "1rem", background: "#f7f1ea", borderRadius: "8px", marginBottom: "1.5rem" }}>
          <p style={{ fontWeight: 600, marginBottom: "1rem" }}>Results ({spins.length} spins):</p>
          {results.map((r, idx) => (
            <div key={idx} style={{ display: "flex", justifyContent: "space-between", padding: "0.4rem 0" }}>
              <span>{colors[idx].name}:</span>
              <span style={{ fontWeight: 700 }}>
                {r.count} ({spins.length > 0 ? ((r.count / spins.length) * 100).toFixed(0) : 0}%)
              </span>
            </div>
          ))}
        </div>

        {/* Feedback */}
        {feedback && (
          <div
            style={{
              padding: "0.8rem 1rem",
              borderRadius: "8px",
              marginBottom: "1rem",
              background: "#f6e2d1",
              color: "#7a4a2b",
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
            Compare Results
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
