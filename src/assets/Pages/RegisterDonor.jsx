import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase";

function RegisterDonor() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.address
    ) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase
        .from("donors")
        .insert([formData]);

      if (error) {
        throw error;
      }

      alert("Donor registered successfully!");

      setFormData({
        name: "",
        email: "",
        phone: "",
        address: ""
      });

      navigate("/donors");
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Register Donor</h2>

      <form onSubmit={handleSubmit}>
        <label>Name</label>

        <input
          type="text"
          name="name"
          placeholder="Enter donor name"
          value={formData.name}
          onChange={handleChange}
        />

        <label>Email</label>

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
        />

        <label>Phone</label>

        <input
          type="tel"
          name="phone"
          placeholder="Enter phone number"
          value={formData.phone}
          onChange={handleChange}
        />

        <label>Address</label>

        <textarea
          name="address"
          placeholder="Enter address"
          value={formData.address}
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register Donor"}
        </button>
      </form>
    </div>
  );
}

export default RegisterDonor;