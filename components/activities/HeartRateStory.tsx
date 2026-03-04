"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";

type StoryPhase = {
  phase: string;
  description: string;
  options: string[];
  correct: number;
};

export default function HeartRateStory() {
  const { t } = useI18n();
  const [phase, setPhase] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");

  const story: StoryPhase[] = [
    {
      phase: "Rest",
      description: "Maya is sitting quietly at home before exercise.",
      options: ["🔴 Heart rate increasing", "🟢 Heart rate staying constant", "🔵 Heart rate decreasing"],
      correct: 1,
    },
    {
      phase: "Start Running",
      description: "Maya starts jogging. Her heart is working harder.",
      options: ["🔴 Heart rate increasing", "🟢 Heart rate staying constant", "🔵 Heart rate decreasing"],
      correct: 0,
    },
    {
      phase: "Cool Down",
      description: "Maya stops running and walks slowly to cool down.",
      options: ["🔴 Heart rate increasing", "🟢 Heart rate staying constant", "🔵 Heart rate decreasing"],
      correct: 2,
    },
  ];

  const current = story[phase];

  const handleSelect = (index: number) => {
    setSelected(index);
    if (index === current.correct) {
      setFeedback(`✓ Correct! During ${current.phase}, ${current.description.toLowerCase()}`);
      setTimeout(() => {
        if (phase < story.length - 1) {
          setPhase((p) => p + 1);
          setSelected(null);
          setFeedback("");
        }
      }, 1500);
    } else {
      setFeedback("Not quite. Think about how the heart responds to exercise.");
    }
  };

  const reset = () => {
    setPhase(0);
    setSelected(null);
    setFeedback("");
  };

  return (
    <div className="interactive-widget">
      <h4>{t("Activity")} 4: Heart Rate Story</h4>
      <p className="subtext">Match each exercise phase to the correct heart rate pattern.</p>

      <div style={{ marginTop: "1.5rem" }}>
        {/* Progress */}
        <div style={{ marginBottom: "1.5rem" }}>
          <p style={{ fontSize: "0.9rem", color: "#5b534c", marginBottom: "0.5rem" }}>Phase {phase + 1} of {story.length}</p>
          <div style={{ height: "4px", background: "#f1ece7", borderRadius: "2px", overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                background: "#d57d3d",
                width: `${((phase + 1) / story.length) * 100}%`,
                transition: "width 0.3s",
              }}
            />
          </div>
        </div>

        {/* Story */}
        <div style={{ padding: "1.5rem", background: "#f7f1ea", borderRadius: "8px", marginBottom: "1.5rem", textAlign: "center" }}>
          <p style={{ fontSize: "1.3rem", fontWeight: 700, color: "#d57d3d", marginBottom: "0.5rem" }}>Phase: {current.phase}</p>
          <p style={{ color: "#5b534c" }}>{current.description}</p>
        </div>

        {/* Question */}
        <p style={{ fontWeight: 600, textAlign: "center", marginBottom: "1.5rem" }}>What happens to the heart rate?</p>

        {/* Options */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", marginBottom: "1.5rem" }}>
          {current.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={selected !== null}
              style={{
                padding: "1rem",
                background: selected === idx ? (idx === current.correct ? "#c8e6c9" : "#ffcccc") : "#fff",
                border: selected === idx ? (idx === current.correct ? "2px solid #2d5016" : "2px solid #d32f2f") : "2px solid #ddd",
                borderRadius: "8px",
                fontWeight: 600,
                cursor: selected !== null ? "not-allowed" : "pointer",
                transition: "all 0.2s",
              }}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Feedback */}
        {feedback && (
          <div
            style={{
              padding: "0.8rem 1rem",
              borderRadius: "8px",
              marginBottom: "1rem",
              background: feedback.includes("✓") ? "#e7f6f4" : "#f6e2d1",
              color: feedback.includes("✓") ? "#1a4a47" : "#7a4a2b",
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            {feedback}
          </div>
        )}

        {/* Completion message */}
        {phase === story.length - 1 && selected === current.correct && (
          <div
            style={{
              padding: "1rem",
              borderRadius: "8px",
              background: "#c8e6c9",
              color: "#2d5016",
              fontWeight: 600,
              textAlign: "center",
              marginBottom: "1rem",
            }}
          >
            🎉 Great job! You understood all the heart rate changes!
          </div>
        )}

        {/* Buttons */}
        <div style={{ display: "flex", gap: "0.8rem" }}>
          <button
            onClick={reset}
            style={{
              padding: "0.7rem 1.5rem",
              background: "#fff",
              color: "#5b534c",
              border: "1px solid #ddd",
              borderRadius: "8px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
