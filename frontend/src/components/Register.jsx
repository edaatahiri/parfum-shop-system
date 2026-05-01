import React, { useState } from "react";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    emri: "",
    mbiemri: "",
    email: "",
    password: "",
    phone_number: "",
  });

  const [message, setMessage] = useState({ text: "", type: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      setMessage({ text: "Password-i eshte shume i shkurter!", type: "error" });
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({ text: result.message, type: "success" });
        setFormData({
          emri: "",
          mbiemri: "",
          email: "",
          password: "",
          phone_number: "",
        });
      } else {
        setMessage({ text: result.error, type: "error" });
      }
    } catch (err) {
      setMessage({ text: "Gabim gjate lidhjes me serverin!", type: "error" });
    }
  };
  return (
    //Template i gatshem per register
    <div className="container">
      <div className="mainBox">
        <div className="centeredBox">
          <div className="signupForm">
            <div className="mainSignupBox">
              <div className="signupTitle">Krijo Llogari</div>

              <form onSubmit={handleSubmit} className="signupFormInput">
                <div className="input">
                  <input
                    type="text"
                    name="emri"
                    placeholder="Emri"
                    value={formData.emri}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input">
                  <input
                    type="text"
                    name="mbiemri"
                    placeholder="Mbiemri"
                    value={formData.mbiemri}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input">
                  <input
                    type="password"
                    name="password"
                    placeholder="Fjalëkalimi (min. 6 karaktere)"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input">
                  <input
                    type="text"
                    name="phone_number"
                    placeholder="Nr. Telefonit (Opsionale)"
                    value={formData.phone_number}
                    onChange={handleChange}
                  />
                </div>

                {message.text && (
                  <div className={`message-display ${message.type}`}>
                    {message.text}
                  </div>
                )}

                <div className="btnBox">
                  <button type="submit" className="signupBtn">
                    Regjistrohu
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
