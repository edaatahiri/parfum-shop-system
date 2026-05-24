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

      /*e re*/
      const { user, accessToken, token } = res.data;
      const finalToken = accessToken || token;

      const userRole = user.userRoles?.[0]?.role?.emertimi || "User";

      const userToStore = {
        id: user.id,
        emri: user.emri,
        mbiemri: user.mbiemri,
        email: user.email,
        role: userRole,
      };

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", finalToken);
      localStorage.setItem("userName", user.emri);

      if (userRole.trim().toLowerCase() === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
      /*deri qetu*/
    } catch (err) {
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
