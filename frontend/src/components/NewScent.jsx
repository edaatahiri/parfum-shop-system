import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Shop.css"; // Përdorim CSS-in tuaj ekzistues

const NewScent = () => {
  const [perfume, setPerfume] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNewScent = async () => {
      try {
        // Thërrasim API-në e backend-it tënd në portin 5000
        const res = await axios.get("http://localhost:5000/api/parfumet");
        
        // Gjejmë parfumin Férox që sapo shtove me seed
        const ferox = res.data.find(p => p.emri.toLowerCase() === "férox");
        
        setPerfume(ferox);
        setLoading(false);
      } catch (err) {
        console.error("Gabim gjatë marrjes së parfumit:", err);
        setLoading(false);
      }
    };

    fetchNewScent();
  }, []);

  if (loading) {
    return <div style={{ textAlign: "center", marginTop: "50px" }}>Duke u ngarkuar...</div>;
  }

  // Nëse nuk gjendet në DB, përdorim nota rezervë që mos të mbesë zbrazët
  const notes = perfume && perfume.notat_ere 
    ? perfume.notat_ere.split(",").map(n => n.trim()) 
    : ["Jasmine", "Rose", "Green tea", "Vanilla", "Sandalwood", "Musk"];

  const shortDescriptions = [
    "Softly charming.",
    "Velvety & romantic.",
    "Airy and fresh.",
    "Warm & enveloping.",
    "Smooth and grounding.",
    "Sensual & lasting."
  ];

  return (
    <div className="homepage-wrapper">
      {/* Butoni për kthim pas */}
      <button 
        onClick={() => navigate("/")} 
        style={{
          margin: "20px", padding: "10px 20px", background: "#b89453", 
          color: "white", border: "none", cursor: "pointer", borderRadius: "4px"
        }}
      >
        &larr; Kthehu në Ballinë
      </button>

      <section className="new-scent-luxury-section" style={{ marginTop: "20px" }}>
        <div className="section-header-luxury">
          <span className="luxury-subtitle">- NEW SCENT -</span>
          <h2 className="luxury-title">Layers of <span>Scent</span> "Unfolding Like a Story"</h2>
          <p className="luxury-instruction">
            {perfume?.pershkrimi || "Every fragrance begins with a spark — a moment, a memory, a whisper of emotion."}
          </p>
        </div>

        <div className="scent-story-container">
          {/* Kolona e Majtë: Notat 1, 2, 3 */}
          <div className="scent-notes-column column-left">
            <div className="note-item">
              <span className="note-number">1ST NOTE</span>
              <h4 className="note-name">{notes[0]}</h4>
              <p className="note-desc">{shortDescriptions[0]}</p>
            </div>
            <div className="note-item">
              <span className="note-number">2ND NOTE</span>
              <h4 className="note-name">{notes[1]}</h4>
              <p className="note-desc">{shortDescriptions[1]}</p>
            </div>
            <div className="note-item">
              <span className="note-number">3RD NOTE</span>
              <h4 className="note-name">{notes[2]}</h4>
              <p className="note-desc">{shortDescriptions[2]}</p>
            </div>
          </div>

          {/* Fotoja në Qendër - e merr direkt foton e ngarkuar */}
          <div className="scent-center-display">
            <div className="spotlight-perfume-img">
              <img 
                src="/images/image_e56073.jpeg" 
                alt={perfume?.emri || "Férox"} 
                className="spotlight-perfume-img"
                onError={(e) => {
                  // Nëse nuk gjendet në public/images/, shfaqet kjo si rezervë
                  e.target.src = "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500";
                }}
              />
            </div>
          </div>

          {/* Kolona e Djathtë: Notat 4, 5, 6 */}
          <div className="scent-notes-column column-right">
            <div className="note-item">
              <span className="note-number">4TH NOTE</span>
              <h4 className="note-name">{notes[3]}</h4>
              <p className="note-desc">{shortDescriptions[3]}</p>
            </div>
            <div className="note-item">
              <span className="note-number">5TH NOTE</span>
              <h4 className="note-name">{notes[4]}</h4>
              <p className="note-desc">{shortDescriptions[4]}</p>
            </div>
            <div className="note-item">
              <span className="note-number">6TH NOTE</span>
              <h4 className="note-name">{notes[5]}</h4>
              <p className="note-desc">{shortDescriptions[5]}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewScent;