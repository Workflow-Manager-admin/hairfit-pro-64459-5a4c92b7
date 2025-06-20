import React, { useState, useRef } from "react";

/**
 * Journal
 * HairFit Pro - Modern, responsive page for daily journaling.
 * UI Only: No backend/upload, mock previous entries.
 *
 * Features:
 *  - Write daily notes
 *  - Select/upload a photo (UI only)
 *  - Rate the day (1-5 stars)
 *  - Display previous entries in card format
 */

// PUBLIC_INTERFACE
function Journal() {
  // Form state
  const [note, setNote] = useState("");
  const [stars, setStars] = useState(0);
  const [photo, setPhoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Mock previous entries (could come from backend)
  const [entries, setEntries] = useState([
    {
      date: "2024-06-09",
      note:
        "Tried a new leave-in conditioner – hair feels super soft! Slight frizz due to humidity.",
      stars: 4,
      photoUrl:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=128&h=128&facepad=2",
    },
    {
      date: "2024-06-08",
      note:
        "Good hair day! Volume on point after diffusing. Used only mousse.",
      stars: 5,
      photoUrl:
        "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=128&h=128&facepad=2",
    },
    {
      date: "2024-06-07",
      note:
        "Skipped wash day, a bit flat. Scalp feels normal though.",
      stars: 3,
      photoUrl: null,
    },
  ]);

  // For file input ref
  const fileInputRef = useRef();

  // Handlers
  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
      setPreviewUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleStar = (star) => {
    setStars(star);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!note.trim() || stars === 0) return;
    const today = new Date().toISOString().slice(0, 10);
    setEntries([
      {
        date: today,
        note: note.trim(),
        stars,
        photoUrl: previewUrl,
      },
      ...entries,
    ]);
    setNote("");
    setStars(0);
    setPhoto(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Styling (inline to match brand if user didn't provide CSS)
  const styles = {
    page: {
      minHeight: "100vh",
      background: "#f7fafc",
      paddingTop: 110,
      paddingBottom: 54,
      fontFamily: "'Inter','Roboto','Helvetica',sans-serif",
    },
    container: {
      maxWidth: 560,
      margin: "0 auto",
      padding: "0 18px",
    },
    card: {
      background: "#fff",
      borderRadius: 16,
      boxShadow: "0 1.5px 12px rgba(74,144,226,0.09)",
      padding: "28px 30px 23px 30px",
      marginBottom: 38,
      marginTop: 24,
      display: "flex",
      flexDirection: "column",
      gap: "17px",
    },
    heading: {
      color: "#4A90E2",
      fontWeight: 800,
      fontSize: "2.13rem",
      marginBottom: 12,
      marginTop: 6,
      textAlign: "center",
    },
    label: {
      color: "#413c32",
      fontWeight: 600,
      fontSize: "1.08rem",
      marginBottom: 5,
      display: "block",
    },
    textarea: {
      width: "100%",
      minHeight: 74,
      border: "1.5px solid #d4e7ff",
      borderRadius: 8,
      padding: "12px 14px",
      fontSize: "1.06rem",
      marginBottom: 13,
      background: "#f8fbfd",
      color: "#413c32",
      fontFamily: "inherit",
      resize: "vertical",
    },
    formRow: {
      display: "flex",
      alignItems: "center",
      gap: 16,
      marginBottom: 16,
      flexWrap: "wrap",
    },
    photoUpload: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: 8,
      flex: "1 1 110px",
    },
    imgPreview: {
      width: 72,
      height: 72,
      objectFit: "cover",
      borderRadius: 12,
      border: "2.5px solid #50E3C2",
      marginTop: 4,
      boxShadow: "0 2px 7px rgba(80,227,194,0.09)",
    },
    starRow: {
      display: "flex",
      alignItems: "center",
      gap: 5,
      marginTop: 6,
    },
    star: {
      fontSize: "2.1rem",
      color: "#e0e5ec",
      cursor: "pointer",
      transition: "color 0.18s",
      textShadow: "0 0.5px 2px #eee",
      lineHeight: "2.2rem",
    },
    starActive: {
      color: "#F5A623",
      textShadow: "0 0.5px 2px #fad38a",
      filter: "drop-shadow(0 2px 14px #fdeac7)",
    },
    button: {
      background: "linear-gradient(90deg, #4A90E2 80%, #50E3C2 100%)",
      color: "#fff",
      fontWeight: 700,
      borderRadius: 24,
      border: "none",
      fontSize: "1.09rem",
      padding: "12px 36px",
      cursor: "pointer",
      boxShadow: "0 2px 15px #50e3c22d",
      marginTop: 21,
      transition: "background 0.14s, box-shadow 0.14s",
    },
    buttonDisabled: {
      background: "#e4eefd",
      color: "#aaa",
      cursor: "not-allowed",
      boxShadow: "none",
    },
    entriesSection: {
      marginTop: 44,
      marginBottom: 32,
    },
    entryCard: {
      background: "#fff",
      borderRadius: 13,
      boxShadow: "0 0.5px 5px rgba(74,144,226,0.07)",
      display: "flex",
      gap: 15,
      alignItems: "flex-start",
      padding: "18px 18px 15px 18px",
      marginBottom: 17,
      borderLeft: "4.2px solid #50E3C2",
      position: "relative",
    },
    entryPhoto: {
      width: 58,
      height: 58,
      objectFit: "cover",
      borderRadius: "10px",
      border: "2.5px solid #4A90E2",
      marginTop: "2px",
      flexShrink: 0,
    },
    entryDetails: { flex: 1 },
    entryDate: {
      color: "#50E3C2",
      fontWeight: 600,
      fontSize: "0.99rem",
      marginBottom: 2,
    },
    entryNote: {
      fontSize: "1.04rem",
      color: "#302e2b",
      marginBottom: 4,
      whiteSpace: "pre-line",
    },
    entryStars: {
      display: "flex",
      gap: 2,
    },
    noEntries: {
      color: "#a6adb8",
      textAlign: "center",
      marginTop: 38,
      fontWeight: 500,
      fontSize: "1.07rem",
    },
    responsive: {
      // Included below as a style tag
    },
  };

  // PUBLIC_INTERFACE
  return (
    <div style={styles.page}>
      {/* Responsive layout for mobile */}
      <style>
        {`
        @media (max-width: 600px) {
          .hfj-journal-container {
            padding: 0 6vw !important;
          }
          .hfj-journal-card {
            padding: 16px 7vw 12px 7vw !important;
          }
          .hfj-journal-entry {
            flex-direction: column;
            gap: 10px !important;
            padding: 15px 6vw 11px 6vw !important;
          }
          .hfj-journal-entry-photo {
            width: 46px !important;
            height: 46px !important;
            border-radius: 9px !important;
          }
        }
        `}
      </style>
      <div className="hfj-journal-container" style={styles.container}>
        <div className="hfj-journal-card" style={styles.card}>
          <h1 style={styles.heading}>My Hair Journal</h1>
          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            aria-label="Add to hair journal"
          >
            <label style={styles.label} htmlFor="journal-note">
              Today’s Note
            </label>
            <textarea
              id="journal-note"
              style={styles.textarea}
              value={note}
              required
              placeholder="How did your hair feel today? Did you try anything new?"
              onChange={e => setNote(e.target.value)}
              maxLength={340}
            />

            <div style={styles.formRow}>
              <div style={styles.photoUpload}>
                <label style={styles.label}>
                  Photo (optional)
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    style={{
                      marginTop: "7px",
                      fontSize: ".95rem",
                      border: "none",
                      background: "none",
                    }}
                    onChange={handlePhotoChange}
                    aria-label="Upload photo (optional)"
                  />
                </label>
                {previewUrl && (
                  <img
                    src={previewUrl}
                    alt="Selected"
                    style={styles.imgPreview}
                  />
                )}
              </div>
              <div>
                <label style={styles.label}>Day’s Rating</label>
                <div style={styles.starRow}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <span
                      key={star}
                      style={{
                        ...styles.star,
                        ...(stars >= star ? styles.starActive : {}),
                      }}
                      role="button"
                      aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                      tabIndex={0}
                      onClick={() => handleStar(star)}
                      onKeyDown={e => {
                        if (e.key === "Enter" || e.key === " ") handleStar(star);
                      }}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <button
              type="submit"
              style={{
                ...styles.button,
                ...(note.trim() && stars ? {} : styles.buttonDisabled),
              }}
              disabled={!note.trim() || stars === 0}
            >
              Add to Journal
            </button>
          </form>
        </div>

        <section style={styles.entriesSection}>
          <h2
            style={{
              color: "#4A90E2",
              fontSize: "1.32rem",
              marginBottom: 14,
              fontWeight: 600,
              textAlign: "left",
              marginLeft: 5,
            }}
          >
            Previous Entries
          </h2>
          {entries.length === 0 ? (
            <div style={styles.noEntries}>No journal entries yet.</div>
          ) : (
            entries.map((entry, idx) => (
              <div
                key={entry.date + idx + (entry.note || "").slice(0, 11)}
                className="hfj-journal-entry"
                style={styles.entryCard}
              >
                {entry.photoUrl ? (
                  <img
                    className="hfj-journal-entry-photo"
                    style={styles.entryPhoto}
                    src={entry.photoUrl}
                    alt="Journal user thumbnail"
                  />
                ) : (
                  <div
                    className="hfj-journal-entry-photo"
                    style={{
                      ...styles.entryPhoto,
                      background:
                        "linear-gradient(90deg,#d8e9fa 70%,#f5a62318 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#a7b8ce",
                      fontWeight: 900,
                      fontSize: "1.8rem",
                    }}
                    aria-label="No photo"
                  >
                    <span role="img" aria-label="No Photo">
                      📷
                    </span>
                  </div>
                )}
                <div style={styles.entryDetails}>
                  <div style={styles.entryDate}>
                    {new Date(entry.date).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                  <div style={styles.entryNote}>{entry.note}</div>
                  <div style={styles.entryStars}>
                    {[1, 2, 3, 4, 5].map(star => (
                      <span
                        key={star}
                        style={{
                          ...styles.star,
                          fontSize: "1.22rem",
                          ...(entry.stars >= star ? styles.starActive : {}),
                          cursor: "default",
                        }}
                        aria-label={star <= entry.stars ? "Rated" : "Not rated"}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
}

export default Journal;
