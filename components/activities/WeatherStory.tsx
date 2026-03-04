"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";

type WeatherPoint = {
  day: string;
  temp: number;
};

export default function WeatherStory() {
  const { t } = useI18n();
  const [temps, setTemps] = useState<WeatherPoint[]>([
    { day: "Mon", temp: 22 },
    { day: "Tue", temp: 24 },
    { day: "Wed", temp: 20 },
    { day: "Thu", temp: 25 },
    { day: "Fri", temp: 23 },
    { day: "Sat", temp: 26 },
    { day: "Sun", temp: 21 },
  ]);
  const [feedback, setFeedback] = useState("");

  const maxTemp = Math.max(...temps.map((t) => t.temp));
  const minTemp = Math.min(...temps.map((t) => t.temp));
  const avgTemp = (temps.reduce((sum, t) => sum + t.temp, 0) / temps.length).toFixed(1);
  const hottest = temps.find((t) => t.temp === maxTemp);

  const handleTempChange = (index: number, value: number) => {
    setTemps((prev) => prev.map((t, i) => (i === index ? { ...t, temp: value } : t)));
    setFeedback("");
  };

  const handleCheck = () => {
    setFeedback(`✓ Hottest day: ${hottest?.day} (${maxTemp}°C) | Coldest: ${minTemp}°C | Average: ${avgTemp}°C`);
  };

  const reset = () => {
    setTemps([
      { day: "Mon", temp: 22 },
      { day: "Tue", temp: 24 },
      { day: "Wed", temp: 20 },
      { day: "Thu", temp: 25 },
      { day: "Fri", temp: 23 },
      { day: "Sat", temp: 26 },
      { day: "Sun", temp: 21 },
    ]);
    setFeedback("");
  };

  const scale = 3; // pixels per degree
  const graphHeight = 180;
  const graphWidth = 350;
  const padding = 40;

  const points = temps.map((t, i) => ({
    x: padding + (i * (graphWidth - padding * 2)) / (temps.length - 1),
    y: graphHeight - (t.temp - minTemp) * scale + padding,
  }));

  const polylinePoints = points.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div className="interactive-widget">
      <h4>{t("Activity")} 4: Weather Story</h4>
      <p className="subtext">Drag the temperature points to explore weekly weather patterns.</p>

      <div style={{ marginTop: "1.5rem" }}>
        {/* Graph */}
        <svg width="100%" height="350" viewBox={`0 0 ${graphWidth} ${graphHeight + padding * 2}`} style={{ border: "1px solid #e7e3df", borderRadius: "8px", background: "#faf8f5", marginBottom: "1.5rem" }}>
          {/* Grid lines */}
          {Array.from({ length: 5 }, (_, i) => {
            const y = padding + (i * (graphHeight - padding)) / 4;
            return (
              <line key={`gridline-${i}`} x1={padding} y1={y} x2={graphWidth - padding / 2} y2={y} stroke="#e7e3df" strokeWidth="0.5" strokeDasharray="3,3" />
            );
          })}

          {/* Axes */}
          <line x1={padding} y1={padding} x2={padding} y2={graphHeight + padding} stroke="#5b534c" strokeWidth="2" />
          <line x1={padding} y1={graphHeight + padding} x2={graphWidth - padding / 2} y2={graphHeight + padding} stroke="#5b534c" strokeWidth="2" />

          {/* Axis labels */}
          {temps.map((t, i) => (
            <text key={`label-${i}`} x={points[i].x} y={graphHeight + padding + 20} textAnchor="middle" fontSize="12" fill="#5b534c">
              {t.day}
            </text>
          ))}

          {/* Temperature axis label */}
          <text x="15" y={graphHeight / 2 + padding} textAnchor="middle" fontSize="10" fill="#5b534c" transform={`rotate(-90, 15, ${graphHeight / 2 + padding})`}>
            °C
          </text>

          {/* Line */}
          <polyline points={polylinePoints} fill="none" stroke="#d57d3d" strokeWidth="2" />

          {/* Points */}
          {points.map((p, i) => (
            <circle key={`point-${i}`} cx={p.x} cy={p.y} r="5" fill="#d57d3d" stroke="#fff" strokeWidth="2" />
          ))}
        </svg>

        {/* Temperature sliders */}
        <div style={{ padding: "1rem", background: "#f7f1ea", borderRadius: "8px", marginBottom: "1.5rem" }}>
          <p style={{ fontWeight: 600, marginBottom: "1rem" }}>Adjust daily temperatures:</p>
          {temps.map((t, idx) => (
            <div key={idx} style={{ marginBottom: "0.8rem" }}>
              <label style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
                <span style={{ fontWeight: 600 }}>{t.day}:</span>
                <span style={{ color: "#d57d3d", fontWeight: 700 }}>{t.temp}°C</span>
              </label>
              <input
                type="range"
                min="15"
                max="30"
                value={t.temp}
                onChange={(e) => handleTempChange(idx, Number(e.target.value))}
                style={{ width: "100%" }}
              />
            </div>
          ))}
        </div>

        {/* Stats */}
        <div style={{ padding: "1rem", background: "#e7f6f4", borderRadius: "8px", marginBottom: "1.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", textAlign: "center" }}>
            <div>
              <p style={{ fontSize: "0.85rem", color: "#5b534c" }}>Hottest:</p>
              <p style={{ fontSize: "1.3rem", fontWeight: 700, color: "#2f6f6a" }}>{maxTemp}°C</p>
            </div>
            <div>
              <p style={{ fontSize: "0.85rem", color: "#5b534c" }}>Coldest:</p>
              <p style={{ fontSize: "1.3rem", fontWeight: 700, color: "#2f6f6a" }}>{minTemp}°C</p>
            </div>
            <div>
              <p style={{ fontSize: "0.85rem", color: "#5b534c" }}>Average:</p>
              <p style={{ fontSize: "1.3rem", fontWeight: 700, color: "#2f6f6a" }}>{avgTemp}°C</p>
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
            Find Hottest
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
