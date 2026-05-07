import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import AdminDashboard from "./admin/AdminDashboard";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
