import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../Context/AuthProvider";

const AddArtwork = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const categories = ["Painting", "Sculpture", "Digital", "Photography"];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in to add artwork");
      return;
    }

    const formData = {
      image: e.target.image.value,
      title: e.target.title.value,
      category: e.target.category.value,
      description: e.target.description.value,
      price: parseFloat(e.target.price.value),
      like: 0,
      userEmail: user.email,
      created_by: user.displayName || user.email,
    };

    setLoading(true);

    fetch("https://b12-a10-future-box-server-snowy.vercel.app/artwork", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add artwork");
        return res.json();
      })
      .then((data) => {
        toast.success("Successfully added!");
        e.target.reset();
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong!");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="card border border-gray-200 bg-base-100 w-full max-w-md mx-auto shadow-2xl rounded-2xl mt-10">
      <div className="card-body p-6 relative">
        <h2 className="text-2xl font-bold text-center mb-6">Add New Artwork</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Image Field */}
          <div>
            <label className="label font-medium">Image URL</label>
            <input
              type="text"
              name="image"
              required
              placeholder="https://i.ibb.co.com/1tgHvZBX/color3.jpg"
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
            />
          </div>

          {/* Title Field */}
          <div>
            <label className="label font-medium">Title</label>
            <input
              type="text"
              name="title"
              required
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="Enter artwork title"
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="label font-medium">Category</label>
            <select
              name="category"
              required
              defaultValue=""
              className="select w-full rounded-full focus:border-0 focus:outline-gray-200"
            >
              <option value="" disabled>
                Select category
              </option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          {/* Price Field */}
          <div>
            <label className="label font-medium">Price (USD)</label>
            <input
              type="number"
              name="price"
              required
              placeholder="$200"
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
            />
          </div>

          {/* Description Field */}
          <div>
            <label className="label font-medium">Description</label>
            <textarea
              name="description"
              required
              rows="4"
              className="textarea w-full rounded-2xl focus:border-0 focus:outline-gray-200 h-[200px]"
              placeholder="Enter artwork description"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`btn w-full text-white mt-6 rounded-full bg-linear-to-r from-sky-500 to-red-600 hover:from-sky-600 hover:to-red-700 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Adding..." : "Add Artwork"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddArtwork;
