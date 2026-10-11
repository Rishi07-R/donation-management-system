
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../supabase";
import { useAuth } from "../../auth";

export default function Navbar() {
  const { isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  async function logout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert(error.message);
      return;
    }

    navigate("/");
  }

  return (
    <nav className="navbar">
      <Link to="/" className="logo">MrDonor</Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/register">Register Donor</Link>
        <Link to="/donate">Donate Now</Link>

        {!loading && isAdmin && (
          <>
            <Link to="/donors">Donors</Link>
            <Link to="/admin/add-donation">Record Donation</Link>
            <Link to="/donations">Donations</Link>
            <Link to="/dashboard">Dashboard</Link>
            <button className="nav-button" onClick={logout}>
              Logout
            </button>
          </>
        )}

        {!loading && !isAdmin && (
          <Link to="/admin-login">Admin Login</Link>
        )}
      </div>
    </nav>
  );
}
