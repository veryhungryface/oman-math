"use client";

import Link from "next/link";
import Tag from "./Tag";
import type { ModuleItem } from "@/data/modules";
import { useI18n } from "@/lib/i18n";

type ModuleCardProps = {
  module: ModuleItem;
};

export default function ModuleCard({ module }: ModuleCardProps) {
  const { t } = useI18n();

  return (
    <div className="card module-card">
      <div className="module-thumb" aria-hidden>
        {renderModuleIllustration(module.id)}
      </div>
      <div className="module-head">
        <div>
          <p className="module-id">{module.id}</p>
          <h3>{t(module.title)}</h3>
          <p className="subtext">{t(module.subtitle)}</p>
        </div>
        <Tag label={`Band ${module.band}`} tone="accent" />
      </div>
      <div className="module-tags">
        {module.strands.map((strand) => (
          <Tag key={strand} label={strand} tone="soft" />
        ))}
      </div>
      <div className="module-details">
        <div>
          <p className="detail-label">{t("Cognitive focus")}</p>
          <p className="detail-value">{module.cognitiveFocus.join(" / ")}</p>
        </div>
        <div>
          <p className="detail-label">{t("Lesson / Assessment")}</p>
          <p className="detail-value">
            {module.lessonMinutes} min / {module.assessmentMinutes} min
          </p>
        </div>
      </div>
      <div className="module-actions">
        <Link className="primary-button" href={`/lesson/${module.id}`}>
          {t("Start Lesson")}
        </Link>
        <Link className="ghost-button" href={`/assessment/${module.id}-demo`}>
          {t("Run Assessment")}
        </Link>
      </div>
    </div>
  );
}

function renderModuleIllustration(moduleId: string) {
  switch (moduleId) {
    case "A-1":
      return (
        <svg viewBox="0 0 220 120" role="img" aria-label="Fraction and number line">
          <rect x="10" y="18" width="200" height="18" rx="9" fill="#f6e2d1" />
          <rect x="10" y="18" width="120" height="18" rx="9" fill="#d57d3d" />
          <line x1="20" y1="70" x2="200" y2="70" stroke="#3856b0" strokeWidth="2" />
          {[20, 60, 100, 140, 180].map((x) => (
            <line key={x} x1={x} y1="64" x2={x} y2="76" stroke="#3856b0" strokeWidth="2" />
          ))}
          <circle cx="100" cy="70" r="6" fill="#2f6f6a" />
        </svg>
      );
    case "A-2":
      return (
        <svg viewBox="0 0 220 120" role="img" aria-label="Area and perimeter grid">
          <rect x="20" y="20" width="140" height="80" rx="10" fill="#e7f6f4" stroke="#2f6f6a" strokeWidth="2" />
          {[0, 1, 2, 3].map((i) => (
            <line key={`h${i}`} x1="20" y1={20 + i * 20} x2="160" y2={20 + i * 20} stroke="#b6d3cf" />
          ))}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <line key={`v${i}`} x1={20 + i * 20} y1="20" x2={20 + i * 20} y2="100" stroke="#b6d3cf" />
          ))}
          <path d="M170 24h30v30" stroke="#d57d3d" strokeWidth="3" fill="none" />
        </svg>
      );
    case "A-3":
      return (
        <svg viewBox="0 0 220 120" role="img" aria-label="Bar chart and data points">
          <rect x="30" y="50" width="18" height="40" rx="4" fill="#3856b0" />
          <rect x="60" y="35" width="18" height="55" rx="4" fill="#2f6f6a" />
          <rect x="90" y="60" width="18" height="30" rx="4" fill="#d57d3d" />
          <rect x="120" y="25" width="18" height="65" rx="4" fill="#f3c89d" />
          <circle cx="170" cy="38" r="10" fill="#f6e2d1" stroke="#d57d3d" strokeWidth="2" />
          <circle cx="190" cy="60" r="10" fill="#e7f6f4" stroke="#2f6f6a" strokeWidth="2" />
        </svg>
      );
    case "B-1":
      return (
        <svg viewBox="0 0 220 120" role="img" aria-label="Line graph">
          <line x1="20" y1="90" x2="200" y2="90" stroke="#d6cfc9" strokeWidth="2" />
          <line x1="40" y1="20" x2="40" y2="100" stroke="#d6cfc9" strokeWidth="2" />
          <polyline points="40,85 80,65 120,45 160,25" fill="none" stroke="#d57d3d" strokeWidth="3" />
          <circle cx="120" cy="45" r="5" fill="#2f6f6a" />
        </svg>
      );
    case "B-2":
      return (
        <svg viewBox="0 0 220 120" role="img" aria-label="Transformation">
          <polygon points="40,30 90,30 90,80 40,80" fill="rgba(56,86,176,0.2)" stroke="#3856b0" strokeWidth="2" />
          <polygon points="130,40 180,40 180,90 130,90" fill="rgba(213,125,61,0.2)" stroke="#d57d3d" strokeWidth="2" strokeDasharray="6 4" />
          <line x1="110" y1="25" x2="110" y2="95" stroke="#d6cfc9" strokeWidth="2" />
        </svg>
      );
    case "B-3":
      return (
        <svg viewBox="0 0 220 120" role="img" aria-label="Dice and probability">
          <rect x="40" y="30" width="60" height="60" rx="12" fill="#ffffff" stroke="#3856b0" strokeWidth="2" />
          <circle cx="60" cy="50" r="5" fill="#3856b0" />
          <circle cx="80" cy="70" r="5" fill="#3856b0" />
          <rect x="120" y="40" width="60" height="50" rx="10" fill="#f6e2d1" stroke="#d57d3d" strokeWidth="2" />
          <path d="M140 60h20" stroke="#d57d3d" strokeWidth="3" />
        </svg>
      );
    case "C-1":
      return (
        <svg viewBox="0 0 220 120" role="img" aria-label="Parabola">
          <line x1="20" y1="90" x2="200" y2="90" stroke="#d6cfc9" strokeWidth="2" />
          <line x1="110" y1="20" x2="110" y2="100" stroke="#d6cfc9" strokeWidth="2" />
          <path d="M50 90 Q110 20 170 90" fill="none" stroke="#2f6f6a" strokeWidth="3" />
          <circle cx="110" cy="20" r="5" fill="#2f6f6a" />
        </svg>
      );
    case "C-2":
      return (
        <svg viewBox="0 0 220 120" role="img" aria-label="Unit circle">
          <circle cx="110" cy="60" r="38" fill="none" stroke="#3856b0" strokeWidth="2" />
          <line x1="110" y1="60" x2="150" y2="38" stroke="#d57d3d" strokeWidth="3" />
          <circle cx="150" cy="38" r="5" fill="#d57d3d" />
          <line x1="72" y1="60" x2="148" y2="60" stroke="#d6cfc9" strokeWidth="2" />
        </svg>
      );
    case "C-3":
      return (
        <svg viewBox="0 0 220 120" role="img" aria-label="Tangent and curve">
          <path d="M40 90 C70 30 150 30 180 90" fill="none" stroke="#3856b0" strokeWidth="3" />
          <line x1="60" y1="78" x2="150" y2="40" stroke="#d57d3d" strokeWidth="3" />
          <circle cx="110" cy="55" r="5" fill="#2f6f6a" />
        </svg>
      );
    default:
      return null;
  }
}
