"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";

export default function QuadraticExplorer() {
  const { t } = useI18n();
  const [a, setA] = useState(1);
  const [b, setB] = useState(-4);
  const [c, setC] = useState(3);

  const disc = b * b - 4 * a * c;
  const vertexX = a !== 0 ? -b / (2 * a) : 0;
  const vertexY = a !== 0 ? a * vertexX * vertexX + b * vertexX + c : c;

  const rootsText =
    disc > 0
      ? `2 roots: x = ${((-b + Math.sqrt(disc)) / (2 * a)).toFixed(2)}, ${((-b - Math.sqrt(disc)) / (2 * a)).toFixed(2)}`
      : disc === 0
        ? `1 repeated root: x = ${(-b / (2 * a)).toFixed(2)}`
        : "No real roots";

  const svgW = 300;
  const svgH = 300;
  const scaleX = 25;
  const scaleY = 15;
  const cx = svgW / 2;
  const cy = svgH / 2;

  const pts: string[] = [];
  for (let px = -6; px <= 6; px += 0.3) {
    const py = a * px * px + b * px + c;
    const sx = cx + px * scaleX;
    const sy = cy - py * scaleY;
    if (sy > -50 && sy < svgH + 50) {
      pts.push(`${sx},${sy}`);
    }
  }

  return (
    <div className="interactive-widget">
      <h4>{t("Quadratic Explorer")}</h4>
      <p className="subtext">y = {a}x² + ({b})x + {c}</p>
      <div className="slider-row">
        <label>a: {a}</label>
        <input type="range" min={-3} max={3} step={0.5} value={a} onChange={(e) => setA(Number(e.target.value))} className="range-slider" />
      </div>
      <div className="slider-row">
        <label>b: {b}</label>
        <input type="range" min={-6} max={6} step={1} value={b} onChange={(e) => setB(Number(e.target.value))} className="range-slider" />
      </div>
      <div className="slider-row">
        <label>c: {c}</label>
        <input type="range" min={-5} max={5} step={1} value={c} onChange={(e) => setC(Number(e.target.value))} className="range-slider" />
      </div>
      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="graph-svg">
        <line x1={0} y1={cy} x2={svgW} y2={cy} stroke="#d6cfc9" strokeWidth={1} />
        <line x1={cx} y1={0} x2={cx} y2={svgH} stroke="#d6cfc9" strokeWidth={1} />
        {pts.length > 1 && <polyline points={pts.join(" ")} fill="none" stroke="#d57d3d" strokeWidth={2.5} />}
        <circle cx={cx + vertexX * scaleX} cy={cy - vertexY * scaleY} r={5} fill="#2f6f6a" />
      </svg>
      <div className="conversion-cards">
        <div className="conv-card"><p className="detail-label">{t("Discriminant")}</p><p className="conv-value">{disc.toFixed(1)}</p></div>
        <div className="conv-card"><p className="detail-label">{t("Vertex")}</p><p className="conv-value">({vertexX.toFixed(1)}, {vertexY.toFixed(1)})</p></div>
        <div className="conv-card"><p className="detail-label">{t("Roots")}</p><p className="conv-value" style={{ fontSize: "0.8rem" }}>{rootsText}</p></div>
      </div>
      <div className="lesson-task">
        <h5>{t("Try this")}</h5>
        <ul className="task-list">
          <li>{t("Adjust a and describe how the parabola opens.")}</li>
          <li>{t("Change b and observe the vertex movement.")}</li>
          <li>{t("Find a case with exactly one root.")}</li>
        </ul>
      </div>
    </div>
  );
}
