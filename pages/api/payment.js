import { Buffer } from 'buffer';

export default async function handler(req, res) {
  const { orderId, paymentKey, amount } = req.query;

  // Ensure that the required parameters are present
  if (!orderId || !paymentKey || !amount) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  const secretKey = process.env.TOSS_SECRET_KEY;

  // Ensure the secret key is set
  if (!secretKey) {
    return res.status(500).json({ error: "Secret key not configured" });
  }

  const url = "https://api.tosspayments.com/v1/payments/confirm";
  const basicToken = Buffer.from(`${secretKey}:`, "utf-8").toString("base64");

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ amount, orderId, paymentKey }),
      headers: {
        Authorization: `Basic ${basicToken}`,
        "Content-Type": "application/json",
      },
    });

    // Check if the fetch was successful
    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json({ error: errorData });
    }

    const data = await response.json();
    console.log("Payment confirmation response:", data); // Debugging line

    // Redirect to the completion page with the orderId
    res.redirect(`/payments/complete?orderId=${orderId}`);
  } catch (error) {
    console.error("Error confirming payment:", error); // Log any fetch errors
    return res.status(500).json({ error: "Payment confirmation failed" });
  }
}
