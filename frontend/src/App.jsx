import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import ParfumCard from "./components/ParfumCard";

function App() {
  const [parfumet, setParfumet] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/parfumet")
      .then((res) => setParfumet(res.data))
      .catch((err) => console.error("Gabim:", err));
  }, []);

  return (
    <div className="container">
      <header>
        <h1>Parfum Shop</h1>
      </header>
      <section className="parfum-grid">
        {parfumet.map((parfumi) => (
          <ParfumCard key={parfumi.parfum_id} p={parfumi} />
        ))}
      </section>
    </div>
  );
}

export default App;
