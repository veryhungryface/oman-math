"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";

type SnackData = {
  name: string;
  emoji: string;
  votes: number;
};

export default function SnackVote() {
  const { t } = useI18n();
  const [snacks, setSnacks] = useState<SnackData[]>([
    { name: "Apple", emoji: "🍎", votes: 3 },
    { name: "Banana", emoji: "🍌", votes: 5 },
    { name: "Cookie", emoji: "🍪", votes: 2 },
    { name: "Yogurt", emoji: "🥛", votes: 4 },
  ]);
  const [feedback, setFeedback] = useState("");

  const addVote = (index: number) => {
    setSnacks((prev) => {
      const newSnacks = [...prev];
      newSnacks[index].votes += 1;
      return newSnacks;
    });
    setFeedback("");
  };

  const maxVotes = Math.max(...snacks.map((s) => s.votes));
  const totalVotes = snacks.reduce((sum, s) => sum + s.votes, 0);

  const handleCheck = () => {
    const winner = snacks.find((s) => s.votes === maxVotes);
    setFeedback(`✓ Current leader: ${winner?.emoji} ${winner?.name} with ${winner?.votes} votes out of ${totalVotes} total!`);
  };

  const reset = () => {
    setSnacks([
      { name: "Apple", emoji: "🍎", votes: 3 },
      { name: "Banana", emoji: "🍌", votes: 5 },
      { name: "Cookie", emoji: "🍪", votes: 2 },
      { name: "Yogurt", emoji: "🥛", votes: 4 },
    ]);
    setFeedback("");
  };

  return (
    <div className="interactive-widget">
      <h4>{t("Activity")} 1: Snack Vote</h4>
      <p className="subtext">Help the class vote for next week&apos;s snack. Click to add votes!</p>

      <div style={{ marginTop: "1.5rem" }}>
        {/* Vote buttons */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
          {snacks.map((snack, idx) => (
            <button
              key={idx}
              onClick={() => addVote(idx)}
              style={{
                padding: "1.5rem",
                background: "#f7f1ea",
                border: "2px solid #d57d3d",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "all 0.2s",
                fontSize: "1rem",
                fontWeight: 600,
              }}
              onMouseOver={(e) => {
                (e.target as HTMLButtonElement).style.background = "#e7d8c9";
              }}
              onMouseOut={(e) => {
                (e.target as HTMLButtonElement).style.background = "#f7f1ea";
              }}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>{snack.emoji}</div>
              <div>{snack.name}</div>
              <div style={{ fontSize: "1.5rem", color: "#d57d3d", marginTop: "0.3rem" }}>({snack.votes})</div>
            </button>
          ))}
        </div>

        {/* Bar chart */}
        <div style={{ marginBottom: "1.5rem", padding: "1rem", background: "#f7f1ea", borderRadius: "8px" }}>
          <p style={{ fontWeight: 600, marginBottom: "1rem" }}>Vote count:</p>
          {snacks.map((snack, idx) => (
            <div key={idx} style={{ marginBottom: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
                <span style={{ fontWeight: 600 }}>
                  {snack.emoji} {snack.name}
                </span>
                <span style={{ color: "#d57d3d", fontWeight: 700 }}>{snack.votes}</span>
              </div>
              <div style={{ background: "#e7e3df", borderRadius: "4px", height: "20px", overflow: "hidden" }}>
                <div
                  style={{
                    background: "#d57d3d",
                    height: "100%",
                    width: `${(snack.votes / maxVotes) * 100}%`,
                    transition: "width 0.3s",
                  }}
                />
              </div>
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
              background: "#e7f6f4",
              color: "#1a4a47",
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
            Check Results
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
