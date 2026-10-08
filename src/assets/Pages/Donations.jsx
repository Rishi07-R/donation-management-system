import { useEffect, useState } from "react";
import { supabase } from "../../supabase";

function Donations() {
  const [donations, setDonations] = useState([]);
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch donations
  const fetchDonations = async () => {
    const { data, error } = await supabase
      .from("donations")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      alert("Error loading donations: " + error.message);
      return;
    }

    setDonations(data || []);
  };

  // Fetch donors
  const fetchDonors = async () => {
    const { data, error } = await supabase
      .from("donors")
      .select("id, name");

    if (error) {
      alert("Error loading donors: " + error.message);
      return;
    }

    setDonors(data || []);
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchDonations();
      await fetchDonors();
      setLoading(false);
    };

    loadData();
  }, []);

  // Find donor name using donor_id
  const getDonorName = (donorId) => {
    const donor = donors.find(
      (d) => d.id === donorId
    );

    return donor ? donor.name : "Unknown Donor";
  };

  if (loading) {
    return (
      <div className="center">
        <h2>Loading Donations...</h2>
      </div>
    );
  }

  return (
    <div className="page">

      <h2>Donation History</h2>

      {donations.length === 0 ? (

        <div className="center">
          <p>No donations found.</p>
        </div>

      ) : (

        <div className="card-grid">

          {donations.map((donation) => (

            <div
              className="card"
              key={donation.id}
            >

              <h3>
                Donation #{donation.id}
              </h3>

              <p>
                <strong>Donor:</strong>{" "}
                {getDonorName(donation.donor_id)}
              </p>

              <p>
                <strong>Amount:</strong>{" "}
                ₹{Number(donation.amount).toFixed(2)}
              </p>

              <p>
                <strong>Purpose:</strong>{" "}
                {donation.purpose}
              </p>

              <p>
                <strong>Date:</strong>{" "}
                {donation.donation_date}
              </p>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Donations;