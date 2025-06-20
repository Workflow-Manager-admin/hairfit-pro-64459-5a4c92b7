import React, { useState } from "react";
import "./AboutAndContact.css";

// PUBLIC_INTERFACE
/**
 * AboutAndContact - About Hairfit story & team, plus contact form
 * Simple, modern, friendly design; minimal validation.
 */
function AboutAndContact() {
  // State for contact form
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [touched, setTouched] = useState({});
  const [sent, setSent] = useState(false);

  // Minimal validation: all fields must be filled, email must look valid
  const validate = {
    name: form.name.trim().length > 1,
    email: /^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/.test(form.email),
    message: form.message.trim().length > 2,
  };

  const hasError = (field) =>
    touched[field] && !validate[field];

  // PUBLIC_INTERFACE
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }
  function handleBlur(e) {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (!validate.name || !validate.email || !validate.message) return;
    // For this demo: mark as sent
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 3500); // Hide success message after a bit
  }

  return (
    <div className="about-contact-bg">
      <div className="about-contact-container">
        {/* Section 1: About Hairfit */}
        <section className="ac-section ac-about">
          <h1 className="ac-title">About Hairfit</h1>
          <p className="ac-story">
            Hairfit was founded to help everyone find their healthiest, happiest hair.
            Our journey began in 2023 when a trio of friends—an award-winning stylist, a passionate developer, and a community builder—met in a salon queue and bonded over the challenges of good haircare.
          </p>
          <p className="ac-story">
            Today, our team is made up of real people with real hair stories, bringing together the best of science, technology, and a dose of self-love. We're here to lighten your haircare routine, decode the noise, and keep every day a "good hair day."
          </p>
          <div className="ac-team">
            <div className="ac-team-headline">Meet the team:</div>
            <div className="ac-team-members">
              <div className="ac-team-person">
                <span role="img" aria-label="Stylist" className="ac-avatar">💇‍♀️</span>
                <div>
                  <div className="ac-team-name">Nina B.</div>
                  <div className="ac-team-role">Lead Stylist</div>
                </div>
              </div>
              <div className="ac-team-person">
                <span role="img" aria-label="Developer" className="ac-avatar">💻</span>
                <div>
                  <div className="ac-team-name">Alex P.</div>
                  <div className="ac-team-role">Tech & Product</div>
                </div>
              </div>
              <div className="ac-team-person">
                <span role="img" aria-label="Community" className="ac-avatar">🌱</span>
                <div>
                  <div className="ac-team-name">Jae L.</div>
                  <div className="ac-team-role">Community Manager</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Contact Form */}
        <section className="ac-section ac-contact">
          <h2 className="ac-title">Contact Us</h2>
          <p className="ac-contact-desc">
            Questions, suggestions, or stories to share? We can’t wait to hear from you!
          </p>
          <form className="ac-form" onSubmit={handleSubmit} noValidate autoComplete="off">
            <div className="ac-form-row">
              <label htmlFor="ac-name" className="ac-label">Name</label>
              <input
                className={"ac-input" + (hasError("name") ? " ac-input-error" : "")}
                id="ac-name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Your name"
                maxLength={48}
                autoComplete="name"
              />
              {hasError("name") && (
                <div className="ac-err">Please enter your name.</div>
              )}
            </div>
            <div className="ac-form-row">
              <label htmlFor="ac-email" className="ac-label">Email</label>
              <input
                className={"ac-input" + (hasError("email") ? " ac-input-error" : "")}
                id="ac-email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="you@email.com"
                maxLength={64}
                autoComplete="email"
              />
              {hasError("email") && (
                <div className="ac-err">A valid email is required.</div>
              )}
            </div>
            <div className="ac-form-row">
              <label htmlFor="ac-message" className="ac-label">Message</label>
              <textarea
                className={"ac-input ac-textarea" + (hasError("message") ? " ac-input-error" : "")}
                id="ac-message"
                name="message"
                value={form.message}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Write your message…"
                maxLength={420}
                rows={4}
              />
              {hasError("message") && (
                <div className="ac-err">Please enter a message.</div>
              )}
            </div>
            <button
              className="ac-btn-send"
              type="submit"
              disabled={!(validate.name && validate.email && validate.message)}
            >
              Send
            </button>
            {sent && (
              <div className="ac-sent">Thank you! Your message has been sent. 💌</div>
            )}
          </form>
        </section>
      </div>
    </div>
  );
}

export default AboutAndContact;
