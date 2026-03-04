"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";

type Furniture = {
  id: string;
  name: string;
  width: number;
  height: number;
  x: number;
  y: number;
  area: number;
};

export default function RoomPlanner() {
  const { t } = useI18n();
  const [furniture, setFurniture] = useState<Furniture[]>([
    { id: "bed", name: "Bed", width: 3, height: 2, x: 10, y: 20, area: 6 },
    { id: "desk", name: "Desk", width: 2, height: 1, x: 50, y: 20, area: 2 },
  ]);
  const [dragging, setDragging] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("");

  const roomWidth = 80;
  const roomHeight = 60;
  const totalArea = furniture.reduce((sum, f) => sum + f.area, 0);

  const handleMouseDown = (id: string) => {
    setDragging(id);
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!dragging) return;
    const svg = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - svg.left) / (svg.width / roomWidth);
    const y = (e.clientY - svg.top) / (svg.height / roomHeight);

    setFurniture((prev) =>
      prev.map((f) => (f.id === dragging ? { ...f, x: Math.max(0, Math.min(x - f.width / 2, roomWidth - f.width)), y: Math.max(0, Math.min(y - f.height / 2, roomHeight - f.height)) } : f))
    );
  };

  const handleCheck = () => {
    if (totalArea > 0) {
      setFeedback(`✓ Great job! Your room uses ${totalArea} square units of furniture. Try rearranging to use more space efficiently!`);
    }
  };

  const reset = () => {
    setFurniture([
      { id: "bed", name: "Bed", width: 3, height: 2, x: 10, y: 20, area: 6 },
      { id: "desk", name: "Desk", width: 2, height: 1, x: 50, y: 20, area: 2 },
    ]);
    setFeedback("");
  };

  return (
    <div className="interactive-widget">
      <h4>{t("Activity")} 1: Room Planner</h4>
      <p className="subtext">Drag furniture around your room and calculate the total area.</p>

      <div style={{ marginTop: "1.5rem" }}>
        <svg
          width="100%"
          height="300"
          viewBox={`0 0 ${roomWidth} ${roomHeight}`}
          style={{ border: "2px solid #5b534c", borderRadius: "8px", background: "#faf8f5", cursor: dragging ? "grabbing" : "grab" }}
          onMouseMove={handleMouseMove}
          onMouseUp={() => setDragging(null)}
          onMouseLeave={() => setDragging(null)}
        >
          {/* Room grid */}
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#e7e3df" strokeWidth="0.2" />
            </pattern>
          </defs>
          <rect width={roomWidth} height={roomHeight} fill="url(#grid)" />

          {/* Furniture */}
          {furniture.map((f) => (
            <g key={f.id} onMouseDown={() => handleMouseDown(f.id)}>
              <rect x={f.x} y={f.y} width={f.width} height={f.height} fill="#d57d3d" stroke="#5b534c" strokeWidth="0.3" rx="0.5" />
              <text x={f.x + f.width / 2} y={f.y + f.height / 2 + 0.3} textAnchor="middle" fontSize="1.5" fill="#fff" fontWeight="bold">
                {f.name[0]}
              </text>
            </g>
          ))}
        </svg>

        {/* Furniture list with areas */}
        <div style={{ marginTop: "1.5rem", padding: "1rem", background: "#f7f1ea", borderRadius: "8px" }}>
          <p style={{ fontWeight: 600, marginBottom: "0.5rem" }}>Furniture Placed:</p>
          {furniture.map((f) => (
            <div key={f.id} style={{ display: "flex", justifyContent: "space-between", padding: "0.4rem 0", fontSize: "0.9rem" }}>
              <span>{f.name}:</span>
              <span style={{ fontWeight: 600 }}>
                {f.width} × {f.height} = {f.area} sq units
              </span>
            </div>
          ))}
          <div style={{ borderTop: "1px solid #d57d3d", marginTop: "0.5rem", paddingTop: "0.5rem", fontWeight: 700, color: "#d57d3d" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Total Area:</span>
              <span>{totalArea} sq units</span>
            </div>
          </div>
        </div>

        {/* Feedback */}
        {feedback && (
          <div
            style={{
              padding: "0.8rem 1rem",
              borderRadius: "8px",
              marginTop: "1rem",
              background: "#e7f6f4",
              color: "#1a4a47",
              fontWeight: 600,
            }}
          >
            {feedback}
          </div>
        )}

        {/* Buttons */}
        <div style={{ display: "flex", gap: "0.8rem", marginTop: "1rem" }}>
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
            Check Layout
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
