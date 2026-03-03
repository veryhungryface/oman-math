"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";

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
      <p className="subtext">f(x) = x² − 4x + 5 | f′(x) = 2x − 4</p>
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
      {isStationary && <p className="hint-text">{t("Stationary point at")} x = {stationaryX} ({t("minimum")})</p>}
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
