"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";

export default function PictogramBuilder() {
  const { t } = useI18n();
  const [bookCount, setBookCount] = useState(0);
  const [feedback, setFeedback] = useState("");

  const iconValue = 2; // 1 icon = 2 books
  const totalBooks = bookCount * iconValue;

  const addIcon = () => {
    setBookCount((prev) => prev + 1);
    setFeedback("");
  };

  const removeIcon = () => {
    if (bookCount > 0) {
      setBookCount((prev) => prev - 1);
      setFeedback("");
    }
  };

  const handleCheck = () => {
    setFeedback(`✓ You've read ${bookCount} icons × ${iconValue} books per icon = ${totalBooks} books total!`);
  };

  const reset = () => {
    setBookCount(0);
    setFeedback("");
  };

  return (
    <div className="interactive-widget">
      <h4>{t("Activity")} 2: Pictogram Builder</h4>
      <p className="subtext">Build a pictogram showing books read. Each 📚 icon = 2 books.</p>

      <div style={{ marginTop: "1.5rem" }}>
        {/* Key */}
        <div style={{ padding: "1rem", background: "#f7f1ea", borderRadius: "8px", marginBottom: "1.5rem" }}>
          <p style={{ fontWeight: 600, marginBottom: "0.5rem" }}>Pictogram key:</p>
          <p style={{ fontSize: "1.5rem" }}>📚 = 2 books</p>
        </div>

        {/* Pictogram display */}
        <div
          style={{
            padding: "1.5rem",
            background: "#e7f6f4",
            borderRadius: "8px",
            marginBottom: "1.5rem",
            minHeight: "100px",
            display: "flex",
            alignItems: "center",
            gap: "0.8rem",
            flexWrap: "wrap",
          }}
        >
          {Array.from({ length: bookCount }, (_, i) => (
            <div key={i} style={{ fontSize: "2rem" }}>
              📚
            </div>
          ))}
          {bookCount === 0 && <p style={{ color: "#5b534c", fontStyle: "italic" }}>Add icons by clicking the button below...</p>}
        </div>

        {/* Counter */}
        <div style={{ textAlign: "center", marginBottom: "1.5rem", padding: "1rem", background: "#f7f1ea", borderRadius: "8px" }}>
          <p style={{ fontSize: "0.9rem", color: "#5b534c", marginBottom: "0.5rem" }}>Number of icons:</p>
          <p style={{ fontSize: "2rem", fontWeight: 700, color: "#2f6f6a" }}>{bookCount}</p>
          <p style={{ fontSize: "0.9rem", color: "#5b534c" }}>Total books: {totalBooks}</p>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", gap: "0.8rem", marginBottom: "1.5rem", justifyContent: "center" }}>
          <button
            onClick={addIcon}
            style={{
              padding: "0.7rem 1.5rem",
              background: "#2f6f6a",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            + Add Icon
          </button>
          <button
            onClick={removeIcon}
            disabled={bookCount === 0}
            style={{
              padding: "0.7rem 1.5rem",
              background: bookCount === 0 ? "#e7e3df" : "#d57d3d",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontWeight: 600,
              cursor: bookCount === 0 ? "not-allowed" : "pointer",
            }}
          >
            - Remove Icon
          </button>
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
            Check Total
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
