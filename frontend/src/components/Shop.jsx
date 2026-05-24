import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import API from "../axiosConfig";
import "./Shop.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Shop = () => {
  const [perfumes, setPerfumes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [wishlistItems, setWishlistItems] = useState([]);
  const [showWishlistBanner, setShowWishlistBanner] = useState(false);

  const navigate = useNavigate();
  const bannerTimeoutRef = useRef(null);

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

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleWishlistToggle = async (parfumId) => {
    if (!loggedInUser || !loggedInUser.id) {
      toast.warning(
        "You should be logged in to add products to your wishlist! 🔒",
      );
      return;
    }

    try {
      const response = await API.post("/wishlist/toggle", {
        user_id: parseInt(loggedInUser.id),
        parfum_id: parseInt(parfumId),
      });

      if (response.status === 200 || response.status === 201) {
        if (response.data.action === "added") {
          setWishlistItems((prev) => [...prev, parfumId]);

          setShowWishlistBanner(true);
          if (bannerTimeoutRef.current) clearTimeout(bannerTimeoutRef.current);
          bannerTimeoutRef.current = setTimeout(
            () => setShowWishlistBanner(false),
            5000,
          );
        } else if (response.data.action === "removed") {
          setWishlistItems((prev) => prev.filter((id) => id !== parfumId));
        }
      }
    } catch (error) {
      console.error("Gabim gjate ndryshimit te wishlist:", error);
    }
  };

  useEffect(() => {
    return () => {
      if (bannerTimeoutRef.current) clearTimeout(bannerTimeoutRef.current);
    };
  }, []);

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
        const res = await API.get("/parfumet");
        setPerfumes(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching shop products:", err);
        setLoading(false);
      }
    };
    fetchShopPerfumes();
  }, []);

  useEffect(() => {
    const fetchUserWishlist = async () => {
      if (loggedInUser?.id) {
        try {
          const res = await API.get(`/wishlist/${loggedInUser.id}`);

          if (Array.isArray(res.data)) {
            const ids = res.data.map((item) => item.parfum_id);
            setWishlistItems(ids);
          }
        } catch (err) {
          console.error("Gabim gjatë marrjes së wishlist:", err);
        }
      }
    };
    fetchUserWishlist();
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
          <a href="#twitter">
            <i className="fab fa-twitter"></i>
          </a>
        </div>
        <div
          className="nav-logo"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
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
                <Link
                  to="/profile"
                  className="auth-link user-profile-link"
                  style={{
                    textTransform: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    color: "#b89453",
                    fontWeight: "500",
                  }}
                  title="Take a look at your profile"
                >
                  <i className="fas fa-user-circle text-lg"></i>
                  Hi,{loggedInUser.email.split("@")[0]}
                </Link>
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
            <a href="#about-section">About Us</a>
          </li>
          <li>
            <a href="#bestsellers">Best Sellers</a>
          </li>
          <li>
            <a href="#new-scent">New Scent</a>
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
          <button
            className="hero-btn"
            onClick={() => scrollToSection("bestsellers")}
          >
            FIND YOUR SCENT &rarr;
          </button>
        </div>

        <div className="hero-perfume-display">
          <div className="signature-tag">
            <span>
              Meet Our <strong>Signature</strong> Scents
            </span>
            <small>FROM $59.99</small>
          </div>
        </div>
      </header>

      <section className="categories-section">
        <div
          className="category-card"
          onClick={() => {
            localStorage.setItem("kategoriaEzgjedhur", "Femra");
            navigate("/catalog");
          }}
          style={{ cursor: "pointer" }}
        >
          <div className="category-image img-women"></div>
          <span className="category-link">Women &rarr;</span>
        </div>

        <div
          className="category-card"
          onClick={() => {
            localStorage.setItem("kategoriaEzgjedhur", "Meshkuj");
            navigate("/catalog");
          }}
          style={{ cursor: "pointer" }}
        >
          <div className="category-image img-men"></div>
          <span className="category-link">Men &rarr;</span>
        </div>

        <div
          className="category-card"
          onClick={() => {
            localStorage.setItem("kategoriaEzgjedhur", "Unisex");
            navigate("/catalog");
          }}
          style={{ cursor: "pointer" }}
        >
          <div className="category-image img-unisex"></div>
          <span className="category-link">Unisex &rarr;</span>
        </div>

        <div
          className="category-card"
          onClick={() => {
            localStorage.setItem("kategoriaEzgjedhur", "All");
            navigate("/catalog");
          }}
          style={{ cursor: "pointer" }}
        >
          <div className="category-image img-new"></div>
          <span className="category-link">New &rarr;</span>
        </div>
      </section>

      <section id="about-section" className="about-luxury-section">
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
            {loading ? (
              <p style={{ color: "#b89453", fontStyle: "italic" }}>
                Loading the perfumes...
              </p>
            ) : (
              perfumes.slice(0, 5).map((p) => (
                <div key={p.parfum_id} className="perfume-card-luxury">
                  <div className="perfume-image-wrapper">
                    {p.sasia_stok < 5 && (
                      <span className="badge-limited">Limited</span>
                    )}
                    <button
                      className="wishlist-btn-luxury"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleWishlistToggle(p.parfum_id);
                      }}
                      title="Add to your wishlist"
                    >
                      <i
                        className={
                          wishlistItems.includes(p.parfum_id)
                            ? "fas fa-heart"
                            : "far fa-heart"
                        }
                      ></i>
                    </button>
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
              ))
            )}
          </div>
          <button className="slider-arrow arrow-right">
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>

        <div className="bestsellers-action-wrapper">
          <button
            className="bestsellers-see-more-btn"
            onClick={() => navigate("/catalog")}
          >
            SEE ALL PERFUMES <span className="arrow-icon">&rarr;</span>
          </button>
        </div>
      </section>

      <section id="new-scent" className="new-scent-luxury-section">
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
      <footer className="main-footer-luxury">
        <div className="footer-content-luxury">
          <div className="footer-column-luxury brand-info">
            <h3>- Maison de Parfum</h3>
            <p>
              Invisible sensory biographies, crafted to become an extension of
              your unique identity and a silent statement of timeless elegance.
            </p>
          </div>

          <div className="footer-column-luxury quick-links">
            <h5>Discover</h5>
            <ul>
              <li>
                <a href="#about">About Us</a>
              </li>
              <li>
                <a href="#bestsellers">Best Sellers</a>
              </li>
              <li>
                <Link to="/catalog">The Catalog</Link>
              </li>
            </ul>
          </div>

          <div className="footer-column-luxury contact-info">
            <h5>Boutique</h5>
            <p>
              <i className="fas fa-map-marker-alt"></i> Prishtina, Kosova
            </p>
            <p>
              <i className="fas fa-envelope"></i> info@maisondeparfum.net
            </p>
            <p>
              <i className="fas fa-phone"></i> +383 49 123 456
            </p>
          </div>
        </div>

        <div className="footer-bottom-luxury">
          <p>
            &copy; {new Date().getFullYear()} Maison de Parfum. All Rights
            Reserved.
          </p>
          <div className="footer-bottom-socials">
            <a href="#facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#youtube">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </footer>
      {showWishlistBanner && (
        <div className="wishlist-popup-banner">
          <div className="banner-content">
            <p>Product successfully added to your favorite list!</p>
            <button
              className="banner-btn"
              onClick={() => navigate("/wishlist")}
            >
              VIEW WISHLIST &rarr;
            </button>
            <button
              className="banner-close"
              onClick={() => setShowWishlistBanner(false)}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
