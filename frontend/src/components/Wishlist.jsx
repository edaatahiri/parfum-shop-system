import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "./Wishlist.css";

function Wishlist() {
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState(null);

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
        setLoading(false);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/wishlist/${loggedInUser.id}`,
        );
        setWishlistProducts(response.data);
      } catch (error) {
        console.error("Gabim gjate marrjes se wishlist:", error);
        toast.error("Nuk u mundesua ngarkimi i wishlist-es.");
      } finally {
        setLoading(false);
      }
    };

    if (loggedInUser) {
      fetchWishlist();
    }
  }, [loggedInUser]);

  const handleRemove = async (parfumId) => {
    if (!loggedInUser) return;
    try {
      await axios.post("http://localhost:5000/api/wishlist/toggle", {
        user_id: parseInt(loggedInUser.id),
        parfum_id: parseInt(parfumId),
      });

      setWishlistProducts((prev) =>
        prev.filter((item) => item.parfum_id !== parfumId),
      );
      toast.info("U hoq nga wishlist!");
    } catch (error) {
      toast.error("Diçka shkoi keq gjatë heqjes.");
    }
  };

  if (loading) {
    return (
      <p style={{ textAlign: "center", padding: "50px" }}>
        Duke ngarkuar wishlist-ën...
      </p>
    );
  }

  if (!loggedInUser && !loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h2>Duhet të jeni të kyçur për të parë wishlist-ën!</h2>
        <Link
          to="/login"
          className="buy-now-btn"
          style={{
            display: "inline-block",
            marginTop: "15px",
            padding: "10px 20px",
            backgroundColor: "#631d27",
            color: "white",
            textDecoration: "none",
          }}
        >
          Kyçu Këtu
        </Link>
      </div>
    );
  }

  return (
    <div className="wishlist-container">
      <h1 className="wishlist-title">My Wishlist</h1>

      {wishlistProducts.length === 0 ? (
        <div className="wishlist-empty">
          <p>You don't have anything in your wishlist.</p>
          <Link
            to="/"
            className="wishlist-link"
            style={{
              backgroundColor: "transparent",
              color: "#631d27",
              padding: 0,
            }}
          >
            Go Back to Shop
          </Link>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlistProducts.map((item) => {
            const emriParfumit = item.parfumi?.emri || "Perfume";
            const qmimiParfumit = item.parfumi?.cmimi || "0";

            return (
              <div key={item.parfum_id} className="wishlist-card">
                <div className="perfume-img-box">
                  <img
                    src={`/images/${emriParfumit.toLowerCase().trim().replace(/\s+/g, "-")}.jpeg`}
                    alt={emriParfumit}
                    className="wishlist-image"
                    onError={(e) => {
                      e.target.style.display = "none";
                      if (e.target.nextSibling) {
                        e.target.nextSibling.style.display = "block";
                      }
                    }}
                  />
                </div>
                <h3 className="wishlist-name">{emriParfumit}</h3>
                <p className="wishlist-price">{qmimiParfumit}$</p>

                <div className="wishlist-actions">
                  <button className="btn-buy-now">Buy Now</button>
                  <button
                    onClick={() => handleRemove(item.parfum_id)}
                    className="btn-remove"
                  >
                    ❌
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
