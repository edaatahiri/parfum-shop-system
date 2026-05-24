import React, { act, useEffect, useState } from "react";
import "./AdminDashboard.css";
import API from "../axiosConfig";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [perfumes, setPerfumes] = useState([]);
  const [adminName, setAdminName] = useState("Admin");

  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  const [notification, setNotification] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [perfumeToDelete, setPerfumeToDelete] = useState(null);

  const [orders, setOrders] = useState([]);

  const [users, setUsers] = useState([]);

  const [stats, setStats] = useState({
    totalParfumes: 0,
    totalUsers: 0,
    totalSales: 0,
    lowStockAlerts: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [newPerfume, setNewPerfume] = useState({
    emri: "",
    gjinia_target: "Unisex",
    volumi_ml: "",
    cmimi: "",
    sasia_stok: "",
    pershkrimi: "",
    notat_ere: "",
    kategoria_id: "",
    marka_id: "",
  });

  const [samples, setSamples] = useState([]);
  const [newSample, setNewSample] = useState({
    parfum_id: "",
    sasia_stok: "",
    volumi_ml: "2",
    statusi: "Available",
  });

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      setNotification("");

      const [
        perfumesRes,
        brandsRes,
        categoriesRes,
        ordersRes,
        usersRes,
        samplesRes,
      ] = await Promise.all([
        API.get("/parfumet"),
        API.get("/marka"),
        API.get("/kategorite"),
        API.get("/shitjet"),
        API.get("/users"),
        API.get("/mostrat"),
      ]);

      setPerfumes(perfumesRes.data);
      setBrands(brandsRes.data);
      setCategories(categoriesRes.data);
      setOrders(ordersRes.data);
      setUsers(usersRes.data);
      setSamples(samplesRes.data);

      const lowStockCount = perfumesRes.data.filter(
        (p) => p.sasia_stok < 5,
      ).length;
      const totalSalesSum = ordersRes.data.reduce(
        (sum, order) => sum + (order.shuma_totale || 0),
        0,
      );

      setStats({
        totalParfumes: perfumesRes.data.length,
        totalUsers: usersRes.data.length,
        totalSales: totalSalesSum,
        lowStockAlerts: lowStockCount,
      });
    } catch (err) {
      console.error("Error fetching data: ", err);
      setError("Dështoi ngarkimi i të dhënave nga serveri.");
      if (
        err.response &&
        (err.response.status === 401 || err.response.status === 403)
      ) {
        setNotification("Access denied! Please log in again.");
      } else {
        setNotification("An error occurred while loading dashboard data.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) setAdminName(storedName);

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPerfume({
      ...newPerfume,
      [name]: value,
    });
  };

  const handleCancelEdit = () => {
    setNewPerfume({
      emri: "",
      gjinia_target: "Unisex",
      volumi_ml: "",
      cmimi: "",
      sasia_stok: "",
      pershkrimi: "",
      notat_ere: "",
      kategoria_id: "",
      marka_id: "",
    });
    setIsEditing(false);
    setEditId(null);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const perfumeData = {
        ...newPerfume,
        volumi_ml: parseInt(newPerfume.volumi_ml),
        cmimi: parseFloat(newPerfume.cmimi),
        sasia_stok: parseInt(newPerfume.sasia_stok),
        kategoria_id: parseInt(newPerfume.kategoria_id),
        marka_id: parseInt(newPerfume.marka_id),
      };

      if (isEditing) {
        await API.put(`/parfumet/${editId}`, perfumeData);
        setNotification("Product updated successfully!");
        setActiveTab("products");
        setIsEditing(false);
        setEditId(null);
      } else {
        await API.post("/parfumet", perfumeData);
        setNotification("Product added successfully!");
      }

      setNewPerfume({
        emri: "",
        gjinia_target: "Unisex",
        volumi_ml: "",
        cmimi: "",
        sasia_stok: "",
        pershkrimi: "",
        notat_ere: "",
        kategoria_id: "",
        marka_id: "",
      });

      handleCancelEdit();
      fetchData();

      setTimeout(() => {
        setNotification("");
      }, 3000);
    } catch (err) {
      console.error("Error saving perfume:", err);
      setNotification("Error saving product. Please try again.");
      setTimeout(() => setNotification(""), 3000);
    }
  };

  const handleSampleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSample({
      ...newSample,
      [name]: value,
    });
  };

  const handleSampleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const sampleData = {
        parfum_id: parseInt(newSample.parfum_id),
        sasia_stok: parseInt(newSample.sasia_stok),
        volumi_ml: parseInt(newSample.volumi_ml),
        statusi: newSample.statusi,
      };

      await API.post("/mostrat", sampleData);
      setNotification("Sample added successfully!");

      setNewSample({
        parfum_id: "",
        sasia_stok: "",
        volumi_ml: "2",
        statusi: "Available",
      });

      fetchData();
      setTimeout(() => setNotification(""), 3000);
    } catch (err) {
      console.error("Error saving sample:", err);
      setNotification("Error saving sample.Please try again.");
      setTimeout(() => setNotification(""), 3000);
    }
  };

  const handleDeletePerfume = (id) => {
    setPerfumeToDelete(id);
    setShowModal(true);
  };
  const confirmDeletePerfume = async () => {
    try {
      await API.delete(`/parfumet/${perfumeToDelete}`);
      setNotification("Product deleted successfully!");
      setShowModal(false);
      setPerfumeToDelete(null);
      fetchData();

      setTimeout(() => {
        setNotification("");
      }, 3000);
    } catch (err) {
      console.error("Error deleting perfume: ", err);
      setNotification("Error deleting product. Please try again.");
      setShowModal(false);

      setTimeout(() => {
        setNotification("");
      }, 3000);
    }
  };

  const handleEditClick = (perfume) => {
    setIsEditing(true);
    setEditId(perfume.parfum_id);
    setNewPerfume({
      emri: perfume.emri,
      gjinia_target: perfume.gjinia_target,
      volumi_ml: perfume.volumi_ml,
      cmimi: perfume.cmimi,
      sasia_stok: perfume.sasia_stok,
      pershkrimi: perfume.pershkrimi || "",
      notat_ere: perfume.notat_ere || "",
      kategoria_id: perfume.kategoria_id,
      marka_id: perfume.marka_id,
    });
    setActiveTab("dashboard");
  };

  return (
    <div className="dashboard-wrapper">
      <nav className="sidebar">
        <div className="sidebar-logo">PARFUM ADMIN</div>
        <ul>
          <li
            className={activeTab === "dashboard" ? "active" : ""}
            onClick={() => setActiveTab("dashboard")}
          >
            Dashboard
          </li>
          <li
            className={activeTab === "products" ? "active" : ""}
            onClick={() => setActiveTab("products")}
          >
            Products
          </li>
          <li
            className={activeTab === "orders" ? "active" : ""}
            onClick={() => setActiveTab("orders")}
          >
            Orders
          </li>
          <li
            className={activeTab === "users" ? "active" : ""}
            onClick={() => setActiveTab("users")}
          >
            Users
          </li>
          <li onClick={() => (window.location.href = "/")}>Back to Shop</li>
        </ul>
      </nav>

      <main className="main-content">
        <header className="main-header">
          <h1>
            {activeTab === "dashboard"
              ? "Dashboard Overview"
              : activeTab.toUpperCase()}
          </h1>
          <div className="admin-profile">Welcome,{adminName}</div>
        </header>

        {notification && (
          <div className="form-notification">{notification}</div>
        )}

        {activeTab === "dashboard" && (
          <>
            {loading ? (
              <div
                className="loading-spinner"
                style={{
                  textAlign: "center",
                  padding: "30px",
                  color: "#baa373",
                }}
              >
                Duke ngarkuar të dhënat reale nga sistemi...
              </div>
            ) : error ? (
              <div
                className="error-message"
                style={{ textAlign: "center", padding: "30px", color: "red" }}
              >
                {error}
              </div>
            ) : (
              <section className="stats-grid">
                <div className="stat-card">
                  <h3>Total Products</h3>
                  <p className="stat-number">{perfumes.length}</p>
                </div>
                <div className="stat-card">
                  <h3>Active Orders</h3>
                  <p className="stat-number">{orders.length}</p>
                </div>
                <div className="stat-card">
                  <h3>Total Users</h3>
                  <p className="stat-number">{users.length}</p>
                </div>
                <div className="stat-card">
                  <h3>Total Sales</h3>
                  <p className="stat-number" style={{ color: "#2ecc71" }}>
                    ${stats.totalSales.toFixed(2)}
                  </p>
                </div>
                <div className="stat-card">
                  <h3>Low Stock Alerts</h3>
                  <p
                    className="stat-number"
                    style={{
                      color: stats.lowStockAlerts > 0 ? "#e74c3c" : "inherit",
                    }}
                  >
                    {stats.lowStockAlerts} artikuj
                  </p>
                </div>
              </section>
            )}

            <section className="add-product-section">
              <h2>{isEditing ? "Edit Perfume" : "Add New Perfume"}</h2>
              {notification && (
                <div className="form-notification">{notification}</div>
              )}
              <form onSubmit={handleFormSubmit} className="add-perfume-form">
                <input
                  type="text"
                  name="emri"
                  placeholder="Perfume Name"
                  value={newPerfume.emri}
                  onChange={handleInputChange}
                  required
                />
                <select
                  name="gjinia_target"
                  value={newPerfume.gjinia_target}
                  onChange={handleInputChange}
                  required
                  className="form-select"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Unisex">Unisex</option>
                </select>
                <input
                  type="number"
                  name="volumi_ml"
                  placeholder="Volume (ml)"
                  value={newPerfume.volumi_ml}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="number"
                  step="0.01"
                  name="cmimi"
                  placeholder="Price ($)"
                  value={newPerfume.cmimi}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="number"
                  name="sasia_stok"
                  placeholder="Stock"
                  value={newPerfume.sasia_stok}
                  onChange={handleInputChange}
                  required
                />
                <select
                  name="kategoria_id"
                  value={newPerfume.kategoria_id}
                  onChange={handleInputChange}
                  required
                  className="form-select"
                >
                  <option value="">Select Category</option>
                  {categories.map((kat) => (
                    <option key={kat.kategori_id} value={kat.kategori_id}>
                      {kat.emri}
                    </option>
                  ))}
                </select>

                <select
                  name="marka_id"
                  value={newPerfume.marka_id}
                  onChange={handleInputChange}
                  required
                  className="form-select"
                >
                  <option value="">Select Brand</option>
                  {brands.map((b) => (
                    <option key={b.marka_id} value={b.marka_id}>
                      {b.emri}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  name="notat_ere"
                  placeholder="Scent Notes (e.g. Vanilla, Jasmin)"
                  value={newPerfume.notat_ere}
                  onChange={handleInputChange}
                />
                <textarea
                  name="pershkrimi"
                  placeholder="Perfume Description..."
                  value={newPerfume.pershkrimi}
                  onChange={handleInputChange}
                  rows="4"
                ></textarea>

                <div className="form-buttons-container">
                  <button type="submit" className="add-btn">
                    {isEditing ? "Update Product" : "Add Product"}
                  </button>
                  {isEditing && (
                    <button
                      type="button"
                      className="cancel-btn"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </section>
            <section
              className="add-product-section"
              style={{ marginTop: "40px" }}
            >
              <h2>Add Perfume Sample</h2>
              <form
                onSubmit={handleSampleFormSubmit}
                className="add-perfume-form"
              >
                <select
                  name="parfum_id"
                  value={newSample.parfum_id}
                  onChange={handleSampleInputChange}
                  required
                  className="form-select"
                >
                  <option value="">Select Perfume for Sample</option>
                  {perfumes.map((p) => (
                    <option key={p.parfum_id} value={p.parfum_id}>
                      {p.emri} ({p.marka?.emri || "No Brand"})
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  name="volumi_ml"
                  placeholder="Volume (ml) - e.g. 2"
                  value={newSample.volumi_ml}
                  onChange={handleSampleInputChange}
                  required
                />

                <input
                  type="number"
                  name="sasia_stok"
                  placeholder="Sample Stock Quantity"
                  value={newSample.sasia_stok}
                  onChange={handleSampleInputChange}
                  required
                />

                <select
                  name="statusi"
                  value={newSample.statusi}
                  onChange={handleSampleInputChange}
                  required
                  className="form-select"
                >
                  <option value="Disponueshem">Disponueshem</option>
                  <option value="Jo Disponueshem">Jo Disponueshem</option>
                </select>

                <div className="form-buttons-container">
                  <button type="submit" className="add-btn">
                    Add Sample Gift
                  </button>
                </div>
              </form>
            </section>
          </>
        )}

        {activeTab === "products" && (
          <section className="recent-products animated-fade">
            <div className="section-header-flex">
              <h2>Product Inverntory</h2>
              <button
                className="luxury-shortcut-btn"
                onClick={() => setActiveTab("dashboard")}
              >
                {" "}
                + Add Product
              </button>
            </div>
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
                {perfumes.length > 0 ? (
                  perfumes.map((p) => (
                    <tr key={p.parfum_id}>
                      <td>#{p.parfum_id}</td>
                      <td className="table-perfume-title">{p.emri}</td>
                      <td>{p.marka?.emri || "N/A"}</td>
                      <td className="table-price">${p.cmimi}</td>
                      <td>
                        <span
                          className={`stock-indicator ${p.sasia_stok === 0 ? "out" : p.sasia_stok < 5 ? "low" : "good"}`}
                        >
                          {p.sasia_stok} pcs
                        </span>
                      </td>
                      <td>
                        <div className="table-actions">
                          <button
                            className="edit-btn"
                            onClick={() => handleEditClick(p)}
                          >
                            Edit
                          </button>
                          <button
                            className="delete-btn"
                            onClick={() => handleDeletePerfume(p.parfum_id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      style={{
                        textAlign: "center",
                        padding: "30px",
                        color: "#888",
                      }}
                    >
                      No products found in database.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>
        )}

        {activeTab === "orders" && (
          <section className="recent-product animated-fade">
            <div className="section-header-flex">
              <h2>Customer Orders</h2>
              <div className="orders-count-badge">
                Total: {orders.length} Orders
              </div>
            </div>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Total Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <tr key={order.shitje_id}>
                      <td>#SALE-{order.shitje_id}</td>
                      <td className="table-perfume-title">
                        {order.klient
                          ? `${order.klient.emri} ${order.klient.mbiemri}`
                          : "Unknown Customes"}
                      </td>
                      <td>
                        {new Date(order.data_shitjes).toLocaleDateString()}
                      </td>
                      <td>{order.metoda_pageses}</td>
                      <td className="table-price">
                        ${order.shuma_totale.toFixed(2)}
                      </td>
                      <td>
                        <div className="table-actions">
                          <button
                            className="edit-btn"
                            onClick={() =>
                              alert(
                                `Sasia e artikujve: ${order.detajet?.length || 0}`,
                              )
                            }
                          >
                            View Details
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      style={{
                        textAlign: "center",
                        padding: "30px",
                        color: "#888",
                      }}
                    >
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>
        )}

        {activeTab === "users" && (
          <section className="recent-product animated-fade">
            <div className="section-header-flex">
              <h2>Registered Users</h2>
              <div className="orders-count-badge">
                Total: {users.length} Users
              </div>
            </div>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user.id}>
                      <td>#{user.id}</td>
                      <td className="table-perfume-title">
                        {user.emri} {user.mbiemri}
                      </td>
                      <td>{user.email}</td>
                      <td>{user.phone_number}</td>
                      <td>
                        <span
                          className={`order-status ${user.statusi === "Active" ? "delivered" : "pending"}`}
                        >
                          {user.statusi}
                        </span>
                      </td>
                      <td>
                        {new Date(user.data_krijimit).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      style={{
                        textAlign: "center",
                        padding: "30px",
                        color: "#888",
                      }}
                    >
                      {" "}
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>
        )}
      </main>
      {showModal && (
        <div className="custom-modal-overlay">
          <div className="custom-modal">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this perfume?</p>
            <div className="modal-buttons">
              <button
                className="modal-confirm-btn"
                onClick={confirmDeletePerfume}
              >
                Confirm
              </button>
              <button
                className="modal-cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
