"use client";

import { useEffect, useRef, useState } from "react";
import { modules } from "@/data/modules";
import Tag from "@/components/Tag";
import LessonContent from "@/components/lessons/LessonContent";
import ActivityStepper from "@/components/lessons/ActivityStepper";
import InteractiveActivities from "@/components/lessons/InteractiveActivities";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";

type LessonPageProps = {
  params: { moduleId: string };
};

type FullscreenTab = "lesson" | "activities";

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
  const [fullscreenTab, setFullscreenTab] = useState<FullscreenTab>("lesson");

  useEffect(() => {
    function handleFullscreenChange() {
      const active = Boolean(document.fullscreenElement);
      setIsFullscreen(active);
      if (active) {
        document.documentElement.classList.add("lesson-fullscreen-active");
      } else {
        document.documentElement.classList.remove("lesson-fullscreen-active");
      }
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
        {!isFullscreen && (
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
        )}

        {isFullscreen && (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", paddingBottom: "1rem", borderBottom: "1px solid #e7e3df" }}>
            <h2 style={{ margin: 0 }}>{t(title)}</h2>
            <button className="ghost-button" type="button" onClick={toggleFullscreen}>
              {t("Exit Fullscreen")}
            </button>
          </div>
        )}

        {/* Tab selector */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", borderBottom: "2px solid #e7e3df" }}>
          <button
            onClick={() => setFullscreenTab("lesson")}
            style={{
              padding: "0.8rem 1.5rem",
              background: fullscreenTab === "lesson" ? "#fff" : "transparent",
              borderBottom: fullscreenTab === "lesson" ? "3px solid #d57d3d" : "none",
              color: fullscreenTab === "lesson" ? "#d57d3d" : "#5b534c",
              border: "none",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            {t("Lesson")}
          </button>
          <button
            onClick={() => setFullscreenTab("activities")}
            style={{
              padding: "0.8rem 1.5rem",
              background: fullscreenTab === "activities" ? "#fff" : "transparent",
              borderBottom: fullscreenTab === "activities" ? "3px solid #d57d3d" : "none",
              color: fullscreenTab === "activities" ? "#d57d3d" : "#5b534c",
              border: "none",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            {t("Interactive Canvas")}
          </button>
        </div>

        {/* Lesson tab content */}
        {fullscreenTab === "lesson" && (
          <>
            <LessonContent moduleId={params.moduleId} />
            <div className="module-actions" style={{ marginTop: "1.5rem" }}>
              <Link className="primary-button" href={`/assessment/${moduleItem?.id ?? "demo"}-demo`}>
                {t("Start Assessment")}
              </Link>
            </div>
          </>
        )}

        {/* Activities tab content */}
        {fullscreenTab === "activities" && (
          <InteractiveActivities moduleId={params.moduleId} />
        )}
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
