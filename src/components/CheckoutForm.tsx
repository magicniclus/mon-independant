import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { StripeElementChangeEvent } from "@stripe/stripe-js";
import { FormEvent, useEffect, useState } from "react";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPaymentReady, setIsPaymentReady] = useState<boolean>(false);

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
      switch (paymentIntent?.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
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
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/merci",
      },
    });

    if (error) {
      setMessage(error.message || "An unexpected error occurred.");
    } else {
      setMessage("Payment processed successfully!");
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (!elements) return;

    const paymentElement = elements.getElement(PaymentElement) as any;
    if (!paymentElement) {
      console.log("PaymentElement not found");
      return;
    }

    const handlePaymentElementChange = (event: StripeElementChangeEvent) => {
      setIsPaymentReady(event.complete);
    };

    // Utiliser les types corrects pour les callbacks
    paymentElement.on("change", handlePaymentElementChange);

    return () => {
      paymentElement.off("change", handlePaymentElementChange);
    };
  }, [elements]);

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button
        disabled={isLoading || !stripe || !elements || !isPaymentReady}
        id="submit"
        className={`text-white w-full py-2 rounded-md mt-10 ${
          !stripe || !elements || !isPaymentReady
            ? "bg-green-700/50"
            : "bg-green-700 hover:bg-green-800"
        } transition duration-150 ease-in-out`}
      >
        {isLoading ? (
          <div className="spinner" id="spinner"></div>
        ) : (
          "DEVENIR AUTO-ENTREPRENEUR"
        )}
      </button>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
