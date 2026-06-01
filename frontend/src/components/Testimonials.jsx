import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Testimonials.css"; 
import { toast } from "react-toastify";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [parfumet, setParfumet] = useState([]);
  const navigate = useNavigate();

  const [loggedInUser, setLoggedInUser] = useState(null);
  const [rating, setRating] = useState(5);
  const [komenti, setKomenti] = useState("");
  const [selectedParfumId, setSelectedParfumId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState({ text: "", type: "" });

  const [currentIndex, setCurrentIndex] = useState(0);

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
        console.error("Error reading user data:", e);
      }
    }

    const fetchReviews = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/reviews");
        setReviews(res.data);

        const resParfumet = await axios.get("http://localhost:5000/api/parfumet");
        setParfumet(resParfumet.data);
        if (resParfumet.data.length > 0) {
          setSelectedParfumId(resParfumet.data[0].parfum_id);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!rating || !komenti.trim() || !selectedParfumId) {
      alert("Please fill out all required fields!");
      return;
    }

    setSubmitting(true);
    setFormMessage({ text: "", type: "" });

    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const reviewData = {
        rating: parseInt(rating),
        komenti: komenti,
        klient_id: parseInt(loggedInUser?.id || 0),
        parfum_id: parseInt(selectedParfumId),
        data: new Date(),
      };

      const response = await axios.post("http://localhost:5000/api/reviews", reviewData, config);

      if (response.status === 201) {
        setKomenti("");
        setRating(5);
        setFormMessage({
          text: "✨ Thank you! Your review has been submitted successfully.",
          type: "success",
        });

        // Rifreskon vetëm gjendjen e reviews në prapavijë pa lëvizur slider-in sipër
        const resReviews = await axios.get("http://localhost:5000/api/reviews");
        setReviews(resReviews.data);

        setTimeout(() => setFormMessage({ text: "", type: "" }), 5000);
      }
    } catch (error) {
      console.error("Full API error:", error.response?.data || error);
      const serverErrorMessage = error.response?.data?.error || error.response?.data?.message;

      setFormMessage({
        text: serverErrorMessage 
          ? `❌ Server Error: ${serverErrorMessage}` 
          : "❌ An error occurred. Please ensure your account is correctly linked as a Client in the database.",
        type: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const defaultReviews = [
    {
      id: 1,
      emri: "Arbëreshë Gashi",
      roli: "Fragrance Enthusiast",
      komenti: "Chanel No. 5 is pure elegance in a bottle! The scent lasts all day and I get compliments everywhere I go. Every note unfolds beautifully like a timeless story.",
      rating: 5,
      fotoKlienti: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
      fotoParfumi: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500", // Foto premium e Chanel nga interneti
    },
    {
      id: 2,
      emri: "Blerim Krasniqi",
      roli: "Fashion Consultant",
      komenti: "Dior Sauvage from this shop is 100% original. Fast shipping and extremely luxurious packaging. It completely changed the way I wear fragrances.",
      rating: 5,
      fotoKlienti: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      fotoParfumi: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500", // Foto premium e Dior Sauvage
    },
    {
      id: 3,
      emri: "Elena Berisha",
      roli: "Marketing Specialist",
      komenti: "Tom Ford Black Orchid is my new favorite. A mysterious fragrance that makes you feel unique. The attention to detail and quality are unmatched.",
      rating: 4,
      fotoKlienti: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150",
      fotoParfumi: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=500", // Foto premium e Tom Ford (si te image_ee9967.png)
    },
  ];

  // E lëmë të lexojë gjithmonë vetëm review-të e shkruara me dorë më lart
  const reviewsToDisplay = defaultReviews;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex === reviewsToDisplay.length - 1 ? 0 : prevIndex + 1);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex === 0 ? reviewsToDisplay.length - 1 : prevIndex - 1);
  };

  const currentReview = reviewsToDisplay[currentIndex] || defaultReviews[0];

  return (
    <div className="testimonials-homepage-wrapper">
      {/* Butoni origjinal që lidhet me CSS-in tënd */}
      <div className="faq-outer-back-container">
        <button className="faq-back-btn" onClick={() => navigate("/")}>
          ← Back to Home
        </button>
      </div>

      <div className="testimonials-header-zone">
        <span className="testimonials-mini-subtitle">- CUSTOMERS ABOUT US -</span>
        <h2 className="testimonials-main-title">
          Why They <span>Fell in Love</span> at First Scent
        </h2>
        <p className="testimonials-lead-p">
          We are a customer-oriented company, and our values drive us to achieve more.
        </p>
      </div>

      {loading && !reviews.length ? (
        <div className="testimonials-loading-text">Loading testimonials...</div>
      ) : (
        <>
          <div className="testimonials-slider-container">
            <div className="testimonials-image-side">
              <img src={currentReview.fotoParfumi} alt="Perfume Display" className="testimonials-perfume-img" />
            </div>

            <div className="testimonials-content-side">
              <div className="testimonials-quote-mark">“</div>
              <div className="testimonials-stars">
                {"★".repeat(currentReview.rating || 5)}
                {"☆".repeat(5 - (currentReview.rating || 5))}
              </div>

              <p className="testimonials-comment-text">"{currentReview.komenti}"</p>

              <div className="testimonials-client-info">
                <img
                  src={currentReview.fotoKlienti}
                  alt={currentReview.emri}
                  className="testimonials-avatar"
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"; }}
                />
                <div>
                  <h4 className="testimonials-client-name">{currentReview.emri}</h4>
                  <span className="testimonials-client-role">{currentReview.roli}</span>
                </div>
              </div>
            </div>

            <button onClick={prevSlide} className="testimonials-nav-btn prev">&#10094;</button>
            <button onClick={nextSlide} className="testimonials-nav-btn next">&#10095;</button>
          </div>

          {loggedInUser ? (
            <div className="testimonials-form-container">
              <div className="flex flex-col sm:flex-row justify-between items-center bg-amber-50/40 border border-amber-200/60 p-5 rounded-lg mb-8 shadow-sm gap-4 w-full">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">✨</span>
                  <p className="text-sm sm:text-base text-stone-800 font-medium m-0">
                    Trusted by over <span className="text-amber-800 font-bold">1,200+ clients</span> worldwide with a 4.9/5 global rating.
                  </p>
                </div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-amber-800 bg-amber-100/50 px-3 py-1.5 rounded-full border border-amber-200 shadow-xs text-center whitespace-nowrap">
                  ✓ Verified Community
                </div>
              </div>

              <h3 className="testimonials-form-title">
                Share Your <span>Experience</span>
              </h3>

              <form onSubmit={handleSubmitReview} className="testimonials-main-form">
                <div className="testimonials-form-row">
                  <div className="testimonials-form-group">
                    <label className="testimonials-form-label">Select Perfume</label>
                    <select
                      value={selectedParfumId}
                      onChange={(e) => setSelectedParfumId(e.target.value)}
                      className="testimonials-form-select"
                    >
                      {parfumet.map((p) => (
                        <option key={p.parfum_id} value={p.parfum_id}>
                          {p.emri} ({p.cmimi}$)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="testimonials-form-group">
                    <label className="testimonials-form-label">Your Rating</label>
                    <select
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      className="testimonials-form-select rating-select"
                    >
                      <option value="5">★★★★★ (5/5) Excellent</option>
                      <option value="4">★★★★☆ (4/5) Very Good</option>
                      <option value="3">★★★☆☆ (3/5) Average</option>
                      <option value="2">★★☆☆☆ (2/5) Poor</option>
                      <option value="1">★☆☆☆☆ (1/5) Terrible</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="testimonials-form-label">Your Review</label>
                  <textarea
                    rows="4"
                    value={komenti}
                    onChange={(e) => setKomenti(e.target.value)}
                    placeholder="Write your thoughts about this fragrance here..."
                    className="testimonials-form-textarea"
                  ></textarea>

                  <div className="mt-3 mb-5 text-right w-full">
                    <div className="flex justify-between items-center text-sm sm:text-base text-stone-700 font-medium mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-amber-600 animate-pulse"></span>
                        Write your review:
                      </span>
                      <span className="font-mono bg-stone-100 px-2 py-0.5 rounded text-stone-900 font-bold">
                        {komenti?.length || 0} / 500
                      </span>
                    </div>
                    <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden border border-stone-200">
                      <div 
                        className="bg-gradient-to-r from-amber-700 to-amber-900 h-full transition-all duration-300 ease-out"
                        style={{ width: `${Math.min(((komenti?.length || 0) / 500) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5">
                  <button type="submit" disabled={submitting} className="testimonials-submit-btn">
                    {submitting ? "Submitting..." : "Post Review"}
                  </button>

                  {formMessage.text && (
                    <div className={`testimonials-status-message ${formMessage.type === "success" ? "success" : "error"}`}>
                      {formMessage.text}
                    </div>
                  )}
                </div>
              </form>
            </div>
          ) : (
            <div className="testimonials-login-prompt">
              <p>
                Want to leave a review?{" "}
                <span className="testimonials-login-link" onClick={() => navigate("/login")}>
                  Login to your account
                </span>{" "}
                to share your experience.
              </p>
            </div>
          )}

          <div className="testimonials-bottom-gallery">
            <img src="https://images.unsplash.com/photo-1594035910387-fea47794261f?w=250" alt="p1" className="testimonials-gallery-img" />
            <img src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=250" alt="p2" className="testimonials-gallery-img" />
            <img src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=250" alt="p3" className="testimonials-gallery-img" />
            <img src="https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?w=250" alt="p5" className="testimonials-gallery-img" />
            <img src="https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=250" alt="p6" className="testimonials-gallery-img" />
          </div>
        </>
      )}
    </div>
  );
};

export default Testimonials;