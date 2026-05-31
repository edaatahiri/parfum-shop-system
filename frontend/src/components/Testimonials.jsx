import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Shop.css";
import { toast } from "react-toastify";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [parfumet, setParfumet] = useState([]);
  const navigate = useNavigate();

  //te reja per reviews dinamike
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [rating, setRating] = useState(5);
  const [komenti, setKomenti] = useState("");
  const [selectedParfumId, setSelectedParfumId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState({ text: "", type: "" });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isSubmitHovered, setIsSubmitHovered] = useState(false);

  useEffect(() => {
    //e re prap
    const savedUser =
      localStorage.getItem("user") ||
      localStorage.getItem("loggedInUser") ||
      sessionStorage.getItem("user") ||
      sessionStorage.getItem("loggedInUser");
    if (savedUser) {
      try {
        setLoggedInUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Gabim gjatë leximit të user:", e);
      }
    }

    const fetchReviews = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/reviews");
        setReviews(res.data);

        //e re
        const resParfumet = await axios.get(
          "http://localhost:5000/api/parfumet",
        );
        setParfumet(resParfumet.data);
        if (resParfumet.data.length > 0) {
          setSelectedParfumId(resParfumet.data[0].parfum_id);
        }

        setLoading(false);
      } catch (err) {
        console.error("Gabim gjatë marrjes së reviews:", err);
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Funksioni handleSubmitReview i rregulluar plotësisht këtu:
  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!rating || !komenti.trim() || !selectedParfumId) {
      alert("Ju lutem plotësoni të gjitha fushat!");
      return;
    }

    setSubmitting(true);
    setFormMessage({ text: "", type: "" });

    try {
      // 1. Marrim token-in nga localStorage
      const token = localStorage.getItem("token");

      // 2. Krijojmë konfigurimin për Axios me Header-in e duhur
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const reviewData = {
        rating: parseInt(rating),
        komenti: komenti,
        klient_id: parseInt(loggedInUser?.id || 0),
        parfum_id: parseInt(selectedParfumId),
        data: new Date(),
      };

      // 3. E dërgojmë 'config' si parametër të tretë te axios.post
      const response = await axios.post(
        "http://localhost:5000/api/reviews",
        reviewData,
        config
      );

      if (response.status === 201) {
        setKomenti("");
        setRating(5);

        setFormMessage({
          text: "✨ Thank you! Your review has been submitted successfully.",
          type: "success",
        });

        const resReviews = await axios.get("http://localhost:5000/api/reviews");
        setReviews(resReviews.data);
        setCurrentIndex(resReviews.data.length - 1);

        setTimeout(() => setFormMessage({ text: "", type: "" }), 5000);
      }
    } catch (error) {
      console.error("Gabim i plotë nga API:", error.response?.data || error);
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
      komenti:
        "Parfumi Férox është thjesht magjik! Aroma zgjat gjithë ditën dhe marr komplimente kudo që shkoj. Çdo shtresë e aromës shpaloset si një tregim i bukur.",
      rating: 5,
      fotoKlienti:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
      fotoParfumi:
        "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500",
    },
    {
      id: 2,
      emri: "Blerim Krasniqi",
      roli: "Fashion Consultant",
      komenti:
        "Dior Sauvage nga ky dyqan është 100% origjinal. Shërbimi i shpejtë dhe paketimi super luksoz. Ka ndryshuar komplet mënyrën se si përdor parfumet.",
      rating: 5,
      fotoKlienti:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      fotoParfumi:
        "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500",
    },
    {
      id: 3,
      emri: "Elena Berisha",
      roli: "Marketing Specialist",
      komenti:
        "Tom Ford Black Orchid është i preferuari im i ri. Një aromë misterioze që të bën të ndihesh unike. Vëmendja ndaj detajeve dhe cilësia janë të pakonkurrueshme.",
      rating: 4,
      fotoKlienti:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150",
      fotoParfumi:
        "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=500",
    },
  ];

  const reviewsToDisplay =
    reviews.length > 0
      ? reviews.map((r, i) => ({
          ...r,
          emri: r.klient
            ? `${r.klient.emri} ${r.klient.mbiemri}`
            : "Maison Client",
          roli: r.parfumi ? `Bought: ${r.parfumi.emri}` : "Verified Buyer",
          komenti: r.komenti,
          rating: r.rating,
          fotoKlienti:
            r.foto || defaultReviews[i % defaultReviews.length].fotoKlienti,
          fotoParfumi: defaultReviews[i % defaultReviews.length].fotoParfumi,
        }))
      : defaultReviews;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === reviewsToDisplay.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? reviewsToDisplay.length - 1 : prevIndex - 1,
    );
  };

  const currentReview = reviewsToDisplay[currentIndex] || defaultReviews[0];

  return (
    <div
      className="homepage-wrapper"
      style={{
        background: "#fcf9f5",
        minHeight: "100vh",
        color: "#222",
        paddingBottom: "60px",
      }}
    >
      <button
        onClick={() => navigate("/")}
        onMouseEnter={() => setIsButtonHovered(true)}
        onMouseLeave={() => setIsButtonHovered(false)}
        style={{
          margin: "20px",
          padding: "12px 24px",
          background: isButtonHovered ? "#000000" : "#b89453",
          color: isButtonHovered ? "#ffffff" : "#000000",
          fontWeight: "bold",
          fontSize: "14px",
          letterSpacing: "1px",
          border: "none",
          cursor: "pointer",
          borderRadius: "4px",
          transition: "all 0.3s ease",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
        }}
      >
        &larr; Kthehu në Ballinë
      </button>

      <div
        style={{ textAlign: "center", marginTop: "10px", marginBottom: "40px" }}
      >
        <span
          style={{
            color: "#777",
            letterSpacing: "2px",
            fontSize: "12px",
            textTransform: "uppercase",
          }}
        >
          - CUSTOMERS ABOUT US -
        </span>
        <h2
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: "2.8rem",
            fontWeight: "400",
            margin: "10px 0",
            color: "#111",
          }}
        >
          Why They{" "}
          <span style={{ fontStyle: "italic", color: "#722f37" }}>
            Fell in Love
          </span>{" "}
          at First Scent
        </h2>
        <p style={{ color: "#555", fontSize: "16px" }}>
          We are a customer-oriented company, and our values drive us to achieve
          more.
        </p>
      </div>

      {loading && !reviews.length ? (
        <div style={{ textAlign: "center", marginTop: "30px" }}>
          Duke u ngarkuar...
        </div>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              maxWidth: "1100px",
              margin: "0 auto",
              background: "#ffffff",
              borderRadius: "0px",
              boxShadow: "0 10px 40px rgba(0,0,0,0.04)",
              position: "relative",
              alignItems: "center",
            }}
          >
            <div style={{ width: "45%", fontSize: "0" }}>
              <img
                src={currentReview.fotoParfumi}
                alt="Perfume Display"
                style={{
                  width: "100%",
                  height: "480px",
                  objectFit: "cover",
                  transition: "all 0.5s ease",
                }}
              />
            </div>

            <div
              style={{
                width: "55%",
                padding: "50px 60px",
                position: "relative",
              }}
            >
              <div
                style={{
                  color: "#722f37",
                  fontSize: "70px",
                  fontFamily: "Georgia, serif",
                  lineHeight: "1",
                  marginBottom: "0px",
                  marginTop: "-20px",
                }}
              >
                “
              </div>

              <div
                style={{
                  color: "#b89453",
                  marginBottom: "15px",
                  fontSize: "16px",
                }}
              >
                {"★".repeat(currentReview.rating || 5)}
                {"☆".repeat(5 - (currentReview.rating || 5))}
              </div>

              <p
                style={{
                  color: "#444",
                  fontSize: "15px",
                  lineHeight: "1.7",
                  marginBottom: "35px",
                  minHeight: "120px",
                  fontStyle: "italic",
                }}
              >
                "{currentReview.komenti}"
              </p>

              <div
                style={{ display: "flex", alignItems: "center", gap: "15px" }}
              >
                <img
                  src={currentReview.fotoKlienti}
                  alt={currentReview.emri}
                  style={{
                    width: "55px",
                    height: "55px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "1px solid #e0e0e0",
                  }}
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150";
                  }}
                />
                <div>
                  <h4
                    style={{
                      fontFamily: "Playfair Display, serif",
                      fontSize: "18px",
                      margin: "0",
                      color: "#722f37",
                      fontWeight: "600",
                    }}
                  >
                    {currentReview.emri}
                  </h4>
                  <span style={{ fontSize: "12px", color: "#888" }}>
                    {currentReview.roli}
                  </span>
                </div>
              </div>

              <button
                onClick={prevSlide}
                style={{
                  position: "absolute",
                  left: "-22px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "#111",
                  color: "#fff",
                  border: "none",
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                  fontSize: "16px",
                  transition: "background 0.2s",
                  zIndex: "10",
                }}
                onMouseEnter={(e) => (e.target.style.background = "#722f37")}
                onMouseLeave={(e) => (e.target.style.background = "#111")}
              >
                &#10094;
              </button>

              <button
                onClick={nextSlide}
                style={{
                  position: "absolute",
                  right: "-22px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "#111",
                  color: "#fff",
                  border: "none",
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                  fontSize: "16px",
                  transition: "background 0.2s",
                  zIndex: "10",
                }}
                onMouseEnter={(e) => (e.target.style.background = "#722f37")}
                onMouseLeave={(e) => (e.target.style.background = "#111")}
              >
                &#10095;
              </button>
            </div>
          </div>

         {loggedInUser ? (
            <div
              style={{
                maxWidth: "1100px",
                margin: "50px auto 0 auto",
                background: "#ffffff",
                padding: "40px 60px",
                boxShadow: "0 10px 40px rgba(0,0,0,0.04)",
              }}
            >
              {/* SHTIMI ME TAILWIND: Kuti statistikash minimale dhe shumë cool */}
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

              <h3
                style={{
                  fontFamily: "Playfair Display, serif",
                  fontSize: "1.8rem",
                  color: "#111",
                  marginBottom: "20px",
                  borderBottom: "1px solid #eee",
                  paddingBottom: "10px",
                }}
              >
                Share Your{" "}
                <span style={{ fontStyle: "italic", color: "#722f37" }}>
                  Experience
                </span>
              </h3>


              <form
                onSubmit={handleSubmitReview}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                  <div style={{ flex: "1", minWidth: "250px" }}>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "8px",
                        fontSize: "13px",
                        color: "#555",
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                      }}
                    >
                      Select Perfume
                    </label>
                    <select
                      value={selectedParfumId}
                      onChange={(e) => setSelectedParfumId(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "12px",
                        border: "1px solid #e0e0e0",
                        background: "#fff",
                        borderRadius: "4px",
                        fontSize: "14px",
                        color: "#333",
                      }}
                    >
                      {parfumet.map((p) => (
                        <option key={p.parfum_id} value={p.parfum_id}>
                          {p.emri} ({p.cmimi}$)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div style={{ flex: "1", minWidth: "250px" }}>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "8px",
                        fontSize: "13px",
                        color: "#555",
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                      }}
                    >
                      Your Rating
                    </label>
                    <select
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "12px",
                        border: "1px solid #e0e0e0",
                        background: "#fff",
                        borderRadius: "4px",
                        fontSize: "14px",
                        color: "#b89453",
                        fontWeight: "bold",
                      }}
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
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontSize: "13px",
                      color: "#555",
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                    }}
                  >
                    Your Review
                  </label>
                  <textarea
                    rows="4"
                    value={komenti}
                    onChange={(e) => setKomenti(e.target.value)}
                    placeholder="Write your thoughts about this fragrance here..."
                    style={{
                      width: "100%",
                      padding: "15px",
                      border: "1px solid #e0e0e0",
                      borderRadius: "4px",
                      fontSize: "14px",
                      fontFamily: "inherit",
                      resize: "none",
                    }}
                  ></textarea>

                  {/* SHTIMI ME TAILWIND: Kontator dhe Shirit Progresi me tekst të rritur e të qartë */}
                  <div className="mt-3 mb-5 text-right w-full">
                    <div className="flex justify-between items-center text-sm sm:text-base text-stone-700 font-medium mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-amber-600 animate-pulse"></span>
                        Shkruani përshtypjen tuaj:
                      </span>
                      <span className="font-mono bg-stone-100 px-2 py-0.5 rounded text-stone-900 font-bold">
                        {komenti?.length || 0} / 500
                      </span>
                    </div>
                    {/* Shiriti i progresit që mbushet në kohë reale */}
                    <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden border border-stone-200">
                      <div 
                        className="bg-gradient-to-r from-amber-700 to-amber-900 h-full transition-all duration-300 ease-out"
                        style={{ width: `${Math.min(((komenti?.length || 0) / 500) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>





                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <button
                    type="submit"
                    disabled={submitting}
                    onMouseEnter={() => setIsSubmitHovered(true)}
                    onMouseLeave={() => setIsSubmitHovered(false)}
                    style={{
                      alignSelf: "flex-start",
                      padding: "14px 35px",
                      background: isSubmitHovered ? "#000000" : "#722f37",
                      color: "#ffffff",
                      fontWeight: "bold",
                      fontSize: "13px",
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      border: "none",
                      cursor: "pointer",
                      borderRadius: "4px",
                      transition: "all 0.3s ease",
                      opacity: submitting ? 0.7 : 1,
                    }}
                  >
                    {submitting ? "Submitting..." : "Post Review"}
                  </button>

                  {formMessage.text && (
                    <div
                      style={{
                        marginTop: "10px",
                        padding: "12px 15px",
                        fontSize: "14px",
                        borderRadius: "4px",
                        fontWeight: "500",
                        width: "100%",
                        maxWidth: "600px",
                        background:
                          formMessage.type === "success"
                            ? "#f4f9f4"
                            : "#fdf3f3",
                        color:
                          formMessage.type === "success"
                            ? "#27ae60"
                            : "#c0392b",
                        border:
                          formMessage.type === "success"
                            ? "1px solid #d4edda"
                            : "1px solid #f5c6cb",
                      }}
                    >
                      {formMessage.text}
                    </div>
                  )}
                </div>
              </form>
            </div>
          ) : (
            <div
              style={{
                maxWidth: "1100px",
                margin: "40px auto 0 auto",
                textAlign: "center",
                padding: "20px",
                background: "#fffdf9",
                border: "1px dashed #b89453",
              }}
            >
              <p style={{ margin: "0", color: "#666", fontSize: "14px" }}>
                Want to leave a review?{" "}
                <span
                  style={{
                    color: "#722f37",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("/login")}
                >
                  Login to your account
                </span>{" "}
                to share your experience.
              </p>
            </div>
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "15px",
              maxWidth: "1100px",
              margin: "50px auto 0 auto",
              padding: "0 10px",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1594035910387-fea47794261f?w=250"
              alt="p1"
              style={{ width: "15%", height: "140px", objectFit: "cover" }}
            />
            <img
              src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=250"
              alt="p2"
              style={{ width: "15%", height: "140px", objectFit: "cover" }}
            />
            <img
              src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=250"
              alt="p3"
              style={{ width: "15%", height: "140px", objectFit: "cover" }}
            />
            <img
              src="https://images.unsplash.com/photo-1588405748373-122b2321bc31?w=250"
              alt="p4"
              style={{ width: "15%", height: "140px", objectFit: "cover" }}
            />
            <img
              src="https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?w=250"
              alt="p5"
              style={{ width: "15%", height: "140px", objectFit: "cover" }}
            />
            <img
              src="https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=250"
              alt="p6"
              style={{ width: "15%", height: "140px", objectFit: "cover" }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Testimonials;