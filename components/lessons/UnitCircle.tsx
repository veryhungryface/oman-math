"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";

export default function UnitCircle() {
  const { t } = useI18n();
  const [deg, setDeg] = useState(45);
  const rad = (deg * Math.PI) / 180;
  const cosVal = Math.cos(rad);
  const sinVal = Math.sin(rad);

  const svgS = 300;
  const ctr = svgS / 2;
  const r = 110;
  const px = ctr + cosVal * r;
  const py = ctr - sinVal * r;

  return (
    <div className="interactive-widget">
      <h4>{t("Unit Circle & Trig Values")}</h4>
      <div className="slider-row">
        <label>{t("Angle")}: {deg}° = {(rad).toFixed(3)} rad</label>
        <input type="range" min={0} max={360} value={deg} onChange={(e) => setDeg(Number(e.target.value))} className="range-slider" />
      </div>
      <svg viewBox={`0 0 ${svgS} ${svgS}`} className="graph-svg">
        <line x1={0} y1={ctr} x2={svgS} y2={ctr} stroke="#d6cfc9" strokeWidth={1} />
        <line x1={ctr} y1={0} x2={ctr} y2={svgS} stroke="#d6cfc9" strokeWidth={1} />
        <circle cx={ctr} cy={ctr} r={r} fill="none" stroke="#e7e3df" strokeWidth={1.5} />
        <line x1={ctr} y1={ctr} x2={px} y2={py} stroke="#d57d3d" strokeWidth={2.5} />
        <line x1={px} y1={py} x2={px} y2={ctr} stroke="#3856b0" strokeWidth={1.5} strokeDasharray="4 3" />
        <line x1={ctr} y1={ctr} x2={px} y2={ctr} stroke="#2f6f6a" strokeWidth={1.5} strokeDasharray="4 3" />
        <circle cx={px} cy={py} r={5} fill="#d57d3d" />
        <text x={px + 8} y={py - 8} fontSize={11} fill="#d57d3d">({cosVal.toFixed(2)}, {sinVal.toFixed(2)})</text>
      </svg>
      <div className="conversion-cards">
        <div className="conv-card"><p className="detail-label">cos θ</p><p className="conv-value">{cosVal.toFixed(4)}</p></div>
        <div className="conv-card"><p className="detail-label">sin θ</p><p className="conv-value">{sinVal.toFixed(4)}</p></div>
        <div className="conv-card"><p className="detail-label">tan θ</p><p className="conv-value">{cosVal !== 0 ? (sinVal / cosVal).toFixed(4) : "∞"}</p></div>
      </div>
      <div className="lesson-task">
        <h5>{t("Try this")}</h5>
        <ul className="task-list">
          <li>{t("Set the angle to 30° and read sin and cos.")}</li>
          <li>{t("Find the angle where cos is 0.")}</li>
          <li>{t("Explain why tan grows large near 90°.")}</li>
        </ul>
      </div>
    </div>
  );
}
