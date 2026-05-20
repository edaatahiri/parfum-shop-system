import React, { act, useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";

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

  const fetchData = async () => {
    try {
      const perfumesRes = await axios.get("http://localhost:5000/api/parfumet");

      const brandsRes = await axios.get("http://localhost:5000/api/marka");

      const categoriesRes = await axios.get(
        "http://localhost:5000/api/kategorite",
      );

      setPerfumes(perfumesRes.data);
      setBrands(brandsRes.data);
      setCategories(categoriesRes.data);
    } catch (err) {
      console.error("Error fetching perfumes: ", err);
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
        emri: newPerfume.emri,
        gjinia_target: newPerfume.gjinia_target,
        volumi_ml: newPerfume.volumi_ml,
        cmimi: newPerfume.cmimi,
        sasia_stok: newPerfume.sasia_stok,
        pershkrimi: newPerfume.pershkrimi,
        notat_ere: newPerfume.notat_ere,
        kategoria_id: newPerfume.kategoria_id,
        marka_id: newPerfume.marka_id,
      };
      if (isEditing) {
        await axios.put(
          `http://localhost:5000/api/parfumet/${editId}`,
          perfumeData,
        );
        setNotification("Product updated successfully!");
        setActiveTab("products");
      } else {
        await axios.post("http://localhost:5000/api/parfumet", perfumeData);
        setNotification("Product added successfully!");
      }

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

  const handleDeletePerfume = (id) => {
    setPerfumeToDelete(id);
    setShowModal(true);
  };
  const confirmDeletePerfume = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/parfumet/${perfumeToDelete}`,
      );
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
            <section className="stats-grid">
              <div className="stat-card">
                <h3>Total Products</h3>
                <p className="stat-number">{perfumes.length}</p>
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
              <div className="orders-count-badge">Total: 3 Porosi</div>
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
                <tr>
                  <td>#ORD-9412</td>
                  <td className="table-perfume-title">Eda Tahiri</td>
                  <td>May 20, 2026</td>
                  <td className="table-price">$125.00</td>
                  <td>
                    <span className="order-status pending">Pending</span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button className="edit-btn">View</button>
                      <button className="edit-btn" style={{ color: "#137333" }}>
                        Ship
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>#ORD-9381</td>
                  <td className="table-perfume-title">Rozafe Shkodra</td>
                  <td>May 19,2026</td>
                  <td className="table-price">$85.50</td>
                  <td>
                    <span className="order-status shipped">Shipped</span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button className="edit-btn">View</button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>#ORD-9210</td>
                  <td className="table-perfume-title">Filan Fisteku</td>
                  <td>May 15, 2026</td>
                  <td className="table-price">$210.00</td>
                  <td>
                    <span className="order-status delivered">Delivered</span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button
                        className="edit-btn"
                        disabled
                        style={{ opacity: 0.5 }}
                      >
                        Archived
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        )}

        {activeTab === "users" && (
          <div className="empty-secion-card">
            <h3>USERS Managment coming soon.</h3>
          </div>
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
