import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../supabase";
import { useAuth } from "../../auth";

export default function AdminLogin() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!authLoading && user && isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    const { data, error: loginError } =
      await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password
      });

    if (loginError) {
      setError("Login failed. Check your email and password.");
      setSubmitting(false);
      return;
    }

    if (data.user?.app_metadata?.role !== "admin") {
      await supabase.auth.signOut();
      setError("This account is not authorized as an administrator.");
      setSubmitting(false);
      return;
    }

    navigate(location.state?.from || "/dashboard", { replace: true });
    setSubmitting(false);
  }

  return (
    <section className="form-page">
      <div className="form-intro">
        <span className="eyebrow">RESTRICTED ACCESS</span>
        <h1>Administrator login</h1>
        <p>Sign in to manage donor and donation records.</p>
      </div>

      <form className="form-card" onSubmit={handleSubmit}>
        <label>
          Email address
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="username"
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
          />
        </label>

        {error && <p className="error-message">{error}</p>}

        <button className="button full-button" disabled={submitting}>
          {submitting ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </section>
  );
}