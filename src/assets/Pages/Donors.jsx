import { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import DonorCard from "../Component/DonarCard";

function Donors() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDonors = async () => {
    const { data, error } = await supabase
      .from("donors")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      alert(error.message);
    } else {
      setDonors(data || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this donor?"
    );

    if (!confirmDelete) {
      return;
    }

    const { error } = await supabase
      .from("donors")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
    } else {
      alert("Donor deleted successfully.");
      fetchDonors();
    }
  };

  if (loading) {
    return <h2 className="center">Loading donors...</h2>;
  }

  return (
    <div className="page">
      <h2>Registered Donors</h2>

      {donors.length === 0 ? (
        <p className="center">
          No donors registered yet.
        </p>
      ) : (
        <div className="card-grid">
          {donors.map((donor) => (
            <DonorCard
              key={donor.id}
              donor={donor}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Donors;