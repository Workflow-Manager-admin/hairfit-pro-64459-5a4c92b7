import React from "react";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";

// PUBLIC_INTERFACE
function Homepage() {
  const navigate = useNavigate();

  // Simple data for trending routines (placeholder)
  const routines = [
    { name: "Moisture Boost", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=256&h=256&facepad=3" },
    { name: "Curly Care", img: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=256&h=256&facepad=3" },
    { name: "Volume Builder", img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=facearea&w=256&h=256&facepad=3" },
    { name: "Sleek & Straight", img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=256&h=256&facepad=3" },
    { name: "Damage Repair", img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=256&h=256&facepad=3" },
  ];

  // Simple sample review data
  const reviews = [
    {
      name: "Emma",
      text: "Hairfit changed my hair routine! My curls have NEVER been healthier.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Alex",
      text: "Love the trending routines—perfect suggestions every time.",
      avatar: "https://randomuser.me/api/portraits/men/35.jpg",
    },
    {
      name: "Taylor",
      text: "Easy to use & stylish. Hairfit made finding my hair type fun.",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      name: "Jordan",
      text: "The customer reviews convinced me. Happy customer here!",
      avatar: "https://randomuser.me/api/portraits/men/21.jpg",
    }
  ];

  // Slider state
  const [reviewIndex, setReviewIndex] = React.useState(0);

  const goToNextReview = () =>
    setReviewIndex((prev) => (prev + 1) % reviews.length);
  const goToPrevReview = () =>
    setReviewIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

  return (
    <div className="hf-home-bg">
      <header className="hf-home-hero">
        <h1 className="hf-title">Your Hair. Your Routine. Perfected.</h1>
        <button
          className="hf-primary-btn"
          onClick={() => navigate("/profile")}
        >
          Find Your Hair Type
        </button>
      </header>

      <section className="hf-section">
        <h2 className="hf-section-title">Trending Routines</h2>
        <div className="hf-trending-scroll">
          {routines.map((routine, idx) => (
            <div className="hf-routine-card" key={idx}>
              <img
                src={routine.img}
                alt={routine.name}
                className="hf-routine-img"
              />
              <span className="hf-routine-name">{routine.name}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="hf-section">
        <h2 className="hf-section-title">What Our Customers Say</h2>
        <div className="hf-reviews-slider">
          <button
            className="hf-slider-btn"
            onClick={goToPrevReview}
            aria-label="Previous Review"
          >
            &#8592;
          </button>
          <div className="hf-review-card">
            <img
              className="hf-review-avatar"
              src={reviews[reviewIndex].avatar}
              alt={reviews[reviewIndex].name}
            />
            <p className="hf-review-text">"{reviews[reviewIndex].text}"</p>
            <span className="hf-review-name">– {reviews[reviewIndex].name}</span>
          </div>
          <button
            className="hf-slider-btn"
            onClick={goToNextReview}
            aria-label="Next Review"
          >
            &#8594;
          </button>
        </div>
        <div className="hf-slider-dots">
          {reviews.map((_, idx) => (
            <span
              key={idx}
              className={
                "hf-slider-dot" + (idx === reviewIndex ? " active" : "")
              }
              onClick={() => setReviewIndex(idx)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Homepage;
