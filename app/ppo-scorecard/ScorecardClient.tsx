"use client";

import { useState } from "react";
import Link from "next/link";

const QUESTIONS = [
  { id: 1, dimension: "Awareness", text: "Do you know which PPO plans your practice is currently contracted with?" },
  { id: 2, dimension: "Awareness", text: "Do you know your current fee schedule for each PPO plan?" },
  { id: 3, dimension: "Awareness", text: "Can you identify which PPO plans are most profitable for your practice?" },
  { id: 4, dimension: "Strategy", text: "Have you evaluated whether dropping any PPO plans would be financially beneficial?" },
  { id: 5, dimension: "Strategy", text: "Do you have a written plan for reducing PPO dependence over the next 12 months?" },
  { id: 6, dimension: "Strategy", text: "Have you calculated the true cost of participation for each PPO plan?" },
  { id: 7, dimension: "Negotiation", text: "Have you attempted to negotiate higher fees with any PPO in the past year?" },
  { id: 8, dimension: "Negotiation", text: "Do you know the process for requesting a fee increase from your PPOs?" },
  { id: 9, dimension: "Negotiation", text: "Are you aware of which PPO plans are open to fee negotiations?" },
  { id: 10, dimension: "Marketing", text: "Do you have a marketing strategy to attract fee-for-service patients?" },
  { id: 11, dimension: "Marketing", text: "Is your practice visible online to patients searching without insurance?" },
  { id: 12, dimension: "Marketing", text: "Do you have a membership plan or alternative to offer uninsured patients?" },
];

function getScoreLabel(score: number, total: number): { label: string; color: string; message: string } {
  const pct = (score / total) * 100;
  if (pct >= 80) return { label: "Excellent", color: "#1a7a52", message: "Your practice has strong PPO management foundations. Focus on optimization and advanced negotiation strategies." };
  if (pct >= 60) return { label: "Good", color: "#3d65a8", message: "You have solid awareness but there are clear opportunities to improve your negotiation and marketing strategy." };
  if (pct >= 40) return { label: "Fair", color: "#c8921a", message: "There are significant opportunities to improve your PPO management. Consider our podcast episodes on fee negotiation." };
  return { label: "Needs Work", color: "#c44", message: "Your practice would benefit greatly from a structured approach to PPO management. We recommend starting with our free resources." };
}

