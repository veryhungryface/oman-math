"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import type { LessonActivity } from "@/data/modules";

type ActivityStepperProps = {
  activities: LessonActivity[];
};

export default function ActivityStepper({ activities }: ActivityStepperProps) {
  const { t } = useI18n();
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<Set<number>>(new Set());

  function handleMarkDone() {
    setCompleted((prev) => {
      const next = new Set(prev);
      next.add(activeStep);
      return next;
    });
  }

  function handleNextStep() {
    if (activeStep < activities.length - 1) {
      setActiveStep(activeStep + 1);
    }
  }

  return (
    <div className="card" style={{ marginTop: "1.5rem" }}>
      <h4>{t("Student activities")}</h4>
      <p className="subtext">{t("Short, high-participation routines aligned to the lesson focus.")}</p>
      <div className="stepper-list">
        {activities.map((activity, index) => {
          const isActive = index === activeStep;
          const isDone = completed.has(index);
          const stepClass = isDone ? "stepper-step-done" : isActive ? "stepper-step-active" : "";

          return (
            <div key={index} className={`stepper-step ${stepClass}`}>
              <div className="stepper-left">
                <div className="stepper-number">
                  {isDone ? "✓" : index + 1}
                </div>
                {index < activities.length - 1 && <div className="stepper-line" />}
              </div>

              <div className="stepper-right">
                <div>
                  <p className="detail-label">{t("Activity")}</p>
                  <p className="stepper-action">{activity.title}</p>
                </div>

                {isActive && (
                  <>
                    <div>
                      <p className="detail-label">{t("Student action")}</p>
                      <p style={{ fontSize: "0.9rem" }}>{activity.studentAction}</p>
                    </div>

                    <details className="stepper-teacher-detail">
                      <summary>{t("Teacher move")}</summary>
                      <div className="stepper-teacher-body">
                        {activity.teacherMove}
                      </div>
                    </details>

                    <div className="stepper-meta">
                      <div>
                        <p className="detail-label">{t("Grouping")}</p>
                        <p className="detail-value" style={{ fontSize: "0.85rem" }}>{activity.grouping}</p>
                      </div>
                      <div>
                        <p className="detail-label">{t("Time")}</p>
                        <p className="detail-value" style={{ fontSize: "0.85rem" }}>{activity.time}</p>
                      </div>
                      <div>
                        <p className="detail-label">{t("Evidence")}</p>
                        <p className="detail-value" style={{ fontSize: "0.85rem" }}>{activity.evidence}</p>
                      </div>
                    </div>

                    <div className="stepper-controls">
                      <button className="stepper-btn stepper-btn-primary" onClick={handleMarkDone}>
                        {t("Mark done")}
                      </button>
                      {index < activities.length - 1 && (
                        <button className="stepper-btn" onClick={handleNextStep}>
                          {t("Next step")}
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
