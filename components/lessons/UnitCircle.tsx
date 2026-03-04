"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";

export default function UnitCircle() {
  const { t } = useI18n();
  const [deg, setDeg] = useState(45);
  const rad = (deg * Math.PI) / 180;
  const cosVal = Math.cos(rad);
  const sinVal = Math.sin(rad);
  const isSuccess = Math.abs(deg - 45) <= 3;

  const svgS = 300;
  const ctr = svgS / 2;
  const r = 110;
  const px = ctr + cosVal * r;
  const py = ctr - sinVal * r;

  return (
    <div className="interactive-widget">
      <h4>{t("Unit Circle & Trig Values")}</h4>
      <div className="scenario-panel">
        <div className="scenario-illustration">
          <svg className="scenario-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            {/* Compass rose */}
            <circle cx="50" cy="50" r="30" fill="none" stroke="#999" strokeWidth="1"/>
            {/* Cardinal directions */}
            <text x="50" y="25" textAnchor="middle" fontSize="8" fontWeight="bold">N</text>
            <text x="75" y="52" textAnchor="middle" fontSize="8" fontWeight="bold">E</text>
            <text x="50" y="75" textAnchor="middle" fontSize="8" fontWeight="bold">S</text>
            <text x="25" y="52" textAnchor="middle" fontSize="8" fontWeight="bold">W</text>
            {/* Center */}
            <circle cx="50" cy="50" r="2" fill="#333"/>
            {/* Bearing needle (045°) - NE direction */}
            <line x1="50" y1="50" x2="65" y2="35" stroke="#d57d3d" strokeWidth="1.5"/>
            <polygon points="65,35 64,36 66,36" fill="#d57d3d"/>
            {/* Ship silhouette */}
            <polygon points="50,65 48,70 52,70" fill="#333"/>
            <rect x="49" y="68" width="2" height="2" fill="#d57d3d"/>
          </svg>
        </div>
        <div className="scenario-text">
          <p className="detail-label">{t("Muscat Harbor Navigation")}</p>
          <p>{t("Set the bearing to 045° for the harbor route.")}</p>
        </div>
      </div>
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
          <li>{t("Set the angle to 30° and read sin and cos.")}</li>
          <li>{t("Find the angle where cos is 0.")}</li>
          <li>{t("Explain why tan grows large near 90°.")}</li>
        </ul>
      </div>
    </div>
  );
}
