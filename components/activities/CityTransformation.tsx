"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";

type Transform = "none" | "reflect" | "translate" | "rotate" | "scale";

export default function CityTransformation() {
  const { t } = useI18n();
  const [transform, setTransform] = useState<Transform>("none");
  const [feedback, setFeedback] = useState("");

  const transformations: { id: Transform; name: string; description: string }[] = [
    { id: "none", name: "Original", description: "No change" },
    { id: "reflect", name: "Reflect", description: "Mirror across vertical axis" },
    { id: "translate", name: "Translate", description: "Slide to the right" },
    { id: "rotate", name: "Rotate", description: "Turn clockwise" },
    { id: "scale", name: "Scale", description: "Make bigger" },
  ];

  const getBuilding = (id: Transform) => {
    const base = (
      <g>
        <rect x="20" y="40" width="30" height="40" fill="#d57d3d" stroke="#5b534c" strokeWidth="2" />
        <rect x="30" y="50" width="8" height="8" fill="#ffeaa7" />
        <rect x="42" y="50" width="8" height="8" fill="#ffeaa7" />
        <circle cx="35" cy="20" r="8" fill="#ff6b6b" />
      </g>
    );

    const transforms: Record<Transform, React.ReactNode> = {
      none: base,
      reflect: <g transform="scale(-1, 1) translate(-70, 0)">{base}</g>,
      translate: <g transform="translate(15, 0)">{base}</g>,
      rotate: <g transform="rotate(15, 35, 40)">{base}</g>,
      scale: <g transform="scale(1.3, 1.3) translate(5, 3)">{base}</g>,
    };

    return transforms[id];
  };

  const handleCheck = () => {
    if (transform === "none") {
      setFeedback("Choose a transformation to apply!");
    } else {
      setFeedback(`✓ You applied: ${transformations.find((t) => t.id === transform)?.name}. The building ${transformations.find((t) => t.id === transform)?.description.toLowerCase()}.`);
    }
  };

  const reset = () => {
    setTransform("none");
    setFeedback("");
  };

  return (
    <div className="interactive-widget">
      <h4>{t("Activity")} 1: City Transformation</h4>
      <p className="subtext">Apply geometric transformations to a building.</p>

      <div style={{ marginTop: "1.5rem" }}>
        {/* Visualization */}
        <div
          style={{
            display: "flex",
            gap: "2rem",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "2rem",
            flexWrap: "wrap",
          }}
        >
          {/* Original */}
          <div style={{ textAlign: "center" }}>
            <p style={{ fontWeight: 600, marginBottom: "0.5rem" }}>Original</p>
            <svg width="120" height="120" viewBox="0 0 70 90" style={{ border: "1px solid #e7e3df", borderRadius: "4px", background: "#faf8f5" }}>
              {getBuilding("none")}
            </svg>
          </div>

          {/* Transformed */}
          <div style={{ textAlign: "center" }}>
            <p style={{ fontWeight: 600, marginBottom: "0.5rem" }}>After Transformation</p>
            <svg width="120" height="120" viewBox="0 0 70 90" style={{ border: "1px solid #e7e3df", borderRadius: "4px", background: "#faf8f5" }}>
              {getBuilding(transform)}
            </svg>
          </div>
        </div>

        {/* Transformation buttons */}
        <div style={{ marginBottom: "1.5rem" }}>
          <p style={{ fontWeight: 600, marginBottom: "1rem" }}>Choose a transformation:</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem" }}>
            {transformations.filter((t) => t.id !== "none").map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setTransform(t.id);
                  setFeedback("");
                }}
                style={{
                  padding: "0.8rem",
                  background: transform === t.id ? "#d57d3d" : "#fff",
                  color: transform === t.id ? "#fff" : "#5b534c",
                  border: transform === t.id ? "none" : "2px solid #ddd",
                  borderRadius: "6px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {t.name}
              </button>
            ))}
          </div>
          <p style={{ fontSize: "0.85rem", color: "#5b534c", marginTop: "0.8rem" }}>
            {transformations.find((t) => t.id === transform)?.description}
          </p>
        </div>

        {/* Feedback */}
        {feedback && (
          <div
            style={{
              padding: "0.8rem 1rem",
              borderRadius: "8px",
              marginBottom: "1rem",
              background: "#e7f6f4",
              color: "#1a4a47",
              fontWeight: 600,
            }}
          >
            {feedback}
          </div>
        )}

        {/* Buttons */}
        <div style={{ display: "flex", gap: "0.8rem" }}>
          <button
            onClick={handleCheck}
            style={{
              padding: "0.7rem 1.5rem",
              background: "#d57d3d",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Check
          </button>
          <button
            onClick={reset}
            style={{
              padding: "0.7rem 1.5rem",
              background: "#fff",
              color: "#5b534c",
              border: "1px solid #ddd",
              borderRadius: "8px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
