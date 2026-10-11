import { useCallback, useEffect, useState } from "react";
import { supabase } from "../../supabase";

export default function Donations() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDonations = useCallback(async () => {
    setLoading(true);
    setError("");

    const { data, error: queryError } = await supabase
      .from("donations")
      .select(`
        id,
        donor_id,
        donor_name_snapshot,
        donor_code_snapshot,
        amount,
        purpose,
        donation_date,
        created_at
      `)
      .order("donation_date", { ascending: false });

    if (queryError) setError(queryError.message);
    else setDonations(data || []);

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchDonations();
  }, [fetchDonations]);

  async function deleteDonation(id) {
    if (!window.confirm("Delete this donation record?")) return;

    const { error: deleteError } = await supabase
      .from("donations")
      .delete()
      .eq("id", id);

    if (deleteError) {
      setError(deleteError.message);
      return;
    }

    fetchDonations();
  }

  const total = donations.reduce(
    (sum, donation) => sum + Number(donation.amount || 0),
    0
  );

  return (
    <section className="page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">ADMINISTRATION</span>
          <h1>Donation history</h1>
          <p>Review contributions and their recorded purposes.</p>
        </div>

        <button className="button" onClick={fetchDonations}>
          Refresh
        </button>
      </div>

      <div className="summary-card">
        <span>Total recorded donations</span>
        <strong>₹{total.toLocaleString("en-IN", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })}</strong>
        <span>{donations.length} donation record(s)</span>
      </div>

      {loading && <p>Loading donations...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && donations.length === 0 && (
        <div className="empty-state">No donations have been recorded yet.</div>
      )}

      {!loading && donations.length > 0 && (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Donor code</th>
                <th>Donor name</th>
                <th>Amount</th>
                <th>Purpose</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation) => (
                <tr key={donation.id}>
                  <td>{donation.donor_code_snapshot || "—"}</td>
                  <td>{donation.donor_name_snapshot || "Donor unavailable"}</td>
                  <td>
                    ₹{Number(donation.amount).toLocaleString("en-IN", {
                      minimumFractionDigits: 2
                    })}
                  </td>
                  <td>{donation.purpose}</td>
                  <td>{donation.donation_date}</td>
                  <td>
                    <button
                      className="danger-button"
                      onClick={() => deleteDonation(donation.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}