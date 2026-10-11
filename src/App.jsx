
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth";
import Navbar from "./assets/Component/Navbar";
import Home from "./assets/Pages/Home";
import RegisterDonor from "./assets/Pages/RegisterDonor";
import AdminLogin from "./assets/Pages/AdminLogin";
import Donors from "./assets/Pages/Donors";
import AddDonation from "./assets/Pages/AddDonation";
import Donations from "./assets/Pages/Donations";
import Dashboard from "./assets/Pages/Dashboard";
import PublicDonate from "./assets/Pages/PublicDonate";
import ProtectedRoute from "./ProtectedRoute";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegisterDonor />} />
            <Route path="/donate" element={<PublicDonate />} />
            <Route path="/admin-login" element={<AdminLogin />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/donors" element={<Donors />} />
              <Route path="/admin/add-donation" element={<AddDonation />} />
              <Route path="/donations" element={<Donations />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>

            <Route
              path="*"
              element={<div className="page"><h2>Page not found</h2></div>}
            />
          </Routes>
        </main>
      </AuthProvider>
    </BrowserRouter>
  );
}
