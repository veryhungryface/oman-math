"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";

export default function FractionSlider() {
  const { t } = useI18n();
  const [value, setValue] = useState(50);
  const fraction = simplify(value, 100);
  const decimal = (value / 100).toFixed(2);

  return (
    <div className="interactive-widget">
      <h4>{t("Fraction / Decimal / Percent converter")}</h4>
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
