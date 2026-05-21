import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Shop.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Shop = () => {
  const [perfumes, setPerfumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  const isAdmin =
    (loggedInUser &&
      loggedInUser.role &&
      loggedInUser.role.toString().toLowerCase() === "admin") ||
    (loggedInUser && loggedInUser.email === "et72862@ubt-uni.net") ||
    (loggedInUser && loggedInUser.email === "rozafe.shkodra@gmail.com");
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  useEffect(() => {
    const fetchShopPerfumes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/parfumet");
        setPerfumes(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching shop products:", err);
        setLoading(false);
      }
    };
    fetchShopPerfumes();
  }, []);

  return (
    <div className="homepage-wrapper">
      <div className="top-navbar">
        <div className="nav-socials">
          <a href="#facebook">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#instagram">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#youtube">
            <i className="fab fa-youtube"></i>
          </a>
        </div>
        <div className="nav-logo">
          <h1>- Maison de Parfum</h1>
        </div>
        <div className="nav-contact">
          <div className="nav-auth-links">
            {isAdmin && (
              <button
                onClick={() => navigate("/admin")}
                className="auth-link"
                style={{
                  background: "#b89453",
                  color: "white",
                  border: "none",
                  padding: "5px 12px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  marginRight: "15px",
                  fontWeight: "bold",
                }}
              >
                ⚙️ Dashboard
              </button>
            )}

            {loggedInUser ? (
              <>
                <span
                  className="auth-link"
                  style={{ cursor: "default", textTransform: "none" }}
                >
                  Hi, {loggedInUser.email.split("@")[0]}{" "}
                  {/* Shfaq vetëm emrin para @ */}
                </span>
                <span className="auth-divider"></span>
                <a href="#logout" onClick={handleLogout} className="auth-link">
                  Logout
                </a>
              </>
            ) : (
              <>
                <a
                  href="/login"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/login");
                  }}
                  className="auth-link"
                >
                  Login
                </a>
                <span className="auth-divider"></span>
                <a href="#register" className="auth-link">
                  Register
                </a>
              </>
            )}
          </div>
          <div className="nav-icons">
            <i className="fas fa-shopping-bag"></i>
          </div>
        </div>
      </div>

      <nav className="main-menu">
        <ul>
          <li>
            <a href="#about">About Us</a>
          </li>
          <li>
            <a href="#bestsellers">Best Sellers</a>
          </li>
          <li>
            <Link to="/new-scent">New Scent</Link>
          </li>
          <li>
            <Link to="/catalog">Catalog</Link>
          </li>
          <li>
            <Link to="/faq">FAQ</Link>
          </li>
          <li>
            <Link to="/testimonials">Testimonials</Link>
          </li>
        </ul>
      </nav>

      <header className="hero-section">
        <div className="hero-content">
          <span className="hero-subtitle">- PERFUMES WITH SOUL -</span>
          <h2 className="hero-title">
            Scents That <br />
            Tell <span>Your Story</span>
          </h2>
          <p className="hero-description">
            More than fragrance - each bottle hold a memory, a moment, <br />a
            mood waiting to unfold on your skin.
          </p>
          <button className="hero-btn">FIND YOUR SCENT &rarr;</button>
        </div>

        <div className="hero-perfume-display">
          <div className="signature-tag">
            <span>
              Meet Our <strong>Signature</strong> Scents
            </span>
            <small>FROM $29.99</small>
          </div>
        </div>
      </header>

      <section className="categories-section">
        <div className="category-card">
          <div className="category-image img-women"></div>
          <a href="#women" className="category-link">
            Women &rarr;
          </a>
        </div>

        <div className="category-card">
          <div className="category-image img-men"></div>
          <a href="#men" className="category-link">
            Men &rarr;
          </a>
        </div>

        <div className="category-card">
          <div className="category-image img-unisex"></div>
          <a href="#unisex" className="category-link">
            Unisex &rarr;
          </a>
        </div>

        <div className="category-card">
          <div className="category-image img-new"></div>
          <a href="#new" className="category-link">
            New &rarr;
          </a>
        </div>
      </section>

      <section className="about-luxury-section">
        <div className="about-luxury-container">
          <div className="about-text-column">
            <span className="about-subtitle">ABOUT US</span>
            <h2 className="about-main-title">
              We live to <br />
              discover the <br />
              exceptional
            </h2>
            <p className="about-description">
              We believe that a perfume is more than just a fragrance—it is an
              invisible sensory biography, an extension of your identity, and a
              silent statement of elegance. Our curated collection brings
              together the finest ingredients from around the world to create
              deeply personal and unforgettable olfactory journeys.
            </p>
          </div>

          <div className="about-image-column">
            <div className="about-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=600"
                alt="Luxury Perfume"
                className="about-luxury-img"
              />
            </div>

            <div className="about-section-wrapper">
              <button
                className="about-see-more-btn"
                onClick={() => navigate("/about")}
              >
                LEARN MORE <span className="arrow-icon">&rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="bestsellers" className="bestsellers-section">
        <div className="section-header-luxury">
          <span className="luxury-subtitle">- BEST SELLERS -</span>
          <h2 className="luxury-title">
            Our <span>Most-Loved</span> Fragrances
          </h2>
          <p className="luxury-instruction">
            Click on the image to see product details and click Buy to add a
            product to cart.
          </p>
        </div>

        <div className="slider-container-luxury">
          <button className="slider-arrow arrow-left">
            <i className="fas fa-chevron-left"></i>
          </button>

          <div className="perfume-grid-luxury">
            {perfumes.slice(0, 5).map((p) => (
              <div key={p.parfum_id} className="perfume-card-luxury">
                <div className="perfume-image-wrapper">
                  {p.sasia_stok < 5 && (
                    <span className="badge-limited">Limited</span>
                  )}
                  <div className="perfume-img-box">
                    <img
                      src={`/images/${p.emri.toLowerCase().trim().replace(/\s+/g, "-")}.jpeg`}
                      alt={p.emri}
                      className="bestsellers-dynamic-img"
                      onError={(e) => {
                        e.target.style.display = "none";
                        if (e.target.nextSibling) {
                          e.target.nextSibling.style.display = "block";
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="perfume-meta-luxury">
                  <h3 className="perfume-title-luxury">
                    {p.emri.toUpperCase()}
                  </h3>
                  <p className="perfume-price-luxury">{p.cmimi}$</p>
                  <button className="buy-now-btn">Buy Now</button>
                </div>
              </div>
            ))}
          </div>
          <button className="slider-arrow arrow-right">
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </section>

      <section id="new" className="new-scent-luxury-section">
        <div className="section-header-luxury">
          <span className="luxury-subtitle">- NEW SCENT -</span>
          <h2 className="luxury-title">
            Layers of <span>Scent</span> "Unfolding Like a Story"
          </h2>
          <p className="luxury-instruction">
            Every fragrance begins with a spark - a moment, a memory, a whisper
            of emotion.
          </p>
        </div>

        <div className="scent-story-container">
          <div className="scent-notes-column column-left">
            <div className="note-item">
              <span className="note-number">1ST NOTE</span>
              <h4 className="note-name">Lavender</h4>
              <p className="note-desc">
                Fresh, bold and distinctively aromatic.
              </p>
            </div>
            <div className="note-item">
              <span className="note-number">2ND NOTE</span>
              <h4 className="note-name">Mandarin Orange</h4>
              <p className="note-desc">Juicy, bright and full of energy.</p>
            </div>
            <div className="note-item">
              <span className="note-number">3RD NOTE</span>
              <h4 className="note-name">Black Currant</h4>
              <p className="note-desc">
                Deep, sweet and slightly tangy fruitiness.
              </p>
            </div>
          </div>

          <div className="scent-center-display">
            <div className="spotlight-perfume-img">
              <img
                src="\images\photo-1723391962110-299d412ca046.avif"
                alt="YSL Libre New Scent"
                className="spotlight-perfume-img"
              />
            </div>
          </div>

          <div className="scent-notes-column column-right">
            <div className="note-item">
              <span className="note-number">4TH NOTE</span>
              <h4 className="note-name">Jasmine</h4>
              <p className="note-desc">
                Sensual, elegant and timeless floral heart.
              </p>
            </div>
            <div className="note-item">
              <span className="note-number">5TH NOTE</span>
              <h4 className="note-name">Madagascar Vanilla</h4>
              <p className="note-desc">Warm, rich and incredibly addictive.</p>
            </div>
            <div className="note-item">
              <span className="note-number">6TH NOTE</span>
              <h4 className="note-name">Ambergris</h4>
              <p className="note-desc">
                Mineral, warm and unforgettable base note.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shop;
