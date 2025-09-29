import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UserTransaction = () => {
  const { id } = useParams();
  const [medicine, setMedicine] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedicine = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/medicine/${id}`);
        setMedicine(data);
      } catch (error) {
        console.error("Failed to load medicine:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMedicine();
  }, [id]);

  if (loading) return <p className="text-center py-10">Loading...</p>;

  if (!medicine) return <p className="text-center py-10 text-red-500">Medicine not found</p>;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-lg mx-auto bg-white rounded-xl shadow-lg p-6">
        <img src={medicine.image} alt={medicine.name} className="w-full h-56 object-cover rounded-lg mb-4" />
        <h2 className="text-2xl font-bold mb-2">{medicine.name}</h2>
        <p className="text-gray-600 mb-2">Vendor: {medicine.vendor}</p>
        <p className="text-lg font-semibold mb-4">${medicine.price}</p>

        {/* Stripe placeholder button */}
        <button
          className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default UserTransaction;
