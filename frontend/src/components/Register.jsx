import React, { useState } from "react";
import axios from "axios";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    emri: "",
    mbiemri: "",
    email: "",
    password_hash: "",
    phone_number: "",
    role: "User",
  });

  const [message, setMessage] = useState({ text: "", type: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    if (formData.password_hash.length < 6) {
      setMessage({
        text: "Password is too short(min 6 characters)!",
        type: "error",
      });
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
        setMessage({ text: "Account created successfully!", type: "success" });
        setFormData({
          emri: "",
          mbiemri: "",
          email: "",
          password_hash: "",
          phone_number: "",
          role: "User",
        });
      } else {
        setMessage({ text: result.error, type: "error" });
      }
    } catch (err) {
      setMessage({ text: "Connection error with the server!", type: "error" });
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-container">
        <h2>Create Account</h2>
        <p>Join our exclusive perfume collection</p>

        {message.text && (
          <div className={`message-container show ${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="emri"
              placeholder="First Name"
              value={formData.emri}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="mbiemri"
              placeholder="Last Name"
              value={formData.mbiemri}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password_hash"
              placeholder="Password"
              value={formData.password_hash}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="phone_number"
              placeholder="Phone Number"
              value={formData.phone_number}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="register-button">
            REGISTER
          </button>
        </form>
        <div className="login-link">
          Already have an account? <a href="/login">LOGIN HERE</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
