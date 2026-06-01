import React, { useState, useEffect } from "react";
import API from "../axiosConfig";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "./Wishlist.css";

function Wishlist() {
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser =
      localStorage.getItem("user") ||
      localStorage.getItem("loggedInUser") ||
      sessionStorage.getItem("user") ||
      sessionStorage.getItem("loggedInUser");

    if (savedUser) {
      try {
        setLoggedInUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Gabim gjatë parse të user:", e);
      }
    }
  }, []);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!loggedInUser || !loggedInUser.id) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const response = await API.get(`/wishlist/${loggedInUser.id}`);
        setWishlistProducts(response.data);
      } catch (error) {
        console.error("Gabim gjate marrjes se wishlist:", error);
        toast.error("Nuk u mundesua ngarkimi i wishlist-es.");
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, [loggedInUser]);

  const handleRemove = async (parfumId) => {
    if (!loggedInUser) return;
    try {
      const response = await API.post("/wishlist/toggle", {
        user_id: parseInt(loggedInUser.id),
        parfum_id: parseInt(parfumId),
      });

      if (response.data.action === "removed") {
        setWishlistProducts((prev) =>
          prev.filter((item) => item.parfum_id !== parfumId),
        );
        toast.info("U hoq nga wishlist!");
      }
    } catch (error) {
      console.error("Gabim gjatë heqjes:", error);
      toast.error("Diçka shkoi keq gjatë heqjes.");
    }
  };

  if (loading) {
    return (
      <div className="wishlist-loading-screen">
        <div className="luxury-spinner"></div>
        <p>Unfolding your wishlist...</p>
      </div>
    );
  }

  if (!loggedInUser && !loading) {
    return (
      <div className="wishlist-auth-error">
        <div className="error-card-luxury">
          <span>🔒</span>
          <h2>Exclusive Access Only</h2>
          <p>
            Please log in to view and curate your personal collection of
            favorite scents.
          </p>
          <Link to="/login" className="luxury-btn-primary">
            SIGN IN HERE
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="luxury-wishlist-wrapper">
      <div className="wishlist-back-nav">
        <button onClick={() => navigate("/")} className="btn-back-to-shop">
          <span>←</span> BACK TO SHOP
        </button>
      </div>

      <div className="wishlist-editorial-header">
        <span className="wishlist-subtitle">- YOUR CURATED COLLECTION -</span>
        <h1 className="wishlist-main-title">YOUR Wishlist</h1>
        <div className="gold-divider"></div>
        <p className="wishlist-instruction-text">
          Review your selected signature scents. Add them to your bag or manage
          your choices.
        </p>
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="wishlist-empty-state">
          <div className="empty-icon-box">🖤</div>
          <h3>Your collection is empty</h3>
          <p>
            Explore Maison de Parfum and save the scents that speak to your
            soul.
          </p>
          <button onClick={() => navigate("/")} className="luxury-btn-outline">
            DISCOVER FRAGRANCES &rarr;
          </button>
        </div>
      ) : (
        <>
          <div className="luxury-wishlist-grid">
            {wishlistProducts.map((item) => {
              const emriParfumit = item.parfumi?.emri || "Perfume";
              const qmimiParfumit = item.parfumi?.cmimi || "0";
              const gjinia = item.parfumi?.gjinia_target || "Unisex";

              return (
                <div key={item.wishlist_id} className="luxury-wishlist-card">
                  <button
                    onClick={() => handleRemove(item.parfum_id)}
                    className="luxury-card-remove-btn"
                    title="Remove from wishlist"
                  >
                    ×
                  </button>

                  <div className="luxury-card-img-container">
                    <span className="luxury-gender-badge">{gjinia}</span>
                    <img
                      src={`/images/${emriParfumit.toLowerCase().trim().replace(/\s+/g, "-")}.jpeg`}
                      alt={emriParfumit}
                      className="luxury-card-img"
                      onError={(e) => {
                        e.target.src =
                          "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=400";
                      }}
                    />
                  </div>

                  <div className="luxury-card-info">
                    <h3 className="luxury-card-name">
                      {emriParfumit.toUpperCase()}
                    </h3>
                    <p className="luxury-card-price">${qmimiParfumit}</p>

                    <div className="luxury-card-actions">
                      <button className="luxury-btn-buy">ADD TO BAG</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="wishlist-bottom-actions">
            <button
              onClick={() => navigate("/catalog")}
              className="luxury-btn-outline"
            >
              CONTINUE SHOPPING
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Wishlist;
