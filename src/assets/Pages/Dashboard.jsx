import { useEffect, useState } from "react";
import { supabase } from "../../supabase";

function Dashboard() {

  const [totalDonors, setTotalDonors] = useState(0);
  const [totalDonations, setTotalDonations] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {

    // Get donors
    const { data: donors, error: donorError } =
      await supabase
        .from("donors")
        .select("id");

    // Get donations
    const { data: donations, error: donationError } =
      await supabase
        .from("donations")
        .select("id, amount");

    if (donorError) {
      alert(
        "Error loading donors: " +
        donorError.message
      );
      return;
    }

    if (donationError) {
      alert(
        "Error loading donations: " +
        donationError.message
      );
      return;
    }

    // Total donors
    setTotalDonors(
      donors ? donors.length : 0
    );

    // Total donations
    setTotalDonations(
      donations ? donations.length : 0
    );

    // Calculate total amount
    const total = (donations || []).reduce(
      (sum, donation) => {
        return sum + Number(donation.amount || 0);
      },
      0
    );

    setTotalAmount(total);

    setLoading(false);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="center">
        <h2>Loading Dashboard...</h2>
      </div>
    );
  }

  return (
    <div className="page">

      <h2>Donation Dashboard</h2>

      <div className="dashboard-grid">

        {/* Total Donors */}
        <div className="dashboard-card">

          <h3>Total Donors</h3>

          <p>
            {totalDonors}
          </p>

        </div>

        {/* Total Donations */}
        <div className="dashboard-card">

          <h3>Total Donations</h3>

          <p>
            {totalDonations}
          </p>

        </div>

        {/* Total Amount */}
        <div className="dashboard-card">

          <h3>Total Amount</h3>

          <p>
            ₹{totalAmount.toFixed(2)}
          </p>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;