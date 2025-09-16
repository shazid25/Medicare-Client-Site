import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const ManageSellerMedicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all medicines
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/medicine");
        setMedicines(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Delete medicine
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This medicine will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:3000/medicine/${id}`);
          setMedicines((prev) => prev.filter((m) => m.id !== id));
          Swal.fire("Deleted!", "Medicine has been deleted.", "success");
        } catch (err) {
          Swal.fire("Error", "Failed to delete medicine.", "error");
        }
      }
    });
  };

  // Redirect to Edit Page
  const handleEdit = (id) => {
    window.location.href = `/edit-medicine/${id}`;
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Manage Your Medicines</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {medicines.map((med) => (
          <motion.div
            key={med.id}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-2xl shadow-lg border p-5 flex flex-col justify-between"
          >
            <div>
              <img
                src={med.image}
                alt={med.name}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
              <h3 className="text-xl font-semibold">{med.name}</h3>
              <p className="text-gray-600">{med.vendor}</p>
              <p className="mt-2 font-bold text-lg">${med.price}</p>
              {med.discount > 0 && (
                <span className="text-sm bg-green-100 text-green-600 px-2 py-1 rounded">
                  {med.discount}% OFF
                </span>
              )}
            </div>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => handleEdit(med.id)}
                className="flex-1 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(med.id)}
                className="flex-1 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ManageSellerMedicines;
