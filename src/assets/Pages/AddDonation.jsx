import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase";

function AddDonation() {
  const navigate = useNavigate();

  const [donors, setDonors] = useState([]);

  const [formData, setFormData] = useState({
    donor_id: "",
    amount: "",
    purpose: "",
    donation_date: ""
  });

  const [loading, setLoading] = useState(false);

  // Get donors from Supabase
  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    const { data, error } = await supabase
      .from("donors")
      .select("id, name")
      .order("name", { ascending: true });

    if (error) {
      alert("Error loading donors: " + error.message);
    } else {
      setDonors(data || []);
    }
  };

  // Handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Add donation
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.donor_id ||
      !formData.amount ||
      !formData.purpose ||
      !formData.donation_date
    ) {
      alert("Please fill all fields");
      return;
    }

    if (Number(formData.amount) <= 0) {
      alert("Amount must be greater than 0");
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase
        .from("donations")
        .insert([
          {
            donor_id: Number(formData.donor_id),
            amount: Number(formData.amount),
            purpose: formData.purpose,
            donation_date: formData.donation_date
          }
        ]);

      if (error) {
        throw error;
      }

      alert("Donation added successfully!");

      setFormData({
        donor_id: "",
        amount: "",
        purpose: "",
        donation_date: ""
      });

      navigate("/donations");

    } catch (error) {
      alert("Error adding donation: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">

      <h2>Add Donation</h2>

      {donors.length === 0 ? (
        <div>
          <p>No donors found.</p>

          <button onClick={() => navigate("/register")}>
            Register Donor First
          </button>
        </div>
      ) : (

        <form onSubmit={handleSubmit}>

          {/* Donor */}
          <label>Select Donor</label>

          <select
            name="donor_id"
            value={formData.donor_id}
            onChange={handleChange}
          >
            <option value="">
              -- Select Donor --
            </option>

            {donors.map((donor) => (
              <option
                key={donor.id}
                value={donor.id}
              >
                {donor.name}
              </option>
            ))}
          </select>

          {/* Amount */}
          <label>Donation Amount</label>

          <input
            type="number"
            name="amount"
            placeholder="Enter donation amount"
            min="1"
            value={formData.amount}
            onChange={handleChange}
          />

          {/* Purpose */}
          <label>Purpose</label>

          <input
            type="text"
            name="purpose"
            placeholder="Example: Education"
            value={formData.purpose}
            onChange={handleChange}
          />

          {/* Date */}
          <label>Donation Date</label>

          <input
            type="date"
            name="donation_date"
            value={formData.donation_date}
            onChange={handleChange}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Donation"}
          </button>

        </form>
      )}

    </div>
  );
}

export default AddDonation;