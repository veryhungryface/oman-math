"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";

type Outcome = {
  event: string;
  probability: number;
  payout: number;
};

export default function InsuranceExpectedValue() {
  const { t } = useI18n();
  const [outcomes, setOutcomes] = useState<Outcome[]>([
    { event: "No claim", probability: 0.95, payout: 0 },
    { event: "Minor claim", probability: 0.04, payout: 5000 },
    { event: "Major claim", probability: 0.01, payout: 50000 },
  ]);
  const [premiumInput, setPremiumInput] = useState(1800);
  const [feedback, setFeedback] = useState("");

  const expectedValue = outcomes.reduce((sum, o) => sum + o.probability * o.payout, 0);
  const expectedProfit = premiumInput - expectedValue;
  const isFair = Math.abs(expectedProfit) < 100;

  const handleCheck = () => {
    if (expectedProfit > 0) {
      setFeedback(
        `✓ Expected value of claims: €${expectedValue.toFixed(0)}\nPremium: €${premiumInput}\nExpected profit per policy: €${expectedProfit.toFixed(0)}\nThis is a good deal for the insurer!`
      );
    } else if (isFair) {
      setFeedback(
        `✓ Expected value: €${expectedValue.toFixed(0)}\nPremium: €${premiumInput}\nFair price (break-even)!`
      );
    } else {
      setFeedback(
        `⚠ Expected value: €${expectedValue.toFixed(0)}\nPremium: €${premiumInput}\nExpected loss per policy: €${expectedProfit.toFixed(0)}\nInsurer loses money!`
      );
    }
  };

  const reset = () => {
    setPremiumInput(1800);
    setFeedback("");
  };

  return (
    <div className="interactive-widget">
      <h4>{t("Activity")} 4: Insurance Expected Value</h4>
      <p className="subtext">Calculate fair insurance premiums using expected value.</p>

      <div style={{ marginTop: "1.5rem" }}>
        {/* Outcomes table */}
        <div style={{ padding: "1rem", background: "#f7f1ea", borderRadius: "8px", marginBottom: "1.5rem", overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #d57d3d" }}>
                <th style={{ padding: "0.5rem", textAlign: "left", fontWeight: 700 }}>Event</th>
                <th style={{ padding: "0.5rem", textAlign: "left", fontWeight: 700 }}>Probability</th>
                <th style={{ padding: "0.5rem", textAlign: "left", fontWeight: 700 }}>Payout</th>
                <th style={{ padding: "0.5rem", textAlign: "left", fontWeight: 700 }}>Expected</th>
              </tr>
            </thead>
            <tbody>
              {outcomes.map((outcome, idx) => (
                <tr key={idx} style={{ borderBottom: "1px solid #e7e3df" }}>
                  <td style={{ padding: "0.5rem" }}>{outcome.event}</td>
                  <td style={{ padding: "0.5rem" }}>{(outcome.probability * 100).toFixed(0)}%</td>
                  <td style={{ padding: "0.5rem" }}>€{outcome.payout.toLocaleString()}</td>
                  <td style={{ padding: "0.5rem", fontWeight: 600 }}>€{(outcome.probability * outcome.payout).toFixed(0)}</td>
                </tr>
              ))}
              <tr style={{ background: "#e7d8c9", fontWeight: 700 }}>
                <td colSpan={3} style={{ padding: "0.5rem", textAlign: "right" }}>
                  Total Expected Value:
                </td>
                <td style={{ padding: "0.5rem" }}>€{expectedValue.toFixed(0)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Premium input */}
        <div style={{ padding: "1rem", background: "#f7f1ea", borderRadius: "8px", marginBottom: "1.5rem" }}>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "1rem" }}>
            Premium (price): <span style={{ color: "#d57d3d", fontSize: "1.2rem" }}>€{premiumInput}</span>
          </label>
          <input
            type="range"
            min="500"
            max="3000"
            step="50"
            value={premiumInput}
            onChange={(e) => {
              setPremiumInput(Number(e.target.value));
              setFeedback("");
            }}
            style={{ width: "100%" }}
          />
        </div>

        {/* Profit analysis */}
        <div style={{ padding: "1rem", background: "#e7f6f4", borderRadius: "8px", marginBottom: "1.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <p style={{ fontSize: "0.85rem", color: "#5b534c" }}>Expected Payout:</p>
              <p style={{ fontSize: "1.3rem", fontWeight: 700, color: "#2f6f6a" }}>€{expectedValue.toFixed(0)}</p>
            </div>
            <div>
              <p style={{ fontSize: "0.85rem", color: "#5b534c" }}>Expected Profit:</p>
              <p
                style={{
                  fontSize: "1.3rem",
                  fontWeight: 700,
                  color: expectedProfit > 0 ? "#2d5016" : expectedProfit < -100 ? "#d32f2f" : "#fbc02d",
                }}
              >
                €{expectedProfit.toFixed(0)}
              </p>
            </div>
          </div>
        </div>

        {/* Info */}
        <div style={{ padding: "1rem", background: "#f7f1ea", borderRadius: "8px", marginBottom: "1.5rem", fontSize: "0.9rem", color: "#5b534c" }}>
          <p style={{ fontWeight: 600, marginBottom: "0.5rem" }}>Expected Value Formula:</p>
          <p>E[X] = Σ (Probability × Outcome)</p>
          <p style={{ marginTop: "0.5rem" }}>Insurance is profitable when Premium &gt; Expected Value</p>
        </div>

        {/* Feedback */}
        {feedback && (
          <div
            style={{
              padding: "0.8rem 1rem",
              borderRadius: "8px",
              marginBottom: "1rem",
              background: expectedProfit > 0 ? "#c8e6c9" : expectedProfit < -100 ? "#ffcccc" : "#fff9c4",
              color: expectedProfit > 0 ? "#2d5016" : expectedProfit < -100 ? "#d32f2f" : "#7a4a2b",
              fontWeight: 600,
              whiteSpace: "pre-wrap",
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
            Analyze Premium
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
