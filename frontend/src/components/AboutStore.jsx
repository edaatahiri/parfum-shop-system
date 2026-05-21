import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AboutStore.css";

const AboutStore = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-store-wrapper">
      <div className="about-store-nav">
        <button onClick={() => navigate("/")} className="back-to-shop-btn">
          <i className="fas fa-arrow-left"></i>Back To Shop
        </button>
        <div className="about-store-logo">
          <h2>- Maison de Parfum</h2>
        </div>
      </div>

      <header className="about-store-hero">
        <div className="about-store-hero-overlay">
          <span className="about-hero-subtitle">OUR STORY</span>
          <h1 className="about-hero-title">The Art of Perfumery</h1>
          <p className="about-hero-desc">
            From a small passion to a luxury fragrance house. Discover our
            journey toward creating invisible sensory biographies.
          </p>
        </div>
      </header>

      <section className="about-history-section">
        <div className="about-history-container">
          <div className="about-history-text">
            <h3>How It All Began?</h3>
            <span className="gold-divider"></span>
            <p>
              Maison de Parfum was founded with a clear vision: to transform
              fragrances into a living art form. We believe that a perfume is
              never just a cosmetic product—it is an extension of your identity
              and a silent statement of elegance.
            </p>
            <p>
              Every single bottle in our boutique holds a story, a memory, and a
              carefully curated emotion. We collaborate with the world's finest
              perfumers to bring the rarest and highest quality ingredients
              directly to your skin.
            </p>
          </div>
          <div className="about-history-image">
            <img src="/images/perfume-main.avif" alt="Maison de Parfum Story" />
          </div>
        </div>
      </section>

      <section className="about-values-section">
        <div className="about-values-header">
          <span>OUR VALUES</span>
          <h2>What Makes Us Exceptional?</h2>
        </div>
        <div className="about-values-grid">
          <div className="value-card">
            <div className="value-icon">
              <i className="fas fa-gem"></i>
            </div>
            <h4>Premium Ingredients</h4>
            <p>
              We source only the purest essential oils and rarest natural
              extracts from around the world.
            </p>
          </div>

          <div className="value-card">
            <div className="value-icon">
              <i className="fas fa-hourglass-half"></i>
            </div>
            <h4>Long-Lasting Scents</h4>
            <p>
              Our formulas are masterfully engineered to linger on the skin and
              evolve beautifully throughout the day.
            </p>
          </div>

          <div className="value-card">
            <div className="value-icon">
              <i className="fas fa-leaf"></i>
            </div>
            <h4>Cruelty-Free & Vegan</h4>
            <p>
              None of our products are ever tested on animals, maintaining
              complete transparency in our process.
            </p>
          </div>
        </div>
      </section>

      <section className="about-cta-section">
        <div className="about-cta-content">
          <h2>Ready To Find Your Signature Scent?</h2>
          <p>
            Explore our complete boutique collection and begin your amazing
            journey.
          </p>
          <button
            className="about-cta-btn"
            onClick={() => navigate("/catalog")}
          >
            BROWSE THE CATALOG &rarr;
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutStore;
