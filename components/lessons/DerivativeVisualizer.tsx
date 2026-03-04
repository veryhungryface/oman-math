"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { InlineMath, BlockMath } from "react-katex";

export default function DerivativeVisualizer() {
  const { t } = useI18n();
  const [xPos, setXPos] = useState(2);

  const f = (x: number) => x * x - 4 * x + 5;
  const df = (x: number) => 2 * x - 4;
  const yVal = f(xPos);
  const slope = df(xPos);

  const svgW = 300;
  const svgH = 300;
  const scaleX = 30;
  const scaleY = 20;
  const cx = svgW / 2;
  const cy = svgH * 0.7;

  function toSvg(x: number, y: number): [number, number] {
    return [cx + x * scaleX, cy - y * scaleY];
  }

  const curvePts: string[] = [];
  for (let x = -3; x <= 7; x += 0.2) {
    const [sx, sy] = toSvg(x, f(x));
    if (sy > -50 && sy < svgH + 50) curvePts.push(`${sx},${sy}`);
  }

  const [tx, ty] = toSvg(xPos, yVal);
  const tangLen = 2;
  const [t1x, t1y] = toSvg(xPos - tangLen, yVal - slope * tangLen);
  const [t2x, t2y] = toSvg(xPos + tangLen, yVal + slope * tangLen);

  const stationaryX = 2;
  const isStationary = Math.abs(slope) < 0.1;

  return (
    <div className="interactive-widget">
      <h4>{t("Derivative & Tangent Visualizer")}</h4>
      <div className="scenario-panel">
        <div className="scenario-illustration">
          <svg className="scenario-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            {/* Highway */}
            <rect x="10" y="50" width="80" height="20" fill="#666" stroke="#333" strokeWidth="0.5"/>
            {/* Road markings */}
            <line x1="10" y1="60" x2="30" y2="60" stroke="#FFD700" strokeWidth="1.5" strokeDasharray="3,3"/>
            <line x1="40" y1="60" x2="60" y2="60" stroke="#FFD700" strokeWidth="1.5" strokeDasharray="3,3"/>
            <line x1="70" y1="60" x2="90" y2="60" stroke="#FFD700" strokeWidth="1.5" strokeDasharray="3,3"/>
            {/* Car */}
            <rect x="45" y="48" width="12" height="8" fill="#3856b0" stroke="#000" strokeWidth="0.5" rx="1"/>
            <circle cx="48" cy="57" r="1.5" fill="#000"/>
            <circle cx="57" cy="57" r="1.5" fill="#000"/>
            {/* Speed indicator */}
            <text x="50" y="40" textAnchor="middle" fontSize="5" fontWeight="bold" fill="#000">
              {Math.abs(slope).toFixed(1)} km/h
            </text>
            {/* Arabic road sign */}
            <rect x="75" y="25" width="10" height="10" fill="#008000" stroke="#000" strokeWidth="0.5"/>
            <text x="80" y="32" textAnchor="middle" fontSize="4" fontWeight="bold" fill="#FFF">مسقط</text>
          </svg>
        </div>
        <div className="scenario-text">
          <p className="detail-label">{t("Muscat Highway Driving")}</p>
          <p>{t("Find where the car momentarily stops (zero velocity).")}</p>
        </div>
      </div>
      <div style={{ marginTop: "0.8rem", padding: "0.8rem", background: "#f7f1ea", borderRadius: "12px", fontSize: "1.1em" }}>
        <BlockMath math="f(x) = x^{2} - 4x + 5 \quad | \quad f'(x) = 2x - 4" />
      </div>
      <div className="slider-row">
        <label>x = {xPos.toFixed(1)}</label>
        <input type="range" min={-2} max={6} step={0.1} value={xPos} onChange={(e) => setXPos(Number(e.target.value))} className="range-slider" />
      </div>
      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="graph-svg">
        <line x1={0} y1={cy} x2={svgW} y2={cy} stroke="#d6cfc9" strokeWidth={1} />
        <line x1={cx} y1={0} x2={cx} y2={svgH} stroke="#d6cfc9" strokeWidth={1} />
        <polyline points={curvePts.join(" ")} fill="none" stroke="#3856b0" strokeWidth={2} />
        <line x1={t1x} y1={t1y} x2={t2x} y2={t2y} stroke="#d57d3d" strokeWidth={2} />
        <circle cx={tx} cy={ty} r={6} fill={isStationary ? "#2f6f6a" : "#d57d3d"} />
      </svg>
      <div className="conversion-cards">
        <div className="conv-card"><p className="detail-label">f({xPos.toFixed(1)})</p><p className="conv-value">{yVal.toFixed(2)}</p></div>
        <div className="conv-card"><p className="detail-label">f′({xPos.toFixed(1)})</p><p className="conv-value">{slope.toFixed(2)}</p></div>
        <div className="conv-card"><p className="detail-label">{t("Type")}</p><p className="conv-value">{slope > 0.1 ? "↗ Increasing" : slope < -0.1 ? "↘ Decreasing" : "● Stationary"}</p></div>
      </div>
      {isStationary ? (
        <div className="hint-text">
          {t("Success! Challenge complete.")} ({t("Stationary point at")} x = {stationaryX})
        </div>
      ) : (
        <div className="challenge-miss">
          {t("In progress—adjust to meet the challenge.")}
        </div>
      )}
      <div className="lesson-task">
        <h5>{t("Try this")}</h5>
        <ul className="task-list">
          <li>{t("Move x to find where the slope is 0.")}</li>
          <li>{t("Describe when the function is increasing.")}</li>
          <li>{t("Predict the slope before moving the slider.")}</li>
        </ul>
      </div>
    </div>
  );
}
