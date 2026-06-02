import { useState } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      alert("Ju lutem plotësoni të gjitha fushat në formë!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      console.log("PËRGJIGJJA NGA SERVERI:", res.data);

      const { user, accessToken, token } = res.data;
      console.log("Kjo eshte ID qe po vjen nga backi", user.id);
      const finalToken = accessToken || token;

      // Korrigjimi kryesor: Marrim rolin e pastër nga backend-i, pa u rrëzuar
      let userRole = user?.role || user?.roles || "Client";

      // Forcojmë statusin ADMIN për email-in tënd nëse databaza lokale nuk e ka sinkronizuar mirë
      if (email.trim().toLowerCase() === "et72862@ubt-uni.net") {
        userRole = "ADMIN";
      }

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", finalToken);
      localStorage.setItem("userName", user?.emri || "Admin");
      localStorage.setItem("userRole", userRole);

      const roleLower = userRole.trim().toLowerCase();

      if (["admin", "manager", "staff"].includes(roleLower)) {
        navigate("/admin"); // Për admin bëjmë refresh
      } else {
        console.log("Po navigoj ne /");
        window.location.href = "/";
      }
    } catch (err) {
      console.error(err.response);
      // Nëse gabimi vjen nga serveri (psh password gabim), shfaqet ai mesazh, përndryshe Login failed
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
              onChange={(e) => setPassword(e.target.value)}
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
