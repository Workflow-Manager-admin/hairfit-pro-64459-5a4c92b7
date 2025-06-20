import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./Blog.css";

// PUBLIC_INTERFACE
/**
 * Blog - HairFit Pro Blog page.
 * - Responsive grid of cards with image, title, summary, tags.
 * - Search bar, tag filter buttons.
 * - Click card navigates to detail page (dynamic route).
 */
function Blog() {
  // Mock blog data
  const posts = [
    {
      id: "diy-heatless-curls",
      title: "DIY Heatless Curls That Last",
      summary: "Learn simple, damage-free methods to get gorgeous curls overnight without heat tools.",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=400&h=300&facepad=3",
      tags: ["DIY", "Styling"],
    },
    {
      id: "curly-hair-tips",
      title: "Top 5 Curly Hair Styling Tips",
      summary: "Master frizz, definition, and lasting curls with these stylist-backed recommendations.",
      image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=400&h=300&facepad=3",
      tags: ["Styling", "Curly"],
    },
    {
      id: "quick-root-lift",
      title: "Quick Root-Lift Hacks for Volume",
      summary: "Upgrade your routine with fast volume boosters for limp or fine hair.",
      image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=facearea&w=400&h=300&facepad=3",
      tags: ["Volume", "Styling"],
    },
    {
      id: "summer-haircare",
      title: "Ultimate Summer Haircare Routine",
      summary: "Protect color and moisture from sun, salt, and humidity all summer long.",
      image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=400&h=300&facepad=3",
      tags: ["Care", "Seasonal"],
    },
    {
      id: "scalp-detox",
      title: "Scalp Detox: Why & How (With Recipes)",
      summary: "Boost hair health from the roots with natural scalp detox methods.",
      image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=400&h=300&facepad=3",
      tags: ["DIY", "Care"],
    },
    {
      id: "color-safe-essentials",
      title: "Color-Safe Routine Essentials",
      summary: "Keep your hair vibrant and healthy with this stylist-approved color-care kit.",
      image: "https://images.unsplash.com/photo-1521193639433-73a5e3de65aa?auto=format&fit=facearea&w=400&h=300&facepad=3",
      tags: ["Care", "Color"],
    }
  ];

  // Gather all unique tags
  const allTags = useMemo(
    () => Array.from(new Set(posts.flatMap(post => post.tags))),
    [posts]
  );

  // State for filtering/search
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("");

  const navigate = useNavigate();

  // Filter posts by search and activeTag
  const filteredPosts = posts.filter(post => {
    const matchesTag = !activeTag || post.tags.includes(activeTag);
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.summary.toLowerCase().includes(search.toLowerCase());
    return matchesTag && matchesSearch;
  });

  // Styling for focus (brand)
  const handleCardKeyDown = (e, id) => {
    if (e.key === "Enter" || e.key === " ") {
      navigate(`/blog/${id}`);
    }
  };

  return (
    <div className="hf-blog-bg">
      <div className="hf-blog-hero">
        <h1 className="hf-blog-title">HairFit Pro Blog</h1>
        <p className="hf-blog-desc">Modern haircare tips, tutorials, and inspiration by HairFit stylists.</p>
      </div>
      <div className="hf-blog-container">
        <div className="hf-blog-filters">
          <input
            className="hf-blog-search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search posts (e.g. curls, color)..."
            aria-label="Search blog posts"
          />
          <div className="hf-blog-tags-row">
            <button
              className={`hf-blog-tag-btn${activeTag === "" ? " active" : ""}`}
              onClick={() => setActiveTag("")}
              aria-pressed={activeTag === ""}
            >All</button>
            {allTags.map(tag => (
              <button
                key={tag}
                className={`hf-blog-tag-btn${activeTag === tag ? " active" : ""}`}
                onClick={() => setActiveTag(tag)}
                aria-pressed={activeTag === tag}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
        <div className="hf-blog-card-grid">
          {filteredPosts.length === 0 ? (
            <div className="hf-blog-no-results">
              No posts found. Try a different search or filter.
            </div>
          ) : (
            filteredPosts.map(post => (
              <div
                role="button"
                tabIndex={0}
                key={post.id}
                className="hf-blog-card"
                onClick={() => navigate(`/blog/${post.id}`)}
                onKeyDown={e => handleCardKeyDown(e, post.id)}
                aria-label={`Read post: ${post.title}`}
              >
                <div className="hf-blog-card-imgwrap">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="hf-blog-card-img"
                  />
                </div>
                <div className="hf-blog-card-body">
                  <div className="hf-blog-card-tags">
                    {post.tags.map(tag => (
                      <span className="hf-blog-card-tag" key={tag}>{tag}</span>
                    ))}
                  </div>
                  <h2 className="hf-blog-card-title">{post.title}</h2>
                  <p className="hf-blog-card-summary">{post.summary}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Blog;
