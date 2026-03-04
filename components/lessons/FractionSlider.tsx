"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";

export default function FractionSlider() {
  const { t } = useI18n();
  const [value, setValue] = useState(50);
  const fraction = simplify(value, 100);
  const decimal = (value / 100).toFixed(2);
  const isSuccess = Math.abs(value - 75) < 3;

  return (
    <div className="interactive-widget">
      <h4>{t("Fraction / Decimal / Percent converter")}</h4>
      <div className="scenario-panel">
        <div className="scenario-illustration">
          <svg className="scenario-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            {/* Market stall */}
            <rect x="10" y="60" width="80" height="30" fill="#8B6F47" stroke="#5a4a2f" strokeWidth="1"/>
            {/* Scale */}
            <rect x="35" y="45" width="30" height="20" fill="#ddd" stroke="#666" strokeWidth="1" rx="2"/>
            <circle cx="40" cy="55" r="3" fill="#666"/>
            <circle cx="60" cy="55" r="3" fill="#666"/>
            <line x1="50" y1="42" x2="50" y2="48" stroke="#999" strokeWidth="1"/>
            {/* Dates (simple circles) */}
            <circle cx="40" cy="55" r="2" fill="#8B4513"/>
            <circle cx="42" cy="56" r="2" fill="#8B4513"/>
            <circle cx="58" cy="54" r="2" fill="#8B4513"/>
            <circle cx="60" cy="55" r="2" fill="#8B4513"/>
            <circle cx="62" cy="56" r="2" fill="#8B4513"/>
            {/* Scale display */}
            <text x="50" y="52" textAnchor="middle" fontSize="6" fill="#000">
              {(value / 100).toFixed(2)} kg
            </text>
          </svg>
        </div>
        <div className="scenario-text">
          <p className="detail-label">{t("Omani Date Market Challenge")}</p>
          <p>{t("Help the shopkeeper measure out 3/4 kg of dates in the Muscat market.")}</p>
        </div>
      </div>
      <div className="slider-row">
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="range-slider"
        />
        <span className="slider-val">{value}%</span>
      </div>
      <div className="conversion-cards">
        <div className="conv-card">
          <p className="detail-label">{t("Fraction")}</p>
          <p className="conv-value">{fraction}</p>
        </div>
        <div className="conv-card">
          <p className="detail-label">{t("Decimal")}</p>
          <p className="conv-value">{decimal}</p>
        </div>
        <div className="conv-card">
          <p className="detail-label">{t("Percent")}</p>
          <p className="conv-value">{value}%</p>
        </div>
      </div>
      <div className="visual-bar">
        <div className="visual-fill" style={{ width: `${value}%` }} />
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
          <li>{t("Set the slider to 25% and read the fraction.")}</li>
          <li>{t("Find a value that equals 3/4.")}</li>
          <li>{t("Explain why 50% and 1/2 match.")}</li>
        </ul>
      </div>
    </div>
  );
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function simplify(num: number, den: number): string {
  if (num === 0) return "0";
  const g = gcd(num, den);
  return `${num / g}/${den / g}`;
}
