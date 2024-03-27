import { NextApiRequest, NextApiResponse } from "next";

// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Définition du type pour les articles de la commande
type Item = {
  id: string;
  quantity: number;
};

const calculateOrderAmount = (items: Item[]): number => {
  // Remplacez cette constante par un calcul du montant de la commande
  // Calculez le total de la commande sur le serveur pour empêcher
  // les gens de manipuler directement le montant sur le client
  return 8900;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { items } = req.body as { items: Item[] };

  // Créer un PaymentIntent avec le montant de la commande et la devise
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "eur",
    // Dans la dernière version de l'API, spécifier le paramètre `automatic_payment_methods` est optionnel car Stripe active sa fonctionnalité par défaut.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
}
