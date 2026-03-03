"use client";

import ModuleCard from "@/components/ModuleCard";
import SectionHeader from "@/components/SectionHeader";
import { modules } from "@/data/modules";
import { useI18n } from "@/lib/i18n";

export default function TeacherModulesPage() {
  const { t } = useI18n();
  return (
    <div>
      <SectionHeader
        eyebrow={t("Module Library")}
        title={t("Nine modules aligned to Oman bands")}
        description={t("Each module includes a lesson, adaptive assessment, student report, and teacher dashboard view.")}
      />
      <div className="module-grid">
        {modules.map((m) => (
          <ModuleCard key={m.id} module={m} />
        ))}
      </div>
    </div>
  );
}
