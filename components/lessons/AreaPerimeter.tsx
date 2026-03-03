"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";

export default function AreaPerimeter() {
  const { t } = useI18n();
  const [width, setWidth] = useState(4);
  const [height, setHeight] = useState(3);
  const area = width * height;
  const perimeter = 2 * (width + height);

  return (
    <div className="interactive-widget">
      <h4>{t("Area & Perimeter Explorer")}</h4>
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
