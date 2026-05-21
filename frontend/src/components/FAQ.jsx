import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FAQ.css";

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);
  const navigate = useNavigate();

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
    {
      question: "Are your ingredients cruelty-free and ethical?",
      answer: "Absolutely. Maison de Parfum is committed to sustainability. All our fragrances are 100% cruelty-free, and our ingredients are ethically sourced from responsible farmers.",
    },
  ];

  return (
    <>
      {/* Ky kontejner tani qëndron jashtë wrapper-it të ngushtë që të mund të shkojë krejt në cep */}
      <div className="faq-outer-back-container">
        <button className="faq-back-btn" onClick={() => navigate("/")}>
          ← Kthehu në Ballinë
        </button>
      </div>

      <div className="faq-wrapper">
        {/* Headeri Qendror */}
        <div className="faq-header">
          <span className="faq-subtitle">- Maison de Parfum -</span>
          <h2 className="faq-main-title">
            Fragrances for <span>Every Moment</span> of Your Day
          </h2>
        </div>

        <div className="faq-content-grid">
          {/* Kolona e Majtë: Pyetjet */}
          <div className="faq-left-column">
            <h3>Do You Have Questions?</h3>
            <span className="we-got-answers">We've Got Your Answers.</span>
            <p className="faq-intro-text">
              Whether you're finding your signature scent or picking a gift, we're here to help. 
              Explore answers about perfumes, orders, and samples — for a smooth, delightful experience.
            </p>

            <div className="faq-accordion">
              {faqData.map((item, index) => {
                const isActive = activeIndex === index;
                return (
                  <div key={index} className={`faq-item ${isActive ? "active" : ""}`}>
                    <button className="faq-question-btn" onClick={() => toggleAccordion(index)}>
                      {item.question}
                      <span className="faq-toggle-icon">
                        {isActive ? "✕" : "＋"}
                      </span>
                    </button>
                    <div className="faq-answer">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Kolona e Djathtë: Fotoja Asimetrike */}
          <div className="faq-image-column">
            <div className="faq-img-wrapper">
              <img
                src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=600"
                alt="Luxury Giorgio Armani Scent"
                className="faq-luxury-img"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FAQ;