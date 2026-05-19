import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import AdminDashboard from "./admin/AdminDashboard";
import Shop from "./components/Shop";
import Catalog from "./components/Catalog";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Shop />} />
          <Route path="/admin" element={<AdminDashboard />}></Route>
          <Route path="/catalog" element={<Catalog />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
