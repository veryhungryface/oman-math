# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Next.js 14** interactive math education demo built for Oman's Ministry of Education. It demonstrates an integrated learning experience: from interactive lessons → adaptive assessment → student reports and teacher dashboards. The platform aligns with Cambridge-based curriculum standards and Oman's cognitive assessment framework (Knowledge/Understanding/Application/Reasoning).

## Development Commands

- **`npm run dev`** — Start Next.js dev server (runs on http://localhost:3000)
- **`npm run build`** — Build optimized production bundle
- **`npm run start`** — Run production server (requires build first)
- **`npm run lint`** — Run ESLint checks (uses Next.js recommended config)

## Architecture & Structure

### Core Pages (App Router with Dynamic Routes)

```
app/
├── page.tsx                           # Home landing (hero + demo proof points)
├── layout.tsx                         # Root layout (metadata, fonts, navigation shell)
├── lesson/[moduleId]/page.tsx         # Interactive lesson player for a module
├── assessment/[sessionId]/page.tsx    # Adaptive assessment interface
├── dashboard/class/[classId]/page.tsx # Teacher class dashboard (heatmap, risk scan)
├── report/student/[studentId]/page.tsx # Individual student report (K/U/A/R profile)
├── teacher/
│   ├── home/page.tsx                  # Teacher landing (today's class, recommendations)
│   └── modules/page.tsx               # Module library (9 modules across 3 bands)
└── admin/
    └── curriculum-map/page.tsx        # Admin curriculum tagging interface
```

### Components

All components are in `/components` and follow this pattern:
- **UI Components**: `ModuleCard.tsx`, `KpiCard.tsx`, `SectionHeader.tsx`, `Tag.tsx` — reusable display elements
- **Interactive Shells**: `ClientShell.tsx` (I18n provider wrapper), `PrimaryNav.tsx` (top navigation with locale toggle)
- **Charts Subdirectory** (`/components/charts`): Recharts-based visualizations used in dashboards and reports
- **Lessons Subdirectory** (`/components/lessons`): Module-specific interactive lesson content components

**Key Pattern**: Components marked with `"use client"` are client-side interactive; server components are used for static layouts and metadata.

### Data & Content Models

**`/data/modules.ts`** — Core module definitions
- `ModuleItem`: Defines a lesson module with id, band (1-4/5-10/11-12), title, strands (Number/Operations/Geometry/etc.), cognitive focus (K/U/A/R), timing, interactions, activities, and teacher prompts
- `LessonActivity`: Structured lesson activity (student action, teacher move, grouping, time, evidence)
- Exports `modules[]` array of 9 modules across three grade bands

**`/data/questions.ts`** — Assessment question bank with cognitive tagging

**`/data/samples.ts`** — Mock student/class data for dashboard and report demos

### Internationalization (i18n)

**`/lib/i18n.tsx`** provides a simple context-based system:
- **I18nProvider**: Wraps the app in `ClientShell.tsx`
- **useI18n hook**: Returns `{ locale, toggle, t }` for any client component
- **Locales**: "en" (English, default) and "ar" (Arabic)
- **Dictionary**: Hard-coded string mappings in the hook; new strings require manual entry

**Usage**: `const { t } = useI18n()` then `t("key")` returns localized string or falls back to key itself.

## Key Design Patterns

### Module-Centric Architecture
Every lesson and assessment maps to a `ModuleItem`. The module defines:
- **Cognitive focus** (which of K/U/A/R levels are assessed)
- **Teacher prompts** (organized by phase: intro, concept, apply, reason)
- **Student activities** (scripted interaction steps with teacher guidance)
- **Assessment alignment** (which concepts and cognitive levels are tested)

### Dashboard & Report K/U/A/R Separation
- **Teacher-facing**: Full 4-level cognitive breakdown (Knowledge/Understanding/Application/Reasoning)
- **Parent/Admin-facing**: 3-level summary (Knowledge/Application/Reasoning, collapsing Understanding into Knowledge for simplicity)

### Styling
- Uses Next.js global CSS (`/app/globals.css`)
- Custom fonts loaded via `next/font/google`: Fraunces (headings, `--font-heading`) and Plus Jakarta Sans (body, `--font-body`)
- CSS variable-driven design; refer to globals.css for color, spacing, and layout tokens

## TypeScript Configuration

Strict mode enabled with path alias `@/*` pointing to root. No external type packages beyond @types/react and @types/node.

## Testing

Playwright is installed as a dev dependency (`@playwright/test`) but no test files are currently present. When adding tests, follow Next.js conventions (place tests adjacent to source or in a dedicated `__tests__` folder).

## Common Development Tasks

### Adding a New Lesson Module
1. Add entry to `modules` array in `/data/modules.ts` with id (e.g., "D-1"), band, title, activities, and teacher prompts
2. Create corresponding lesson content component in `/components/lessons/` (e.g., `LessonD1.tsx`)
3. Lesson page automatically routes via `app/lesson/[moduleId]/page.tsx`

### Adding i18n Strings
1. Add `"English text": { ar: "Arabic translation" }` to the `dict` object in `/lib/i18n.tsx`
2. Use `t("English text")` in any client component to access it

### Modifying Dashboard/Report Visuals
- Charts are in `/components/charts` using Recharts
- Use Recharts components (`LineChart`, `BarChart`, `RadarChart`, etc.) and reference the color tokens from globals.css

## External Services

The Next.js config allows images from `www.i-screammedia.com` (i-scream Media branding). No API calls are currently implemented; all data is mocked in `/data/`.

## Notes

- **No database** — This is a demo with static/mock data in `/data/` files
- **No authentication** — All pages are public
- **React Strict Mode** enabled for development checks
- **ESLint**: Uses Next.js recommended rules; run `npm run lint` before committing
