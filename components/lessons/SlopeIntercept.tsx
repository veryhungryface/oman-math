"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { InlineMath, BlockMath } from "react-katex";

export default function SlopeIntercept() {
  const { t } = useI18n();
  const [slope, setSlope] = useState(2);
  const [intercept, setIntercept] = useState(1);
  const isSuccess = Math.abs(slope - 0.5) < 0.2 && Math.abs(intercept - 1) < 0.2;

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
      <div className="scenario-panel">
        <div className="scenario-illustration">
          <svg className="scenario-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            {/* Taxi */}
            <rect x="15" y="50" width="50" height="25" fill="#FFD700" stroke="#D4A000" strokeWidth="1.5" rx="3"/>
            <circle cx="25" cy="75" r="6" fill="#333"/>
            <circle cx="50" cy="75" r="6" fill="#333"/>
            {/* Windows */}
            <rect x="20" y="55" width="10" height="8" fill="#87CEEB" stroke="#333" strokeWidth="0.5"/>
            <rect x="35" y="55" width="10" height="8" fill="#87CEEB" stroke="#333" strokeWidth="0.5"/>
            {/* Road */}
            <line x1="0" y1="85" x2="100" y2="85" stroke="#666" strokeWidth="2"/>
            <line x1="10" y1="87" x2="20" y2="87" stroke="#FFD700" strokeWidth="1" strokeDasharray="2,2"/>
            <line x1="30" y1="87" x2="40" y2="87" stroke="#FFD700" strokeWidth="1" strokeDasharray="2,2"/>
            <line x1="50" y1="87" x2="60" y2="87" stroke="#FFD700" strokeWidth="1" strokeDasharray="2,2"/>
            {/* Fare display */}
            <text x="70" y="60" fontSize="8" fill="#000" fontWeight="bold">
              Cost
            </text>
            <text x="70" y="70" fontSize="10" fill="#d57d3d" fontWeight="bold">
              {(slope * 5 + intercept).toFixed(1)}
            </text>
          </svg>
        </div>
        <div className="scenario-text">
          <p className="detail-label">{t("Muscat Taxi Fare")}</p>
          <p>{t("Set the taxi fare equation using base fare and distance rate.")}</p>
        </div>
      </div>
      <div style={{ marginTop: "0.8rem", padding: "0.8rem", background: "#f7f1ea", borderRadius: "12px", fontSize: "1.1em" }}>
        <BlockMath math={`y = ${slope}x + ${intercept}`} />
      </div>
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
      {isSuccess ? (
        <div className="hint-text">
          {t("Success! Challenge complete.")}
        </div>
      ) : (
        <div className="challenge-miss">
          {t("In progress—adjust to meet the challenge.")}
        </div>
      )}
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
