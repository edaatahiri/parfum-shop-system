import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Shop.css";

const Shop = () => {
  const [perfumes, setPerfumes] = useState([]);
  const [loading, setLoading] = useState(true);

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
          <div className="nav-icons">
            <i className="far fa-user"></i>
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
            <a href="#philosophy">Our Philosophy</a>
          </li>
          <li>
            <a href="#bestsellers">Best Sellers</a>
          </li>
          <li>
            <a href="#new">New Scent</a>
          </li>
          <li>
            <a href="#catalog">Catalog</a>
          </li>
          <li>
            <a href="#faq">FAQ</a>
          </li>
          <li>
            <a href="#testimonals">Testimonals</a>
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
    </div>
  );
};

export default Shop;
