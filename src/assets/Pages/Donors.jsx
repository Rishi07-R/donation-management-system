import { useCallback, useEffect, useState } from "react";
import { supabase } from "../../supabase";

export default function Donors() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDonors = useCallback(async () => {
    setLoading(true);
    setError("");

    const { data, error: queryError } = await supabase
      .from("donors")
      .select("id, donor_code, name, email, phone, address, created_at")
      .order("created_at", { ascending: false });

    if (queryError) {
      setError(queryError.message);
    } else {
      setDonors(data || []);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchDonors();
  }, [fetchDonors]);

  async function deleteDonor(donor) {
    if (!window.confirm(`Delete donor ${donor.name}?`)) return;

    const { error: deleteError } = await supabase
      .from("donors")
      .delete()
      .eq("id", donor.id);

    if (deleteError) {
      setError(deleteError.message);
      return;
    }

    fetchDonors();
  }

  return (
    <section className="page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">ADMINISTRATION</span>
          <h1>Donor directory</h1>
          <p>Review and manage registered donors.</p>
        </div>

        <button className="button" onClick={fetchDonors}>
          Refresh
        </button>
      </div>

      {loading && <p>Loading donors...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && donors.length === 0 && (
        <div className="empty-state">No donors registered yet.</div>
      )}

      {!loading && donors.length > 0 && (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Donor code</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {donors.map((donor) => (
                <tr key={donor.id}>
                  <td>{donor.donor_code}</td>
                  <td>{donor.name}</td>
                  <td>{donor.email}</td>
                  <td>{donor.phone}</td>
                  <td>{donor.address}</td>
                  <td>
                    <button
                      className="danger-button"
                      onClick={() => deleteDonor(donor)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}