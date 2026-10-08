function DonorCard({ donor, onDelete }) {
  return (
    <div className="card">
      <h3>{donor.name}</h3>

      <p>
        <strong>Email:</strong> {donor.email}
      </p>

      <p>
        <strong>Phone:</strong> {donor.phone}
      </p>

      <p>
        <strong>Address:</strong> {donor.address}
      </p>

      <button
        className="delete-btn"
        onClick={() => onDelete(donor.id)}
      >
        Delete
      </button>
    </div>
  );
}

export default DonorCard;