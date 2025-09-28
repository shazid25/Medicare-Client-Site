import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminBannerManagement = () => {
  const [banners, setBanners] = useState([]);
  const [newImageUrl, setNewImageUrl] = useState("");

  const fetchBanners = () => {
    axios.get("http://localhost:5000/api/banners")
      .then(res => setBanners(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const addBanner = () => {
    if (!newImageUrl) return;
    axios.post("http://localhost:5000/api/banners", { imageUrl: newImageUrl })
      .then(() => {
        setNewImageUrl("");
        fetchBanners();
      });
  };

  const deleteBanner = (id) => {
    axios.delete(`http://localhost:5000/api/banners/${id}`)
      .then(() => fetchBanners());
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Banner Images</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newImageUrl}
          placeholder="Enter image URL"
          onChange={e => setNewImageUrl(e.target.value)}
          className="border p-2 flex-grow rounded"
        />
        <button
          onClick={addBanner}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Banner
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {banners.map(b => (
          <div key={b._id} className="relative">
            <img
              src={b.imageUrl}
              alt="banner"
              className="w-full h-48 object-cover rounded"
            />
            <button
              onClick={() => deleteBanner(b._id)}
              className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBannerManagement;
