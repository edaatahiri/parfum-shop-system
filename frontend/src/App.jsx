import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./components/Register";
import Login from "./components/Login";
import AdminDashboard from "./admin/AdminDashboard";
import Shop from "./components/Shop";
import Catalog from "./components/Catalog";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import AboutStore from "./components/AboutStore";
import ProtectedRoute from "./components/ProtectedRoute";
import Wishlist from "./components/Wishlist";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Shop />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/about-store" element={<AboutStore />} />
        </Routes>
      </Router>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
