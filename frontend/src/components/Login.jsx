import { useState } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Ndryshuar në 'password' që të jetë e thjeshtë
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validim në frontend para se të dërgohet fare në backend
    if (!email.trim() || !password.trim()) {
      alert("Ju lutem plotësoni të gjitha fushat në formë!");
      return;
    }

    try {
      // Dërgohen saktë 'email' dhe 'password' ashtu siç i pret backend-i
      const res = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      const user = res.data.user;

      // Ruajmë përdoruesin në localStorage
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/");
      
    } catch (err) {
      // Shfaq mesazhin e saktë që vjen nga backend-i në rast gabimi
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Ndryshuar këtu
            />
          </div>

          <button className="login-button" type="submit">
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

