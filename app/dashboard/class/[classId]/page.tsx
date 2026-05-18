"use client";

import ConceptRadar from "@/components/charts/ConceptRadar";
import KpiCard from "@/components/KpiCard";
import SectionHeader from "@/components/SectionHeader";
import {
  classId,
  fractionDiagnostics,
  fractionMisconceptionCatalog,
  fractionSkillCatalog,
  studentReports
} from "@/data/samples";
import { useI18n } from "@/lib/i18n";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

type DashboardPageProps = {
  params: { classId: string };
};

const SKILL_BAND_COLORS = {
  strong: "#3aa57f",
  ok: "#d57d3d",
  watch: "#e58a5f",
  risk: "#c0392b"
};

function bandColor(score: number) {
  if (score >= 75) return SKILL_BAND_COLORS.strong;
  if (score >= 60) return SKILL_BAND_COLORS.ok;
  if (score >= 45) return SKILL_BAND_COLORS.watch;
  return SKILL_BAND_COLORS.risk;
}

export default function DashboardPage({ params }: DashboardPageProps) {
  const { t } = useI18n();
  const [filter, setFilter] = useState<"all" | "risk" | "reasoning" | "concept">("all");
  const dashboardStudents = studentReports;

  const classAverage = useMemo(() => {
    const totals = dashboardStudents.reduce(
      (acc, report) => {
        acc.K += report.cognitiveScores.K;
        acc.U += report.cognitiveScores.U;
        acc.A += report.cognitiveScores.A;
        acc.R += report.cognitiveScores.R;
        acc.mastery += report.overallMastery;
        return acc;
      },
      { K: 0, U: 0, A: 0, R: 0, mastery: 0 }
    );
    const count = dashboardStudents.length || 1;
    return {
      K: Math.round(totals.K / count),
      U: Math.round(totals.U / count),
      A: Math.round(totals.A / count),
      R: Math.round(totals.R / count),
      mastery: Math.round(totals.mastery / count)
    };
  }, [dashboardStudents]);

  const fractionSkillAverages = useMemo(() => {
    return fractionSkillCatalog.map((skill) => {
      const sum = fractionDiagnostics.reduce((acc, row) => acc + row.skills[skill.key], 0);
      const avg = Math.round(sum / fractionDiagnostics.length);
      return { key: skill.key, label: skill.label, avg };
    });
  }, []);

  const fractionMasteryAvg = useMemo(() => {
    const all = fractionDiagnostics.flatMap((row) =>
      fractionSkillCatalog.map((s) => row.skills[s.key])
    );
    return Math.round(all.reduce((a, b) => a + b, 0) / all.length);
  }, []);

  const misconceptionFrequency = useMemo(() => {
    const counts = new Map<string, { code: string; short: string; count: number; students: string[] }>();
    fractionMisconceptionCatalog.forEach((m) =>
      counts.set(m.code, { code: m.code, short: m.short, count: 0, students: [] })
    );
    fractionDiagnostics.forEach((row) => {
      row.activeMisconceptions.forEach((code) => {
        const entry = counts.get(code);
        if (entry) {
          entry.count += 1;
          entry.students.push(row.studentName.split(" ")[0]);
        }
      });
    });
    return Array.from(counts.values())
      .filter((c) => c.count > 0)
      .sort((a, b) => b.count - a.count);
  }, []);

  const masteryDistribution = useMemo(() => {
    const buckets = [
      { range: "0–40", min: 0, max: 40, count: 0, color: SKILL_BAND_COLORS.risk },
      { range: "41–60", min: 41, max: 60, count: 0, color: SKILL_BAND_COLORS.watch },
      { range: "61–75", min: 61, max: 75, count: 0, color: SKILL_BAND_COLORS.ok },
      { range: "76–100", min: 76, max: 100, count: 0, color: SKILL_BAND_COLORS.strong }
    ];
    fractionDiagnostics.forEach((row) => {
      const avg =
        fractionSkillCatalog.reduce((sum, s) => sum + row.skills[s.key], 0) /
        fractionSkillCatalog.length;
      const b = buckets.find((x) => avg >= x.min && avg <= x.max);
      if (b) b.count += 1;
    });
    return buckets;
  }, []);

  const filteredStudents = useMemo(() => {
    if (filter === "risk") return dashboardStudents.filter((s) => s.riskLevel === "risk");
    if (filter === "reasoning") return dashboardStudents.filter((s) => s.cognitiveScores.R < 50);
    if (filter === "concept") return dashboardStudents.filter((s) => s.overallMastery < 60);
    return dashboardStudents;
  }, [filter, dashboardStudents]);

  const riskStudents = dashboardStudents.filter((s) => s.riskLevel === "risk").slice(0, 3);
  const weakConcepts = useMemo(() => {
    const conceptMap = new Map<string, number[]>();
    dashboardStudents.forEach((report) => {
      report.conceptScores.forEach((concept) => {
        const list = conceptMap.get(concept.name) ?? [];
        list.push(concept.score);
        conceptMap.set(concept.name, list);
      });
    });
    const averages = Array.from(conceptMap.entries()).map(([name, scores]) => {
      const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
      return { name, avg: Math.round(avg) };
    });
    return averages.sort((a, b) => a.avg - b.avg).slice(0, 3);
  }, [dashboardStudents]);

  const totalMisconceptions = fractionDiagnostics.reduce(
    (acc, row) => acc + row.activeMisconceptions.length,
    0
  );
  const studentsWithMisconceptions = fractionDiagnostics.filter(
    (r) => r.activeMisconceptions.length > 0
  ).length;

  return (
    <div>
      <SectionHeader
        eyebrow={t("Teacher Dashboard")}
        title={`${t("Class")} ${params.classId || classId}`}
        description={t("At-a-glance cognitive heatmap and risk scan across 10 students.")}
      />

      <div className="info-grid" style={{ marginBottom: "1.5rem" }}>
        <KpiCard label={t("Average mastery")} value={`${classAverage.mastery}%`} />
        <KpiCard
          label={t("Fraction mastery")}
          value={`${fractionMasteryAvg}%`}
          helper={t("Across 6 fraction sub-skills")}
        />
        <KpiCard
          label={t("Active misconceptions")}
          value={`${totalMisconceptions}`}
          helper={`${studentsWithMisconceptions}/${fractionDiagnostics.length} ${t("students")}`}
        />
        <KpiCard
          label={t("Risk students")}
          value={`${dashboardStudents.filter((s) => s.riskLevel === "risk").length}`}
          helper={t("Immediate support")}
        />
      </div>

      <SectionHeader
        eyebrow={t("Fraction Diagnostic")}
        title={t("Fraction Misconception Map")}
        description={t("See at a glance which sub-skills each student is missing and which misconceptions are currently active.")}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.5fr) minmax(0, 1fr)",
          gap: "1.5rem",
          marginBottom: "1.5rem"
        }}
        className="fraction-chart-grid"
      >
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.4rem", flexWrap: "wrap", gap: "0.5rem" }}>
            <h4 style={{ margin: 0 }}>{t("Class skill mastery by sub-skill")}</h4>
            <span className="subtext" style={{ fontSize: "0.78rem" }}>
              {t("Color = mastery band")} · <span style={{ color: SKILL_BAND_COLORS.strong, fontWeight: 600 }}>≥75</span>{" "}
              <span style={{ color: SKILL_BAND_COLORS.ok, fontWeight: 600 }}>60–74</span>{" "}
              <span style={{ color: SKILL_BAND_COLORS.watch, fontWeight: 600 }}>45–59</span>{" "}
              <span style={{ color: SKILL_BAND_COLORS.risk, fontWeight: 600 }}>&lt;45</span>
            </span>
          </div>
          <div style={{ width: "100%", height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={fractionSkillAverages} margin={{ top: 20, right: 10, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="4 4" stroke="#e7e3df" vertical={false} />
                <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} interval={0} />
                <YAxis domain={[0, 100]} tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
                <Tooltip cursor={{ fill: "#f7f1ea" }} formatter={(v: number) => `${v}%`} />
                <Bar dataKey="avg" radius={[8, 8, 0, 0]}>
                  {fractionSkillAverages.map((d) => (
                    <Cell key={d.key} fill={bandColor(d.avg)} />
                  ))}
                  <LabelList dataKey="avg" position="top" formatter={(v: number) => `${v}%`} style={{ fontSize: 11, fontWeight: 600 }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="subtext" style={{ fontSize: "0.8rem", marginTop: "0.5rem" }}>
            {t("Division and Multiplication are the weakest sub-skills — focus next reteach block here.")}
          </p>
        </div>

        <div className="card">
          <h4 style={{ margin: "0 0 0.4rem 0" }}>{t("Class mastery distribution")}</h4>
          <div style={{ width: "100%", height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={masteryDistribution} margin={{ top: 20, right: 10, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="4 4" stroke="#e7e3df" vertical={false} />
                <XAxis dataKey="range" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
                <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
                <Tooltip cursor={{ fill: "#f7f1ea" }} formatter={(v: number) => `${v} ${t("students")}`} />
                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                  {masteryDistribution.map((d) => (
                    <Cell key={d.range} fill={d.color} />
                  ))}
                  <LabelList dataKey="count" position="top" style={{ fontSize: 12, fontWeight: 700 }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="subtext" style={{ fontSize: "0.8rem", marginTop: "0.3rem" }}>
            {t("How many students sit in each mastery band.")}
          </p>
        </div>
      </div>

      <div className="card" style={{ marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.8rem", flexWrap: "wrap", gap: "0.5rem" }}>
          <h4 style={{ margin: 0 }}>{t("Most frequent misconceptions in this class")}</h4>
          <span className="subtext" style={{ fontSize: "0.78rem" }}>
            {t("Bar = number of students showing the misconception")}
          </span>
        </div>
        <div style={{ display: "grid", gap: "0.5rem" }}>
          {misconceptionFrequency.map((m) => {
            const full = fractionMisconceptionCatalog.find((x) => x.code === m.code)!;
            const pct = (m.count / fractionDiagnostics.length) * 100;
            return (
              <div
                key={m.code}
                title={full.description}
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(180px, 220px) 1fr auto",
                  alignItems: "center",
                  gap: "0.8rem"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span
                    style={{
                      display: "inline-grid",
                      placeItems: "center",
                      width: "28px",
                      height: "28px",
                      borderRadius: "8px",
                      background: "#fbeee2",
                      color: "#7a4a1f",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      border: "1px solid #f1d6b8"
                    }}
                  >
                    {m.code}
                  </span>
                  <span style={{ fontWeight: 600, fontSize: "0.85rem" }}>{m.short}</span>
                </div>
                <div style={{ position: "relative", height: "22px", background: "#f7f1ea", borderRadius: "999px", overflow: "hidden" }}>
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: `${pct}%`,
                      background: m.count >= 3 ? "#c0392b" : m.count >= 2 ? "#e58a5f" : "#d57d3d",
                      borderRadius: "999px",
                      transition: "width 200ms"
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      paddingLeft: "0.6rem",
                      fontSize: "0.72rem",
                      color: "#2a2421",
                      fontWeight: 600
                    }}
                  >
                    {m.students.join(", ")}
                  </div>
                </div>
                <span style={{ fontWeight: 700, fontSize: "0.9rem", minWidth: "60px", textAlign: "right" }}>
                  {m.count} <span className="subtext" style={{ fontSize: "0.72rem", fontWeight: 500 }}>/ {fractionDiagnostics.length}</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="card" style={{ marginBottom: "1.5rem", overflowX: "auto" }}>
        <h4 style={{ margin: "0 0 0.6rem 0" }}>{t("Per-student skill heatmap")}</h4>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
          {fractionMisconceptionCatalog.map((m) => (
            <span
              key={m.code}
              title={m.description}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                padding: "0.25rem 0.6rem",
                background: "#fbeee2",
                color: "#7a4a1f",
                borderRadius: "999px",
                fontSize: "0.78rem",
                border: "1px solid #f1d6b8"
              }}
            >
              <strong>{m.code}</strong>
              <span>{m.short}</span>
            </span>
          ))}
        </div>

        <table
          style={{
            width: "100%",
            borderCollapse: "separate",
            borderSpacing: "4px",
            minWidth: "720px",
            fontSize: "0.85rem"
          }}
        >
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: "0.4rem 0.6rem", color: "#5b534c" }}>
                {t("Student")}
              </th>
              {fractionSkillCatalog.map((skill) => (
                <th
                  key={skill.key}
                  style={{ padding: "0.4rem 0.4rem", color: "#5b534c", fontWeight: 600 }}
                >
                  {t(skill.label)}
                </th>
              ))}
              <th style={{ textAlign: "left", padding: "0.4rem 0.6rem", color: "#5b534c" }}>
                {t("Active misconceptions")}
              </th>
            </tr>
          </thead>
          <tbody>
            {fractionDiagnostics.map((row) => {
              const weakest = fractionSkillCatalog.reduce(
                (min, s) => (row.skills[s.key] < row.skills[min.key] ? s : min),
                fractionSkillCatalog[0]
              );
              return (
                <tr key={row.studentId}>
                  <td style={{ padding: "0.5rem 0.6rem", whiteSpace: "nowrap" }}>
                    <Link
                      href={`/report/student/${row.studentId}`}
                      style={{ color: "#2a2421", textDecoration: "none", fontWeight: 600 }}
                    >
                      {row.studentName}
                    </Link>
                    <div className="subtext" style={{ fontSize: "0.72rem" }}>
                      {row.studentId} · {t("Band")} {row.gradeBand}
                    </div>
                  </td>
                  {fractionSkillCatalog.map((skill) => {
                    const value = row.skills[skill.key];
                    const isWeakest = skill.key === weakest.key;
                    return (
                      <td
                        key={skill.key}
                        title={`${t(skill.label)}: ${value}%`}
                        style={{
                          textAlign: "center",
                          padding: "0.5rem 0.4rem",
                          background: scoreToColor(value),
                          borderRadius: "8px",
                          fontWeight: 600,
                          color: value >= 60 ? "#2a2421" : "#7a1f1f",
                          outline: isWeakest ? "2px solid #c0392b" : "none",
                          outlineOffset: "-2px"
                        }}
                      >
                        {value}
                      </td>
                    );
                  })}
                  <td style={{ padding: "0.5rem 0.6rem" }}>
                    {row.activeMisconceptions.length === 0 ? (
                      <span className="subtext" style={{ fontSize: "0.78rem" }}>
                        {t("None detected")}
                      </span>
                    ) : (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                        {row.activeMisconceptions.map((code) => {
                          const m = fractionMisconceptionCatalog.find((x) => x.code === code)!;
                          return (
                            <span
                              key={code}
                              title={m.description}
                              style={{
                                padding: "0.15rem 0.5rem",
                                background: "#fce8e6",
                                color: "#8a2a1f",
                                borderRadius: "999px",
                                fontSize: "0.72rem",
                                border: "1px solid #f3c2bb",
                                fontWeight: 600
                              }}
                            >
                              {code} · {m.short}
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div
          style={{
            marginTop: "1rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "0.75rem"
          }}
        >
          {fractionDiagnostics
            .filter((r) => r.activeMisconceptions.length > 0)
            .slice(0, 4)
            .map((row) => (
              <div
                key={row.studentId}
                style={{
                  padding: "0.8rem 1rem",
                  background: "#fff6ef",
                  borderRadius: "10px",
                  border: "1px solid #f1d6b8"
                }}
              >
                <div style={{ fontWeight: 600, marginBottom: "0.3rem" }}>{row.studentName}</div>
                <div className="subtext" style={{ fontSize: "0.78rem", marginBottom: "0.5rem" }}>
                  <strong>{t("Evidence")}:</strong> {row.evidenceSample}
                </div>
                <div className="subtext" style={{ fontSize: "0.78rem" }}>
                  <strong>{t("Next action")}:</strong> {row.recommendedAction}
                </div>
              </div>
            ))}
        </div>
      </div>

      <SectionHeader
        eyebrow={t("Cognitive Overview")}
        title={t("K / U / A / R across the class")}
        description={t("Cognitive heatmap and risk scan.")}
      />

      <div className="dashboard-grid">
        <div className="card">
          <div className="dashboard-controls">
            <h4>{t("Cognitive heatmap")}</h4>
            <div className="filter-group">
              <button type="button" className={`filter-btn ${filter === "all" ? "filter-active" : ""}`} onClick={() => setFilter("all")}>
                {t("All")}
              </button>
              <button type="button" className={`filter-btn ${filter === "risk" ? "filter-active" : ""}`} onClick={() => setFilter("risk")}>
                {t("Risk only")}
              </button>
              <button type="button" className={`filter-btn ${filter === "reasoning" ? "filter-active" : ""}`} onClick={() => setFilter("reasoning")}>
                {t("Reasoning low")}
              </button>
              <button type="button" className={`filter-btn ${filter === "concept" ? "filter-active" : ""}`} onClick={() => setFilter("concept")}>
                {t("Concept low")}
              </button>
            </div>
          </div>
          <div className="heatmap-grid">
            <div className="heatmap-head" />
            {(["K", "U", "A", "R"] as const).map((domain) => (
              <div key={domain} className="heatmap-head">{domain}</div>
            ))}
            {filteredStudents.map((student) => (
              <Link
                key={student.studentId}
                href={`/report/student/${student.studentId}`}
                className={`heatmap-row ${student.riskLevel === "risk" ? "heatmap-row-risk" : ""}`}
              >
                <span className="heatmap-name">{student.studentName}</span>
                {(["K", "U", "A", "R"] as const).map((domain) => {
                  const value = student.cognitiveScores[domain];
                  return (
                    <span
                      key={domain}
                      className="heatmap-cell"
                      style={{ background: scoreToColor(value) }}
                    >
                      {value}
                    </span>
                  );
                })}
              </Link>
            ))}
          </div>
        </div>
        <div className="card">
          <h4>{t("Class cognitive radar")}</h4>
          <ConceptRadar
            data={[
              { name: "K", score: classAverage.K },
              { name: "U", score: classAverage.U },
              { name: "A", score: classAverage.A },
              { name: "R", score: classAverage.R }
            ]}
            variant="plain"
          />
          <h4 style={{ marginTop: "1.5rem" }}>{t("Risk students")}</h4>
          <div className="risk-stack">
            {riskStudents.map((student) => (
              <Link key={student.studentId} href={`/report/student/${student.studentId}`} className="risk-card">
                <div>
                  <p className="detail-value">{student.studentName}</p>
                  <p className="subtext">{student.moduleTitle} · {student.overallMastery}%</p>
                </div>
                <span className="risk-badge risk-risk">{t("Risk")}</span>
              </Link>
            ))}
          </div>
          <h4 style={{ marginTop: "1.5rem" }}>{t("Weak concepts")}</h4>
          <div className="concept-weak-list">
            {weakConcepts.map((concept) => (
              <div key={concept.name} className="concept-weak-card">
                <span>{concept.name}</span>
                <span className="detail-value">{concept.avg}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function scoreToColor(score: number) {
  if (score >= 75) return "#e7f6f4";
  if (score >= 60) return "#f6e2d1";
  if (score >= 45) return "#fce8e6";
  return "#f8d2cf";
}
