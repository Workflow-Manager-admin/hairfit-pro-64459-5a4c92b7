import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// PUBLIC_INTERFACE
/**
 * ProfileQuiz - Multi-step quiz to collect user's hair profile details.
 * Steps: Hair Type, Scalp, Goals, Problems.
 * Navigation with Next/Back buttons, final completion action.
 */
function ProfileQuiz() {
  // Steps/questions definition
  const steps = [
    {
      key: "hairType",
      question: "What is your hair type?",
      options: [
        "Straight",
        "Wavy",
        "Curly",
        "Coily",
        "Not sure"
      ],
      color: "#4A90E2"
    },
    {
      key: "scalp",
      question: "How would you describe your scalp?",
      options: [
        "Oily",
        "Dry",
        "Normal",
        "Sensitive",
        "Flaky"
      ],
      color: "#50E3C2"
    },
    {
      key: "goals",
      question: "What are your primary hair goals?",
      options: [
        "More volume",
        "Moisture/hydration",
        "Less frizz",
        "Growth",
        "Shine",
        "Damage repair"
      ],
      multi: true,
      color: "#F5A623"
    },
    {
      key: "problems",
      question: "Are you experiencing any of these problems?",
      options: [
        "Hair fall",
        "Breakage",
        "Split ends",
        "Dandruff",
        "Color fading",
        "None"
      ],
      multi: true,
      color: "#4A90E2"
    }
  ];

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [complete, setComplete] = useState(false);
  const navigate = useNavigate();

  // Handle answer selection (works for single and multi-select steps)
  const handleSelect = (index) => {
    const current = steps[step];
    if (current.multi) {
      const prev = answers[current.key] || [];
      // Toggle selection
      let updated;
      if (prev.includes(index)) {
        updated = prev.filter(i => i !== index);
      } else {
        updated = [...prev, index];
      }
      setAnswers({ ...answers, [current.key]: updated });
    } else {
      setAnswers({ ...answers, [current.key]: index });
    }
  };

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(s => s + 1);
    } else {
      // Quiz complete!
      setComplete(true);
      // Optionally: navigate("/routine") instead
      // navigate("/routine");
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(s => s - 1);
  };

  // Helper: determine if the current step's answer is valid (something picked)
  const isStepValid = () => {
    const current = steps[step];
    const ans = answers[current.key];
    if (current.multi) return ans && ans.length > 0;
    return ans !== undefined;
  };

  // Styling for quiz container/pages, modern on brand
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f7fafc",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: "120px"
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "22px",
          boxShadow: "0 4px 24px rgba(74,144,226,0.06)",
          width: "100%",
          maxWidth: 420,
          minHeight: 380,
          padding: "38px 30px 36px 30px",
          margin: "auto",
          display: "flex",
          flexDirection: "column"
        }}
      >
        {!complete ? (
          <>
            <div style={{ marginBottom: 12 }}>
              <div
                style={{
                  color: steps[step].color,
                  fontWeight: 700,
                  fontSize: "1.13rem"
                }}
              >Step {step + 1} of {steps.length}</div>
              <h2
                style={{
                  fontSize: "2rem",
                  fontWeight: 700,
                  margin: "21px 0 18px 0",
                  color: "#302e2b"
                }}
              >
                {steps[step].question}
              </h2>
            </div>
            <div>
              {steps[step].options.map((opt, idx) => {
                const selected = steps[step].multi
                  ? (answers[steps[step].key] || []).includes(idx)
                  : answers[steps[step].key] === idx;
                return (
                  <button
                    key={opt}
                    onClick={() => handleSelect(idx)}
                    type="button"
                    className="quiz-option"
                    style={{
                      display: "block",
                      width: "100%",
                      marginBottom: 13,
                      padding: "13px 20px",
                      borderRadius: "12px",
                      border: selected
                        ? `2.2px solid ${steps[step].color}`
                        : "2px solid #e9eef4",
                      background: selected
                        ? "linear-gradient(90deg, #e9f7fc, #fff 90%)"
                        : "#fafcfb",
                      color: "#192f40",
                      fontWeight: selected ? 600 : 500,
                      boxShadow: selected
                        ? "0 2px 9px 0 rgba(80,227,194,.14)"
                        : "none",
                      outline: "none",
                      cursor: "pointer",
                      transition: "all 0.18s"
                    }}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            <div style={{ marginTop: 27, display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={handleBack}
                disabled={step === 0}
                className="btn btn-large"
                style={{
                  background: "#eaeaea",
                  color: "#7a7977",
                  border: "none",
                  borderRadius: "5px",
                  padding: "10px 18px",
                  fontWeight: 500,
                  fontSize: "1rem",
                  opacity: step === 0 ? 0.55 : 1,
                  cursor: step === 0 ? "not-allowed" : "pointer"
                }}
              >
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={!isStepValid()}
                className="btn btn-large"
                style={{
                  background: steps[step].color,
                  color: "#fff",
                  minWidth: 90,
                  border: "none",
                  borderRadius: "5px",
                  padding: "10px 24px",
                  fontWeight: 600,
                  fontSize: "1rem",
                  opacity: isStepValid() ? 1 : 0.62,
                  cursor: isStepValid() ? "pointer" : "not-allowed",
                  boxShadow: "0 1.5px 6px rgba(74,144,226,0.09)",
                  transition: "background 0.17s"
                }}
              >
                {step === steps.length - 1 ? "Finish" : "Next"}
              </button>
            </div>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "48px 0 30px 0" }}>
            <h2 style={{ fontSize: "2.2rem", color: "#4A90E2", fontWeight: 700, marginBottom: 10 }}>
              Quiz Complete!
            </h2>
            <div style={{ color: "#50E3C2", fontSize: "1.07rem" }}>
              Thank you for sharing your hair journey details.
            </div>
            <button
              className="btn btn-large"
              style={{
                marginTop: 32,
                background: "#F5A623",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                padding: "11px 30px",
                fontWeight: 700,
                fontSize: "1.07rem",
                cursor: "pointer"
              }}
              onClick={() => navigate("/routine")}
            >
              See My Routine
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileQuiz;
