import React, { Suspense, lazy } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = lazy(() => import("./components/Register"));
const Login = lazy(() => import("./components/Login"));
const AdminDashboard = lazy(() => import("./admin/AdminDashboard"));
const Shop = lazy(() => import("./components/Shop"));
const Catalog = lazy(() => import("./components/Catalog"));
const Testimonials = lazy(() => import("./components/Testimonials"));
const FAQ = lazy(() => import("./components/FAQ"));
const AboutStore = lazy(() => import("./components/AboutStore"));
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute"));
const Wishlist = lazy(() => import("./components/Wishlist"));
const UserProfile = lazy(() => import("./components/UserProfile"));

function App() {
  return (
    <>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
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
        </Suspense>
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
