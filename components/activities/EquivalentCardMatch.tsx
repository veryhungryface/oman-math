"use client";

import { useState, useMemo } from "react";
import { useI18n } from "@/lib/i18n";

type Card = {
  id: string;
  value: number;
  display: string;
  group: number;
};

const cardGroups: Card[] = [
  // Group 1: 1/2 = 0.5 = 50%
  { id: "1a", value: 0.5, display: "1/2", group: 1 },
  { id: "1b", value: 0.5, display: "0.5", group: 1 },
  { id: "1c", value: 0.5, display: "50%", group: 1 },

  // Group 2: 1/4 = 0.25 = 25%
  { id: "2a", value: 0.25, display: "1/4", group: 2 },
  { id: "2b", value: 0.25, display: "0.25", group: 2 },
  { id: "2c", value: 0.25, display: "25%", group: 2 },

  // Group 3: 3/4 = 0.75 = 75%
  { id: "3a", value: 0.75, display: "3/4", group: 3 },
  { id: "3b", value: 0.75, display: "0.75", group: 3 },
  { id: "3c", value: 0.75, display: "75%", group: 3 },

  // Group 4: 2/4 = 0.5 = 50%
  { id: "4a", value: 0.5, display: "2/4", group: 4 },
  { id: "4b", value: 0.5, display: "0.50", group: 4 },
  { id: "4c", value: 0.5, display: "100%/2", group: 4 },
];

export default function EquivalentCardMatch() {
  const { t } = useI18n();
  const [selected, setSelected] = useState<string[]>([]);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [feedback, setFeedback] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [completed, setCompleted] = useState(false);

  // Shuffle cards on mount
  const shuffled = useMemo(() => {
    const arr = [...cardGroups];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, []);

  const handleCardClick = (cardId: string) => {
    if (matched.has(cardId)) return;

    const newSelected = selected.includes(cardId) ? selected.filter((id) => id !== cardId) : [...selected, cardId];

    setSelected(newSelected);

    // Check if 3 cards are selected
    if (newSelected.length === 3) {
      const selectedCards = shuffled.filter((c) => newSelected.includes(c.id));
      const group = selectedCards[0].group;
      const value = selectedCards[0].value;

      // Check if all 3 cards match (same group and value)
      const allMatch = selectedCards.every((c) => Math.abs(c.value - value) < 0.01);

      if (allMatch) {
        const newMatched = new Set(matched);
        newSelected.forEach((id) => newMatched.add(id));
        setMatched(newMatched);
        setFeedback(`✓ Great match! ${selectedCards.map((c) => c.display).join(" = ")}`);
        setSelected([]);

        if (newMatched.size === cardGroups.length) {
          setFeedback("🎉 Perfect! You matched all the equivalent values!");
          setCompleted(true);
        }
      } else {
        setFeedback("❌ Not a match. Try again—look for equivalent values.");
        setAttempts((prev) => prev + 1);
        setTimeout(() => setSelected([]), 800);
      }
    }
  };

  const reset = () => {
    setSelected([]);
    setMatched(new Set());
    setFeedback("");
    setAttempts(0);
    setCompleted(false);
  };

  const remainingCards = shuffled.filter((c) => !matched.has(c.id));

  return (
    <div className="interactive-widget">
      <h4>{t("Activity")} 3: Equivalent card match</h4>
      <p className="subtext">Match three cards that show the same value. Find all four groups: 1/2, 1/4, 3/4, and 2/4.</p>

      <div style={{ marginTop: "1.5rem" }}>
        {/* Stats */}
        <div style={{ display: "flex", gap: "2rem", marginBottom: "1.5rem", fontSize: "0.95rem" }}>
          <div>
            <span style={{ color: "#5b534c", fontWeight: 600 }}>Pairs matched: </span>
            <span style={{ fontWeight: 700 }}>{matched.size / 3}/4</span>
          </div>
          <div>
            <span style={{ color: "#5b534c", fontWeight: 600 }}>Attempts: </span>
            <span style={{ fontWeight: 700 }}>{attempts}</span>
          </div>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
            gap: "1rem",
            marginBottom: "1.5rem",
          }}
        >
          {remainingCards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              style={{
                padding: "1.5rem 1rem",
                border: selected.includes(card.id) ? "3px solid #d57d3d" : "2px solid #ddd",
                borderRadius: "8px",
                background: selected.includes(card.id) ? "#fef4ec" : "#fff",
                cursor: "pointer",
                fontSize: "1.1rem",
                fontWeight: 700,
                transition: "all 0.2s",
                minHeight: "90px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                color: selected.includes(card.id) ? "#d57d3d" : "#1c1a17",
              }}
            >
              {card.display}
            </button>
          ))}
        </div>

        {/* Matched cards display */}
        {matched.size > 0 && (
          <div style={{ marginBottom: "1.5rem" }}>
            <p style={{ fontWeight: 600, marginBottom: "0.8rem" }}>✓ Matched:</p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              {Array.from({ length: matched.size / 3 }).map((_, idx) => {
                const groupCards = shuffled.filter((c) => matched.has(c.id) && c.group === idx + 1);
                if (groupCards.length === 0) return null;
                return (
                  <div
                    key={idx}
                    style={{
                      padding: "0.8rem 1rem",
                      background: "#e7f6f4",
                      borderRadius: "8px",
                      fontWeight: 600,
                      color: "#1a4a47",
                    }}
                  >
                    {groupCards.map((c) => c.display).join(" = ")}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Feedback */}
        {feedback && (
          <div
            style={{
              padding: "0.8rem 1rem",
              borderRadius: "8px",
              marginBottom: "1rem",
              background: completed ? "#e7f6f4" : feedback.includes("❌") ? "#f6e2d1" : "#e7f6f4",
              color: completed || !feedback.includes("❌") ? "#1a4a47" : "#7a4a2b",
              fontWeight: 600,
            }}
          >
            {feedback}
          </div>
        )}

        {/* Buttons */}
        {!completed && (
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
        )}
      </div>
    </div>
  );
}
