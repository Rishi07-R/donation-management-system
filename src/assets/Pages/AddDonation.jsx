import { useEffect, useState } from "react";
import { supabase } from "../../supabase";

export default function AddDonation() {
  const [donors, setDonors] = useState([]);
  const [loadingDonors, setLoadingDonors] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    donor_id: "",
    amount: "",
    purpose: "",
    donation_date: new Date().toISOString().slice(0, 10)
  });

  useEffect(() => {
    async function loadDonors() {
      const { data, error: queryError } = await supabase
        .from("donors")
        .select("id, donor_code, name")
        .order("name");

      if (queryError) setError(queryError.message);
      else setDonors(data || []);

      setLoadingDonors(false);
    }

    loadDonors();
  }, []);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setError("");

    if (!form.donor_id || Number(form.amount) <= 0 || !form.purpose.trim()) {
      setError("Select a donor and enter a valid amount and purpose.");
      return;
    }

    setSubmitting(true);

    const { error: insertError } = await supabase
      .from("donations")
      .insert({
        donor_id: form.donor_id,
        amount: Number(form.amount),
        purpose: form.purpose.trim(),
        donation_date: form.donation_date
      });

    setSubmitting(false);

    if (insertError) {
      setError(insertError.message);
      return;
    }

    setMessage("Donation recorded successfully.");
    setForm({
      donor_id: "",
      amount: "",
      purpose: "",
      donation_date: new Date().toISOString().slice(0, 10)
    });
  }

  return (
    <section className="form-page">
      <div className="form-intro">
        <span className="eyebrow">DONATION MANAGEMENT</span>
        <h1>Record a donation</h1>
        <p>Add a contribution to a registered donor.</p>
      </div>

      <form className="form-card" onSubmit={handleSubmit}>
        <label>
          Select donor
          <select
            name="donor_id"
            value={form.donor_id}
            onChange={handleChange}
            required
            disabled={loadingDonors}
          >
            <option value="">
              {loadingDonors ? "Loading donors..." : "Choose a donor"}
            </option>

            {donors.map((donor) => (
              <option key={donor.id} value={donor.id}>
                {donor.donor_code} — {donor.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Donation amount (₹)
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            min="0.01"
            step="0.01"
            required
          />
        </label>

        <label>
          Purpose
          <input
            name="purpose"
            value={form.purpose}
            onChange={handleChange}
            maxLength="500"
            required
            placeholder="Education, food, medical support..."
          />
        </label>

        <label>
          Donation date
          <input
            type="date"
            name="donation_date"
            value={form.donation_date}
            onChange={handleChange}
            required
          />
        </label>

        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}

        <button
          className="button full-button"
          disabled={submitting || loadingDonors || donors.length === 0}
        >
          {submitting ? "Saving..." : "Save Donation"}
        </button>

        {!loadingDonors && donors.length === 0 && (
          <p className="form-note">
            Register a donor before recording a donation.
          </p>
        )}
      </form>
    </section>
  );
}