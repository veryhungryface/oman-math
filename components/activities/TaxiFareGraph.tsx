"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";

export default function TaxiFareGraph() {
  const { t } = useI18n();
  const [baseFare, setBaseFare] = useState(2);
  const [perMinute, setPerMinute] = useState(0.5);
  const [query, setQuery] = useState("");
  const [feedback, setFeedback] = useState("");

  const calculateFare = (minutes: number) => baseFare + minutes * perMinute;
  const fare20min = calculateFare(20);

  const points = Array.from({ length: 11 }, (_, i) => i * 10).map((min) => ({
    minutes: min,
    fare: calculateFare(min),
  }));

  const maxFare = Math.max(...points.map((p) => p.fare));
  const scale = 200 / maxFare;

  const handleCheck = () => {
    setFeedback(`✓ A 20-minute ride costs €${fare20min.toFixed(2)} (Base: €${baseFare} + 20 min × €${perMinute}/min = €${fare20min.toFixed(2)})`);
  };

  const reset = () => {
    setBaseFare(2);
    setPerMinute(0.5);
    setQuery("");
    setFeedback("");
  };

  return (
    <div className="interactive-widget">
      <h4>{t("Activity")} 3: Taxi Fare Graph</h4>
      <p className="subtext">Adjust the base fare and per-minute rate, then calculate fares.</p>

      <div style={{ marginTop: "1.5rem" }}>
        {/* Sliders */}
        <div style={{ padding: "1rem", background: "#f7f1ea", borderRadius: "8px", marginBottom: "1.5rem" }}>
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>
              Base fare: <span style={{ color: "#d57d3d" }}>€{baseFare.toFixed(2)}</span>
            </label>
            <input
              type="range"
              min="1"
              max="5"
              step="0.5"
              value={baseFare}
              onChange={(e) => {
                setBaseFare(Number(e.target.value));
                setFeedback("");
              }}
              style={{ width: "100%" }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>
              Per minute: <span style={{ color: "#d57d3d" }}>€{perMinute.toFixed(2)}</span>
            </label>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={perMinute}
              onChange={(e) => {
                setPerMinute(Number(e.target.value));
                setFeedback("");
              }}
              style={{ width: "100%" }}
            />
          </div>
        </div>

        {/* Graph */}
        <svg width="100%" height="280" viewBox="0 0 300 280" style={{ border: "1px solid #e7e3df", borderRadius: "8px", background: "#faf8f5", marginBottom: "1.5rem" }}>
          {/* Grid */}
          {Array.from({ length: 5 }, (_, i) => (
            <line key={`hgrid-${i}`} x1="40" y1={40 + (i * 200) / 4} x2="280" y2={40 + (i * 200) / 4} stroke="#e7e3df" strokeWidth="0.5" strokeDasharray="3,3" />
          ))}

          {/* Axes */}
          <line x1="40" y1="40" x2="40" y2="240" stroke="#5b534c" strokeWidth="2" />
          <line x1="40" y1="240" x2="280" y2="240" stroke="#5b534c" strokeWidth="2" />

          {/* Axis labels */}
          {Array.from({ length: 6 }, (_, i) => (
            <text key={`xlabel-${i}`} x={40 + (i * 240) / 5} y="260" textAnchor="middle" fontSize="10" fill="#5b534c">
              {i * 10}min
            </text>
          ))}

          {/* Line */}
          <polyline
            points={points.map((p, i) => `${40 + (i * 240) / 10},${240 - p.fare * scale}`).join(" ")}
            fill="none"
            stroke="#d57d3d"
            strokeWidth="2"
          />

          {/* Points */}
          {points.map((p, i) => (
            <circle key={`point-${i}`} cx={40 + (i * 240) / 10} cy={240 - p.fare * scale} r="3" fill="#d57d3d" />
          ))}

          {/* Y-axis label */}
          <text x="15" y="140" textAnchor="middle" fontSize="10" fill="#5b534c" transform="rotate(-90, 15, 140)">
            €
          </text>
        </svg>

        {/* Fare table */}
        <div style={{ padding: "1rem", background: "#e7f6f4", borderRadius: "8px", marginBottom: "1.5rem" }}>
          <p style={{ fontWeight: 600, marginBottom: "0.8rem" }}>Sample fares:</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem" }}>
            {[0, 10, 20, 30].map((min) => (
              <div key={min}>
                <p style={{ fontSize: "0.85rem", color: "#5b534c" }}>{min} min:</p>
                <p style={{ fontSize: "1.2rem", fontWeight: 700, color: "#2f6f6a" }}>€{calculateFare(min).toFixed(2)}</p>
              </div>
            ))}
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
            Calculate 20-Min Fare
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
