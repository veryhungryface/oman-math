"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";

export default function SlopeIntercept() {
  const { t } = useI18n();
  const [slope, setSlope] = useState(2);
  const [intercept, setIntercept] = useState(1);

  const points: [number, number][] = [];
  for (let x = -5; x <= 5; x++) {
    points.push([x, slope * x + intercept]);
  }

  const svgW = 300;
  const svgH = 300;
  const scale = 25;
  const cx = svgW / 2;
  const cy = svgH / 2;

  function toSvg(x: number, y: number): [number, number] {
    return [cx + x * scale, cy - y * scale];
  }

  const pathD = points
    .map(([x, y]) => {
      const [sx, sy] = toSvg(x, y);
      return `${sx},${sy}`;
    })
    .join(" ");

  return (
    <div className="interactive-widget">
      <h4>{t("Slope & Intercept Explorer")}</h4>
      <p className="subtext">y = {slope}x + {intercept}</p>
      <div className="slider-row">
        <label>{t("Slope")} (m): {slope}</label>
        <input type="range" min={-5} max={5} step={0.5} value={slope} onChange={(e) => setSlope(Number(e.target.value))} className="range-slider" />
      </div>
      <div className="slider-row">
        <label>{t("Intercept")} (c): {intercept}</label>
        <input type="range" min={-5} max={5} step={0.5} value={intercept} onChange={(e) => setIntercept(Number(e.target.value))} className="range-slider" />
      </div>
      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="graph-svg">
        <line x1={0} y1={cy} x2={svgW} y2={cy} stroke="#d6cfc9" strokeWidth={1} />
        <line x1={cx} y1={0} x2={cx} y2={svgH} stroke="#d6cfc9" strokeWidth={1} />
        {[-4, -2, 2, 4].map((n) => {
          const [sx] = toSvg(n, 0);
          return <text key={`x${n}`} x={sx} y={cy + 14} textAnchor="middle" fontSize={10} fill="#5b534c">{n}</text>;
        })}
        {[-4, -2, 2, 4].map((n) => {
          const [, sy] = toSvg(0, n);
          return <text key={`y${n}`} x={cx - 12} y={sy + 4} textAnchor="end" fontSize={10} fill="#5b534c">{n}</text>;
        })}
        <polyline points={pathD} fill="none" stroke="#d57d3d" strokeWidth={2.5} />
        {(() => { const [ix, iy] = toSvg(0, intercept); return <circle cx={ix} cy={iy} r={5} fill="#2f6f6a" />; })()}
      </svg>
      <div className="lesson-task">
        <h5>{t("Try this")}</h5>
        <ul className="task-list">
          <li>{t("Set slope to 0 and describe the line.")}</li>
          <li>{t("Choose two points to match y = 2x + 1.")}</li>
          <li>{t("Explain how the intercept changes the graph.")}</li>
        </ul>
      </div>
    </div>
  );
}
