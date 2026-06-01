import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Shtohet për të bërë funksional kthimin prapa
import "./Shop.css";

const Catalog = () => {
  const [parfumet, setParfumet] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGender, setSelectedGender] = useState(() => {
    return localStorage.getItem("kategoriaEzgjedhur") || "All";
  });
  const [maxPrice, setMaxPrice] = useState(250);
  const [loading, setLoading] = useState(true);
  const [selectedPerfume, setSelectedPerfume] = useState(null);

  const navigate = useNavigate(); // Hook-u për navigim

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

    const parfumGender = (parfum.gjinia_target || "").toLowerCase().trim();
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
      .replace(/\./g, "") // fshin pikat
      .replace(/\s+/g, "-"); // zëvendëson hapësirat me vizë

    if (emriTeThjeshtuar === "dior-savage") {
      emriTeThjeshtuar = "dior-sauvage";
    }

    return `/images/${emriTeThjeshtuar}.jpeg`;
  };

  return (
    <div className="homepage-wrapper">
      {/* SHTIMI ME TAILWIND: Banner njoftimi që qëndron i fiksuar (sticky) gjatë scroll-it */}
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

      {/* Navbar i ri i pastruar: Vetëm butoni i kthimit majtas si te FAQ */}
      <nav
        className="top-navbar"
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          padding: "20px 30px",
        }}
      >
        <div>
          <button
            onClick={() => navigate("/")}
            style={{
              backgroundColor: "#b89453",
              color: "#000",
              border: "none",
              padding: "10px 22px",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "0.95rem",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#a38144")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#b89453")}
          >
            ← Kthehu në Ballinë
          </button>
        </div>
      </nav>

      {/* Header */}
      <div className="catalog-header">
        <h2 className="catalog-title">The Fragrance Collection</h2>
        <p className="catalog-subtitle">
          Eksploroni aromat ekskluzive për stilin tuaj
        </p>
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
              <span
                style={{
                  color: "#722f37",
                  fontWeight: "bold",
                  fontFamily: "sans-serif",
                }}
              >
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
            <div className="catalog-status-text">
              Duke ngarkuar koleksionin e parfumeve...
            </div>
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
                        e.target.onerror = null;
                        e.target.src =
                          parfum.gjinia_target.toLowerCase() === "femra"
                            ? "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500"
                            : "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=500";
                      }}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                    <span className="card-gender-tag">
                      {parfum.gjinia_target}
                    </span>
                  </div>

                  <div className="card-content">
                    <div>
                      <h4 className="card-title">{parfum.emri}</h4>
                      <span className="card-volume">
                        Volumi: {parfum.volumi_ml} ML
                      </span>
                      {parfum.notat_ere && (
                        <p className="card-notes">Notat: {parfum.notat_ere}</p>
                      )}
                    </div>

                    <div className="card-footer">
                      <span className="card-price">{parfum.cmimi} €</span>
                      <button
                        className="card-button"
                        onClick={() => setSelectedPerfume(parfum)}
                      >
                        Shiko Detajet
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        {/* POP-UP MODAL PËR DETAJET E PARFUMIT */}
        {selectedPerfume && (
          <div
            className="custom-modal-overlay"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
              backdropFilter: "blur(8px)",
            }}
          >
            <div
              className="perfume-glass-card"
              style={{
                maxWidth: "500px",
                width: "90%",
                padding: "25px",
                position: "relative",
                animation: "fadeIn 0.3s ease",
              }}
            >
              <h3
                style={{
                  color: "#fff",
                  marginBottom: "15px",
                  fontSize: "1.8rem",
                }}
              >
                {selectedPerfume.emri}
              </h3>

              <p
                style={{
                  color: "#ddd",
                  fontSize: "0.95rem",
                  lineHeight: "1.5",
                  marginBottom: "15px",
                }}
              >
                {selectedPerfume.pershkrimi ||
                  "Ky parfum luksoz sjell një aromë të jashtëzakonshme dhe jetëgjatësi në lëkurën tuaj."}
              </p>

              <div
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.1)",
                  paddingTop: "15px",
                  color: "#fff",
                  marginBottom: "20px",
                }}
              >
                <p>
                  <strong>Notat:</strong>{" "}
                  {selectedPerfume.notat_ere || "Nuk ka shënime"}
                </p>
                <p>
                  <strong>Gjinia:</strong> {selectedPerfume.gjinia_target}
                </p>
                <p>
                  <strong>Volumi:</strong> {selectedPerfume.volumi_ml} ML
                </p>
                <p>
                  <strong>Stoku:</strong>{" "}
                  {selectedPerfume.sasia_stok > 0 ? (
                    <span style={{ color: "#4BB543" }}>
                      Në Stok ({selectedPerfume.sasia_stok} copë)
                    </span>
                  ) : (
                    <span style={{ color: "#ff4d4d" }}>I Shitur (Pa stok)</span>
                  )}
                </p>
              </div>

              <div
                className="card-footer"
                style={{
                  paddingTop: "15px",
                  borderTop: "1px solid rgba(255,255,255,0.1)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span className="card-price" style={{ fontSize: "1.6rem" }}>
                  {selectedPerfume.cmimi} €
                </span>

                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    className="card-button"
                    onClick={() => setSelectedPerfume(null)}
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      color: "#fff",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      padding: "8px 15px",
                    }}
                  >
                    Anulo
                  </button>

                  <button
                    className="card-button"
                    disabled={selectedPerfume.sasia_stok === 0}
                    onClick={async () => {
                      try {
                        const token = localStorage.getItem("token");
                        const loggedInUser = JSON.parse(
                          localStorage.getItem("user"),
                        );

                        if (!token || !loggedInUser) {
                          alert(
                            "Duhet të jeni të kyçur (Login) që të bëni porosi!",
                          );
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
                          config,
                        );

                        const eShtunaShitjeId =
                          shitjeRes.data.shitjeId || shitjeRes.data.id;

                        const detajiData = {
                          parfumetId:
                            selectedPerfume.parfum_id || selectedPerfume.id,
                          sasia: 1,
                          cmimi: parseFloat(selectedPerfume.cmimi),
                          shitjeld: eShtunaShitjeId,
                        };

                        await axios.post(
                          "http://localhost:5000/api/detajetShitjes",
                          detajiData,
                          config,
                        );

                        alert(
                          `Porosia për "${selectedPerfume.emri}" u realizua me sukses!`,
                        );
                        setSelectedPerfume(null);

                        window.location.reload();
                      } catch (err) {
                        console.error(
                          "Gabim gjatë realizimit të shitjes:",
                          err,
                        );
                        alert(
                          "Diçka shkoi keq: " +
                            (err.response?.data?.error || err.message),
                        );
                      }
                    }}
                    style={{
                      opacity: selectedPerfume.sasia_stok === 0 ? 0.5 : 1,
                      padding: "8px 15px",
                    }}
                  >
                    {selectedPerfume.sasia_stok > 0
                      ? "Shto në Shportë"
                      : "Pa Stok"}
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
