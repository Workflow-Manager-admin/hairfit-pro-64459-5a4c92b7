import React, { useState } from "react";
import "./CommunityQA.css";

// PUBLIC_INTERFACE
/**
 * CommunityQA - Community Q&A page for HairFit Pro.
 * - Users can ask questions with tags.
 * - List of questions, each with tags, timestamp, upvote, collapsible replies, and reply input.
 * - Clean, modern on-brand styling, fully responsive, no backend.
 */
function CommunityQA() {
  // Initial mock questions (demo only!)
  const initialQuestions = [
    {
      id: 1,
      content: "What's the best routine for curly hair in humid summers?",
      tags: ["Curly", "Humidity", "Routine"],
      timestamp: Date.now() - 7200000,
      upvotes: 10,
      replies: [
        {
          id: 101,
          content: "Moisturize a lot, reduce heat tools, use gel with cast for hold.",
          timestamp: Date.now() - 7100000,
        },
        {
          id: 102,
          content: "Try leave-in conditioner and avoid sulfates. Pineapple your hair at night!",
          timestamp: Date.now() - 6900000,
        },
      ]
    },
    {
      id: 2,
      content: "Any tips for protecting colored hair from sun damage?",
      tags: ["Color", "Protection", "Summer"],
      timestamp: Date.now() - 560000,
      upvotes: 7,
      replies: [
        {
          id: 201,
          content: "Use UV spray, wear a hat, and wash with cool water. Deep condition weekly.",
          timestamp: Date.now() - 500000,
        }
      ]
    },
    {
      id: 3,
      content: "How to keep hair volumized without weighing it down?",
      tags: ["Volume", "Fine Hair"],
      timestamp: Date.now() - 1200000,
      upvotes: 4,
      replies: []
    }
  ];

  // State
  const [questions, setQuestions] = useState(initialQuestions);
  const [form, setForm] = useState({ content: "", tags: "" });
  const [formError, setFormError] = useState("");
  const [expanded, setExpanded] = useState({}); // { [qid]: true }
  const [replyInputs, setReplyInputs] = useState({}); // { [qid]: "" }

  // Helper: format timestamp
  function timeAgo(ts) {
    const diff = (Date.now() - ts) / 1000;
    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
    const d = new Date(ts);
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric" }) + " • " + d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
  }

  // Add Question
  function handleSubmit(e) {
    e.preventDefault();
    const content = form.content.trim();
    const tags = form.tags.split(",").map(t => t.trim()).filter(Boolean);
    if (!content) {
      setFormError("Question cannot be empty.");
      return;
    }
    if (tags.length === 0) {
      setFormError("Please add at least one tag.");
      return;
    }
    // Add new question at the top
    setQuestions([
      {
        id: Date.now() + Math.random(),
        content,
        tags,
        timestamp: Date.now(),
        upvotes: 0,
        replies: []
      },
      ...questions
    ]);
    setForm({ content: "", tags: "" });
    setFormError("");
  }

  // Upvote logic (per question, demo: allow 1 upvote per visiting user per session)
  function handleUpvote(qid) {
    setQuestions(qs =>
      qs.map(q =>
        q.id === qid ? { ...q, upvotes: q.upvotes + 1 } : q
      )
    );
  }

  // Expand/collapse replies
  function toggleReplies(qid) {
    setExpanded(exp => ({
      ...exp,
      [qid]: !exp[qid]
    }));
  }

  // Add reply to a question
  function handleReply(qid, e) {
    e.preventDefault();
    const reply = (replyInputs[qid] || "").trim();
    if (!reply) return;
    setQuestions(qs =>
      qs.map(q =>
        q.id === qid
          ? {
              ...q,
              replies: [
                ...q.replies,
                {
                  id: Date.now() + Math.random(),
                  content: reply,
                  timestamp: Date.now()
                }
              ]
            }
          : q
      )
    );
    setReplyInputs(prev => ({ ...prev, [qid]: "" }));
    setExpanded(prev => ({ ...prev, [qid]: true }));
  }

  // Brand colors (used inline for accents)
  const brand = {
    primary: "#4A90E2",
    secondary: "#50E3C2",
    accent: "#F5A623"
  };

  return (
    <div className="hfqa-bg">
      <div className="hfqa-hero-section">
        <h1 className="hfqa-title">HairFit Pro Community Q&amp;A</h1>
        <p className="hfqa-desc">Ask, answer, and connect with other HairFit users. Share your experience, get tips, and help build a great hair community!</p>
      </div>
      <div className="hfqa-container">
        <form className="hfqa-form" onSubmit={handleSubmit} autoComplete="off" aria-label="Ask a question">
          <textarea
            className="hfqa-form-question"
            value={form.content}
            onChange={e => setForm({ ...form, content: e.target.value })}
            placeholder="What's your question? (e.g. Best sulfate-free shampoos for curls?)"
            rows={2}
            maxLength={400}
            required
            aria-label="Question"
          />
          <div className="hfqa-form-tags-row">
            <input
              className="hfqa-form-tags"
              value={form.tags}
              onChange={e => setForm({ ...form, tags: e.target.value })}
              placeholder="Tags (comma separated, e.g. Curls, Volume)"
              required
              aria-label="Tags (comma separated)"
              maxLength={60}
            />
            <button className="hfqa-btn hfqa-btn-ask" type="submit">
              Ask
            </button>
          </div>
          {formError && <div className="hfqa-form-error">{formError}</div>}
        </form>

        <section className="hfqa-list-section">
          <h2 className="hfqa-list-title">Community Questions</h2>
          {questions.length === 0 ? (
            <div className="hfqa-empty">
              No questions yet. Ask the first one!
            </div>
          ) : (
            <ul className="hfqa-list">
              {questions.map(q => (
                <li className="hfqa-card" key={q.id}>
                  <div className="hfqa-question-row">
                    <div className="hfqa-question-text">{q.content}</div>
                  </div>
                  <div className="hfqa-meta-row">
                    <div className="hfqa-tags">
                      {q.tags.map(tag => (
                        <span className="hfqa-tag" key={tag}>{tag}</span>
                      ))}
                    </div>
                    <span className="hfqa-time">{timeAgo(q.timestamp)}</span>
                  </div>
                  <div className="hfqa-actions-row">
                    <button
                      className="hfqa-btn hfqa-upvote"
                      onClick={() => handleUpvote(q.id)}
                      aria-label={`Upvote this question, current upvotes: ${q.upvotes}`}
                      tabIndex={0}
                    >
                      ▲ {q.upvotes}
                    </button>
                    <button
                      className="hfqa-btn hfqa-toggle-replies"
                      onClick={() => toggleReplies(q.id)}
                      aria-expanded={!!expanded[q.id]}
                      aria-controls={`hfqa-replies-${q.id}`}
                    >
                      {q.replies.length > 0
                        ? expanded[q.id] ? "Hide Replies" : `Show Replies (${q.replies.length})`
                        : "Reply"}
                    </button>
                  </div>
                  {expanded[q.id] && (
                    <div className="hfqa-replies-section" id={`hfqa-replies-${q.id}`}>
                      <ul className="hfqa-replies-list">
                        {q.replies.length === 0 && (
                          <li className="hfqa-reply-empty">No replies yet. Be the first!</li>
                        )}
                        {q.replies.map(r => (
                          <li className="hfqa-reply" key={r.id}>
                            <span className="hfqa-reply-content">{r.content}</span>
                            <span className="hfqa-reply-time">{timeAgo(r.timestamp)}</span>
                          </li>
                        ))}
                      </ul>
                      <form
                        className="hfqa-reply-form"
                        onSubmit={e => handleReply(q.id, e)}
                        autoComplete="off"
                        aria-label="Add a reply"
                      >
                        <input
                          className="hfqa-reply-input"
                          value={replyInputs[q.id] || ""}
                          onChange={e => setReplyInputs({ ...replyInputs, [q.id]: e.target.value })}
                          placeholder="Write a reply…"
                          aria-label="Reply"
                          maxLength={280}
                        />
                        <button
                          className="hfqa-btn hfqa-reply-btn"
                          type="submit"
                          disabled={!(replyInputs[q.id] || "").trim()}
                        >Reply</button>
                      </form>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}

export default CommunityQA;