export default function ScorecardClient() {
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [showResults, setShowResults] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = QUESTIONS.length;
  const score = Object.values(answers).filter(Boolean).length;

  const handleAnswer = (id: number, value: boolean) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    if (answeredCount === totalQuestions) {
      setShowResults(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const result = getScoreLabel(score, totalQuestions);

  if (showResults) {
    const pct = Math.round((score / totalQuestions) * 100);
    return (
      <>
        <div className="page-banner">
          <div className="container page-banner-inner">
            <div className="page-eyebrow">Your Results</div>
            <h1 className="page-title">PPO Readiness Score</h1>
          </div>
        </div>
        <section style={{ background: "var(--paper)", padding: "3rem 0" }}>
          <div className="container" style={{ maxWidth: "600px", textAlign: "center" }}>
            <div style={{ background: "#fff", border: "1px solid var(--paper-3)", borderRadius: "var(--r-lg)", padding: "3rem 2rem", marginBottom: "2rem" }}>
              <div style={{ fontSize: "4rem", fontFamily: "var(--serif)", fontWeight: 900, color: result.color, lineHeight: 1 }}>
                {score}/{totalQuestions}
              </div>
              <div style={{ fontSize: "14px", color: "var(--ink-4)", marginTop: ".5rem", marginBottom: "1rem" }}>{pct}%</div>
              <div style={{ fontSize: "1.2rem", fontWeight: 700, color: result.color, marginBottom: ".75rem" }}>{result.label}</div>
              <p style={{ fontSize: "14px", color: "var(--ink-3)", lineHeight: 1.7 }}>{result.message}</p>
            </div>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/podcast/" className="btn-primary">Explore the Podcast</Link>
              <Link href="/contact/" className="btn-outline">Book a Free Consultation</Link>
            </div>
            <button
              onClick={() => { setAnswers({}); setShowResults(false); }}
              style={{ marginTop: "1.5rem", background: "none", border: "none", color: "var(--steel)", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}
            >
              Retake Scorecard &rarr;
            </button>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <div className="page-banner">
        <div className="container page-banner-inner">
          <div className="page-eyebrow">Free &bull; 2 Minutes</div>
          <h1 className="page-title">PPO Readiness Scorecard</h1>
          <p className="page-sub">
            Answer 12 quick yes/no questions and discover exactly where your practice stands with PPO management.
          </p>
        </div>
      </div>

      <section style={{ background: "var(--paper)", padding: "3rem 0" }}>
        <div className="container" style={{ maxWidth: "700px" }}>
          {/* Progress */}
          <div style={{ marginBottom: "2rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "var(--ink-4)", marginBottom: ".5rem" }}>
              <span>Progress</span>
              <span>{answeredCount}/{totalQuestions}</span>
            </div>
            <div style={{ height: "6px", background: "var(--paper-3)", borderRadius: "3px", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${(answeredCount / totalQuestions) * 100}%`, background: "var(--teal)", borderRadius: "3px", transition: "width .3s" }} />
            </div>
          </div>

          {/* Questions */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {QUESTIONS.map((q) => (
              <div
                key={q.id}
                style={{
                  background: answers[q.id] !== undefined ? "rgba(14,165,160,0.03)" : "#fff",
                  border: "1px solid var(--paper-3)",
                  borderRadius: "var(--r-lg)",
                  padding: "1.25rem 1.5rem",
                }}
              >
                <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <div style={{
                    width: "28px", height: "28px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "11px", fontWeight: 700, fontFamily: "var(--mono)",
                    background: answers[q.id] !== undefined ? "var(--teal)" : "var(--paper-2)",
                    color: answers[q.id] !== undefined ? "#fff" : "var(--ink-4)",
                  }}>
                    {q.id}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "var(--mono)", fontSize: "9px", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--steel)", marginBottom: ".3rem" }}>
                      {q.dimension}
                    </div>
                    <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--ink)", lineHeight: 1.5, marginBottom: ".75rem" }}>
                      {q.text}
                    </div>
                    <div style={{ display: "flex", gap: ".5rem" }}>
                      <button
                        onClick={() => handleAnswer(q.id, true)}
                        style={{
                          padding: ".45rem 1.2rem",
                          borderRadius: "var(--r)",
                          fontSize: "13px",
                          fontWeight: 600,
                          cursor: "pointer",
                          border: "1.5px solid",
                          borderColor: answers[q.id] === true ? "var(--teal)" : "var(--paper-3)",
                          background: answers[q.id] === true ? "var(--teal)" : "#fff",
                          color: answers[q.id] === true ? "#fff" : "var(--ink-3)",
                        }}
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => handleAnswer(q.id, false)}
                        style={{
                          padding: ".45rem 1.2rem",
                          borderRadius: "var(--r)",
                          fontSize: "13px",
                          fontWeight: 600,
                          cursor: "pointer",
                          border: "1.5px solid",
                          borderColor: answers[q.id] === false ? "var(--ink-3)" : "var(--paper-3)",
                          background: answers[q.id] === false ? "var(--ink-3)" : "#fff",
                          color: answers[q.id] === false ? "#fff" : "var(--ink-3)",
                        }}
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Submit */}
          <div style={{ marginTop: "2rem", textAlign: "center" }}>
            <button
              onClick={handleSubmit}
              disabled={answeredCount < totalQuestions}
              className="btn-teal"
              style={{
                padding: "1rem 2.5rem",
                fontSize: "15px",
                opacity: answeredCount < totalQuestions ? 0.5 : 1,
                cursor: answeredCount < totalQuestions ? "not-allowed" : "pointer",
              }}
            >
              See My Score &rarr;
            </button>
            {answeredCount < totalQuestions && (
              <p style={{ fontSize: "12px", color: "var(--ink-4)", marginTop: ".75rem" }}>
                Answer all {totalQuestions} questions to see your results
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
