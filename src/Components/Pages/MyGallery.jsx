import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useAuth } from "../../Hooks/useAuth";

const MyGallery = () => {
  const { user } = useAuth();
  const [myArts, setMyArts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArt, setSelectedArt] = useState(null);

  useEffect(() => {
    if (user?.email) {
      fetch(
        `http://localhost:3000/my-gallery?user=${
          user.displayName || user.email
        }`
      )
        .then((res) => res.json())
        .then((data) => {
          setMyArts(data);
          setLoading(false);
        });
    }
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you can’t get it back!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/artwork/${id}`, { method: "DELETE" })
          .then((res) => res.json())
          .then(() => {
            setMyArts(myArts.filter((art) => art._id !== id));
            Swal.fire("Deleted!", "Your artwork has been removed.", "success");
          });
      }
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedArt = {
      title: form.title.value,
      category: form.category.value,
      price: form.price.value,
      description: form.description.value,
    };

    fetch(`http://localhost:3000/artwork/${selectedArt._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedArt),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Artwork updated successfully!");
        setSelectedArt(null);
        setMyArts((prev) =>
          prev.map((art) =>
            art._id === selectedArt._id ? { ...art, ...updatedArt } : art
          )
        );
      });
  };

  if (loading)
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Loading your artworks...</p>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center"> My Gallery</h2>

      {myArts.length === 0 ? (
        <p className="text-center text-gray-500">
          You haven’t added any artworks yet.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {myArts.map((art) => (
            <div
              key={art._id}
              className="border rounded-xl p-4 shadow hover:shadow-lg transition bg-white"
            >
              <img
                src={art.image}
                alt={art.title}
                className="h-48 w-full object-cover rounded-lg mb-3"
              />
              <h3 className="font-semibold text-lg">{art.title}</h3>
              <p className="text-gray-600 text-sm">{art.category}</p>
              <p className="font-bold mt-1">${art.price}</p>

              <div className="flex justify-between mt-3">
                <button
                  onClick={() => setSelectedArt(art)}
                  className="bg-sky-500 text-white px-3 py-1 rounded"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(art._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 🔹 Update Modal */}
      {selectedArt && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <form
            onSubmit={handleUpdate}
            className="bg-white p-6 rounded-xl w-96 shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-3">Update Artwork</h3>

            <input
              name="title"
              defaultValue={selectedArt.title}
              className="border w-full mb-2 p-2 rounded"
              placeholder="Title"
            />
            <input
              name="category"
              defaultValue={selectedArt.category}
              className="border w-full mb-2 p-2 rounded"
              placeholder="Category"
            />
            <input
              name="price"
              defaultValue={selectedArt.price}
              className="border w-full mb-2 p-2 rounded"
              placeholder="Price"
            />
            <textarea
              name="description"
              defaultValue={selectedArt.description}
              className="border w-full mb-3 p-2 rounded"
              placeholder="Description"
            ></textarea>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setSelectedArt(null)}
                className="px-3 py-1 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 bg-green-500 text-white rounded"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default MyGallery;
