import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FAQ.css";

function FAQ() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(null);
  
  // States për Kuizin e Parfumit
  const [scentType, setScentType] = useState("");
  const [timeOfDay, setTimeOfDay] = useState("");
  const [quizResult, setQuizResult] = useState(null);
  
  // State i ri për Pop-up (Modal)
  const [showModal, setShowModal] = useState(false);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "How long does the scent typically last?",
      answer: "Absolutely. Maison de Parfum is committed to sustainability. Our premium formulations hold high concentrations of essential oils, typically lasting between 6 to 8 hours depending on your skin type.",
    },
    {
      question: "How can I make the order?",
      answer: "Simply navigate through our Catalog, select the perfume that tells your story, add it to your bag, and complete the process through our secure minimalist checkout.",
    },
    {
      question: "Do you offer samples or discovery sets?",
      answer: "Yes, we offer exquisite discovery sets featuring small samples of our finest signature fragrances, allowing you to experience them before selecting a full bottle.",
    },
  ];

  const handleFindPerfume = () => {
    if (!scentType || !timeOfDay) return;

    if (scentType === "floral" && timeOfDay === "day") {
      setQuizResult({ name: "Coco Mademoiselle", desc: "Një aromë e freskët lulesh, perfekte për mëngjeset plot energji.", img: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=300" });
    } else if (scentType === "woody" && timeOfDay === "night") {
      setQuizResult({ name: "Noir Oud", desc: "E thellë, misterioze dhe intensive. Ideale për mbrëmje elegante.", img: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=300" });
    } else {
      setQuizResult({ name: "Bleu Absolute", desc: "Një balancë perfekte e freskisë dhe elegancës që përshtatet në çdo moment.", img: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=300" });
    }
  };

  const resetQuiz = () => {
    setScentType("");
    setTimeOfDay("");
    setQuizResult(null);
    setShowModal(false);
  };

  // Funksioni që e dërgon përdoruesin te katalogu për të bërë porosinë
  const handleProceedToCatalog = () => {
    if (quizResult) {
      // E ruajmë emrin e parfumit që katalogu ta dijë cilin ta filtrojë ose theksojë automatikisht
      localStorage.setItem("selectedPerfumeFromQuiz", quizResult.name);
    }
    setShowModal(false);
    navigate("/catalog"); // Ndryshoje në "/katalogu" ose rrugën saktë që keni për faqen e katalogut
  };

  return (
    <>
      <div className="faq-outer-back-container">
        <button className="faq-back-btn" onClick={() => navigate("/")}>
          ← Kthehu në Ballinë
        </button>
      </div>

      <div className="faq-wrapper">
        <div className="faq-header">
          <span className="faq-subtitle">- Maison de Parfum -</span>
          <h2 className="faq-main-title">
            Fragrances for <span>Every Moment</span> of Your Day
          </h2>
        </div>

        {/* FRAGRANCE FINDER */}
        <div className="fragrance-finder-section">
          <div className="finder-card">
            <h3>✨ Gjej Aromën Tënde Ideale</h3>
            <p className="finder-subtitle">Përgjigju në dy pyetje të shpejta për të zbuluar aromën që të përshtatet më së miri.</p>
            
            {!quizResult ? (
              <div className="quiz-container">
                <div className="quiz-step">
                  <label>1. Çfarë lloj arome preferon më shumë?</label>
                  <div className="quiz-options">
                    <button className={`option-btn ${scentType === "floral" ? "selected" : ""}`} onClick={() => setScentType("floral")}>🌸 Lule & Freski</button>
                    <button className={`option-btn ${scentType === "woody" ? "selected" : ""}`} onClick={() => setScentType("woody")}>🪵 Dru & Mister</button>
                  </div>
                </div>

                <div className="quiz-step">
                  <label>2. Kur dëshiron ta përdorësh kryesisht?</label>
                  <div className="quiz-options">
                    <button className={`option-btn ${timeOfDay === "day" ? "selected" : ""}`} onClick={() => setTimeOfDay("day")}>☀️ Gjatë Ditës</button>
                    <button className={`option-btn ${timeOfDay === "night" ? "selected" : ""}`} onClick={() => setTimeOfDay("night")}>🌙 Për Mbrëmje</button>
                  </div>
                </div>

                <button className="find-perfume-btn" onClick={handleFindPerfume} disabled={!scentType || !timeOfDay}>
                  Zbuluaj Parfumin Tim
                </button>
              </div>
            ) : (
              <div className="quiz-result-zone animate-fade-in">
                <div className="result-content">
                  <img src={quizResult.img} alt={quizResult.name} className="result-perfume-img" />
                  <div className="result-text">
                    <span className="match-tag">REKOMANDIMI YNË</span>
                    <h4>{quizResult.name}</h4>
                    <p>{quizResult.desc}</p>
                    <div className="result-actions">
                      {/* Tani ky buton hap Pop-up-in në vend se të kalojë direkt */}
                      <button className="buy-now-btn" onClick={() => setShowModal(true)}>Shiko në Katalog</button>
                      <button className="retry-btn" onClick={resetQuiz}>Provo Përsëri ↻</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* POP-UP (MODAL) WINDOW */}
        {showModal && (
          <div className="faq-modal-overlay" onClick={() => setShowModal(false)}>
            <div className="faq-modal-box animate-fade-in" onClick={(e) => e.stopPropagation()}>
              <button className="close-modal-x" onClick={() => setShowModal(false)}>✕</button>
              
              <div className="modal-header-zone">
                <span className="modal-mini-title">Porosia Juaj e Personalizuar</span>
                <h3>A është ky parfumi i ëndrrave tuaja?</h3>
              </div>

              <div className="modal-body-content">
                <img src={quizResult?.img} alt={quizResult?.name} className="modal-preview-img" />
                <div className="modal-details">
                  <h4>{quizResult?.name}</h4>
                  <p>{quizResult?.desc}</p>
                  <blockquote className="modal-note">
                    ✨ Klikoni më poshtë për t'u transferuar te Katalogu ynë zyrtar, ku mund të zgjidhni sasinë (ml) dhe të kryeni porosinë tuaj të sigurt menjëherë!
                  </blockquote>
                </div>
              </div>

              <div className="modal-footer-actions">
                <button className="modal-cancel-btn" onClick={() => setShowModal(false)}>Anulo</button>
                <button className="modal-confirm-btn" onClick={handleProceedToCatalog}>Konfirmo & Shko te Katalogu →</button>
              </div>
            </div>
          </div>
        )}

        {/* PYETJET E SHPESHTA */}
        <div className="faq-bottom-section">
          <h3 className="section-title-faq">Pyetjet e Shpeshta</h3>
          <div className="faq-accordion-simple">
            {faqData.map((item, index) => {
              const isActive = activeIndex === index;
              return (
                <div key={index} className={`faq-line-item ${isActive ? "active" : ""}`}>
                  <button className="faq-line-trigger" onClick={() => toggleAccordion(index)}>
                    {item.question}
                    <span className="faq-icon-arrow">{isActive ? "−" : "＋"}</span>
                  </button>
                  <div className="faq-line-content">
                    <p>{item.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </>
  );
}

export default FAQ;