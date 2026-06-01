import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import "./Catalog.css";

const Catalog = () => {
  const [parfumet, setParfumet] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGender, setSelectedGender] = useState(() => {
    return localStorage.getItem("kategoriaEzgjedhur") || "All";
  });
  const [maxPrice, setMaxPrice] = useState(250);
  const [loading, setLoading] = useState(true);
  const [selectedPerfume, setSelectedPerfume] = useState(null);

  const navigate = useNavigate(); 

  useEffect(() => {
    return () => {
      localStorage.removeItem("kategoriaEzgjedhur");
    };
  }, []);

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

    const selected = selectedGender.toLowerCase().trim();

    const matchesGender =
      selected === "all" ||
      parfum.gjinia_target.toLowerCase() === selectedGender.toLowerCase() ||
      (selectedGender.toLowerCase() === "femra" &&
        parfum.gjinia_target.toLowerCase() === "femer");

    const matchesPrice = parfum.cmimi <= maxPrice;

    return matchesSearch && matchesGender && matchesPrice;
  });

  const getPerfumeImage = (emriParfumit) => {
    if (!emriParfumit) return "";

    let emriTeThjeshtuar = emriParfumit
      .toLowerCase()
      .replace(/\./g, "") 
      .replace(/\s+/g, "-"); 

    if (emriTeThjeshtuar === "dior-savage") {
      emriTeThjeshtuar = "dior-sauvage";
    }

    return `/images/${emriTeThjeshtuar}.jpeg`;
  };

  return (
    <div className="homepage-wrapper">
      {/* Banner njoftimi Sticky */}
      <div className="sticky top-0 z-50 bg-amber-950 text-stone-100 text-center py-5 px-6 text-lg sm:text-xl font-semibold tracking-wide uppercase shadow-md w-full flex items-center justify-center gap-4">
        <span>
          ✨ Exclusive Weekend Offer: Use code{" "}
          <span className="underline font-bold text-amber-400">MAISON10</span>{" "}
          for 10% off
        </span>
        <span className="bg-amber-800 text-amber-200 px-3 py-1 rounded-md text-sm font-bold shadow-sm">
          Active
        </span>
      </div>

      {/* Butoni Kthehu - Klasat u izoluan që të mos prishin Navbar-in e faqes */}
      <div className="catalog-back-navbar">
        <button
          onClick={() => navigate("/")}
          className="catalog-back-btn"
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#a38144";
            e.target.style.transform = "scale(1.05)";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "#b89453";
            e.target.style.transform = "scale(1)";
          }}
        >
          ← Back to Home
        </button>
      </div>

      {/* Header */}
      <div className="catalog-header">
        <h2 className="catalog-title">The Fragrance Collection</h2>
        <p className="catalog-subtitle">
          Explore exclusive fragrances tailored to your style
        </p>
      </div>

      {/* Container kryesor */}
      <div className="catalog-container">
        {/* PANELI I FILTRAVE */}
        <aside className="filter-sidebar">
          <h3 className="filter-section-title">Filters</h3>

          <div className="filter-group">
            <label className="filter-label">Search Fragrance</label>
            <input
              type="text"
              placeholder="e.g. Chanel, Dior..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-group">
            <label className="filter-label">Collection</label>
            {["All", "Meshkuj", "Femra", "Unisex"].map((gender) => (
              <label key={gender} className="radio-option">
                <input
                  type="radio"
                  name="gender"
                  checked={selectedGender === gender}
                  onChange={() => setSelectedGender(gender)}
                />
                <span>
                  {gender === "Meshkuj" ? "Men" : gender === "Femra" ? "Women" : gender}
                </span>
              </label>
            ))}
          </div>

          <div className="filter-group">
            <div className="price-display">
              <label className="filter-label">Max Price</label>
              <span className="max-price-badge">{maxPrice} €</span>
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
            Clear Filters
          </button>
        </aside>

        {/* REZULTATET E PARFUMEVE */}
        <main className="products-column">
          {loading ? (
            <div className="catalog-status-text">
              Loading the fragrance collection...
            </div>
          ) : filteredParfumet.length === 0 ? (
            <div className="catalog-status-text" style={{ fontSize: "1.2rem" }}>
              No perfumes found matching these criteria.
            </div>
          ) : (
            <div className="products-grid">
              {filteredParfumet.map((parfum) => (
                <div key={parfum.parfum_id} className="perfume-card">
                  <div className="card-image-wrapper">
                    <img
                      src={getPerfumeImage(parfum.emri)}
                      alt={parfum.emri}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          parfum.gjinia_target.toLowerCase() === "femra"
                            ? "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500"
                            : "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=500";
                      }}
                      className="perfume-img-render"
                    />
                    <span className="card-gender-tag">
                      {parfum.gjinia_target.toLowerCase() === "meshkuj" ? "Men" : 
                       parfum.gjinia_target.toLowerCase() === "femra" || parfum.gjinia_target.toLowerCase() === "femer" ? "Women" : 
                       parfum.gjinia_target}
                    </span>
                  </div>

                  <div className="card-content">
                    <div>
                      <h4 className="card-title">{parfum.emri}</h4>
                      <span className="card-volume">
                        Volume: {parfum.volumi_ml} ML
                      </span>
                      {parfum.notat_ere && (
                        <p className="card-notes">Notes: {parfum.notat_ere}</p>
                      )}
                    </div>

                    <div className="card-footer">
                      <span className="card-price">{parfum.cmimi} €</span>
                      <button
                        className="card-button"
                        onClick={() => setSelectedPerfume(parfum)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        {/* POP-UP MODAL */}
        {selectedPerfume && (
          <div className="custom-modal-overlay modal-overlay-backdrop">
            <div className="perfume-glass-card modal-glass-container">
              <h3 className="modal-title-text">{selectedPerfume.emri}</h3>

              <p className="modal-desc-text">
                {selectedPerfume.pershkrimi ||
                  "This luxury fragrance brings an exceptional scent and long-lasting presence to your skin."}
              </p>

              <div className="modal-info-box">
                <p>
                  <strong>Notes:</strong> {selectedPerfume.notat_ere || "No notes available"}
                </p>
                <p>
                  <strong>Gender:</strong> {
                    selectedPerfume.gjinia_target.toLowerCase() === "meshkuj" ? "Men" : 
                    selectedPerfume.gjinia_target.toLowerCase() === "femra" || selectedPerfume.gjinia_target.toLowerCase() === "femer" ? "Women" : 
                    selectedPerfume.gjinia_target
                  }
                </p>
                <p>
                  <strong>Volume:</strong> {selectedPerfume.volumi_ml} ML
                </p>
                <p>
                  <strong>Stock:</strong>{" "}
                  {selectedPerfume.sasia_stok > 0 ? (
                    <span className="modal-stock-available">
                      In Stock ({selectedPerfume.sasia_stok} pcs)
                    </span>
                  ) : (
                    <span className="modal-stock-empty">Out of Stock</span>
                  )}
                </p>
              </div>

              <div className="card-footer modal-footer-box">
                <span className="card-price modal-price-text">
                  {selectedPerfume.cmimi} €
                </span>

                <div className="modal-action-gap">
                  <button
                    className="card-button modal-btn-cancel"
                    onClick={() => setSelectedPerfume(null)}
                  >
                    Cancel
                  </button>

                  <button
                    className="card-button modal-btn-submit"
                    disabled={selectedPerfume.sasia_stok === 0}
                    onClick={async () => {
                      try {
                        const token = localStorage.getItem("token");
                        const loggedInUser = JSON.parse(localStorage.getItem("user"));

                        if (!token || !loggedInUser) {
                          alert("You must be logged in to place an order!");
                          return;
                        }

                        const config = {
                          headers: { authorization: `Bearer ${token}` },
                        };

                        const shitjaData = {
                          data_shitjes: new Date(),
                          shuma_totale: parseFloat(selectedPerfume.cmimi),
                          zbritja: 0,
                          metoda_pageses: "Cash",
                        };

                        const shitjeRes = await axios.post(
                          "http://localhost:5000/api/shitjet",
                          shitjaData,
                          config
                        );

                        const eShtunaShitjeId = shitjeRes.data.shitjeId || shitjeRes.data.id;

                        const detajiData = {
                          parfumetId: selectedPerfume.parfum_id || selectedPerfume.id,
                          sasia: 1,
                          cmimi: parseFloat(selectedPerfume.cmimi),
                          shitjeld: eShtunaShitjeId,
                        };

                        await axios.post(
                          "http://localhost:5000/api/detajetShitjes",
                          detajiData,
                          config
                        );

                        alert(`Order for "${selectedPerfume.emri}" was placed successfully!`);
                        setSelectedPerfume(null);
                        window.location.reload();
                      } catch (err) {
                        console.error("Gabim gjatë realizimit të shitjes:", err);
                        alert("Something went wrong: " + (err.response?.data?.error || err.message));
                      }
                    }}
                    style={{
                      opacity: selectedPerfume.sasia_stok === 0 ? 0.5 : 1,
                    }}
                  >
                    {selectedPerfume.sasia_stok > 0 ? "Add to Cart" : "Out of Stock"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalog;