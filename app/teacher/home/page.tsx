"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { students } from "@/data/samples";
import { modules } from "@/data/modules";

type WeekLessonData = {
  date: string;
  moduleId: string;
  status: "done" | "today" | "next" | "upcoming";
};

const weekSchedule: WeekLessonData[] = [
  { date: "Wed, Mar 5", moduleId: "B-2", status: "today" },
  { date: "Thu, Mar 6", moduleId: "C-1", status: "next" },
  { date: "Fri, Mar 7", moduleId: "C-3", status: "upcoming" },
  { date: "Mon, Mar 3", moduleId: "A-1", status: "done" },
  { date: "Tue, Mar 4", moduleId: "B-1", status: "done" },
];

function getModuleById(id: string) {
  return modules.find((m) => m.id === id);
}

function getClassStatsForModule(moduleId: string) {
  const moduleStudents = students.filter((s) => s.moduleTaken === moduleId);
  if (moduleStudents.length === 0) {
    return {
      K: 0,
      U: 0,
      A: 0,
      R: 0,
      atRiskNames: [],
    };
  }

  const K = Math.round(
    moduleStudents.reduce((sum, s) => sum + s.cognitiveProfile.K, 0) / moduleStudents.length
  );
  const U = Math.round(
    moduleStudents.reduce((sum, s) => sum + s.cognitiveProfile.U, 0) / moduleStudents.length
  );
  const A = Math.round(
    moduleStudents.reduce((sum, s) => sum + s.cognitiveProfile.A, 0) / moduleStudents.length
  );
  const R = Math.round(
    moduleStudents.reduce((sum, s) => sum + s.cognitiveProfile.R, 0) / moduleStudents.length
  );

  const atRiskNames = moduleStudents
    .filter((s) => s.riskLevel === "risk" || s.riskLevel === "watch")
    .map((s) => s.name);

  return { K, U, A, R, atRiskNames };
}

function KuarBar({ level, value }: { level: string; value: number }) {
  const isLow = value < 70;
  const bgColor = isLow ? "#fce8e6" : "#f1ece7";
  const fillColor = isLow ? "#d57d3d" : "#2f6f6a";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "0.6rem" }}>
      <span style={{ minWidth: "20px", fontWeight: 700, fontSize: "0.9rem" }}>{level}</span>
      <div style={{ flex: 1, height: "20px", background: bgColor, borderRadius: "10px", overflow: "hidden" }}>
        <div
          style={{
            width: `${Math.min(value, 100)}%`,
            height: "100%",
            background: fillColor,
            borderRadius: "10px",
            transition: "width 0.3s ease",
          }}
        />
      </div>
      <span style={{ minWidth: "50px", textAlign: "right", fontWeight: 600, fontSize: "0.9rem" }}>
        {value}%
      </span>
    </div>
  );
}

export default function TeacherHomePage() {
  const { t } = useI18n();

  return (
    <div style={{ maxWidth: "1000px" }}>
      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <p className="eyebrow">{t("Teacher Home")}</p>
        <h2 style={{ marginBottom: "0.5rem" }}>{t("This Week's Lessons")}</h2>
        <p className="subtext">28 {t("students")} · {t("Class")} CL-8B</p>
      </div>

      {/* Timeline */}
      <div className="timeline-root">
        {weekSchedule.map((lesson, idx) => {
          const moduleData = getModuleById(lesson.moduleId);
          if (!moduleData) return null;

          const stats = getClassStatsForModule(lesson.moduleId);
          const isTodayOrDone = lesson.status === "today" || lesson.status === "done";
          const isUpcoming = lesson.status === "upcoming" || lesson.status === "next";

          return (
            <div key={lesson.moduleId} className="timeline-item">
              {/* Timeline dot */}
              <div className={`timeline-dot timeline-dot-${lesson.status}`} />

              {/* Card */}
              <div className={`timeline-card timeline-card-${lesson.status}`}>
                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.8rem" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.4rem" }}>
                      <span className={`status-badge status-${lesson.status}`}>
                        {lesson.status === "done" && "✓ DONE"}
                        {lesson.status === "today" && "● TODAY"}
                        {lesson.status === "next" && "PREPARE"}
                        {lesson.status === "upcoming" && "SCHEDULED"}
                      </span>
                      <span style={{ fontSize: "0.85rem", color: "var(--muted)" }}>{lesson.date}</span>
                    </div>
                    <h3 style={{ fontSize: "1.1rem", marginBottom: "0.2rem" }}>{moduleData.title}</h3>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--accent)" }}>{moduleData.id}</p>
                    <p style={{ fontSize: "0.8rem", color: "var(--muted)" }}>Band {moduleData.band}</p>
                  </div>
                </div>

                {/* Mastery bars (only for today and done) */}
                {isTodayOrDone && (
                  <div style={{ marginBottom: "1rem", paddingBottom: "1rem", borderBottom: "1px solid var(--border)" }}>
                    <p style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "1px", color: "var(--muted)", fontWeight: 700, marginBottom: "0.6rem" }}>
                      Class Mastery
                    </p>
                    <KuarBar level="K" value={stats.K} />
                    <KuarBar level="U" value={stats.U} />
                    <KuarBar level="A" value={stats.A} />
                    <KuarBar level="R" value={stats.R} />
                  </div>
                )}

                {/* At-risk students (only for today and done) */}
                {isTodayOrDone && stats.atRiskNames.length > 0 && (
                  <div style={{ marginBottom: "1rem", paddingBottom: "1rem", borderBottom: "1px solid var(--border)" }}>
                    <p style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "1px", color: "#c0392b", fontWeight: 700, marginBottom: "0.4rem" }}>
                      ⚠ {t("Below threshold")} ({`<70%`})
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                      {stats.atRiskNames.map((name) => (
                        <span key={name} className="student-chip" style={{ borderColor: "#c0392b" }}>
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions (only for today) */}
                {lesson.status === "today" && (
                  <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
                    <Link href={`/lesson/${moduleData.id}`} className="primary-button">
                      {t("Start Lesson")} →
                    </Link>
                    <Link href={`/assessment/B-1-demo`} className="ghost-button">
                      {t("View Assessment")}
                    </Link>
                  </div>
                )}

                {/* Prepare banner (for next) */}
                {lesson.status === "next" && (
                  <div style={{ padding: "0.8rem", background: "#f6e2d1", borderRadius: "12px", fontSize: "0.9rem" }}>
                    <p style={{ fontWeight: 600, margin: "0 0 0.3rem 0" }}>📋 {t("Prepare for tomorrow")}</p>
                    <p style={{ color: "var(--muted)", fontSize: "0.85rem" }}>
                      {t("Focus areas")}: {moduleData.cognitiveFocus.includes("R") ? "Reasoning • " : ""}
                      {moduleData.cognitiveFocus.includes("A") ? "Application" : ""}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
