"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";

export default function AreaPerimeter() {
  const { t } = useI18n();
  const [width, setWidth] = useState(4);
  const [height, setHeight] = useState(3);
  const area = width * height;
  const perimeter = 2 * (width + height);
  const isSuccess = area === 24;

  return (
    <div className="interactive-widget">
      <h4>{t("Area & Perimeter Explorer")}</h4>
      <div className="scenario-panel">
        <div className="scenario-illustration">
          <svg className="scenario-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            {/* Garden plot */}
            <rect x="20" y="20" width="60" height="60" fill="none" stroke="#2f6f6a" strokeWidth="2" strokeDasharray="3,3"/>
            {/* Plants (circles) */}
            <circle cx="35" cy="35" r="4" fill="#6DAA2D"/>
            <circle cx="50" cy="35" r="4" fill="#6DAA2D"/>
            <circle cx="65" cy="35" r="4" fill="#6DAA2D"/>
            <circle cx="35" cy="50" r="4" fill="#6DAA2D"/>
            <circle cx="50" cy="50" r="4" fill="#6DAA2D"/>
            <circle cx="65" cy="50" r="4" fill="#6DAA2D"/>
            <circle cx="35" cy="65" r="4" fill="#6DAA2D"/>
            <circle cx="50" cy="65" r="4" fill="#6DAA2D"/>
            <circle cx="65" cy="65" r="4" fill="#6DAA2D"/>
            {/* Grid lines */}
            <line x1="35" y1="20" x2="35" y2="80" stroke="#6DAA2D" strokeWidth="0.5" opacity="0.5"/>
            <line x1="50" y1="20" x2="50" y2="80" stroke="#6DAA2D" strokeWidth="0.5" opacity="0.5"/>
            <line x1="65" y1="20" x2="65" y2="80" stroke="#6DAA2D" strokeWidth="0.5" opacity="0.5"/>
          </svg>
        </div>
        <div className="scenario-text">
          <p className="detail-label">{t("School Garden Design")}</p>
          <p>{t("Design a school garden with exactly 24 square meters. Multiple solutions exist!")}</p>
        </div>
      </div>
      <div className="slider-row">
        <label>{t("Width")}: {width}</label>
        <input type="range" min={1} max={10} value={width} onChange={(e) => setWidth(Number(e.target.value))} className="range-slider" />
      </div>
      <div className="slider-row">
        <label>{t("Height")}: {height}</label>
        <input type="range" min={1} max={10} value={height} onChange={(e) => setHeight(Number(e.target.value))} className="range-slider" />
      </div>
      <div className="grid-visual" style={{ gridTemplateColumns: `repeat(${width}, 1fr)`, gridTemplateRows: `repeat(${height}, 1fr)` }}>
        {Array.from({ length: width * height }).map((_, i) => (
          <div key={i} className="grid-cell" />
        ))}
      </div>
      <div className="conversion-cards">
        <div className="conv-card">
          <p className="detail-label">{t("Area")}</p>
          <p className="conv-value">{area} sq units</p>
        </div>
        <div className="conv-card">
          <p className="detail-label">{t("Perimeter")}</p>
          <p className="conv-value">{perimeter} units</p>
        </div>
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
          <li>{t("Build a 4 by 3 rectangle and record area and perimeter.")}</li>
          <li>{t("Keep the area the same and change the perimeter.")}</li>
          <li>{t("Predict which shape has a larger perimeter before you test.")}</li>
        </ul>
      </div>
    </div>
  );
}
