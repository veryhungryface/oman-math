"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

type DomainDatum = {
  domain: string;
  value: number;
};

type DomainBarChartProps = {
  data: DomainDatum[];
  title?: string;
  className?: string;
};

export default function DomainBarChart({ data, title = "Domain distribution (K/U/A/R)", className = "" }: DomainBarChartProps) {
  return (
    <div className={`chart-card ${className}`.trim()}>
      <h4>{title}</h4>
      <div className="chart-frame">
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={data} barSize={36}>
            <CartesianGrid strokeDasharray="4 4" stroke="#e7e3df" />
            <XAxis dataKey="domain" tickLine={false} axisLine={false} />
            <YAxis domain={[0, 100]} tickLine={false} axisLine={false} />
            <Tooltip cursor={{ fill: "#f7f1ea" }} />
            <Bar dataKey="value" fill="#d57d3d" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
