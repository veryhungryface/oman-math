"use client";

import { I18nProvider, useI18n } from "@/lib/i18n";
import type { ReactNode } from "react";

function ShellInner({ children }: { children: ReactNode }) {
  const { locale } = useI18n();
  return (
    <div className="page-shell" dir={locale === "ar" ? "rtl" : "ltr"}>
      {children}
    </div>
  );
}

export default function ClientShell({ children }: { children: ReactNode }) {
  return (
    <I18nProvider>
      <ShellInner>{children}</ShellInner>
    </I18nProvider>
  );
}
