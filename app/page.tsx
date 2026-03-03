"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export default function HomePage() {
  const { t } = useI18n();
  return (
    <div className="hero">
      <div className="hero-card">
        <p className="eyebrow">{t("Oman Mathematics Demo")}</p>
        <h1>{t("i-scream math with Oman")}</h1>
        <p className="subtext">
          {t("Interactive lesson to adaptive assessment, in one flow.")}
        </p>
        <div className="module-actions">
          <Link href="/teacher/home" className="primary-button">
            {t("Open Teacher Home")}
          </Link>
          <Link href="/lesson/B-1" className="ghost-button">
            {t("Launch Flagship Lesson")}
          </Link>
        </div>
      </div>
      <div className="card">
        <h3>{t("Demo proof points")}</h3>
        <ul className="list">
          <li>{t("9 interactive modules across three grade bands")}</li>
          <li>{t("Adaptive assessment: 3 anchor + 5 adaptive items")}</li>
          <li>{t("Teacher dashboard with concept heatmap and grouping")}</li>
          <li>{t("Student report with concept radar and next steps")}</li>
        </ul>
      </div>
    </div>
  );
}
