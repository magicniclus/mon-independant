"use client";

import Script from "next/script";
import Stripe from "stripe";

const CheckboxButton = () => {
  const handleCheckout = async () => {
    const res = await fetch("/api/checkout", { method: "POST" });
    const data = await res.json();
    Stripe.redirectToCheckout({ sessionId: data.sessionId });
  };

  return (
    <>
      <Script src="https://js.stripe.com/v3/"></Script>
      <button onClick={handleCheckout}>Acheter maintenant</button>
    </>
  );
};

export default CheckboxButton;
