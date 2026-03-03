"use client";

import ConceptRadar from "@/components/charts/ConceptRadar";
import KpiCard from "@/components/KpiCard";
import SectionHeader from "@/components/SectionHeader";
import { classId, studentReports } from "@/data/samples";
import { useI18n } from "@/lib/i18n";
import Link from "next/link";
import { useMemo, useState } from "react";

type DashboardPageProps = {
  params: { classId: string };
};

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

  return (
    <div>
      <SectionHeader
        eyebrow={t("Teacher Dashboard")}
        title={`${t("Class")} ${params.classId || classId}`}
        description={t("At-a-glance cognitive heatmap and risk scan across 10 students.")}
      />
      <div className="info-grid" style={{ marginBottom: "1.5rem" }}>
        <KpiCard label={t("Average mastery")} value={`${classAverage.mastery}%`} />
        <KpiCard label={t("Reasoning at risk")} value={`${Math.round((dashboardStudents.filter((s) => s.cognitiveScores.R < 50).length / dashboardStudents.length) * 100)}%`} helper={t("Students below R threshold")} />
        <KpiCard label={t("Risk students")} value={`${dashboardStudents.filter((s) => s.riskLevel === "risk").length}`} helper={t("Immediate support")}/>
      </div>
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
