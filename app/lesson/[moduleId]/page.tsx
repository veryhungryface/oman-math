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
  const prompts = moduleItem?.teacherPrompts ?? {
    intro: [],
    concept: [],
    apply: [],
    reason: []
  };
  const lessonRef = useRef<HTMLDivElement | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showPromptList, setShowPromptList] = useState(false);
  const [activePrompt, setActivePrompt] = useState<string | null>(null);

  useEffect(() => {
    function handleFullscreenChange() {
      const active = Boolean(document.fullscreenElement);
      setIsFullscreen(active);
      if (!active) {
        setShowPromptList(false);
        setActivePrompt(null);
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
            <button
              className="ghost-button"
              type="button"
              onClick={() => setShowPromptList((prev) => !prev)}
            >
              {t("Teacher Prompts")}
            </button>
          </div>
        </div>
        <LessonContent moduleId={params.moduleId} />
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
          <div className="prompt-list">
            {prompts.intro.map((prompt) => (
              <button key={prompt} className="prompt-btn" type="button" onClick={() => setActivePrompt(prompt)}>
                {prompt}
              </button>
            ))}
          </div>
          <p className="detail-label">{t("Concept Check")}</p>
          <div className="prompt-list">
            {prompts.concept.map((prompt) => (
              <button key={prompt} className="prompt-btn" type="button" onClick={() => setActivePrompt(prompt)}>
                {prompt}
              </button>
            ))}
          </div>
          <p className="detail-label">{t("Apply")}</p>
          <div className="prompt-list">
            {prompts.apply.map((prompt) => (
              <button key={prompt} className="prompt-btn" type="button" onClick={() => setActivePrompt(prompt)}>
                {prompt}
              </button>
            ))}
          </div>
          <p className="detail-label">{t("Reason")}</p>
          <div className="prompt-list">
            {prompts.reason.map((prompt) => (
              <button key={prompt} className="prompt-btn" type="button" onClick={() => setActivePrompt(prompt)}>
                {prompt}
              </button>
            ))}
          </div>
        </div>
        <div style={{ marginTop: "1.5rem" }}>
          <p className="detail-label">{t("Student sync code")}</p>
          <p className="detail-value">OMN-4821</p>
        </div>
      </aside>
      {showPromptList && (
        <div className="prompt-overlay-panel">
          <div className="prompt-panel-head">
            <h4>{t("Teacher Prompts")}</h4>
            <button className="ghost-button" type="button" onClick={() => setShowPromptList(false)}>
              {t("Close")}
            </button>
          </div>
          <div className="prompt-panel-body">
            {[
              { label: t("Intro"), items: prompts.intro },
              { label: t("Concept Check"), items: prompts.concept },
              { label: t("Apply"), items: prompts.apply },
              { label: t("Reason"), items: prompts.reason }
            ].map((section) => (
              <div key={section.label} className="prompt-panel-group">
                <p className="detail-label">{section.label}</p>
                <div className="prompt-list">
                  {section.items.map((prompt) => (
                    <button key={prompt} className="prompt-btn" type="button" onClick={() => setActivePrompt(prompt)}>
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {activePrompt && (
        <div className="prompt-overlay" onClick={() => setActivePrompt(null)}>
          <div className="prompt-card" onClick={(e) => e.stopPropagation()}>
            <p className="eyebrow">{t("Teacher Prompt")}</p>
            <h3>{activePrompt}</h3>
            <button className="primary-button" type="button" onClick={() => setActivePrompt(null)}>
              {t("Close")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
