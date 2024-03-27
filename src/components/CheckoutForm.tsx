import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { FormEvent, useEffect, useState } from "react";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      if (!paymentIntent) {
        setMessage("Payment Intent not found.");
        return;
      }

      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          // Ajoute une redirection ici
          window.location.href = "/merci";
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000/merci",
      },
    });

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message || "");
      } else {
        setMessage("An unexpected error occurred.");
      }
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <>
      <h2 className="mb-7 text-center bg-green-700 text-white rounded-md py-2 px-1">
        {" "}
        Paiement des frais à l’inscription au régime d’auto-entrepreneur :{" "}
        <span className="font-bold">99,00 €</span>
      </h2>
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button
          disabled={isLoading || !stripe || !elements}
          id="submit"
          className="text-white w-full py-2 rounded-md mt-10 hover:bg-green-700/70 transition duration-150 easeInOut bg-green-700"
        >
          <span id="button-text">
            {isLoading ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "DEVENIR AUTO-ENTREPRENEUR"
            )}
          </span>
        </button>
        {/* Afficher tous les messages d'erreur ou de succès */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    </>
  );
}
