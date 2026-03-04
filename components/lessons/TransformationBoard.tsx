"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";

type Transform = "none" | "reflect-y" | "reflect-x" | "translate" | "rotate";

const originalPoints: [number, number][] = [[1, 1], [3, 1], [3, 3], [1, 3]];

function applyTransform(pts: [number, number][], tf: Transform): [number, number][] {
  switch (tf) {
    case "reflect-y": return pts.map(([x, y]) => [-x, y]);
    case "reflect-x": return pts.map(([x, y]) => [x, -y]);
    case "translate": return pts.map(([x, y]) => [x + 2, y + 1]);
    case "rotate": return pts.map(([x, y]) => [-y, x]);
    default: return pts;
  }
}

export default function TransformationBoard() {
  const { t } = useI18n();
  const [transform, setTransform] = useState<Transform>("none");
  const transformed = applyTransform(originalPoints, transform);
  const isSuccess = transform === "rotate";

  const svgW = 300;
  const svgH = 300;
  const scale = 30;
  const cx = svgW / 2;
  const cy = svgH / 2;

  function toSvg(x: number, y: number): string {
    return `${cx + x * scale},${cy - y * scale}`;
  }

  const origPath = originalPoints.map(([x, y]) => toSvg(x, y)).join(" ");
  const tfPath = transformed.map(([x, y]) => toSvg(x, y)).join(" ");

  const transforms: { key: Transform; label: string }[] = [
    { key: "none", label: "Original" },
    { key: "reflect-y", label: "Reflect Y" },
    { key: "reflect-x", label: "Reflect X" },
    { key: "translate", label: "Translate (+2,+1)" },
    { key: "rotate", label: "Rotate 90°" },
  ];

  return (
    <div className="interactive-widget">
      <h4>{t("Transformation Board")}</h4>
      <div className="scenario-panel">
        <div className="scenario-illustration">
          <svg className="scenario-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            {/* Islamic geometric tile - 4 quadrants */}
            {/* Top-left (original) */}
            <polygon points="10,10 40,10 40,40 10,40" fill="#f6e2d1" stroke="#d57d3d" strokeWidth="1.5"/>
            <circle cx="25" cy="25" r="8" fill="none" stroke="#d57d3d" strokeWidth="0.8"/>
            <line x1="10" y1="25" x2="40" y2="25" stroke="#d57d3d" strokeWidth="0.5"/>
            <line x1="25" y1="10" x2="25" y2="40" stroke="#d57d3d" strokeWidth="0.5"/>
            {/* Top-right (rotated) */}
            <polygon points="60,10 90,10 90,40 60,40" fill="#e7f1ef" stroke="#2f6f6a" strokeWidth="1.5"/>
            <circle cx="75" cy="25" r="8" fill="none" stroke="#2f6f6a" strokeWidth="0.8"/>
            <line x1="60" y1="25" x2="90" y2="25" stroke="#2f6f6a" strokeWidth="0.5"/>
            <line x1="75" y1="10" x2="75" y2="40" stroke="#2f6f6a" strokeWidth="0.5"/>
            {/* Bottom-left (empty) */}
            <polygon points="10,60 40,60 40,90 10,90" fill="#f7f1ea" stroke="#d6cfc9" strokeWidth="1.5" strokeDasharray="2,2"/>
            {/* Bottom-right (empty) */}
            <polygon points="60,60 90,60 90,90 60,90" fill="#f7f1ea" stroke="#d6cfc9" strokeWidth="1.5" strokeDasharray="2,2"/>
            {/* Center marker */}
            <circle cx="50" cy="50" r="2" fill="#d57d3d"/>
          </svg>
        </div>
        <div className="scenario-text">
          <p className="detail-label">{t("Oman Geometric Tile")}</p>
          <p>{t("Complete the Islamic geometric tile pattern with a 90° rotation.")}</p>
        </div>
      </div>
      <div className="poll-buttons">
        {transforms.map((tf) => (
          <button
            key={tf.key}
            className={`poll-btn ${transform === tf.key ? "poll-btn-active" : ""}`}
            type="button"
            onClick={() => setTransform(tf.key)}
          >
            {tf.label}
          </button>
        ))}
      </div>
      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="graph-svg">
        <line x1={0} y1={cy} x2={svgW} y2={cy} stroke="#d6cfc9" strokeWidth={1} />
        <line x1={cx} y1={0} x2={cx} y2={svgH} stroke="#d6cfc9" strokeWidth={1} />
        <polygon points={origPath} fill="rgba(56,86,176,0.2)" stroke="#3856b0" strokeWidth={2} />
        {transform !== "none" && (
          <polygon points={tfPath} fill="rgba(213,125,61,0.25)" stroke="#d57d3d" strokeWidth={2} strokeDasharray="6 3" />
        )}
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
          <li>{t("Reflect the shape and compare its orientation.")}</li>
          <li>{t("Translate the shape and describe the new coordinates.")}</li>
          <li>{t("Rotate 90 degrees and predict the result before clicking.")}</li>
        </ul>
      </div>
    </div>
  );
}
