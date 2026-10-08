import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./assets/Component/Navbar";

import Home from "./assets/Pages/Home";
import RegisterDonor from "./assets/Pages/RegisterDonor";
import Donors from "./assets/Pages/Donors";
import AddDonation from "./assets/Pages/AddDonation";
import Donations from "./assets/Pages/Donations";
import Dashboard from "./assets/Pages/Dashboard";

import "./App.css";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <main className="main-content">

        <Routes>

          <Route path="/" element={<Home />} />

          <Route
            path="/register"
            element={<RegisterDonor />}
          />

          <Route
            path="/donors"
            element={<Donors />}
          />

          <Route
            path="/donate"
            element={<AddDonation />}
          />

          <Route
            path="/donations"
            element={<Donations />}
          />

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

        </Routes>

      </main>

    </BrowserRouter>
  );
}

export default App;