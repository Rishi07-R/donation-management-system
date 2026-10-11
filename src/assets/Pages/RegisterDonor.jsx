
import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../supabase";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  address: ""
};

export default function RegisterDonor() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [registeredDonor, setRegisteredDonor] = useState(null);
  const [copied, setCopied] = useState(false);

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setRegisteredDonor(null);
    setCopied(false);

    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();
    const phone = form.phone.trim();
    const address = form.address.trim();

    if (name.length < 2 || name.length > 120) {
      setError("Enter a valid name.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }

    if (!/^\d{10,15}$/.test(phone)) {
      setError("Enter a phone number containing 10–15 digits.");
      return;
    }

    if (address.length < 2 || address.length > 500) {
      setError("Enter a valid address.");
      return;
    }

    setLoading(true);

    try {
      const { data, error: registrationError } = await supabase.rpc(
        "register_donor",
        {
          p_name: name,
          p_email: email,
          p_phone: phone,
          p_address: address
        }
      );

      if (registrationError) {
        console.error("Registration error:", registrationError);
        setError(
          "Registration failed. Please check your details and try again."
        );
        return;
      }

      setRegisteredDonor(data);
      setForm(initialForm);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function copyDonorCode() {
    if (!registeredDonor?.donor_code) return;

    try {
      await navigator.clipboard.writeText(registeredDonor.donor_code);
      setCopied(true);
    } catch {
      setError("Unable to copy automatically. Please copy your donor code manually.");
    }
  }

  if (registeredDonor) {
    return (
      <section className="form-page">
        <div className="registration-success">
          <div className="success-icon">✓</div>

          <span className="eyebrow">REGISTRATION COMPLETE</span>
          <h1>Welcome, {registeredDonor.name}!</h1>
          <p>Your donor registration was successful.</p>

          <div className="donor-code-box">
            <span>Your Donor Code</span>
            <strong>{registeredDonor.donor_code}</strong>

            <button
              type="button"
              className="button"
              onClick={copyDonorCode}
            >
              {copied ? "Copied" : "Copy Donor Code"}
            </button>
          </div>

          <div className="registered-details">
            <h3>Your Registered Details</h3>

            <div className="detail-row">
              <span>Donor ID</span>
              <strong>{registeredDonor.id}</strong>
            </div>

            <div className="detail-row">
              <span>Name</span>
              <strong>{registeredDonor.name}</strong>
            </div>

            <div className="detail-row">
              <span>Email</span>
              <strong>{registeredDonor.email}</strong>
            </div>

            <div className="detail-row">
              <span>Phone</span>
              <strong>{registeredDonor.phone}</strong>
            </div>

            <div className="detail-row">
              <span>Address</span>
              <strong>{registeredDonor.address}</strong>
            </div>
          </div>

          <p className="form-note">
            Save your donor code. You will need it to submit a donation.
            This confirmation is the only place your full registered details
            are displayed to you.
          </p>

          <div className="hero-actions">
            <Link to="/donate" className="button">
              Donate Now
            </Link>

            <button
              type="button"
              className="button button-outline"
              onClick={() => setRegisteredDonor(null)}
            >
              Back to Registration
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="form-page">
      <div className="form-intro">
        <span className="eyebrow">JOIN OUR COMMUNITY</span>
        <h1>Become a Donor</h1>
        <p>
          Register once to receive your unique donor code and submit donations.
        </p>
      </div>

      <form className="form-card" onSubmit={handleSubmit}>
        <label>
          Full Name
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            maxLength="120"
            required
            placeholder="Enter your full name"
          />
        </label>

        <label>
          Email Address
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            maxLength="254"
            required
            placeholder="you@example.com"
          />
        </label>

        <label>
          Phone Number
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            maxLength="15"
            required
            placeholder="10–15 digits"
          />
        </label>

        <label>
          Address
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            maxLength="500"
            rows="3"
            required
            placeholder="Enter your address"
          />
        </label>

        {error && <p className="error-message">{error}</p>}

        <button
          className="button full-button"
          type="submit"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register as Donor"}
        </button>
      </form>
    </section>
  );
}
