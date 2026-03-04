"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";

type Card = {
  id: string;
  discriminant: number;
  label: string;
};

export default function DiscriminantSort() {
  const { t } = useI18n();
  const [cards, setCards] = useState<Card[]>([
    { id: "1", discriminant: 9, label: "b²-4ac=9" },
    { id: "2", discriminant: 0, label: "b²-4ac=0" },
    { id: "3", discriminant: -4, label: "b²-4ac=-4" },
    { id: "4", discriminant: 16, label: "b²-4ac=16" },
    { id: "5", discriminant: -1, label: "b²-4ac=-1" },
  ]);
  const [feedback, setFeedback] = useState("");

  const sorted = [...cards].sort((a, b) => {
    const getGroup = (d: number) => (d > 0 ? 0 : d === 0 ? 1 : 2);
    return getGroup(a.discriminant) - getGroup(b.discriminant);
  });

  const isCorrect = cards.every((c, i) => c.id === sorted[i].id);

  const handleCheck = () => {
    if (isCorrect) {
      setFeedback(
        "✓ Perfect! Two roots (positive) → One root (zero) → No real roots (negative)"
      );
    } else {
      setFeedback(
        "Not quite. Discriminant > 0 = 2 roots | = 0 = 1 root | < 0 = no real roots"
      );
    }
  };

  const reset = () => {
    setCards([
      { id: "1", discriminant: 9, label: "b²-4ac=9" },
      { id: "2", discriminant: 0, label: "b²-4ac=0" },
      { id: "3", discriminant: -4, label: "b²-4ac=-4" },
      { id: "4", discriminant: 16, label: "b²-4ac=16" },
      { id: "5", discriminant: -1, label: "b²-4ac=-1" },
    ]);
    setFeedback("");
  };

  return (
    <div className="interactive-widget">
      <h4>{t("Activity")} 2: Discriminant Sort</h4>
      <p className="subtext">Sort cards by their discriminant value to show solution types.</p>

      <div style={{ marginTop: "1.5rem" }}>
        {/* Bins */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "1rem",
            marginBottom: "1.5rem",
          }}
        >
          {[
            { title: "2 Real Roots", color: "#c8e6c9", condition: (d: number) => d > 0 },
            { title: "1 Real Root", color: "#fff9c4", condition: (d: number) => d === 0 },
            { title: "No Real Roots", color: "#ffcccc", condition: (d: number) => d < 0 },
          ].map((bin, idx) => (
            <div
              key={idx}
              style={{
                padding: "1rem",
                background: bin.color,
                borderRadius: "8px",
                minHeight: "200px",
                border: "2px dashed #5b534c",
              }}
            >
              <p style={{ fontWeight: 600, marginBottom: "1rem", textAlign: "center" }}>
                {bin.title}
              </p>
              {cards
                .filter((c) => bin.condition(c.discriminant))
                .map((card) => (
                  <div
                    key={card.id}
                    style={{
                      padding: "0.8rem",
                      background: "#fff",
                      borderRadius: "6px",
                      marginBottom: "0.5rem",
                      textAlign: "center",
                      fontWeight: 600,
                      border: "2px solid #5b534c",
                    }}
                  >
                    {card.label}
                  </div>
                ))}
            </div>
          ))}
        </div>

        {/* Unsorted cards */}
        <p style={{ fontWeight: 600, marginBottom: "0.8rem" }}>Cards to sort:</p>
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            padding: "1rem",
            background: "#f7f1ea",
            borderRadius: "8px",
            flexWrap: "wrap",
            marginBottom: "1.5rem",
          }}
        >
          {cards.map((card) => (
            <div
              key={card.id}
              style={{
                padding: "0.6rem 1rem",
                background: "#fff",
                border: "2px solid #d57d3d",
                borderRadius: "6px",
                fontWeight: 600,
                fontSize: "0.9rem",
              }}
            >
              {card.label}
            </div>
          ))}
        </div>

        {/* Feedback */}
        {feedback && (
          <div
            style={{
              padding: "0.8rem 1rem",
              borderRadius: "8px",
              marginBottom: "1rem",
              background: isCorrect ? "#c8e6c9" : "#f6e2d1",
              color: isCorrect ? "#2d5016" : "#7a4a2b",
              fontWeight: 600,
            }}
          >
            {feedback}
          </div>
        )}

        {/* Buttons */}
        <div style={{ display: "flex", gap: "0.8rem" }}>
          <button
            onClick={handleCheck}
            style={{
              padding: "0.7rem 1.5rem",
              background: "#d57d3d",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Check Sort
          </button>
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
