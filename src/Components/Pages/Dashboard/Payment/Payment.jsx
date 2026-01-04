import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const Payment = () => {
  const { artId } = useParams();
  const axiosSecure = useAxiosSecure();

  const { isLoading, data: art } = useQuery({
    queryKey: ["artwork", artId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/artwork/${artId}`);
      return res.data.result;
    },
  });

  const handlePayment = async () => {
    const paymentInfo = {
      price: art.price,
      artId: art._id,
      userEmail: art["user email"],
      name: art.title,
    };

    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    console.log(res.data);
    window.location.href = res.data.url;
  };

  if (isLoading) {
    return (
      <div>
        <span className="loading loading-infinity loading-xl"></span>
      </div>
    );
  }

  return (
    <div>
      <h2>
        Please Pay ${art.price} for : {art?.title}
      </h2>
      <button onClick={handlePayment} className="btn btn-primary">
        pay
      </button>
    </div>
  );
};

export default Payment;
