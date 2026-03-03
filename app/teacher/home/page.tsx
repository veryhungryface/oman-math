"use client";

import Link from "next/link";
import ModuleCard from "@/components/ModuleCard";
import SectionHeader from "@/components/SectionHeader";
import Tag from "@/components/Tag";
import { modules } from "@/data/modules";
import { useI18n } from "@/lib/i18n";

const strands = [
  "Number",
  "Operations",
  "Geometry",
  "Measurement",
  "Pre-Algebra",
  "Data/Probability"
];

export default function TeacherHomePage() {
  const { t } = useI18n();
  return (
    <div className="split-layout">
      <div>
        <SectionHeader
          eyebrow={t("Teacher Home")}
          title={t("Select grade band and lesson module")}
          description={t("Start with a 5-7 minute interactive lesson, then launch a 6-8 minute adaptive assessment.")}
        />
        <div className="module-tags" aria-label="Grade bands">
          <Tag label="Band 1-5" tone="accent" />
          <Tag label="Band 6-10" tone="accent" />
          <Tag label="Band 11-12" tone="accent" />
        </div>
        <div className="module-tags" aria-label="Strand filters">
          {strands.map((strand) => (
            <Tag key={strand} label={strand} tone="soft" />
          ))}
        </div>
        <div className="module-grid" style={{ marginTop: "1.5rem" }}>
          {modules.map((m) => (
            <ModuleCard key={m.id} module={m} />
          ))}
        </div>
        <div className="card" style={{ marginTop: "1.5rem" }}>
          <h3>{t("Start lesson")}</h3>
          <p className="subtext">
            {t("Projector-ready lesson player with quick polls and misconception prompts.")}
          </p>
          <div className="module-actions" style={{ marginTop: "1rem" }}>
            <Link className="primary-button" href="/lesson/B-1">
              {t("Start Lesson")}
            </Link>
            <Link className="ghost-button" href="/assessment/B-1-demo">
              {t("Start Assessment")}
            </Link>
          </div>
        </div>
      </div>
      <aside className="info-grid">
        <div className="card">
          <h4>{t("Today in class")}</h4>
          <p className="subtext">
            {t("Average mastery is trending up in Number and Geometry. Reasoning items still need targeted support.")}
          </p>
        </div>
        <div className="card">
          <h4>{t("Recommended next lesson")}</h4>
          <p className="detail-value">{t("Algebra and Graphs Studio")}</p>
          <p className="subtext">{t("Focus on table to graph connection.")}</p>
        </div>
        <div className="card">
          <h4>{t("Recent progress")}</h4>
          <ul className="list">
            <li>{t("Concept mastery +6% week over week")}</li>
            <li>{t("Reasoning items correct: 58%")}</li>
            <li>{t("Students ready for extension: 5")}</li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
