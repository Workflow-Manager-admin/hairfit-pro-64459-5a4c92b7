import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Blog.css";

// Mock post data (match Blog.js)
const blogPosts = [
  {
    id: "diy-heatless-curls",
    title: "DIY Heatless Curls That Last",
    summary: "Learn simple, damage-free methods to get gorgeous curls overnight without heat tools.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=800&h=400&facepad=3",
    tags: ["DIY", "Styling"],
    content: (
      <>
        <h3>Save Your Hair, Ditch the Iron</h3>
        <p>
          Learn the best overnight curling methods to create long-lasting waves without heat damage. From robe belts to braids, these methods respect your hair health.
        </p>
        <ul>
          <li><b>Robe Belt Wrap:</b> Roll damp hair around a robe belt and sleep for perfect waves with zero frizz.</li>
          <li><b>Braid & Sleep:</b> Create two or more braids while hair is 80% dry – softer braid for loose waves, tight for more definition.</li>
          <li><b>Headband Method:</b> Spiral sections around a soft headband and wake to salon-level curls.</li>
        </ul>
        <p>
          <i>Pro Tip:</i> Always use a setting spray or a touch of mousse for better hold. Wake up, shake out, and enjoy healthy, pretty curls!
        </p>
      </>
    ),
  },
  {
    id: "curly-hair-tips",
    title: "Top 5 Curly Hair Styling Tips",
    summary: "Master frizz, definition, and lasting curls with these stylist-backed recommendations.",
    image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=800&h=400&facepad=3",
    tags: ["Styling", "Curly"],
    content: (
      <>
        <ol>
          <li><b>Condition generously</b>: Curly hair loves moisture. Don’t rinse out all your conditioner.</li>
          <li><b>Detangle wet</b>: Use fingers or a wide-tooth comb while hair is soaked.</li>
          <li><b>Use a microfiber towel</b>: Pat, don’t rub, to avoid frizz.</li>
          <li><b>Diffuse/air dry</b>: Let your curls set; avoid touching as they dry.</li>
          <li><b>Scrunch out the crunch</b>: Once dry, gently squeeze with dry hands.</li>
        </ol>
      </>
    ),
  },
  // ...Add more as matching Blog.js data.
  {
    id: "quick-root-lift",
    title: "Quick Root-Lift Hacks for Volume",
    summary: "Upgrade your routine with fast volume boosters for limp or fine hair.",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=facearea&w=800&h=400&facepad=3",
    tags: ["Volume", "Styling"],
    content: (
      <>
        <ul>
          <li>Blow-dry upside down for mega-lift at the crown.</li>
          <li>Try a root-lift spray or dry shampoo—apply at the roots only.</li>
          <li>For natural volume, part your hair on the opposite side.</li>
        </ul>
      </>
    ),
  },
  {
    id: "summer-haircare",
    title: "Ultimate Summer Haircare Routine",
    summary: "Protect color and moisture from sun, salt, and humidity all summer long.",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=800&h=400&facepad=3",
    tags: ["Care", "Seasonal"],
    content: (
      <>
        <ul>
          <li>Use a UV hair spray before going outdoors.</li>
          <li>Rinse hair with fresh water after swimming in the sea or pool.</li>
          <li>Deep-condition weekly to restore lost moisture.</li>
        </ul>
      </>
    ),
  },
  {
    id: "scalp-detox",
    title: "Scalp Detox: Why & How (With Recipes)",
    summary: "Boost hair health from the roots with natural scalp detox methods.",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=800&h=400&facepad=3",
    tags: ["DIY", "Care"],
    content: (
      <>
        <p>
          A healthy scalp equals healthy hair. Try a salt scrub or apple cider vinegar rinse every 2 weeks to clarify and soothe.
        </p>
        <ul>
          <li><b>Salt Scrub:</b> Mix 2 tbsp sea salt with 1 tbsp olive oil and gently massage.</li>
          <li><b>ACV Rinse:</b> Dilute 1 part ACV to 3 parts water, pour on scalp, let sit 2-3 min, rinse.</li>
        </ul>
      </>
    ),
  },
  {
    id: "color-safe-essentials",
    title: "Color-Safe Routine Essentials",
    summary: "Keep your hair vibrant and healthy with this stylist-approved color-care kit.",
    image: "https://images.unsplash.com/photo-1521193639433-73a5e3de65aa?auto=format&fit=facearea&w=800&h=400&facepad=3",
    tags: ["Care", "Color"],
    content: (
      <>
        <ul>
          <li>Use only sulfate-free, color-safe shampoos.</li>
          <li>Wash with cool water to prevent fading.</li>
          <li>Protect hair with leave-in UV protectant before sun exposure.</li>
        </ul>
      </>
    ),
  }
];

// PUBLIC_INTERFACE
function BlogDetail() {
  const { id } = useParams();
  const post = blogPosts.find(blog => blog.id === id);
  const navigate = useNavigate();

  if (!post) {
    return (
      <div className="hf-blog-bg">
        <div className="hf-blog-hero">
          <h1 className="hf-blog-title">Blog Post Not Found</h1>
        </div>
        <div className="hf-blog-container">
          <button className="hf-blog-back-btn" onClick={() => navigate("/blog")}>
            ← Back to Blog
          </button>
          <div className="hf-blog-no-results">
            Sorry, we couldn't find that post.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="hf-blog-bg">
      <div className="hf-blog-hero">
        <h1 className="hf-blog-title">{post.title}</h1>
        <div className="hf-blog-card-tags" style={{marginTop: 12, marginBottom: -8}}>
          {post.tags.map(tag => (
            <span className="hf-blog-card-tag" key={tag}>{tag}</span>
          ))}
        </div>
      </div>
      <div className="hf-blog-container">
        <button className="hf-blog-back-btn" onClick={() => navigate("/blog")}>
          ← Back to Blog
        </button>
        <div className="hf-blog-detail-card">
          <img src={post.image} alt={post.title} className="hf-blog-detail-img"/>
          <div className="hf-blog-detail-content">
            <div className="hf-blog-card-summary" style={{fontWeight: 600, marginBottom: 16}}>{post.summary}</div>
            <div>{post.content}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogDetail;
