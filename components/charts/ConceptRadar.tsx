"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip
} from "recharts";

type ConceptDatum = {
  name: string;
  score: number;
};

type ConceptRadarProps = {
  data: ConceptDatum[];
  title?: string;
  variant?: "card" | "plain";
  className?: string;
};

export default function ConceptRadar({
  data,
  title = "Concept radar",
  variant = "card",
  className = ""
}: ConceptRadarProps) {
  const content = (
    <div className="chart-frame">
      <ResponsiveContainer width="100%" height={240}>
        <RadarChart data={data} outerRadius="70%">
          <PolarGrid stroke="#e7e3df" />
          <PolarAngleAxis dataKey="name" tick={{ fontSize: 11 }} />
          <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
          <Tooltip />
          <Radar dataKey="score" stroke="#2f6f6a" fill="#2f6f6a" fillOpacity={0.35} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );

  if (variant === "plain") {
    return <div className={className}>{content}</div>;
  }

  return (
    <div className={`chart-card ${className}`.trim()}>
      <h4>{title}</h4>
      {content}
    </div>
  );
}
