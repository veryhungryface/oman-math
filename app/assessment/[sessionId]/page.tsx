"use client";

import { useState, useMemo } from "react";
import { useI18n } from "@/lib/i18n";
import { questionBank, type Question } from "@/data/questions";
import Link from "next/link";

type AssessmentPageProps = {
  params: { sessionId: string };
};

export default function AssessmentPage({ params }: AssessmentPageProps) {
  const { locale, t } = useI18n();
  const moduleId = params.sessionId.replace("-demo", "");

  const questions = useMemo(() => {
    const pool = questionBank.filter((q) => q.moduleId === moduleId);
    return pool.length > 0 ? pool : questionBank.slice(0, 5);
  }, [moduleId]);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [finished, setFinished] = useState(false);

  const question = questions[currentIdx];
  const isCorrect = selected === question?.correctIndex;
  const totalCorrect = answers.filter((a, i) => a === questions[i]?.correctIndex).length;

  function handleSelect(idx: number) {
    if (submitted) return;
    setSelected(idx);
  }

  function handleSubmit() {
    if (selected === null) return;
    setSubmitted(true);
    setAnswers((prev) => {
      const next = [...prev];
      next[currentIdx] = selected;
      return next;
    });
  }

  function handleNext() {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelected(null);
      setSubmitted(false);
    } else {
      setFinished(true);
    }
  }

  if (finished) {
    const domainScores = computeDomainScores(questions, answers);
    return (
      <div>
        <div className="section-header">
          <p className="eyebrow">{t("Assessment Complete")}</p>
          <h2>{t("Results")}</h2>
        </div>
        <div className="info-grid" style={{ marginBottom: "1.5rem" }}>
          <div className="card kpi-card">
            <p className="detail-label">{t("Score")}</p>
            <p className="kpi-value">{totalCorrect} / {questions.length}</p>
          </div>
          <div className="card kpi-card">
            <p className="detail-label">{t("Mastery")}</p>
            <p className="kpi-value">{Math.round((totalCorrect / questions.length) * 100)}%</p>
          </div>
          <div className="card kpi-card">
            <p className="detail-label">{t("Module")}</p>
            <p className="kpi-value">{moduleId}</p>
          </div>
        </div>
        <div className="info-grid" style={{ marginBottom: "1.5rem" }}>
          {domainScores.map((ds) => (
            <div key={ds.domain} className="card">
              <p className="detail-label">{ds.domain}</p>
              <div className="mastery-bar-outer">
                <div className="mastery-bar-inner" style={{ width: `${ds.pct}%`, background: ds.pct >= 70 ? "#2f6f6a" : ds.pct >= 40 ? "#d57d3d" : "#c0392b" }} />
              </div>
              <p className="detail-value">{ds.correct}/{ds.total} ({ds.pct}%)</p>
            </div>
          ))}
        </div>
        <div className="card" style={{ marginBottom: "1.5rem" }}>
          <h4>{t("Question Review")}</h4>
          <div className="review-list">
            {questions.map((q, i) => {
              const userAns = answers[i];
              const correct = userAns === q.correctIndex;
              return (
                <div key={q.id} className={`review-item ${correct ? "review-correct" : "review-wrong"}`}>
                  <span className="review-badge">{correct ? "✓" : "✗"}</span>
                  <div>
                    <p className="review-stem">{locale === "ar" ? q.stemAr : q.stem}</p>
                    <p className="subtext">{locale === "ar" ? q.explanationAr : q.explanation}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="module-actions">
          <Link className="primary-button" href={`/report/student/${params.sessionId}`}>{t("View Student Report")}</Link>
          <Link className="ghost-button" href="/teacher/home">{t("Back to Teacher Home")}</Link>
        </div>
      </div>
    );
  }

  const stem = locale === "ar" ? question.stemAr : question.stem;
  const choices = locale === "ar" ? question.choicesAr : question.choices;
  const explanation = locale === "ar" ? question.explanationAr : question.explanation;

  return (
    <div>
      <div className="section-header">
        <p className="eyebrow">{t("Student Assessment")}</p>
        <h2>{t("Adaptive assessment session")}</h2>
      </div>
      <div className="progress-bar-outer">
        <div className="progress-bar-inner" style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }} />
      </div>
      <p className="subtext" style={{ marginBottom: "1rem" }}>{t("Progress")}: {currentIdx + 1} / {questions.length} | {t("Domain")}: {question.domain} | Lv.{question.difficulty}</p>
      <div className="assessment-shell">
        <div className="question-card">
          <h3>{stem}</h3>
          <div className="choice-grid">
            {choices.map((choice, idx) => {
              let cls = "choice";
              if (submitted && idx === question.correctIndex) cls += " choice-correct";
              else if (submitted && idx === selected && !isCorrect) cls += " choice-wrong";
              else if (!submitted && idx === selected) cls += " choice-selected";
              return (
                <button key={idx} className={cls} type="button" onClick={() => handleSelect(idx)}>
                  {choice}
                </button>
              );
            })}
          </div>
          {submitted && (
            <div className={`feedback-box ${isCorrect ? "feedback-correct" : "feedback-wrong"}`}>
              <p>{isCorrect ? "✓ Correct!" : "✗ Incorrect"}</p>
              <p className="subtext">{explanation}</p>
            </div>
          )}
          <div className="module-actions" style={{ marginTop: "1.5rem" }}>
            {!submitted ? (
              <button className="primary-button" type="button" onClick={handleSubmit} disabled={selected === null}>
                {t("Submit answer")}
              </button>
            ) : (
              <button className="primary-button" type="button" onClick={handleNext}>
                {currentIdx < questions.length - 1 ? t("Next question") : t("Finish")}
              </button>
            )}
          </div>
        </div>
        <div className="card">
          <h4>{t("Tools")}</h4>
          <div className="tool-list" style={{ marginTop: "1rem" }}>
            <div className="tool-card">{t("Number line")}</div>
            <div className="tool-card">{t("Grid and graph")}</div>
            <div className="tool-card">{t("Limited calculator")}</div>
          </div>
          <h4 style={{ marginTop: "1.5rem" }}>{t("Progress")}</h4>
          <div className="answer-dots">
            {questions.map((_, i) => {
              let dotCls = "answer-dot";
              if (i < currentIdx) dotCls += answers[i] === questions[i].correctIndex ? " dot-correct" : " dot-wrong";
              else if (i === currentIdx) dotCls += " dot-current";
              return <span key={i} className={dotCls} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function computeDomainScores(questions: Question[], answers: (number | null)[]) {
  const domains = ["K", "U", "A", "R"] as const;
  return domains.map((d) => {
    const qs = questions.filter((q) => q.domain === d);
    const correct = qs.filter((q, _) => {
      const idx = questions.indexOf(q);
      return answers[idx] === q.correctIndex;
    }).length;
    return { domain: d, correct, total: qs.length, pct: qs.length > 0 ? Math.round((correct / qs.length) * 100) : 0 };
  });
}
