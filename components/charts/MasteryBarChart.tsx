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

type MasteryDatum = {
  name: string;
  value: number;
};

type MasteryBarChartProps = {
  data: MasteryDatum[];
};

export default function MasteryBarChart({ data }: MasteryBarChartProps) {
  return (
    <div className="chart-card">
      <h4>Concept mastery map</h4>
      <div className="chart-frame">
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={data} barSize={28}>
            <CartesianGrid strokeDasharray="4 4" stroke="#e7e3df" />
            <XAxis dataKey="name" tickLine={false} axisLine={false} />
            <YAxis domain={[0, 100]} tickLine={false} axisLine={false} />
            <Tooltip cursor={{ fill: "#f7f1ea" }} />
            <Bar dataKey="value" fill="#3856b0" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
