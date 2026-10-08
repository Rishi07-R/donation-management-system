import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        Donation Management
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/register">Register Donor</Link>
        <Link to="/donors">Donors</Link>
        <Link to="/donate">Donate</Link>
        <Link to="/donations">Donations</Link>
        <Link to="/dashboard">Dashboard</Link>
      </div>
    </nav>
  );
}

export default Navbar;