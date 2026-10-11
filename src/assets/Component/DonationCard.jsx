export default function DonationCard({ donation }) {
  return (
    <article className="data-card">
      <span className="eyebrow">
        {donation.donor_code_snapshot || "Donation"}
      </span>

      <h3>{donation.donor_name_snapshot || "Donor unavailable"}</h3>

      <p>
        <strong>Amount:</strong> ₹{Number(donation.amount).toFixed(2)}
      </p>

      <p>
        <strong>Purpose:</strong> {donation.purpose}
      </p>

      <p>
        <strong>Date:</strong> {donation.donation_date}
      </p>
    </article>
  );
}