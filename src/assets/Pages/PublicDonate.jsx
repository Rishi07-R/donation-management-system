
import { useState } from "react";
import { supabase } from "../../supabase";

export default function PublicDonate() {
  const [form, setForm] = useState({
    donorCode: "",
    email: "",
    amount: "",
    confirmed: false
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  function handleChange(event) {
    const { name, value, checked, type } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!form.donorCode.trim() || !form.email.trim()) {
      setError("Enter your registered donor code and email.");
      return;
    }

    if (!Number.isFinite(Number(form.amount)) || Number(form.amount) <= 0) {
      setError("Enter a valid donation amount.");
      return;
    }

    if (!form.confirmed) {
      setError("Please confirm your donation before submitting.");
      return;
    }

    setLoading(true);

    try {
      const { data, error: submitError } = await supabase.rpc(
        "submit_donation",
        {
          p_donor_code: form.donorCode.trim(),
          p_email: form.email.trim(),
          p_amount: Number(form.amount),
          p_confirmed: form.confirmed
        }
      );

      if (submitError) {
        setError(
          submitError.message.includes("could not be verified")
            ? "We could not verify those donor details."
            : submitError.message
        );
        return;
      }

      setMessage(
        `Donation submission recorded successfully. Reference: ${data.donation_id}`
      );

      setForm({
        donorCode: "",
        email: "",
        amount: "",
        confirmed: false
      });
    } catch {
      setError("Unable to submit the donation. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="form-page">
      <div className="form-intro">
        <span className="eyebrow">MAKE A DIFFERENCE</span>
        <h1>Donate Now</h1>
        <p>
          Enter your registered donor details, choose an amount,
          and confirm your donation submission.
        </p>
      </div>

      <form className="form-card" onSubmit={handleSubmit}>
        <label>
          Registered Donor Code
          <input
            name="donorCode"
            value={form.donorCode}
            onChange={handleChange}
            placeholder="Example: DON-0001"
            required
          />
        </label>

        <label>
          Registered Email
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email used during registration"
            required
          />
        </label>

        <label>
          Donation Amount (₹)
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            min="1"
            max="10000000"
            step="0.01"
            placeholder="Enter amount"
            required
          />
        </label>

        <label className="confirmation-label">
          <input
            type="checkbox"
            name="confirmed"
            checked={form.confirmed}
            onChange={handleChange}
            required
          />
          I confirm that I want to submit this donation.
        </label>

        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}

        <button
          className="button full-button"
          type="submit"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Donate Now"}
        </button>

        <p className="form-note">
          This records your donation submission. No online payment is processed.
        </p>
      </form>
    </section>
  );
}
