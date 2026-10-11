import { useCallback, useEffect, useState } from "react";
import { supabase } from "../../supabase";

export default function Dashboard() {
  const [stats, setStats] = useState({
    donors: 0,
    donations: 0,
    total: 0
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError("");

    const [donorsResult, donationsResult] = await Promise.all([
      supabase.from("donors").select("id"),
      supabase.from("donations").select("id, amount")
    ]);

    if (donorsResult.error || donationsResult.error) {
      setError(
        donorsResult.error?.message ||
        donationsResult.error?.message ||
        "Unable to load dashboard."
      );
      setLoading(false);
      return;
    }

    const donations = donationsResult.data || [];

    setStats({
      donors: donorsResult.data?.length || 0,
      donations: donations.length,
      total: donations.reduce(
        (sum, donation) => sum + Number(donation.amount || 0),
        0
      )
    });

    setLoading(false);
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  if (loading) {
    return <div className="center">Loading dashboard...</div>;
  }

  return (
    <section className="page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">OVERVIEW</span>
          <h1>Admin dashboard</h1>
          <p>Summary of your donation management activity.</p>
        </div>

        <button className="button" onClick={loadDashboard}>
          Refresh
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="stats-grid">
        <article className="stat-card">
          <span>Registered donors</span>
          <strong>{stats.donors}</strong>
        </article>

        <article className="stat-card">
          <span>Donation records</span>
          <strong>{stats.donations}</strong>
        </article>

        <article className="stat-card">
          <span>Total contributions</span>
          <strong>
            ₹{stats.total.toLocaleString("en-IN", {
              maximumFractionDigits: 2
            })}
          </strong>
        </article>
      </div>
    </section>
  );
}