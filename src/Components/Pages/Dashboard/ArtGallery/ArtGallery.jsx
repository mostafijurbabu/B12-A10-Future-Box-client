import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useAuth } from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { FaEdit } from "react-icons/fa";
import { GrOverview } from "react-icons/gr";
import { RiDeleteBin2Fill } from "react-icons/ri";
import Swal from "sweetalert2";
import { Link } from "react-router";

const ArtGallery = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: artwork = [], refetch } = useQuery({
    queryKey: ["artGallery", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/gallery?email=${user.email}`);
      return res.data;
    },
  });

  const handleArtDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/artwork/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.success) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your art has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div>
      <h2>Gallery: {artwork.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Artist Email</th>
              <th>Category</th>
              <th>Price</th>

              <th>Payment Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {artwork.map((art, index) => (
              <tr key={art._id}>
                <th>{index + 1}</th>
                <td>{art.title}</td>
                <td>{art["user email"]}</td>
                <td>{art.category}</td>
                <td>${art.price}</td>

                <td>
                  {art.paymentStatus === "paid" ? (
                    <span className="text-green-400">paid</span>
                  ) : (
                    <Link to={`/dashboard/payment/${art._id}`}>
                      <button className="btn btn-sm btn-primary">Pay</button>
                    </Link>
                  )}
                </td>
                <td>
                  <button className="btn btn-square hover:bg-secondary">
                    <GrOverview />
                  </button>
                  <button className="btn btn-square hover:bg-secondary mx-2">
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleArtDelete(art._id)}
                    className="btn btn-square hover:bg-secondary"
                  >
                    <RiDeleteBin2Fill />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ArtGallery;
