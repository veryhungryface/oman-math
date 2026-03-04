"use client";

import Link from "next/link";
import Image from "next/image";
import { useI18n } from "@/lib/i18n";

const navItems = [
  { href: "/teacher/home", label: "Teacher Home" },
  { href: "/teacher/modules", label: "Lessons" },
  { href: "/report/student/OMN-001", label: "Student Report" },
  { href: "/dashboard/class/CL-8B", label: "Dashboard" },
  { href: "/admin/curriculum-map", label: "Curriculum Map" }
];

export default function PrimaryNav() {
  const { locale, toggle, t } = useI18n();

  return (
    <nav className="primary-nav">
      <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
        <div className="brand" style={{ cursor: "pointer" }}>
          <Image
            className="brand-logo"
            src="https://www.i-screammedia.com/favicon.ico"
            alt="i-scream math with Oman"
            width={44}
            height={44}
          />
          <div>
            <p className="brand-title">{t("i-scream math with Oman")}</p>
            <p className="brand-sub">{t("Cambridge-aligned math showcase")}</p>
          </div>
        </div>
      </Link>
      <div className="nav-links">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="nav-link">
            {t(item.label)}
          </Link>
        ))}
      </div>
      <div className="nav-actions">
        <button
          className={`lang-button ${locale === "en" ? "lang-active" : ""}`}
          type="button"
          onClick={locale === "ar" ? toggle : undefined}
        >
          EN
        </button>
        <span className="divider">|</span>
        <button
          className={`lang-button ${locale === "ar" ? "lang-active" : ""}`}
          type="button"
          onClick={locale === "en" ? toggle : undefined}
        >
          AR
        </button>
      </div>
    </nav>
  );
}
