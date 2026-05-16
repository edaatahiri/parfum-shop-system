import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [perfumes, setPerfumes] = useState([]);
  const [adminName, setAdminName] = useState("Admin");

  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  const [notification, setNotification] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

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

  const handleDeletePerfume = async (id) => {
    if (
      window.confirm("A jeni te sigurte qe deshironi ta fshini kete parfum?")
    ) {
      try {
        await axios.delete(`http://localhost:5000/api/parfumet/${id}`);
        setNotification("Product deleted successfully!");
        fetchData();

        setTimeout(() => {
          setNotification("");
        }, 3000);
      } catch (err) {
        console.error("Error deleting perfume:", err);
        setNotification("Error deleting product. Please try again.");

        setTimeout(() => {
          setNotification("");
        }, 3000);
      }
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
  };

  return (
    <div className="dashboard-wrapper">
      <nav className="sidebar">
        <div className="sidebar-logo">PARFUM ADMIN</div>
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
              {perfumes.length > 0 ? (
                perfumes.map((p) => (
                  <tr key={p.parfum_id}>
                    <td>#{p.parfum_id}</td>
                    <td>{p.emri}</td>
                    <td>{p.marka?.emri || "N/A"}</td>
                    <td>${p.cmimi}</td>
                    <td>{p.sasia_stok}</td>
                    <td>
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
