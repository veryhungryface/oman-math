"use client";

import SectionHeader from "@/components/SectionHeader";
import Tag from "@/components/Tag";
import { useI18n } from "@/lib/i18n";

const curriculumTags = [
  "curriculum_band",
  "strand",
  "grade_tag",
  "objective_tag",
  "cognitive_domain_tag",
  "difficulty",
  "language",
  "media_assets"
];

export default function CurriculumMapPage() {
  const { t } = useI18n();
  return (
    <div className="split-layout">
      <div>
        <SectionHeader
          eyebrow={t("Curriculum Map Admin")}
          title={t("Tagging structure for Oman alignment")}
          description={t("Manage curriculum bands, strands, and cognitive domains for each module and item.")}
        />
        <div className="card">
          <h3>{t("Core tags")}</h3>
          <div className="module-tags" style={{ marginTop: "1rem" }}>
            {curriculumTags.map((tag) => (
              <Tag key={tag} label={tag} tone="soft" />
            ))}
          </div>
        </div>
      </div>
      <aside className="card">
        <h4>{t("Assessment alignment")}</h4>
        <ul className="list" style={{ marginTop: "1rem" }}>
          <li>{t("Internal engine uses K/U/A/R for all items.")}</li>
          <li>{t("Reports summarize K/A/R for administration and parents.")}</li>
          <li>{t("Each item records difficulty and language readiness.")}</li>
        </ul>
      </aside>
    </div>
  );
}
