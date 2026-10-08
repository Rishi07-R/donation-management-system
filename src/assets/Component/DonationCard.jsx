function DonationCard({ donation }) {
  return (
    <div className="card">
      <h3>Donation #{donation.id}</h3>

      <p>
        <strong>Donor:</strong>{" "}
        {donation.donors?.name || `Donor ID: ${donation.donor_id}`}
      </p>

      <p>
        <strong>Amount:</strong> ₹{donation.amount}
      </p>

      <p>
        <strong>Purpose:</strong> {donation.purpose}
      </p>

      <p>
        <strong>Date:</strong> {donation.donation_date}
      </p>
    </div>
  );
}

export default DonationCard;