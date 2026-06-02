import React, { useState } from "react";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    emri: "",
    mbiemri: "",
    email: "",
    password: "",
    phone_number: "",
    data_lindjes: "",
    gjinia: "",
    adresa: "",
    role: "User",
  });

  const [message, setMessage] = useState({ text: "", type: "" });
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (fieldErrors[e.target.name]) {
      setFieldErrors({ ...fieldErrors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;

    if (!formData.emri.trim()) errors.emri = "First Name is required!";
    if (!formData.mbiemri.trim()) errors.mbiemri = "Last Name is required!";
    if (!formData.data_lindjes) errors.data_lindjes = "Birth date is required!";
    if (!formData.gjinia) errors.gjinia = "Gender is required!";
    if (!formData.adresa.trim()) errors.adresa = "Address is required!";

    if (!formData.email.trim()) {
      errors.email = "Email Address is required!";
    } else if (!emailRegex.test(formData.email)) {
      errors.email =
        "Please enter a valid email address(e.g. name@example.com)!";
    }

    if (!formData.password) {
      errors.password = "Password is required!";
    } else if (!passwordRegex.test(formData.password)) {
      errors.password =
        "Password must be at least 6 characters, contain 1 uppercase letter and 1 number!";
    }

    if (formData.phone_number && !/^\d+$/.test(formData.phone_number)) {
      errors.phone_number = "Phone number must contain digits only!";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    if (!validateForm()) {
      setMessage({
        text: "PLEASE FIX THE ERRORS BELOW BEFORE SUBMITTING!",
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

      if (!response.ok) {
        setMessage({
          text: result.error || "SOMETHING WENT WRONG!",
          type: "error",
        });
      } else {
        setMessage({
          text: "REGISTRATION SUCCESSFUL! YOU CAN NOW LOGIN.",
          type: "success",
        });
        setFormData({
          emri: "",
          mbiemri: "",
          email: "",
          password: "",
          phone_number: "",
          data_lindjes: "",
          gjinia: "",
          adresa: "",
          role: "User",
        });
        setFieldErrors({});
      }
    } catch (error) {
      setMessage({
        text: "SERVER ERROR! PLEASE TRY AGAIN LATER.",
        type: "error",
      });
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-container">
        <h2>Create Account</h2>
        <p>Join our exclusive perfume collection</p>

        {message.text && (
          <div
            className={`message-box ${message.type === "error" ? "error-msg" : "success-msg"}`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <input
              type="text"
              name="emri"
              placeholder="First Name"
              value={formData.emri}
              onChange={handleChange}
              className={fieldErrors.emri ? "input-error" : ""}
            />
            {fieldErrors.emri && (
              <span className="error-text">{fieldErrors.emri}</span>
            )}
          </div>

          <div className="form-group">
            <input
              type="text"
              name="mbiemri"
              placeholder="Last Name"
              value={formData.mbiemri}
              onChange={handleChange}
              className={fieldErrors.mbiemri ? "input-error" : ""}
            />
            {fieldErrors.mbiemri && (
              <span className="error-text">{fieldErrors.mbiemri}</span>
            )}
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className={fieldErrors.email ? "input-error" : ""}
            />
            {fieldErrors.email && (
              <span className="error-text">{fieldErrors.email}</span>
            )}
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={fieldErrors.password ? "input-error" : ""}
            />
            {fieldErrors.password && (
              <span className="error-text">{fieldErrors.password}</span>
            )}
          </div>

          <div className="form-group">
            <input
              type="text"
              name="phone_number"
              placeholder="Phone Number"
              value={formData.phone_number}
              onChange={handleChange}
              className={fieldErrors.phone_number ? "input-error" : ""}
            />
            {fieldErrors.phone_number && (
              <span className="error-text">{fieldErrors.phone_number}</span>
            )}
          </div>

          <div className="form-group">
            <input
              type="date"
              name="data_lindjes"
              value={formData.data_lindjes}
              onChange={handleChange}
              className={fieldErrors.data_lindjes ? "input-error" : ""}
            />
            {fieldErrors.data_lindjes && (
              <span className="error-text">{fieldErrors.data_lindjes}</span>
            )}
          </div>

          <div className="form-group">
            <select
              name="gjinia"
              value={formData.gjinia}
              onChange={handleChange}
              className={fieldErrors.gjinia ? "input-error" : ""}
            >
              <option value="">Gender</option>
              <option value="Mashkull">Male</option>
              <option value="Femer">Female</option>
            </select>
            {fieldErrors.gjinia && (
              <span className="error-text">{fieldErrors.gjinia}</span>
            )}
          </div>

          <div className="form-group">
            <input
              type="text"
              name="adresa"
              placeholder="Address"
              value={formData.adresa}
              onChange={handleChange}
              className={fieldErrors.adresa ? "input-error" : ""}
            />
            {fieldErrors.adresa && (
              <span className="error-text">{fieldErrors.adresa}</span>
            )}
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
