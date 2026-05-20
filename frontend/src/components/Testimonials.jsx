import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Shop.css"; // Përdorim CSS-in tënd për stilimet bazë

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Variablat për kontrollin e Slider-it dhe Butonit
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Thërrasim API-në e backend-it tënd për reviews
        const res = await axios.get("http://localhost:5000/api/reviews");
        setReviews(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Gabim gjatë marrjes së reviews:", err);
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Të dhënat luksoze që përdoren si rezervë ose plotësim për slider-in
  const defaultReviews = [
    {
      id: 1,
      emri: "Arbëreshë Gashi",
      roli: "Fragrance Enthusiast",
      komenti: "Parfumi Férox është thjesht magjik! Aroma zgjat gjithë ditën dhe marr komplimente kudo që shkoj. Çdo shtresë e aromës shpaloset si një tregim i bukur.",
      rating: 5,
      fotoKlienti: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150", // Foto e sigurt nga rrjeti për vajzën
      fotoParfumi: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500" // Parfumi i parë luksoz
    },
    {
      id: 2,
      emri: "Blerim Krasniqi",
      roli: "Fashion Consultant",
      komenti: "Dior Sauvage nga ky dyqan është 100% origjinal. Shërbimi i shpejtë dhe paketimi super luksoz. Ka ndryshuar komplet mënyrën se si përdor parfumet.",
      rating: 5,
      fotoKlienti: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150", // Foto e sigurt për djalin
      fotoParfumi: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500" // Parfumi i dytë luksoz
    },
    {
      id: 3,
      emri: "Elena Berisha",
      roli: "Marketing Specialist",
      komenti: "Tom Ford Black Orchid është i preferuari im i ri. Një aromë misterioze që të bën të ndihesh unike. Vëmendja ndaj detajeve dhe cilësia janë të pakonkurrueshme.",
      rating: 4,
      fotoKlienti: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150",
      fotoParfumi: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=500"
    }
  ];

  // Nëse vijnë reviews nga DB, i bashkojmë ose plotësojmë me fotot e parfumit që slider-i mos të mbesë bosh
  const reviewsToDisplay = reviews.length > 0 
    ? reviews.map((r, i) => ({
        ...r,
        roli: r.roli || "Client",
        fotoKlienti: r.foto || defaultReviews[i % defaultReviews.length].fotoKlienti,
        fotoParfumi: defaultReviews[i % defaultReviews.length].fotoParfumi
      }))
    : defaultReviews;

  // Funksionet për të lëvizur shigjetat majtas/djathtas
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === reviewsToDisplay.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? reviewsToDisplay.length - 1 : prevIndex - 1
    );
  };

  // Klienti aktual në slider
  const currentReview = reviewsToDisplay[currentIndex] || defaultReviews[0];

  return (
    <div className="homepage-wrapper" style={{ background: "#fcf9f5", minHeight: "100vh", color: "#222", paddingBottom: "60px" }}>
      
      {/* Butoni Kthehu në Ballinë me stilim inline të saktë */}
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
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)"
        }}
      >
        &larr; Kthehu në Ballinë
      </button>

      {/* Headeri i Seksionit */}
      <div style={{ textAlign: "center", marginTop: "10px", marginBottom: "40px" }}>
        <span style={{ color: "#777", letterSpacing: "2px", fontSize: "12px", textTransform: "uppercase" }}>
          - CUSTOMERS ABOUT US -
        </span>
        <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "2.8rem", fontWeight: "400", margin: "10px 0", color: "#111" }}>
          Why They <span style={{ fontStyle: "italic", color: "#722f37" }}>Fell in Love</span> at First Scent
        </h2>
        <p style={{ color: "#555", fontSize: "16px" }}>
          We are a customer-oriented company, and our values drive us to achieve more.
        </p>
      </div>

      {loading && !reviews.length ? (
        <div style={{ textAlign: "center", marginTop: "30px" }}>Duke u ngarkuar...</div>
      ) : (
        <>
          {/* KONTEJNERI KRYESOR I SLIDER-IT */}
          <div style={{ 
            display: "flex", 
            maxWidth: "1100px", 
            margin: "0 auto", 
            background: "#ffffff", 
            borderRadius: "0px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.04)",
            position: "relative",
            alignItems: "center"
          }}>
            
            {/* Pjesa e Majtë: Fotoja e Madhe e Parfumit */}
            <div style={{ width: "45%", fontSize: "0" }}>
              <img 
                src={currentReview.fotoParfumi} 
                alt="Perfume Display" 
                style={{ width: "100%", height: "480px", objectFit: "cover", transition: "all 0.5s ease" }}
              />
            </div>

            {/* Pjesa e Djathtë: Teksti, Thonjëzat dhe Detajet */}
            <div style={{ width: "55%", padding: "50px 60px", position: "relative" }}>
              
              {/* Ikona e Thonjëzave të Mëdha Luksoze */}
              <div style={{ color: "#722f37", fontSize: "70px", fontFamily: "Georgia, serif", lineHeight: "1", marginBottom: "0px", marginTop: "-20px" }}>
                “
              </div>

              {/* Yjet e vlerësimit */}
              <div style={{ color: "#b89453", marginBottom: "15px", fontSize: "16px" }}>
                {"★".repeat(currentReview.rating || 5)}{"☆".repeat(5 - (currentReview.rating || 5))}
              </div>

              {/* Komenti Dinamik */}
              <p style={{ color: "#444", fontSize: "15px", lineHeight: "1.7", marginBottom: "35px", minHeight: "120px", fontStyle: "italic" }}>
                "{currentReview.komenti || currentReview.review_text || currentReview.content}"
              </p>

              {/* Profili i Klientit (Foto e rrumbullakët + Emri) */}
              <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                <img 
                  src={currentReview.fotoKlienti} 
                  alt={currentReview.emri}
                  style={{ width: "55px", height: "55px", borderRadius: "50%", objectFit: "cover", border: "1px solid #e0e0e0" }}
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150";
                  }}
                />
                <div>
                  <h4 style={{ fontFamily: "Playfair Display, serif", fontSize: "18px", margin: "0", color: "#722f37", fontWeight: "600" }}>
                    {currentReview.emri}
                  </h4>
                  <span style={{ fontSize: "12px", color: "#888" }}>
                    {currentReview.roli}
                  </span>
                </div>
              </div>

              {/* NAVIGIMI: Shigjeta e Majtë */}
              <button 
                onClick={prevSlide}
                style={{
                  position: "absolute", left: "-22px", top: "50%", transform: "translateY(-50%)",
                  background: "#111", color: "#fff", border: "none", width: "44px", height: "44px",
                  borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)", fontSize: "16px", transition: "background 0.2s", zIndex: "10"
                }}
                onMouseEnter={(e) => e.target.style.background = "#722f37"}
                onMouseLeave={(e) => e.target.style.background = "#111"}
              >
                &#10094;
              </button>

              {/* NAVIGIMI: Shigjeta e Djathtë */}
              <button 
                onClick={nextSlide}
                style={{
                  position: "absolute", right: "-22px", top: "50%", transform: "translateY(-50%)",
                  background: "#111", color: "#fff", border: "none", width: "44px", height: "44px",
                  borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)", fontSize: "16px", transition: "background 0.2s", zIndex: "10"
                }}
                onMouseEnter={(e) => e.target.style.background = "#722f37"}
                onMouseLeave={(e) => e.target.style.background = "#111"}
              >
                &#10095;
              </button>

            </div>
          </div>

          {/* RRESHTI POSHTË ME FOTO TË VOGLA LUKSOZE TË SIGURTA (Nga Unsplash) */}
          <div style={{ 
            display: "flex", 
            justifyContent: "center", 
            gap: "15px", 
            maxWidth: "1100px", 
            margin: "50px auto 0 auto", 
            padding: "0 10px" 
          }}>
            <img src="https://images.unsplash.com/photo-1594035910387-fea47794261f?w=250" alt="p1" style={{ width: "15%", height: "140px", objectFit: "cover" }} />
            <img src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=250" alt="p2" style={{ width: "15%", height: "140px", objectFit: "cover" }} />
            <img src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=250" alt="p3" style={{ width: "15%", height: "140px", objectFit: "cover" }} />
            <img src="https://images.unsplash.com/photo-1588405748373-122b2321bc31?w=250" alt="p4" style={{ width: "15%", height: "140px", objectFit: "cover" }} />
            <img src="https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?w=250" alt="p5" style={{ width: "15%", height: "140px", objectFit: "cover" }} />
            <img src="https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=250" alt="p6" style={{ width: "15%", height: "140px", objectFit: "cover" }} />
          </div>
        </>
      )}
    </div>
  );
};

export default Testimonials;