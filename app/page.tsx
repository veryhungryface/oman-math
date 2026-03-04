"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useI18n } from "@/lib/i18n";

export default function HomePage() {
  const { t } = useI18n();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 5);
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div style={{ width: "100%" }}>
      {/* Hero Section */}
      <div className="hero">
        <div className="hero-card">
          <p className="eyebrow">{t("Oman Mathematics Demo")}</p>
          <h1>{t("i-scream math with Oman")}</h1>
          <p className="subtext">
            {t("Interactive lesson to adaptive assessment, in one flow.")}
          </p>
          <div className="module-actions">
            <Link href="/teacher/home" className="primary-button">
              {t("Open Teacher Home")}
            </Link>
            <Link href="/lesson/B-1" className="ghost-button">
              {t("Launch Flagship Lesson")}
            </Link>
          </div>
        </div>

        {/* Visual Math Illustration */}
        <svg
          width="300"
          height="300"
          viewBox="0 0 300 300"
          style={{ opacity: 0.9 }}
        >
          {/* Background */}
          <rect width="300" height="300" fill="#f7f1ea" rx="12" />

          {/* Graph Grid */}
          <g opacity="0.3">
            {Array.from({ length: 6 }, (_, i) => (
              <line
                key={`h-${i}`}
                x1="20"
                y1={20 + i * 40}
                x2="280"
                y2={20 + i * 40}
                stroke="#d57d3d"
                strokeWidth="0.5"
              />
            ))}
            {Array.from({ length: 8 }, (_, i) => (
              <line
                key={`v-${i}`}
                x1={20 + i * 32.5}
                y1="20"
                x2={20 + i * 32.5}
                y2="260"
                stroke="#d57d3d"
                strokeWidth="0.5"
              />
            ))}
          </g>

          {/* Curved function */}
          <polyline
            points="20,200 52,160 84,100 116,70 148,60 180,100 212,150 244,200 276,230"
            fill="none"
            stroke="#d57d3d"
            strokeWidth="3"
          />

          {/* Data points */}
          {[20, 52, 84, 116, 148, 180, 212, 244, 276].map((x, i) => {
            const points = [200, 160, 100, 70, 60, 100, 150, 200, 230];
            return (
              <circle
                key={`point-${i}`}
                cx={x}
                cy={points[i]}
                r="4"
                fill="#2f6f6a"
              />
            );
          })}

          {/* Axes */}
          <line x1="20" y1="260" x2="280" y2="260" stroke="#5b534c" strokeWidth="2" />
          <line x1="20" y1="20" x2="20" y2="260" stroke="#5b534c" strokeWidth="2" />

          {/* Axis labels */}
          <text x="270" y="280" fontSize="12" fill="#5b534c" fontWeight="bold">
            x
          </text>
          <text x="10" y="15" fontSize="12" fill="#5b534c" fontWeight="bold">
            y
          </text>
        </svg>
      </div>

      {/* Student Activities Carousel */}
      <div style={{ backgroundColor: "#fff", padding: "0", marginTop: "2rem", position: "relative" }}>
        <div style={{ maxWidth: "100%", margin: "0", position: "relative" }}>
          <h2 style={{ textAlign: "center", marginBottom: "2rem", color: "#5b534c", padding: "0 2rem", paddingTop: "2rem" }}>
            ✨ {t("Students Enjoying Math Learning")}
          </h2>

          {/* Carousel */}
          <div style={{ position: "relative", height: "600px", marginBottom: "2rem", overflow: "hidden", borderRadius: "12px", margin: "0 2rem 2rem" }}>
            {/* Slide 1 */}
            {currentSlide === 0 && (
              <div style={{ animation: "fadeIn 0.5s", width: "100%", height: "100%" }}>
                <img src="/image/classroom-1.png" alt="Oman students learning mathematics" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "12px" }} />
              </div>
            )}

            {/* Slide 2 */}
            {currentSlide === 1 && (
              <div style={{ animation: "fadeIn 0.5s", width: "100%", height: "100%" }}>
                <img src="/image/classroom-2.png" alt="Students collaborating on math activities" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "12px" }} />
              </div>
            )}

            {/* Slide 3 */}
            {currentSlide === 2 && (
              <div style={{ animation: "fadeIn 0.5s", width: "100%", height: "100%" }}>
                <img src="/image/classroom-3.png" alt="Interactive technology-enhanced learning" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "12px" }} />
              </div>
            )}

            {/* Slide 4 */}
            {currentSlide === 3 && (
              <div style={{ animation: "fadeIn 0.5s", width: "100%", height: "100%" }}>
                <img src="/image/classroom-4.png" alt="Oman students engaged in math exploration" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "12px" }} />
              </div>
            )}

            {/* Slide 5 */}
            {currentSlide === 4 && (
              <div style={{ animation: "fadeIn 0.5s", width: "100%", height: "100%" }}>
                <img src="/image/classroom-5.png" alt="Students discovering mathematical concepts" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "12px" }} />
              </div>
            )}

            {/* Navigation Dots */}
            <div
              style={{
                position: "absolute",
                bottom: "20px",
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                gap: "12px",
              }}
            >
              {[0, 1, 2, 3, 4].map((index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: currentSlide === index ? "#d57d3d" : "rgba(255,255,255,0.5)",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* CSS Animation */}
        <style>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
        `}</style>
      </div>

      {/* Module Preview Section */}
      <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", marginBottom: "2rem", color: "#5b534c" }}>
          🎓 {t("9 Interactive Modules")}
        </h2>

        {/* Grade Band Sections */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
          {/* Band 1: Grades 1-4 */}
          <div className="card" style={{ borderTop: "4px solid #d57d3d" }}>
            <h3 style={{ color: "#d57d3d", marginBottom: "1rem" }}>📊 Grades 1-4</h3>
            <svg height="120" viewBox="0 0 200 120" style={{ marginBottom: "1rem" }}>
              <rect width="200" height="120" fill="#f7f1ea" rx="8" />
              {/* Bar chart */}
              <rect x="30" y="80" width="25" height="30" fill="#d57d3d" />
              <rect x="65" y="60" width="25" height="50" fill="#d57d3d" opacity="0.7" />
              <rect x="100" y="40" width="25" height="70" fill="#d57d3d" opacity="0.5" />
              <rect x="135" y="50" width="25" height="60" fill="#d57d3d" opacity="0.6" />
              {/* Axis */}
              <line x1="20" y1="110" x2="170" y2="110" stroke="#5b534c" strokeWidth="2" />
              <line x1="20" y1="10" x2="20" y2="110" stroke="#5b534c" strokeWidth="2" />
            </svg>
            <ul style={{ fontSize: "0.9rem", color: "#5b534c", lineHeight: "1.8" }}>
              <li>✓ A-1: Fractions & Ratios</li>
              <li>✓ A-2: Area & Perimeter</li>
              <li>✓ A-3: Data & Decision</li>
            </ul>
          </div>

          {/* Band 2: Grades 5-10 */}
          <div className="card" style={{ borderTop: "4px solid #2f6f6a" }}>
            <h3 style={{ color: "#2f6f6a", marginBottom: "1rem" }}>📈 Grades 5-10</h3>
            <svg height="120" viewBox="0 0 200 120" style={{ marginBottom: "1rem" }}>
              <rect width="200" height="120" fill="#f7f1ea" rx="8" />
              {/* Line graph */}
              <polyline
                points="20,80 60,50 100,70 140,30 180,60"
                fill="none"
                stroke="#2f6f6a"
                strokeWidth="2"
              />
              {/* Points */}
              {[20, 60, 100, 140, 180].map((x, i) => {
                const ys = [80, 50, 70, 30, 60];
                return <circle key={i} cx={x} cy={ys[i]} r="3" fill="#2f6f6a" />;
              })}
              {/* Axis */}
              <line x1="15" y1="100" x2="185" y2="100" stroke="#5b534c" strokeWidth="2" />
              <line x1="15" y1="20" x2="15" y2="100" stroke="#5b534c" strokeWidth="2" />
            </svg>
            <ul style={{ fontSize: "0.9rem", color: "#5b534c", lineHeight: "1.8" }}>
              <li>✓ B-1: Algebra & Graphs</li>
              <li>✓ B-2: Geometry & Scale</li>
              <li>✓ B-3: Statistics & Probability</li>
            </ul>
          </div>

          {/* Band 3: Grades 11-12 */}
          <div className="card" style={{ borderTop: "4px solid #7cb342" }}>
            <h3 style={{ color: "#7cb342", marginBottom: "1rem" }}>🚀 Grades 11-12</h3>
            <svg height="120" viewBox="0 0 200 120" style={{ marginBottom: "1rem" }}>
              <rect width="200" height="120" fill="#f7f1ea" rx="8" />
              {/* Parabola */}
              <path
                d="M 20 100 Q 100 20 180 100"
                fill="none"
                stroke="#7cb342"
                strokeWidth="2"
              />
              {/* Tangent line */}
              <line x1="70" y1="70" x2="140" y2="85" stroke="#d57d3d" strokeWidth="1.5" strokeDasharray="3,3" />
              {/* Point */}
              <circle cx="100" cy="50" r="3" fill="#7cb342" />
            </svg>
            <ul style={{ fontSize: "0.9rem", color: "#5b534c", lineHeight: "1.8" }}>
              <li>✓ C-1: Functions & Quadratics</li>
              <li>✓ C-2: Trigonometry & Coordinate</li>
              <li>✓ C-3: Calculus & Uncertainty</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div style={{ backgroundColor: "#f7f1ea", padding: "2rem", marginTop: "2rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="card">
            <h3>{t("Demo proof points")}</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
              <div>
                <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "#d57d3d", marginBottom: "0.5rem" }}>
                  🎮 Interactive Lessons
                </p>
                <p style={{ color: "#5b534c", fontSize: "0.9rem" }}>
                  {t("9 interactive modules across three grade bands")}
                </p>
              </div>
              <div>
                <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "#2f6f6a", marginBottom: "0.5rem" }}>
                  📝 Adaptive Assessment
                </p>
                <p style={{ color: "#5b534c", fontSize: "0.9rem" }}>
                  {t("Adaptive assessment: 3 anchor + 5 adaptive items")}
                </p>
              </div>
              <div>
                <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "#7cb342", marginBottom: "0.5rem" }}>
                  👨‍🏫 Teacher Dashboard
                </p>
                <p style={{ color: "#5b534c", fontSize: "0.9rem" }}>
                  {t("Teacher dashboard with concept heatmap and grouping")}
                </p>
              </div>
              <div>
                <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "#ff6b9d", marginBottom: "0.5rem" }}>
                  📊 Student Reports
                </p>
                <p style={{ color: "#5b534c", fontSize: "0.9rem" }}>
                  {t("Student report with concept radar and next steps")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
