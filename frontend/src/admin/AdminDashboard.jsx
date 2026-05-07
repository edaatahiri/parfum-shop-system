import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [prefumes, setPerfumes] = useState([]);
  const [adminName, setAdminName] = useState("Admin");

  useEffect(() => {
    const fetchPerfumes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/perfumes");
        setPerfumes(response.data);
      } catch (err) {
        console.error("Error fetching perfumes:", err);
      }
    };

    const storedName = localStorage.getItem("userName");
    if (storedName) setAdminName(storedName);

    fetchPerfumes();
  }, []);

  return (
    <div className="dashboard-wrapper">
      <nav className="sidebar">
        <div className="sidebard-logo">PARFUM ADMIN</div>
        <ul>
          <li className="active">Dashboard</li>
          <li>Products</li>
          <li>Orders</li>
          <li>Users</li>
          <li onClick={() => (window.location.href = "/")}>Back to Shop</li>
        </ul>
      </nav>

      <main className="main-content">
        <header className="main-header">
          <h1>Dashboard Overview</h1>
          <div className="admin-profile">Welcome,{adminName}</div>
        </header>

        <section className="stats-grid">
          <div className="stat-card">
            <h3>Total Products</h3>
            <p className="stat-number">{prefumes.length}</p>
          </div>
          <div className="stat-card">
            <h3>Active Orders</h3>
            <p className="stat-number">0</p>
          </div>
          <div className="stat-card">
            <h3>Total Users</h3>
            <p className="stat-number">156</p>
          </div>
        </section>

        <section className="recent-products">
          <h2>Product Inverntory</h2>
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Brand</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {prefumes.length > 0 ? (
                prefumes.map((p) => (
                  <tr key={p.parfum_id}>
                    <td>#{p.parfum_id}</td>
                    <td>{p.emri}</td>
                    <td>{p.marka?.emri || "N/A"}</td>
                    <td>#{p.cmimi}</td>
                    <td>{p.sasia_stok}</td>
                    <td>
                      <button className="edit-btn">Edit</button>
                      <button className="delete-btn">Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No products found in database.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
