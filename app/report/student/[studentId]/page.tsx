"use client";

import ConceptRadar from "@/components/charts/ConceptRadar";
import DomainBarChart from "@/components/charts/DomainBarChart";
import KpiCard from "@/components/KpiCard";
import SectionHeader from "@/components/SectionHeader";
import { getStudentReport, studentReports } from "@/data/samples";
import { useI18n } from "@/lib/i18n";
import Link from "next/link";

type StudentReportPageProps = {
  params: { studentId: string };
};

export default function StudentReportPage({ params }: StudentReportPageProps) {
  const { t } = useI18n();
  const report = getStudentReport(params.studentId) ?? studentReports[0];
  const studentIndex = studentReports.findIndex(
    (item) => item.studentId === report.studentId
  );
  const prevStudent =
    studentReports[(studentIndex - 1 + studentReports.length) % studentReports.length];
  const nextStudent = studentReports[(studentIndex + 1) % studentReports.length];
  const riskLabel =
    report.riskLevel === "risk"
      ? t("Risk")
      : report.riskLevel === "watch"
        ? t("Watch")
        : t("OK");

  return (
    <div>
      <SectionHeader
        eyebrow={t("Student Report")}
        title={`${report.studentName} · ${report.studentId}`}
        description={`${t("Band")} ${report.gradeBand} · ${t(report.moduleTitle)} · ${t("Module")} ${report.moduleId}`}
      />
      <div className="student-switcher" aria-label={t("Student selector")}
           style={{ marginBottom: "1.2rem" }}>
        {studentReports.map((student) => (
          <Link
            key={student.studentId}
            href={`/report/student/${student.studentId}`}
            className={`student-chip ${student.studentId === report.studentId ? "student-chip-active" : ""} ${student.riskLevel === "risk" ? "student-chip-risk" : ""}`}
          >
            <span className="student-chip-name">{student.studentName}</span>
            <span className={`risk-badge risk-${student.riskLevel}`}>
              {student.riskLevel === "risk" ? t("Risk") : student.riskLevel === "watch" ? t("Watch") : t("OK")}
            </span>
          </Link>
        ))}
      </div>
      <div className="info-grid" style={{ marginBottom: "1.5rem" }}>
        <KpiCard label={t("Overall mastery")} value={`${report.overallMastery}%`} />
        <KpiCard label={t("Risk status")} value={riskLabel} helper={t("Based on K/U/A/R profile")} />
        <KpiCard label={t("Module")}
                 value={report.moduleId}
                 helper={t(report.moduleTitle)} />
        <KpiCard label={t("Last updated")} value="2026-02-18" helper={t("Demo data")} />
      </div>
      <div className="dashboard-grid">
        <div className="info-grid">
          <DomainBarChart
            title={t("Cognitive profile")}
            className={report.riskLevel === "risk" ? "risk-panel" : ""}
            data={Object.entries(report.cognitiveScores).map(([domain, value]) => ({
              domain,
              value
            }))}
          />
          <ConceptRadar data={report.conceptScores} />
          <div className={`chart-card ${report.riskLevel === "risk" ? "risk-panel" : ""}`}>
            <h4>{t("Domain mastery")}</h4>
            <div className="domain-grid">
              {Object.entries(report.cognitiveScores).map(([domain, value]) => (
                <div key={domain} className={`domain-tile ${value < 50 ? "domain-low" : ""}`}>
                  <span className="domain-label">{domain}</span>
                  <div className="mastery-bar-outer">
                    <div
                      className="mastery-bar-inner"
                      style={{
                        width: `${value}%`,
                        background: value >= 70 ? "#2f6f6a" : value >= 50 ? "#d57d3d" : "#c0392b"
                      }}
                    />
                  </div>
                  <span className="domain-value">{value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="card">
          <div className="report-header">
            <h4>{t("Learning summary")}</h4>
            <span className={`risk-badge risk-${report.riskLevel}`}>{riskLabel}</span>
          </div>
          <div className="concept-list">
            {report.conceptScores.map((concept) => (
              <div key={concept.name} className="concept-row">
                <span>{concept.name}</span>
                <div className="mastery-bar-outer">
                  <div
                    className="mastery-bar-inner"
                    style={{
                      width: `${concept.score}%`,
                      background: concept.score >= 70 ? "#2f6f6a" : concept.score >= 50 ? "#d57d3d" : "#c0392b"
                    }}
                  />
                </div>
                <span className="detail-value">{concept.score}%</span>
              </div>
            ))}
          </div>
          <h4 style={{ marginTop: "1.5rem" }}>{t("Next steps")}</h4>
          <ul className="list" style={{ marginTop: "1rem" }}>
            {report.recommendedNextModules.map((module) => (
              <li key={module}>{t("Suggested module")} {module}</li>
            ))}
          </ul>
          {report.riskLevel === "risk" && (
            <div className="risk-callout" style={{ marginTop: "1.5rem" }}>
              <h4>{t("Immediate Support")}</h4>
              <p className="subtext">{t("Prioritize concept rebuilding and guided practice this week.")}</p>
            </div>
          )}
          <h4 style={{ marginTop: "1.5rem" }}>{t("Misconceptions")}</h4>
          <ul className="list" style={{ marginTop: "1rem" }}>
            {report.misconceptions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h4 style={{ marginTop: "1.5rem" }}>{t("Teacher comment")}</h4>
          <p className="subtext" style={{ marginTop: "0.5rem" }}>
            {report.teacherComment}
          </p>
          <div className="module-actions" style={{ marginTop: "1.5rem" }}>
            <Link className="ghost-button" href={`/report/student/${prevStudent.studentId}`}>
              {t("Previous student")}
            </Link>
            <Link className="primary-button" href={`/report/student/${nextStudent.studentId}`}>
              {t("Next student")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
