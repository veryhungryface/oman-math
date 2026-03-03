"use client";

import { useEffect, useRef, useState } from "react";
import { modules } from "@/data/modules";
import Tag from "@/components/Tag";
import LessonContent from "@/components/lessons/LessonContent";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";

type LessonPageProps = {
  params: { moduleId: string };
};

export default function LessonPage({ params }: LessonPageProps) {
  const { t } = useI18n();
  const moduleItem = modules.find((item) => item.id === params.moduleId);
  const title = moduleItem?.title ?? "Lesson Player";
  const subtitle = moduleItem?.subtitle ?? "Interactive lesson preview";
  const interactions = moduleItem?.interactions ?? [];
  const activities = moduleItem?.activities ?? [];
  const prompts = moduleItem?.teacherPrompts ?? {
    intro: [],
    concept: [],
    apply: [],
    reason: []
  };
  const lessonRef = useRef<HTMLDivElement | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    function handleFullscreenChange() {
      const active = Boolean(document.fullscreenElement);
      setIsFullscreen(active);
    }
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  async function toggleFullscreen() {
    if (!lessonRef.current) return;
    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }
    await lessonRef.current.requestFullscreen();
  }

  return (
    <div ref={lessonRef} className={`split-layout lesson-shell ${isFullscreen ? "lesson-fullscreen" : ""}`}>
      <div>
        <div className="card" style={{ marginBottom: "1.5rem" }}>
          <p className="eyebrow">{t("Lesson Player")}</p>
          <h2>{t(title)}</h2>
          <p className="subtext">{t(subtitle)}</p>
          <div className="module-tags" style={{ marginTop: "1rem" }}>
            {(moduleItem?.strands ?? []).map((strand) => (
              <Tag key={strand} label={strand} tone="soft" />
            ))}
            <Tag label={`Module ${moduleItem?.id ?? ""}`} tone="accent" />
          </div>
          <div className="module-actions" style={{ marginTop: "1rem" }}>
            <button className="ghost-button" type="button" onClick={toggleFullscreen}>
              {isFullscreen ? t("Exit Fullscreen") : t("Fullscreen")}
            </button>
          </div>
        </div>
        <LessonContent moduleId={params.moduleId} />
        <div className="card" style={{ marginTop: "1.5rem" }}>
          <h4>{t("Student activities")}</h4>
          <p className="subtext">{t("Short, high-participation routines aligned to the lesson focus.")}</p>
          <div className="activity-grid" style={{ marginTop: "1rem" }}>
            {activities.map((activity) => (
              <div key={activity.title} className="activity-card">
                <div className="activity-head">
                  <p className="detail-label">{t("Activity")}</p>
                  <h5>{activity.title}</h5>
                </div>
                <div className="activity-body">
                  <p className="detail-label">{t("Student action")}</p>
                  <p className="detail-value">{activity.studentAction}</p>
                  <p className="detail-label">{t("Teacher move")}</p>
                  <p className="detail-value">{activity.teacherMove}</p>
                  <div className="activity-meta">
                    <div>
                      <p className="detail-label">{t("Grouping")}</p>
                      <p className="detail-value">{activity.grouping}</p>
                    </div>
                    <div>
                      <p className="detail-label">{t("Time")}</p>
                      <p className="detail-value">{activity.time}</p>
                    </div>
                    <div>
                      <p className="detail-label">{t("Evidence")}</p>
                      <p className="detail-value">{activity.evidence}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="module-actions" style={{ marginTop: "1.5rem" }}>
          <Link className="primary-button" href={`/assessment/${moduleItem?.id ?? "demo"}-demo`}>
            {t("Start Assessment")}
          </Link>
        </div>
      </div>
      <aside className={`card lesson-aside ${isFullscreen ? "lesson-aside-hidden" : ""}`}>
        <h4>{t("Teacher guide")}</h4>
        <p className="subtext">
          {t("Suggested flow for a 5-7 minute mini lesson.")}
        </p>
        <ul className="list" style={{ marginTop: "1rem" }}>
          {interactions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <h4 style={{ marginTop: "1.5rem" }}>{t("Teacher Prompts")}</h4>
        <div className="prompt-section">
          <p className="detail-label">{t("Intro")}</p>
          <ul className="list">
            {prompts.intro.map((prompt) => (
              <li key={prompt}>{prompt}</li>
            ))}
          </ul>
          <p className="detail-label">{t("Concept Check")}</p>
          <ul className="list">
            {prompts.concept.map((prompt) => (
              <li key={prompt}>{prompt}</li>
            ))}
          </ul>
          <p className="detail-label">{t("Apply")}</p>
          <ul className="list">
            {prompts.apply.map((prompt) => (
              <li key={prompt}>{prompt}</li>
            ))}
          </ul>
          <p className="detail-label">{t("Reason")}</p>
          <ul className="list">
            {prompts.reason.map((prompt) => (
              <li key={prompt}>{prompt}</li>
            ))}
          </ul>
        </div>
        <div style={{ marginTop: "1.5rem" }}>
          <p className="detail-label">{t("Student sync code")}</p>
          <p className="detail-value">OMN-4821</p>
        </div>
      </aside>
    </div>
  );
}
