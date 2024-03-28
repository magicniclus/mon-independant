import { RootState } from "@/redux/store";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import { ChevronDownIcon, LockClosedIcon } from "@heroicons/react/20/solid";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import CheckoutForm from "../../CheckoutForm";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
);

const Checkout = () => {
  const userNom = useSelector(
    (state: RootState) => state.createUser.userInfo.nom
  );
  const userPrenom = useSelector(
    (state: RootState) => state.createUser.userInfo.prenom
  );
  const userActivite = useSelector(
    (state: RootState) => state.createUser.userActivite.activitePrincipale
  );
  const userDebutActivite = useSelector(
    (state: RootState) => state.createUser.userActivite.debutActivite
  );
  const userAdresse = useSelector(
    (state: RootState) => state.createUser.userAdresse.adresse
  );
  const userEmail = useSelector(
    (state: RootState) => state.createUser.userInfo.email
  );

  const [clientSecret, setClientSecret] = React.useState("");

  const [open, setOpen] = useState(false);

  const dateActuelle = new Date().toLocaleDateString("fr-FR");

  const heureActuelle = new Date().toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });

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

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="App">
      <div className="mb-7 text-center bg-slate-200 text-slate-700 rounded-md py-4 px-1">
        <div className="flex items-center text-xs w-[90%] mx-auto mb-7">
          <CheckCircle className="h-4 w-4 text-green-700 mr-2" />
          <h3>
            Dossier enregistré{" "}
            <span className="font-semibold">
              le {dateActuelle} à {heureActuelle}
            </span>
          </h3>
        </div>
        <h2 className="">
          {" "}
          Paiement des frais à l’inscription au régime d’auto-entrepreneur :{" "}
          <span className="font-bold">99,00 €</span>
        </h2>
        <div className="w-[90%] h-[1px] bg-slate-300 mx-auto mt-3"></div>
        <div
          className="mt-3 w-[90%] text-slate-400 mx-auto flex justify-between items-center cursor-pointer"
          onClick={(e) => setOpen((e) => !e)}
        >
          <h3 className="flex items-center">
            <span className="w-5 h-5 flex justify-center items-center rounded-full border border-slate-300 mr-2 items-center">
              ?
            </span>
            Voir mes informations
          </h3>
          <ChevronDownIcon
            className={`h-7 w-7 transition-all duration-150 easeInOut ${
              open ? "transform rotate-180" : ""
            }`}
          />
        </div>
        {open && (
          <div className="p-3 w-full text-start w-[90%] mx-auto text-slate-400 text-sm">
            <h3 className="">
              Nom, prénom du demandant:{" "}
              <span className="font-semibold">
                {userNom.toUpperCase()} {userPrenom.toUpperCase()}
              </span>
            </h3>
            <h3 className="mt-1.5">
              Activité principale:{" "}
              <span className="font-semibold">{userActivite}</span>
            </h3>
            <h3 className="mt-1.5">
              Date de debut d&apos;activité:{" "}
              <span className="font-semibold">
                {formatDate(userDebutActivite)}
              </span>
            </h3>
          </div>
        )}
      </div>

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
