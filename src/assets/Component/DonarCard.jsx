export default function DonarCard({ donor }) {
  return (
    <article className="data-card">
      <span className="eyebrow">{donor.donor_code}</span>
      <h3>{donor.name}</h3>
      <p>{donor.email}</p>
      <p>{donor.phone}</p>
      <p>{donor.address}</p>
    </article>
  );
}