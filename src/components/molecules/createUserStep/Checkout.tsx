import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";

import { ChevronDownIcon, LockClosedIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import CheckoutForm from "../../CheckoutForm";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
);

const Checkout = () => {
  const [clientSecret, setClientSecret] = React.useState("");

  React.useEffect(() => {
    // Créer un PaymentIntent dès que la page charge
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    // theme: "stripe",
    variables: {
      colorPrimary: "#3d546c",
    },
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      <div className="flex justify-between mb-7">
        <div className="flex">
          <LockClosedIcon className="h-6 w-6 text-green-700" />
          <p className="text-slate-700 ml-2">Paiement sécurisé SSL</p>
        </div>
        <Image
          src="/icons/payment.svg"
          width={100}
          height={20}
          alt="Carte bancaire"
        />
      </div>
      <div className="mb-7 text-center bg-slate-200 text-slate-700 rounded-md py-2 px-1">
        <h2 className="">
          {" "}
          Paiement des frais à l’inscription au régime d’auto-entrepreneur :{" "}
          <span className="font-bold">99,00 €</span>
        </h2>
        <div className="w-[90%] h-[1px] bg-slate-300 mx-auto mt-3"></div>
        <div className="mt-3 w-[90%] text-slate-400 mx-auto flex justify-between">
          <h3 className="flex">
            <span className="w-5 h-5 flex justify-center items-center rounded-full border border-slate-300 mr-2 items-center">
              ?
            </span>
            Voir mes informations
          </h3>
          <ChevronDownIcon className="h-7 w-7" />
        </div>
      </div>

      {clientSecret && (
        <Elements
          options={{ ...options, locale: "fr-FR" }}
          stripe={stripePromise}
        >
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default Checkout;
