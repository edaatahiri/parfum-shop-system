import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Shop.css";

const Catalog = () => {
  const [parfumet, setParfumet] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGender, setSelectedGender] = useState("All");
  const [maxPrice, setMaxPrice] = useState(250);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/parfumet")
      .then((res) => res.json())
      .then((data) => {
        setParfumet(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gabim gjatë marrjes së parfumeve:", err);
        setLoading(false);
      });
  }, []);

  const filteredParfumet = parfumet.filter((parfum) => {
    const matchesSearch =
      parfum.emri.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (parfum.pershkrimi &&
        parfum.pershkrimi.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesGender =
      selectedGender === "All" ||
      parfum.gjinia_target.toLowerCase() === selectedGender.toLowerCase();

    const matchesPrice = parfum.cmimi <= maxPrice;

    return matchesSearch && matchesGender && matchesPrice;
  });

 
  const getPerfumeImage = (emriParfumit) => {
    if (!emriParfumit) return "";
    
   
    let emriTeThjeshtuar = emriParfumit.toLowerCase()
      .replace(/\./g, "") // fshin pikat
      .replace(/\s+/g, "-"); // zëvendëson hapësirat me vizë
    
    
    if (emriTeThjeshtuar === "dior-savage") {
      emriTeThjeshtuar = "dior-sauvage";
    }

    return `/images/${emriTeThjeshtuar}.jpeg`;
  };
  return (
    <div className="homepage-wrapper">
      {/* Navbar */}
      <nav className="top-navbar">
        <div className="nav-logo">
          <Link to="/" style={{ textDecoration: "none", color: "#222" }}>
            <h1>PERFUME SHOP</h1>
          </Link>
        </div>
        <div className="nav-links">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/catalog" style={{ color: "#722f37", fontWeight: "bold" }}>Catalog</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </div>
      </nav>

      {/* Header */}
      <div className="catalog-header">
        <h2 className="catalog-title">The Fragrance Collection</h2>
        <p className="catalog-subtitle">Eksploroni aromat ekskluzive për stilin tuaj</p>
      </div>

      {/* Container kryesor */}
      <div className="catalog-container">
        
        {/* PANELI I FILTRAVE */}
        <aside className="filter-sidebar">
          <h3 className="filter-section-title">Filtrat</h3>

          <div className="filter-group">
            <label className="filter-label">Kërko aromën</label>
            <input
              type="text"
              placeholder="Psh. Chanel, Dior..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-group">
            <label className="filter-label">Koleksioni</label>
            {["All", "Meshkuj", "Femra", "Unisex"].map((gender) => (
              <label key={gender} className="radio-option">
                <input
                  type="radio"
                  name="gender"
                  checked={selectedGender === gender}
                  onChange={() => setSelectedGender(gender)}
                />
                <span>{gender}</span>
              </label>
            ))}
          </div>

          <div className="filter-group">
            <div className="price-display">
              <label className="filter-label">Çmimi Maksimal</label>
              <span style={{ color: "#722f37", fontWeight: "bold", fontFamily: "sans-serif" }}>
                {maxPrice} €
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="300"
              step="5"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="price-range-slider"
            />
          </div>

          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedGender("All");
              setMaxPrice(250);
            }}
            className="clear-filters-btn"
          >
            Pastro Filtrat
          </button>
        </aside>

        {/* REZULTATET E PARFUMEVE */}
        <main className="products-column">
          {loading ? (
            <div className="catalog-status-text">Duke ngarkuar koleksionin e parfumeve...</div>
          ) : filteredParfumet.length === 0 ? (
            <div className="catalog-status-text" style={{ fontSize: "1.2rem" }}>
              Nuk u gjet asnjë parfum që përputhet me këto kritere.
            </div>
          ) : (
            <div className="products-grid">
              {filteredParfumet.map((parfum) => (
                <div key={parfum.parfum_id} className="perfume-card">
                  
                  {/* Foto Box */}
                  <div className="card-image-wrapper">
                    <img 
                      src={getPerfumeImage(parfum.emri)} 
                      alt={parfum.emri}
                      onError={(e) => {
                        // Nëse nuk gjendet imazhi lokal, vendos një placeholder elegant
                        e.target.onerror = null; 
                        e.target.src = parfum.gjinia_target.toLowerCase() === "femra" 
                          ? "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500" 
                          : "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=500";
                      }}
                      style={{ width: "100%", height: "100%", objectFit: "contain" }}
                    />
                    <span className="card-gender-tag">{parfum.gjinia_target}</span>
                  </div>

                  <div className="card-content">
                    <div>
                      <h4 className="card-title">{parfum.emri}</h4>
                      <span className="card-volume">Volumi: {parfum.volumi_ml} ML</span>
                      {parfum.notat_ere && (
                        <p className="card-notes">Notat: {parfum.notat_ere}</p>
                      )}
                    </div>

                    <div className="card-footer">
                      <span className="card-price">{parfum.cmimi} €</span>
                      <button className="card-button">Shiko Detajet</button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </main>

      </div>
    </div>
  );
};

export default Catalog;
