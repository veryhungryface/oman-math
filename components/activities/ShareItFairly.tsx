"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";

export default function ShareItFairly() {
  const { t } = useI18n();
  const [pieces, setPieces] = useState(2);
  const [fractionNum, setFractionNum] = useState("1");
  const [fractionDen, setFractionDen] = useState("2");
  const [decimal, setDecimal] = useState("0.5");
  const [percent, setPercent] = useState("50");
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [showCelebration, setShowCelebration] = useState(false);

  const handleCheck = () => {
    const frac = pieces / 4;
    const decVal = parseFloat(decimal);
    const pctVal = parseFloat(percent);

    const isCorrect =
      (fractionNum === pieces.toString() && fractionDen === "4") ||
      (fractionNum === "1" && fractionDen === "2" && pieces === 2) ||
      (fractionNum === "3" && fractionDen === "4" && pieces === 3) ||
      (fractionNum === "2" && fractionDen === "4" && pieces === 2);

    const decCorrect = Math.abs(decVal - frac) < 0.01;
    const pctCorrect = Math.abs(pctVal - frac * 100) < 1;

    if (isCorrect && decCorrect && pctCorrect) {
      setFeedback("✓ Perfect! All three representations match!");
      setSubmitted(true);
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 2000);
    } else {
      setFeedback("❌ Not quite. Check if all three forms show the same amount.");
    }
  };

  const reset = () => {
    setPieces(2);
    setFractionNum("1");
    setFractionDen("2");
    setDecimal("0.5");
    setPercent("50");
    setSubmitted(false);
    setFeedback("");
  };

  return (
    <div className="interactive-widget">
      <h4>🍕 Share it fairly</h4>
      <p className="subtext">You&apos;re sharing a pizza with your friends. Divide it and write the fraction, decimal, and percent!</p>

      <div style={{ marginTop: "2rem" }}>
        {/* Pizza visualization - larger and more interactive */}
        <div
          style={{
            display: "flex",
            gap: "2rem",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "2rem",
            padding: "2rem",
            background: "linear-gradient(135deg, #fff9f0 0%, #fff4e6 100%)",
            borderRadius: "16px",
          }}
        >
          <div style={{ position: "relative" }}>
            <svg width="200" height="200" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
              {/* Pizza outer crust */}
              <circle cx="60" cy="60" r="50" fill="#FDB913" stroke="#D4A000" strokeWidth="3" />
              {/* Pizza cheese texture */}
              <circle cx="60" cy="60" r="48" fill="#FFE55C" opacity="0.7" />

              {/* Pepperoni spots */}
              {[0, 1, 2, 3].map((i) => (
                <circle
                  key={`pep${i}`}
                  cx={60 + 25 * Math.cos((i * Math.PI) / 2 + 0.3)}
                  cy={60 - 25 * Math.sin((i * Math.PI) / 2 + 0.3)}
                  r="2"
                  fill="#C41E3A"
                />
              ))}

              {/* Slice divisions */}
              {pieces >= 1 && (
                <line x1="60" y1="60" x2="60" y2="10" stroke="#A67C3A" strokeWidth="2.5" />
              )}
              {pieces >= 2 && (
                <line
                  x1="60"
                  y1="60"
                  x2={60 + 50 * Math.cos(Math.PI / 2)}
                  y2={60 - 50 * Math.sin(Math.PI / 2)}
                  stroke="#A67C3A"
                  strokeWidth="2.5"
                />
              )}
              {pieces >= 3 && (
                <line
                  x1="60"
                  y1="60"
                  x2={60 + 50 * Math.cos(Math.PI)}
                  y2={60 - 50 * Math.sin(Math.PI)}
                  stroke="#A67C3A"
                  strokeWidth="2.5"
                />
              )}
              {pieces >= 4 && (
                <line
                  x1="60"
                  y1="60"
                  x2={60 + 50 * Math.cos((3 * Math.PI) / 2)}
                  y2={60 - 50 * Math.sin((3 * Math.PI) / 2)}
                  stroke="#A67C3A"
                  strokeWidth="2.5"
                />
              )}

              {/* Center point */}
              <circle cx="60" cy="60" r="3" fill="#8B6F47" />
            </svg>

            {/* Celebration animation */}
            {showCelebration && (
              <div
                style={{
                  position: "absolute",
                  top: "-30px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontSize: "2rem",
                  animation: "bounce 0.6s ease-out",
                }}
              >
                🎉
              </div>
            )}
          </div>

          <div>
            <p style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: "1rem", color: "#d57d3d" }}>
              Divide into pieces:
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.8rem" }}>
              {[1, 2, 3, 4].map((num) => (
                <button
                  key={num}
                  onClick={() => setPieces(num)}
                  style={{
                    padding: "0.8rem 1.2rem",
                    borderRadius: "12px",
                    border: pieces === num ? "3px solid #d57d3d" : "2px solid #ddd",
                    background: pieces === num ? "#d57d3d" : "#fff",
                    color: pieces === num ? "#fff" : "#5b534c",
                    cursor: "pointer",
                    fontWeight: 700,
                    fontSize: "1rem",
                    transition: "all 0.2s",
                  }}
                >
                  {num} piece{num > 1 ? "s" : ""}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Representation boxes - visual display */}
        <div style={{ marginBottom: "1.5rem" }}>
          <p style={{ fontWeight: 700, marginBottom: "1rem", color: "#5b534c" }}>
            Each person gets this much pizza:
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1rem",
              marginBottom: "1.5rem",
            }}
          >
            {/* Fraction Box */}
            <div
              style={{
                padding: "1.5rem",
                border: "3px solid #3856b0",
                borderRadius: "12px",
                background: "#f0f5ff",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "0.85rem", color: "#3856b0", fontWeight: 700, marginBottom: "0.5rem" }}>
                FRACTION
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", margin: "0.8rem 0" }}>
                <input
                  type="text"
                  value={fractionNum}
                  onChange={(e) => setFractionNum(e.target.value)}
                  style={{
                    width: "50px",
                    padding: "0.6rem",
                    border: "2px solid #3856b0",
                    borderRadius: "6px",
                    textAlign: "center",
                    fontSize: "1rem",
                    fontWeight: 700,
                  }}
                />
                <span style={{ fontSize: "1.4rem", color: "#3856b0" }}>/</span>
                <input
                  type="text"
                  value={fractionDen}
                  onChange={(e) => setFractionDen(e.target.value)}
                  style={{
                    width: "50px",
                    padding: "0.6rem",
                    border: "2px solid #3856b0",
                    borderRadius: "6px",
                    textAlign: "center",
                    fontSize: "1rem",
                    fontWeight: 700,
                  }}
                />
              </div>
            </div>

            {/* Decimal Box */}
            <div
              style={{
                padding: "1.5rem",
                border: "3px solid #2f6f6a",
                borderRadius: "12px",
                background: "#f0f5f4",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "0.85rem", color: "#2f6f6a", fontWeight: 700, marginBottom: "0.5rem" }}>
                DECIMAL
              </div>
              <input
                type="text"
                value={decimal}
                onChange={(e) => setDecimal(e.target.value)}
                placeholder="0.5"
                style={{
                  width: "100%",
                  padding: "0.8rem",
                  border: "2px solid #2f6f6a",
                  borderRadius: "6px",
                  textAlign: "center",
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* Percent Box */}
            <div
              style={{
                padding: "1.5rem",
                border: "3px solid #d57d3d",
                borderRadius: "12px",
                background: "#fff4f0",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "0.85rem", color: "#d57d3d", fontWeight: 700, marginBottom: "0.5rem" }}>
                PERCENT
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                <input
                  type="text"
                  value={percent}
                  onChange={(e) => setPercent(e.target.value)}
                  style={{
                    flex: 1,
                    padding: "0.8rem",
                    border: "2px solid #d57d3d",
                    borderRadius: "6px",
                    textAlign: "center",
                    fontSize: "1.2rem",
                    fontWeight: 700,
                  }}
                />
                <span style={{ fontSize: "1.2rem", color: "#d57d3d", fontWeight: 700 }}>%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback */}
        {feedback && (
          <div
            style={{
              padding: "1.2rem 1.5rem",
              borderRadius: "12px",
              marginBottom: "1.5rem",
              background: submitted ? "#e7f6f4" : "#fff3e0",
              color: submitted ? "#1a4a47" : "#e65100",
              fontWeight: 700,
              fontSize: "1.05rem",
              border: submitted ? "2px solid #2f6f6a" : "2px solid #ff9800",
            }}
          >
            {feedback}
          </div>
        )}

        {/* Buttons */}
        <div style={{ display: "flex", gap: "1rem" }}>
          <button
            onClick={handleCheck}
            style={{
              padding: "1rem 2rem",
              background: "#d57d3d",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              fontWeight: 700,
              cursor: "pointer",
              fontSize: "1rem",
              transition: "all 0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = "#a65b2d")}
            onMouseOut={(e) => (e.currentTarget.style.background = "#d57d3d")}
          >
            ✓ Check Answer
          </button>
          <button
            onClick={reset}
            style={{
              padding: "1rem 2rem",
              background: "#fff",
              color: "#5b534c",
              border: "2px solid #ddd",
              borderRadius: "12px",
              fontWeight: 700,
              cursor: "pointer",
              fontSize: "1rem",
              transition: "all 0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.borderColor = "#d57d3d")}
            onMouseOut={(e) => (e.currentTarget.style.borderColor = "#ddd")}
          >
            🔄 Reset
          </button>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0% { transform: translateX(-50%) translateY(0); opacity: 1; }
          100% { transform: translateX(-50%) translateY(-60px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
